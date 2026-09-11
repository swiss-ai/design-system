# Design Principles — Swiss-ai.org Style Guide

This style guide is built on [Material Design 3 (M3)](https://m3.material.io) — an
Apache 2.0 licensed design system published by Google — applied to an Apertus brand
base. Own Apertus brand values (colors, type, spacing, motion character) supply the
*M3 reference layer*; the component vocabulary, tokens, and interaction models come
from the M3 *system layer*. We use no Bootstrap, Tailwind, or any CSS framework:
every component here is vanilla HTML + CSS + minimal vanilla JavaScript.

## Why Material Design 3

Material Design 3 gives us:

- **A role-based color system** — colors are consumed as roles
  (`primary`, `secondary`, `surface`, `outline`, …), never raw hex values, so a
  brand change propagates everywhere without touching component CSS.
- **State layers** — hover (8%), focus (12%), pressed (12%), dragged (16%)
  drawn in the on-color over the surface, a single recipe understood across
  every component.
- **A typed scale** — `display`, `headline`, `title`, `body`, and `label` roles
  provided with accessible sizes and line heights.
- **Shape and elevation scales** — corner tokens and a six-step elevation
  ladder, lightened for the Apertus brand (heavy drop shadows are outside our
  visual character).

## Accessibility is part of brand quality

Every text/background pairing is verified. The token layer refuses ambiguous
pairings: contrast notes are attached to the roles themselves.

## Adopted principles

1. **Open by default.** Apache 2.0 end to end; no proprietary tooling.
2. **Open science reads like a system.** Components are inspectable, tokens
   documented, and layouts build with plain HTML and CSS.
3. **Technical but readable.** Structured typography around Inter
   (Black/Bold/Light) and Geist Mono for technical content.
4. **Institutional without being cold.** Pale sky-blue technical fields,
   restrained accents, generous spacing.
5. **Geometric, not decorative.** The signature is circuit motifs,
   translucent angular overlays, and hexagonal documentation tiles; every
   pattern serves orientation, not ornamentation.
6. **Motion clarifies interaction.** Plato's state layers and a 400ms ripple
   — nothing else animates; patterns never move; users reduce motion, and
   then there is none.
7. **Anchored in the roles.** Designers and developers speak the same
   role names (`on-primary`, `surface-container`, `label-large`), which
   makes handoff unambiguous.

### Apertus component adaptations (documented brand overrides)

| M3 default | Apertus adaptation | Why |
| --- | --- | --- |
| Buttons 40px, rounded | 48px, corner-none (rectangular) | Brand geometry targets ≥44px tap height |
| Cards 12px corners | 0–6px (brand-capped) | Geometric Swiss look |
| Heavy elevation shadows | Lightened levels, "tinted" shadow | Calm, engineered surfaces |
| Display type dominates | Inter Black at restrained sizes | Institutional confidence |
| Bouncy easing curves | Decelerating standard curves | Never playful |

## Component vocabulary mapping

| Component | M3 component | Implementation |
| --- | --- | --- |
| Filled button | Filled button | `.button .button--filled` |
| Elevated button | Elevated button | `.button .button--elevated` |
| Tonal button | Filled tonal button | `.button .button--tonal` |
| Outlined button | Outlined button | `.button .button--outlined` |
| Text button | Text button | `.button .button--text` |
| Apertus dark button | Apertus extension | `.button .button--filled-dark` |
| Apertus sky button | Apertus extension | `.button .button--sky` |
| Card | Card (elevated / filled / outlined) | `.card .card--elevated` etc. |
| Resource tile | (Apertus signature: hexagon tiles) | `.resource-tile` |
| Swatch | (Apertus extension) | `.color-swatch` |

## Motion / motion preferences

- Hover transitions: 150–200ms (M3 `motion-short3/4`).
- Background patterns are static.
- No autoplaying carousels: the news "carousel dots" are static decorative
  pagination by default; include the accessible interactive variant only
  when a real carousel exists.
- `prefers-reduced-motion: reduce` resolves to zero motion.

## Design tokens

All tokens ship in three tiers (see `src/data/tokens.json`):

1. **Reference layer** — Apertus brand values (`--color-sky-blue-1-5`,
   `--color-epfl-red`, `--color-anthracite`, …).
2. **System layer** — M3 roles (`--md-sys-color-*`, `--md-sys-shape-corner-*`,
   `--md-sys-typescale-*`, `--md-sys-state-layer-*`, `--md-sys-elevation-*`,
   `--md-sys-motion-*`).
3. **Component layer** — component-scoped tokens
   (`--button-bg`, `--button-color`, …) declared in `components.css`.
