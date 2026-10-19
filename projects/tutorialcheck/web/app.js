'use strict';
const snippets = {
  append: "import pandas as pd\n\norders = pd.DataFrame({'total': [250, 120]})\nnew_orders = pd.DataFrame({'total': [90]})\n\nresult = orders.append(new_orders, ignore_index=True)\nprint(result)",
  csv: "import pandas as pd\nfrom io import StringIO\n\nsource = StringIO('visitors\\n42\\n87')\nresult = pd.read_csv(source, squeeze=True)\nprint(result)",
  modern: "import pandas as pd\n\norders = pd.DataFrame({'total': [250, 120]})\nnew_orders = pd.DataFrame({'total': [90]})\n\nresult = pd.concat([orders, new_orders], ignore_index=True)\nprint(result)",
  list: "import pandas as pd\n\nframe = pd.DataFrame({'total': [250, 120]})\nvalues = []\nfor value in frame['total']:\n    values.append(value)\nprint(values)",
  unknown: "SELECT customer_id, SUM(order_total)\nFROM transactions\nGROUP BY customer_id;"
};
const code = document.getElementById('code');
const button = document.getElementById('analyze');
let model, migrations;

// These are deliberately lexical hints. Use the Python CLI for AST diagnostics.
function hints(source) {
  const matches = [];
  const patterns = {
    frame_append: /\.append\s*\(/,
    frame_iteritems: /\.iteritems\s*\(/,
    csv_squeeze: /\bsqueeze\s*=/,
    csv_bad_lines: /\berror_bad_lines\s*=/,
    int64index: /\.Int64Index\s*\(/,
    float64index: /\.Float64Index\s*\(/,
    uint64index: /\.UInt64Index\s*\(/,
    pd_datetime: /\.datetime\s*\(/,
    pd_np: /\.np\b/
  };
  for (const [family, pattern] of Object.entries(patterns)) {
    const match = source.match(pattern);
    if (!match) continue;
    const hint = { ...migrations.families[family], line: source.slice(0, match.index).split('\n').length };
    hint.note = family.endsWith('append') ? 'Check the receiver: Python list.append and pandas Index.append are still valid. This hint applies to DataFrame/Series.' : 'Lexical match: confirm this is pandas code rather than a comment, string, or another library.';
    matches.push(hint);
  }
  return matches;
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function analyze() {
  const prediction = TutorialCheck.predict(code.value, model);
  document.getElementById('score').textContent = prediction.abstained ? '—' : prediction.risk_score.toFixed(2);
  document.getElementById('meter-fill').style.width = (prediction.abstained ? 0 : prediction.risk_score * 100) + '%';
  document.getElementById('verdict').textContent = prediction.abstained ? 'Model abstained' : prediction.prediction ? 'Review suggested' : 'No learned warning';
  document.getElementById('score-note').textContent = prediction.abstained ? 'Not enough familiar input for this model. Try a short pandas example.' : `Feature coverage ${(100 * prediction.coverage).toFixed(0)}%. Decision threshold ${model.threshold.toFixed(2)}. A low score does not establish compatibility.`;
  const findings = document.getElementById('findings');
  findings.replaceChildren();
  for (const hint of hints(code.value)) {
    const row = element('article', undefined, 'finding');
    row.append(element('div', `L${hint.line} / migration hint`, 'label'), element('h3', hint.symbol), element('p', hint.suggestion), element('p', hint.note, 'muted'));
    const link = element('a', 'Official migration reference ↗');
    link.href = migrations.source;
    link.target = '_blank';
    link.rel = 'noopener';
    row.append(link);
    findings.append(row);
  }
  if (!findings.children.length) findings.append(element('p', 'No catalogued symbol hints. The CLI can inspect Python syntax and bindings in more detail.', 'muted'));
  const list = document.getElementById('contributors');
  list.replaceChildren();
  for (const contribution of prediction.contributors) {
    const row = element('li');
    row.append(element('code', contribution.feature), element('span', (contribution.weight >= 0 ? '+' : '') + contribution.weight.toFixed(3)));
    list.append(row);
  }
  document.getElementById('results').setAttribute('aria-busy', 'false');
}

document.getElementById('example').addEventListener('change', event => {
  code.value = snippets[event.target.value];
  if (model) analyze();
});
button.addEventListener('click', analyze);
code.value = snippets.append;

async function loadJSON(filename) {
  const response = await fetch('../artifacts/' + filename);
  if (!response.ok) throw new Error(`Could not load ${filename}: HTTP ${response.status}`);
  return response.json();
}

Promise.all([loadJSON('model.json'), loadJSON('migrations.json'), loadJSON('evaluation.json')]).then(([loadedModel, loadedMigrations, evaluation]) => {
  model = loadedModel;
  migrations = loadedMigrations;
  document.getElementById('repair-count').textContent = evaluation.repairs_executed_and_asserted;
  document.getElementById('challenge-score').textContent = evaluation.challenge.learned.f1.toFixed(2);
  document.getElementById('rules-score').textContent = evaluation.challenge.ast_rules.f1.toFixed(2);
  document.getElementById('family-score').textContent = evaluation.family_holdout_mean_f1.toFixed(2);
  button.disabled = false;
  button.textContent = 'Review snippet ↗';
  analyze();
}).catch(error => {
  document.getElementById('verdict').textContent = 'Could not load model';
  document.getElementById('score-note').textContent = error.message + '. For local use, start python -m http.server from the project directory and open /web/.';
  document.getElementById('results').setAttribute('aria-busy', 'false');
  button.textContent = 'Model unavailable';
});
