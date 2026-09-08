---
title: Fonts
nav: Fonts
description: System stacks, font files, or a package.
order: 2
updated: 2026-09-08
---

Three variables: `--font-sans` for text, `--font-heading` for headings, and
`--font-mono` for code. The defaults are Mulish and Geist Mono, bundled with bakemd.

## A system stack

The cheapest option, nothing downloads:

```css
:root {
  --font-sans: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --font-mono: "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}
```

## A font file

Put the file in `_public/` and declare it in the theme. The URL is relative to
the site root and the file is copied to the output as is.

```css
@font-face {
  font-family: "My Mono";
  src: url("/fonts/my-mono.woff2") format("woff2");
  font-weight: 100 900;
}

:root {
  --font-mono: "My Mono", monospace;
}
```

## A package

Install a [Fontsource](https://fontsource.org) package next to the content
folder and import it at the top of the theme. The font files are bundled
into `assets/` with hashed names. This site does that for Outfit and Fira
Code, the pair react.gg uses:

```sh
npm install @fontsource-variable/outfit @fontsource-variable/fira-code
```

```css
@import "@fontsource-variable/outfit";
@import "@fontsource-variable/fira-code";

:root {
  --font-sans: "Outfit Variable", sans-serif;
  --font-mono: "Fira Code Variable", monospace;
}
```

A theme file is ordinary CSS, so it can carry rules as well as variables,
for example to restyle headings:

```css
.docs-prose :is(h1, h2, h3) {
  letter-spacing: -0.02em;
}
```
