# CarKit

By **Morish Macayan** — [portfolio](https://moriyamao.github.io/morish-portfolio/).

Build a race car part by part in the browser, then drive it.

A made-up touring-class race coupe (2.0 L turbo, front-wheel drive, number 27)
in 49 named parts and 72 pieces: seam-welded shell, roll cage, turbo engine,
sequential gearbox, coil-over suspension, drilled brake discs, centre-lock
wheels on slick tyres, fuel cell, exhaust, racing seat and harness, doors,
bonnet, splitter, diffuser, rear wing, lights and glass. Everything is
generated in code; there are no model or image files.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5190. `npm run build` type-checks and makes a
production build in `dist/`. `npm run build:single` makes the whole app as one
self-contained page, `dist-single/carkit.html`.

## What is in it

Ten steps, each with its own address (`#parts`, `#shell`, `#powertrain`,
`#suspension`, `#wheels`, `#fuel`, `#electrics`, `#interior`, `#panels`,
`#drive`):

1. **Parts**: every part laid out on a cutting mat, with a bill of materials
   to tick off. Hover a row to light the part up; click a row or the part
   itself for what it does and its specs. The selected part turns yellow.
2. **Steps 2–9**: the car goes together one system at a time. Each step lists
   the parts it needs and what to do, and the parts fly into place.
3. **Drive**: a three-lap race against five AI drivers (the same race car in
   their own liveries) on a 4.5 km circuit
   with woods, a lake, pit garages, grandstands, a bridge, billboards, gravel
   traps and numbered corners. Five start lights, lap timing with three
   sectors, live standings and a results card at the flag, track limits,
   a track map with every car on it, shift lights, manual or automatic gears,
   revs that climb with speed (or real rev drops, by switch)
   and a synthesised race-car sound (exhaust rasp, upshift bangs, crackles on
   the overrun, turbo, gear whine). The car performs like a real
   touring-class race car: about 4.4 s to 100 km/h, 235 km/h flat out,
   braking at up to 2 g. "Drive alone" turns the other cars off for hot laps.

In steps 2–9 the **Fit** button (or `F`) lets you build it yourself: the
step's parts float beside the car and each one is fitted with a click on it
(or on its Fit button in the list).

The paint colour (livery) is chosen in the header. The build order (left) and
the instructions (right) are sidebars: the buttons at either end of the header
(or `B` and `I`) fold them to a slim strip on a computer, and open them as
drawers on a phone, where the drive step also gets on-screen pedals. A part has its own address too, e.g. `#parts-engine`.

## Controls

| | |
|---|---|
| Drag | turn the view |
| Wheel, `+` / `−` buttons | zoom |
| Right-drag | move the view |
| Click a part or a list row | part details (`Esc` to go back) |
| Click a selected part again | reach the part behind it, e.g. through a window |
| `←` `→` | previous / next step |
| `E` | exploded view (steps 2–9) |
| `F` | fit the parts yourself (steps 2–9) |
| `Space`, `R` | pause / replay the assembly |
| `0` | reset the view |
| `L` | part labels on the mat |
| Drive step | `W A S D` or arrows, `Space` brake, `Q` / `E` gears (manual), `L` lights, `Z` hazards, `H` horn, `C` camera |
| `B` / `I` | show / hide the build order / the instructions |

Nothing needs the mouse to be captured, so it works inside embedded previews.

## Where things are

- `src/data.ts`: all the text: parts, specs, steps.
- `src/car/loft.ts`: the body surface; every outer panel is a patch cut from it.
- `src/car/build.ts`: geometry and materials for every part.
- `src/viewer.ts`: scene, camera, layouts, animation, picking, step pictures.
- `src/drive.ts`: the driving model.
- `src/track.ts`: the circuit, its scenery, racing line and speed map.
- `src/ai.ts`: the AI drivers.
- `src/main.ts`, `src/style.css`: the page.

