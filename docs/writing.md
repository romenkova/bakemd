---
title: Writing pages
nav: Writing pages
description: Frontmatter, routes, nesting, and what Markdown is supported.
order: 3
updated: 2026-09-09
---

## Frontmatter

Five fields are required on every page.

```yaml
---
title: Behind a proxy
nav: Behind a proxy
description: Put nginx or Caddy in front of Teapot.
order: 2
updated: 2026-08-22
badge: new
---
```

| Field         | Used for                                                            |
| ------------- | ------------------------------------------------------------------- |
| `title`       | The `<title>` tag, as `title \| site name`                          |
| `nav`         | The label in the sidebar and in previous / next links               |
| `description` | Meta description, Open Graph, `llms.txt`                            |
| `order`       | Position among siblings, lowest first                               |
| `updated`     | `dateModified` in JSON-LD and the sitemap, `YYYY-MM-DD`             |
| `badge`       | Optional. A small label next to the nav entry, like `new` or `beta` |

## Routes

The file path is the URL.

| File                    | URL                     |
| ----------------------- | ----------------------- |
| `index.md`              | `/`                     |
| `sync.md`               | `/sync`                 |
| `self-hosting.md`       | `/self-hosting`         |
| `self-hosting/https.md` | `/self-hosting/https`   |
| `self-hosting/index.md` | `/self-hosting` as well |

Pages nest one level deep. A top-level page is a section; pages inside its
folder are indented under it in the sidebar.

Folders starting with `_` and `node_modules` are never scanned for pages, so
`_public/` and `_drafts/` are safe places for things that are not pages.

## Markdown

GitHub-flavored Markdown. Fenced code blocks get a copy button and, with
`codeTheme` set in `bakemd.json`, syntax highlighting at build time with no
client JS. It covers the
[common highlight.js languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)
plus `nginx` and `dockerfile`. An unknown language renders as plain text.

Images go in `_public/` and are referenced from the root:

```md
![Sync modal](/sync-modal.png)
```

An image inside a heading renders inline at the text height.

Links between pages use the URL, not the file:
