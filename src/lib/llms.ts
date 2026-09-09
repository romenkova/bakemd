import type { SiteConfig } from "../config.ts"
import type { Site } from "../entry-server.tsx"

type Outline = Site["outline"]

/**
 * https://llmstxt.org an index of the site in Markdown.
 */
export function llms(config: SiteConfig, outline: Outline): string {
  const labelFor = (page: Outline[number]) => {
    const parent = page.path.slice(0, page.path.lastIndexOf("/"))
    if (!parent) return page.nav // a section, not a page under one
    const section = outline.find((other) => other.path === parent)
    return section ? `${section.nav} / ${page.nav}` : page.nav
  }

  const lines = [
    `# ${config.name}`,
    "",
    `> ${config.description}`,
    "",
    "## Docs",
    "",
    ...outline.map(
      (page) =>
        `- [${labelFor(page)}](${config.site}${page.path}): ${page.description}`
    ),
  ]

  if (config.repo)
    lines.push("", "## Optional", "", `- [Source](${config.repo})`)

  lines.push("")
  return lines.join("\n")
}
