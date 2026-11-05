# TRACE — Think in steps

A buildless computer science sandbox with five interactive labs. All inputs,
algorithm computation, predictions, and history run locally in the browser.
There are no dependencies, remote fonts, CDNs, accounts, network requests, backend,
source-code execution, or fabricated performance numbers.

## Run

From the portfolio checkout:

```powershell
cd C:\Users\moris\Documents\Codex\2026-11-05\wh\work\morish-portfolio
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/projects/trace/`. Native ES modules need an HTTP
server; double-clicking `index.html` via `file://` is not supported. Every asset
path is relative, including the portfolio backlink, so the same files work at
GitHub Pages `/morish-portfolio/projects/trace/` without a build or path rewrite.

## Real features

- **Search:** linear search and ascending-input binary search, both returning the
  first matching zero-based index. Binary keeps a candidate after equality and
  searches left for earlier duplicates. Unsorted binary/compare input is rejected,
  never silently sorted. Missing targets return no match.
- **Sort:** stable insertion and merge sort. Insertion exposes the separately
  held key; merge exposes independent buffers, consumed values, highlighted
  comparison heads, and destination index. A merge comparison never highlights
  overwritten main-array positions as though they still contained the operands.
  Bar heights encode relative value within each current frame; indices and exact
  signed values remain visible.
- **Stack / queue:** editable initial contents and a command script. Push/pop or
  enqueue/dequeue and peek produce a recorded result/status for every command.
  Capacity overflow and empty reads/removals are explicit rejected operations,
  preserving contents. Switching mode translates the draft operation verbs.
- **BST:** insert unique integer keys into an unbalanced tree in input order, then
  search the target. Nodes and child links reflect the actual current tree. The
  diagram rescales by current depth; the UI distinguishes insertion from search.
- **Graph:** editable undirected simple graph, BFS and recursive DFS with ascending
  neighbor IDs. BFS marks discovery on enqueue, so a vertex enters the frontier
  once. DFS exposes the actual recursion path. Current edge inspection, discovery,
  visit order, and frontier are visible. With **Traverse all components** off,
  only the start component is visited. With it on, traversal restarts at the
  lowest unseen vertex ID after each completed component; isolated vertices count
  as components. The start vertex is always processed first.
- **History:** Step, Back, Play/Pause, Reset, 1×/2×/4× speed, a frame slider, and a
  selectable record of every frame. Immutable snapshots preserve cumulative
  counters, explanation, focus, and active pseudocode line. Back and replay select
  recorded states instead of reversing or rerunning mutations.
- **Prediction:** optional before-step questions are derived from the exact next
  snapshot. Playback pauses and focuses the answer field. Checking an answer
  gives feedback without advancing; Reveal step reveals that frame. Incorrect
  guesses do not block learning. No score is invented or persisted.
- **Compare:** search or sort on identical input, side by side on wide screens and
  stacked on smaller screens. Each lane has its own clearly labeled operation
  counters, explanation, pseudocode, and completion state. One playback tick
  advances one recorded event in each lane; a completed lane holds its final
  state. This is an event comparison, not equal computational work per tick or a
  runtime benchmark. Predictions follow the left lane; the other lane continues
  without questions after the left lane finishes.
- **Input workflow:** presets populate drafts. Apply validates all input and starts
  a fresh run at frame zero. Invalid Apply pauses playback, reports the error,
  and preserves the last valid trace. Editing a draft does not change a running
  trace. Reset rewinds the currently applied run, preserving its input.
- **Access:** native labeled controls; pressed-state lab selection; per-lane
  counter groups with textual definitions; SVG/DOM diagrams with complete text
  alternatives; highlighted pseudocode marked with `aria-current`; keyboard focus
  indicators and skip link; announcements for manual steps and playback pauses;
  responsive stacked layout. Arrow Left/Right navigate and Space plays/pauses
  outside interactive/editable controls. Playback is opt-in, honors CSS reduced
  motion, and pauses when the document is hidden.

## Bounds and defaults

All entered values/targets are whole numbers in **−999…999**. Graph IDs are
**0…vertex count − 1**. Commas or whitespace separate value lists. Command
scripts accept commas, semicolons, or new lines. Graph edges use `0-1, 1-2`.

| Lab | Bounds | Default |
| --- | --- | --- |
| Search | 1–64 values | `2,5,8,12,16,23,38`, target `16`, linear |
| Sort | 1–32 values | `7,3,5,3,1`, insertion |
| Stack / queue | 0–16 initial values; capacity 16; 1–64 commands | empty stack; `push 10, push 20, peek, pop, push 30, pop, pop, pop` |
| BST | 1–15 unique keys | `8,4,12,2,6,10,14`, search `6` |
| Graph | 1–12 vertices; 0–24 unique undirected edges | 6 vertices; `0-1,0-2,1-3,2-4,4-5`; start `0`; BFS; start component only |

Duplicate BST keys, graph self-edges, duplicate/reversed duplicate edges, invalid
endpoints, malformed numbers, empty required inputs, and out-of-range values are
rejected. Blank graph edges and blank initial containers are intentional inputs.

## Counter definitions

Every counter is computed from algorithm events and cumulative within its lane.
Ready/finish, range narrowing, holds, splits, graph discovery/return, rendering,
snapshot copying, neighbor sorting, and input validation do not add unspecified
operations. Equal totals between algorithms are valid.

| Counter | What increments it | Excluded |
| --- | --- | --- |
| Search comparisons | One three-way value-to-target probe | Loop/index checks, binary range updates |
| Sort comparisons | One value-to-held-key or left/right buffer-head comparison | Loop/index tests, exhausted-buffer copying |
| Sort array writes | One assignment into the main array, including placing an insertion key even at its original index | Holding a key, reads, buffer allocation/copying |
| Container operations | Every requested command, including peek, full rejection, and empty rejection | Trace-ready/finish events |
| Container mutations | One successful add or removal | Peek, rejected commands, internal JS shift assignments |
| BST comparisons | Every key-to-node comparison during insertion **and search combined** | Empty child tests, link assignments |
| BST insertions | One newly attached node | Individual pointer writes |
| BST search visits | One node examined during the search phase | Nodes compared during insertion |
| Graph visits | One vertex appended to visit order | Enqueue/discovery, already seen neighbors |
| Graph edge checks | One inspected adjacency-list entry | Discovery and neighbor sorting; an undirected edge counts twice when its component is fully traversed |

For example, sorting the default `7,3,5,3,1` makes **10 comparisons / 12 writes**
with insertion and **7 comparisons / 12 writes** with merge. These are operation
counts, not milliseconds. Search's default target `16` is first found at index 4.

## Complexity and implementation limits

| Algorithm | Time | Auxiliary space (algorithm only) |
| --- | --- | --- |
| Linear search | O(n) worst | O(1) |
| First-match binary search | O(log n), requires ascending values | O(1) |
| Insertion sort | O(n²) average/worst, O(n) sorted best | O(1) |
| Merge sort | O(n log n) | O(n) peak, plus O(log n) recursion |
| Abstract stack | O(1) per operation | O(n) contents |
| Abstract queue | O(1) per operation | O(n) contents |
| Unbalanced BST | O(h) per insert/search; h up to n; build up to O(n²) | O(n) tree |
| BFS / DFS | O(V + E) adjacency traversal | O(V) traversal, O(V + E) graph |

The visual queue uses JavaScript `Array.shift()`, so its dequeue has O(n) array
work. BFS also uses `shift()` on its bounded queue; O(V + E) describes the abstract
adjacency traversal, not a performance guarantee for this implementation. Sorting
neighbors is preprocessing and has its own cost. The container mutation counter
records logical ADT mutations, not individual array assignments.

The app precomputes and retains every immutable snapshot. Recording, cloning,
history, DOM work, array searches used to find BST nodes, and drawing costs are
additional overhead excluded from textbook algorithm complexity/counters. Inputs
are deliberately small. This is a teaching instrument, not a benchmark or a large
dataset processor. Trace frame counts vary by algorithm and include explanatory
events; comparing playback durations would be misleading.

No data import/export, persistence, tree balancing/deletion, weighted/directed
graphs, shortest paths, or arbitrary code execution. Switching labs loads that
lab's default input; draft configurations are not retained across lab changes.
Modern browsers must support native ES modules, `structuredClone`, SVG, and CSS
Grid. No offline service worker is installed. A screen reader can inspect textual
diagram summaries; those summaries and keyboard controls still warrant testing
with users of assistive technology. Very skewed trees are scaled to fit the view.

## Tests and verification

```powershell
node --test projects/trace/engine.test.mjs
node --check projects/trace/app.mjs
node --check projects/trace/engine.mjs
node --check projects/trace/timeline.mjs
```

The dependency-free `node:test` suite checks independent expected results against
seeded inputs at every supported array length; first duplicate matches; exact
counters; full BST ancestor invariants; BFS/DFS orders against independent
references; queue/stack model agreement; cycles and disconnected/isolated graphs;
every input bound; merge buffer operands after main-array overwrite; stable tie
decisions; deeply frozen detached snapshots; replay/navigation; comparison lane
completion; and prediction gates/answers for every lab.

These unit tests execute the engines and timeline, not a browser or a DOM double.
Manual browser smoke testing covered all five labs, search comparison,
invalid-input preservation, merge buffer
rendering, underflow/FIFO behavior, BST search, disconnected DFS, predictions,
keyboard stepping, 390px layout without horizontal overflow, and no browser errors.
This does not constitute automated cross-browser or assistive-technology testing.

## Files

- `index.html`: semantic app shell and controls.
- `styles.css`: local typography, responsive diagrams, controls, reduced motion.
- `engine.mjs`: strict parsing, validation, pseudocode, deterministic immutable traces.
- `timeline.mjs`: playback position, comparison lane clamping, prediction gate.
- `app.mjs`: form binding, accessible DOM/SVG rendering, playback scheduling.
- `engine.test.mjs`: engine and timeline unit tests with independent references.

`preview.jpg` is an actual browser capture from the local verification session.
The portfolio entry and case study link back to this application and its source.
