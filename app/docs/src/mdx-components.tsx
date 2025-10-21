/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from "@styled-system/css"
import type { ComponentType } from "react"

import { CodeBlock } from "./components/codeBlock"

//global components using mdx
export function MDXComponents(): Record<string, ComponentType<any>> {
  return {
    h1: (props) => (
      <h1
        className={css({
          textStyle: "title1",
          mt: "8",
          mb: "4",
          color: "foreground",
        })}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className={css({
          textStyle: "title2",
          mt: "12",
          mb: "4",
          borderBottom: "base",
          pb: "3",
          color: "foreground",
        })}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className={css({
          textStyle: "title3",
          mt: "8",
          mb: "3",
          color: "foreground",
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
          lineHeight: "1.8",
          color: "foreground",
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
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          _hover: { color: "primary/80" },
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
            mt: "2",
            mb: "2",
            pl: "6",
            color: "foreground",
            position: "relative",
            _before: {
              content: '""',
              position: "absolute",
              left: "0",
              top: "0.4em",
              width: "1em",
              height: "1em",
              backgroundImage: "checkmark",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              color: "primary",
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
          rounded: "md",
          fontStyle: "italic",
        })}
        {...props}
      />
    ),
    code: (props) => (
      <code
        className={css({
          bg: "muted",
          color: "foreground",
          px: "1.5",
          py: "0.5",
          rounded: "sm",
          fontSize: "0.9em",
          fontFamily: "mono",
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
