# Usage — Swiss-ai.org Style Guide

This guide is the source of truth for designers and developers building pages,
apps, and other digital products with the Swiss-ai.org design system. The
component library is based on [Material Design 3](https://m3.material.io) and is
implemented in vanilla HTML, CSS, and minimal JavaScript. It works with all
frameworks and CDNs because it ships plain files — no build step required.
Apertus — a flagship project of Swiss-ai.org — supplies the brand palette.

## Quick start (no build step)

1. Clone or download the repository.
2. Open `index.html` directly in a browser — the full style guide renders from
   the file system. Optionally run the dev server:

   ```bash
   npm install
   npm start            # serves on http://localhost:8080
   ```

3. Copy markup from `index.html` or `examples/homepage.html` into your project,
   then include the stylesheets in this order:

   ```html
   <link rel="stylesheet" href="src/styles/tokens.css">
   <link rel="stylesheet" href="src/styles/reset.css">
   <link rel="stylesheet" href="src/styles/base.css">
   <link rel="stylesheet" href="src/styles/typography.css">
   <link rel="stylesheet" href="src/styles/layout.css">
   <link rel="stylesheet" href="src/styles/components.css">
   <link rel="stylesheet" href="src/styles/utilities.css">
   <link rel="stylesheet" href="src/styles/styleguide.css">
   ```

   `styleguide.css` is documentation-only; production pages usually skip it.

## For designers

- **Speak in roles.** Colors map to M3 roles: `primary`, `secondary`,
  `surface`, `outline`. Never specify raw hex values in handoff; specify
  roles and components.
- **Colors.** The reference palette (`src/data/tokens.json`) holds the Apertus
  brand values, including EPFL Red and the derived accessible red
  `#D40000` used wherever small white text sits on a red fill.
- **Typography.** Inter (Black for headlines, Bold for supporting headings
  and labels, Light for body) and Geist Mono for technical captions, metadata,
  and code-like callouts. Sizes are `clamp()`-based; the desktop targets are
  the source spec.
- **Signature elements.** Pale sky-blue technical fields, circuit-line motifs,
  translucent triangular overlays, and the hexagonal documentation tiles.
  Keep the white bands between technical sections — they carry the calm rhythm.
- **Buttons.** Five M3 families plus two Apertus variants; a filled red CTA is
  the single high-emphasis action per view. Never stack two filled CTAs
  side by side.
- **Component states.** Hover/focus/pressed state layers come free with the
  components; do not invent new state colors.

## For developers

- **Tokens exact.** Always consume `var(--md-sys-color-*)`,
  `var(--md-sys-typescale-*)`, and `var(--md-sys-shape-corner-*)`. Raw brand
  hex values exist only in the reference layer.
- **Components.** Reuse the classes in `src/styles/components.css`
  (`.button`, `.card`, `.resource-tile`, `.hero`, …). Component-scoped
  tokens (`--button-bg` etc.) can be overridden per instance.
- **Grid.** `.grid` is a plain 12-column CSS grid; cells use `.span-*`
  utilities (`span-1` … `span-12`). It collapses to 8 columns below 1024px
  and 4 below 768px — see `src/styles/layout.css`.
- **Links that look like buttons stay semantic `<a>` with real `href`s;
  real actions use `<button>`.** No `div` on click.
- **JavaScript is enhancement only.** `src/js/main.js` supplies copy-token
  buttons and a restrained MD3 ripple. Core content and layout render
  without JS, and everything respects `prefers-reduced-motion`.
- **Icons.** Line icons in `src/assets/icons/` are thin-stroke SVGs
  (Apache 2.0, drawn in-house) matching the M3 outlined style. Official logo
  files live in `src/assets/logos/` (see that folder's README).
- **Dark theme.** The default design is light. Dark values live under the same
  role names, so a dark scheme can be added by re-mapping the
  `--md-sys-color-*` tier without touching components.

## Validation

```bash
npm run validate:html   # html-validate over index.html and examples
npm run lint:css        # stylelint checks
npm run check:a11y      # Lighthouse accessibility audit (Apache-2.0)
npm run check           # all of the above
```

`npm run check:a11y` targets `http://localhost:8080`, so run `npm start` in a
second terminal first (or serve the folder yourself).

## Adding a page

1. Copy `examples/homepage.html` as a template.
2. Keep the skip link as the first focusable element and one `<h1>` per page.
3. Build sections with `section`, semantic headings, and the shared components.
4. Reuse the hero, feature strip, news cards, and resource split patterns
   instead of inventing new modules — each new module is a governance decision.
