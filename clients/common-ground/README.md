# Common Ground

[Live website](https://moriyamao.github.io/morish-portfolio/clients/common-ground/)

An independent coworking website concept by Morish Macayan. Warm paper, plum, lime, expressive type, and an interactive floor map create a welcoming alternative to a corporate office listing. The spaces, pricing, and seat availability are illustrative. No real location, operating business, customer, or reservation inventory is claimed.

## Use and planner behavior

Serve the repository root and open `clients/common-ground/`. Buildless HTML, CSS, and JavaScript. Google Fonts provides Outfit and DM Sans with system fallbacks. Reduced-motion preferences disable animations and smooth scrolling.

- Explore shared desks, quiet desks, and a meeting room.
- Compare daily and monthly desk prices; the meeting room remains hourly in either view.
- Choose an available seat on the illustrated floor map. A3, A6, and Q3 are unavailable sample seats and disabled; no real-time availability is implied.
- Daily rates: shared ₱450, quiet ₱650. Calendar-month rates: shared ₱6,500, quiet ₱9,500. Monthly plans start on the selected date; they are not calculated as 30 individual day passes.
- Meeting room: ₱900/hour, 1–4 hours, scheduled within 9 AM–6 PM. Later starts disable durations beyond closing time and shorten an incompatible selection.
- Dates use the visitor's local calendar date, reject earlier dates, and download as ISO dates without timezone conversion.
- Download a text workday plan. Nothing is booked, paid, submitted, or stored persistently. The plan is browser-local until downloaded.

`planner.js` exports the shared calculation function for Node tests and the browser. Invalid sample seats, durations, or meeting hours are rejected. Run checks from the repository root with `node --test clients/clients.test.cjs`.

## Photography

Stock imagery downloaded from Unsplash's image CDN and served locally:

| Local file | Image source |
| --- | --- |
| `assets/hero.jpg` | https://images.unsplash.com/photo-1497366811353-6870744d04b2 |
| `assets/lounge.jpg` | https://images.unsplash.com/photo-1497366754035-f200968a6e72 |

The floor-map artwork and SVG favicon were created for the site.
