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
  /** Extra figures shown in order after `fig`, for screenshot galleries. */
  figs?: { src: string; alt: string; caption: string }[];
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
    lede: "Draw a floor plan, then walk around the same design in 3D.",
    tags: ["JavaScript", "SVG", "Three.js", "Browser storage"],
    facts: [
      { k: "Type", v: "Concept-design sandbox" },
      { k: "Scope", v: "One document, two renderers" },
      { k: "Storage", v: "Local autosave, JSON export" },
    ],
    sections: [
      {
        h: "The idea",
        p: [
          "A floor plan is easy to edit but hard to picture. A 3D view is easy to picture but awkward to edit. HABITAT puts both on screen at once, driven by the same design.",
        ],
      },
      {
        h: "What I built",
        fig: {
          src: "/assets/shots/habitat.jpg",
          alt: "HABITAT browser screenshot showing a two-bedroom floor plan beside its synchronized 3D home model",
          caption: "The plan and the 3D view are two renderings of one document.",
        },
        p: [
          "An SVG plan editor and a synchronized Three.js view. Start blank or from a furnished template, draw walls, add doors and windows, and arrange furniture while dimensions and materials stay visible. Designs autosave, export as JSON or an image, share by link, and support undo and redo.",
        ],
      },
      {
        h: "The key decision",
        p: [
          "Both views read from one versioned document of walls, openings and objects with stable IDs, so they can never drift apart. Doors and windows belong to a wall instead of floating on top of it, and undo works on document edits rather than on either renderer.",
        ],
      },
      {
        h: "Limits",
        list: [
          "A concept tool, not construction documentation.",
          "Up to five floors, six templates and eighteen catalog objects; stairs are decorative.",
          "No account or server needed. If 3D fails to start, the plan editor still works.",
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
    lede: "A high score can come from a leaky dataset. LeakageLens checks your train and test files for it before you trust the number.",
    tags: ["Python", "scikit-learn", "JavaScript"],
    facts: [
      { k: "Type", v: "Local CSV auditor" },
      { k: "Runs", v: "Browser and Python CLI" },
      { k: "Data", v: "Files never leave the machine" },
    ],
    sections: [
      {
        h: "What I built",
        p: [
          "A browser app and Python CLI that compare training and test CSVs for leaks: duplicate rows, the same entity on both sides, timestamps that overlap, and features you mark as unavailable at prediction time. Everything runs locally, and the report contains row indices and statistics, never your raw data.",
          "On top of the checks sits a trained column reviewer that flags features which look like disguised copies of the target. It sees nine statistics per column, never names or values.",
        ],
        fig: {
          src: "/assets/shots/leakagelens.jpg",
          alt: "LeakageLens browser interface showing the audit configuration and evidence panels",
          caption: "The live demo. Files are processed in your browser; nothing is uploaded.",
        },
      },
      {
        h: "Why it matters",
        p: [
          "Same model, same data, different split. When rows from one entity land on both sides, the model just memorizes them.",
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
        h: "How the reviewer holds up",
        table: {
          head: ["Column-review benchmark", "Learned F1", "Simple rules F1"],
          rows: [
            ["Generated holdout · 190 columns, 10 datasets", "1.00", "0.67"],
            ["UCI Wine + artificial leaks · 18 columns", "0.50", "0.75"],
          ],
        },
        p: [
          "It's perfect on the generated data and weak on real data: on Wine it flagged seven legitimate features and missed one of the five planted leaks (precision 0.36, recall 0.80). Treat it as a second opinion next to the hard checks, not a verdict.",
        ],
      },
      {
        h: "Limits",
        list: [
          "The real-data test is one public dataset with artificial leaks, not naturally occurring ones.",
          "A leak type left out of training scores zero, so it doesn't generalize to new mechanisms.",
          "Statistics can't tell whether a feature is actually available at prediction time. That still needs you.",
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
    lede: "A travel planner that keeps trips, daily plans, budgets and support in one place. Currently being renovated.",
    tags: ["PHP", "MySQL", "JavaScript", "Groq API"],
    facts: [
      { k: "Role", v: "Front end and back end" },
      { k: "Deployed", v: "Render, PHP and MySQL" },
      { k: "Access", v: "Customer, staff, administrator" },
      { k: "Status", v: "Under renovation" },
    ],
    sections: [
      {
        h: "What I built",
        fig: {
          src: "/assets/shots/travelease-dashboard.png",
          alt: "TravelEase dashboard showing a journey card, search and filter controls, and a support panel",
          caption: "The customer dashboard: trips, search, planning and support together.",
        },
        p: [
          "The whole stack, in PHP and MySQL. Customers plan trips day by day, log estimated and actual costs, and see at a glance whether they're over budget.",
          "A support assistant answers questions through the Groq API and hands off to a human staff member for anything sensitive, like account security, billing or complaints. If the AI service fails, the conversation goes to staff instead of getting a made-up answer.",
        ],
      },
      {
        h: "A look around",
        figs: [
          {
            src: "/assets/shots/travelease-plan.png",
            alt: "TravelEase new-trip form with destination, dates, status, currency, budget, and notes",
            caption: "Creating a trip: destination, dates, currency, budget and notes.",
          },
          {
            src: "/assets/shots/travelease-trip.png",
            alt: "Sample TravelEase trip showing an itinerary item and estimated and actual costs",
            caption: "A sample trip with its itinerary and estimated versus actual costs (illustrative figures).",
          },
          {
            src: "/assets/shots/travelease-chat.png",
            alt: "TravelEase support chat with a greeting and reply",
            caption: "The support chat.",
          },
        ],
      },
      {
        h: "The key decision",
        p: [
          "Access checks live in the database query itself: a trip only loads if its ID and the signed-in user's ID both match, so one customer can't open another's trip by changing a URL. Roles are separated server-side, passwords are hashed, Google sign-in is verified on the server, and forms carry CSRF tokens.",
        ],
      },
      {
        h: "Limits",
        list: [
          "The assistant's \"I need a human\" judgment isn't calibrated, and the escalation keywords aren't exhaustive.",
          "Still needs testing for edge cases: unauthorized access attempts, odd budgets and dates, concurrent edits, and login abuse.",
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
    lede: "Which content pages should a strategist look at first this week? I built a pipeline to answer that on real (anonymized) search data, and tested whether a model beats a simple rule.",
    tags: ["Python", "scikit-learn", "Data analysis", "Internship"],
    facts: [
      { k: "Role", v: "Machine Learning Intern" },
      { k: "Data", v: "30,000 pseudonymized rows, 32 clients" },
      { k: "Result", v: "Model roughly ties the rule" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "Clients have hundreds of pages and no quick way to tell which need a refresh, which need a better title to win clicks, and which are fine. The goal: a ranked weekly queue a strategist can trust.",
        ],
      },
      {
        h: "Data",
        p: [
          "A 30,000-row slice of the internship warehouse: 32 clients, 90 days of performance, and a label for whether a page declined in the last 30 days. No client names, URLs or queries appear anywhere, and the columns used to build the label were kept out of the features.",
        ],
        fig: {
          src: "/assets/shots/flyrank.jpg",
          alt: "The deployed FlyRank capstone research paper",
          caption: "The deployed research paper, with every number and the action playbook.",
        },
      },
      {
        h: "Method",
        p: [
          "I started with a rule, not a model: flag a visible page if it's stale, or if its click-through rate trails similar pages at the same position. Checking both signals against the data, the CTR gap held up clearly; staleness held for most tiers but flipped on one tier too small to trust.",
          "Then a Random Forest on 16 features known before the outcome, validated by client rather than at random, because pages from the same client share patterns a model can quietly memorize.",
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
        h: "Results",
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
          "The model didn't clearly beat the rule. It edged ahead on short queues; the rule won on longer ones. Seeing AUC drop from 0.745 to 0.600 under the grouped split wasn't the number I wanted, but it's the real one.",
        ],
      },
      {
        h: "Limits",
        list: [
          "One snapshot: staleness and decline show up together, but this doesn't prove a refresh stops the decline.",
          "A 32-client teaching slice, not the full warehouse.",
          "AUC 0.600 is modest. A flag means \"worth a look\", never a confidence score.",
          "A CTR gap can't tell a weak title from a search feature stealing the click. That still needs a person.",
        ],
      },
      {
        h: "The playbook",
        list: [
          "Pages that are both stale and lagging on CTR go first.",
          "Pages with only one signal are reviewed separately, one action each.",
          "Pages only the model flags get a human second look, because the model can't explain why.",
          "Nothing is ever published, edited or deleted automatically, and low-visibility pages get no automated action.",
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
    lede: "Step through an algorithm, guess the next move, and rewind to see why it happened.",
    tags: ["JavaScript", "SVG", "Algorithms", "Data structures"],
    facts: [
      { k: "Type", v: "Interactive learning tool" },
      { k: "Execution", v: "Recorded snapshots, no code service" },
      { k: "Labs", v: "Search, sorting, stacks, trees, graphs" },
    ],
    sections: [
      {
        h: "The idea",
        p: [
          "Most algorithm animations show what changed but not why. TRACE ties every step to the line of pseudocode, the running counts, and a plain-language explanation, and lets you go back to any earlier step.",
        ],
      },
      {
        h: "What I built",
        fig: {
          src: "/assets/shots/trace.jpg",
          alt: "TRACE browser screenshot showing the graph lab and breadth-first search visualization",
          caption: "The graph lab running breadth-first search.",
        },
        p: [
          "Labs for searching, sorting, stacks and queues, binary search trees and graph traversal, each with editable input. Play, step, rewind, or turn on prediction questions that pause and ask what happens next.",
        ],
      },
      {
        h: "The key decision",
        p: [
          "Each algorithm records every step up front as a frozen snapshot of state, highlights, counters and explanation. The player only displays snapshots, never re-runs code, so rewinding and replaying always show exactly the same thing.",
        ],
      },
      {
        h: "Limits",
        list: [
          "Inputs are capped so the visuals stay readable.",
          "Counters show the work each algorithm does; playback speed is presentation, not real runtime.",
          "It runs the built-in algorithms only, not your own code.",
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
    lede: "Old pandas tutorials break on new pandas. Paste a snippet and TutorialCheck flags what's outdated, without running it.",
    tags: ["Python", "pandas", "scikit-learn", "JavaScript"],
    facts: [
      { k: "Type", v: "Developer tooling" },
      { k: "Target", v: "pandas 2.2.3" },
      { k: "Runs", v: "Browser and Python CLI" },
    ],
    sections: [
      {
        h: "What I built",
        p: [
          "A Python CLI and a browser demo that share one exported model. Rule-based syntax checks catch known breaking changes, and a small trained classifier (TF-IDF with logistic regression) adds a risk score for anything the rules miss.",
          "The training labels come from actually running the examples across eleven families of API changes, so the model learns from what breaks rather than from guesses.",
        ],
        fig: {
          src: "/assets/shots/tutorialcheck.jpg",
          alt: "TutorialCheck browser demo showing a flagged pandas snippet and its risk score",
          caption: "The browser demo, running the exported model locally.",
        },
      },
      {
        h: "Results",
        table: {
          head: ["Evaluation", "Learned model F1", "AST rules F1"],
          rows: [
            ["Generated recipe holdout · 69 snippets", "1.00", "1.00"],
            ["Independent challenge · 24 snippets", "0.74", "0.80"],
          ],
        },
        p: [
          "On unseen snippets the model catches more problems than the rules (recall 0.83 versus 0.67) but raises more false alarms (precision 0.67 versus 1.00), so overall it doesn't beat them. The perfect holdout score comes from overlap with training, not real-world accuracy.",
        ],
      },
      {
        h: "Limits",
        list: [
          "The challenge set is small and written by me; it hasn't been tested on real tutorials.",
          "It gets fooled by old names in comments or strings, custom objects with a valid append, and unusual aliases.",
          "The syntax checks cover simple patterns, not full type inference.",
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
    lede: "A two-layer neural network written in plain NumPy, with no framework doing the learning, to understand what model.fit() hides.",
    tags: ["Python", "NumPy", "Jupyter Notebook"],
    facts: [
      { k: "Type", v: "Coursework, from scratch" },
      { k: "Layers", v: "Two, hand-written backward pass" },
      { k: "Training", v: "Mini-batch gradient descent" },
    ],
    sections: [
      {
        h: "What I did",
        list: [
          "Wrote the weights, biases, forward pass and backpropagation by hand, with configurable activation functions.",
          "Trained with mini-batch gradient descent and tracked training and validation metrics separately.",
          "Tried different hyperparameters and layer sizes to see how each changed training, not just the final score.",
        ],
      },
      {
        h: "What came of it",
        p: [
          "A reproducible notebook that trains end to end, and the ability to explain every gradient in it. For a from-scratch project, that's the real result.",
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
    lede: "A team study of how well YOLO26 can find and outline breast lesions in ultrasound images, and what really helps it.",
    tags: ["YOLO26", "Roboflow", "Google Colab"],
    facts: [
      { k: "Role", v: "Co-author" },
      { k: "Data", v: "BUSI, BUS-UCLM, BUS-BRA" },
      { k: "Status", v: "Experimental prototype, external validation pending" },
    ],
    sections: [
      {
        h: "The study",
        p: [
          "The model predicts each lesion's category, a bounding box and an outline. We compared the small and nano YOLO26 models and tested how augmentation, dataset size and training settings change the results.",
          "Three public datasets were combined into 1,374 images, 458 per category, expanded to about 3,200 with augmentation. Augmented copies aren't new patients.",
        ],
      },
      {
        h: "What we found",
        p: [
          "More augmented data improved rough localization but hurt precise outlines. The nano model kept up on loose overlap (mAP@50); the small model was better on strict overlap (mAP@50:95).",
          "Best configuration, YOLO26s: box mAP@50 0.842 and mAP@50:95 0.597; mask mAP@50 0.838 and mAP@50:95 0.557. These are detection scores from the paper, not diagnostic accuracy.",
        ],
      },
      {
        h: "Limits",
        list: [
          "A research prototype, not a clinical tool.",
          "Testing on a separate external dataset and CPU deployment were still in progress when the paper was written.",
        ],
      },
      {
        h: "Team",
        p: [
          "Morish Alfonso R. Macayan, Jessica Christine Marie D. Seno, Erin Faye D. Fernandez, Aaron John D. Gonzales and Rylon Kenley C. Realosa, Mapúa University.",
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
    lede: "When money and storage are limited, should a Philippine food manufacturer stock up or line up backup suppliers? We simulated both.",
    tags: ["Agent-based modeling", "Monte Carlo", "Random Forest"],
    facts: [
      { k: "Role", v: "Co-author, with Aaron John D. Gonzales" },
      { k: "Method", v: "Scenario simulation, Latin hypercube sampling" },
      { k: "Status", v: "Preliminary demonstration" },
    ],
    sections: [
      {
        h: "The question",
        p: [
          "Extra inventory costs money and space; extra suppliers cost money. The agent-based simulation tests both strategies across disruptions of different length and severity, repeats each run many times to estimate service levels, and uses a Random Forest to see which factors matter most.",
        ],
      },
      {
        h: "Early results",
        p: [
          "Across 100 scenarios with 20 runs each, stocking up won in 85, backup suppliers in 12, and 3 were a tie. How long a disruption lasts mattered most. The full study is planned at 1,000 scenarios with 100 runs each.",
        ],
      },
      {
        h: "Limits",
        list: [
          "Preliminary simulation results, not data from real businesses.",
          "Some parameters still need real-world sources, and the model doesn't yet include revenue replenishment.",
          "An academic paper, not peer-reviewed.",
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
    line: "A local CSV auditor for split overlap and potential target proxies, with a trained column reviewer.",
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
  {
    key: "carkit",
    num: "06",
    title: "CARKIT",
    kind: "3D race car build and race",
    group: "game",
    status: "Playable",
    line: "Build a touring-class race car part by part in 3D, then race five AI drivers over three laps of a 4.5 km circuit. Real gear ratios, grip, downforce and a synthesised engine.",
    tags: ["TypeScript", "Three.js", "Web Audio"],
    img: "/assets/shots/carkit.jpg",
    alt: "CARKIT race: the player's navy #27 race car chasing red and green rivals down the start straight, with lap, position and rev-light read-outs",
    href: `${BASE}/projects/carkit/`,
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
      "Co-authored with four others at Mapúa University.",
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
    line: "",
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
    line: "",
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
    line: "",
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
    line: "",
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
    line: "Filterable studies, a project dialog, and a room explorer.",
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
    line: "A live estimate builder with per-choice pricing.",
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
    line: "A seat map and a workday planner that prices the plan.",
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
