/* Portable statistics and forest inference. Dataset contents stay in this process. */
(function (root) {
  const features = ['abs_correlation', 'oriented_auc', 'unique_ratio', 'missing_rate', 'binary_agreement', 'repeated_value_purity', 'missingness_auc', 'abs_rank_correlation', 'is_numeric'];
  const missing = value => value == null || String(value).trim() === '';
  function numeric(value) {
    if (missing(value) || !/^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/.test(String(value).trim())) return null;
    const result = Number(value);
    return Number.isFinite(result) ? result : null;
  }
  const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  function ranks(values) {
    const order = values.map((_, i) => i).sort((a, b) => values[a] - values[b]);
    const result = Array(values.length).fill(0);
    let cursor = 0;
    while (cursor < order.length) {
      let end = cursor + 1;
      while (end < order.length && values[order[end]] === values[order[cursor]]) end++;
      for (const index of order.slice(cursor, end)) result[index] = (cursor + end + 1) / 2;
      cursor = end;
    }
    return result;
  }
  function correlation(left, right) {
    const lm = mean(left), rm = mean(right);
    const numerator = left.reduce((sum, value, i) => sum + (value - lm) * (right[i] - rm), 0);
    const denominator = Math.sqrt(left.reduce((sum, value) => sum + (value - lm) ** 2, 0) * right.reduce((sum, value) => sum + (value - rm) ** 2, 0));
    return denominator ? numerator / denominator : 0;
  }
  function auc(labels, scores) {
    const positives = labels.reduce((sum, label) => sum + label, 0), negatives = labels.length - positives;
    if (!positives || !negatives) return 0.5;
    const ranked = ranks(scores);
    const value = (ranked.reduce((sum, rank, i) => sum + (labels[i] ? rank : 0), 0) - positives * (positives + 1) / 2) / (positives * negatives);
    return Math.max(value, 1 - value);
  }
  function profile(values, labels) {
    if (values.length !== labels.length || values.length < 2 || new Set(labels).size !== 2 || labels.some(v => v !== 0 && v !== 1)) throw new Error('A column needs aligned rows and both binary target classes.');
    const absent = values.map(missing);
    const observed = values.filter((_, i) => !absent[i]);
    const numbers = observed.map(numeric);
    const isNumeric = observed.length > 0 && numbers.every(value => value !== null);
    let keys = values.map((value, i) => absent[i] ? null : String(value));
    let encoded;
    if (isNumeric) {
      const sorted = numbers.slice().sort((a, b) => a - b), mid = Math.floor(sorted.length / 2);
      const fill = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
      encoded = values.map((value, i) => absent[i] ? fill : Number(value));
      keys = values.map((value, i) => absent[i] ? null : String(Number(value)));
    } else {
      const categories = new Map([...new Set(keys.filter(value => value !== null))].sort().map((value, i) => [value, i]));
      encoded = keys.map(value => value === null ? -1 : categories.get(value));
    }
    const groups = new Map();
    keys.forEach((key, i) => {
      if (key === null) return;
      if (!groups.has(key)) groups.set(key, [0, 0]);
      groups.get(key)[labels[i]]++;
    });
    const repeated = [...groups.values()].filter(counts => counts[0] + counts[1] >= 3);
    const support = repeated.reduce((sum, counts) => sum + counts[0] + counts[1], 0);
    const purity = support ? repeated.reduce((sum, counts) => sum + Math.max(...counts), 0) / support : 0.5;
    const equal = encoded.reduce((sum, value, i) => sum + Number(value === labels[i]), 0);
    const agreement = isNumeric && encoded.every(value => value === 0 || value === 1) ? Math.max(equal, labels.length - equal) / labels.length : 0.5;
    const vector = [Math.abs(correlation(encoded, labels)), auc(labels, encoded), groups.size / values.length, absent.filter(Boolean).length / values.length,
      agreement, purity, auc(labels, absent.map(Number)), Math.abs(correlation(ranks(encoded), labels)), Number(isNumeric)];
    return Object.fromEntries(features.map((name, i) => [name, vector[i]]));
  }
  function predict(stats, model) {
    const vector = model.features.map(name => stats[name]);
    const scores = model.trees.map(tree => {
      let node = 0;
      while (tree.left[node] !== -1) node = vector[tree.feature[node]] <= tree.threshold[node] ? tree.left[node] : tree.right[node];
      return tree.risk[node];
    });
    const score = mean(scores);
    return { score, review: score >= model.threshold, calibrated: false };
  }
  function parseCSV(text) {
    if (text.length > 1500000) throw new Error('Use a CSV smaller than 1.5 MB in the browser demo.');
    text = text.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], field = '', quoted = false, afterQuote = false;
    const finishField = () => { row.push(field); field = ''; afterQuote = false; };
    const finishRow = () => { finishField(); if (row.some(cell => cell.trim() !== '')) rows.push(row); row = []; };
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (char === '"') { quoted = false; afterQuote = true; }
        else field += char;
      } else if (char === ',') finishField();
      else if (char === '\n' || char === '\r') { finishRow(); if (char === '\r' && text[i + 1] === '\n') i++; }
      else if (afterQuote) { if (!/\s/.test(char)) throw new Error('Unexpected text after a quoted CSV field.'); }
      else if (char === '"') { if (field) throw new Error('Quote inside an unquoted field.'); quoted = true; }
      else field += char;
    }
    if (quoted) throw new Error('Unclosed quote in CSV.');
    if (field || row.length || afterQuote) finishRow();
    const headers = rows.shift();
    if (!headers || new Set(headers).size !== headers.length || headers.some(name => !name)) throw new Error('CSV headers must be present and unique.');
    if (rows.length > 5000 || headers.length > 105) throw new Error('Browser limit: 5,000 rows and 105 columns per file.');
    return rows.map(cells => {
      if (cells.length !== headers.length) throw new Error('CSV rows must match the header width.');
      const result = Object.create(null);
      headers.forEach((name, i) => { result[name] = cells[i]; });
      return result;
    });
  }
  function canonical(value) {
    if (missing(value)) return null;
    const number = numeric(value);
    return number === null ? String(value) : number;
  }
  function audit(train, test, options, model) {
    if (train.length < 40 || !test.length) throw new Error('Use at least 40 training rows and a non-empty test partition.');
    const { target, group, time } = options;
    const unavailable = options.unavailable || [], ignore = options.ignore || [];
    const required = [target, group, time].filter(Boolean);
    for (const name of required) if (train.some(row => !Object.hasOwn(row, name)) || (name !== target && test.some(row => !Object.hasOwn(row, name)))) throw new Error('Missing required column: ' + name);
    if (train.some(row => missing(row[target]))) throw new Error('Training target must not be missing.');
    const classes = [...new Set(train.map(row => String(row[target])))].sort();
    if (classes.length !== 2) throw new Error('The current reviewer supports a binary target only.');
    const labels = train.map(row => classes.indexOf(String(row[target])));
    if (Math.min(labels.filter(v => v === 0).length, labels.filter(v => v === 1).length) < 10) throw new Error('At least ten training rows per target class are required.');
    const excluded = new Set([target, group, time, ...ignore].filter(Boolean));
    const columns = Object.keys(train[0]).filter(name => !excluded.has(name));
    if (!columns.length || columns.length > 100) throw new Error('Choose between 1 and 100 feature columns.');
    if (test.some(row => columns.some(name => !Object.hasOwn(row, name)))) throw new Error('Test data is missing training feature columns.');
    if (unavailable.some(name => !columns.includes(name))) throw new Error('Unavailable columns must be included feature columns.');
    const key = row => JSON.stringify(columns.map(name => canonical(row[name])));
    const index = new Map();
    train.forEach((row, i) => { const k = key(row); if (!index.has(k)) index.set(k, []); index.get(k).push(i); });
    const overlap = [];
    test.forEach((row, i) => { const k = key(row); if (index.has(k)) overlap.push({ test_row: i, train_row: index.get(k)[0] }); });
    const findings = [];
    if (overlap.length) findings.push({ kind: 'exact_overlap', evidence: 'observed', count: overlap.length, message: 'Test feature rows also occur in training. Review whether these observations should be independent.' });
    if (group) {
      const left = new Set(train.filter(row => !missing(row[group])).map(row => String(row[group])));
      const right = new Set(test.filter(row => !missing(row[group])).map(row => String(row[group])));
      const shared = [...left].filter(value => right.has(value));
      if (shared.length) findings.push({ kind: 'group_overlap', evidence: 'observed', count: shared.length, message: 'Entities occur in both partitions. This matters when deployment is to unseen entities.' });
    }
    if (time) {
      function stamp(row) {
        let text = String(row[time]);
        if (!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(text)) throw new Error('Use ISO timestamps in ' + time);
        if (text.includes('T') && !/(?:Z|[+-]\d{2}:?\d{2})$/.test(text)) text += 'Z';
        const value = Date.parse(text);
        if (!Number.isFinite(value)) throw new Error('Invalid timestamp in ' + time);
        return value;
      }
      const times = train.map(stamp), cutoff = Math.min(...test.map(stamp));
      const count = times.filter(value => value >= cutoff).length;
      if (count) findings.push({ kind: 'time_interleaving', evidence: 'observed', count, message: 'Training timestamps meet or exceed the earliest test timestamp. Review the forecast cutoff.' });
    }
    const reports = columns.map(column => {
      const stats = profile(train.map(row => row[column]), labels);
      if (unavailable.includes(column)) findings.push({ kind: 'unavailable_feature', evidence: 'user_declared', column, message: 'You declared this feature unavailable at prediction time. Exclude it from the prediction pipeline.' });
      return { column, stats, model: predict(stats, model), available_at_prediction: unavailable.includes(column) ? false : 'unknown' };
    }).sort((a, b) => b.model.score - a.model.score);
    const conflicts = [...index.values()].filter(indices => new Set(indices.map(i => String(train[i][target]))).size > 1).length;
    return { task: 'binary classification', train_rows: train.length, test_rows: test.length, feature_columns: columns,
      exact_overlap: { count: overlap.length, test_fraction: overlap.length / test.length, examples: overlap.slice(0, 20) },
      conflicting_train_feature_groups: conflicts, findings, columns: reports,
      near_overlap: null, raw_rows_in_report: false,
      model_scope: 'Synthetic target-proxy similarity score; not proof of leakage or a calibrated probability.',
      browser_scope: 'Exact row, group, timestamp and column checks. Bounded numeric near-match search is available in the Python CLI.' };
  }
  const api = { features, numeric, ranks, correlation, auc, profile, predict, parseCSV, audit };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LeakageLens = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
