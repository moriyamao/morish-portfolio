import {MAX_BUILDING_BYTES, parseBuilding} from './building.mjs';

const PREFIX = '#habitat=';
const MAX_HASH_LENGTH = 32 * 1024;
const MAX_GZIP_BYTES = Math.floor((MAX_HASH_LENGTH - PREFIX.length) * 3 / 4);
const LARGE_LINK = 'This home is too large for a share link. Use a JSON file instead.';
const LARGE_HOME = 'The shared home exceeds the 10 MB limit.';

function base64url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

async function readBounded(stream, limit, message) {
  const reader = stream.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new Error(message);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function encodeShare(home) {
  const clean = parseBuilding(JSON.stringify(home));
  const bytes = new TextEncoder().encode(JSON.stringify(clean));
  if (bytes.byteLength > MAX_BUILDING_BYTES) throw new Error(LARGE_HOME);
  const gzip = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'));
  return PREFIX + base64url(await readBounded(gzip, MAX_GZIP_BYTES, LARGE_LINK));
}

export async function decodeShare(hash) {
  if (typeof hash !== 'string' || !hash.startsWith(PREFIX)) return null;
  if (hash.length > MAX_HASH_LENGTH) throw new Error(LARGE_LINK);
  const payload = hash.slice(PREFIX.length);
  if (!payload || payload.length % 4 === 1 || /[^A-Za-z0-9_-]/.test(payload)) {
    throw new Error('Invalid HABITAT share link.');
  }
  const bytes = Uint8Array.from(atob(payload.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
  if (base64url(bytes) !== payload) throw new Error('Invalid HABITAT share link.');

  // Limit each input write so gzip cannot queue the entire expansion at once.
  let offset = 0;
  const input = new ReadableStream({pull(controller) {
    if (offset >= bytes.length) controller.close();
    else {
      controller.enqueue(bytes.subarray(offset, offset + 1024));
      offset += 1024;
    }
  }});
  const raw = await readBounded(input.pipeThrough(new DecompressionStream('gzip')), MAX_BUILDING_BYTES, LARGE_HOME);
  return parseBuilding(new TextDecoder('utf-8', {fatal: true}).decode(raw));
}
