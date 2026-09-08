import type { SiteConfig } from "../config"
import { cn } from "../cn"

export function SiteFooter({ config }: { config: SiteConfig }) {
  if (!config.footer) return null
  return (
    <footer
      className={cn(
        "mx-auto flex max-w-6xl flex-col items-center justify-between gap-3",
        "px-6 py-8 text-sm"
      )}
    >
      <span className="text-muted-foreground">{config.footer}</span>
    </footer>
  )
}
