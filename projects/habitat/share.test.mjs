import test from 'node:test';
import assert from 'node:assert/strict';
import {gunzipSync, gzipSync} from 'node:zlib';
import {blank, preset} from './model.mjs';
import {MAX_BUILDING_BYTES, addFloor, fromPlan} from './building.mjs';
import {decodeShare, encodeShare} from './share.mjs';

const PREFIX = '#habitat=';
const shareBytes = bytes => PREFIX + Buffer.from(bytes).toString('base64url');
const shareJson = value => shareBytes(gzipSync(JSON.stringify(value)));

test('a share link contains canonical gzip JSON and round-trips a multi-floor home', async () => {
  const home = addFloor(fromPlan(preset('2bed'), '家 🏠'), {copy: true});
  home.floors[1].name = 'Étage';
  const withExtras = {...home, extra: 'discard', floors: home.floors.map(floor => ({
    ...floor, extra: 'discard', plan: {...floor.plan, extra: 'discard'},
  }))};
  const hash = await encodeShare(withExtras);
  assert.match(hash, /^#habitat=[A-Za-z0-9_-]+$/);
  assert.equal(gunzipSync(Buffer.from(hash.slice(PREFIX.length), 'base64url')).toString(), JSON.stringify(home));
  assert.deepEqual(await decodeShare(hash), home);
  assert.equal(withExtras.floors[0].plan.extra, 'discard');
});

test('decoding unrelated fragments returns null; invalid share links reject', async () => {
  for (const hash of ['', '#help', '#habitat', '#other=habitat']) assert.equal(await decodeShare(hash), null);
  for (const payload of ['', 'A', 'aA=', 'aA\n', 'aA+', 'aB']) {
    await assert.rejects(decodeShare(PREFIX + payload), /Invalid HABITAT share link/);
  }
  const gzip = gzipSync(JSON.stringify(fromPlan(blank())));
  await assert.rejects(decodeShare(shareBytes(gzip.subarray(0, -1))));
  await assert.rejects(decodeShare(shareBytes(gzipSync(Uint8Array.of(0xff)))), TypeError);
  await assert.rejects(decodeShare(shareBytes(gzipSync('{'))), /not valid JSON/);
});

test('both paths validate buildings and decoding migrates legacy plans', async () => {
  const legacy = preset('studio');
  assert.deepEqual(await decodeShare(shareJson(legacy)), fromPlan(legacy));
  const invalid = {...fromPlan(legacy), activeFloorId: 's99'};
  await assert.rejects(encodeShare(invalid), /selected floor does not exist/);
  await assert.rejects(decodeShare(shareJson(invalid)), /selected floor does not exist/);
});

test('decoding rejects oversized fragments and caps gzip expansion before parsing', async () => {
  await assert.rejects(decodeShare(PREFIX + 'A'.repeat(32 * 1024)), /too large for a share link/);
  const hash = shareBytes(gzipSync(Buffer.alloc(MAX_BUILDING_BYTES + 1, 32)));
  assert.ok(hash.length < 32 * 1024);
  await assert.rejects(decodeShare(hash), /exceeds the 10 MB limit/);
});

test('encoding rejects a valid home that does not fit in a share link', async () => {
  const plan = blank();
  const fraction = i => (Math.sin(i) + 1) / 2;
  const furnish = start => Array.from({length: 300}, (_, i) => {
    const seed = start + 6 * i;
    return {id: `f${i + 1}`, catalogId: 'chair', x: fraction(seed) * 50, y: fraction(seed + 1) * 50,
      w: .5 + fraction(seed + 2), d: .5 + fraction(seed + 3), h: .5 + fraction(seed + 4),
      rotation: fraction(seed + 5) * 359, material: 'walnut'};
  });
  const home = addFloor(fromPlan({...plan, nextId: 301, objects: furnish(1)}), {copy: true});
  home.floors[1].plan.objects = furnish(1801);
  await assert.rejects(encodeShare(home), /too large for a share link/);
});
