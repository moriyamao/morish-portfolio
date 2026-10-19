# TutorialCheck

**Will this pandas tutorial still run in your environment?**

TutorialCheck combines a trained text classifier with conservative Python AST checks to review old tutorial code. It reports suspect lines, documented migration guidance, learned risk scores, and the features behind those scores. The included static browser demo uses the same exported model as Python; snippets stay on the device.

This is an implemented research prototype, with an execution-labelled benchmark, a trained model, a working CLI, a browser demo, tests and full evaluation artifacts. The first release supports **pandas 2.2.3 only**. It focuses on API removals introduced in pandas 2.0. It does not claim to support every current pandas release.

## Try it

From this directory (`projects/tutorialcheck`):

```bash
python -m venv .venv
# Activate .venv for your operating system, then:
python -m pip install -r requirements.txt
python -m tutorialcheck examples/legacy.py
python -m tutorialcheck examples/legacy.py --json
python -m tutorialcheck examples/repaired.py
```

The shipped model is JSON, so ordinary CLI inference uses the Python standard library. Training and the numerical comparison tests require the pinned scientific dependencies. Python 3.12 was used for the recorded run. Node.js is needed only for the browser/Python parity test.

For the browser demo:

```bash
python -m http.server 8000 --bind 127.0.0.1
# Open http://127.0.0.1:8000/web/
```

The page loads model artifacts and computes TF-IDF features and logistic regression inference in JavaScript. It sends no pasted code to a server. Browser migration hints are lexical; the Python CLI additionally checks syntax, straightforward import aliases, simple constructors and receiver bindings. Calls with unresolved receivers are marked uncertain. Scope analysis is conservative and incomplete; it is not a Python type checker.

## What makes the project useful

A tutorial can fail because an API disappeared, while a similar-looking call on a Python list remains valid. TutorialCheck pairs environment-specific review with a benchmark of repairs that actually executed and satisfied result assertions. Learned scores supply an additional triage signal where pattern matching is insufficient; documented symbol checks remain visible alongside them.

Examples include DataFrame/Series `append` and `iteritems`, removed `read_csv` arguments, removed numeric Index subclasses, `pd.datetime` and `pd.np`. Recommendations link to the [official pandas 2.0 removal notes](https://pandas.pydata.org/pandas-docs/version/2.2.3/whatsnew/v2.0.0.html) and the [concat reference](https://pandas.pydata.org/pandas-docs/version/2.2.3/reference/api/pandas.concat.html). The code samples are original fixtures, not copied tutorials.

## Reproduce training and evaluation

```bash
python -m tutorialcheck.train
python -m unittest discover -s tests -v
```

The pipeline runs only the checked-in trusted fixture generators, in a separate process with a timeout. That process is not a security sandbox. Arbitrary user snippets are never executed by the analyzer or demo. Inspect fixtures before running an altered benchmark from an untrusted source.

1. Generate 414 snippets across 11 migration families plus valid list controls.
2. Execute each snippet in a fresh namespace on pandas 2.2.3. Exceptions supply the failure labels; repaired snippets include assertions about their outputs.
3. Keep each recipe group, both legacy/repaired sides and its value/name variants in one split: 276 train, 69 validation, 69 test. Check that no identical source crosses splits. Fit vocabulary and IDF on training only; select the decision threshold on validation only.
4. Train word unigram/bigram TF-IDF with sublinear term frequency and logistic regression. Export coefficients, IDF and vocabulary as portable JSON, without pickle.
5. Compare against an always-working baseline and AST rules. Separately retrain with each migration family excluded, and evaluate 24 independently authored challenge snippets untouched by model fitting or threshold selection.

No calls to an LLM, paid APIs, GPU, fieldwork or private client data are required.

## Model card and measured results

Recorded environment: Python 3.12, pandas 2.2.3, NumPy 2.3.5, scikit-learn 1.8.0. Full versions and the benchmark SHA-256 are in [evaluation.json](artifacts/evaluation.json). The saved model is trained only on the training partition.

| Evaluation | Learned model | AST baseline |
|---|---:|---:|
| Generated recipe holdout, F1 (69 snippets) | 1.00 | 1.00 |
| Independent challenge, F1 (24 snippets) | 0.74 | 0.80 |
| Independent challenge, precision | 0.67 | 1.00 |
| Independent challenge, recall | 0.83 | 0.67 |

Mean F1 with an entire API family excluded from training: **0.88**. This mean covers 11 small balanced family tests, not a pooled real-world test. The generated holdout is easy: examples still share API families and related expressions with training. Its perfect score is **not a real-world accuracy claim**. The separate challenge is small and also authored for this project, not an external representative dataset. All 198 repaired fixtures executed and passed assertions on the target runtime. The 198 legacy variants failed with AttributeError or TypeError; 18 valid list controls passed.

The model has a useful recall/precision tradeoff, but does **not** beat the AST baseline on challenge F1. Its errors include comments or strings that mention obsolete API names, working custom `append` methods, and missed unfamiliar aliases. Those failures remain published rather than used to tune this release. Raw linear-model scores are **uncalibrated**, not probabilities of execution success. A vocabulary-coverage guard can abstain on unfamiliar input; high coverage still does not guarantee the input is in scope.

There is no runtime comparison with pandas 1.x; migration history is sourced from documentation. A repaired fixture passing does not prove a suggested replacement preserves arbitrary user semantics, performance or side effects. The analyzer does not fix code automatically. Syntax and pandas type inference cover common simple cases, not dynamic Python, imports through other modules, shadowed aliases, or complete control flow.

## Files

- `tutorialcheck/catalog.py`: original recipe generator and migration reference catalog.
- `tutorialcheck/challenge.py`: separately written challenge cases.
- `tutorialcheck/train.py`: execution labels, training and baseline comparisons.
- `tutorialcheck/analyze.py`: AST diagnostics and version guard.
- `tutorialcheck/model.py`: portable sparse inference and token contributions.
- `web/`: static demo, local inference and evaluation display.
- `artifacts/benchmark.jsonl`: examples with actual execution labels.
- `artifacts/model.json`: trained model, vocabulary and IDF.
- `artifacts/evaluation.json`: metrics, all challenge predictions and limitations.
- `tests/`: CLI logic, data isolation, arithmetic and browser/Python parity.

Future validation should collect licensed real tutorials with original environment metadata and reserve an external test set before expanding the API catalog or retraining. Confidence calibration and a stronger code-aware model would be separate experiments with their own evaluation.
