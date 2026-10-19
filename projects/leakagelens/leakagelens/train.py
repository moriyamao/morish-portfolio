"""Reproduce the meta-model, evaluation and illustrative split experiment."""

import csv
import hashlib
import json
import platform

import numpy as np
import sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, average_precision_score, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import GroupShuffleSplit, train_test_split
from sklearn.neighbors import KNeighborsClassifier

from .benchmark import records, real_data_challenge
from .profile import FEATURES
from .model import ROOT, heuristic, predict


def metrics(labels, scores, threshold=0.5):
    decisions = np.asarray(scores) >= threshold
    return {'precision': precision_score(labels, decisions, zero_division=0),
            'recall': recall_score(labels, decisions, zero_division=0),
            'f1': f1_score(labels, decisions, zero_division=0),
            'accuracy': accuracy_score(labels, decisions), 'roc_auc': roc_auc_score(labels, scores),
            'average_precision': average_precision_score(labels, scores)}


def matrix(rows):
    return [[row['stats'][name] for name in FEATURES] for row in rows]


def fit(rows):
    return RandomForestClassifier(n_estimators=32, max_depth=4, min_samples_leaf=4,
                                  class_weight='balanced', random_state=41, n_jobs=1).fit(matrix(rows), [r['label'] for r in rows])


def export_model(classifier, threshold):
    trees = []
    for estimator in classifier.estimators_:
        tree = estimator.tree_
        values = tree.value[:, 0, :]
        risk = values[:, 1] / values.sum(axis=1)
        trees.append({'left': tree.children_left.tolist(), 'right': tree.children_right.tolist(),
                      'feature': tree.feature.tolist(), 'threshold': tree.threshold.tolist(), 'risk': risk.tolist()})
    return {'schema_version': 1, 'features': FEATURES, 'threshold': threshold, 'trees': trees,
            'scope': 'Binary tabular target-proxy review, synthetic training provenance', 'calibrated': False,
            'feature_importance': dict(zip(FEATURES, classifier.feature_importances_.tolist()))}


def split_experiment():
    runs = []
    for seed in range(5):
        rng = np.random.default_rng(seed + 1000)
        entities = np.repeat(np.arange(80), 6)
        signature = rng.normal(size=(80, 2))
        labels = rng.integers(0, 2, 80)[entities]
        x = signature[entities]
        train, test = train_test_split(np.arange(len(x)), test_size=0.25, random_state=seed)
        random_score = KNeighborsClassifier(n_neighbors=1).fit(x[train], labels[train]).score(x[test], labels[test])
        left, right = next(GroupShuffleSplit(n_splits=1, test_size=0.25, random_state=seed).split(x, labels, entities))
        grouped_score = KNeighborsClassifier(n_neighbors=1).fit(x[left], labels[left]).score(x[right], labels[right])
        runs.append({'seed': seed, 'random_accuracy': random_score, 'group_accuracy': grouped_score,
                     'random_shared_entities': len(set(entities[train]) & set(entities[test])),
                     'group_shared_entities': len(set(entities[left]) & set(entities[right]))})
    return {'model': '1-nearest-neighbor', 'rows': 480, 'entities': 80, 'runs': runs,
            'random_accuracy_mean': float(np.mean([r['random_accuracy'] for r in runs])),
            'group_accuracy_mean': float(np.mean([r['group_accuracy'] for r in runs])),
            'interpretation': 'Synthetic entity memorization demonstration. The intended deployment is to unseen entities; the two splits evaluate different populations.'}


def samples():
    rng = np.random.default_rng(109)
    rows = []
    for index in range(240):
        score = float(rng.normal())
        label = int(score + rng.normal(scale=0.9) > 0)
        rows.append({'customer_id': f'customer_{index // 3}',
                     'observed_at': f'2025-01-{1 + index % 28:02d}T00:00:00Z',
                     'tenure': int(rng.integers(1, 80)), 'usage_score': round(score, 4),
                     'final_outcome': label, 'review_code': f'{label}_{index % 3}', 'target': label})
    train, test = rows[:160], rows[160:]
    test[:8] = [dict(row) for row in train[20:28]]
    # A small numeric perturbation, to demonstrate the bounded near-match audit.
    near = dict(train[35]); near['usage_score'] += 0.001
    test[8] = near
    directory = ROOT / 'samples'
    directory.mkdir(exist_ok=True)
    clean = [{key: value for key, value in row.items() if key not in ('final_outcome', 'review_code')} for row in rows]
    for row in clean[150:]:
        row['observed_at'] = row['observed_at'].replace('2025-01-', '2025-02-')
    for name, partition in [('train.csv', train), ('test.csv', test), ('clean_train.csv', clean[:150]), ('clean_test.csv', clean[150:])]:
        with (directory / name).open('w', newline='') as handle:
            writer = csv.DictWriter(handle, fieldnames=list(partition[0]))
            writer.writeheader(); writer.writerows(partition)


def main():
    rows = list(records())
    parts = {name: [r for r in rows if r['split'] == name] for name in ('train', 'validation', 'test')}
    groups = {name: {r['dataset_id'] for r in values} for name, values in parts.items()}
    assert not (groups['train'] & groups['validation'] or groups['train'] & groups['test'] or groups['validation'] & groups['test'])
    classifier = fit(parts['train'])
    val = classifier.predict_proba(matrix(parts['validation']))[:, 1]
    threshold = max([0.3, 0.4, 0.5, 0.6, 0.7], key=lambda t: (f1_score([r['label'] for r in parts['validation']], val >= t), -abs(t - 0.5)))
    model = export_model(classifier, threshold)
    scores = classifier.predict_proba(matrix(parts['test']))[:, 1]
    portable = [predict(r['stats'], model)['score'] for r in parts['test']]
    assert np.allclose(scores, portable, atol=1e-12)
    labels = [r['label'] for r in parts['test']]
    challenge = list(real_data_challenge())
    for row in challenge:
        row['score'] = predict(row['stats'], model)['score']
        row['baseline'] = heuristic(row['stats'])
    stress = []
    for mechanism in ('codebook', 'missingness', 'noisy'):
        training = [r for r in parts['train'] if r['mechanism'] != mechanism]
        evaluation = [r for r in parts['test'] if r['mechanism'] == mechanism or r['label'] == 0]
        other_model = fit(training)
        values = other_model.predict_proba(matrix(evaluation))[:, 1]
        stress.append({'withheld_mechanism': mechanism, 'n': len(evaluation), 'metrics': metrics([r['label'] for r in evaluation], values, threshold)})
    serialized = ''.join(json.dumps(row, sort_keys=True) + '\n' for row in rows)
    report = {'seed': 41, 'source': 'Original generated datasets with provenance-labelled column injections',
              'counts': {name: len(values) for name, values in parts.items()},
              'source_datasets': {name: len(value) for name, value in groups.items()},
              'threshold': threshold, 'threshold_selected_on': 'validation only',
              'dataset_sha256': hashlib.sha256(serialized.encode()).hexdigest(),
              'test': {'learned': metrics(labels, scores, threshold),
                       'correlation_purity_rules': metrics(labels, [heuristic(r['stats']) for r in parts['test']]),
                       'always_clean': metrics(labels, [0] * len(labels))},
              'wine_challenge': {'n': len(challenge), 'legitimate_columns': 13, 'injected_columns': 5,
                                 'learned': metrics([r['label'] for r in challenge], [r['score'] for r in challenge], threshold),
                                 'rules': metrics([r['label'] for r in challenge], [r['baseline'] for r in challenge]),
                                 'cases': challenge},
              'mechanism_holdouts': stress, 'split_experiment': split_experiment(),
              'versions': {'python': platform.python_version(), 'numpy': np.__version__, 'scikit_learn': sklearn.__version__},
              'limitations': ['Synthetic injection detection does not establish real-world leakage detection.',
                              'Statistical association cannot establish when a feature became available.',
                              'A target and a valid perfect predictor can be observationally indistinguishable.',
                              'The Wine challenge uses artificial injections into a public dataset, not naturally occurring labelled leakage.',
                              'CSV auditing cannot detect all preprocessing or target-encoding leakage.'],
              'sources': ['https://scikit-learn.org/stable/common_pitfalls.html',
                          'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html',
                          'https://archive.ics.uci.edu/dataset/109/wine']}
    directory = ROOT / 'artifacts'; directory.mkdir(exist_ok=True)
    (directory / 'model.json').write_text(json.dumps(model, separators=(',', ':'), sort_keys=True) + '\n')
    (directory / 'evaluation.json').write_text(json.dumps(report, indent=2, sort_keys=True) + '\n')
    (directory / 'benchmark.jsonl').write_text(serialized)
    samples()
    print(json.dumps({'counts': report['counts'], 'test': report['test'],
                      'wine_challenge': {key: value for key, value in report['wine_challenge'].items() if key != 'cases'},
                      'split_experiment': {key: value for key, value in report['split_experiment'].items() if key != 'runs'}}, indent=2))


if __name__ == '__main__':
    main()
