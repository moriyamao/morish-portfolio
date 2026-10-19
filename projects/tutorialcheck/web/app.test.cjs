const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const inference = require('./inference.js');

class Element {
  constructor(tag = 'div') {
    this.tag = tag;
    this.textContent = '';
    this.value = '';
    this.style = {};
    this.children = [];
    this.events = {};
    this.attributes = {};
  }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
  get innerHTML() { throw new Error('Do not render user content through innerHTML'); }
  set innerHTML(value) { throw new Error('Do not render user content through innerHTML'); }
}

async function openDemo(fail = false) {
  const nodes = new Map();
  const requests = [];
  const get = id => {
    if (!nodes.has(id)) nodes.set(id, new Element());
    return nodes.get(id);
  };
  get('analyze').disabled = true;
  const context = vm.createContext({
    document: { getElementById: get, createElement: tag => new Element(tag) },
    TutorialCheck: inference,
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (fail) return { ok: false, status: 404 };
      return { ok: true, json: async () => JSON.parse(fs.readFileSync(path.join(__dirname, url), 'utf8')) };
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), context);
  await new Promise(resolve => setImmediate(resolve));
  return { get, requests };
}

test('loads the real model and renders a migration warning', async () => {
  const app = await openDemo();
  assert.equal(app.get('analyze').disabled, false);
  assert.equal(app.get('verdict').textContent, 'Review suggested');
  assert.ok(app.get('findings').children[0].children.some(node => node.textContent === 'DataFrame.append'));
  assert.equal(app.get('repair-count').textContent, 198);
  assert.equal(app.get('results').attributes['aria-busy'], 'false');
});

test('example switching updates the code and migration results', async () => {
  const app = await openDemo();
  app.get('example').events.change({ target: { value: 'modern' } });
  assert.match(app.get('code').value, /pd.concat/);
  assert.equal(app.get('findings').children[0].tag, 'p');
});

test('unfamiliar input produces abstention', async () => {
  const app = await openDemo();
  app.get('example').events.change({ target: { value: 'unknown' } });
  assert.equal(app.get('verdict').textContent, 'Model abstained');
  assert.equal(app.get('score').textContent, '—');
});

test('pasted text is not sent to a server or rendered as HTML', async () => {
  const app = await openDemo();
  app.get('code').value = '<img src=x onerror=alert(1)> df.append(other)';
  app.get('analyze').events.click();
  assert.equal(app.requests.length, 3);
  for (const request of app.requests) {
    assert.equal(request.options, undefined);
    assert.match(request.url, /^\.\.\/artifacts\/(model|migrations|evaluation)\.json$/);
  }
});

test('missing model displays an actionable error and keeps review disabled', async () => {
  const app = await openDemo(true);
  assert.equal(app.get('analyze').disabled, true);
  assert.equal(app.get('verdict').textContent, 'Could not load model');
  assert.match(app.get('score-note').textContent, /http.server/);
});
