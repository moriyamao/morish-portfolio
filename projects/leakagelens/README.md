# LeakageLens

**Audit the split before trusting the score.**

LeakageLens is a local dataset auditing tool for binary tabular machine learning. It finds selected-feature row overlap, repeated entities across train/test partitions, timestamp interleaving, declared unavailable features, and suspicious target-proxy statistics. A trained random forest ranks columns for human review. A static browser demo accepts real CSV files and exports an audit report; the Python CLI adds a bounded numeric near-match search.

The project includes reproducible training, provenance-labelled synthetic benchmarks, a public-data injection challenge, baseline comparisons, a model card, sample datasets and tests. The statistical reviewer is a measured prototype with substantial domain shift limitations, not an automatic leakage verdict.

## Run it

From `projects/leakagelens`:

```bash
# The shipped-model CLI uses only Python's standard library.
python -m leakagelens --train samples/train.csv --test samples/test.csv --target target --group customer_id --time observed_at --unavailable final_outcome

# For your own files, set the target and optional metadata columns explicitly.
python -m leakagelens --train private-data/train.csv --test private-data/test.csv --target outcome --group customer_id --time observed_at --ignore row_number
```

`--unavailable` lists feature columns you know are unavailable at prediction time. `--ignore` removes columns from statistical profiling and row matching. Target, group and timestamp columns are excluded automatically. A target column in the test file is optional and never used to fit the column reviewer or calculate its feature statistics. Reports contain column names, statistics and zero-based row indices, not raw row values or entity IDs.

Use `--no-near` to skip the CLI's bounded numeric similarity search. Exact matching normalizes numeric strings and empty values, so `1` and `1.0`, or an empty field and a missing value, match. Equal selected feature values can represent legitimate repeated observations; an exact match is evidence to inspect, not proof of evaluation contamination.

To run the browser demo locally:

```bash
python -m http.server 8000 --bind 127.0.0.1
# Open http://127.0.0.1:8000/web/
```

Choose two CSV files and specify the evaluation contract. Processing and inference stay in the browser. Only application assets and explicitly requested bundled examples are fetched; CSV contents are not uploaded. The demo loads no analytics or third-party scripts. It includes planted-leakage and group-disjoint examples. The JSON download contains the audit evidence and learned scores.

Browser limits: 5,000 rows per CSV, 1.5 MB of text per file, at most 100 included feature columns. CLI limits: 20,000 rows per partition and 100 included features. At least 40 training rows, ten rows per target class and a non-missing binary training target are required. Use ISO timestamps; naive Python timestamps are treated as UTC. Browser and CLI timestamps should use explicit `Z` or UTC offsets for consistency. CSV schema must be consistent and test files must contain the selected training feature columns.

## What is observed, what is inferred

| Output | Evidence | Interpretation |
|---|---|---|
| Exact overlap | Canonical selected feature values match across partitions | Inspect identity and intended independence; repeated values may be legitimate |
| Shared entities | A declared entity key occurs in both partitions | Relevant when deployment is to previously unseen entities |
| Timestamp interleaving | Some training timestamps are at/after the first test timestamp | Review the forecast cutoff and feature availability rules |
| Unavailable feature | Your explicit timing declaration | Exclude or redesign the feature for prediction-time use |
| Learned review score | Column statistics resemble generated target proxies | A suspicion requiring context, not proof of leakage |
| Numeric near overlap, CLI only | Small robust-scaled numeric distance | Inspect similarity; categorical differences are not considered |

Near-match distance is RMS Euclidean distance after training-only median imputation and IQR scaling. Only columns at least 80% numerically observed with nonzero IQR are included. The deterministic search scans the first 2,000 train and 500 test rows, excludes already detected exact matches, uses a 0.02 threshold and returns at most 20 example pairs plus the full matched-row count within that sample. It can miss problems outside the sample or in categorical columns. It can also flag legitimate similar observations.

There is no automatic deletion, feature removal or model retraining. No private data is sent to an API. Do not commit your own datasets; `private-data/` is ignored by the included project rules.

## Reproduce the research

```bash
python -m venv .venv
# Activate the environment for your operating system, then:
python -m pip install -r requirements.txt
python -m leakagelens.train
python -m unittest discover -s tests -v
node --test web/core.test.cjs web/app.test.cjs
```

Python 3.12, NumPy 2.3.5 and scikit-learn 1.8.0 were used for the saved run. Node.js is needed for browser/Python parity and JavaScript tests. No GPU, paid API, fieldwork or live dataset download is required. UCI Wine comes from scikit-learn's bundled dataset loader.

The benchmark consists of 760 column profiles from 40 independently seeded source datasets. It includes preexisting numerical features, strong legitimate predictors, identifiers, categorical controls, constants and missing-value controls. Eight target-derived mechanisms are injected after the target is generated. Labels come from the generator's provenance, not a correlation cutoff.

Entire source datasets stay in one partition: 24 datasets/456 columns for training, six/114 for validation and ten/190 for testing. Names, dataset IDs, mechanism labels and column IDs are never model inputs. The threshold is selected on validation only. A fixed 32-tree depth-four random forest uses nine train-partition statistics: absolute correlation, orientation-free single-feature AUC, unique-value ratio, missing rate, binary target agreement, repeated-value target purity, missingness AUC, absolute rank correlation and a numeric-type indicator. Leaf scores, thresholds and split nodes are exported to JSON rather than pickle.

## Measured results

| Evaluation | Learned F1 | Simple correlation/purity rules F1 |
|---|---:|---:|
| Ten held-out generated source datasets, 190 columns | 1.00 | 0.67 |
| UCI Wine with artificial leaks, 18 columns | 0.50 | 0.75 |

On Wine the learned reviewer has precision **0.36**, recall **0.80**, and AUROC **0.87**. It raises false alarms on seven legitimate features and misses one injected feature. This is a substantial transfer failure, not a production success. The Wine challenge was not used for fitting or selecting the threshold; its outcomes remain in the published report. The generated test shares mechanism families and generator structure with training; its perfect score is not real-world accuracy.

Additional mechanism holdouts retrain without codebook, missingness or noisy target-proxy examples. F1 is 1.00, 0.00 and 1.00 respectively on the corresponding withheld mechanism versus all legitimate test columns. The missingness result shows that previously unseen leakage mechanisms can be missed completely. These are small controlled experiments, not a comprehensive evaluation.

The included entity experiment trains one-nearest-neighbor on 480 rows from 80 entities. Across five seeded runs, random row splitting averages **100% accuracy**, while group-disjoint splitting averages **50%**. The target is random at entity level and entity signatures repeat, so row splitting rewards memorization. The deployment assumed here is to new entities. These splits assess different populations; this demonstration does not imply that every random split is wrong or that the same gap holds on your data.

See [MODEL_CARD.md](MODEL_CARD.md), [evaluation.json](artifacts/evaluation.json) for every challenge prediction, and [benchmark.jsonl](artifacts/benchmark.jsonl) for the generated statistics and provenance labels. The report records package versions and a benchmark SHA-256 hash.

## Limits that matter

Statistical association cannot reveal when a feature became available. A valid perfect predictor and an encoded outcome can have identical observed values. Human knowledge of the prediction moment, data collection process, entity independence and pipeline fitting remains necessary. Raw forest scores are uncalibrated and must not be interpreted as probabilities that a column leaks information.

The tool cannot reconstruct preprocessing history, prove that scaling or feature selection was fitted on the right partition, or detect every target-encoding/temporal leakage mechanism from CSV files. It supports binary classification only. It does not report actual inflation of a user's downstream model score; the included score-gap experiment is separate synthetic evidence. Similar rows or shared entities are not automatically mistakes: the correct split depends on the intended deployment.

## Sources and data attribution

- [scikit-learn: common pitfalls and data leakage](https://scikit-learn.org/stable/common_pitfalls.html)
- [GroupKFold](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupKFold.html) and [TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)
- Aeberhard, S. & Forina, M. (1992). **Wine** [Dataset]. UCI Machine Learning Repository. [DOI: 10.24432/C5PC7J](https://doi.org/10.24432/C5PC7J). [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

The Wine challenge converts the original three-class target into class-zero-versus-rest and adds five original artificial proxy columns. Original measurements are treated as legitimate predictors for this experiment. The report contains derived statistics, not the original raw Wine table. Attribution and the dataset's CC BY 4.0 terms remain applicable. Original project code, synthetic sample CSVs and generated synthetic benchmark fixtures are MIT-licensed.
