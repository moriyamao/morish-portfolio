# Morish Macayan — portfolio and projects

Static portfolio with machine learning case studies and reproducible project source.

## LeakageLens

[Project and setup](projects/leakagelens/README.md) · [Browser CSV auditor](projects/leakagelens/web/index.html) · [Model card](projects/leakagelens/MODEL_CARD.md)

LeakageLens checks binary tabular train/test datasets for selected-feature row overlap, shared entities, timestamp interleaving and suspicious target proxies. The browser tool processes CSV files locally; the CLI also searches a bounded numeric sample for near duplicates. A trained random forest and published baseline comparisons expose both the model's strengths on generated examples and its failures on a public-data injection challenge.

```bash
cd projects/leakagelens
python -m leakagelens --train samples/train.csv --test samples/test.csv --target target --group customer_id --time observed_at --unavailable final_outcome
```

## TutorialCheck

[Project source and setup](projects/tutorialcheck/README.md) · [Browser demo](projects/tutorialcheck/web/index.html) · [Evaluation artifacts](projects/tutorialcheck/artifacts/evaluation.json)

TutorialCheck reviews pandas tutorials against an evaluated target environment using a trained sparse classifier, AST migration checks and execution-labelled fixtures. The demo runs inference locally; the Python project includes training, baseline comparisons and tests.

```bash
cd projects/tutorialcheck
python -m pip install -r requirements.txt
python -m tutorialcheck examples/legacy.py
python -m unittest discover -s tests -v
python -m tutorialcheck.train
```

The supported target is pandas 2.2.3. This is a measured prototype with a small original benchmark, not a general compatibility guarantee. The project README documents the results, errors and limits.

To preview the complete portfolio, run `python -m http.server 8000 --bind 127.0.0.1` from the repository root and open `http://127.0.0.1:8000/`.
