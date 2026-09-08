import { DocsDrawer } from "./nav-drawer"
import { DocsLinks, type NavProps } from "./nav-links"

export function DocsNav({ current, docs }: NavProps) {
  return (
    <>
      <DocsDrawer current={current} docs={docs} />
      <nav className="hidden md:block md:w-52 md:shrink-0">
        <div className="sticky top-20">
          <DocsLinks current={current} docs={docs} />
        </div>
      </nav>
    </>
  )
}
