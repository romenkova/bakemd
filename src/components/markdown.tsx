import type { ComponentProps } from "react"
import type { LanguageFn } from "highlight.js"
import dockerfile from "highlight.js/lib/languages/dockerfile"
import md from "highlight.js/lib/languages/markdown"
import nginx from "highlight.js/lib/languages/nginx"
import ReactMarkdown, { type ExtraProps } from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { common } from "lowlight"
import remarkGfm from "remark-gfm"
import { useBase } from "../base"
import { Pre } from "./pre"

const markdown: LanguageFn = (hljs) => {
  const lang = md(hljs)
  lang.contains.unshift({ begin: /^---$/, end: /^---$/, subLanguage: "yaml" })
  return lang
}

const languages = { ...common, markdown, nginx, dockerfile }

function Link({ node, href, ...props }: ComponentProps<"a"> & ExtraProps) {
  void node
  const base = useBase()
  return <a href={href?.startsWith("/") ? base + href : href} {...props} />
}

function Image({ node, src, ...props }: ComponentProps<"img"> & ExtraProps) {
  void node
  const base = useBase()
  return <img src={src?.startsWith("/") ? base + src : src} {...props} />
}

export function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { languages }]]}
        components={{ pre: Pre, a: Link, img: Image }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
