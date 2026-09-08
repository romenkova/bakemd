import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Pre } from "./pre"

export function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ pre: Pre }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
