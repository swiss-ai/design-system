# Using the Apertus styles in an app

The reusable design-system styles live in two files:

- [`css/apertus.css`](css/apertus.css) — the Apertus design tokens (CSS
  custom properties) plus the bespoke Apertus components (hero, hexagon
  tiles, feature strip, …) that layer on top of **Bootstrap 5**.
- [`css/apertus-bootstrap.css`](css/apertus-bootstrap.css) — a theme for the
  **standard Bootstrap 5.3 component set** (buttons, forms, navs, tables,
  alerts, modals, …), so plain Bootstrap markup renders in the Apertus style
  with no extra classes. Optional but recommended for apps that use
  Bootstrap components.

This page shows how to wire them into your own app. (`css/style-guide.css`
is chrome for the style-guide page itself — don't include it in apps.)

## 1. Include the dependencies

Load, in this order:

1. **Bootstrap 5.3** CSS (the components extend/override Bootstrap classes)
2. **Google Fonts** — Inter (300–800) and Geist Mono (400, 700)
3. **`apertus.css`** — must come *after* Bootstrap so its overrides win
4. **`apertus-bootstrap.css`** — after `apertus.css` (it reads its tokens)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Apertus App</title>

    <!-- 1. Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- 2. Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Geist+Mono:wght@400;700&display=swap" rel="stylesheet">

    <!-- 3. Apertus design system -->
    <link rel="stylesheet" href="css/apertus.css">
    <!-- 4. Apertus theme for standard Bootstrap components (optional) -->
    <link rel="stylesheet" href="css/apertus-bootstrap.css">
</head>
<body>
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <main id="main-content">
        <!-- your content -->
    </main>

    <!-- Bootstrap JS (only if you use dropdowns, modals, etc.) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Getting `apertus.css` into your project

- **Copy the file** (recommended): vendor `css/apertus.css` into your app and
  update it deliberately when the design system changes.
- **Git submodule**: add this repo as a submodule and link the file from there.
- **Hotlink the deployed style guide** (prototypes only — no versioning):
  `https://swiss-ai.github.io/design-system/css/apertus.css`

The hero section (`.hero-section`) references a background image at
`../design/Apertus 2606 - Background 05.jpg` relative to the CSS file. Either
copy the `design/` folder alongside your `css/` folder, or override it:

```css
.hero-section { background-image: url("/assets/my-hero.jpg"); }
```

## 2. Design tokens

All colors, type sizes, spacing, and transitions are CSS custom properties on
`:root` — use them instead of hard-coded values so your app stays on-brand:

```css
.my-panel {
    background: var(--pale-technical-panel);
    border: 1px solid var(--border-blue);
    border-radius: var(--radius-md);
    color: var(--apertus-anthracite);
}
```

Key tokens (full list at the top of `apertus.css`, live swatches in the
[style guide](https://swiss-ai.github.io/design-system/)):

| Token | Value | Use |
| --- | --- | --- |
| `--apertus-sky-blue-15` | `#7BBBD5` | Primary brand blue |
| `--apertus-anthracite` | `#2E2F31` | Body text, dark surfaces |
| `--epfl-red` | `#FF0000` | Primary actions, links, focus ring |
| `--pale-technical-panel` | `#EAF5F8` | Panel / strip backgrounds |
| `--pale-blue-wash` | `#F3FAFC` | Page-section washes |
| `--h1-size` … `--body-size` | `clamp(…)` | Fluid type scale |
| `--radius-sm` / `--radius-md` | `0.25rem` / `0.5rem` | Corner radii |
| `--transition-fast` / `--transition-normal` | `150ms` / `220ms` | Motion |

## 3. Components

Components use standard Bootstrap markup plus Apertus classes. The style guide
at <https://swiss-ai.github.io/design-system/> shows each one rendered.

**Buttons** — Bootstrap's `.btn` plus `.btn-button` (size/motion) and a
variant. Note that `apertus.css` recolors Bootstrap's own `.btn-primary` /
`.btn-secondary` to Apertus red/anthracite:

```html
<button class="btn btn-button btn-primary">Primary</button>
<button class="btn btn-button btn-secondary">Secondary</button>
<button class="btn btn-button btn-tertiary">Tertiary</button>
<button class="btn btn-button btn-sky-blue">Sky blue</button>
```

**Cards**:

```html
<div class="card-display">
    <h4>Card title</h4>
    <p>Card body text.</p>
</div>
```

**Hexagon tiles** (resource links):

```html
<div class="hexagon-row">
    <a class="hexagon-tile" href="…">Models</a>
    <a class="hexagon-tile hexagon-tile-secondary" href="…">Data</a>
    <a class="hexagon-tile hexagon-tile-tertiary" href="…">Papers</a>
</div>
```

**Hero section** (animated circuit-line background + triangle overlays):

```html
<section class="hero-section">
    <div class="triangle-overlay triangle-tl"></div>
    <div class="triangle-overlay triangle-br"></div>
    <div class="container hero-content">
        <p class="section-subtitle">Apertus</p>
        <h1>Open, sovereign Swiss AI</h1>
        <p class="section-description">…</p>
    </div>
</section>
```

**Feature strip**:

```html
<section class="features-strip">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-4">
                <div class="feature-card">
                    <h4>Open</h4>
                    <p>…</p>
                </div>
            </div>
            <!-- … -->
        </div>
    </div>
</section>
```

Layout/grid: use Bootstrap's own `container` / `row` / `col-*` classes —
the design system doesn't replace them.

## 3b. Standard Bootstrap components

With `apertus-bootstrap.css` included, the whole Bootstrap 5.3 component set
(buttons, forms, navbar, tabs/pills, breadcrumb, pagination, cards,
accordion, list group, tables, alerts, badges, progress, spinners,
dropdowns, modal, offcanvas, toasts, tooltips, popovers, carousel, code and
blockquote typography) renders on-brand from **plain Bootstrap markup** —
see the "Bootstrap Components" section of the style guide for live examples.
It only overrides Bootstrap's CSS custom properties (`--bs-*`) plus a few
compiled rules, and never uses `!important`, so per-component customization
stays easy.

The semantic color mapping:

| Bootstrap name | Apertus color | Notes |
| --- | --- | --- |
| `primary` | EPFL red `#FF0000` | Primary actions, matches links/focus |
| `secondary` / `dark` | Anthracite `#2E2F31` | Technical actions, dark surfaces |
| `info` | Sky blue `#7BBBD5` | Dark text on top for contrast |
| `light` | Pale blue wash `#F3FAFC` | |
| `success` | `#2E7D5B` | Calm functional green (new token) |
| `warning` | `#E0A82E` surface / `#8C630D` text | Restrained amber (new tokens) |
| `danger` | `#B3261E` | Deeper than the action red on purpose, so destructive ≠ primary |

Utility classes (`.bg-*`, `.text-*`, `.border-*`, `.text-bg-*`) follow the
same mapping automatically. Bootstrap's dark mode (`data-bs-theme="dark"`)
is **not** themed — the Apertus design system is light-only.

## 4. Accessibility

`apertus.css` already ships the skip link (`.skip-to-content` — keep it as
the first element in `<body>`, pointing at your main landmark), a visible
red `:focus-visible` ring, and a `prefers-reduced-motion` override that
disables the animations. Follow [ACCESSIBILITY.md](ACCESSIBILITY.md) for the
full guidelines (contrast, landmarks, keyboard support).
