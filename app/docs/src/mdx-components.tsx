import { css } from "@styled-system/css"
import type { ComponentPropsWithoutRef, ComponentType } from "react"

import { CodeBlock } from "./components/codeBlock"

type MDXComponentMap = {
  h1: ComponentType<ComponentPropsWithoutRef<"h1">>
  h2: ComponentType<ComponentPropsWithoutRef<"h2">>
  h3: ComponentType<ComponentPropsWithoutRef<"h3">>
  p: ComponentType<ComponentPropsWithoutRef<"p">>
  span: ComponentType<ComponentPropsWithoutRef<"span">>
  a: ComponentType<ComponentPropsWithoutRef<"a">>
  ul: ComponentType<ComponentPropsWithoutRef<"ul">>
  ol: ComponentType<ComponentPropsWithoutRef<"ol">>
  blockquote: ComponentType<ComponentPropsWithoutRef<"blockquote">>
  code: ComponentType<ComponentPropsWithoutRef<"code">>
  hr: ComponentType<ComponentPropsWithoutRef<"hr">>
  pre: ComponentType<ComponentPropsWithoutRef<"pre">>
}

//global components using mdx
export function MDXComponents(): MDXComponentMap {
  return {
    h1: (props) => (
      <h1
        className={css({
          textStyle: "display2",
          mt: "8",
          mb: "6",
          color: "foreground",
        })}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className={css({
          textStyle: "title1",
          mt: "12",
          mb: "4",
          borderBottom: "base",
          pb: "3",
          color: "foreground",
          scrollMarginTop: "5rem",
        })}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className={css({
          textStyle: "title2",
          mt: "8",
          mb: "3",
          color: "foreground",
          scrollMarginTop: "5rem",
        })}
        {...props}
      />
    ),
    p: (props) => (
      <p
        className={css({
          textStyle: "body1",
          mt: "4",
          mb: "4",
          lineHeight: "1.85",
          color: "foreground",
          maxW: "65ch",
        })}
        {...props}
      />
    ),
    span: (props) => (
      <span
        className={css({
          textStyle: "body2",
        })}
        {...props}
      />
    ),
    a: (props) => (
      <a
        className={css({
          textStyle: "body1",
          color: "primary",
          textDecoration: "none",
          borderBottom: "1px solid",
          borderBottomColor: "primary/40",
          transition: "all",
          transitionDuration: "fast",
          _hover: {
            color: "primary/80",
            borderBottomColor: "primary",
          },
        })}
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className={css({
          mt: "4",
          mb: "4",
          ml: "6",
          listStyle: "none",
          "& li": {
            mt: "2.5",
            mb: "2.5",
            pl: "5",
            color: "foreground",
            position: "relative",
            lineHeight: "1.7",
            _before: {
              content: '""',
              position: "absolute",
              left: "0",
              top: "0.6em",
              width: "6px",
              height: "6px",
              bg: "primary",
              rounded: "full",
            },
          },
        })}
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className={css({
          mt: "4",
          mb: "4",
          ml: "6",
          "& li": {
            mt: "2",
            mb: "2",
            pl: "2",
            color: "foreground",
          },
        })}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className={css({
          mt: "6",
          mb: "6",
          pl: "4",
          pr: "4",
          py: "3",
          borderLeft: "4px solid",
          borderLeftColor: "primary",
          bg: "muted",
          color: "muted.foreground",
          rounded: "lg",
        })}
        {...props}
      />
    ),
    code: (props) => (
      <code
        className={css({
          bg: "code",
          color: "primary",
          px: "1.5",
          py: "0.5",
          rounded: "sm",
          fontSize: "0.9em",
          fontFamily: "mono",
          border: "1px solid",
          borderColor: "border",
        })}
        {...props}
      />
    ),
    hr: (props) => (
      <hr
        className={css({
          my: "8",
          border: "none",
          borderTop: "base",
        })}
        {...props}
      />
    ),
    pre: (props) => <CodeBlock {...props} />,
  }
}
