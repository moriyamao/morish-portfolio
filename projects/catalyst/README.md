# CATALYST

CATALYST is a buildless pixel chemistry game for beginners. Players rebuild a
laboratory by solving six short classroom-level missions covering physical
separation, equation balancing, neutralization, energy transfer, and limiting
reactants.

The laboratory uses original AI-generated pixel artwork for its first-person
background, transparent gloved hand, and flask. `art.css` positions these assets
and animates the hand and flask; CSS particles remain independent overlays.
Reduced-motion preferences disable animation. See `assets/ARTWORK.md` for
provenance and generation prompts. No downloaded third-party asset pack is used.

## Run and test

Serve the repository over HTTP and open `/projects/catalyst/`.

```powershell
node --test projects/catalyst/engine.test.mjs
```

Progress is stored in localStorage. All experiment quantities and outcomes are
simplified game models. The app does not provide instructions for unsupervised
real-world experiments.
