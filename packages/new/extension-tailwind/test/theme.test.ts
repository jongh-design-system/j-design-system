import { describe, expect, it } from "vitest"

import { generateTailwindThemeCss } from "../src/build.ts"

describe("generateTailwindThemeCss", () => {
  it("maps system tokens to Tailwind theme namespaces", () => {
    const css = generateTailwindThemeCss()

    expect(css).toContain("@theme")
    expect(css).toContain("--color-bg-surface: var(--jds-color-bg-surface);")
    expect(css).toContain(
      "--color-blue-500: var(--jds-primitive-color-blue-500);",
    )
    expect(css).toContain("--spacing: var(--jds-primitive-spacing-1);")
    expect(css).toContain("--radius-md: var(--jds-primitive-radius-md);")
    expect(css).toContain("--shadow-md: var(--jds-primitive-shadow-md);")
    expect(css).toContain(
      "--text-body-md: var(--jds-primitive-typography-body-md-fontSize);",
    )
    expect(css).toContain(
      "--leading-body-md: var(--jds-primitive-typography-body-md-lineHeight);",
    )
    expect(css).toContain(
      "--font-weight-body-md: var(--jds-primitive-typography-body-md-fontWeight);",
    )
    expect(css).toContain(
      "--ease-standard: var(--jds-primitive-motion-easing-standard);",
    )
  })

  it("emits custom transition duration utilities", () => {
    const css = generateTailwindThemeCss()

    expect(css).toContain("@utility duration-fast")
    expect(css).toContain(
      "transition-duration: var(--jds-primitive-motion-duration-fast);",
    )
    expect(css).toContain("@utility duration-normal")
    expect(css).toContain("@utility duration-slow")
  })
})
