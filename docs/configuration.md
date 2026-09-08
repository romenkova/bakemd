---
title: Configuration
nav: Configuration
description: bakemd.json content.
order: 4
updated: 2026-09-08
---

`bakemd.json` lives in the content folder next to your Markdown.

```json
{
  "name": "Teapot",
  "site": "https://teapot.example",
  "description": "Docs for a server that only answers 418.",
  "author": {
    "name": "Kettle Labs",
    "url": "https://kettle.example",
    "type": "Organization"
  },
  "repo": "https://github.com/kettle-labs/teapot",
  "home": "https://kettle.example",
  "image": "/og.png",
  "logo": "/logo.svg",
  "footer": "Kettle Labs. MIT.",
  "theme": "_theme.css",
  "codeTheme": "github-dark",
  "themeColor": { "light": "#f6f8f7", "dark": "#0f1714" },
  "robots": true
}
```

| Field         | Required | What it does                                                                                                                           |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | yes      | Site name. Header, `<title>` suffix, `og:site_name`, JSON-LD                                                                           |
| `site`        | yes      | URL the site is served from, no trailing slash. Its path, if any, prefixes every link. Canonical URLs, sitemap, `llms.txt`             |
| `description` | yes      | Home page meta description and the first line of `llms.txt`                                                                            |
| `author`      | no       | `name`, optional `url`, optional `type`. Goes into JSON-LD on every page                                                               |
| `repo`        | no       | Adds a GitHub link to the header and a Source entry to `llms.txt`                                                                      |
| `home`        | no       | Where the logo and name in the header link to. The docs root by default                                                                |
| `image`       | no       | Path under `_public/`. Used as `og:image` and switches Twitter cards to the large format                                               |
| `logo`        | no       | Path under `_public/`. Shown next to the name in the header                                                                            |
| `footer`      | no       | One line of text at the bottom of every page. No footer by default                                                                     |
| `theme`       | no       | CSS file relative to the content folder. See [theming](/theming)                                                                       |
| `codeTheme`   | no       | A [highlight.js theme](https://highlightjs.org/examples) for code blocks, by file name. Plain text without it. See [theming](/theming) |
| `themeColor`  | no       | `light` and `dark` hex values for the `theme-color` meta tag, the browser chrome on mobile. Match your backgrounds                     |
| `robots`      | no       | `true` writes a `robots.txt` that allows everything and links the sitemap. Only works when `site` has no path                          |

`author.type` is `Person` by default. Set it to `Organization` for a company;
those are the two types schema.org accepts for an author.
