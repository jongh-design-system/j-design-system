import { describe, expect, it } from "vitest"

import {
  applyTheme,
  createClassName,
  createVarName,
  cx,
  generateThemeScript,
  mergeVariants,
  splitVariantProps,
  tokenVar,
} from "../src/index.ts"

describe("cx", () => {
  it("joins truthy class names only", () => {
    expect(cx("base", false, null, undefined, "accent")).toBe("base accent")
  })
})

describe("variant helpers", () => {
  it("merges defaults and ignores nullish overrides", () => {
    expect(
      mergeVariants(
        { size: "md", tone: "neutral" },
        { size: "lg", tone: undefined },
      ),
    ).toEqual({
      size: "lg",
      tone: "neutral",
    })
  })

  it("splits variant props from the rest", () => {
    const [variantProps, otherProps] = splitVariantProps(
      {
        size: "sm",
        tone: "accent",
        id: "avatar",
      },
      {
        size: ["sm", "md", "lg"],
        tone: ["neutral", "accent"],
      },
    )

    expect(variantProps).toEqual({
      size: "sm",
      tone: "accent",
    })
    expect(otherProps).toEqual({
      id: "avatar",
    })
  })

  it("creates base, variant and compound class names", () => {
    expect(
      createClassName(
        "jds-button",
        {
          size: "sm",
          tone: "accent",
        },
        [
          {
            size: "sm",
            tone: "accent",
          },
        ],
      ),
    ).toBe(
      "jds-button jds-button--size_sm jds-button--tone_accent jds-button--size_sm-tone_accent",
    )
  })
})

describe("token and theme helpers", () => {
  it("creates prefixed css variable names", () => {
    expect(createVarName("primitive.color.blue.500")).toBe(
      "--jds-primitive-color-blue-500",
    )
    expect(tokenVar("color.bg.surface")).toBe("var(--jds-color-bg-surface)")
  })

  it("applies the theme mode to a root element", () => {
    const root = {
      dataset: {},
    } as HTMLElement

    applyTheme("dark", root)

    expect(root.dataset.theme).toBe("dark")
  })

  it("generates an inline theme bootstrap script", () => {
    const script = generateThemeScript("dark")

    expect(script).toContain('localStorage.getItem("jds-theme")')
    expect(script).toContain('"dark"')
    expect(script).toContain("document.documentElement.dataset.theme = mode")
  })
})
