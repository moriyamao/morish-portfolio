const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('./core.js');

class Element {
  constructor(tag = 'div') { this.tag = tag; this.textContent = ''; this.value = ''; this.children = []; this.events = {}; this.disabled = false; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  addEventListener(name, fn) { this.events[name] = fn; }
  click() { this.clicked = true; }
  set innerHTML(value) { throw new Error('User data must not be rendered as HTML'); }
}
const settle = async () => { await new Promise(resolve => setTimeout(resolve, 0)); await new Promise(resolve => setImmediate(resolve)); };
async function app(fail = false) {
  const nodes = new Map(), requests = [], downloads = [];
  const get = id => { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); };
  get('target').value = 'target'; get('group').value = 'customer_id'; get('time').value = 'observed_at';
  get('run').disabled = true; get('download').disabled = true;
  const context = vm.createContext({
    document: { getElementById: get, createElement: tag => new Element(tag) },
    LeakageLens: core, setTimeout, Blob,
    URL: { createObjectURL: blob => { downloads.push(blob); return 'blob:local'; }, revokeObjectURL() {} },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (fail) return { ok: false };
      const text = fs.readFileSync(path.join(__dirname, url), 'utf8');
      return { ok: true, json: async () => JSON.parse(text), text: async () => text };
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), context);
  await settle();
  return { get, requests, downloads };
}

test('application loads measured model and experiment results', async () => {
  const ui = await app();
  assert.equal(ui.get('run').disabled, false);
  assert.equal(ui.get('random-accuracy').textContent, '100%');
  assert.equal(ui.get('group-accuracy').textContent, '50%');
  assert.equal(ui.get('wine-model').textContent, '0.50');
});

test('planted example runs a real audit and enables a report download', async () => {
  const ui = await app();
  await ui.get('planted').events.click(); await settle();
  assert.equal(ui.get('overlap').textContent, 8);
  assert.equal(ui.get('groups').textContent, 5);
  assert.equal(ui.get('download').disabled, false);
  assert.equal(ui.get('columns').children.length, 4);
});

test('clean example updates findings without retaining planted overlap', async () => {
  const ui = await app();
  await ui.get('planted').events.click(); await settle();
  await ui.get('clean').events.click(); await settle();
  assert.equal(ui.get('overlap').textContent, 0);
  assert.equal(ui.get('groups').textContent, 0);
  assert.equal(ui.get('times').textContent, 0);
  assert.match(ui.get('findings').children[0].children[0].textContent, /No selected structural issue/);
});

test('local file input reads CSV without sending its contents', async () => {
  const ui = await app();
  const before = ui.requests.length;
  for (const partition of ['train', 'test']) {
    const text = fs.readFileSync(path.join(__dirname, '../samples/' + partition + '.csv'), 'utf8');
    await ui.get(partition + '-file').events.change({ target: { files: [{ size: text.length, name: 'local.csv', text: async () => text }] } });
  }
  ui.get('run').events.click(); await settle();
  assert.equal(ui.get('overlap').textContent, 8);
  assert.equal(ui.requests.length, before);
  assert.ok(ui.requests.every(request => request.options === undefined));
});

test('editing the evaluation contract invalidates stale report output', async () => {
  const ui = await app();
  await ui.get('planted').events.click(); await settle();
  ui.get('target').events.input();
  assert.equal(ui.get('download').disabled, true);
  assert.equal(ui.get('overlap').textContent, '—');
});

test('download contains evidence and statistics, not raw entity identifiers', async () => {
  const ui = await app();
  await ui.get('planted').events.click(); await settle();
  ui.get('download').events.click();
  const text = await ui.downloads[0].text();
  assert.equal(JSON.parse(text).raw_rows_in_report, false);
  assert.doesNotMatch(text, /customer_10/);
});

test('model load failure keeps auditing disabled and explains local serving', async () => {
  const ui = await app(true);
  assert.equal(ui.get('run').disabled, true);
  assert.match(ui.get('status').textContent, /http.server/);
});
