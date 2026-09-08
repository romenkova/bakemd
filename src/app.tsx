import type { SiteConfig } from "./config"
import { DocsPage } from "./components/page"
import { findDoc, type DocPage } from "./pages"
import { SiteFooter } from "./components/footer"
import { SiteHeader } from "./components/header"

export function App({
  path,
  docs,
  config,
}: {
  path: string
  docs: DocPage[]
  config: SiteConfig
}) {
  const doc = findDoc(docs, path)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader config={config} />
      <main className="flex-1">
        {doc && <DocsPage page={doc} docs={docs} />}
      </main>
      <SiteFooter config={config} />
    </div>
  )
}
