# Morish Macayan — portfolio and projects

Static portfolio with machine learning case studies and reproducible project source.

## Portfolio design

The portfolio uses the exported Higgsfield design: a sage-and-chartreuse system
map, reversible scroll animation, project screenshots, case studies, and visible
certifications. "Connect the pieces" includes all 22 distinct published projects.
"Make something real" narrows to HABITAT, LeakageLens, TravelEase, and FlyRank.
Co-authored research and client concepts retain their attribution and status.

GitHub Pages serves committed static HTML, CSS, and JavaScript from the repository
root. The React source and static exporter live in `portfolio-site/`. There is no
Higgsfield runtime, Worker, server API, or external animation dependency. The 11
exported pages support direct loads under `/morish-portfolio/`; existing demos,
certificate PDFs, and older case-study URLs remain available.

To rebuild after changing source:

```powershell
cd portfolio-site
npm ci --ignore-scripts
npm run build
node preview.mjs
```

Open `http://127.0.0.1:4173/morish-portfolio/`. Commit both the source and generated
output. No dependency installation or build is needed on GitHub Pages itself.
The source matches the hosted page except for the static routing adapter and the
contact form, which retains this repository's existing EmailJS delivery contract.
Archivo and JetBrains Mono load from Google Fonts with system fallbacks.

Motion honors reduced-motion preferences. The motion control removes the pinned
journey and leaves the map and shortlist usable. Static HTML contains the content
before hydration, including all 23 credential links. Email remains a fallback.

Run `node --test assets.test.cjs portfolio.test.cjs clients/clients.test.cjs sandboxes.test.cjs`
after building. Tests check project coverage, static paths, credential visibility,
existing demos, and mocked EmailJS success/failure handling. No real email is sent.

## Interactive sandboxes

The Sandbox / Just Because section collects interactive tools, learning games, and exploratory projects:

| Project | Demo | Case study | Source |
| --- | --- | --- | --- |
| HABITAT | [Home-design sandbox](projects/habitat/) | [Architecture and implementation](case-habitat.html) | [Source and checks](projects/habitat/README.md) |
| TRACE | [Computer Science learning lab](projects/trace/) | [Execution model and teaching flow](case-trace.html) | [Source and checks](projects/trace/README.md) |
| MARKETWISE | [Market learning game](projects/marketwise/) | — | [Source and checks](projects/marketwise/README.md) |
| CATALYST | [Pixel chemistry adventure](projects/catalyst/) | — | [Source and checks](projects/catalyst/README.md) |
| LAST TENANT | [Playable Roblox experience](https://www.roblox.com/games/102651311116462/LAST-TENANT) | — | Roblox Studio / Luau |

The browser projects run on the existing static GitHub Pages deployment. HABITAT
vendors Three.js locally; the others have no external runtime dependencies. Each
published project documents its implemented features, tests, data handling, and
limits in its README.

`lab/` provides a filterable, keyboard-accessible index for the five sandbox
projects. The homepage links to that Lab, states the portfolio's product direction,
collects project type and timeline in the
existing EmailJS contact form.

Run the portfolio, existing client-site, and sandbox checks from the repository root:

```powershell
node --test assets.test.cjs portfolio.test.cjs clients/clients.test.cjs sandboxes.test.cjs projects/habitat/model.test.mjs projects/trace/engine.test.mjs
```

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

To preview the complete portfolio at its deployed base path, run `node portfolio-site/preview.mjs` and open `http://127.0.0.1:4173/morish-portfolio/`.

## Business websites

Forma, Torque, and Common Ground are interactive website demos I built and presented to prospective clients.

| Website | Live | Source | Interaction |
| --- | --- | --- | --- |
| Forma | [Live website](https://moriyamao.github.io/morish-portfolio/clients/forma/) | [Source](clients/forma/) | Project filters, accessible project dialogs, room explorer, downloadable project brief |
| Torque | [Live website](https://moriyamao.github.io/morish-portfolio/clients/torque/) | [Source](clients/torque/) | Vehicle-size estimate builder, finish simulation, itemized estimate download |
| Common Ground | [Live website](https://moriyamao.github.io/morish-portfolio/clients/common-ground/) | [Source](clients/common-ground/) | Workspace explorer, daily/monthly pricing, selectable floor map, sample workday plan |

Run business-site checks with `node --test clients/clients.test.cjs`. All calculations run locally, with no booking, payment, account, or submission backend. No personal data is transmitted by these interactions. Fonts load from Google Fonts with system fallbacks; photography is checked into each site. Each site README records imagery and implementation details.
