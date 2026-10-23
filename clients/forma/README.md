# Forma

[Live website](https://moriyamao.github.io/morish-portfolio/clients/forma/)

An independent architecture website concept by Morish Macayan. Editorial typography, warm paper tones, asymmetric project photography, and a room explorer make the architectural work the focus. All projects, floor areas, and plans are illustrative; no commissioned architecture or professional architecture services are claimed.

## Use

Serve the repository root with any static server and open `clients/forma/`. No build step or dependencies. The page uses ordinary HTML, CSS, and JavaScript. Google Fonts supplies DM Sans and Manrope, with local system fallbacks.

- Filter three studies by residential or interiors.
- Open project details in a native modal dialog, close with the button or Escape, and return to the triggering control.
- Select one of four floor-plan rooms to explore its design intent.
- Complete the project form to download a plain-text brief. No inquiry is transmitted, and no account or booking backend exists.
- Operating-system reduced-motion preferences disable animations and smooth scrolling. Core content and native navigation remain readable without JavaScript; interactive controls need JavaScript.

## Photography

Downloaded from Unsplash's image CDN and stored locally; images illustrate the concept and are not presented as original architectural work. No image API keys or dynamic image service is needed.

| Local file | Image source |
| --- | --- |
| `assets/hero.jpg` | https://images.unsplash.com/photo-1600607687939-ce8a6c25118c |
| `assets/courtyard.jpg` | https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 |
| `assets/interior.jpg` | https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea |

The CSS floor plan and SVG favicon were created for this site. Run shared checks from the repository root: `node --test clients/clients.test.cjs`.
