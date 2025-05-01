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
          textStyle: "heading1",
        })}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className={css({
          textStyle: "title2",
          mt: "4",
          mb: "2",
          borderBottom: "2px solid",
          borderBottomColor: "gray.100",
          pb: "2",
        })}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className={css({
          textStyle: "title3",
          mt: "4",
          mb: "2",
        })}
        {...props}
      />
    ),
    p: (props) => (
      <p
        className={css({
          textStyle: "body1",
          mt: "2",
          mb: "2",
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
          textStyle: "label1",
          textDecoration: "underline",
          _hover: { opacity: 0.8 },
        })}
        {...props}
      />
    ),
    pre: (props) => <CodeBlock {...props} />,
  }
}
