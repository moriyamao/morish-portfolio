const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, 'index-page.js'), 'utf8');
const signalSource = fs.readFileSync(path.join(__dirname, 'signal-study.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

// Small DOM contract doubles keep the static repository dependency-free.
class Element {
  constructor() {
    this.attributes = {}; this.dataset = {}; this.hidden = false;
    this.listeners = {}; this.classes = new Set(); this.textContent = '';
    this.innerHTML = ''; this.disabled = false;
    this.classList = {
      add: value => this.classes.add(value),
      remove: value => this.classes.delete(value),
      contains: value => this.classes.has(value),
      toggle: (value, enabled) => enabled ? this.classes.add(value) : this.classes.delete(value)
    };
  }
  setAttribute(key, value) { this.attributes[key] = value; }
  getAttribute(key) { return this.attributes[key]; }
  addEventListener(key, fn) { (this.listeners[key] ??= []).push(fn); }
  async fire(key, value = {}) {
    for (const fn of this.listeners[key] ?? []) await fn({ target: this, preventDefault() {}, ...value });
  }
  focus() { this.focused = true; }
}
function setup({ reduce = false, stored = null, storageError = false, fetchImpl } = {}) {
  const elements = {};
  for (const key of ['body', 'root', 'nav', 'menu', 'filters', 'counter', 'index', 'motion', 'form', 'status', 'submit'])
    elements[key] = new Element();
  const e = elements;
  const filters = ['all', 'ml', 'web'].map(filter => {
    const item = new Element(); item.dataset.filter = filter; return item;
  });
  const projects = ['ml', 'web', 'ml', 'ml', 'ml', 'ml'].map(category => {
    const item = new Element(); item.dataset.category = category; return item;
  });
  const navLink = new Element();
  e.nav.querySelectorAll = () => [navLink];
  e.nav.contains = target => [e.nav, e.menu, navLink].includes(target);
  e.menu.setAttribute('aria-expanded', 'false');
  e.filters.querySelectorAll = () => filters;
  e.filters.hidden = true;
  e.index.querySelectorAll = () => projects.slice(2);
  e.form.querySelector = () => e.submit;
  e.form.reportValidity = () => true;
  e.form.reset = () => { e.form.resetCount = (e.form.resetCount || 0) + 1; };
  e.submit.innerHTML = 'Send message <span>↗</span>';
  const ids = { 'project-count': e.counter, 'motion-toggle': e.motion,
    contactForm: e.form, formStatus: e.status };
  const queries = { '.nav': e.nav, '.nav-toggle': e.menu, '.filters': e.filters, '.project-index': e.index };
  const document = new Element();
  document.body = e.body; document.documentElement = e.root;
  document.querySelector = key => queries[key];
  document.querySelectorAll = key => key === '.project' ? projects : [];
  document.getElementById = id => ids[id];
  const media = {};
  const calls = [];
  const window = {
    matchMedia(query) {
      if (!media[query]) {
        media[query] = new Element();
        media[query].matches = query.includes('reduced-motion') && reduce;
      }
      return media[query];
    },
    localStorage: {
      getItem() { if (storageError) throw new Error('blocked'); return stored; },
      setItem(key, value) { if (storageError) throw new Error('blocked'); calls.push({ key, value }); }
    }
  };
  const fetch = async (...args) => {
    calls.push(args);
    return fetchImpl ? fetchImpl(...args) : { ok: true, status: 200 };
  };
  class FormData { *[Symbol.iterator]() { yield ['form-name', 'contact']; yield ['message', 'A test only']; } }
  vm.runInNewContext(source, { document, window, fetch, FormData, URLSearchParams });
  return { e, filters, projects, navLink, document, media, calls };
}
test('page enhances progressively without an IntersectionObserver', () => {
  const { e } = setup();
  assert.ok(e.body.classes.has('js-ready'));
  assert.equal(e.filters.hidden, false);
  assert.equal(e.motion.hidden, false);
  assert.ok(!e.body.classes.has('motion-ready'));
});
test('ML filter shows five projects and updates its live count', async () => {
  const { e, projects, filters } = setup();
  await filters[1].fire('click');
  assert.equal(projects.filter(p => !p.hidden).length, 5);
  assert.equal(e.counter.textContent, '5 projects in ML & AI');
  assert.equal(filters[1].getAttribute('aria-pressed'), 'true');
  assert.equal(filters[0].getAttribute('aria-pressed'), 'false');
});
test('web filter isolates TravelEase and removes empty index spacing', async () => {
  const { e, projects, filters } = setup();
  await filters[2].fire('click');
  assert.deepEqual(projects.map(p => p.hidden), [true, false, true, true, true, true]);
  assert.equal(e.index.hidden, true);
  assert.equal(e.counter.textContent, '1 project in Web & systems');
  await filters[0].fire('click');
  assert.equal(projects.filter(p => !p.hidden).length, 6);
  assert.equal(e.index.hidden, false);
});
test('menu opens and Escape closes it with restored focus', async () => {
  const { e, document } = setup();
  await e.menu.fire('click');
  assert.equal(e.menu.getAttribute('aria-expanded'), 'true');
  await document.fire('keydown', { key: 'Escape' });
  assert.equal(e.menu.getAttribute('aria-expanded'), 'false');
  assert.equal(e.menu.focused, true);
});
test('navigation links and outside clicks close the mobile menu', async () => {
  const { e, document, navLink } = setup();
  await e.menu.fire('click'); await navLink.fire('click');
  assert.equal(e.menu.getAttribute('aria-expanded'), 'false');
  await e.menu.fire('click'); await document.fire('click', { target: new Element() });
  assert.equal(e.menu.getAttribute('aria-expanded'), 'false');
});
test('desktop resize resets a previously open mobile menu', async () => {
  const { e, media } = setup();
  await e.menu.fire('click');
  await media['(min-width: 761px)'].fire('change', { matches: true });
  assert.equal(e.menu.getAttribute('aria-expanded'), 'false');
});
test('reduced motion is honored and cannot be overridden by the toggle', () => {
  const { e } = setup({ reduce: true });
  assert.equal(e.root.dataset.motion, 'paused');
  assert.equal(e.motion.disabled, true);
  assert.equal(e.motion.textContent, 'Reduced motion');
});
test('a stored pause is honored; preference persistence is optional', async () => {
  const { e, calls } = setup({ stored: 'paused' });
  assert.equal(e.root.dataset.motion, 'paused');
  await e.motion.fire('click');
  assert.equal(e.root.dataset.motion, 'playing');
  assert.deepEqual(calls[0], { key: 'portfolio-motion', value: 'playing' });
  const blocked = setup({ storageError: true });
  await blocked.e.motion.fire('click');
  assert.equal(blocked.e.root.dataset.motion, 'paused');
});
test('a new OS reduced-motion preference stops motion immediately', async () => {
  const { e, media } = setup();
  const preference = media['(prefers-reduced-motion: reduce)'];
  preference.matches = true;
  await preference.fire('change');
  assert.equal(e.root.dataset.motion, 'paused');
  assert.equal(e.motion.disabled, true);
});
test('contact success requires an OK response and resets the form', async () => {
  const { e, calls } = setup();
  await e.form.fire('submit');
  assert.equal(e.status.dataset.state, 'success');
  assert.equal(e.form.resetCount, 1);
  assert.equal(e.submit.disabled, false);
  assert.equal(e.submit.innerHTML, 'Send message <span>↗</span>');
  assert.equal(calls[0][0], '/');
  assert.match(calls[0][1].body, /form-name=contact/);
});
test('HTTP errors do not masquerade as a successful contact submission', async () => {
  const { e } = setup({ fetchImpl: async () => ({ ok: false, status: 503 }) });
  await e.form.fire('submit');
  assert.equal(e.status.dataset.state, 'error');
  assert.equal(e.form.resetCount, undefined);
  assert.match(e.status.textContent, /email me directly/);
  assert.equal(e.submit.disabled, false);
});
test('network failure retains the message; invalid forms do not submit', async () => {
  const { e, calls } = setup({ fetchImpl: async () => { throw new Error('offline'); } });
  await e.form.fire('submit');
  assert.equal(e.status.dataset.state, 'error');
  const count = calls.length;
  e.form.reportValidity = () => false;
  await e.form.fire('submit');
  assert.equal(calls.length, count);
});
test('contact sends once while a request is in flight', async () => {
  let finish;
  const { e, calls } = setup({ fetchImpl: () => new Promise(resolve => { finish = resolve; }) });
  const pending = e.form.fire('submit');
  await e.form.fire('submit');
  assert.equal(calls.length, 1);
  finish({ ok: true }); await pending;
});

function signalSetup() {
  const context = new Proxy({}, { get: (obj, key) => obj[key] ?? (() => {}) });
  const canvas = new Element(); const figure = new Element();
  canvas.getContext = () => context;
  canvas.closest = () => figure;
  canvas.getBoundingClientRect = () => ({ width: 400, height: 200, left: 0, top: 0 });
  const callbacks = new Map(); let next = 0; const observers = [];
  const document = new Element(); document.hidden = false;
  const window = new Element();
  window.devicePixelRatio = 3;
  window.requestAnimationFrame = cb => { callbacks.set(++next, cb); return next; };
  window.cancelAnimationFrame = id => callbacks.delete(id);
  window.ResizeObserver = class { constructor(cb) { this.cb = cb; } observe() {} };
  window.IntersectionObserver = class { constructor(cb) { observers.push(cb); } observe() {} };
  vm.runInNewContext(signalSource, { window, document });
  const signal = window.createSignalStudy(canvas);
  return { signal, callbacks, canvas, figure, observers, document, window };
}
test('canvas is initially static and caps its device-pixel ratio at two', () => {
  const { canvas, callbacks, figure } = signalSetup();
  assert.equal(canvas.width, 800);
  assert.equal(canvas.height, 400);
  assert.equal(callbacks.size, 0);
  assert.ok(figure.classes.has('canvas-ready'));
});
test('canvas cancels frames when paused, offscreen, or in a hidden tab', async () => {
  const { signal, callbacks, observers, document } = signalSetup();
  signal.setPaused(false); assert.equal(callbacks.size, 1);
  observers[0]([{ isIntersecting: false }]); assert.equal(callbacks.size, 0);
  observers[0]([{ isIntersecting: true }]); assert.equal(callbacks.size, 1);
  document.hidden = true; await document.fire('visibilitychange'); assert.equal(callbacks.size, 0);
  document.hidden = false; await document.fire('visibilitychange'); assert.equal(callbacks.size, 1);
  signal.setPaused(true); assert.equal(callbacks.size, 0);
});
test('canvas remains drawable while pointer coordinates change', async () => {
  const { signal, callbacks, canvas } = signalSetup();
  signal.setPaused(false);
  await canvas.fire('pointermove', { clientX: 130, clientY: 90 });
  const [id, tick] = callbacks.entries().next().value; callbacks.delete(id); tick(16);
  assert.equal(callbacks.size, 1);
  await canvas.fire('pointerleave');
  signal.setPaused(true); assert.equal(callbacks.size, 0);
});
test('homepage has explicit motion controls, native disclosures, and no placeholder trackers', () => {
  assert.match(html, /id="motion-toggle"/);
  assert.equal((html.match(/class="project index-project/g) || []).length, 4);
  assert.equal((html.match(/data-category=/g) || []).length, 6);
  assert.match(html, /netlify-honeypot="bot-field"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\[hidden\]/);
  assert.doesNotMatch(html, /PASTE_|cloudflareinsights|fonts\.googleapis/);
});
test('all portfolio-relative links and local script assets exist', () => {
  const pages = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
  for (const page of pages) {
    const text = fs.readFileSync(path.join(__dirname, page), 'utf8');
    const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, page + ': unique IDs');
    for (const [, reference] of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:https?:|data:|mailto:|tel:|\/)/.test(reference)) continue;
      const [file, hash] = reference.split('#');
      const resolved = path.resolve(__dirname, file || page);
      assert.ok(fs.existsSync(resolved), page + ': ' + reference);
      if (hash && resolved.endsWith('.html')) {
        assert.ok(fs.readFileSync(resolved, 'utf8').includes('id="' + hash + '"'), reference);
      }
      if (file.endsWith('.js')) new vm.Script(fs.readFileSync(resolved, 'utf8'), { filename: file });
    }
  }
  const resume = fs.readFileSync(path.join(__dirname, 'resume.pdf'));
  assert.equal(resume.subarray(0, 5).toString(), '%PDF-');
});
