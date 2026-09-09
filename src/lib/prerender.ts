import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { SiteConfig } from "../config.ts"
import type { Site } from "../entry-server.tsx"
import { preloadFonts } from "./fonts.ts"
import { head } from "./head.ts"
import { llms } from "./llms.ts"
import { robots } from "./robots.ts"
import { sitemap, type SitemapEntry } from "./sitemap.ts"

export interface Page {
  title: string
  heading: string
  description: string
  updated: string
  url: string
  crumbs: { name: string; path: string }[]
  home: boolean
}

function fileFor(path: string): string {
  return path === "/" ? "index.html" : path.slice(1) + ".html"
}

export function pageFor(
  site: Site,
  config: SiteConfig,
  path: string
): Page | null {
  const info = site.meta(path)
  if (!info) return null
  return {
    ...info,
    url: config.site + path,
    crumbs: site.trail(path),
    home: path === "/",
  }
}

export function prerender(dist: string, site: Site, config: SiteConfig) {
  const template = preloadFonts(
    readFileSync(join(dist, "index.html"), "utf-8"),
    dist,
    config
  )

  const entries: SitemapEntry[] = []
  for (const path of site.paths) {
    const page = pageFor(site, config, path)
    if (!page) continue
    entries.push({ path, updated: page.updated })
    const html = head(template, page, config).replace(
      "<!--app-html-->",
      site.render(path)
    )
    const file = join(dist, fileFor(path))
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
  }

  writeFileSync(join(dist, "sitemap.xml"), sitemap(config.site, entries))
  writeFileSync(join(dist, "llms.txt"), llms(config, site.outline))
  if (config.robots)
    writeFileSync(join(dist, "robots.txt"), robots(config.site))

  rmSync(join(dist, "server"), { recursive: true, force: true })

  console.log(
    `prerendered ${site.paths.length} pages: ${site.paths.join(", ")}`
  )
}
