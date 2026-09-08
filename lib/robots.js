/** Allow everything and point crawlers at the sitemap. */
export function robots(site) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${site}/sitemap.xml`,
    "",
  ].join("\n")
}
