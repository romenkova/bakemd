# bakemd

Bake a folder of Markdown into a static docs site. No client-side framework:
pages are rendered to HTML at build time and served as files.

## Usage

```
npx bakemd build ./docs
npx bakemd dev ./docs
```

`build` writes to `dist/` (change with `--out`). `dev` serves the folder on
port 5174 (change with `--port`) and re-reads the Markdown on every request.

## The folder

```
docs/
  bakemd.json
  index.md            /
  sync.md             /sync
  self-hosting/
    index.md          /self-hosting
    https.md          /self-hosting/https
  _public/            copied to the site root as-is; any _ folder is skipped for pages
    favicon.svg
    og.png
```

Pages nest one level deep. Every page needs this frontmatter:

```yaml
---
title: Self-hosting
nav: Self-hosting
description: One sentence, used for the meta description and llms.txt.
order: 3
updated: 2026-09-08
badge: beta # optional
---
```

`bakemd.json`:

```json
{
  "name": "Doska",
  "site": "https://doska.sh",
  "description": "One line about the site, for llms.txt and the home page.",
  "author": { "name": "Rita Romenkova", "url": "https://github.com/romenkova" },
  "repo": "https://github.com/romenkova/doska",
  "image": "/og.png",
  "logo": "/favicon.svg",
  "footer": "Doska. MIT licensed. 2026",
  "theme": "_theme.css"
}
```

`name`, `site` and `description` are required. The rest is optional.
`author.type` is `Person` by default; set it to `Organization` for a company.

`theme` points at a CSS file in the content folder. It loads after the default
theme, so redeclare only what you want to change. Light values go on `:root`,
dark ones on `.dark:root` (the defaults use that selector, so a bare `.dark`
would lose on specificity):

```css
:root {
  --primary: #0f766e;
  --background: #fafaf9;
}

.dark:root {
  --primary: #5eead4;
  --background: #1c1917;
}
```

The full list of variables is in `src/styles/tokens.css` (colors, radius,
elevation) and `src/styles/index.css` (code blocks and the docs nav).

Fonts are variables too. Bring a file through `_public/` or a package
installed next to the content folder:

```css
@import "@fontsource-variable/lora";

@font-face {
  font-family: "My Mono";
  src: url("/fonts/mymono.woff2") format("woff2");
}

:root {
  --font-sans: "Lora Variable", Georgia, serif;
  --font-mono: "My Mono", monospace;
}
```

`node_modules` and any folder starting with `_` are never scanned for pages.

## Example

`example/` is a small fake project (different fonts, colors, logo and content)
for trying the CLI out:

```sh
node bin/bakemd.js build example --out /tmp/teapot
```

## Output

One `.html` per page (`/sync` is `sync.html`, not `sync/index.html`), plus
`sitemap.xml` and `llms.txt`. The bundled `nginx.conf` serves that layout:

```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY docs docs
RUN npx bakemd build docs --out dist

FROM nginx:1.27-alpine
COPY --from=build /app/node_modules/bakemd/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
```
# bakemd
