'use strict';
const get = id => document.getElementById(id);
let model, trainRows, testRows, lastReport;
const splitNames = text => text.split(',').map(name => name.trim()).filter(Boolean);

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function status(message, error = false) {
  get('status').textContent = message;
  get('status').className = error ? 'note error' : 'note';
}
function clearReport() {
  lastReport = null;
  get('download').disabled = true;
  for (const id of ['overlap', 'groups', 'times', 'suspects']) get(id).textContent = '—';
  get('columns').replaceChildren();
  get('findings').replaceChildren(element('p', 'Inputs changed. Run the audit to update the results.', 'note'));
}
function render(report) {
  lastReport = report;
  get('download').disabled = false;
  get('row-count').textContent = `${report.train_rows} train / ${report.test_rows} test`;
  get('overlap').textContent = report.exact_overlap.count;
  get('groups').textContent = report.findings.find(f => f.kind === 'group_overlap')?.count || 0;
  get('times').textContent = report.findings.find(f => f.kind === 'time_interleaving')?.count || 0;
  get('suspects').textContent = report.columns.filter(column => column.model.review).length;
  const findings = get('findings'); findings.replaceChildren();
  for (const finding of report.findings) {
    const row = element('article', undefined, 'finding');
    const title = finding.kind.replaceAll('_', ' ') + (finding.column ? ': ' + finding.column : '');
    row.append(element('strong', title + ' / ' + finding.evidence), element('p', finding.message));
    findings.append(row);
  }
  if (!report.findings.length) {
    const row = element('article', undefined, 'finding empty');
    row.append(element('strong', 'No selected structural issue observed'), element('p', 'This does not establish that the evaluation pipeline is free of leakage. Review feature timing and preprocessing.'));
    findings.append(row);
  }
  if (report.conflicting_train_feature_groups) findings.append(element('p', `${report.conflicting_train_feature_groups} duplicate training feature groups have conflicting targets.`, 'note'));
  const body = get('columns'); body.replaceChildren();
  for (const column of report.columns) {
    const row = element('tr');
    row.append(element('td', column.column), element('td', column.model.score.toFixed(3), column.model.review ? 'risk' : ''),
      element('td', column.stats.abs_correlation.toFixed(3)), element('td', (column.stats.missing_rate * 100).toFixed(0) + '%'),
      element('td', column.available_at_prediction === false ? 'Declared unavailable' : 'Needs review', 'availability'));
    row.title = JSON.stringify(column.stats, null, 2);
    body.append(row);
  }
}
function runAudit() {
  if (!model || !trainRows || !testRows) { status('Load both CSV partitions before running the audit.', true); return; }
  get('run').disabled = true;
  status('Auditing training-only column statistics and partition overlap…');
  setTimeout(() => {
    try {
      const report = LeakageLens.audit(trainRows, testRows, {
        target: get('target').value.trim(), group: get('group').value.trim() || null, time: get('time').value.trim() || null,
        unavailable: splitNames(get('unavailable').value), ignore: splitNames(get('ignore').value)
      }, model);
      render(report);
      status(`Audit complete. Review threshold ${model.threshold.toFixed(2)}. Statistical scores are not proof.`);
    } catch (error) { clearReport(); status(error.message, true); }
    finally { get('run').disabled = false; }
  }, 0);
}
async function loadExample(clean = false) {
  try {
    status('Loading original synthetic sample data…');
    const prefix = clean ? 'clean_' : '';
    const responses = await Promise.all([fetch('../samples/' + prefix + 'train.csv'), fetch('../samples/' + prefix + 'test.csv')]);
    if (responses.some(response => !response.ok)) throw new Error('Sample data could not be loaded.');
    const texts = await Promise.all(responses.map(response => response.text()));
    trainRows = LeakageLens.parseCSV(texts[0]); testRows = LeakageLens.parseCSV(texts[1]);
    get('train-status').textContent = trainRows.length + ' bundled rows';
    get('test-status').textContent = testRows.length + ' bundled rows';
    get('target').value = 'target'; get('group').value = 'customer_id'; get('time').value = 'observed_at';
    get('unavailable').value = clean ? '' : 'final_outcome'; get('ignore').value = '';
    clearReport(); runAudit();
  } catch (error) { status(error.message, true); }
}
for (const partition of ['train', 'test']) {
  get(partition + '-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 1500000) throw new Error('Choose a CSV smaller than 1.5 MB.');
      const rows = LeakageLens.parseCSV(await file.text());
      if (partition === 'train') trainRows = rows; else testRows = rows;
      get(partition + '-status').textContent = rows.length + ' rows / ' + file.name;
      clearReport(); status('CSV loaded. Check the target and optional metadata fields, then run the audit.');
    } catch (error) {
      if (partition === 'train') trainRows = null; else testRows = null;
      clearReport(); status(error.message, true);
    }
  });
}
for (const id of ['target', 'group', 'time', 'unavailable', 'ignore']) get(id).addEventListener('input', clearReport);
get('run').addEventListener('click', runAudit);
get('planted').addEventListener('click', () => loadExample(false));
get('clean').addEventListener('click', () => loadExample(true));
get('download').addEventListener('click', () => {
  if (!lastReport) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(lastReport, null, 2)], { type: 'application/json' }));
  const link = element('a'); link.href = url; link.download = 'leakagelens-audit.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
async function readJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Could not load ' + path);
  return response.json();
}
Promise.all([readJSON('../artifacts/model.json'), readJSON('../artifacts/evaluation.json')]).then(([loaded, evaluation]) => {
  model = loaded;
  get('run').disabled = false; get('run').textContent = 'Run the audit ↗';
  get('random-accuracy').textContent = (evaluation.split_experiment.random_accuracy_mean * 100).toFixed(0) + '%';
  get('group-accuracy').textContent = (evaluation.split_experiment.group_accuracy_mean * 100).toFixed(0) + '%';
  get('wine-model').textContent = evaluation.wine_challenge.learned.f1.toFixed(2);
  get('wine-rules').textContent = evaluation.wine_challenge.rules.f1.toFixed(2);
  get('evaluation-note').textContent = `Generated test F1: ${evaluation.test.learned.f1.toFixed(2)} on ${evaluation.counts.test} columns from ${evaluation.source_datasets.test} held-out source datasets. Public-data injection F1: ${evaluation.wine_challenge.learned.f1.toFixed(2)}. The simpler rules scored ${evaluation.wine_challenge.rules.f1.toFixed(2)} on that challenge.`;
  status('Ready. Load an example or choose your own training and test CSV files.');
}).catch(error => {
  get('run').textContent = 'Model unavailable';
  status(error.message + '. For local use, start python -m http.server from the project directory and open /web/.', true);
});
