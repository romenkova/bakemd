export interface SitemapEntry {
  path: string
  updated: string
}

/** The sitemap is generated from the route list. */
export function sitemap(site: string, entries: SitemapEntry[]): string {
  const urls = entries.map(({ path, updated }) =>
    [
      "  <url>",
      `    <loc>${site}${path}</loc>`,
      `    <lastmod>${updated}</lastmod>`,
      "  </url>",
    ].join("\n")
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n")
}
