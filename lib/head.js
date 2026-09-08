function replace(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: no match for ${pattern}`)
  return html.replace(pattern, replacement)
}

function json(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c")
}

function escape(text) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
}

function author(config) {
  if (!config.author) return {}
  const { type = "Person", ...rest } = config.author
  return { author: { "@type": type, ...rest } }
}

function structuredData(page, config) {
  const site = { "@type": "WebSite", name: config.name, url: config.site + "/" }

  if (page.home)
    return json({
      "@context": "https://schema.org",
      ...site,
      description: config.description,
      ...author(config),
    })

  const crumbs = [{ name: config.name, path: "/" }, ...page.crumbs]

  return json({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: page.heading,
        description: page.description,
        url: page.url,
        dateModified: page.updated,
        inLanguage: "en",
        ...author(config),
        isPartOf: site,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: config.site + crumb.path,
        })),
      },
    ],
  })
}

export function head(html, page, config) {
  const title = escape(page.title)
  const description = escape(page.description)
  const image = config.image && config.site + config.image

  let out = html
  out = replace(out, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  out = replace(
    out,
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${page.url}" />`
  )
  for (const [attribute, key, value] of [
    ["name", "description", description],
    ["property", "og:type", page.home ? "website" : "article"],
    ["property", "og:site_name", escape(config.name)],
    ["property", "og:url", page.url],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["name", "twitter:card", image ? "summary_large_image" : "summary"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ]) {
    out = replace(
      out,
      new RegExp(`<meta\\s+${attribute}="${key}"[\\s\\S]*?/>`),
      `<meta ${attribute}="${key}" content="${value}" />`
    )
  }
  for (const scheme of ["light", "dark"])
    if (config.themeColor?.[scheme])
      out = replace(
        out,
        new RegExp(
          `(<meta\\s+name="theme-color"\\s+media="\\(prefers-color-scheme: ${scheme}\\)"\\s+content=")[^"]*`
        ),
        `$1${config.themeColor[scheme]}`
      )
  if (image)
    out = replace(
      out,
      /<meta name="twitter:card"[^>]*\/>/,
      `<meta property="og:image" content="${image}" />\n    <meta name="twitter:image" content="${image}" />\n    $&`
    )
  out = replace(
    out,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${structuredData(page, config)}\n</script>`
  )
  return out
}
