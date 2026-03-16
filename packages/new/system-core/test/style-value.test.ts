import { describe, expect, it } from "vitest"

import { renderStyleObject } from "../src/resolve/style-value.ts"
import { testSystem } from "./fixtures/system.ts"

describe("renderStyleObject", () => {
  it("expands shorthands and resolves token values", () => {
    const css = renderStyleObject(
      ".demo",
      {
        px: "spacing.4",
        minW: "spacing.10",
        bg: "color.bg.surface",
        rounded: "radius.lg",
        boxShadow: "shadow.md",
        transitionDuration: "motion.duration.fast",
        transitionTimingFunction: "motion.easing.standard",
        textStyle: "typography.body.md",
        _hover: {
          bg: "color.bg.accent-hovered",
        },
        "@media (min-width: 48rem)": {
          px: "spacing.6",
        },
      },
      testSystem,
    )

    expect(css).toContain("padding-inline: var(--jds-primitive-spacing-4);")
    expect(css).toContain("min-width: var(--jds-primitive-spacing-10);")
    expect(css).toContain("background-color: var(--jds-color-bg-surface);")
    expect(css).toContain("border-radius: var(--jds-primitive-radius-lg);")
    expect(css).toContain("box-shadow: var(--jds-primitive-shadow-md);")
    expect(css).toContain(
      "transition-duration: var(--jds-primitive-motion-duration-fast);",
    )
    expect(css).toContain(
      "transition-timing-function: var(--jds-primitive-motion-easing-standard);",
    )
    expect(css).toContain(
      "font-size: var(--jds-primitive-typography-body-md-fontSize);",
    )
    expect(css).toContain(".demo:hover")
    expect(css).toContain("@media (min-width: 48rem)")
    expect(css).toContain("padding-inline: var(--jds-primitive-spacing-6);")
  })
})
