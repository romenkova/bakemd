import type { DocPage } from "../pages"
import { cn } from "../cn"
import { Step } from "./step"

export function DocsSteps({
  current,
  docs,
}: {
  current: DocPage
  docs: DocPage[]
}) {
  const at = docs.indexOf(current)
  const previous = docs[at - 1]
  const next = docs[at + 1]

  return (
    <nav
      className={cn(
        "mt-14 flex flex-wrap justify-between gap-4",
        "border-t border-border pt-6 text-sm"
      )}
    >
      {previous ? <Step page={previous} back /> : <span />}
      {next ? <Step page={next} /> : <span />}
    </nav>
  )
}
