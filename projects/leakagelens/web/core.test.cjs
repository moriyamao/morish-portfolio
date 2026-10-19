const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('./core.js');
const load = name => fs.readFileSync(path.join(__dirname, '../samples/' + name), 'utf8');
const model = JSON.parse(fs.readFileSync(path.join(__dirname, '../artifacts/model.json'), 'utf8'));

test('CSV parsing preserves quoted delimiters, escaped quotes, multiline cells and BOM', () => {
  const rows = core.parseCSV('\uFEFFname,note\r\n"a,b","say ""hello"""\r\nother,"line one\nline two"\r\n');
  assert.equal(rows[0].name, 'a,b');
  assert.equal(rows[0].note, 'say "hello"');
  assert.equal(rows[1].note, 'line one\nline two');
});

test('CSV parser rejects malformed and ambiguous input', () => {
  for (const input of ['x,x\n1,2', 'a,b\n1', 'x\n"unclosed', 'x\n"value"junk']) assert.throws(() => core.parseCSV(input));
});

test('CSV column names cannot mutate object prototypes', () => {
  const rows = core.parseCSV('__proto__,constructor\nvalue,other');
  assert.equal(Object.getPrototypeOf(rows[0]), null);
  assert.equal(rows[0].__proto__, 'value');
});

test('planted sample exposes observed structural issues and a declared unavailable feature', () => {
  const report = core.audit(core.parseCSV(load('train.csv')), core.parseCSV(load('test.csv')), { target: 'target', group: 'customer_id', time: 'observed_at', unavailable: ['final_outcome'] }, model);
  assert.equal(report.exact_overlap.count, 8);
  assert.equal(report.findings.find(row => row.kind === 'group_overlap').count, 5);
  assert.equal(report.findings.find(row => row.kind === 'unavailable_feature').evidence, 'user_declared');
});

test('clean group-disjoint sample has no selected structural findings', () => {
  const report = core.audit(core.parseCSV(load('clean_train.csv')), core.parseCSV(load('clean_test.csv')), { target: 'target', group: 'customer_id', time: 'observed_at' }, model);
  assert.equal(report.findings.length, 0);
});

test('underscore category codes remain categorical', () => {
  assert.equal(core.numeric('1_2'), null);
  const stats = core.profile(['0_0', '1_0', '0_0', '1_0'], [0, 1, 0, 1]);
  assert.equal(stats.is_numeric, 0);
});

test('bad binary targets and absent feature columns are rejected', () => {
  const train = core.parseCSV(load('train.csv')), testRows = core.parseCSV(load('test.csv'));
  for (const row of train) row.target = '';
  assert.throws(() => core.audit(train, testRows, { target: 'target' }, model), /must not be missing/);
});
