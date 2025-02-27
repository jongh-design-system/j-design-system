import { css } from "@styled-system/css"
import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className={css({
          textStyle: "2xl",
          color: "foreground",
          mb: "4",
          fontWeight: "bold",
        })}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={css({
          textStyle: "xl",
          color: "foreground",
          mt: "12",
          mb: "3",
          fontWeight: "semibold",
          borderBottom: "1px solid",
          borderBottomColor: "gray.100",
          pb: "2",
        })}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={css({
          textStyle: "lg",
          color: "foreground",
          mb: "2",
          fontWeight: "medium",
        })}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        className={css({
          textStyle: "base",
          color: "foreground",
          mb: "4",
        })}
      >
        {children}
      </p>
    ),
    span: ({ children }) => (
      <span
        className={css({
          textStyle: "base",
          color: "foreground",
        })}
      >
        {children}
      </span>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className={css({
          textStyle: "base",
          color: "primary",
          textDecoration: "underline",
          _hover: { opacity: 0.8 },
        })}
      >
        {children}
      </a>
    ),

    ...components,
  }
}
