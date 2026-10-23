const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { estimate } = require('./torque/estimate.js');
const { calculate } = require('./common-ground/planner.js');

test('Clients includes all seven websites with live and source links', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const clients = html.match(/<section id="client-work"[\s\S]*?<\/section>/)[0];
  assert.equal((clients.match(/class="client-row"/g) || []).length, 7);
  for (const slug of ['forma', 'torque', 'common-ground']) {
    assert.ok(clients.includes(`https://moriyamao.github.io/morish-portfolio/clients/${slug}/`));
    assert.ok(clients.includes(`https://github.com/moriyamao/morish-portfolio/tree/main/clients/${slug}`));
  }
  assert.doesNotMatch(clients, /Seven independently delivered|Seven client/);
});

test('Torque prices size-adjusted packages and fixed add-ons without duplicate charges', () => {
  assert.equal(estimate('sedan', 'reset').total, 1800);
  assert.equal(estimate('suv', 'refine', ['engine', 'leather']).total, 8875);
  assert.equal(estimate('large', 'shield', ['glass', 'glass']).total, 19750);
  const result = estimate('sedan', 'refine', ['engine', 'leather', 'glass']);
  assert.equal(result.total, 8500);
  assert.equal(result.lines.reduce((sum, line) => sum + line.amount, 0), result.total);
  assert.throws(() => estimate('bus', 'reset'), RangeError);
  assert.throws(() => estimate('sedan', 'unknown'), RangeError);
  assert.throws(() => estimate('sedan', 'reset', ['unknown']), RangeError);
});
test('Common Ground distinguishes daily, calendar-month and hourly rates', () => {
  assert.equal(calculate({ seat: 'A1' }).total, 450);
  assert.equal(calculate({ seat: 'A2', duration: 'month' }).total, 6500);
  assert.equal(calculate({ seat: 'Q1' }).total, 650);
  assert.equal(calculate({ seat: 'Q2', duration: 'month' }).total, 9500);
  assert.deepEqual(calculate({ seat: 'M1', start: 14, hours: 4 }), { seat: 'M1', type: 'meeting', duration: 'hour', hours: 4, start: 14, end: 18, total: 3600 });
  assert.throws(() => calculate({ seat: 'M1', start: 17, hours: 2 }), RangeError);
  assert.throws(() => calculate({ seat: 'M1', hours: 0 }), RangeError);
  assert.throws(() => calculate({ seat: 'A3' }), RangeError);
  assert.throws(() => calculate({ seat: 'Q3' }), RangeError);
  assert.throws(() => calculate({ seat: 'A1', duration: 'hour' }), RangeError);
});
for (const site of ['forma', 'torque', 'common-ground']) {
  test(`${site}: scripts parse and local HTML/CSS asset references resolve`, () => {
    const dir = path.join(__dirname, site);
    for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.js'))) new vm.Script(fs.readFileSync(path.join(dir, file), 'utf8'), { filename: file });
    const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<meta name="viewport"/);
    assert.match(css, /prefers-reduced-motion/);
    assert.match(html, /website concept/i);
    for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(https?:|#|mailto:)/.test(url)) continue;
      const local = path.resolve(dir, url.split('#')[0]);
      assert.ok(fs.existsSync(local), `${site}: missing ${url}`);
    }
    for (const [, url] of css.matchAll(/url\(['"]?(assets\/[^)'"\s]+)['"]?\)/g)) assert.ok(fs.existsSync(path.join(dir, url)));
  });
}
