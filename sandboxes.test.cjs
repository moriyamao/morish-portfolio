const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

for (const slug of ['habitat', 'trace']) {
  test(slug + ': static entrypoint assets and relative module imports resolve', () => {
    const root = path.join(__dirname, 'projects', slug);
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert.match(html, /<html\b[^>]*lang="en"/);
    assert.match(html, /name="viewport"/);
    const visited = new Set();
    function check(reference, from) {
      if (/^(?:https?:|data:|blob:|mailto:|tel:|#)/.test(reference)) return;
      assert.ok(!reference.startsWith('/'), 'Preserve the GitHub Pages subdirectory: ' + reference);
      const target = path.resolve(path.dirname(from), reference.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(target), from + ': missing ' + reference);
      if (visited.has(target) || fs.statSync(target).isDirectory()) return;
      visited.add(target);
      if (/\.(?:mjs|js)$/.test(target)) {
        const source = fs.readFileSync(target, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
        for (const [, ref] of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*)['"]([^'"]+)['"]/g)) {
          if (ref.startsWith('.')) check(ref, target);
          else assert.equal(ref, 'three', 'Unexpected unresolved module import: ' + ref);
        }
      }
    }
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) check(reference, path.join(root, 'index.html'));
    for (const [, json] of html.matchAll(/<script[^>]*type="importmap"[^>]*>([\s\S]*?)<\/script>/g)) {
      for (const reference of Object.values(JSON.parse(json).imports || {})) check(reference, path.join(root, 'index.html'));
    }
    assert.ok(visited.size > 0);
  });
}

test('Three.js is pinned with locally resolvable distribution and license', () => {
  const root = path.join(__dirname, 'projects/habitat/vendor');
  assert.match(fs.readFileSync(path.join(root, 'README.md'), 'utf8'), /0\.187\.0/);
  assert.match(fs.readFileSync(path.join(root, 'LICENSE'), 'utf8'), /MIT License/);
  for (const file of ['three.module.js', 'three.core.js', 'OrbitControls.js']) assert.ok(fs.statSync(path.join(root, file)).size > 1000);
});
