# Morish Macayan — portfolio and projects

Static portfolio with machine learning case studies and reproducible project source.

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
