"""Reproduce labels, grouped evaluation and portable model artifacts."""

import argparse
import contextlib
import hashlib
import io
import json
import platform
import subprocess
import sys
import warnings

import numpy as np
import pandas as pd
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, average_precision_score, f1_score, precision_score, recall_score, roc_auc_score

from .catalog import DOCS, MIGRATIONS, TARGET, examples
from .model import ROOT, TOKEN_PATTERN, predict
from .analyze import diagnose
from .challenge import examples as challenge_examples


def label_examples():
    if pd.__version__ != TARGET:
        raise RuntimeError(f"Label generation requires pandas {TARGET}; found {pd.__version__}.")
    rows = []
    for example in examples():
        record = dict(example)
        namespace = {}
        try:
            with warnings.catch_warnings(), contextlib.redirect_stdout(io.StringIO()):
                warnings.simplefilter("ignore")
                exec(compile(example["code"], example["id"], "exec"), namespace)
            record.update(label=0, error_type=None)
        except Exception as error:
            record.update(label=1, error_type=type(error).__name__)
        expected = int(example["variant"] == "legacy")
        if record["label"] != expected or record["error_type"] not in (None, "AttributeError", "TypeError"):
            raise AssertionError(f"Unexpected fixture outcome: {record['id']}: {record['error_type']}")
        rows.append(record)
    return rows


def metrics(labels, scores, threshold=0.5):
    decisions = np.asarray(scores) >= threshold
    return {"accuracy": accuracy_score(labels, decisions), "precision": precision_score(labels, decisions, zero_division=0),
            "recall": recall_score(labels, decisions, zero_division=0), "f1": f1_score(labels, decisions, zero_division=0),
            "roc_auc": roc_auc_score(labels, scores), "average_precision": average_precision_score(labels, scores)}


def evaluate_challenge(model):
    rows = []
    for example in challenge_examples():
        try:
            with warnings.catch_warnings(), contextlib.redirect_stdout(io.StringIO()):
                warnings.simplefilter('ignore')
                exec(compile(example['code'], example['id'], 'exec'), {})
            label, error = 0, None
        except (TypeError, AttributeError) as exc:
            label, error = 1, type(exc).__name__
        score = predict(example['code'], model)['risk_score']
        rules = float(any(f['certainty'] == 'confirmed_symbol' for f in diagnose(example['code'])))
        rows.append({**example, 'label': label, 'error_type': error, 'risk_score': score, 'rules_score': rules})
    return {'count': len(rows), 'learned': metrics([r['label'] for r in rows], [r['risk_score'] for r in rows], model['threshold']),
            'ast_rules': metrics([r['label'] for r in rows], [r['rules_score'] for r in rows]), 'cases': rows}


def train():
    # Only trusted fixtures from catalog.py run. This child process is not a sandbox.
    result = subprocess.run([sys.executable, "-m", "tutorialcheck.train", "--label-worker"],
                            check=True, capture_output=True, text=True, timeout=60, cwd=ROOT)
    rows = json.loads(result.stdout)
    parts = {name: [r for r in rows if r["split"] == name] for name in ("train", "validation", "test")}
    group_sets = {name: {r["recipe_group"] for r in records} for name, records in parts.items()}
    assert not (group_sets['train'] & group_sets['validation'] or group_sets['train'] & group_sets['test'] or group_sets['validation'] & group_sets['test'])
    source_sets = {name: {r['code'] for r in records} for name, records in parts.items()}
    assert not (source_sets['train'] & source_sets['validation'] or source_sets['train'] & source_sets['test'] or source_sets['validation'] & source_sets['test'])
    vectorizer = TfidfVectorizer(token_pattern=TOKEN_PATTERN, lowercase=True, ngram_range=(1, 2), sublinear_tf=True)
    x_train = vectorizer.fit_transform([r["code"] for r in parts["train"]])
    classifier = LogisticRegression(C=4, solver="liblinear", class_weight="balanced", random_state=23)
    classifier.fit(x_train, [r["label"] for r in parts["train"]])
    val_scores = classifier.predict_proba(vectorizer.transform([r['code'] for r in parts['validation']]))[:, 1]
    threshold = max([0.3, 0.4, 0.5, 0.6, 0.7], key=lambda t: (f1_score([r['label'] for r in parts['validation']], val_scores >= t), -abs(t - 0.5)))
    model = {"schema_version": 1, "target": TARGET, "threshold": threshold, "minimum_coverage": 0.35,
             "vocabulary": {term: int(index) for term, index in vectorizer.vocabulary_.items()},
             "terms": vectorizer.get_feature_names_out().tolist(), "idf": vectorizer.idf_.tolist(),
             "coefficients": classifier.coef_[0].tolist(), "intercept": float(classifier.intercept_[0])}
    heldout = parts['test']
    scores = classifier.predict_proba(vectorizer.transform([r['code'] for r in heldout]))[:, 1]
    portable = [predict(r['code'], model)['risk_score'] for r in heldout]
    assert np.allclose(scores, portable, atol=1e-12)
    static = [float(any(f['certainty'] == 'confirmed_symbol' for f in diagnose(r['code']))) for r in heldout]
    labels = [r['label'] for r in heldout]
    errors = [{"id": r['id'], "expected": r['label'], "score": float(score)} for r, score in zip(heldout, scores) if int(score >= threshold) != r['label']]
    # A harder test: retrain while withholding the entire API family, not just a recipe.
    stress = []
    for family in MIGRATIONS:
        fit_rows = [r for r in parts['train'] if r['family'] != family]
        test_rows = [r for r in heldout if r['family'] == family]
        vec = TfidfVectorizer(token_pattern=TOKEN_PATTERN, ngram_range=(1, 2), sublinear_tf=True)
        fit_x = vec.fit_transform([r['code'] for r in fit_rows])
        clf = LogisticRegression(C=4, solver='liblinear', class_weight='balanced', random_state=23).fit(fit_x, [r['label'] for r in fit_rows])
        stress.append({"family": family, "f1": f1_score([r['label'] for r in test_rows], clf.predict(vec.transform([r['code'] for r in test_rows])), zero_division=0)})
    dataset_text = ''.join(json.dumps(row, sort_keys=True) + '\n' for row in rows)
    report = {"target": TARGET, "source": "Original generated fixtures; execution labels, not external real-world tutorials",
              "counts": {name: len(records) for name, records in parts.items()},
              "groups": {name: len(groups) for name, groups in group_sets.items()},
              "dataset_sha256": hashlib.sha256(dataset_text.encode()).hexdigest(),
              "threshold_selected_on": "validation only", "threshold": threshold,
              "test": {"learned": metrics(labels, scores, threshold), "ast_rules": metrics(labels, static),
                       "always_working": metrics(labels, [0.0] * len(labels))},
              "family_holdout": stress, "family_holdout_mean_f1": float(np.mean([r['f1'] for r in stress])),
              "challenge": evaluate_challenge(model),
              "errors": errors, "repairs_executed_and_asserted": sum(r['variant'] == 'repaired' and r['label'] == 0 for r in rows),
              "versions": {"python": platform.python_version(), "pandas": pd.__version__, "numpy": np.__version__, "scikit_learn": sklearn.__version__},
              "limitations": ["Small generated benchmark, not measured real-world generalization.", "Recipes share API families and some expressions; family holdout is the tougher check.",
                              "No pandas 1.x runtime used; legacy history comes from official docs.", "No semantic equivalence claim for arbitrary code or replacements.",
                              "Risk score is an uncalibrated classifier output, not a probability of correctness.", "Only pandas 2.2.3 is execution-validated."], "sources": [DOCS]}
    output = ROOT / 'artifacts'
    output.mkdir(exist_ok=True)
    (output / 'model.json').write_text(json.dumps(model, separators=(',', ':'), sort_keys=True) + '\n')
    (output / 'evaluation.json').write_text(json.dumps(report, indent=2, sort_keys=True) + '\n')
    (output / 'benchmark.jsonl').write_text(dataset_text)
    (output / 'migrations.json').write_text(json.dumps({'target': TARGET, 'source': DOCS, 'families': {key: {'symbol': value[0], 'suggestion': value[1]} for key, value in MIGRATIONS.items()}}, indent=2) + '\n')
    print(json.dumps({key: report[key] for key in ('counts', 'test', 'family_holdout_mean_f1', 'repairs_executed_and_asserted')}, indent=2))
    print('Independent challenge:', json.dumps({key: value for key, value in report['challenge'].items() if key != 'cases'}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--label-worker', action='store_true')
    args = parser.parse_args()
    if args.label_worker:
        print(json.dumps(label_examples()))
    else:
        train()
