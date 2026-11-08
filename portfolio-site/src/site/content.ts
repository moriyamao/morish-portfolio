/**
 * All portfolio content, transcribed from moriyamao.github.io/morish-portfolio.
 * Links point at the live project URLs that already exist there.
 */

const BASE = "https://moriyamao.github.io/morish-portfolio";

export const site = {
  name: "Morish Macayan",
  fullName: "Morish Alfonso R. Macayan",
  wordmark: "APPLIED CURIOSITY",
  role: "Computer Science, AI track · Mapúa University",
  subrole: "Independent developer",
  email: "morishalfonsomacayan@gmail.com",
  phone: "0968 458 9839",
  phoneHref: "tel:+639684589839",
  location: "Malolos City, Bulacan / Philippines / UTC+8",
  github: "https://github.com/moriyamao",
  linkedin: "https://www.linkedin.com/in/morish-macayan/",
  resume: `${BASE}/resume.pdf`,
};

export type CaseLink = { label: string; href: string; primary?: boolean };

export type CaseSection = {
  h: string;
  p?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  fig?: { src: string; alt: string; caption: string };
};

export type CaseStudy = {
  slug: string;
  num: string;
  title: string;
  kicker: string;
  lede: string;
  tags: string[];
  facts: { k: string; v: string }[];
  sections: CaseSection[];
  links: CaseLink[];
  note?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "habitat",
    num: "01",
    title: "HABITAT",
    kicker: "Independent project / interactive design",
    lede: "Draw a room. Arrange a home. See the same design from another angle.",
    tags: ["JavaScript", "SVG", "Three.js", "Browser storage"],
    facts: [
      { k: "Type", v: "Concept-design sandbox" },
      { k: "Scope", v: "One document, two renderers" },
      { k: "Storage", v: "Local autosave, JSON export" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "A floor plan is useful for editing, while a spatial view makes the same design easier to understand. HABITAT brings both into one workspace so a design does not have to be rebuilt separately for each view.",
        ],
      },
      {
        h: "What was built",
        fig: {
          src: "/assets/shots/habitat.jpg",
          alt: "HABITAT browser screenshot showing a two-bedroom floor plan beside its synchronized 3D home model",
          caption: "Browser capture during local verification. The plan and 3D view show the same editable document.",
        },
        p: [
          "I built the versioned design document, the SVG plan editor, and the synchronized Three.js view. Start with a blank plan or a furnished starter, draw walls, attach doors and windows, and arrange furniture. Dimensions, materials, and object properties remain visible while the design changes. The floor plan is the editing surface; the 3D view provides orbit and zoom controls.",
          "Designs autosave locally and can be shared by link or downloaded as JSON. They can also be reopened, exported as a floor-plan image, and changed with undo and redo.",
        ],
      },
      {
        h: "The hardest technical choice",
        p: [
          "A versioned document stores wall vertices, wall dimensions, hosted openings, and catalog objects with stable IDs. The SVG plan and Three.js scene both derive their geometry from that document. A door or window belongs to a wall rather than floating independently over a picture.",
          "The editor uses orthogonal walls and metric dimensions, while history operates on document edits instead of renderer state. That keeps the editable plan and the spatial view synchronized.",
        ],
      },
      {
        h: "Verification and proof",
        p: [
          "The project README documents the tools, document format, checks, and limitations. Geometry and document tests cover structural edits, openings, persistence, and history independently from the renderers.",
        ],
      },
      {
        h: "Honest limitations",
        p: [
          "This is a concept-design sandbox, not construction documentation. It supports up to five floors, six editable templates, and eighteen catalog objects. Stairs are decorative.",
          "The static app uses a pinned local copy of Three.js and needs no account, paid API, or application server. If 3D initialization fails, the floor-plan editor remains available.",
        ],
      },
    ],
    links: [
      { label: "Open the sandbox", href: `${BASE}/projects/habitat/`, primary: true },
      { label: "Source and setup", href: "https://github.com/moriyamao/morish-portfolio/tree/main/projects/habitat" },
    ],
  },
  {
    slug: "leakagelens",
    num: "02",
    title: "LeakageLens",
    kicker: "Independent machine learning prototype / 2026",
    lede:
      "A good score is not always a good model. LeakageLens turns that concern into an inspectable dataset audit, with observed split evidence and a separate learned column reviewer.",
    tags: ["Python", "scikit-learn", "JavaScript"],
    facts: [
      { k: "Type", v: "Local-processing CSV auditor" },
      { k: "Runs", v: "Browser and Python CLI" },
      { k: "Data", v: "Files never leave the machine" },
    ],
    sections: [
      {
        h: "What I built",
        p: [
          "I built the browser audit and Python CLI, the trained column reviewer, and the evaluation that documents where the reviewer fails. Choose training and test CSV files, identify the binary target, and optionally declare entity IDs, timestamps and features unavailable at prediction time. The browser processes the files locally and exports JSON containing row indices and statistics rather than raw observations.",
          "The audit detects selected-feature row matches, shared entities, timestamp interleaving and declared unavailable features. The Python CLI additionally searches a bounded sample for numeric near matches. Similar observations and shared entities require interpretation against the intended deployment; they are not automatic leakage verdicts.",
          "The trained reviewer uses nine statistics of each feature against the training target. Model inputs contain neither column names nor raw values. Test targets do not influence column statistics or scores.",
        ],
        fig: {
          src: "/assets/shots/leakagelens.jpg",
          alt: "LeakageLens browser interface showing the audit configuration and evidence panels",
          caption: "Live browser interface. Files are processed locally; nothing is uploaded.",
        },
      },
      {
        h: "How a split inflates a score",
        p: [
          "The same one-nearest-neighbor model is trained on repeated signatures from 80 entities and 480 rows, with a random target per entity. Random splitting rewards memorizing familiar entities. The group-disjoint split evaluates previously unseen entities, which is the deployment assumed in this example.",
        ],
        table: {
          head: ["Synthetic entity experiment", "Mean accuracy"],
          rows: [
            ["Random row split · five seeded runs", "100%"],
            ["Group-disjoint split · five seeded runs", "50%"],
          ],
        },
      },
      {
        h: "The model's limits are part of the result",
        table: {
          head: ["Column-review benchmark", "Learned F1", "Simple rules F1"],
          rows: [
            ["Generated holdout · 190 columns, 10 datasets", "1.00", "0.67"],
            ["UCI Wine + artificial leaks · 18 columns", "0.50", "0.75"],
          ],
        },
        p: [
          "The generated benchmark has 760 column cases across 40 source datasets, partitioned by source dataset. It includes legitimate strong predictors and independent controls alongside eight injected target-proxy mechanisms. The threshold is selected only on validation data.",
          "Public-data transfer is weak: the model flags seven legitimate Wine features and misses one injection. Its precision is 0.36 and recall is 0.80. The challenge is one public source dataset with five artificial leaks, not a benchmark of naturally occurring leakage. When the missingness mechanism is excluded from training, its holdout F1 falls to zero.",
          "High synthetic performance therefore does not establish broad leakage-detection ability. A statistical score cannot reveal feature availability or distinguish every legitimate predictor from an encoded outcome.",
        ],
      },
    ],
    links: [
      { label: "Try the demo", href: `${BASE}/projects/leakagelens/web/index.html`, primary: true },
      { label: "Metrics and predictions", href: `${BASE}/projects/leakagelens/artifacts/evaluation.json` },
      { label: "Model card", href: "https://github.com/moriyamao/morish-portfolio/blob/main/projects/leakagelens/MODEL_CARD.md" },
      { label: "Source", href: "https://github.com/moriyamao/morish-portfolio/tree/main/projects/leakagelens" },
    ],
  },
  {
    slug: "travelease",
    num: "03",
    title: "TravelEase",
    kicker: "Academic project / full-stack development",
    lede:
      "An academic full-stack project for trips, daily plans, budgets, and AI-to-human support. The application is currently under renovation.",
    tags: ["PHP", "MySQL", "JavaScript", "Groq API"],
    facts: [
      { k: "Role", v: "Front end and back end" },
      { k: "Deployed", v: "Render, PHP and MySQL" },
      { k: "Access", v: "Customer, staff, administrator" },
      { k: "Status", v: "Under renovation" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "Travel planning becomes fragmented when the itinerary, spending, and support conversation live in separate places. TravelEase brings those workflows into one PHP and MySQL application with customer, staff, and administrator roles.",
        ],
      },
      {
        h: "What I built",
        fig: {
          src: "/assets/shots/travelease-dashboard.png",
          alt: "TravelEase dashboard showing a journey card, search and filter controls, and a support panel",
          caption: "The customer dashboard brings trips, search, planning, and support together.",
        },
        p: [
          "Customers can create, view, edit, and delete trips, organize itinerary items by day and time, and track estimated versus actual costs. Budget summaries expose planned spending, actual spending, and the remaining or exceeded trip budget.",
          "The support assistant calls the Groq API from the server. Rules escalate sensitive categories such as account security, billing, and complaints. For other TravelEase questions, the assistant can flag that a human is needed, while unrelated questions are declined. Escalations are supported by customer and staff messaging routes. Service failures also fall back to staff escalation rather than displaying a fabricated answer.",
        ],
      },
      {
        h: "Sign in",
        fig: {
          src: "/assets/shots/travelease.jpg",
          alt: "TravelEase sign-in page on the deployed Render application",
          caption: "The deployed application's sign-in page. The travel workspace is available after authentication.",
        },
      },
      {
        h: "Plan a trip",
        fig: {
          src: "/assets/shots/travelease-plan.png",
          alt: "TravelEase new-trip form with destination, dates, status, currency, budget, and notes",
          caption: "The trip form captures dates, destination, currency, optional budget, and notes.",
        },
      },
      {
        h: "A sample journey",
        fig: {
          src: "/assets/shots/travelease-trip.png",
          alt: "Sample TravelEase trip showing an itinerary item and estimated and actual costs",
          caption: "Sample trip data showing the itinerary and estimated versus actual costs; the figures are illustrative.",
        },
      },
      {
        h: "Support chat",
        fig: {
          src: "/assets/shots/travelease-chat.png",
          alt: "TravelEase support chat with a greeting and reply",
          caption: "The customer-facing support chat. This screenshot shows the interface, not an escalation example.",
        },
      },
      {
        h: "The hardest technical choice",
        p: [
          "Ownership is enforced as part of the database query. A requested trip must match both its ID and the authenticated user's ID before itinerary items are read. Server-side authorization guards also separate customer, staff, and administrator routes.",
          "Password-based authentication uses password hashing. Google sign-in verifies token signatures and relevant claims server-side. CSRF tokens protect state-changing forms, and session handling includes regeneration after sign-in. These are implemented controls visible in the source, not a claim that the application has passed a comprehensive security assessment.",
        ],
      },
      {
        h: "Honest limitations",
        p: [
          "The model's self-assessment is not a calibrated confidence score, and keyword escalation rules are not exhaustive. Further validation should cover ownership and role checks including unauthorized trip and itinerary access, budget edge cases, invalid dates, concurrent edits, escalation behavior for ambiguous messages, and authentication abuse controls.",
        ],
      },
    ],
    links: [
      { label: "Open the live site", href: "https://travelease-zp7o.onrender.com/auth/login.php", primary: true },
      { label: "Source", href: "https://github.com/moriyamao/TravelEase" },
    ],
  },
  {
    slug: "flyrank",
    num: "04",
    title: "Refresh & CTR-Fix Review Queue",
    kicker: "FlyRank · Machine Learning Intern · 2026",
    lede:
      "An end-to-end ML pipeline built on anonymized production search data, used to decide which content pages a strategist should look at first: a rule baseline, a client-grouped-validated model, and a deployed research paper with a human-reviewed action playbook.",
    tags: ["Python", "scikit-learn", "Data analysis", "Internship"],
    facts: [
      { k: "Role", v: "Machine Learning Intern" },
      { k: "Data", v: "30,000-row pseudonymized slice" },
      { k: "Result", v: "Mixed, reported honestly" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "Clients have large content portfolios and no easy way to know which pages need attention this week. Someone has to decide: does this page need a refresh, a CTR fix, or is it fine? The goal was to make that weekly triage decision less of a guess for a content strategist reading a queue.",
        ],
      },
      {
        h: "Data",
        p: [
          "A pseudonymized 30,000-row starter slice of the internship data warehouse: 32 clients, a trailing-90-day performance window, and a 30-day-versus-previous-30-day trend label. Client names, URLs, and private query text never appear anywhere in the work. Columns describing how content was generated were excluded as off-topic, and the two trend columns that define the label were excluded from the feature set to avoid leakage.",
        ],
        fig: {
          src: "/assets/shots/flyrank.jpg",
          alt: "The deployed FlyRank capstone research paper",
          caption: "The deployed research paper, which carries every number and the action playbook.",
        },
      },
      {
        h: "Method",
        p: [
          "I started with a hand-written rule, not a model: flag a page if it has real visibility and either it is stale, or it ranks fine but its click-through rate lags similar pages at that position. Before trusting either signal, I checked both against real bucket tables. Staleness came back mixed: real for well-populated tiers, reversed on a 174-row tier too small to trust. The CTR-position relationship came back confirmed, dropping cleanly as position worsened.",
          "Only then did I try a Random Forest, trained on 13 numeric and 3 categorical features that are all knowable before the outcome. The split was grouped by client, not random: pages from the same client share hidden regularities a random split would let a model quietly memorize.",
        ],
        table: {
          head: ["Check", "Result"],
          rows: [
            ["Random-split AUC (naive)", "0.745"],
            ["Client-grouped AUC (honest)", "0.600"],
            ["Leakage test: inject a label-derived column", "AUC jumps to 1.000, so the harness catches it"],
          ],
        },
      },
      {
        h: "Results, model versus baseline",
        table: {
          head: ["Queue size (K)", "Rule baseline", "Logistic regression", "Random forest"],
          rows: [
            ["20", "0.500", "0.550", "0.500"],
            ["50", "0.520", "0.640", "0.560"],
            ["100", "0.600", "0.590", "0.560"],
            ["200", "0.625", "0.565", "0.585"],
          ],
        },
        p: [
          "On the same held-out client split, the model did not clearly beat the rule baseline. It edged ahead for small, tight review queues; the simple rule won for larger ones. When I first saw the drop from 0.745 to 0.600 under the grouped split, my reaction was just oh no, then a shrug. It is not the number I wanted; it is the real one.",
        ],
      },
      {
        h: "Limitations",
        list: [
          "Cross-sectional, one snapshot: nothing here shows a refresh causes a page to stop declining, only that staleness and decline are observed together.",
          "A 32-client teaching slice, not the full production warehouse.",
          "The model's skill is real but modest (AUC 0.600), treated as worth a second look, never a confidence percentage.",
          "CTR-based signals cannot tell a genuine content problem from a SERP feature stealing the click. That distinction still needs a human.",
        ],
      },
      {
        h: "The playbook",
        list: [
          "Stale plus CTR-gap pages first. Both signals agree, highest confidence.",
          "Stale only and CTR-gap only reviewed separately, one action each.",
          "Model-flagged, rule-silent pages routed to a human second look, never an automatic action: the model has no transparent reason code the way the rule does.",
          "No page is ever auto-published, auto-edited, or auto-deleted from this queue. Pages below a minimum visibility floor never receive an automated action.",
        ],
      },
    ],
    links: [
      { label: "Read the research paper", href: "https://moriyamao.github.io/flyrank-ml-internship/", primary: true },
      { label: "Repository", href: "https://github.com/moriyamao/flyrank-ml-internship" },
    ],
    note: "Built on the FlyRank ML internship dataset.",
  },
  {
    slug: "trace",
    num: "05",
    title: "TRACE",
    kicker: "Independent project / computer science education",
    lede: "Predict the next step. Watch what changes. Go back and inspect why.",
    tags: ["JavaScript", "SVG", "Algorithms", "Data structures"],
    facts: [
      { k: "Type", v: "Interactive learning tool" },
      { k: "Execution", v: "Recorded snapshots, no code service" },
      { k: "Labs", v: "Search, sorting, stacks, trees, graphs" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "An algorithm animation can show that something changed without making the reason easy to inspect. TRACE connects each visible change to pseudocode, operation counts, and an explanation, while letting a learner return to any earlier state.",
        ],
      },
      {
        h: "What was built",
        fig: {
          src: "/assets/shots/trace.jpg",
          alt: "TRACE browser screenshot showing the graph lab and breadth-first search visualization",
          caption: "Browser capture during local verification. Open the lab to edit the input and explore the complete workspace.",
        },
        p: [
          "TRACE provides editable examples in search, sorting, stacks and queues, binary search trees, and graph traversal. A shared timeline links diagrams to pseudocode, counters, and a plain-language explanation of each step. Visitors can play an execution, step forward, return to an earlier state, or change the input. Optional prediction questions pause the sequence so the learner can answer before seeing what happens next.",
        ],
      },
      {
        h: "The hardest technical choice",
        p: [
          "Algorithms produce immutable execution snapshots. Each snapshot stores the state, highlighted elements, counters, explanation, and pseudocode position. Rendering a snapshot never executes another algorithm step, so moving backward and replaying preserve the same result.",
        ],
      },
      {
        h: "Honest limitations",
        p: [
          "Input limits keep examples readable, and validation explains inputs that cannot run. Operation counters describe the work performed by each implementation; playback speed controls presentation, not measured algorithm runtime. The app does not execute arbitrary source code and does not claim measured learning outcomes.",
        ],
      },
    ],
    links: [
      { label: "Open the lab", href: `${BASE}/projects/trace/`, primary: true },
      { label: "Source", href: "https://github.com/moriyamao/morish-portfolio/tree/main/projects/trace" },
    ],
  },
  {
    slug: "tutorialcheck",
    num: "06",
    title: "TutorialCheck",
    kicker: "Independent machine learning prototype / 2026",
    lede:
      "An old tutorial can be correct for its original environment and fail in yours. TutorialCheck reviews pandas code for known migration issues and adds a trained risk score you can inspect.",
    tags: ["Python", "pandas", "scikit-learn", "JavaScript"],
    facts: [
      { k: "Type", v: "Developer tooling" },
      { k: "Target", v: "pandas 2.2.3" },
      { k: "Runs", v: "Browser and Python CLI" },
    ],
    sections: [
      {
        h: "The implementation",
        p: [
          "The project includes a Python CLI, static browser demo, TF-IDF/logistic regression model, AST diagnostics, migration references and a reproducible training pipeline. Python and browser inference share the exported JSON model. Pasted snippets are reviewed without executing them.",
          "The training fixtures cover eleven API migration families and valid Python list controls. Running those fixtures supplies the labels, and repaired cases include assertions about their results. This connects the model to observed execution outcomes rather than guessed compatibility labels.",
        ],
        fig: {
          src: "/assets/shots/tutorialcheck.jpg",
          alt: "TutorialCheck browser demo showing a flagged pandas snippet and its risk score",
          caption: "The static demo, running the exported model in the browser.",
        },
      },
      {
        h: "Evidence and limits",
        table: {
          head: ["Evaluation", "Learned model F1", "AST rules F1"],
          rows: [
            ["Generated recipe holdout · 69 snippets", "1.00", "1.00"],
            ["Independent challenge · 24 snippets", "0.74", "0.80"],
          ],
        },
        p: [
          "The learned model has higher challenge recall (0.83 versus 0.67) but lower precision (0.67 versus 1.00). It catches additional patterns and also raises more false alarms. Its challenge F1 does not exceed the static baseline. The generated holdout shares API families with training, so its perfect score is not evidence of real-world accuracy. The independent challenge is also small and project-authored; no external tutorial benchmark has been measured.",
          "Known errors include obsolete names in comments and strings, custom objects with valid append methods, and unfamiliar aliases. AST checks handle simple patterns rather than complete Python type inference. The release keeps these errors visible.",
        ],
      },
    ],
    links: [
      { label: "Open the demo", href: `${BASE}/projects/tutorialcheck/web/index.html`, primary: true },
      { label: "Full metrics", href: `${BASE}/projects/tutorialcheck/artifacts/evaluation.json` },
      { label: "Source", href: "https://github.com/moriyamao/morish-portfolio/tree/main/projects/tutorialcheck" },
    ],
  },
  {
    slug: "mlp",
    num: "07",
    title: "Multilayer Perceptron, from scratch",
    kicker: "Academic project / Mapúa University",
    lede:
      "A two-layer neural network implemented in NumPy only: no scikit-learn, no PyTorch, no TensorFlow doing the actual learning. The point was not a good accuracy number; it was to prove I understood what a framework normally hides.",
    tags: ["Python", "NumPy", "Jupyter Notebook"],
    facts: [
      { k: "Type", v: "Coursework, from scratch" },
      { k: "Layers", v: "Two, hand-written backward pass" },
      { k: "Training", v: "Mini-batch gradient descent" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "It is easy to call model.fit() and never actually understand backpropagation. This project removed that option: build a working MLP where every matrix multiplication, activation, and gradient update is code I wrote and can explain line by line.",
        ],
      },
      {
        h: "What I did",
        list: [
          "Implemented a two-layer MLP from scratch in NumPy: weights, biases, and the training loop, with no high-level framework handling the learning.",
          "Wrote forward propagation and backpropagation by hand, with configurable activation functions.",
          "Trained with mini-batch gradient descent, and evaluated using separate training and validation metrics rather than trusting a single training-accuracy number.",
          "Experimented with different hyperparameters and network configurations to see how each one changed training behavior, not just the final score.",
        ],
      },
      {
        h: "What came of it",
        p: [
          "A working, reproducible notebook that trains end to end and that I can walk someone through without hand-waving over the math. The honest test for a from-scratch project is not the accuracy number; it is whether I can explain every line when someone asks why that gradient.",
        ],
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/moriyamao", primary: true }],
  },
  {
    slug: "breast-ultrasound",
    num: "08",
    title: "Breast Ultrasound Research",
    kicker: "Academic research / computer vision / co-author",
    lede:
      "Deep learning-based segmentation and classification of breast lesions in ultrasound datasets. A team study of YOLO26 lesion detection comparing augmentation, dataset size, and model capacity.",
    tags: ["YOLO26", "Roboflow", "Google Colab"],
    facts: [
      { k: "Role", v: "Co-author" },
      { k: "Data", v: "BUSI, BUS-UCLM, BUS-BRA" },
      { k: "Status", v: "Experimental prototype, external validation pending" },
    ],
    sections: [
      {
        h: "From an image to a region",
        p: [
          "This team study investigates a pipeline that predicts lesion categories, bounding boxes, and segmentation masks from breast ultrasound images. The work compares small and nano YOLO26 segmentation models and examines how augmentation, dataset size, and training configuration affect the results.",
          "The paper combines BUSI, BUS-UCLM, and BUS-BRA into a balanced set of 1,374 original images, with 458 images in each reported category. The principal augmented configuration contains approximately 3,200 images. Augmented copies do not represent additional independent patients.",
        ],
      },
      {
        h: "More images did not mean better boundaries",
        p: [
          "The reported experiments distinguish broad localization at an IoU threshold of 0.50 from stricter localization across thresholds of 0.50 to 0.95. Larger augmented datasets improved some mAP@50 results while reducing performance under the stricter metric. The nano model was competitive at mAP@50; the small model performed better at mAP@50:95.",
          "For the paper's principal YOLO26s configuration: box mAP@50 0.842, box mAP@50:95 0.597, mask mAP@50 0.838, and mask mAP@50:95 0.557. Rounded values are reported from the manuscript, not independently reproduced here. These metrics are not diagnostic accuracy.",
        ],
      },
      {
        h: "What the results can support",
        p: [
          "This is a co-authored academic study, presented as an experimental research prototype. It does not establish clinical effectiveness or readiness for patient use. The manuscript reports that dedicated external-dataset evaluation and CPU-based ONNX deployment were unfinished at the time of writing; a hosted interface alone does not establish either milestone.",
        ],
      },
      {
        h: "Shared work",
        p: [
          "Authors: Morish Alfonso R. Macayan, Jessica Christine Marie D. Seno, Erin Faye D. Fernandez, Aaron John D. Gonzales, and Rylon Kenley C. Realosa, Mapúa University.",
          "My role is listed here as co-author. Individual implementation responsibilities are not specified in the supplied manuscript, so this page does not assign them.",
        ],
      },
    ],
    links: [
      { label: "Read the paper (PDF)", href: `${BASE}/research/breast-ultrasound-paper.pdf`, primary: true },
      { label: "Live prototype", href: "https://breast-ultrasound-web-pragmatism.streamlit.app" },
    ],
  },
  {
    slug: "supply-chain-resilience",
    num: "09",
    title: "Supply-Chain Resilience",
    kicker: "Academic research / simulation / co-author",
    lede:
      "Capital and storage constrained resilience: a scenario-based agent-based simulation of supplier diversification and inventory buffering strategies in the Philippine food manufacturing context.",
    tags: ["Agent-based modeling", "Monte Carlo", "Random Forest"],
    facts: [
      { k: "Role", v: "Co-author, with Aaron John D. Gonzales" },
      { k: "Method", v: "Scenario simulation, Latin hypercube sampling" },
      { k: "Status", v: "Preliminary demonstration" },
    ],
    sections: [
      {
        h: "Two strategies, limited resources",
        p: [
          "A business can prepare for a supply interruption by keeping additional inventory or by arranging alternative suppliers. Both choices use money, and stored inventory also uses space. This study models how those constraints interact with disruption duration and severity.",
          "The simulation compares strategies under shared scenario parameters and uses repeated stochastic runs to estimate service levels. A Random Forest examines patterns in the simulation outputs.",
        ],
      },
      {
        h: "A demonstration before the full study",
        p: [
          "The manuscript's demonstration uses 100 scenarios and 20 Monte Carlo repetitions per strategy. It reports that buffering was preferred in 85 scenarios, diversification in 12, and three fell within the study's equivalence tolerance. Disruption duration was the strongest reported Random Forest predictor.",
          "These are preliminary, manuscript-reported simulation outcomes, not independently reproduced results or measured outcomes from operating businesses. The planned full design is 1,000 scenarios with 100 repetitions.",
        ],
      },
      {
        h: "What still needs resolving",
        p: [
          "The manuscript records unresolved parameter sourcing, partially paired random streams, an unused supplier-count parameter, and a model without revenue replenishment. Its methodology and limitations also differ on the calibration dataset and the use of STL and SHAP.",
        ],
      },
      {
        h: "Shared work",
        p: [
          "Co-authored by Aaron John D. Gonzales and Morish Alfonso Macayan, School of Information Technology, Mapúa University.",
          "This entry identifies my role as co-author; the supplied paper does not assign individual implementation responsibilities. It is presented as an academic research paper, with no claim of peer-reviewed publication.",
        ],
      },
    ],
    links: [
      { label: "Read the manuscript (PDF)", href: `${BASE}/research/supply-chain-resilience-paper.pdf`, primary: true },
    ],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);

export const getCase = caseBySlug;
export const caseSlugList = cases.map((c) => c.slug);

export type Work = {
  key: string;
  title: string;
  kind: string;
  line: string;
  built: string;
  tags: string[];
  img?: string;
  alt?: string;
  plate?: "tenant" | "agent";
  links: CaseLink[];
  caseSlug?: string;
};

export const selected: Work[] = [
  {
    key: "habitat",
    title: "HABITAT",
    kind: "Independent / interactive design",
    line: "Shape a home in a precise 2D plan, then explore the same design in 3D.",
    built: "I built the versioned design document, the SVG plan editor, and the synchronized Three.js view.",
    tags: ["JavaScript", "SVG", "Three.js"],
    img: "/assets/shots/habitat.jpg",
    alt: "HABITAT: a two-bedroom floor plan beside its synchronized 3D home model",
    links: [
      { label: "Open the sandbox", href: `${BASE}/projects/habitat/`, primary: true },
      { label: "Case study", href: "/case/habitat" },
    ],
    caseSlug: "habitat",
  },
  {
    key: "leakagelens",
    title: "LeakageLens",
    kind: "Applied ML / independent prototype",
    line: "A local CSV auditor for split overlap and potential target proxies, with a trained column reviewer and documented limits.",
    built: "I built the browser audit and Python CLI, the trained reviewer, and the evaluation that shows where it fails.",
    tags: ["Python", "scikit-learn", "JavaScript"],
    img: "/assets/shots/leakagelens.jpg",
    alt: "LeakageLens: the local CSV audit interface with its evidence panels",
    links: [
      { label: "Try the demo", href: `${BASE}/projects/leakagelens/web/index.html`, primary: true },
      { label: "Case study", href: "/case/leakagelens" },
    ],
    caseSlug: "leakagelens",
  },
  {
    key: "travelease",
    title: "TravelEase",
    kind: "Academic / full-stack",
    line: "A travel planner with daily itineraries, estimated and actual budgets, role-based access, and AI-to-human support.",
    built: "I built the front end and the back end: trips, itineraries, budget summaries, and staff escalation.",
    tags: ["PHP", "MySQL", "Groq API"],
    img: "/assets/shots/travelease-dashboard.png",
    alt: "TravelEase customer dashboard with a sample journey and planning controls",
    links: [
      { label: "Open the live site", href: "https://travelease-zp7o.onrender.com/auth/login.php", primary: true },
      { label: "Case study", href: "/case/travelease" },
    ],
    caseSlug: "travelease",
  },
];

export const alsoBuilt: Work[] = [
  {
    key: "tutorialcheck",
    title: "TutorialCheck",
    kind: "ML / developer tooling",
    line: "Flags outdated pandas patterns with AST checks and a trained classifier, on execution-labeled fixtures.",
    built: "I built the model, the AST diagnostics, and the browser and Python inference that share one exported model.",
    tags: ["Python", "pandas", "scikit-learn"],
    img: "/assets/shots/tutorialcheck.jpg",
    alt: "TutorialCheck: a flagged pandas snippet with its risk score",
    links: [
      { label: "Try the demo", href: `${BASE}/projects/tutorialcheck/web/index.html`, primary: true },
      { label: "Case study", href: "/case/tutorialcheck" },
    ],
    caseSlug: "tutorialcheck",
  },
  {
    key: "data-scout",
    title: "Data Scout Agent",
    kind: "LLM / tool calling",
    line: "A command-line assistant that answers questions about content performance by generating and executing pandas queries.",
    built: "I built the bounded tool-use loop. Numerical answers are grounded in tool output, with every executed query shown.",
    tags: ["Python", "pandas", "Groq API"],
    plate: "agent",
    links: [
      { label: "Explore the source", href: "https://github.com/moriyamao/data-scout-agent", primary: true },
    ],
  },
];

export type LabItem = {
  key: string;
  num: string;
  title: string;
  kind: string;
  group: "space" | "learning" | "game";
  status: "Playable" | "Playable build";
  line: string;
  tags: string[];
  img?: string;
  alt?: string;
  plate?: "tenant";
  href: string;
  extra?: CaseLink;
};

export const lab: LabItem[] = [
  {
    key: "habitat",
    num: "01",
    title: "HABITAT",
    kind: "Architectural playground",
    group: "space",
    status: "Playable",
    line: "Draw a home in plan, arrange it in 3D, work across storeys, and save the concept in your browser.",
    tags: ["JavaScript", "SVG", "Three.js"],
    img: "/assets/shots/habitat.jpg",
    alt: "HABITAT floor plan and synchronized 3D view",
    href: `${BASE}/projects/habitat/`,
    extra: { label: "Case study", href: "/case/habitat" },
  },
  {
    key: "trace",
    num: "02",
    title: "TRACE",
    kind: "Computer science lab",
    group: "learning",
    status: "Playable",
    line: "Step through algorithms one recorded state at a time. Predict the next move and rewind without rerunning.",
    tags: ["JavaScript", "SVG", "Algorithms"],
    img: "/assets/shots/trace.jpg",
    alt: "TRACE graph lab with a breadth-first search visualization",
    href: `${BASE}/projects/trace/`,
    extra: { label: "Case study", href: "/case/trace" },
  },
  {
    key: "marketwise",
    num: "03",
    title: "MARKETWISE",
    kind: "Market learning game",
    group: "learning",
    status: "Playable",
    line: "Learn orders, risk, diversification, and long-term investing through a guided pixel-art market town.",
    tags: ["JavaScript", "Canvas", "Learning design"],
    img: "/assets/shots/marketwise.jpg",
    alt: "MARKETWISE market town with a portfolio summary and order ticket",
    href: `${BASE}/projects/marketwise/`,
  },
  {
    key: "catalyst",
    num: "04",
    title: "CATALYST",
    kind: "Chemistry adventure",
    group: "game",
    status: "Playable",
    line: "A first-person pixel chemistry game with six lab challenges, visual feedback, and quick concepts along the way.",
    tags: ["JavaScript", "CSS art", "Canvas"],
    img: "/assets/shots/catalyst.jpg",
    alt: "CATALYST pixel laboratory with the mission board and molecular archive",
    href: `${BASE}/projects/catalyst/`,
  },
  {
    key: "last-tenant",
    num: "05",
    title: "LAST TENANT",
    kind: "Roblox horror experience",
    group: "game",
    status: "Playable build",
    line: "A solo first-person horror story set in a Philippine boarding house. Restore the power, find a way out, stay quiet when something knocks.",
    tags: ["Roblox Studio", "Luau", "Level design"],
    img: "/assets/shots/last-tenant.png",
    alt: "LAST TENANT horror game artwork showing a dark boarding-house corridor and the game's title",
    href: "https://www.roblox.com/games/102651311116462/LAST-TENANT",
  },
];

export type Academic = {
  key: string;
  num: string;
  title: string;
  kind: string;
  role: string;
  line: string;
  tags: string[];
  links: CaseLink[];
  shared?: string;
};

export const academic: Academic[] = [
  {
    key: "travelease",
    num: "01",
    title: "TravelEase",
    kind: "Full-stack application",
    role: "Front end and back end",
    line: "A travel planner with daily itineraries, estimated and actual budgets, role-based access, and AI-to-human support.",
    tags: ["PHP", "MySQL", "JavaScript", "Groq API"],
    links: [
      { label: "Live website", href: "https://travelease-zp7o.onrender.com/auth/login.php", primary: true },
      { label: "Case study", href: "/case/travelease" },
      { label: "Source", href: "https://github.com/moriyamao/TravelEase" },
    ],
  },
  {
    key: "ultrasound",
    num: "02",
    title: "Breast Ultrasound Research",
    kind: "Computer vision research",
    role: "Co-author",
    shared:
      "Five authors from Mapúa University. The manuscript does not assign individual implementation responsibilities, so this page does not either.",
    line: "A co-authored study of YOLO26 lesion detection and segmentation, comparing augmentation, dataset size, and model capacity.",
    tags: ["YOLO26", "Roboflow", "Google Colab"],
    links: [
      { label: "Research overview", href: "/case/breast-ultrasound", primary: true },
      { label: "Paper (PDF)", href: `${BASE}/research/breast-ultrasound-paper.pdf` },
      { label: "Live prototype", href: "https://breast-ultrasound-web-pragmatism.streamlit.app" },
    ],
  },
  {
    key: "resilience",
    num: "03",
    title: "Supply-Chain Resilience",
    kind: "Simulation and machine learning",
    role: "Co-author, with Aaron John D. Gonzales",
    shared:
      "Two authors, School of Information Technology, Mapúa University. Individual implementation responsibilities are not assigned in the paper.",
    line: "A co-authored simulation comparing supplier diversification and inventory buffering under capital and storage constraints.",
    tags: ["Agent-based modeling", "Monte Carlo", "Random Forest"],
    links: [
      { label: "Research overview", href: "/case/supply-chain-resilience", primary: true },
      { label: "Paper (PDF)", href: `${BASE}/research/supply-chain-resilience-paper.pdf` },
    ],
  },
  {
    key: "alx",
    num: "04",
    title: "ALX Desserts",
    kind: "Business application",
    role: "Team lead and full-stack developer",
    line: "Point-of-sale and inventory application with GCash QR payments and reporting.",
    tags: ["Flask", "JavaScript"],
    links: [{ label: "View source", href: "https://github.com/moriyamao/ALX-Desserts", primary: true }],
  },
  {
    key: "hotel",
    num: "05",
    title: "HotelEase",
    kind: "Desktop application",
    role: "Lead programmer 2",
    line: "Hotel management and booking system for guests and administrators.",
    tags: ["Java", "JavaFX", "Maven"],
    links: [{ label: "View source", href: "https://github.com/moriyamao/HotelEase", primary: true }],
  },
  {
    key: "mlp",
    num: "06",
    title: "Neural Network, from Scratch",
    kind: "Foundations coursework",
    role: "Sole author",
    line: "Forward pass to backpropagation without a training framework: a two-layer MLP with configurable activations and mini-batch descent.",
    tags: ["Python", "NumPy", "Notebook"],
    links: [
      { label: "Case study", href: "/case/mlp", primary: true },
      { label: "Repository", href: "https://github.com/moriyamao" },
    ],
  },
];

export type Client = {
  key: string;
  num: string;
  title: string;
  kind: string;
  line: string;
  img: string;
  alt: string;
  live: string;
  source: string;
  status: "delivered" | "demo";
};

export const clients: Client[] = [
  {
    key: "solace",
    num: "01",
    title: "Solace",
    kind: "Fashion storefront",
    line: "Storefront build delivered end to end, from layout to deploy.",
    img: "/assets/shots/solace.jpg",
    alt: "Solace fashion storefront homepage",
    live: `${BASE.replace("/morish-portfolio", "")}/Solace/`,
    source: "https://github.com/moriyamao/Solace",
    status: "delivered",
  },
  {
    key: "celeste",
    num: "02",
    title: "Celesté",
    kind: "Cosmetics storefront",
    line: "Storefront build delivered end to end, from layout to deploy.",
    img: "/assets/shots/celeste.jpg",
    alt: "Celesté cosmetics storefront homepage",
    live: `${BASE.replace("/morish-portfolio", "")}/Celeste/`,
    source: "https://github.com/moriyamao/Celeste",
    status: "delivered",
  },
  {
    key: "thriftnest",
    num: "03",
    title: "Thrift Nest",
    kind: "Thrift store",
    line: "Storefront build delivered end to end, from layout to deploy.",
    img: "/assets/shots/thriftnest.jpg",
    alt: "Thrift Nest storefront homepage",
    live: `${BASE.replace("/morish-portfolio", "")}/Thrift-Nest/`,
    source: "https://github.com/moriyamao/Thrift-Nest",
    status: "delivered",
  },
  {
    key: "furever",
    num: "04",
    title: "Furever Haven",
    kind: "Pet adoption platform",
    line: "Adoption platform build delivered end to end, from layout to deploy.",
    img: "/assets/shots/furever.jpg",
    alt: "Furever Haven adoption platform homepage",
    live: `${BASE.replace("/morish-portfolio", "")}/Furever-Haven/`,
    source: "https://github.com/moriyamao/Furever-Haven",
    status: "delivered",
  },
  {
    key: "forma",
    num: "05",
    title: "Forma",
    kind: "Architecture studio",
    line: "An interactive demo I built and presented to prospective clients: filterable studies, a project dialog, and a room explorer.",
    img: "/assets/shots/forma.jpg",
    alt: "Forma architecture studio demo homepage",
    live: `${BASE}/clients/forma/`,
    source: "https://github.com/moriyamao/morish-portfolio/tree/main/clients/forma",
    status: "demo",
  },
  {
    key: "torque",
    num: "06",
    title: "Torque",
    kind: "Auto detailing",
    line: "An interactive demo I built and presented to prospective clients: a live estimate builder with per-choice pricing.",
    img: "/assets/shots/torque.jpg",
    alt: "Torque auto detailing demo homepage",
    live: `${BASE}/clients/torque/`,
    source: "https://github.com/moriyamao/morish-portfolio/tree/main/clients/torque",
    status: "demo",
  },
  {
    key: "common-ground",
    num: "07",
    title: "Common Ground",
    kind: "Coworking space",
    line: "An interactive demo I built and presented to prospective clients: a seat map and a workday planner that prices the plan.",
    img: "/assets/shots/commonground.jpg",
    alt: "Common Ground coworking demo homepage",
    live: `${BASE}/clients/common-ground/`,
    source: "https://github.com/moriyamao/morish-portfolio/tree/main/clients/common-ground",
    status: "demo",
  },
];

export const timeline = [
  { year: "2026", role: "Machine Learning Intern", org: "FlyRank", note: "Research, features, evaluation" },
  { year: "2025", role: "Independent Front-End Developer", org: "Four client websites", note: "Design through deployment" },
  { year: "2024 to present", role: "BS Computer Science", org: "Mapúa University", note: "Artificial Intelligence track" },
];

export const toolkit = [
  "Python",
  "scikit-learn",
  "pandas / NumPy",
  "JavaScript",
  "HTML / CSS",
  "PHP / MySQL",
  "Flask",
  "REST APIs",
  "Git / GitHub",
  "Java / JavaFX",
];

export const credentials: { name: string; org: string; href: string }[] = [
  { name: "Machine Learning Internship: Certificate of Completion", org: "FlyRank.ai", href: `${BASE}/certificates/flyrank-machine-learning-internship.pdf` },
  { name: "Microsoft AI & ML Engineering Professional Certificate", org: "Microsoft", href: `${BASE}/certificates/microsoft-ai-ml-engineering.pdf` },
  { name: "Microsoft Generative AI Engineering Professional Certificate", org: "Microsoft", href: `${BASE}/certificates/microsoft-generative-ai-engineering.pdf` },
  { name: "IBM Machine Learning", org: "IBM", href: `${BASE}/certificates/ibm-machine-learning.pdf` },
  { name: "AI and Machine Learning Algorithms and Techniques", org: "Microsoft", href: site.linkedin },
  { name: "Foundations of AI and Machine Learning", org: "Microsoft", href: site.linkedin },
  { name: "AWS Educate Machine Learning Foundations", org: "Amazon Web Services", href: "https://www.credly.com/badges/0642a386-7642-4039-9a2f-b789a400d126/linked_in_profile" },
  { name: "Mathematics for Machine Learning: Linear Algebra", org: "Imperial College London", href: "https://www.coursera.org/account/accomplishments/verify/D8Q277NIKLCN" },
  { name: "Data Structures", org: "University of California San Diego", href: "https://www.coursera.org/account/accomplishments/verify/G6HMODQVIWV4" },
  { name: "Database Management Essentials", org: "University of Colorado System", href: "https://www.coursera.org/account/accomplishments/verify/VQ33156LCJ89" },
  { name: "AI For Everyone", org: "DeepLearning.AI", href: "https://www.coursera.org/account/accomplishments/verify/523KY4VO83FV" },
  { name: "Introduction to Generative AI and Prompt Engineering", org: "Mapúa University", href: "https://www.coursera.org/account/accomplishments/verify/IRJLKTSCE6MY" },
  { name: "Interactivity with JavaScript", org: "University of Michigan", href: "https://www.coursera.org/account/accomplishments/verify/GRXVRGIFQYKA" },
  { name: "Python Classes and Inheritance", org: "University of Michigan", href: "https://www.coursera.org/account/accomplishments/verify/TQR4WLZWOHHM" },
  { name: "Programming for Everybody (Getting Started with Python)", org: "University of Michigan", href: "https://www.coursera.org/account/accomplishments/verify/7FWGO63MY45F" },
  { name: "Technical Support Fundamentals", org: "Google", href: "https://www.coursera.org/account/accomplishments/verify/0Y98LJIP66VY" },
  { name: "Introduction to Cybersecurity", org: "Cisco", href: site.linkedin },
  { name: "Welcome to Game Theory", org: "The University of Tokyo", href: "https://www.coursera.org/account/accomplishments/verify/WGPYYKGJ72XU" },
  { name: "Programming Languages, Part A", org: "University of Washington", href: `${BASE}/certificates/programming-languages-part-a.pdf` },
  { name: "Search Engines for Web and Enterprise Data", org: "HKUST", href: `${BASE}/certificates/search-engines-web-enterprise.pdf` },
  { name: "Search Engine Optimization", org: "Simplilearn", href: `${BASE}/certificates/search-engine-optimization.pdf` },
  { name: "Modeling and Simulation with Simulink", org: "MathWorks", href: `${BASE}/certificates/modeling-simulation-simulink.pdf` },
  { name: "Advanced Styling with Responsive Design", org: "University of Michigan", href: `${BASE}/certificates/advanced-responsive-design.pdf` },
];
