import { Moon, Sun } from "lucide-react"
import { cn } from "../cn"

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg",
        "transition-colors hover:bg-muted hover:text-foreground"
      )}
      data-theme-toggle
    >
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
    </button>
  )
}
