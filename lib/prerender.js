import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { preloadFonts } from "./fonts.js"
import { head } from "./head.js"
import { llms } from "./llms.js"
import { sitemap } from "./sitemap.js"

function fileFor(path) {
  return path === "/" ? "index.html" : path.slice(1) + ".html"
}

export function pageFor(site, config, path) {
  const info = site.meta(path)
  if (!info) return null
  return {
    ...info,
    url: config.site + path,
    crumbs: site.trail(path),
    home: path === "/",
  }
}

export function prerender(dist, site, config) {
  const template = preloadFonts(
    readFileSync(join(dist, "index.html"), "utf-8"),
    dist,
    config
  )

  for (const path of site.paths) {
    const page = pageFor(site, config, path)
    const html = head(template, page, config).replace(
      "<!--app-html-->",
      site.render(path)
    )
    const file = join(dist, fileFor(path))
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
  }

  const entries = site.paths.map((path) => ({
    path,
    updated: site.meta(path).updated,
  }))
  writeFileSync(join(dist, "sitemap.xml"), sitemap(config.site, entries))
  writeFileSync(join(dist, "llms.txt"), llms(config, site.outline))

  rmSync(join(dist, "server"), { recursive: true, force: true })

  console.log(
    `prerendered ${site.paths.length} pages: ${site.paths.join(", ")}`
  )
}
