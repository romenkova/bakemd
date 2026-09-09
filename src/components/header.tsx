import { SiGithub } from "react-icons/si"
import { useBase } from "../base"
import type { SiteConfig } from "../config"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "../cn"

export function SiteHeader({ config }: { config: SiteConfig }) {
  const base = useBase()
  return (
    <header
      className={cn(
        "sticky top-0 z-10",
        "border-b border-border bg-background/80 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a
          href={config.home ?? base + "/"}
          className="flex items-center gap-2 font-bold"
        >
          {config.logo && (
            <img
              src={base + config.logo}
              alt={config.name}
              className="size-7"
            />
          )}
          <span>{config.name}</span>
        </a>
        <nav className="flex items-center gap-0.5">
          {config.repo && (
            <a
              href={config.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-lg",
                "transition-colors hover:bg-muted hover:text-foreground"
              )}
            >
              <SiGithub className="size-4.5" title="GitHub" />
            </a>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
