# Torque

[Live website](https://moriyamao.github.io/morish-portfolio/clients/torque/)

An independent automotive detailing website concept by Morish Macayan. Dark surfaces, condensed italic type, orange accents, and restrained motion support an estimate flow that exposes the price of each choice. Services, turnaround times, and PHP prices are illustrative, not an offer from a real detailing shop.

## Use and calculations

Serve the repository root and open `clients/torque/`. No build step or dependencies. Google Fonts provides Barlow Condensed and DM Sans with system fallbacks. Motion honors the operating system preference.

`estimate.js` contains the browser and Node-compatible pricing function. Base sedan prices are Reset ₱1,800, Refine ₱5,500, and Shield ₱12,500. Vehicle multipliers are sedan 1×, SUV 1.25×, and large 1.5×. The package subtotal is rounded to whole pesos, then fixed-price add-ons are added. Duplicate add-ons are charged once; unknown inputs are rejected.

The treatment buttons configure the estimate. Changing a size or add-on updates each line and the total. Save Estimate downloads a local text file. No appointment, payment, submission, or account is created. The finish slider uses two views of the same photo with a filter to demonstrate contrast, explicitly labeled as a simulation rather than customer results.

## Photography

Stock images from Unsplash's image CDN, stored in the repository:

| Local file | Image source |
| --- | --- |
| `assets/hero.jpg` | https://images.unsplash.com/photo-1492144534655-ae79c964c9d7 |
| `assets/detail.jpg` | https://images.unsplash.com/photo-1503376780353-7e6692767b70 |

The SVG mark was created for this site. Run price and asset checks from the repository root with `node --test clients/clients.test.cjs`.
