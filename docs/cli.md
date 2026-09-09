---
title: CLI
nav: CLI
description: Commands and their flags.
order: 7
updated: 2026-09-08
---

```
bakemd build [folder] [--out dist]
bakemd dev [folder] [--port 5174]
```

The folder is the one holding the Markdown pages and `bakemd.json`. Current folder by default.
Both commands write a default `bakemd.json` and create `_public/` if they are missing.

## build

Renders every page and writes the site.

| Flag          | Default |                                                                   |
| ------------- | ------- | ----------------------------------------------------------------- |
| `--out`, `-o` | `dist`  | Output folder, resolved from the current directory. Emptied first |

## dev

Serves the folder, rendering each page on request so edits show on reload.

| Flag           | Default |                                                     |
| -------------- | ------- | --------------------------------------------------- |
| `--port`, `-p` | `5174`  | Port to listen on |
