/** `bakemd.json` in the content folder. */
export interface SiteConfig {
  name: string
  /** URL the site is served from, no trailing slash. A path is fine. */
  site: string
  /** The path of `site`. Empty when served from the root. */
  base: string
  description: string
  author?: { name: string; url?: string; type?: "Person" | "Organization" }
  repo?: string
  /** Absolute path under `_public/`, for og:image. */
  image?: string
  /** Absolute path under `_public/`, shown next to the name in the header. */
  logo?: string
  footer?: string
  /** CSS file relative to the content folder, loaded after the default theme. */
  theme?: string
  /** Browser chrome color on mobile, usually the theme's two backgrounds. */
  themeColor?: { light?: string; dark?: string }
}
