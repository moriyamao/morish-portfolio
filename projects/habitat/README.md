# HABITAT

A buildless, local-first floor-plan editor and synchronized Three.js spatial view.
All application paths are relative, including the pinned, local Three.js modules.
No accounts, service calls, remote assets, build step, or package installation.

From the portfolio checkout:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/projects/habitat/`. GitHub Pages can serve the same
directory at `/morish-portfolio/projects/habitat/`. Use HTTP rather than opening
`index.html` as a `file:` URL, because browser ES modules need an HTTP origin.

## Implemented features

- Native SVG plan editing: draw rectangular rooms or individual orthogonal walls,
  with a 0.1 m grid. New intersections and T junctions split walls into a connected
  graph; collinear additions reuse existing segments rather than duplicating them.
- Select walls and drag their endpoints, move whole walls, or edit length and
  endpoint coordinates numerically. Shared X/Y constraints propagate through the
  graph to keep neighboring walls horizontal or vertical. Invalid collapses,
  overlaps, unconnected crossings, and edits that invalidate openings are rejected.
- Detected enclosed room floors, individual wall lengths, and net enclosed area.
  Nested disconnected boundaries become holes in their containing floor: a
  10 × 10 m room containing a separate 4 × 4 m loop reports 84 + 16 m².
  The SVG uses even-odd fill; Three.js uses actual shape holes.
- Doors and windows are wall-attached, dimensioned entities. Width, height, wall
  position, and window sill height are editable. Clearances are validated at both
  ends and between openings. Junctions cannot cut through an opening. Legal wall
  splits preserve the opening ID, host segment and world location.
- Both views share the same document. 3D walls are procedural segments around
  actual opening voids, including window sills and lintels; the floor plan's Y
  coordinate maps to world Z, with elevation on world Y. Doors are shown open
  and windows have translucent panes and frames.
- Ten procedural furniture types: sofa, dining table, chair, bed, counter, bath,
  toilet, plant, lamp, and decorative stair. Place, move, resize, rotate, duplicate,
  delete, and recolor furniture; inspect/select it in 3D. Walls also have individual
  finishes, heights, and thicknesses. Floor finish applies to all detected rooms.
- Blank, studio, one-bedroom and two-bedroom presets. Preset replacement, import,
  deletion, dimension changes and complete drag gestures participate in an
  80-step in-memory undo/redo history. Selecting or orbiting does not add history.
- Debounced local autosave with visible success/failure status. Download JSON for
  portable backups; upload validates before replacing the current document.
  Unsupported schema versions, invalid references, dimensions, materials, IDs,
  graph geometry and openings are rejected. Failed imports preserve the design.
- PNG floor-plan export with a white background, dimensions and metre scale.
  Rasterization uses a self-contained styled SVG with no `foreignObject`, remote
  font, image or external stylesheet. The drawing's longest side is bounded at
  approximately 1800 px, plus a footer.
- Orbit, zoom, select, reset camera, responsive mobile plan/3D tabs, touch drawing,
  pinch zoom in the plan, explicit Pan tool, plan Fit/zoom controls and a help dialog.
  Numeric drawing forms and an element selector allow keyboard creation and
  selection; dimensions, finishes and actions use labeled native controls.
- A failed Three.js import, WebGL creation/render failure or lost graphics context
  displays a fallback message while 2D editing and export stay available.

## Controls

Choose a tool, then drag on the plan for a room/wall or click to place furniture
or an opening. The Details panel also provides exact coordinate creation for
rooms and walls, a centered furniture placement action, and midpoint opening
placement on a selected wall. Selected furniture has resize and rotate handles;
rotation handles snap to 15°, while numeric controls accept individual degrees.

| Action | Control |
| --- | --- |
| Select / Room / Wall / Door / Window | V / R / W / D / N |
| Move selected furniture or wall | Arrow keys: 0.1 m; Shift: 0.5 m |
| Move selected opening along its wall | Arrow keys |
| Delete selected element | Delete / Backspace, or Details button |
| Undo / redo | Ctrl or ⌘ Z / Ctrl or ⌘ Shift Z (also Ctrl Y) |
| Cancel gesture | Escape |
| Pan plan | Pan tool, Space + drag, or middle-button drag |
| Zoom plan | Wheel, two-finger pinch, or + / − buttons |
| Orbit 3D | Pointer drag / one-finger touch drag |
| Zoom / pan 3D | Wheel / pinch; right drag / two-finger drag |
| Keyboard 3D camera | Focus 3D canvas, arrows to orbit, + / − to zoom |

The plan coordinate origin is its top-left architectural corner; X increases
rightward and Y downward. Furniture coordinates are centers. Wall opening
positions are distances from the host wall's start vertex, not absolute X/Y.
New walls default to 0.15 m thick and 2.7 m high; these are adjustable. Changing
defaults affects future walls. Editing an existing wall uses its own Details.

## Document and source

- `model.mjs`: version 1 schema, stable IDs, graph edits, floor detection,
  validation, presets, procedural wall cuts and history. Vertex, wall, opening and
  furniture instance IDs survive legal edits; furniture also references a stable
  `catalogId`. A split preserves the original wall ID on its start segment and
  gives the other segment a new ID.
- `plan.mjs`: SVG rendering and export serialization.
- `app.mjs`: interaction, validated transactions, local persistence and PNG export.
- `scene.mjs`: local Three.js/OrbitControls renderer and procedural meshes.
- `index.html`, `style.css`: responsive interface and native accessible controls.
- `vendor/`: pinned Three.js 0.187.0, its license and integrity receipt.
  `index.html` maps the bare `three` import to the vendored
  `three.module.js`; OrbitControls is loaded from `./vendor/OrbitControls.js`.

Documents are bounded to 600 vertices, 800 walls, 300 openings, 300 furnishings,
coordinates within ±50 m and a 2 MB JSON file. Imports retain only recognized
schema fields. User project names are assigned with DOM `value`/`textContent`
and escaped in SVG export.

## Verification

```powershell
node --test projects/habitat/*.test.mjs
```

The model suite tests real geometry and data operations: preset round trips and
areas, crossing/collinear graph insertion, nested floor holes, connected motion,
invalid edits, opening volume/elevation/clearance, dependent deletion, all catalog
items, atomic history, hostile/malformed JSON, and safe self-contained export.
It does not simulate a GPU, touch device or browser download. Manual browser
checks additionally cover real 2D/3D rendering, connected partition creation,
opening overlap rejection, furniture edits, undo/redo, actual JSON download and
reimport, restoration after reload, and a real PNG export inspected at 1800 × 1665.
Mobile checks at 390px include the plan/3D tabs and fitted camera, without page
overflow. A controlled local server test denied the 3D library: the app displayed
its fallback and still accepted 2D furniture edits and PNG export. This tested
module-load failure, not physical GPU context loss or touch hardware. A fresh
normal browser session reported no console errors. `preview.jpg` is an actual
browser screenshot, not a mockup.

## Limits

One floor only; straight horizontal/vertical walls and rectangular room drawing.
There are no roofs, curved/free-angle walls, structural calculations, building-code
checks, measurements from photographs, BIM/CAD interchange or photorealistic
rendering. Decorative stairs do not create another floor. Furniture can overlap
walls or other furniture; collision avoidance is intentionally not implemented.
Drawing over an existing segment reuses it rather than changing its attributes.
Invalid connected wall edits are rejected rather than silently rebuilding topology.

Floor areas use wall centerlines, so they are conceptual rather than construction
takeoffs. Rooms and their labels are derived, not independently named editable
entities. Floor finish is global. Doors have a fixed illustrative open swing;
hinge direction and opening animations are not configurable. Window transparency
depends on the GPU's alpha sorting. Large designs cost more to validate and rebuild
than the included compact layouts.

Browser storage is origin-specific, may be denied or cleared, and is not cloud
sync. Undo history is not persisted across reloads. Download JSON before switching
browser/origin or clearing storage. No collaboration, server storage or network
sharing is included. Modern browser ES modules, import maps, SVG and canvas are
required; 3D additionally needs WebGL. A lost WebGL context requires reloading to
retry 3D; the 2D editor continues working. SVG editing has explicit keyboard
alternatives, but it is not a fully narrated screen-reader spatial canvas.
