/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from "@styled-system/css"
import type { ComponentType } from "react"

//global components using mdx
export function MDXComponents(): Record<string, ComponentType<any>> {
  return {
    h1: (props) => (
      <h1
        className={css({
          textStyle: "2xl",
          color: "foreground",
          mb: "4",
          fontWeight: "bold",
        })}
        {...props}
      />
    ),
    h2: (props) => (
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
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className={css({
          textStyle: "lg",
          color: "foreground",
          mb: "2",
          fontWeight: "medium",
        })}
        {...props}
      />
    ),
    p: (props) => (
      <p
        className={css({
          textStyle: "base",
          color: "foreground",
          mb: "4",
        })}
        {...props}
      />
    ),
    span: (props) => (
      <span
        className={css({
          textStyle: "base",
          color: "foreground",
        })}
        {...props}
      />
    ),
    a: (props) => (
      <a
        className={css({
          textStyle: "base",
          color: "primary",
          textDecoration: "underline",
          _hover: { opacity: 0.8 },
        })}
        {...props}
      />
    ),
    // pre: (props) => (
    //   <pre
    //     className={css({
    //       display: "block",
    //       fontFamily: "mono",
    //       fontSize: "sm",
    //       color: "zinc.50",
    //       overflow: "hidden",
    //       rounded: "xl",
    //       bg: "zinc.950",
    //       _dark: { bg: "zinc.900" },
    //       padding: "4",
    //     })}
    //     {...props}
    //   />
    // ),
    // code: (props) => <code {...props} />,
    // ...components,
  }
}
