import { readFileSync } from "node:fs"
import { join } from "node:path"

function family(css, name) {
  const declarations = css.match(new RegExp(`--font-${name}:[^;}]*`, "g")) ?? []
  const last = declarations.at(-1)
  return last?.match(/"([^"]+)"/)?.[1] ?? null
}

/** Latin subset files of the fonts in use, text renders in them on first paint. */
function latinFiles(css) {
  const families = new Set(
    ["sans", "mono", "heading"].map((name) => family(css, name)).filter(Boolean)
  )
  const files = []
  for (const face of css.match(/@font-face{[^}]*}/g) ?? []) {
    const name = face.match(/font-family:"?([^;"]+)"?;/)?.[1]
    // fontsource writes the latin subset as U+?? (0000-00FF).
    if (families.has(name) && /unicode-range:U\+\?\?,/.test(face))
      files.push(face.match(/url\(([^)]+)\)/)[1])
  }
  return files
}

/** Adds font preloads before the stylesheet link of the built template. */
export function preloadFonts(template, dist, config) {
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
