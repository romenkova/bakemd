import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { VFile } from "vfile"
import { matter } from "vfile-matter"

export interface DocPage {
  path: string
  nav: string
  title: string
  description: string
  order: number
  updated: string
  badge?: string
  body: string
}

/** `index.md` is `/`, `sync.md` is `/sync`, `a/index.md` is `/a`. */
function pathFor(file: string): string {
  return (
    "/" +
    file
      .replace(/\\/g, "/")
      .replace(/\.md$/, "")
      .replace(/(^|\/)index$/, "")
  )
}

type Attributes = Omit<DocPage, "path" | "body">

function read(file: string, source: string): DocPage {
  const vfile = new VFile(source)
  matter(vfile, { strip: true })
  const attributes = (vfile.data.matter ?? {}) as Partial<Attributes>

  for (const key of [
    "title",
    "nav",
    "description",
    "order",
    "updated",
  ] as const)
    if (attributes[key] === undefined)
      throw new Error(`${file}: frontmatter is missing "${key}"`)

  if (!/^\d{4}-\d{2}-\d{2}$/.test(attributes.updated as string))
    throw new Error(
      `${file}: "updated" must be "YYYY-MM-DD", not "${attributes.updated}"`
    )

  return {
    ...(attributes as Attributes),
    path: pathFor(file),
    body: String(vfile),
  }
}

/** `/` is 0, `/sync` is 1, `/self-hosting/https` is 2. */
export function depth(page: DocPage): number {
  return page.path.split("/").filter(Boolean).length
}

function parentOf(path: string): string {
  return path.slice(0, path.lastIndexOf("/"))
}

function byOrder(a: DocPage, b: DocPage) {
  return a.order - b.order
}

function ordered(pages: DocPage[]): DocPage[] {
  const sections = pages.filter((page) => depth(page) < 2).sort(byOrder)
  const flat = sections.flatMap((section) => [
    section,
    ...pages
      .filter(
        (page) => depth(page) === 2 && parentOf(page.path) === section.path
      )
      .sort(byOrder),
  ])

  if (flat.length !== pages.length)
    throw new Error("docs: a page is nested deeper than one level")

  return flat
}

export function loadDocs(dir: string): DocPage[] {
  const files = readdirSync(dir, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => !file.startsWith("_") && !file.startsWith("node_modules"))
  return ordered(
    files.map((file) => read(file, readFileSync(join(dir, file), "utf-8")))
  )
}

export function findDoc(docs: DocPage[], path: string): DocPage | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path
  return docs.find((doc) => doc.path === clean)
}
