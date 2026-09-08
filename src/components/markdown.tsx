import type { ComponentProps } from "react"
import ReactMarkdown, { type ExtraProps } from "react-markdown"
import remarkGfm from "remark-gfm"
import { useBase } from "../base"
import { Pre } from "./pre"

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
        components={{ pre: Pre, a: Link, img: Image }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
