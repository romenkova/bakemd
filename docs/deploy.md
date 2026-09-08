---
title: Output and deploy
nav: Output and deploy
description: What the build writes and how to serve it with nginx or Docker.
order: 6
updated: 2026-09-08
---

## What the build writes

Let's say you have a folder of md files like this:

```
docs/
  _public
  index.md
  sync.md
  self-hosting.md
  self-hosting/
    https.md
  bakemd.json
```

The build writes this:

```
dist/
  index.html            /
  sync.html             /sync
  self-hosting.html     /self-hosting
  self-hosting/
    https.html          /self-hosting/https
  assets/               hashed CSS, JS and fonts
  sitemap.xml
  llms.txt
  favicon.svg           everything from _public/, as is
```

Pages are `page.html`, not `page/index.html`, so the server needs to map
`/sync` to `sync.html`. Most static hosts do this out of the box.

## Example with nginx

### nginx config

Example nginx config:

```nginx
location / {
    try_files $uri.html $uri $uri/ =404;
    add_header Cache-Control "no-cache";
}
```

## Docker

The first stage builds. The second is nginx with the files.

```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY docs docs
RUN npx bakemd build docs --out dist

FROM nginx:1.27-alpine
COPY --from=build /app/node_modules/bakemd/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
```

## Head tags and structured data

Every page gets a `<title>`, meta description, canonical link, Open Graph and
Twitter card tags, and a JSON-LD block.

The home page is a `WebSite`; every
other page is a `TechArticle` with a `BreadcrumbList` back to the root. All of
it is filled from `bakemd.json` and the page's frontmatter, so there is
nothing to configure.

`llms.txt` follows [llmstxt.org](https://llmstxt.org): the site name and
description, then one line per page with its URL and description.
