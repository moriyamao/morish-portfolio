const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html'));

for (const page of pages) {
    test(page + ': extracted assets exist and scripts remain parseable', () => {
        const html = fs.readFileSync(path.join(root, page), 'utf8');
        const references = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+-page(?:-\d+)?\.(?:js|css))"[^>]*>/g)];
        for (const [, reference] of references) {
            const filename = path.join(root, reference);
            assert.ok(fs.existsSync(filename), 'Missing asset: ' + reference);
            const source = fs.readFileSync(filename, 'utf8');
            assert.ok(source.trim(), 'Empty asset: ' + reference);
            if (reference.endsWith('.js')) new vm.Script(source, { filename });
        }
        for (const match of html.matchAll(/<script\b[^>]*src="([^"]+-page(?:-\d+)?\.js)"[^>]*>/g)) {
            assert.doesNotMatch(match[0], /\b(?:async|defer|type)\s*(?:=|>)/, 'Keep original blocking execution order');
        }
    });
}

test('every extracted asset is referenced by a page', () => {
    const html = pages.map(page => fs.readFileSync(path.join(root, page), 'utf8')).join('\n');
    const assets = fs.readdirSync(root).filter(name => /-page(?:-\d+)?\.(?:js|css)$/.test(name));
    assert.ok(assets.length > 0);
    for (const asset of assets) assert.ok(html.includes('"' + asset + '"'), 'Unreferenced asset: ' + asset);
});
