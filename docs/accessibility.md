# Accessibility Guidelines

The Swiss-ai.org style guide targets [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/).
Accessibility is part of brand quality: every component ships with the state,
focus, and contrast behavior already built in.

## Key accessibility features

### Semantic HTML
- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- One `<h1>` per page, headings in order (the showcase panels of
  `index.html` are sample text, not heading elements, to preserve that order).
- A skip link is the first focusable element on every page and targets
  `#main-content`.

### Color contrast — verified per role

Every pairing is documented in `docs/design-principles.md` and
`src/data/tokens.json`. Measured ratios:

| Pairing | Ratio | Status |
| --- | --- | --- |
| Anthracite `#2E2F31` on white | 13.4:1 | AA + AAA |
| Anthracite on Pale Technical Panel `#EAF5F8` | 12.9:1 | AA + AAA |
| Anthracite on Pale Blue Wash `#F3FAFC` | 13.2:1 | AA + AAA |
| Anthracite on Sky Blue 1.5.2 `#BFD8E1` | 9.0:1 | AA + AAA |
| Anthracite on Sky Blue 1.5.1 `#AACFDC` | 8.0:1 | AA + AAA |
| Anthracite on Sky Blue 1.5 `#7BBBD5` | 6.3:1 | AA |
| White on Accessible Red `#D40000` | 5.5:1 | AA |
| Muted text `rgba(46,47,49,0.72)` on white | 5.5:1 | AA |
| White on EPFL Red `#FF0000` | 4.0:1 | Large text / UI components only |
| Faint text `rgba(46,47,49,0.56)` on white | 3.4:1 | Large text only |
| White on Sky Blue 1.5 `#7BBBD5` | 2.1:1 | Fails — decorative surfaces only |
| Disabled text (`.48` anthracite) | — | Exempt per WCAG (disabled state) |

Rules enforced by the token layer:

- **White on `#FF0000` is reserved** for large text and non-text UI (focus
  rings, indicators). Buttons and small red text use the derived accessible
  red `#D40000` (5.5:1 with white). Hover lightens to a lighter state layer
  but never drops below AA for body-size labels.
- **White text on Sky Blue 1.5 is not used** for text; sky surfaces carry
  anthracite labels (6.3:1) only.
- **Icons on hexagon tiles** are anthracite-on-sky or white line icons on
  `#7BBBD5` sized well above the 3:1 UI-component threshold as graphical
  objects paired with text labels outside the tile.

### Focus management (Material Design 3 state layers)

- Focus indicators: a 3px red ring with 2px offset on every focusable element,
  via `:focus-visible` plus a visible fallback for keyboard browsers.
- M3 state layers paint focus (12%) in the on-color, so focus is perceivable
  even when the outline is not the user's preferred cue.
- Hover is never the only signal: hover changes come with an underline,
  weight, or border change as well.

### Keyboard navigation
- All interactive elements are reachable in DOM order.
- Enter and Space activate buttons; links follow link semantics
  (buttons are `<button>`, link-like actions are `<a href>`).
- No keyboard traps; no hover-only content anywhere in the system.

### Screen reader support
- ARIA only where native HTML is insufficient.
- Decorative SVGs, the hero wordmark, circuit patterns, and static
  pagination dots carry `aria-hidden="true"`; meaningful icons are paired
  with visible text labels.
- The copy-token buttons announce success/failure through a polite
  `aria-live` region injected by `src/js/main.js`.

## Reduced motion

`src/styles/reset.css` neutralizes animation for
`prefers-reduced-motion: reduce`, and `src/js/main.js` skips the MD3 ripple
entirely. Background patterns never animate in the first place.

## Testing

### Automated
`npm run check:a11y` runs [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
(Google, Apache-2.0) against `http://localhost:8080` — start `npm start` first.
The report lands in `.lighthouse/report.html`.

### Manual
1. Tab through every page: skip link → nav → sections, with a visible ring.
2. Zoom to 200% and 400%: no loss of content or horizontal page scroll.
3. Keyboard-only + screen reader pass on the interactive demos.
4. Contrast checks with a picker against the tokens table above.

## Component accessibility

- **Buttons** — ≥44px height, 44×44 tap target, visible focus, disabled
  state exempt but still perceivable.
- **Navigation** — semantic `<nav>`, `aria-label` on each nav region,
  44px-tall link targets.
- **Cards and tiles** — the entire card is one link; headings inside cards
  follow page order; emblems are decorative with text labels present.
- **Forms (if added)** — explicit labels, error roles live in the reserved
  `md-sys-color-error` tokens.

## Compliance checklist

- [x] Semantic HTML structure and landmarks
- [x] One `<h1>` per page
- [x] Skip link functionality
- [x] Keyboard accessibility
- [x] Visible focus indicators
- [x] Verified color contrast per role
- [x] Reduced motion support
- [x] No hover-only content
- [x] ARIA only where necessary
- [x] Text alternatives for meaningful SVGs

## Resources

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [Material Design 3 — Accessibility](https://m3.material.io/foundations/accessible-design/overview)
