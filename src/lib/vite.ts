import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { build as viteBuild, createServer } from "vite"
import type { InlineConfig, Plugin } from "vite"
import type { SiteConfig } from "../config.ts"
import type { createSite } from "../entry-server.tsx"
import { head } from "./head.ts"
import { pageFor, prerender } from "./prerender.ts"

type Entry = { createSite: typeof createSite }

const root = fileURLToPath(new URL("../..", import.meta.url))

const THEME = "virtual:bakemd-theme.css"
const CODE_THEME = "virtual:bakemd-code-theme.css"

export function codeThemeFile(name: string): string | null {
  try {
    const file = fileURLToPath(
      import.meta.resolve(`highlight.js/styles/${name}.css`)
    )
    return existsSync(file) ? file : null
  } catch {
    return null
  }
}

function theme(content: string, config: SiteConfig): Plugin {
  const files: Record<string, string | null> = {
    [THEME]: config.theme ? join(content, config.theme) : null,
    [CODE_THEME]: config.codeTheme ? codeThemeFile(config.codeTheme) : null,
  }
  return {
    name: "bakemd-theme",
    resolveId(id) {
      if (id in files) return files[id] ?? "\0" + id
    },
    load(id) {
      if (id.startsWith("\0virtual:bakemd-")) return ""
    },
  }
}

function options(content: string, config: SiteConfig): InlineConfig {
  const publicDir = join(content, "_public")
  return {
    root,
    base: config.base + "/",
    configFile: false,
    appType: "custom",
    logLevel: "warn",
    publicDir: existsSync(publicDir) ? publicDir : false,
    plugins: [react(), tailwindcss(), theme(content, config)],
    server: { fs: { strict: false } },
  }
}

export async function build(content: string, config: SiteConfig, out: string) {
  const base = options(content, config)
  await viteBuild({ ...base, build: { outDir: out, emptyOutDir: true } })
  await viteBuild({
    ...base,
    build: {
      outDir: join(out, "server"),
      ssr: "src/entry-server",
      emptyOutDir: false,
      rollupOptions: { output: { entryFileNames: "[name].mjs" } },
    },
    // The bundle runs from the caller's folder.
    ssr: { noExternal: true },
  })
  const entry = pathToFileURL(join(out, "server", "entry-server.mjs")).href
  const { createSite }: Entry = await import(entry)
  prerender(out, createSite(content, config), config)
}

// Pages are React-rendered on the server only.
function prerenderDev(content: string, config: SiteConfig): Plugin {
  return {
    name: "prerender-dev",
    hotUpdate({ file, modules, server }) {
      if (this.environment.name !== "ssr") return
      if (modules.length || file.endsWith(".md")) {
        server.environments.client.hot.send({ type: "full-reload", path: "*" })
      }
    },
    configureServer(server) {
      server.watcher.add(content)
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.headers.accept?.includes("text/html")) return next()
          const url = (req.url ?? "/").split("?")[0]
          try {
            const { createSite } = (await server.ssrLoadModule(
              "/src/entry-server"
            )) as Entry
            const site = createSite(content, config)
            const page = pageFor(site, config, url)
            if (!page) return next()
            const template = await server.transformIndexHtml(
              url,
              readFileSync(join(root, "index.html"), "utf-8")
            )
            res.setHeader("Content-Type", "text/html")
            res.end(
              head(template, page, config).replace(
                "<!--app-html-->",
                site.render(url)
              )
            )
          } catch (error) {
            server.ssrFixStacktrace(error as Error)
            next(error)
          }
        })
      }
    },
  }
}

export async function dev(content: string, config: SiteConfig, port: number) {
  const base = options(content, config)
  const server = await createServer({
    ...base,
    plugins: [...(base.plugins ?? []), prerenderDev(content, config)],
    server: { ...base.server, port, strictPort: true },
  })
  await server.listen()
  // printUrls() logs at info level, which logLevel "warn" mutes.
  console.log(`bakemd dev: ${server.resolvedUrls?.local[0]}`)
}
