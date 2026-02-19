import { readFileSync } from "node:fs"

import { compile } from "tailwindcss"
import { describe, expect, it } from "vitest"

import plugin from "./index"

const tailwindBase = readFileSync(
  require.resolve("tailwindcss/index.css"),
  "utf-8",
)

async function buildCss(candidates: string[]) {
  const compiler = await compile(
    `@import "tailwindcss"; @plugin "./animation-plugin";`,
    {
      loadModule: async (_id, base) => ({
        path: "./animation-plugin",
        base,
        module: plugin(),
      }),
      loadStylesheet: async (id, base) => {
        if (id === "tailwindcss") {
          return { path: "tailwindcss/index.css", base, content: tailwindBase }
        }
        throw new Error(`Unknown stylesheet: ${id}`)
      },
    },
  )
  return compiler.build(candidates)
}

describe("애니메이션 플러그인 CSS 생성 검증", () => {
  it("fade-in @keyframes가 CSS 출력에 포함된다", async () => {
    const css = await buildCss([])
    expect(css).toContain("@keyframes fade-in")
  })

  it("bounce @keyframes가 CSS 출력에 포함된다", async () => {
    const css = await buildCss([])
    expect(css).toContain("@keyframes bounce")
  })

  it("accordion-down @keyframes가 CSS 출력에 포함된다", async () => {
    const css = await buildCss([])
    expect(css).toContain("@keyframes accordion-down")
    expect(css).toContain("var(--radix-accordion-content-height)")
  })

  it("animate-fade-in 클래스가 animation CSS를 생성한다", async () => {
    const css = await buildCss(["animate-fade-in"])
    expect(css).toContain("animation:")
    expect(css).toContain("fade-in")
  })

  it("animate-bounce 클래스가 animation CSS를 생성한다", async () => {
    const css = await buildCss(["animate-bounce"])
    expect(css).toContain("animation:")
    expect(css).toContain("bounce")
  })

  it("주요 애니메이션 9종의 @keyframes가 모두 등록된다", async () => {
    const css = await buildCss([])
    const names = [
      "fade-in",
      "fade-out",
      "slide-in-up",
      "zoom-in",
      "flip",
      "bounce",
      "tada",
      "wobble",
      "content-show",
    ]
    for (const name of names) {
      expect(css).toContain(`@keyframes ${name}`)
    }
  })
})
