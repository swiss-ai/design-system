# Swiss-ai.org Web Style Guide

A complete, production-quality design system for the Swiss-ai.org website —
**rebuilt on [Material Design&nbsp;3](https://m3.material.io)** (Apache-2.0,
Google) as the component library baseline. The kit is static, inspectable,
accessible, responsive, and licensed under the Apache License, Version 2.0.
Apertus — a flagship project of Swiss-ai.org — supplies the brand palette
(Apertus Sky Blue, Apertus Anthracite, EPFL Red).

**Based on design and illustrations by [Florian Molinari](https://www.molinaridesign.ch/)**

## Documentation

- [`design/*`](https://github.com/swiss-ai/design-system/tree/main/design) - original design assets and logos.
- [`docs/design-principles.md`](docs/design-principles.md) — why M3, the
  Apertus adaptations, and component vocabulary.
- [`docs/usage.md`](docs/usage.md) — usage for designers and developers.
- [`docs/accessibility.md`](docs/accessibility.md) — WCAG 2.2 AA details and
  the verified contrast table.
- [`docs/governance.md`](docs/governance.md) — governance, the Apache-2.0
  dependency policy, and the change process.


## Purpose

The style guide is the single source of truth for visual and interaction
patterns across Swiss-ai.org digital products. The vibe is:

- Precise, open, sovereign, Swiss, technical, calm, credible, public-interest AI.
- The interface should feel like a clean institutional research platform rather than a commercial SaaS landing page. 
- Communicate open science, European / Swiss trustworthiness, engineering rigor, transparency, and technical clarity.
- The visual tone should be light, airy, structured, geometric, and scientific. 
- Use pale sky-blue fields, white space, thin circuit-line motifs, translucent angular overlays, hexagonal technical resource tiles, and strong but restrained typography. The website should feel modern and computational without becoming dark, cyberpunk, or overly corporate.

**Design Principles:**

- Open by default.
- Technical but readable.
- Institutional without being cold.
- Geometric, not decorative.
- Spacious, not dense.
- Trustworthy, not flashy.
- Motion should clarify interaction, never distract.
- Accessibility is part of the brand quality.

**Technical Principles:**

- Works with all frameworks — it is plain HTML, CSS, and vanilla JavaScript.
- Works with CDNs — no build step, no bundling required.
- Fully customizable with CSS — every token is a custom property.
- Material Design 3 token architecture — reference → system → component tiers.
- Built with accessibility in mind — WCAG 2.2 AA, verified contrast per role.
- Open source — Apache 2.0 end to end, with only Apache-2.0-compatible
  dependencies.
  
## Component library

| Element | M3 component | Class |
| --- | --- | --- |
| Primary CTA | Filled button | `.button .button--filled` |
| Light CTA | Elevated button | `.button .button--elevated` |
| Supporting action | Filled tonal button | `.button .button--tonal` |
| Border action | Outlined button | `.button .button--outlined` |
| Low emphasis | Text button | `.button .button--text` |
| Apertus variants | brand extensions | `.button--filled-dark`, `.button--sky` |
| Cards | Elevated / filled / outlined card | `.card .card--elevated` etc. |
| Resource tiles | Apertus signature | `.resource-tile` |

State layers (hover 8% / focus 12% / pressed 12%) are drawn with M3 state
layers; a restrained ripple is provided by `src/js/main.js` and disabled under
`prefers-reduced-motion`. Heights are ≥44px on every control.

## Setup

```bash
# Option 1 — no install at all
open index.html            # macOS
# or double-click index.html in your file manager

# Option 2 — local dev server
npm install
npm start                  # http://localhost:8080
```

## Validation

```bash
npm run validate:html   # html-validate over index.html and examples
npm run lint:css        # stylelint checks
npm run check:a11y      # Lighthouse accessibility audit (Apache-2.0)
npm run check           # all of the above
```

`npm run check:a11y` targets `http://localhost:8080`, so run `npm start` in a
second terminal first. The report lands in `.lighthouse/report.html`.

## Guidance for designers

- Speak in **M3 roles** (`primary`, `secondary`, `surface`, `outline`), not
  hex values. Every pairing ships with a verified WCAG 2.2 ratio.
- All color tokens are defined in `src/data/tokens.json` and exported as CSS
  custom properties in `src/styles/tokens.css`.
- Typography: Inter (Black/Bold/Light) with Geist Mono for technical content;
  sizes are `clamp()`-based per the M3 typed scale.
- Red is deliberate and editorial: filled CTAs and small red text use the
  derived accessible red `#D40000`; pure `#FF0000` is reserved for focus
  rings, indicators, and large display moments.
- The signature elements (circuit motifs, triangular overlays, hexagonal
  tiles, pale sky-blue bands) are documented in the Patterns section.

## Guidance for developers

- Include the stylesheets in the order shown in `docs/usage.md`
  (`tokens.css` → `reset.css` → `base.css` → `typography.css` →
  `layout.css` → `components.css` → `utilities.css`; `styleguide.css` is
  documentation-only and usually skipped in production pages).
- Consume `--md-sys-color-*`, `--md-sys-typescale-*`,
  `--md-sys-shape-corner-*`, `--md-sys-state-layer-*`, and
  `--md-sys-elevation-*` tokens — never raw hex values in components.
- `src/js/main.js` is progressive enhancement only (copy-token buttons and a
  restrained MD3 ripple). Core content renders fully without JavaScript.
- A dark theme can be added later by re-mapping the `--md-sys-color-*` tier
  without touching components.

`docs/usage.md` covers both audiences in depth, including how to add a page.

## Brand assets

Official logo files should be placed in `src/assets/logos/` — see that
directory's [README](src/assets/logos/README.md). Until then, pages use a
text-based `SWISS-AI.ORG` placeholder with deliberate tracking. Line icons in
`src/assets/icons/` are thin-stroke SVGs matching the M3 outlined style.

## Repository structure

```
design-system/
├── README.md
├── package.json
├── .editorconfig
├── .gitignore
├── index.html                 # Main style guide page
├── examples/
│   └── homepage.html          # Reference homepage implementation
├── docs/
│   ├── accessibility.md
│   ├── design-principles.md
│   ├── governance.md
│   └── usage.md
└── src/
    ├── assets/
    │   ├── icons/             # SVG line icons (technical-report, developer-docs, …)
    │   └── logos/             # Official brand logos (see README inside)
    ├── data/
    │   └── tokens.json        # Machine-readable M3 + Apertus tokens
    ├── js/
    │   └── main.js            # Copy-token buttons and the MD3 ripple
    └── styles/
        ├── tokens.css         # Reference → system → layout tokens
        ├── reset.css
        ├── base.css
        ├── typography.css
        ├── layout.css
        ├── components.css     # The MD3-based component library
        ├── utilities.css
        └── styleguide.css     # Documentation-page-only styles
```

## License

Licensed under the [Apache License, Version 2.0](LICENSE). Component
library baseline: Material Design 3 (Apache-2.0, Google LLC) — see
[NOTICE](NOTICE). Official logo artwork is not redistributed under this
license.
