import { Copy } from "lucide-react"
import type { ComponentProps } from "react"
import type { ExtraProps } from "react-markdown"
import { cn } from "../cn"

/** The button is wired up in client.ts; the page ships no React. */
export function Pre({
  node,
  className,
  ...props
}: ComponentProps<"pre"> & ExtraProps) {
  void node
  return (
    <div className="group/code relative">
      <pre className={cn("hljs", className)} {...props} />
      <button
        type="button"
        aria-label="Copy code"
        title="Copy code"
        className={cn(
          "absolute top-1.5 right-1.5 inline-flex items-center gap-1",
          "rounded-md border px-1.5 py-1 font-sans text-[0.6875rem]",
          "opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
        )}
      >
        <Copy className="size-3.5" />
      </button>
    </div>
  )
}
