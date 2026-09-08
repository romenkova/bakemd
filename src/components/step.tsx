import { ArrowLeft, ArrowRight } from "lucide-react"
import { useBase } from "../base"
import type { DocPage } from "../pages"
import { cn } from "../cn"

export function Step({ page, back }: { page: DocPage; back?: boolean }) {
  const base = useBase()
  return (
    <a
      href={base + page.path}
      className={cn(
        "flex items-center gap-2",
        "text-muted-foreground transition-colors hover:text-foreground"
      )}
    >
      {back && <ArrowLeft className="size-4" />}
      <span>
        <span className="block text-xs">{back ? "Previous" : "Next"}</span>
        <span className="font-semibold text-foreground">{page.nav}</span>
      </span>
      {!back && <ArrowRight className="size-4" />}
    </a>
  )
}
