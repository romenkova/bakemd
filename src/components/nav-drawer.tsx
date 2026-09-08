import { PanelLeft } from "lucide-react"
import { cn } from "../cn"
import { DocsLinks, type NavProps } from "./nav-links"

export function DocsDrawer({ current, docs }: NavProps) {
  return (
    <div className="mb-6 md:hidden">
      <button
        type="button"
        className={cn(
          "inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg px-3",
          "text-sm font-medium text-muted-foreground",
          "bg-muted-foreground/5 hover:bg-muted-foreground/10",
          "dark:bg-border/20 dark:hover:bg-border/30"
        )}
        data-drawer-open
      >
        <span className="flex items-center gap-1.5">
          <PanelLeft className="size-4" />
          <span className="text-muted-foreground">Docs</span>
        </span>
        <span className="font-semibold">{current.nav}</span>
      </button>
      <dialog
        className={cn(
          "m-0 h-full max-h-none w-3/4 border-r sm:max-w-sm",
          "bg-popover text-sm text-popover-foreground shadow-e3",
          "backdrop:bg-black/10 backdrop:supports-backdrop-filter:backdrop-blur-xs"
        )}
        data-drawer
      >
        <div className="flex h-full flex-col">
          <div className="p-4 text-base font-medium text-foreground">
            Documentation
          </div>
          <div className="overflow-y-auto px-2 pb-4">
            <DocsLinks current={current} docs={docs} />
          </div>
        </div>
      </dialog>
    </div>
  )
}
