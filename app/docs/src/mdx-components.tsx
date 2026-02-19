/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react"

import { CodeBlock } from "./components/codeBlock"

//global components using mdx
export function MDXComponents(): Record<string, ComponentType<any>> {
  return {
    h1: (props) => (
      <h1
        className="
          mt-8 mb-6 text-6xl/relaxed font-bold tracking-tight text-base-content
        "
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="
          mt-12 mb-4 scroll-mt-20 border-b border-base-300 pb-3 text-4xl/normal
          font-semibold tracking-tight text-base-content
        "
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="
          mt-8 mb-3 scroll-mt-20 text-2xl/snug font-semibold tracking-tight
          text-base-content
        "
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="
          mt-4 mb-4 max-w-[65ch] text-base leading-[1.85] text-base-content
        "
        {...props}
      />
    ),
    span: (props) => <span className="text-sm/normal" {...props} />,
    a: (props) => (
      <a
        className="
          border-b border-primary/40 text-base/relaxed text-primary no-underline
          transition-all duration-150
          hover:border-primary hover:text-primary/80
        "
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="
          mt-4 mb-4 ml-6 list-none
          [&_li]:relative [&_li]:mt-2.5 [&_li]:mb-2.5 [&_li]:pl-5
          [&_li]:leading-[1.7] [&_li]:text-base-content
          [&_li]:before:absolute [&_li]:before:top-[0.6em] [&_li]:before:left-0
          [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full
          [&_li]:before:bg-primary [&_li]:before:content-['']
        "
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="
          mt-4 mb-4 ml-6
          [&_li]:mt-2 [&_li]:mb-2 [&_li]:pl-2 [&_li]:text-base-content
        "
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="
          mt-6 mb-6 rounded-lg border-l-4 border-primary bg-base-200 py-3 pr-4
          pl-4 text-base-content/60
        "
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="
          rounded-sm border border-base-300 bg-base-200 px-1.5 py-0.5 font-mono
          text-[0.9em] text-primary
        "
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 border-t border-none border-base-300" {...props} />
    ),
    pre: (props) => <CodeBlock {...props} />,
  }
}
