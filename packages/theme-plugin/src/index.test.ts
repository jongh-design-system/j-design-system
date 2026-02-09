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
    `@import "tailwindcss"; @plugin "./theme-plugin";`,
    {
      loadModule: async (_id, base) => ({
        path: "./theme-plugin",
        base,
        module: plugin({ themes: "default --default" }),
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

describe("테마 플러그인 CSS 생성 검증", () => {
  it("bg-primary 클래스가 background-color: var(--color-primary) CSS를 생성한다", async () => {
    const css = await buildCss(["bg-primary"])
    expect(css).toContain("background-color: var(--color-primary)")
  })

  it("text-base-content 클래스가 color: var(--color-base-content) CSS를 생성한다", async () => {
    const css = await buildCss(["text-base-content"])
    expect(css).toContain("color: var(--color-base-content)")
  })

  it("rounded-selector 클래스가 border-radius: var(--radius-selector) CSS를 생성한다", async () => {
    const css = await buildCss(["rounded-selector"])
    expect(css).toContain("border-radius: var(--radius-selector)")
  })

  it("기본 테마의 CSS 변수(--color-primary, --color-base-100, --radius-selector)가 출력에 포함된다", async () => {
    const css = await buildCss([])
    expect(css).toContain("--color-primary:")
    expect(css).toContain("--color-base-100:")
    expect(css).toContain("--radius-selector:")
  })

  it("dark mode media query(prefers-color-scheme: dark)가 출력에 포함된다", async () => {
    const css = await buildCss([])
    expect(css).toContain("prefers-color-scheme: dark")
  })
})
