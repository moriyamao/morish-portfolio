# Morish Macayan — portfolio and projects

Static portfolio with machine learning case studies and reproducible project source.

## Portfolio design

A buildless, responsive dark portfolio: oversized editorial typography, an original
pointer-responsive canvas study, two featured projects, and an expandable working
index. Client work and ML research have distinct paths, with the current résumé
available at `resume.pdf`. TravelEase has its own source-grounded case study.

Motion honors the operating system preference and can be paused in the footer.
The canvas pauses offscreen and in background tabs. Content, native project
disclosures, navigation, and email links remain usable without JavaScript.
The site does not use remote fonts, animation libraries, or analytics placeholders.
The Netlify contact form preserves the existing service contract; email is the
fallback. HTTP failures are not presented as successful submissions.

Design research: [Dennis Snellenberg](https://dennissnellenberg.com/),
[Brittany Chiang](https://brittanychiang.com/), and
[Rauno Freiberg](https://raunofreiberg.com/). These informed hierarchy, project
organization, and attention to interaction. No source, identity, or artwork was copied.

Run portfolio checks with `node --test assets.test.cjs portfolio.test.cjs`.
The independent ML demos retain their own styles, tests, and source directories.
Portfolio interaction tests use dependency-free DOM contract doubles, not a real
browser. The managed preview was unavailable during this redesign because of an
environment permission error; visual browser QA and live form delivery remain
unverified. No real contact submission is sent by the tests.

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

## Business websites

Three self-contained, responsive website concepts are published under Clients in the portfolio. These are independent design and implementation studies, not claims of commissioned client work.

| Website | Live | Source | Interaction |
| --- | --- | --- | --- |
| Forma | [Live website](https://moriyamao.github.io/morish-portfolio/clients/forma/) | [Source](clients/forma/) | Project filters, accessible project dialogs, room explorer, downloadable project brief |
| Torque | [Live website](https://moriyamao.github.io/morish-portfolio/clients/torque/) | [Source](clients/torque/) | Vehicle-size estimate builder, finish simulation, itemized estimate download |
| Common Ground | [Live website](https://moriyamao.github.io/morish-portfolio/clients/common-ground/) | [Source](clients/common-ground/) | Workspace explorer, daily/monthly pricing, selectable floor map, sample workday plan |

Run business-site checks with `node --test clients/clients.test.cjs`. All calculations run locally, with no booking, payment, account, or submission backend. No personal data is transmitted by these interactions. Fonts load from Google Fonts with system fallbacks; photography is checked into each site. Each site README records imagery and implementation details.
