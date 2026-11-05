import { LIMITS, DEFAULTS, CODE, numbers, integer, operations, graphInput, searchTrace, sortTrace, containerTrace, bstTrace, graphTrace, compareTraces } from './engine.mjs';
import { Timeline } from './timeline.mjs';

const $ = id => document.getElementById(id);
const names = { linear: 'Linear search', binary: 'Binary search', insertion: 'Insertion sort', merge: 'Merge sort', stack: 'Stack', queue: 'Queue', bst: 'Binary search tree', bfs: 'Breadth-first search', dfs: 'Depth-first search' };
const copy = {
  search: { title: 'Search lab', description: 'One target. Two strategies. Find the first matching index.', model: 'A good question can eliminate half the possibilities.', complexity: 'Linear: O(n) worst-case time, O(1) auxiliary space. Binary: O(log n) time, O(1) auxiliary space on ascending input. Both return the first match. A comparison is one three-way value-to-target probe; loop and index tests are excluded.' },
  sort: { title: 'Sort lab', description: 'Watch disorder resolve, one comparison and write at a time.', model: 'Order grows from a small, reliable invariant.', complexity: 'Insertion: O(n²) worst/average time, O(n) best on sorted input, O(1) auxiliary space. Merge: O(n log n) time, O(n) peak auxiliary space. Both are stable. Comparisons count value comparisons only. Writes count assignments to the main array, including placing a held key even in its original position. Buffer copies, key reads, and index tests are excluded.' },
  container: { title: 'Stack / queue lab', description: 'Write an operation script. Trace what enters, leaves, and stays.', model: 'The same data. A different rule for who leaves next.', complexity: 'A bounded stack has O(1) push, pop and peek. An abstract queue has O(1) enqueue, dequeue and peek; this visual array implementation uses shift, so dequeue is O(n). Operations count every requested command, including rejections. Writes count successful adds/removals as one logical mutation; JS array shifts are not counted separately. Capacity is 16; commands are limited to 64.' },
  bst: { title: 'Binary tree lab', description: 'Insert unique keys, then follow the search path through your tree.', model: 'Every branch carries a promise: smaller left, larger right.', complexity: 'This BST is unbalanced. One insert/search costs O(h), up to O(n); building the tree can cost O(n²). Tree storage is O(n). Comparisons count three-way key-to-node comparisons during insertion and search together. Writes count node insertions (one each, not pointer assignments). Visits count search nodes only. No rotations or deletion.' },
  graph: { title: 'Graph lab', description: 'Edit an undirected network. Discover how a frontier shapes a journey.', model: 'A frontier is a promise to explore. The order changes the story.', complexity: 'BFS/DFS: O(V + E) time and O(V + E) adjacency-list storage, with O(V) traversal space. Visits count each visited vertex once. Edge checks count inspected adjacency entries, so each undirected edge is checked twice when its component is fully traversed. Neighbor sorting is preprocessing, excluded from the traversal counters. BFS uses an array queue with O(V) shift in this small visual implementation.' }
};
const presets = {
  search: [ ['Classic / find 16', { values: DEFAULTS.search, target: '16' }], ['Duplicates / first match', { values: '1, 3, 3, 3, 5, 8, 8', target: '3' }], ['Absent target', { values: DEFAULTS.search, target: '17' }], ['64 values / upper bound', { values: Array.from({ length: 64 }, (_, i) => i * 2).join(', '), target: '88' }] ],
  sort: [ ['A little disorder', { values: DEFAULTS.sort }], ['Reverse order', { values: '9, 8, 7, 6, 5, 4, 3, 2, 1' }], ['Already sorted', { values: '1, 2, 3, 4, 5, 6' }], ['Signed values & ties', { values: '0, -5, 3, -2, 3, 1' }] ],
  container: [ ['A short conversation', { values: '', ops: 'push 10, push 20, peek, pop, push 30, pop, pop, pop' }], ['Underflow / empty', { values: '', ops: 'pop, push 5, pop, peek' }], ['Capacity / overflow', { values: Array.from({ length: 16 }, (_, i) => i + 1).join(', '), ops: 'push 99, peek, pop, push 99' }] ],
  bst: [ ['A balanced beginning', { values: DEFAULTS.bst, target: '6' }], ['A tree becomes a chain', { values: '1, 2, 3, 4, 5, 6, 7', target: '7' }], ['Search an absent key', { values: DEFAULTS.bst, target: '5' }] ],
  graph: [ ['Six connected vertices', { count: '6', edges: DEFAULTS.graph, start: '0', all: false }], ['Disconnected / explore the rule', { count: '7', edges: '0-1, 0-2, 3-4, 4-5', start: '0', all: false }], ['Cycles / discover once', { count: '6', edges: '0-1, 0-2, 1-2, 1-3, 2-4, 3-5, 4-5', start: '0', all: true }], ['Isolated vertices', { count: '6', edges: '', start: '2', all: true }] ]
};
let lab = 'search', timeline, playing = false, timer = null, asking = false, applied = null;
function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function field(id, label, type = 'text', extra = '') {
  return `<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}>`;
}
function setup(nextLab) {
  pause(); lab = nextLab;
  for (const button of document.querySelectorAll('[data-lab]')) button.setAttribute('aria-pressed', String(button.dataset.lab === lab));
  $('lab-heading').textContent = copy[lab].title;
  $('lab-description').textContent = copy[lab].description;
  $('mental-model').textContent = copy[lab].model;
  $('complexity').replaceChildren(el('p', '', copy[lab].complexity), el('p', '', 'Counters describe the algorithm; trace recording and rendering are excluded. Keeping every snapshot costs more memory than the algorithm itself. No wall-clock performance claims.'));
  let html = '<div>';
  if (lab !== 'bst') html += `<label for="algorithm">Strategy</label><select id="algorithm" name="algorithm">${({ search: ['linear', 'binary'], sort: ['insertion', 'merge'], container: ['stack', 'queue'], graph: ['bfs', 'dfs'] })[lab].map(x => `<option value="${x}">${names[x]}</option>`).join('')}</select>`;
  if (lab === 'graph') {
    html += field('count', 'Vertices (1–12)', 'number', 'min="1" max="12"');
    html += '<label for="edges">Undirected edges</label><textarea id="edges" name="edges" rows="3" spellcheck="false" aria-describedby="bounds"></textarea><p id="bounds" class="micro">0-based IDs · up to 24 unique edges<br>Format: 0-1, 1-2 · blank = no edges</p>';
    html += field('start', 'Start vertex', 'number', 'min="0" max="11"');
    html += '<label class="check"><input id="all" type="checkbox"> Traverse all components</label><p class="micro">Off: stop at the start component.<br>On: restart at the lowest unseen ID.</p>';
  } else {
    const max = LIMITS[lab];
    html += `<label for="values">${lab === 'container' ? 'Initial contents (optional)' : lab === 'bst' ? 'Insertion order' : 'Input values'}</label><textarea id="values" name="values" rows="3" spellcheck="false" aria-describedby="bounds"></textarea><p id="bounds" class="micro">${lab === 'container' ? '0' : '1'}–${max} ${lab === 'bst' ? 'unique ' : ''}integers · −999 to 999</p>`;
    if (['search', 'bst'].includes(lab)) html += field('target', 'Target value', 'number', 'min="-999" max="999"');
    if (lab === 'container') html += '<label for="ops">Operation script</label><textarea id="ops" name="ops" rows="4" spellcheck="false" aria-describedby="op-help"></textarea><p id="op-help" class="micro">Up to 64 commands. Separate with commas or new lines.</p>';
    if (['search', 'sort'].includes(lab)) html += '<label class="check"><input type="checkbox" id="compare"> Compare both strategies</label>';
    if (lab === 'search') html += '<p class="micro">Binary / compare requires ascending input. Values are never silently sorted.</p>';
  }
  $('fields').innerHTML = `${html}</div>`;
  $('preset').replaceChildren(...presets[lab].map(([title], i) => new Option(title, i)));
  fillPreset(0);
  if (lab === 'container') $('algorithm').addEventListener('change', () => {
    const queue = $('algorithm').value === 'queue';
    $('ops').value = $('ops').value.replace(/\b(push|enqueue|pop|dequeue)\b/gi, word => ['push', 'enqueue'].includes(word.toLowerCase()) ? queue ? 'enqueue' : 'push' : queue ? 'dequeue' : 'pop');
  });
  apply();
}
function fillPreset(index) {
  const data = presets[lab][index][1];
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'boolean') $(key).checked = value;
    else $(key).value = value;
  }
  if (lab === 'container' && $('algorithm').value === 'queue') $('ops').value = $('ops').value.replace(/\bpush\b/g, 'enqueue').replace(/\bpop\b/g, 'dequeue');
}
function apply() {
  let traces, config;
  try {
    const algorithm = lab === 'bst' ? 'bst' : $('algorithm').value;
    const compare = $('compare')?.checked ?? false;
    if (lab === 'graph') {
      config = graphInput($('count').value, $('edges').value, $('start').value, $('all').checked);
      traces = [graphTrace(config, algorithm)];
    } else {
      const values = numbers($('values').value, LIMITS[lab], { unique: lab === 'bst', allowEmpty: lab === 'container' });
      const target = $('target') ? integer($('target').value, 'Target') : undefined;
      config = { values, target };
      if (compare) traces = compareTraces(lab, values, target);
      else if (lab === 'search') traces = [searchTrace(values, target, algorithm)];
      else if (lab === 'sort') traces = [sortTrace(values, algorithm)];
      else if (lab === 'container') traces = [containerTrace(values, operations($('ops').value, algorithm), algorithm)];
      else traces = [bstTrace(values, target)];
    }
    pause(); timeline = new Timeline(traces); applied = config;
    $('input-error').hidden = true; $('draft-note').textContent = 'Input applied. Frame 0 is ready.';
    $('frame-select').replaceChildren(...Array.from({ length: timeline.last + 1 }, (_, i) => {
      const summary = traces.map(trace => trace[Math.min(i, trace.length - 1)].event).join(' / ');
      return new Option(`${String(i).padStart(3, '0')} / ${summary}${i === 0 ? ' — initial state' : ''}`, i);
    }));
    render(); announce('Input applied. New trace ready.');
  } catch (error) {
    pause(); $('input-error').textContent = error.message; $('input-error').hidden = false;
    $('draft-note').textContent = 'Input not applied. The previous trace is preserved.';
    $('input-error').scrollIntoView({ block: 'nearest' });
  }
}
function makeArray(frame) {
  const wrap = el('div', 'array-wrap'), values = frame.values;
  const array = el('div', `array${frame.lab === 'sort' ? ' sort-array' : ''}${values.length > 16 ? ' dense' : ''}`);
  array.style.setProperty('--count', values.length);
  const min = Math.min(...values), max = Math.max(...values);
  values.forEach((value, index) => {
    // Merge comparisons live in separate buffers; insertion comparisons use one array operand and a held key.
    const active = frame.focus.index === index || (frame.algorithm === 'insertion' && frame.event === 'compare' && frame.focus.indices?.[0] === index);
    const resolved = frame.lab === 'search' ? frame.result === index : frame.sorted.includes(index);
    const seen = frame.checked?.includes(index);
    const outside = frame.algorithm === 'binary' && (index < frame.low || index > frame.high) && !resolved;
    const cell = el('div', `cell${seen ? ' examined' : ''}${outside ? ' outside' : ''}${resolved ? ' resolved' : ''}${active ? ' current' : ''}`);
    const box = el('div', 'value-box'); box.append(el('span', '', value));
    box.style.setProperty('--height', `${40 + (max === min ? .5 : (value - min) / (max - min)) * 115}px`);
    cell.append(box, el('span', 'index', index)); array.append(cell);
  });
  const note = el('div', 'array-note');
  if (frame.lab === 'search') {
    note.append(el('span', '', 'ZERO-BASED INDICES'), el('strong', '', `TARGET / ${frame.target}`));
    if (frame.algorithm === 'binary') note.append(el('span', '', `RANGE / [${frame.low}, ${frame.high}]${frame.low > frame.high ? ' EMPTY' : ''}`));
    if (frame.result !== null) note.append(el('strong', '', `CANDIDATE / ${frame.result}`));
  } else note.append(el('span', '', 'HEIGHT ENCODES RELATIVE VALUE'), el('strong', '', frame.held !== null ? `HELD KEY / ${frame.held}` : `RANGE / ${frame.range.join(' → ')}`));
  wrap.append(array, note);
  if (frame.held !== null && frame.lab === 'sort') {
    const held = el('div', 'buffer');
    held.append(el('span', '', 'Separate held key: '), el('strong', '', frame.held));
    if (frame.event === 'compare') held.append(el('span', '', ` · Compare array[${frame.focus.indices[0]}] = ${frame.focus.pair[0]} with held key ${frame.focus.pair[1]}.`));
    wrap.append(held);
  }
  if (frame.buffer) {
    const buffers = el('div', 'merge-buffers');
    for (const side of ['left', 'right']) {
      const row = el('div', 'buffer-row'); row.append(el('span', 'buffer-label', side.toUpperCase()));
      frame.buffer[side].forEach((v, i) => {
        const consumed = i < frame.buffer[side === 'left' ? 'i' : 'j'];
        const current = frame.event === 'compare' && frame.focus.buffers[side] === i;
        row.append(el('span', `buffer-value${consumed ? ' consumed' : ''}${current ? ' active' : ''}`, v));
      });
      buffers.append(row);
    }
    buffers.append(el('p', 'micro', frame.event === 'compare' ? `Compare ${frame.focus.pair[0]} with ${frame.focus.pair[1]} → destination index ${frame.focus.destination}.` : 'Separate merge buffers · faded values have been consumed.'));
    wrap.append(buffers);
  }
  return wrap;
}
function svgElement(tag, attrs = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
  return element;
}
function node(svg, x, y, value, className, radius = 18) {
  const group = svgElement('g', { class: className });
  group.append(svgElement('circle', { cx: x, cy: y, r: radius }));
  const text = svgElement('text', { x, y }); text.textContent = value; group.append(text); svg.append(group);
}
function makeGraph(frame) {
  const svg = svgElement('svg', { viewBox: '0 0 440 270', class: 'graph-svg', 'aria-hidden': 'true' });
  const points = Array.from({ length: frame.n }, (_, i) => {
    const angle = -Math.PI / 2 + i * 2 * Math.PI / frame.n;
    return frame.n === 1 ? [220, 135] : [220 + Math.cos(angle) * 160, 135 + Math.sin(angle) * 105];
  });
  for (const [a, b] of frame.edges) {
    const current = frame.focus.edge && [a, b].every(v => frame.focus.edge.includes(v));
    svg.append(svgElement('line', { x1: points[a][0], y1: points[a][1], x2: points[b][0], y2: points[b][1], class: current ? 'edge-active' : '' }));
  }
  points.forEach(([x, y], value) => node(svg, x, y, value, frame.focus.value === value ? 'node-current' : frame.visited.includes(value) ? 'node-visited' : frame.discovered.includes(value) ? 'node-seen' : ''));
  return svg;
}
function makeTree(frame) {
  const svg = svgElement('svg', { viewBox: '0 0 470 300', class: 'graph-svg', 'aria-hidden': 'true' });
  if (!frame.nodes.length) { const text = svgElement('text', { x: 235, y: 150 }); text.textContent = 'The first key becomes the root.'; svg.append(text); return svg; }
  const map = new Map(frame.nodes.map(n => [n.value, n])), order = [], depths = new Map();
  function layout(value, depth) {
    if (value === null) return;
    const n = map.get(value); depths.set(value, depth); layout(n.left, depth + 1); order.push(value); layout(n.right, depth + 1);
  }
  layout(frame.nodes[0].value, 0);
  const maxDepth = Math.max(...depths.values()), points = new Map(order.map((value, i) => [value, [30 + (i + .5) * 410 / order.length, 25 + depths.get(value) * 250 / Math.max(1, maxDepth)]]));
  for (const n of frame.nodes) for (const child of [n.left, n.right]) if (child !== null) svg.append(svgElement('line', { x1: points.get(n.value)[0], y1: points.get(n.value)[1], x2: points.get(child)[0], y2: points.get(child)[1] }));
  for (const n of frame.nodes) node(svg, ...points.get(n.value), n.value, frame.focus.value === n.value ? 'node-current' : frame.result === n.value ? 'node-visited' : '', frame.nodes.length > 12 ? 13 : 18);
  return svg;
}
function makeContainer(frame) {
  const wrap = el('div', 'container-wrap'), contents = el('div', `container-items ${frame.algorithm}`);
  if (!frame.values.length) contents.append(el('span', 'empty-state', 'empty'));
  frame.values.forEach((v, i) => contents.append(el('span', `container-item${i === frame.focus.index ? ' current' : ''}`, v)));
  const note = el('div', 'container-side');
  note.append(el('strong', '', frame.algorithm === 'stack' ? '↑ TOP / LAST IN' : 'FRONT → REAR'), el('span', '', `${frame.values.length} / ${LIMITS.container} slots`));
  wrap.append(contents, note); return wrap;
}
function counter(definition, value, label) {
  const element = el('div', 'counter'); element.title = definition;
  element.append(el('strong', '', value), el('span', '', label));
  element.setAttribute('aria-label', `${label}: ${value}. ${definition}`); return element;
}
function diagramDescription(frame) {
  if (frame.lab === 'graph') return `Undirected graph with ${frame.n} vertices. Edges: ${frame.edges.map(e => e.join(' to ')).join(', ') || 'none'}. Visited: ${frame.visited.join(', ') || 'none'}. Frontier: ${frame.frontier.join(', ') || 'empty'}. ${frame.explanation}`;
  if (frame.lab === 'bst') return `Tree nodes: ${frame.nodes.map(n => `${n.value}, left ${n.left ?? 'empty'}, right ${n.right ?? 'empty'}`).join('; ') || 'none'}. ${frame.explanation}`;
  return `${names[frame.algorithm]}. Values by index: ${frame.values.map((v, i) => `${i}: ${v}`).join(', ') || 'empty'}. ${frame.explanation}`;
}
function renderLane(frame, i) {
  const lane = el('section', 'lane'); lane.setAttribute('aria-label', `${names[frame.algorithm]} trace`);
  const top = el('div', 'lane-top'); top.append(el('strong', '', `${timeline.traces.length === 2 ? `${i === 0 ? 'A' : 'B'} / ` : ''}${names[frame.algorithm]}`), el('span', 'badge', frame.done ? 'COMPLETE' : frame.event.toUpperCase()));
  const diagram = el('div', `diagram ${frame.lab}-diagram`); diagram.setAttribute('role', 'img'); diagram.setAttribute('aria-label', diagramDescription(frame));
  diagram.append(frame.lab === 'graph' ? makeGraph(frame) : frame.lab === 'bst' ? makeTree(frame) : frame.lab === 'container' ? makeContainer(frame) : makeArray(frame));
  lane.append(top, diagram);
  if (frame.lab === 'graph') {
    const info = el('div', 'diagram-info');
    info.append(el('span', '', `${frame.algorithm === 'bfs' ? 'QUEUE (front → rear)' : 'RECURSION PATH (root → current)'} / `), el('strong', '', frame.frontier.join(' → ') || 'empty'), el('br'), el('span', '', 'VISIT ORDER / '), el('strong', '', frame.visited.join(' → ') || 'none'));
    lane.append(info);
  }
  if (frame.lab === 'bst') lane.append(el('div', 'diagram-info', `${frame.phase.toUpperCase()} / target ${frame.target} · ${frame.nodes.length} nodes inserted · left < parent < right`));
  if (frame.lab === 'container' && frame.log.length) {
    const history = el('div', 'op-history'), table = el('table');
    const caption = el('caption', 'sr-only', 'Executed operation history'); table.append(caption);
    const thead = el('thead'), tr = el('tr'); ['Command', 'Result', 'Status'].forEach(x => tr.append(el('th', '', x))); thead.append(tr); table.append(thead);
    const tbody = el('tbody');
    frame.log.forEach(op => { const row = el('tr', op.status); [op.name + (op.value === undefined ? '' : ` ${op.value}`), op.result, op.status].forEach(x => row.append(el('td', '', x))); tbody.append(row); });
    table.append(tbody); history.append(table); lane.append(history);
  }
  const counters = el('div', 'counters'); counters.setAttribute('role', 'group'); counters.setAttribute('aria-label', `${names[frame.algorithm]} operation counters`);
  if (['search', 'sort', 'bst'].includes(frame.lab)) counters.append(counter(frame.lab === 'search' ? 'One three-way value-to-target probe; excludes index/loop checks.' : frame.lab === 'bst' ? 'Key-to-node comparisons in insertion and search combined.' : 'Value comparisons only; excludes index/loop checks.', frame.counters.comparisons, 'comparisons'));
  if (frame.lab === 'sort') counters.append(counter('Assignments into the main array, including key placement; excludes buffer copies.', frame.counters.writes, 'array writes'));
  if (frame.lab === 'container') counters.append(counter('Requested commands, including peeks and rejected commands.', frame.counters.operations, 'operations'), counter('Successful adds/removals, one logical mutation each; excludes internal shift assignments.', frame.counters.writes, 'mutations'));
  if (frame.lab === 'bst') counters.append(counter('Node insertions, one each.', frame.counters.writes, 'insertions'), counter('Nodes visited during the search phase only.', frame.counters.visits, 'search visits'));
  if (frame.lab === 'graph') counters.append(counter('Vertices visited once.', frame.counters.visits, 'visits'), counter('Inspected adjacency entries; each undirected edge can count twice.', frame.counters.edgeChecks, 'edge checks'));
  lane.append(counters); return lane;
}
function render() {
  asking = false; $('prediction').hidden = true;
  const frames = timeline.frames, compare = frames.length === 2;
  $('lanes').classList.toggle('compare', compare); $('lanes').replaceChildren(...frames.map(renderLane));
  $('run-title').textContent = compare ? `${lab === 'search' ? 'Search' : 'Sort'} / two ways through` : names[frames[0].algorithm];
  $('run-status').textContent = timeline.done ? 'COMPLETE' : playing ? 'PLAYING' : timeline.index === 0 ? 'READY' : 'PAUSED';
  $('run-subtitle').textContent = lab === 'graph' ? `${applied.n} VERTICES / ${applied.edges.length} EDGES / START ${applied.start}` : `${applied.values.length} ${lab === 'bst' ? 'UNIQUE KEYS' : 'VALUES'}${applied.target === undefined ? '' : ` / TARGET ${applied.target}`}`;
  $('comparison-note').hidden = !compare;
  $('history').max = timeline.last; $('history').value = timeline.index;
  $('history-label').textContent = `Frame ${timeline.index} / ${timeline.last}`;
  $('history').setAttribute('aria-valuetext', `Frame ${timeline.index} of ${timeline.last}: ${frames.map(f => `${names[f.algorithm]}, ${f.event}`).join('; ')}`);
  $('frame-select').value = timeline.index;
  $('back').disabled = timeline.index === 0; $('reset').disabled = timeline.index === 0; $('step').disabled = timeline.done;
  $('play').setAttribute('aria-pressed', String(playing)); $('play').setAttribute('aria-label', playing ? 'Pause' : timeline.done ? 'Replay' : 'Play');
  $('play').replaceChildren(document.createTextNode(playing ? 'Ⅱ ' : '▶ '), el('span', '', playing ? 'Pause' : timeline.done ? 'Replay' : 'Play'));
  $('explanations').replaceChildren(...frames.map(frame => {
    const block = el('div', 'explanation'); block.append(el('strong', '', `${names[frame.algorithm]} / ${frame.event}`), el('p', '', frame.explanation)); return block;
  }));
  $('codes').replaceChildren(...frames.map(frame => {
    const block = el('div'), list = el('ol', 'pseudocode'); list.setAttribute('aria-label', `${names[frame.algorithm]} pseudocode`);
    CODE[frame.algorithm].forEach((line, i) => { const item = el('li', i === frame.line ? 'active' : '', line); if (i === frame.line) item.setAttribute('aria-current', 'step'); list.append(item); });
    if (compare) block.append(el('p', 'code-name', names[frame.algorithm])); block.append(list); return block;
  }));
}
function announce(message = timeline.frames.map(f => `${names[f.algorithm]}. ${f.explanation}`).join(' ')) { $('announcement').textContent = message; }
function pause() { playing = false; clearTimeout(timer); timer = null; }
function showPrediction() {
  pause(); render(); asking = true;
  const question = timeline.nextPrediction;
  $('run-status').textContent = 'PREDICT'; $('prediction').hidden = false;
  $('prediction-question').textContent = `${timeline.traces.length === 2 ? 'Left lane · ' : ''}${question.question}`;
  $('prediction-hint').textContent = question.hint;
  $('prediction-feedback').textContent = '';
  $('guess').value = ''; $('guess').focus();
  announce(`Playback paused for a prediction. ${question.question}`);
}
function advance(manual = true) {
  const result = timeline.advance($('predict').checked);
  if (result === 'predict') { showPrediction(); return; }
  if (timeline.done) pause();
  render(); if (manual || timeline.done) announce();
  if (playing) schedule();
}
function schedule() { clearTimeout(timer); timer = setTimeout(() => advance(false), 1100 / Number($('speed').value)); }
function togglePlay() {
  if (playing) { pause(); render(); announce('Playback paused.'); return; }
  if (timeline.done) timeline.seek(0);
  if (asking && timeline.predictedAt !== timeline.index) { $('guess').focus(); return; }
  playing = true; render(); schedule();
}
function seek(index) { pause(); timeline.seek(index); render(); announce(); }
$('config').addEventListener('submit', event => { event.preventDefault(); apply(); });
$('config').addEventListener('input', () => { $('draft-note').textContent = 'Draft changed. Apply input to start a fresh trace.'; });
$('preset').addEventListener('change', () => { fillPreset(Number($('preset').value)); $('draft-note').textContent = 'Preset loaded. Apply input to start a fresh trace.'; });
$('step').addEventListener('click', () => { pause(); advance(); });
$('back').addEventListener('click', () => seek(timeline.index - 1));
$('reset').addEventListener('click', () => seek(0));
$('play').addEventListener('click', togglePlay);
$('speed').addEventListener('change', () => { if (playing) schedule(); });
$('history').addEventListener('input', event => seek(Number(event.target.value)));
$('frame-select').addEventListener('change', event => seek(Number(event.target.value)));
$('predict').addEventListener('change', () => { if (!$('predict').checked && asking) { render(); announce('Prediction mode off.'); } });
$('prediction').addEventListener('submit', event => {
  event.preventDefault(); const result = timeline.answer($('guess').value);
  if (result) $('prediction-feedback').textContent = `${result.correct ? 'Correct.' : `The next answer is ${result.expected}.`} Select Reveal step or Step to see why.`;
});
$('reveal').addEventListener('click', () => { timeline.answer(timeline.nextPrediction.answer); advance(); $('step').focus(); });
for (const button of document.querySelectorAll('[data-lab]')) button.addEventListener('click', () => setup(button.dataset.lab));
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || event.target.closest('input, textarea, select, button, a, summary, [contenteditable="true"]')) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); pause(); advance(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); seek(timeline.index - 1); }
  if (event.code === 'Space') { event.preventDefault(); togglePlay(); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) { pause(); render(); } });
setup('search');
