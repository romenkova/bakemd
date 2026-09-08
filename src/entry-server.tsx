import { renderToString } from "react-dom/server"
import { App } from "./app"
import type { SiteConfig } from "./config"
import { loadDocs } from "./pages"

export function createSite(dir: string, config: SiteConfig) {
  const docs = loadDocs(dir)
  const find = (path: string) => docs.find((page) => page.path === path)

  return {
    paths: docs.map((doc) => doc.path),

    render(path: string) {
      return renderToString(<App path={path} docs={docs} config={config} />)
    },

    meta(path: string) {
      const doc = find(path)
      if (!doc) return null
      return {
        title: `${doc.title} | ${config.name}`,
        heading: doc.title,
        description: doc.description,
        updated: doc.updated,
      }
    },

    trail(path: string) {
      const parts = path.split("/").filter(Boolean)
      const crumbs = []
      for (let i = 0; i < parts.length; i++) {
        const url = "/" + parts.slice(0, i + 1).join("/")
        const doc = find(url)
        if (doc) crumbs.push({ name: doc.nav, path: url })
      }
      return crumbs
    },

    outline: docs.map((doc) => ({
      path: doc.path,
      nav: doc.nav,
      description: doc.description,
    })),
  }
}

export type Site = ReturnType<typeof createSite>
