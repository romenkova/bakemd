import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { SiteConfig } from "../config.ts"

function family(css: string, name: string): string | null {
  const declarations = css.match(new RegExp(`--font-${name}:[^;}]*`, "g")) ?? []
  const last = declarations.at(-1)
  return last?.match(/"([^"]+)"/)?.[1] ?? null
}

/** Latin subset files of the fonts in use */
function latinFiles(css: string): string[] {
  const families = new Set(
    ["sans", "mono", "heading"].map((name) => family(css, name))
  )
  const files: string[] = []
  for (const face of css.match(/@font-face{[^}]*}/g) ?? []) {
    const name = face.match(/font-family:"?([^;"]+)"?;/)?.[1]
    if (!name || !families.has(name)) continue
    if (!/unicode-range:U\+\?\?,/.test(face)) continue
    const url = face.match(/url\(([^)]+)\)/)?.[1]
    if (url) files.push(url)
  }
  return files
}

/** Adds font preloads before the stylesheet link of the built template. */
export function preloadFonts(
  template: string,
  dist: string,
  config: SiteConfig
): string {
  const link = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
  if (!link) return template
  const css = readFileSync(
    join(dist, link[1].slice(config.base.length)),
    "utf-8"
  )
  const preloads = latinFiles(css).map(
    (file) =>
      `<link rel="preload" as="font" type="font/woff2" crossorigin href="${file}" />\n    `
  )
  return template.replace(link[0], preloads.join("") + link[0])
}
