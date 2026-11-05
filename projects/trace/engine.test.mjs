import test from 'node:test';
import assert from 'node:assert/strict';
import { LIMITS, numbers, integer, operations, graphInput, searchTrace, sortTrace, containerTrace, bstTrace, graphTrace, compareTraces, prediction, CODE } from './engine.mjs';
import { Timeline } from './timeline.mjs';

const end = trace => trace.at(-1);
const asc = values => [...values].sort((a, b) => a - b);
function random(seed) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
const rng = random(20261105);
function integrity(trace) {
  assert.equal(trace[0].event, 'ready');
  assert.equal(trace[0].done, false);
  assert.equal(end(trace).done, true);
  assert.equal(end(trace).event, 'finish');
  assert.ok(Object.isFrozen(trace));
  trace.forEach((frame, i) => {
    assert.ok(Object.isFrozen(frame)); assert.ok(Object.isFrozen(frame.counters)); assert.ok(Object.isFrozen(frame.focus));
    assert.ok(frame.line >= 0 && frame.line < CODE[frame.algorithm].length);
    assert.ok(frame.explanation.length > 0);
    for (const [key, count] of Object.entries(frame.counters)) {
      assert.ok(Number.isSafeInteger(count) && count >= 0);
      if (i) assert.ok(count >= trace[i - 1].counters[key], `${key} must be cumulative`);
    }
    if (i < trace.length - 1) assert.equal(frame.done, false);
  });
}

test('numeric validation: complete tokens, bounded safe integers, length and uniqueness', () => {
  assert.deepEqual(numbers(' -999, 0\n999 ', 3), [-999, 0, 999]);
  assert.deepEqual(numbers('', 16, { allowEmpty: true }), []);
  for (const value of ['', ' ', '1.5', '2e2', 'Infinity', '1x', '1000', '-1000', '9007199254740993']) assert.throws(() => integer(value));
  for (const value of ['', '1, NaN', '1, 2.3', '1 2 3 4']) assert.throws(() => numbers(value, 3));
  assert.throws(() => numbers('1, 1', 15, { unique: true }), /unique/);
  assert.equal(numbers(Array.from({ length: 64 }, (_, i) => i).join(','), 64).length, 64);
  assert.throws(() => numbers(Array(65).fill(1).join(','), LIMITS.search));
});

test('first-match linear/binary searches agree with independent indexOf across duplicates and absence', () => {
  for (let n = 1; n <= 64; n++) {
    const values = asc(Array.from({ length: n }, () => Math.floor(rng() * 16) - 8));
    for (const target of [-10, -4, 0, 5, 10]) for (const algorithm of ['linear', 'binary']) {
      const trace = searchTrace(values, target, algorithm), expected = values.indexOf(target);
      assert.equal(end(trace).result, expected === -1 ? null : expected);
      assert.equal(end(trace).counters.comparisons, trace.filter(s => s.event === 'compare').length);
      trace.filter(s => s.event === 'compare').forEach(frame => {
        assert.ok(frame.focus.index >= 0 && frame.focus.index < n);
        if (algorithm === 'binary') assert.ok(frame.focus.index >= frame.low && frame.focus.index <= frame.high);
      });
    }
  }
});

test('binary continues left after equality; boundary matches and missing targets remain honest', () => {
  const trace = searchTrace([1, 3, 3, 3, 3, 3, 8], 3, 'binary');
  assert.equal(trace.find(s => s.result !== null).result, 3);
  assert.equal(end(trace).result, 1);
  assert.equal(end(searchTrace([4], 4, 'binary')).result, 0);
  assert.equal(end(searchTrace([4], 2, 'binary')).result, null);
  assert.equal(end(searchTrace([1, 3, 5], 5, 'binary')).result, 2);
  assert.equal(end(searchTrace([1, 3, 5], 8, 'binary')).result, null);
  assert.throws(() => searchTrace([3, 1, 2], 1, 'binary'), /ascending/);
  assert.throws(() => searchTrace([], 1));
  assert.throws(() => searchTrace(Array(65).fill(1), 1));
  integrity(trace);
});

test('sorts agree with numeric sort on signed/duplicate inputs, every length through 32', () => {
  for (let n = 1; n <= 32; n++) {
    const values = Array.from({ length: n }, () => Math.floor(rng() * 19) - 9);
    for (const algorithm of ['insertion', 'merge']) {
      const trace = sortTrace(values, algorithm);
      assert.deepEqual(end(trace).values, asc(values));
      assert.deepEqual(end(trace).sorted, values.map((_, i) => i));
      assert.equal(end(trace).counters.comparisons, trace.filter(s => s.event === 'compare').length);
      assert.equal(end(trace).counters.writes, trace.filter(s => s.event === 'write').length);
      assert.equal(trace[0].values.length, n);
      assert.deepEqual(trace[0].values, values);
      assert.equal(end(trace).held, null);
      if (algorithm === 'insertion') {
        const inversions = values.reduce((total, v, i) => total + values.slice(i + 1).filter(w => w < v).length, 0);
        assert.equal(end(trace).counters.writes, inversions + n - 1, 'one shift per inversion, one key placement per outer iteration');
      }
      integrity(trace);
    }
  }
  assert.throws(() => sortTrace([], 'merge'));
  assert.throws(() => sortTrace(Array(33).fill(1), 'insertion'));
});

test('merge comparisons identify actual buffer heads after source positions have been overwritten', () => {
  const trace = sortTrace([3, 4, 1, 2], 'merge');
  const regression = trace.find(s => s.event === 'compare' && s.focus.pair[0] === 3 && s.focus.pair[1] === 2);
  assert.deepEqual(regression.values, [1, 4, 1, 2]);
  assert.deepEqual(regression.focus.buffers, { left: 0, right: 1 });
  assert.equal(regression.focus.destination, 1);
  assert.equal(regression.focus.indices, undefined, 'must not falsely highlight overwritten main-array operands');
  for (const frame of trace.filter(s => s.event === 'compare')) {
    assert.equal(frame.buffer.left[frame.focus.buffers.left], frame.focus.pair[0]);
    assert.equal(frame.buffer.right[frame.focus.buffers.right], frame.focus.pair[1]);
    assert.equal(frame.focus.buffers.left, frame.buffer.i);
    assert.equal(frame.focus.buffers.right, frame.buffer.j);
  }
});

test('insertion comparisons use the held key and only shift strictly greater values (stable ties)', () => {
  const trace = sortTrace([3, 3, 1], 'insertion');
  for (const frame of trace.filter(s => s.event === 'compare')) {
    assert.equal(frame.focus.pair[1], frame.held);
    assert.equal(frame.focus.pair[0], frame.values[frame.focus.indices[0]]);
  }
  const equal = trace.findIndex(s => s.event === 'compare' && s.focus.pair[0] === s.focus.pair[1]);
  assert.equal(trace[equal + 1].line, 5, 'equal comparison places key; does not shift an equal predecessor');
  const merge = sortTrace([2, 2], 'merge'), equality = merge.findIndex(s => s.event === 'compare');
  assert.equal(merge[equality + 1].buffer.i, 1, 'merge takes left operand on ties');
  assert.equal(merge[equality + 1].buffer.j, 0);
});

test('container operations validate syntax, mode, arity, value and script bounds', () => {
  assert.deepEqual(operations('PUSH -1; peek\npop', 'stack'), [{ name: 'push', value: -1 }, { name: 'peek' }, { name: 'pop' }]);
  for (const script of ['', 'push', 'pop 2', 'peek 2', 'enqueue 2', 'drop', 'push 1.5', 'push 1000']) assert.throws(() => operations(script, 'stack'));
  assert.throws(() => operations('push 1', 'queue'));
  assert.equal(operations(Array(64).fill('peek').join(','), 'queue').length, 64);
  assert.throws(() => operations(Array(65).fill('peek').join(','), 'queue'));
  assert.throws(() => containerTrace(Array(17).fill(1), [{ name: 'pop' }]));
});

test('stack/queue implement independent LIFO/FIFO results with peek, underflow and capacity rejection', () => {
  for (const mode of ['stack', 'queue']) {
    const add = mode === 'stack' ? 'push' : 'enqueue', remove = mode === 'stack' ? 'pop' : 'dequeue';
    const ops = operations(`${remove}, ${add} 10, ${add} 20, peek, ${remove}, ${remove}, ${remove}`, mode);
    const trace = containerTrace([], ops, mode), finish = end(trace);
    assert.deepEqual(finish.log.map(x => x.result), mode === 'stack' ? ['empty', 10, 20, 20, 20, 10, 'empty'] : ['empty', 10, 20, 10, 10, 20, 'empty']);
    assert.equal(finish.counters.operations, 7); assert.equal(finish.counters.writes, 4);
    assert.deepEqual(finish.values, []); integrity(trace);
    const full = containerTrace(Array.from({ length: 16 }, (_, i) => i), operations(`${add} 99, peek, ${remove}, ${add} 99`, mode), mode);
    assert.equal(full[1].result, 'full'); assert.deepEqual(full[1].values, full[0].values);
    assert.deepEqual(full[2].values, full[1].values, 'peek does not mutate');
    assert.equal(end(full).values.length, 16); assert.equal(end(full).counters.writes, 2);
    for (const frame of full) assert.ok(frame.values.length <= 16);
  }
});

test('random container scripts agree with an independent deque model at every operation', () => {
  for (const mode of ['stack', 'queue']) {
    const names = mode === 'stack' ? ['push', 'pop', 'peek'] : ['enqueue', 'dequeue', 'peek'];
    const ops = Array.from({ length: 64 }, () => {
      const name = names[Math.floor(rng() * names.length)]; return name === names[0] ? { name, value: Math.floor(rng() * 10) } : { name };
    });
    const trace = containerTrace([2, 3], ops, mode), model = [2, 3]; let writes = 0;
    ops.forEach((op, i) => {
      let expected;
      if (op.name === names[0]) {
        if (model.length === 16) expected = 'full'; else { model.push(op.value); expected = op.value; writes++; }
      } else if (!model.length) expected = 'empty';
      else {
        const position = mode === 'stack' ? model.length - 1 : 0; expected = model[position];
        if (op.name !== 'peek') { model.splice(position, 1); writes++; }
      }
      assert.deepEqual(trace[i + 1].values, model); assert.equal(trace[i + 1].result, expected);
      assert.equal(trace[i + 1].counters.writes, writes); assert.equal(trace[i + 1].counters.operations, i + 1);
    });
  }
});

function verifyTree(nodes) {
  if (!nodes.length) return;
  const byValue = new Map(nodes.map(n => [n.value, n])), visited = new Set();
  function walk(value, low, high) {
    if (value === null) return;
    assert.ok(!visited.has(value), 'no cycles or shared children'); visited.add(value);
    assert.ok(value > low && value < high, 'full ancestor BST invariant');
    const node = byValue.get(value); assert.ok(node);
    walk(node.left, low, value); walk(node.right, value, high);
  }
  walk(nodes[0].value, -Infinity, Infinity); assert.equal(visited.size, nodes.length);
}
test('BST insertion/search preserve ancestor ordering, handle skew and absent keys, and count actual paths', () => {
  const cases = [[8, 4, 12, 2, 6, 10, 14], Array.from({ length: 15 }, (_, i) => i - 7), [0], [5, -3, 9, -9, 2, 6, 12]];
  for (const values of cases) for (const target of [values[0], values.at(-1), 999]) {
    const trace = bstTrace(values, target), result = end(trace);
    assert.equal(result.result, values.includes(target) ? target : null);
    assert.equal(result.counters.writes, values.length);
    assert.equal(result.counters.comparisons, trace.filter(f => f.event === 'compare').length);
    const map = new Map(result.nodes.map(n => [n.value, n]));
    const referencePath = []; let current = result.nodes[0];
    while (current) { referencePath.push(current.value); if (current.value === target) break; current = map.get(current[target < current.value ? 'left' : 'right']); }
    assert.deepEqual(trace.filter(f => f.phase === 'search' && f.event === 'compare').map(f => f.focus.value), referencePath);
    assert.equal(result.counters.visits, referencePath.length);
    trace.forEach(f => verifyTree(f.nodes)); integrity(trace);
  }
  assert.throws(() => bstTrace([3, 3], 3), /unique/);
  assert.throws(() => bstTrace(Array.from({ length: 16 }, (_, i) => i), 1));
});

test('graph validation rejects invalid IDs, duplicates, loops, invalid syntax and bound violations', () => {
  assert.deepEqual(graphInput('3', '2-0, 1-2', '1'), { n: 3, edges: [[0, 2], [1, 2]], start: 1, all: false });
  assert.deepEqual(graphInput(1, '', 0).edges, []);
  for (const args of [[0, '', 0], [13, '', 0], [3, '', 3], [3, '', -1], [3, '0-3', 0], [3, '0-0', 0], [3, '0-1,1-0', 0], [3, '0:1', 0], [3, '0-1,', 0]]) assert.throws(() => graphInput(...args));
  const edges = []; for (let a = 0; a < 12; a++) for (let b = a + 1; b < 12; b++) edges.push(`${a}-${b}`);
  assert.equal(graphInput(12, edges.slice(0, 24).join(','), 0).edges.length, 24);
  assert.throws(() => graphInput(12, edges.slice(0, 25).join(','), 0));
});
function referenceGraph(g, dfs) {
  const adj = Array.from({ length: g.n }, () => []), order = [], visited = new Set();
  g.edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); }); adj.forEach(list => list.sort((a, b) => a - b));
  function visit(v) { if (visited.has(v)) return; visited.add(v); order.push(v); adj[v].forEach(visit); }
  for (const root of [g.start, ...Array.from({ length: g.n }, (_, i) => i)]) {
    if (visited.has(root)) continue;
    if (order.length && !g.all) break;
    if (dfs) visit(root);
    else {
      // Independent breadth-by-depth reference, no queue/shift implementation.
      let layer = [root]; visited.add(root);
      while (layer.length) {
        order.push(...layer); const next = [];
        for (const v of layer) for (const w of adj[v]) if (!visited.has(w)) { visited.add(w); next.push(w); }
        layer = next;
      }
    }
  }
  return order;
}
test('BFS/DFS agree with independent traversals for generated graphs and maintain frontier/discovery invariants', () => {
  for (let n = 1; n <= 12; n++) {
    const edges = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (rng() < .3 && edges.length < 24) edges.push([a, b]);
    for (const all of [false, true]) for (const algorithm of ['bfs', 'dfs']) {
      const g = { n, edges, start: Math.floor(rng() * n), all }, trace = graphTrace(g, algorithm), result = end(trace);
      assert.deepEqual(result.visited, referenceGraph(g, algorithm === 'dfs'));
      const visited = new Set(result.visited);
      assert.equal(result.counters.visits, visited.size);
      assert.equal(result.counters.edgeChecks, edges.reduce((sum, [a, b]) => sum + Number(visited.has(a)) + Number(visited.has(b)), 0));
      assert.equal(result.counters.edgeChecks, trace.filter(f => f.event === 'inspect').length);
      for (const frame of trace) {
        for (const key of ['visited', 'discovered', 'frontier']) assert.equal(frame[key].length, new Set(frame[key]).size);
        assert.ok(frame.visited.every(v => frame.discovered.includes(v)));
        assert.ok(frame.frontier.every(v => frame.discovered.includes(v)));
        if (algorithm === 'bfs') assert.ok(frame.frontier.every(v => !frame.visited.includes(v)));
        if (frame.focus.edge) assert.ok(edges.some(e => e.includes(frame.focus.edge[0]) && e.includes(frame.focus.edge[1])));
      }
      if (all) assert.equal(result.visited.length, n);
      integrity(trace);
    }
  }
});

test('disconnected behavior is explicit, ascending neighbors/restarts deterministic, cycles do not repeat visits', () => {
  const base = graphInput(7, '0-2, 0-1, 3-5, 3-4, 4-5', 0);
  for (const algorithm of ['bfs', 'dfs']) {
    assert.deepEqual(end(graphTrace(base, algorithm)).visited, [0, 1, 2]);
    const all = graphTrace({ ...base, all: true }, algorithm);
    assert.deepEqual(end(all).visited, [0, 1, 2, 3, 4, 5, 6]);
    assert.equal(end(all).components, 3);
    assert.deepEqual(end(graphTrace(graphInput(1, '', 0, true), algorithm)).visited, [0]);
  }
  const branching = graphInput(6, '0-2, 0-1, 1-3, 2-4, 4-5', 0);
  assert.deepEqual(end(graphTrace(branching, 'bfs')).visited, [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(end(graphTrace(branching, 'dfs')).visited, [0, 1, 3, 2, 4, 5]);
});

test('comparison runs use identical input with independent counters, and reject unsorted binary comparison', () => {
  const input = [1, 2, 3, 4, 5, 6, 7], search = compareTraces('search', input, 7);
  assert.deepEqual(search[0][0].values, search[1][0].values);
  assert.notEqual(search[0][0].values, search[1][0].values);
  assert.equal(end(search[0]).counters.comparisons, 7); assert.equal(end(search[1]).counters.comparisons, 3);
  assert.notEqual(end(search[0]).counters, end(search[1]).counters);
  assert.throws(() => compareTraces('search', [3, 1], 1), /ascending/);
  const sort = compareTraces('sort', [7, 3, 5, 3, 1]);
  assert.deepEqual(sort[0][0].values, sort[1][0].values);
  assert.deepEqual(end(sort[0]).values, end(sort[1]).values);
  // Independent hand-count for [7,3,5,3,1]: insertion compares 1+2+3+4,
  // shifts 8 inversions + 4 key placements; merge compares 1+2+1+3,
  // writes ranges of lengths 2+3+2+5. Equal totals are legitimate.
  assert.equal(end(sort[0]).counters.comparisons, 10);
  assert.equal(end(sort[1]).counters.comparisons, 7);
  assert.equal(end(sort[0]).counters.writes, 12);
  assert.equal(end(sort[1]).counters.writes, 12);
  assert.throws(() => compareTraces('graph', [1]));
});

test('snapshots are deeply immutable, detached from caller data, and reproducible on replay', () => {
  const input = [7, 3, 1], trace = sortTrace(input, 'merge'), saved = JSON.stringify(trace);
  input[0] = 999;
  assert.equal(trace[0].values[0], 7);
  assert.throws(() => { trace[0].values[0] = 3; }, TypeError);
  assert.throws(() => { trace[0].counters.writes++; }, TypeError);
  const buffer = trace.find(f => f.buffer);
  assert.throws(() => { buffer.buffer.left.push(4); }, TypeError);
  const graph = graphTrace(graphInput(3, '0-1', 0));
  assert.throws(() => { graph[0].edges[0][0] = 2; }, TypeError);
  const tree = bstTrace([2, 1, 3], 3);
  assert.throws(() => { end(tree).nodes[0].left = 99; }, TypeError);
  const container = containerTrace([], operations('push 1, pop', 'stack'));
  assert.throws(() => { end(container).log[0].result = 9; }, TypeError);
  const clock = new Timeline([trace]);
  while (!clock.done) clock.advance();
  for (let i = clock.last; i >= 0; i--) assert.equal(clock.seek(i)[0], trace[i]);
  while (!clock.done) clock.advance();
  assert.equal(JSON.stringify(trace), saved);
  assert.deepEqual(sortTrace([7, 3, 1], 'merge'), trace);
});

test('timeline clamps navigation, freezes finished comparison lanes, resets prediction gates on seek', () => {
  const traces = compareTraces('search', [1, 2, 3, 4, 5, 6, 7], 7), clock = new Timeline(traces);
  assert.equal(clock.index, 0); assert.equal(clock.advance(true), 'predict'); assert.equal(clock.index, 0);
  const p = clock.nextPrediction;
  assert.deepEqual(clock.answer(` ${p.answer} `), { correct: true, expected: p.answer });
  assert.equal(clock.advance(true), 'advanced'); assert.equal(clock.index, 1);
  clock.seek(0); assert.equal(clock.advance(true), 'predict');
  clock.answer('wrong'); assert.equal(clock.advance(true), 'advanced', 'wrong guesses are teaching feedback, not a dead end');
  clock.seek(-99); assert.equal(clock.index, 0);
  clock.seek(999); assert.equal(clock.index, clock.last); assert.equal(clock.done, true);
  assert.equal(clock.frames[0], end(traces[0])); assert.equal(clock.frames[1], end(traces[1]));
  assert.equal(clock.advance(true), 'done'); assert.equal(clock.nextPrediction, null);
  assert.throws(() => clock.seek(1.5)); assert.throws(() => new Timeline([]));
});

test('prediction answers are derived from the exact next snapshot for every lab', () => {
  const cases = [searchTrace([1, 2, 2], 2), searchTrace([1, 2, 2], 2, 'binary'), sortTrace([3, 1, 2], 'insertion'), sortTrace([3, 1, 2], 'merge'), containerTrace([], operations('pop, push 2, peek', 'stack')), bstTrace([2, 1, 3], 3), graphTrace(graphInput(3, '0-1', 0, true), 'bfs'), graphTrace(graphInput(3, '0-1', 0, true), 'dfs')];
  for (const trace of cases) {
    const clock = new Timeline([trace]);
    for (let i = 0; i < trace.length - 1; i++) {
      const next = trace[i + 1], question = prediction(next);
      assert.ok(question.question.length && question.hint.length && question.answer.length);
      assert.deepEqual(clock.nextPrediction, question);
      const actual = next.done ? 'finish' : next.lab === 'search' ? next.event === 'compare' ? String(next.focus.index) : 'narrow' : next.lab === 'container' ? String(next.focus.result) : next.lab === 'bst' ? String(next.focus.value) : next.event;
      assert.equal(question.answer, actual);
      assert.equal(clock.advance(true), 'predict');
      assert.equal(clock.answer(question.answer.toUpperCase()).correct, true);
      assert.equal(clock.advance(true), 'advanced');
    }
  }
});
