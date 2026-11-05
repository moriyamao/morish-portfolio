// Pure, deterministic trace engines. Every returned frame is an immutable value.
export const LIMITS = Object.freeze({ search: 64, sort: 32, container: 16, bst: 15, vertices: 12, edges: 24 });
export const DEFAULTS = Object.freeze({ search: '2, 5, 8, 12, 16, 23, 38', sort: '7, 3, 5, 3, 1', bst: '8, 4, 12, 2, 6, 10, 14', graph: '0-1, 0-2, 1-3, 2-4, 4-5' });
export function integer(value, label = 'Value', min = -999, max = 999) {
  const text = String(value).trim();
  if (!/^-?\d+$/.test(text) || !Number.isSafeInteger(Number(text)) || Number(text) < min || Number(text) > max) throw new Error(`${label} must be a whole number from ${min} to ${max}.`);
  return Number(text);
}
export function numbers(text, max, { unique = false, allowEmpty = false } = {}) {
  if (!String(text).trim() && allowEmpty) return [];
  const parts = String(text).trim().split(/[,\s]+/);
  if (!String(text).trim() || parts.length > max) throw new Error(`Enter 1–${max} numbers, separated by commas or spaces.`);
  const values = parts.map(v => integer(v));
  if (unique && new Set(values).size !== values.length) throw new Error('BST values must be unique. Remove duplicates.');
  return values;
}
export function operations(text, mode) {
  if (!['stack', 'queue'].includes(mode)) throw new Error('Choose stack or queue.');
  const parts = String(text).split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  if (!parts.length || parts.length > 64) throw new Error('Enter 1–64 operations.');
  return parts.map(part => {
    const match = /^(push|pop|enqueue|dequeue|peek)(?:\s+(-?\d+))?$/i.exec(part);
    if (!match) throw new Error(`Invalid operation “${part}”. Use ${mode === 'stack' ? 'push 5, pop, peek' : 'enqueue 5, dequeue, peek'}.`);
    const name = match[1].toLowerCase();
    if (mode === 'stack' && ['enqueue', 'dequeue'].includes(name) || mode === 'queue' && ['push', 'pop'].includes(name)) throw new Error(`“${name}” does not belong to a ${mode}.`);
    const adding = ['push', 'enqueue'].includes(name);
    if (adding !== (match[2] !== undefined)) throw new Error(adding ? `${name} needs a value.` : `${name} takes no value.`);
    return adding ? { name, value: integer(match[2]) } : { name };
  });
}
export function graphInput(count, text, start, all = false) {
  const n = integer(count, 'Vertex count', 1, LIMITS.vertices);
  const source = integer(start, 'Start vertex', 0, n - 1);
  const parts = String(text).trim() ? String(text).split(/[,;\n]+/).map(s => s.trim()) : [];
  if (parts.length > LIMITS.edges) throw new Error(`Use at most ${LIMITS.edges} edges.`);
  const edges = [], seen = new Set();
  for (const part of parts) {
    const m = /^(\d+)\s*-\s*(\d+)$/.exec(part);
    if (!m) throw new Error('Use edges like 0-1, 1-2; leave blank for isolated vertices.');
    const a = integer(m[1], 'Edge endpoint', 0, n - 1), b = integer(m[2], 'Edge endpoint', 0, n - 1);
    if (a === b) throw new Error('Self-edges are not supported.');
    const key = [Math.min(a, b), Math.max(a, b)].join('-');
    if (seen.has(key)) throw new Error(`Duplicate undirected edge ${key}.`);
    seen.add(key); edges.push([Math.min(a, b), Math.max(a, b)]);
  }
  return { n, edges, start: source, all: Boolean(all) };
}
function freeze(value) {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
function recorder(initial) {
  const state = { ...initial, counters: { comparisons: 0, writes: 0, visits: 0, operations: 0, edgeChecks: 0 }, focus: {}, line: 0, event: 'ready', explanation: '', done: false };
  const frames = [];
  const emit = (event, line, explanation, focus = {}) => {
    Object.assign(state, { event, line, explanation, focus });
    frames.push(freeze(structuredClone(state)));
  };
  return { state, frames, emit, finish(message, line) { state.done = true; emit('finish', line, message); return Object.freeze(frames); } };
}
export const CODE = freeze({
  linear: ['for i from 0 to length − 1', '  compare values[i] with target', '  if equal: return i', 'return not found'],
  binary: ['low = 0; high = length − 1; answer = none', 'while low ≤ high:', '  mid = floor((low + high) / 2)', '  compare values[mid] with target', '  if equal: answer = mid; high = mid − 1', '  else if smaller: low = mid + 1', '  else: high = mid − 1', 'return answer (first match)'],
  insertion: ['for i from 1 to length − 1:', '  key = values[i]; j = i − 1', '  while j ≥ 0: compare values[j] with key', '    if values[j] ≤ key: break', '    values[j + 1] = values[j]; j −= 1', '  values[j + 1] = key', 'return values'],
  merge: ['split range into left and right halves', 'sort each half recursively', 'compare the two unmerged heads', 'write the smaller head (left on ties)', 'copy remaining values into the range', 'return values'],
  stack: ['for each operation:', '  push: append if below capacity', '  pop: remove last, or report empty', '  peek: read last, or report empty', 'return operation history'],
  queue: ['for each operation:', '  enqueue: append if below capacity', '  dequeue: remove first, or report empty', '  peek: read first, or report empty', 'return operation history'],
  bst: ['for each value: start at root', '  compare value with current node', '  choose left if smaller, right if larger', '  attach value at the empty child', 'search: compare target at current node', '  equal: found; otherwise follow left/right', 'return result (empty child means absent)'],
  bfs: ['discover start; enqueue start', 'while queue is not empty:', '  dequeue vertex; visit it', '  inspect neighbors in ascending ID order', '  if undiscovered: mark and enqueue', 'if traverse-all: restart at lowest unseen ID', 'return visit order'],
  dfs: ['discover and visit current vertex', 'inspect neighbors in ascending ID order', 'if undiscovered: recurse into neighbor', 'return to parent after its neighbors', 'if traverse-all: restart at lowest unseen ID', 'return visit order']
});
export function searchTrace(values, target, algorithm = 'linear') {
  if (!['linear', 'binary'].includes(algorithm)) throw new Error('Unknown search algorithm.');
  values = numbers(values.join(','), LIMITS.search); target = integer(target, 'Target');
  if (algorithm === 'binary' && values.some((v, i) => i && v < values[i - 1])) throw new Error('Binary search requires ascending input. Values are never silently sorted.');
  const r = recorder({ lab: 'search', algorithm, values, target, checked: [], result: null, low: 0, high: values.length - 1 });
  const { state: s, emit } = r;
  emit('ready', 0, `${algorithm === 'binary' ? 'Binary search narrows an ascending range and keeps looking left after a match.' : 'Linear search checks from left to right.'} The result is the first matching index.`);
  if (algorithm === 'linear') {
    for (let i = 0; i < values.length; i++) {
      s.counters.comparisons++; s.checked.push(i);
      if (values[i] === target) s.result = i;
      emit('compare', 1, `Compare index ${i}: ${values[i]} ${values[i] === target ? '=' : '≠'} ${target}.${s.result !== null ? ' This is the first match.' : ' Continue right.'}`, { index: i });
      if (s.result !== null) break;
    }
  } else {
    while (s.low <= s.high) {
      const i = Math.floor((s.low + s.high) / 2), low = s.low, high = s.high;
      s.counters.comparisons++; s.checked.push(i);
      emit('compare', 3, `Probe index ${i} in inclusive range [${low}, ${high}]: compare ${values[i]} with ${target}.`, { index: i });
      if (values[i] === target) { s.result = i; s.high = i - 1; emit('narrow', 4, `Keep candidate ${i}; search left for an earlier duplicate.`, { index: i }); }
      else if (values[i] < target) { s.low = i + 1; emit('narrow', 5, `Discard indices through ${i}; all are smaller than ${target}.`, { index: i }); }
      else { s.high = i - 1; emit('narrow', 6, `Discard indices from ${i}; all are larger than ${target}.`, { index: i }); }
    }
  }
  return r.finish(s.result === null ? `${target} is absent. Every possible match has been ruled out.` : `First match: index ${s.result} (value ${target}).`, algorithm === 'linear' ? (s.result === null ? 3 : 2) : 7);
}
export function sortTrace(values, algorithm = 'insertion') {
  if (!['insertion', 'merge'].includes(algorithm)) throw new Error('Unknown sort algorithm.');
  values = numbers(values.join(','), LIMITS.sort);
  const r = recorder({ lab: 'sort', algorithm, values, sorted: [], range: [0, values.length - 1], held: null });
  const { state: s, emit } = r, a = s.values;
  emit('ready', 0, `${algorithm === 'insertion' ? 'Grow a sorted prefix by inserting one held key at a time.' : 'Split into halves, then merge sorted ranges. Left values win ties.'} Both algorithms are stable.`);
  if (algorithm === 'insertion') {
    for (let i = 1; i < a.length; i++) {
      const key = a[i]; s.held = key; s.sorted = Array.from({ length: i }, (_, j) => j);
      emit('hold', 1, `Hold key ${key} from index ${i}.`, { index: i });
      let j = i - 1;
      while (j >= 0) {
        s.counters.comparisons++;
        emit('compare', 2, `Compare ${a[j]} at index ${j} with held key ${key}.`, { indices: [j, j + 1], pair: [a[j], key] });
        if (a[j] <= key) break;
        a[j + 1] = a[j]; s.counters.writes++;
        emit('write', 4, `Shift ${a[j]} right to index ${j + 1}. The key remains held separately.`, { index: j + 1 }); j--;
      }
      a[j + 1] = key; s.counters.writes++;
      emit('write', 5, `Place held key ${key} at index ${j + 1}. The prefix through ${i} is sorted.`, { index: j + 1 }); s.held = null;
    }
  } else {
    function merge(lo, hi) {
      if (lo >= hi) return;
      const mid = Math.floor((lo + hi) / 2); s.range = [lo, hi];
      emit('split', 0, `Split range [${lo}, ${hi}] into [${lo}, ${mid}] and [${mid + 1}, ${hi}].`);
      merge(lo, mid); merge(mid + 1, hi);
      const left = a.slice(lo, mid + 1), right = a.slice(mid + 1, hi + 1);
      s.range = [lo, hi]; s.buffer = { left, right, i: 0, j: 0 }; let i = 0, j = 0, k = lo;
      while (i < left.length && j < right.length) {
        s.counters.comparisons++;
        emit('compare', 2, `Compare buffer heads ${left[i]} and ${right[j]} for destination ${k}.`, { buffers: { left: i, right: j }, destination: k, pair: [left[i], right[j]] });
        a[k] = left[i] <= right[j] ? left[i++] : right[j++]; s.counters.writes++;
        Object.assign(s.buffer, { i, j });
        emit('write', 3, `Write ${a[k]} to index ${k} from the smaller buffer head (left wins ties).`, { index: k }); k++;
      }
      while (i < left.length || j < right.length) {
        a[k] = i < left.length ? left[i++] : right[j++]; s.counters.writes++; Object.assign(s.buffer, { i, j });
        emit('write', 4, `Copy remaining buffer value ${a[k]} to index ${k}.`, { index: k }); k++;
      }
      s.buffer = null;
    }
    merge(0, a.length - 1);
  }
  s.held = null; s.sorted = a.map((_, i) => i); s.range = [0, a.length - 1];
  return r.finish('Sorted in ascending order. Comparisons count value comparisons; writes count assignments into the main array.', algorithm === 'insertion' ? 6 : 5);
}
export function containerTrace(initial, ops, mode = 'stack') {
  initial = numbers(initial.join(','), LIMITS.container, { allowEmpty: true });
  if (!['stack', 'queue'].includes(mode)) throw new Error('Unknown container.');
  // Revalidate structured operations too, so programmatic callers obey UI bounds.
  ops = operations(ops.map(op => `${op.name}${op.value === undefined ? '' : ` ${op.value}`}`).join(','), mode);
  const r = recorder({ lab: 'container', algorithm: mode, values: initial, log: [], result: null });
  const { state: s, emit } = r;
  emit('ready', 0, `${mode === 'stack' ? 'Last in, first out: push and pop at the top.' : 'First in, first out: enqueue at the rear, dequeue at the front.'} Capacity is ${LIMITS.container}; rejected operations are recorded.`);
  for (const op of ops) {
    const add = ['push', 'enqueue'].includes(op.name); let result, status = 'ok';
    if (add) {
      if (s.values.length === LIMITS.container) { result = 'full'; status = 'rejected'; }
      else { s.values.push(op.value); result = op.value; s.counters.writes++; }
    } else if (!s.values.length) { result = 'empty'; status = 'rejected'; }
    else if (op.name === 'peek') result = mode === 'stack' ? s.values.at(-1) : s.values[0];
    else { result = mode === 'stack' ? s.values.pop() : s.values.shift(); s.counters.writes++; }
    s.counters.operations++; s.result = result; s.log.push({ ...op, result, status });
    emit(op.name, add ? 1 : op.name === 'peek' ? 3 : 2, `${op.name}${add ? ` ${op.value}` : ''} → ${result}.${status === 'rejected' ? ' Container unchanged.' : op.name === 'peek' ? ' Read only; container unchanged.' : ''}`, { result, index: mode === 'stack' ? s.values.length - 1 : 0 });
  }
  return r.finish('Operation history complete. Writes count successful adds/removals; peeks and rejected operations do not write.', 4);
}
export function bstTrace(values, target) {
  values = numbers(values.join(','), LIMITS.bst, { unique: true }); target = integer(target, 'Search target');
  const r = recorder({ lab: 'bst', algorithm: 'bst', values: [], nodes: [], target, result: null, phase: 'insert' });
  const { state: s, emit } = r;
  emit('ready', 0, 'Build an unbalanced binary search tree in input order, then search for the target. Keys are unique.');
  for (const value of values) {
    let parent = null, side = null, node = s.nodes[0];
    while (node) {
      s.counters.comparisons++;
      emit('compare', 1, `Insert ${value}: compare with ${node.value}; follow ${value < node.value ? 'left' : 'right'}.`, { value: node.value, inserting: value });
      parent = node.value; side = value < node.value ? 'left' : 'right'; node = s.nodes.find(n => n.value === node[side]);
    }
    if (parent !== null) s.nodes.find(n => n.value === parent)[side] = value;
    s.nodes.push({ value, left: null, right: null }); s.values.push(value); s.counters.writes++;
    emit('insert', 3, `Attach ${value} ${parent === null ? 'as root' : `as the ${side} child of ${parent}`}.`, { value });
  }
  s.phase = 'search'; let node = s.nodes[0];
  while (node) {
    s.counters.comparisons++; s.counters.visits++;
    if (node.value === target) s.result = target;
    emit('compare', 4, `Search ${target}: compare with ${node.value}.${s.result !== null ? ' Match found.' : ` Follow ${target < node.value ? 'left' : 'right'}.`}`, { value: node.value });
    if (s.result !== null) break;
    node = s.nodes.find(n => n.value === node[target < node.value ? 'left' : 'right']);
  }
  return r.finish(s.result === null ? `${target} is absent: the search reached an empty child.` : `Found ${target}. The highlighted search visited ${s.counters.visits} nodes.`, 6);
}
export function graphTrace(input, algorithm = 'bfs') {
  if (!['bfs', 'dfs'].includes(algorithm)) throw new Error('Unknown traversal.');
  const g = graphInput(input.n, input.edges.map(e => e.join('-')).join(','), input.start, input.all);
  const adj = Array.from({ length: g.n }, () => []);
  g.edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); }); adj.forEach(a => a.sort((x, y) => x - y));
  const r = recorder({ lab: 'graph', algorithm, ...g, visited: [], discovered: [], frontier: [], components: 0 });
  const { state: s, emit } = r, seen = new Set();
  emit('ready', 0, `Undirected graph; ascending neighbors. ${g.all ? 'After each component, restart at the lowest unseen ID.' : 'Visit only vertices reachable from the start; other components remain unvisited.'}`);
  const discover = v => { seen.add(v); s.discovered.push(v); s.frontier.push(v); };
  function dfs(v) {
    discover(v); s.visited.push(v); s.counters.visits++;
    emit('visit', 0, `Visit ${v}; recursion path is [${s.frontier.join(', ')}].`, { value: v });
    for (const w of adj[v]) {
      s.counters.edgeChecks++;
      emit('inspect', 1, `Inspect ${v} → ${w}.${seen.has(w) ? ' Already discovered; skip.' : ' Undiscovered; recurse next.'}`, { edge: [v, w], value: v });
      if (!seen.has(w)) dfs(w);
    }
    s.frontier.pop(); emit('return', 3, `Finish ${v}; return ${s.frontier.length ? `to ${s.frontier.at(-1)}` : 'from this component'}.`, { value: v });
  }
  const roots = [g.start, ...Array.from({ length: g.n }, (_, i) => i).filter(i => i !== g.start)];
  for (const root of roots) {
    if (seen.has(root)) continue;
    if (s.components && !g.all) break;
    s.components++;
    if (algorithm === 'dfs') dfs(root);
    else {
      discover(root); emit('discover', s.components === 1 ? 0 : 5, `Start component ${s.components} at ${root}; mark discovered and enqueue.`, { value: root });
      while (s.frontier.length) {
        const v = s.frontier.shift(); s.visited.push(v); s.counters.visits++;
        emit('visit', 2, `Dequeue and visit ${v}.`, { value: v });
        for (const w of adj[v]) {
          s.counters.edgeChecks++;
          emit('inspect', 3, `Inspect ${v} → ${w}.${seen.has(w) ? ' Already discovered; skip.' : ' Undiscovered; enqueue next.'}`, { edge: [v, w], value: v });
          if (!seen.has(w)) { discover(w); emit('discover', 4, `Mark ${w} discovered and enqueue it once.`, { value: w }); }
        }
      }
    }
  }
  return r.finish(`Visit order: ${s.visited.join(' → ')}. ${g.n - s.visited.length} unvisited. ${s.components} component${s.components === 1 ? '' : 's'} traversed.`, algorithm === 'bfs' ? 6 : 5);
}
// The expected answer always comes from the next actual frame, never a separate simulation.
export function prediction(next) {
  if (!next) return null;
  if (next.done) return { question: 'Which action comes next?', answer: 'finish', hint: 'Use: finish' };
  if (next.lab === 'search') return next.event === 'compare'
    ? { question: 'Which index will be probed next?', answer: String(next.focus.index), hint: 'Enter a zero-based index.' }
    : { question: 'After this comparison, what is the next action?', answer: 'narrow', hint: 'Use: narrow (update the search range)' };
  if (next.lab === 'sort') return { question: 'Which sorting action comes next?', answer: next.event, hint: 'Use: hold, split, compare, or write' };
  if (next.lab === 'container') return { question: 'What will the next operation return?', answer: String(next.focus.result), hint: 'Enter a value, empty, or full.' };
  if (next.lab === 'bst') return { question: `Which value will be ${next.event === 'insert' ? 'inserted' : 'compared'} next?`, answer: String(next.focus.value), hint: 'Enter the node value.' };
  return { question: 'Which graph action comes next?', answer: next.event, hint: 'Use: discover, visit, inspect, or return' };
}
export function compareTraces(lab, values, target) {
  if (lab === 'search') return [searchTrace(values, target, 'linear'), searchTrace(values, target, 'binary')];
  if (lab === 'sort') return [sortTrace(values, 'insertion'), sortTrace(values, 'merge')];
  throw new Error('Comparison is available for search and sort.');
}
