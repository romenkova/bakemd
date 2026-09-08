import { cn } from "../cn"
import { depth, type DocPage } from "../pages"

export interface NavProps {
  current: DocPage
  docs: DocPage[]
}

export function DocsLinks({ current, docs }: NavProps) {
  return (
    <ul className="flex flex-col gap-1">
      {docs.map((doc) => (
        <li key={doc.path} className={cn(depth(doc) > 1 && "ml-4")}>
          <a
            href={doc.path}
            aria-current={doc === current ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5",
              "text-sm text-docs-nav transition-colors hover:bg-muted hover:text-foreground",
              doc === current && "bg-muted font-semibold text-foreground"
            )}
          >
            {doc.nav}
            {doc.badge && (
              <span
                className={cn(
                  "rounded-sm border border-current px-1",
                  "text-[10px] font-medium tracking-wide uppercase opacity-70"
                )}
              >
                {doc.badge}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
