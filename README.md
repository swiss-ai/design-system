# Apertus Web Style Guide

## Purpose

Delivering HTML structures, CSS assets and design elements to build frontends for the Apertus AI Initiative website.

Content:

- Design assets.
- Accessibility guidelines.
- A Storybook application.

The application is a way of presenting assets, components and layouts in isolated mode.

## Project Overview

**PROJECT NAME:**
Apertus Web Style Guide

**STYLE:**
"Confoederatio Apertus"

**VIBE:**
Precise, open, sovereign, Swiss, technical, calm, credible, public-interest AI.
The interface should feel like a clean institutional research platform rather than a commercial SaaS landing page. It should communicate open science, European / Swiss trustworthiness, engineering rigor, transparency, and technical clarity.

The visual tone should be light, airy, structured, geometric, and scientific. Use pale sky-blue fields, white space, thin circuit-line motifs, translucent angular overlays, hexagonal technical resource tiles, and strong but restrained typography. The website should feel modern and computational without becoming dark, cyberpunk, or overly corporate.

## Design Principles

- Open by default.
- Technical but readable.
- Institutional without being cold.
- Geometric, not decorative.
- Spacious, not dense.
- Trustworthy, not flashy.
- Motion should clarify interaction, never distract.
- Accessibility is part of the brand quality.

## Installation

```bash
# install dependencies
$ npm install
```

## Run Storybook

```bash
# serve Storybook with hot reload
$ npm run dev
```

## Build Storybook

```bash
# build Storybook
$ npm run build
```

## Build CSS only

```bash
# build Storybook
$ npm run build-css
```

## How to release

- Edit the `package.json` file and increment the `version` of the package, for example `1.0.0`
- Create and publish a new tag with the same version number as the one in the `package.json` file, with a `v` prefix, for example `v1.0.0`
- Create a new release on Github, document your changes, and name it for example `Release 1.0.0`

## CSS files

When a new `version` is pushed on the `main` branch, there is no automatic release of the CSS files at the moment. You need to release them manually on the github repository.

# Run visual regression testing

```bash
# run Chromatic
$ git checkout main
$ npm run test
```

This will run the test and provide an URL pointing to the Chromatic app. You can learn more about the Chromatic tool at [Chromatic's website.](https://www.chromatic.com/)

If you want to run the test before merging your branches into the `main` branch, you can first check out `stage`, merge your modifications onto this branch, and then run the regression visual test.
