---
title: Getting started
nav: Getting started
description: Make a folder, add two files, run one command.
order: 2
updated: 2026-09-08
---

You need Node 22 or newer.

## 1. Make the folder

Any folder works. It holds your Markdown, a `bakemd.json`, and optionally a
`_public/` directory for static files.

```
docs/
  bakemd.json
  index.md
  _public/
    favicon.svg
```

## 2. Describe the site

`bakemd.json` needs three fields. Everything else is optional and covered in
[configuration](/configuration).

```json
{
  "name": "Teapot",
  "site": "https://teapot.example",
  "description": "Docs for a server that only answers 418."
}
```

## 3. Write the first page

Every page starts with frontmatter. `index.md` becomes the home page.

```md
---
title: Teapot
nav: Overview
description: What Teapot is and why every answer is 418.
order: 1
updated: 2026-09-08
---

# Teapot

Every request gets a 418. That is the feature.
```

## 4. Build

```sh
npx bakemd build docs
```

The site lands in `dist/`. Serve it with anything that serves files, or read
[output and deploy](/deploy) for the nginx and Docker setup.

While writing, the dev server re-reads the Markdown on every request:

```sh
npx bakemd dev docs
```

It prints the URL, port 5174 by default.
