#!/usr/bin/env node
/**
 * build-css.mjs — compile the core Swiss-ai.org stylesheets into one minified,
 * dependency-free bundle: build/swiss-ai.css
 *
 * Pipeline:
 *   1. Read the core stylesheets in MANIFEST (cascade order — the same order
 *      the pages use in their <link> tags).
 *   2. Refuse to compile if any stylesheet references .png/.jpg/.jpeg assets.
 *      Raster files must not ship in the bundle; move such references into
 *      page-specific CSS that is not part of the core manifest.
 *   3. Inline every local .svg url() reference as a data URI so the bundle has
 *      no external file dependencies. Inert Inkscape <color-profile> ICC
 *      payloads are stripped from inlined copies; source assets are untouched.
 *   4. Refuse to compile if @import or any unresolved url() remains.
 *   5. Minify and write build/swiss-ai.css.
 *
 * Zero npm dependencies — run with `npm run build`.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stylesDir = path.join(rootDir, "src", "styles");
const outPath = path.join(rootDir, "build", "swiss-ai.css");
const pkg = JSON.parse(readFileSync(path.join(rootDir, "package.json"), "utf8"));

/** Core bundle in cascade order. Page-specific sheets (styleguide.css,
 *  mediakit.css) and the Gradio theme (gradio.css) are intentionally
 *  excluded; add new core sheets here in cascade order. */
const MANIFEST = [
  "tokens.css",
  "reset.css",
  "base.css",
  "typography.css",
  "layout.css",
  "components.css",
  "utilities.css",
];

const RASTER_RE = /\.(png|jpe?g)\b/i;
const SVG_RE = /\.svg\b/i;
const EXTERNAL_RE = /^(?:data|https?):/i;

/* ------------------------------------------------------------------ utils */

const isWhitespace = (ch) =>
  ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === "\f";

function fail(message) {
  process.stderr.write(`✗ build-css: ${message}\n`);
  process.exit(1);
}

const lineOf = (css, index) => css.slice(0, index).split("\n").length;
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/** Index just past the string literal whose opening quote sits at `i`. */
function skipString(css, i) {
  const quote = css[i];
  i += 1;
  while (i < css.length) {
    if (css[i] === "\\") {
      i += 2;
      continue;
    }
    if (css[i] === quote) return i + 1;
    i += 1;
  }
  return i;
}

const isUrlStart = (css, i) =>
  (css[i] === "u" || css[i] === "U") && css.slice(i, i + 4).toLowerCase() === "url(";

/** Index just past the url(...) token whose "u" sits at `i`. */
function urlTokenEnd(css, i) {
  let j = css.indexOf("(", i) + 1;
  while (j < css.length && isWhitespace(css[j])) j += 1;
  if (css[j] === '"' || css[j] === "'") {
    j = skipString(css, j);
    while (j < css.length && isWhitespace(css[j])) j += 1;
  } else {
    j = css.indexOf(")", j);
  }
  return css[j] === ")" ? j + 1 : css.length;
}

/** Call visit(token, index) for each url(...) token outside comments and
 *  string literals. */
function forEachUrlToken(css, visit) {
  let i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
    } else if (ch === '"' || ch === "'") {
      i = skipString(css, i);
    } else if (isUrlStart(css, i)) {
      const end = urlTokenEnd(css, i);
      visit(css.slice(i, end), i);
      i = end;
    } else {
      i += 1;
    }
  }
}

/** Call visit(content, index) for each string literal outside comments and
 *  url() tokens (url payloads are validated separately). */
function forEachStringToken(css, visit) {
  let i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
    } else if (isUrlStart(css, i)) {
      i = urlTokenEnd(css, i);
    } else if (ch === '"' || ch === "'") {
      const end = skipString(css, i);
      visit(css.slice(i + 1, end - 1), i);
      i = end;
    } else {
      i += 1;
    }
  }
}

/** Inner target of a url() token, unquoted — or null if malformed. */
function urlTarget(token) {
  const inner = token.slice(4, -1).trim();
  if (inner.length < 2) return inner || null;
  const quote = inner[0];
  if ((quote === '"' || quote === "'") && inner.endsWith(quote)) {
    return inner.slice(1, -1);
  }
  return inner;
}

/** First index of `needle` (case-insensitive) outside comments and string
 *  literals, or -1. */
function indexOfOutsideLiterals(css, needle) {
  let i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      i = skipString(css, i);
      continue;
    }
    if (css.slice(i, i + needle.length).toLowerCase() === needle.toLowerCase()) {
      const after = css[i + needle.length] ?? "";
      if (!/[A-Za-z0-9_-]/.test(after)) return i;
    }
    i += 1;
  }
  return -1;
}

/* ------------------------------------------------------------------- svg */

/** Strip non-rendering weight from an SVG before inlining: XML prolog,
 *  DOCTYPE, comments, and the <color-profile> element Inkscape embeds (a
 *  multi-megabyte ICC payload browsers never use when painting the file). */
function cleanSvg(svg) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<color-profile\b[^>]*?(?:\/>|>[\s\S]*?<\/color-profile\s*>)/g, "")
    .trim();
}

/** Percent-encode an SVG payload so it is safe inside quoted or unquoted
 *  url() tokens. */
function encodeSvg(svg) {
  return encodeURIComponent(svg).replace(/[!'()~*]/g, (ch) =>
    `%${ch.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/** Replace local .svg url() references with data URIs. */
function inlineSvgRefs(css, cssFile) {
  const inlined = [];
  let out = "";
  let last = 0;
  forEachUrlToken(css, (token, index) => {
    const target = urlTarget(token);
    if (!target || !SVG_RE.test(target) || EXTERNAL_RE.test(target)) return;
    const decoded = /%[0-9a-f]{2}/i.test(target) ? decodeURIComponent(target) : target;
    const svgPath = path.resolve(path.dirname(cssFile), decoded);
    if (!existsSync(svgPath)) {
      fail(`referenced SVG not found: ${target} (used in ${path.relative(rootDir, cssFile)})`);
    }
    const cleaned = cleanSvg(readFileSync(svgPath, "utf8"));
    out += css.slice(last, index) + `url("data:image/svg+xml,${encodeSvg(cleaned)}")`;
    last = index + token.length;
    inlined.push({ target, bytes: Buffer.byteLength(cleaned) });
  });
  return { css: out + css.slice(last), inlined };
}

/* ---------------------------------------------------------------- minify */

/** Minify CSS: drop comments, collapse whitespace, remove redundant
 *  separators. Strings and url() tokens are preserved verbatim; spaces that
 *  carry meaning (calc operands, `and (…)`, descendant selectors) survive. */
function minify(css) {
  const NO_SPACE_AFTER = new Set(["{", "}", ";", ",", ":", "(", ">", " "]);
  const NO_SPACE_BEFORE = new Set(["{", "}", ";", ",", ")", ">", " "]);
  let out = "";
  let i = 0;
  const n = css.length;
  while (i < n) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? n : end + 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const end = skipString(css, i);
      out += css.slice(i, end);
      i = end;
      continue;
    }
    if (isUrlStart(css, i)) {
      const end = urlTokenEnd(css, i);
      out += css.slice(i, end);
      i = end;
      continue;
    }
    if (isWhitespace(ch)) {
      let j = i;
      while (j < n && isWhitespace(css[j])) j += 1;
      if (j >= n) break;
      const prev = out.slice(-1);
      if (prev !== "" && !NO_SPACE_AFTER.has(prev) && !NO_SPACE_BEFORE.has(css[j])) {
        out += " ";
      }
      i = j;
      continue;
    }
    if (ch === ";") {
      let j = i + 1;
      while (j < n && isWhitespace(css[j])) j += 1;
      if (css[j] === "}") {
        i = j;
        continue;
      }
    }
    out += ch;
    i += 1;
  }
  return out;
}

/* ------------------------------------------------------------------ main */

function main() {
  const files = MANIFEST.map((name) => {
    const filePath = path.join(stylesDir, name);
    if (!existsSync(filePath)) fail(`manifest file missing: src/styles/${name}`);
    return { name, filePath, css: readFileSync(filePath, "utf8") };
  });

  // Guard — raster images must never ship in the compiled bundle.
  const raster = [];
  for (const file of files) {
    const hit = (candidate, index) => {
      if (RASTER_RE.test(candidate)) {
        raster.push(
          `  ${path.relative(rootDir, file.filePath)}:${lineOf(file.css, index)}  →  ${candidate}`,
        );
      }
    };
    forEachUrlToken(file.css, (token, index) => hit(urlTarget(token) ?? token, index));
    forEachStringToken(file.css, (content, index) => hit(content, index));
  }
  if (raster.length > 0) {
    process.stderr.write(
      [
        "✗ build-css: refusing to compile — raster image references found:",
        "",
        ...raster,
        "",
        "  .png/.jpg/.jpeg assets are not allowed in build/swiss-ai.css.",
        "  Use SVG artwork (inlined automatically) or move the reference into",
        "  page-specific CSS that is not part of the core manifest.",
        "",
      ].join("\n"),
    );
    process.exit(1);
  }

  // Guard — @import cannot survive concatenation and would add external deps.
  for (const file of files) {
    if (indexOfOutsideLiterals(file.css, "@import") !== -1) {
      fail(
        `@import is not allowed in the core bundle (src/styles/${file.name}). ` +
          "List the sheet in MANIFEST instead, or load it from the HTML.",
      );
    }
  }

  const bundled = files.map((file) => {
    const { css, inlined } = inlineSvgRefs(file.css, file.filePath);
    return { name: file.name, css, inlined };
  });

  // Guard — the finished bundle must reference no external files.
  const leftovers = [];
  for (const file of bundled) {
    forEachUrlToken(file.css, (token, index) => {
      const target = urlTarget(token);
      if (target && !EXTERNAL_RE.test(target)) {
        leftovers.push(`  src/styles/${file.name}:${lineOf(file.css, index)}  →  ${target}`);
      }
    });
  }
  if (leftovers.length > 0) {
    process.stderr.write(
      [
        "✗ build-css: refusing to compile — unresolved external url() references:",
        "",
        ...leftovers,
        "",
      ].join("\n"),
    );
    process.exit(1);
  }

  const banner = [
    `/*! swiss-ai.css v${pkg.version} | swiss-ai.org design system | Apache-2.0`,
    " * Compiled by scripts/build-css.mjs from src/styles (core sheets only) — do not edit.",
    " * All SVG assets are inlined; the bundle has no external file dependencies.",
    " */",
    "",
  ].join("\n");

  let bundle = "";
  const allInlined = [];
  bundled.forEach((file, index) => {
    if (index > 0) bundle += `/* ${file.name} */`;
    bundle += minify(file.css);
    allInlined.push(...file.inlined);
  });

  const output = banner + bundle + "\n";
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, output);

  const sourceBytes = files.reduce((sum, file) => sum + Buffer.byteLength(file.css), 0);
  process.stdout.write(
    `✓ Compiled ${files.length} core stylesheets → ${path.relative(rootDir, outPath)}\n`,
  );
  process.stdout.write(
    `  ${kb(sourceBytes)} source → ${kb(Buffer.byteLength(output))} minified\n`,
  );
  for (const item of allInlined) {
    process.stdout.write(`  inlined ${item.target} (${kb(item.bytes)} svg)\n`);
  }
}

main();
