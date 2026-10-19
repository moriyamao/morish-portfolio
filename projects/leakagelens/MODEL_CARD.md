# LeakageLens reviewer — model card

## Intended use

Prioritize binary tabular dataset columns for manual leakage review. The model is an experimental component of a local auditing tool. Observed overlap checks and user-declared prediction-time unavailability are separate evidence sources.

Not intended to certify datasets, replace a data contract, automatically remove features, infer causality or claim that a model evaluation is valid. Scores are uncalibrated, and no threshold is safe for unattended production decisions.

## Training data and features

456 column profiles from 24 original generated datasets. Validation uses 114 columns from six other source datasets; testing uses 190 from ten further datasets. Source datasets never cross partitions. Feature selection and random forest parameters were fixed; the threshold was selected on validation F1 from 0.3/0.4/0.5/0.6/0.7. The saved threshold is 0.5. No Wine profile was used for fitting or threshold selection.

The nine inputs are statistics of one feature against the training target. Raw values, names, row IDs, source dataset IDs and injection labels are not model inputs. Binary labels have known simulation provenance: target-derived columns versus columns generated before the target or independently. Real-world statistical identification of this provenance is generally impossible without assumptions.

## Model and portability

RandomForestClassifier: 32 estimators, maximum depth four, minimum leaf size four, balanced class weights, random seed 41, one training worker. Training uses scikit-learn 1.8.0. The artifact contains tree structures and leaf class proportions as JSON. Both Python and JavaScript implement the same nine statistics and forest traversal. Tests compare portable scores against scikit-learn, and compare browser statistics and audit outputs with Python.

## Evaluation

Generated holdout F1: 1.00. Baseline F1: 0.67. The baseline flags absolute correlation at least 0.98, or repeated-value purity at least 0.99 with unique ratio at most 0.2. Generated holdout AUROC: 1.00. An always-clean baseline has F1 0 and accuracy 0.58. All figures refer to generated column cases, not a corpus of naturally leaked datasets.

Public-data injection challenge: UCI Wine, original 13 legitimate feature columns plus five original target proxies, 178 rows. Class-zero-versus-rest is the binary target. Learned F1 0.50, precision 0.36, recall 0.80, AUROC 0.87; baseline F1 0.75. The model flags seven legitimate columns and misses one injection. This is one source dataset and only 18 column cases, not 18 independent datasets.

Mechanism holdouts: codebook F1 1.00; missingness F1 0.00; noisy proxy F1 1.00. Each is evaluated against legitimate columns from the same ten held-out synthetic datasets. The model fails to generalize to one omitted mechanism.

All raw metrics, case statistics, scores, labels and version details are in `artifacts/evaluation.json`. The benchmark file hash is recorded there. The Wine challenge and mechanism failures were retained; the final model was not tuned to improve them.

## Known failure modes

- Correlated legitimate measurements and repeated integer measurements can resemble simulated proxies.
- Previously unseen leakage mechanisms and class-balance shifts can go undetected.
- A high review score is not proof; a low score is not evidence of safety.
- CSV values cannot establish prediction-time availability or preprocessing history.
- Binary classification is the only evaluated task; multiclass, regression and text embeddings are outside scope.

## Data and licensing

Training and primary evaluation use original generated data. The public-data challenge uses scikit-learn's bundled UCI Wine data, by S. Aeberhard and M. Forina (1992), DOI 10.24432/C5PC7J, CC BY 4.0. The report contains derived profiles with five artificial injections and a binary transformation of its target. The original dataset attribution and license remain applicable; original source and synthetic fixtures use the project MIT license.
