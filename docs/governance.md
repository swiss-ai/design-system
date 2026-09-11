# Governance — Swiss-ai.org Style Guide

This document defines how the Swiss-ai.org design system is maintained, changed,
licensed, and audited for dependency compliance. Apertus — a flagship project of
Swiss-ai.org — supplies the brand palette and the reference homepage content.

## Licensing

- **The project is licensed under the Apache License, Version 2.0.** The full
  text lives in [`LICENSE`](../LICENSE) at the repository root, and
  [`NOTICE`](../NOTICE) carries the attribution requirements.
- Source files carry `SPDX-License-Identifier: Apache-2.0` headers.
- Third-party material must be Apache-2.0 compatible. Design specifications
  and naming conventions from [Material Design 3](https://m3.material.io)
  (Apache-2.0, Google LLC) are used under that license and acknowledged in
  `NOTICE`.
- Typeface *names* (`Inter`, `Geist Mono`) are referenced only — both fonts
  load from Google Fonts at runtime under the SIL Open Font License 1.1 and are
  **not bundled** in this repository. Bundling a font is fine under its OFL
  terms, but the bundling decision belongs to the distribution team, not the
  style guide.

## Dependency policy (Apache-2.0 compliance)

Every dependency included in `package.json` must carry an Apache-2.0-compatible
license. Allowed: Apache-2.0, MIT, BSD-2/BSD-3, ISC. Not vendored: GPL,
LGPL, MPL (copyleft), AGPL, SSPL, or any proprietary license.

Current devDependencies:

| Package | License | Role |
| --- | --- | --- |
| `lighthouse` | Apache-2.0 | Accessibility audit (`npm run check:a11y`) |
| `live-server` | MIT | Local dev server (`npm start`) |
| `html-validate` | MIT | HTML validation (`npm run validate:html`) |
| `stylelint` | MIT | CSS linting (`npm run lint:css`) |

History note: the accessibility audit previously used `axe-core`
(MPL-2.0), which does not meet this project's Apache-2.0 dependency policy;
it was removed and replaced by Lighthouse's accessibility category.

Runtime code has **zero dependencies**: the component library is vanilla CSS
and minimal vanilla JavaScript. No CSS or JS framework (Bootstrap, Tailwind,
jQuery, React, Vue, …) is used or referenced anywhere in the source tree.

When adding a dependency:

1. Verify its license is in the allowed list.
2. Add it to the table above with the role it serves.
3. Justify it in the merge request — prefer no dependency at all.

## Change process

1. **Propose.** Open an issue describing the change, the affected tokens or
   components, and the a11y impact.
2. **Design review.** Tokens change first (`src/data/tokens.json` +
   `src/styles/tokens.css`), then components. Brand values change through the
   reference layer only.
3. **Accessibility review.** Any new pairing needs a measured ratio in
   `docs/accessibility.md`; any new interactive pattern needs keyboard and
   screen-reader verification per the ARIA Authoring Practices.
4. **Validation.** `npm run check` (HTML validation, CSS lint, Lighthouse
   accessibility) plus a manual keyboard pass.
5. **Document.** Update `docs/`, the style guide page (`index.html`), and the
   version in `package.json` / `tokens.json` (`$meta.version`).

Versioning: `MAJOR.MINOR` — breaking component or role changes bump MAJOR;
additive tokens and components bump MINOR.

## Roles

- **Design lead** — owns brand values and the reference layer.
- **Systems engineers** — own the M3 token mapping, components, and layout.
- **Accessibility lead** — owns contrast verification, focus behavior, and the
  audit gates.
- **Governance** — own the license compliance table and the dependency review.

## Deprecation

Components and tokens are never deleted outright; they are deprecated in
`docs/usage.md` for one minor version, then removed at the next major
release with a documented migration note.
