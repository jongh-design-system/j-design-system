import fs from "fs-extra"
import path from "path"
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest"

import { addCommand } from "@/commands/add"
import { loadComponentConfig, loadTSConfig } from "@/common/get-config"
import { resolveImport } from "@/common/resolve"
import { configSchema } from "@/common/types"

const ANIMATE_BUTTON_REGISTRY = {
  name: "animatebutton",
  dependencies: ["motion"],
  files: [
    {
      name: "index.tsx",
      content:
        'import { motion } from "motion/react"\n\nimport { Button } from "@/component/button"\nimport { useAnimationState } from "@hooks/use-animation-state"\n\nexport function AnimateButton() {\n  useAnimationState()\n  return <Button asChild><motion.button /></Button>\n}\n',
      type: "ui",
    },
    {
      name: "use-animation-state.ts",
      content: "export function useAnimationState() {}\n",
      type: "hooks",
    },
  ],
}

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/components",
  hooks: "@/hooks",
}

const TSCONFIG_JSON = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
}

const cwd = path.join(__dirname, "./fixture/add_test")

describe("add", () => {
  beforeAll(() => {
    fs.writeFileSync(
      path.join(cwd, "components.json"),
      JSON.stringify(COMPONENTS_JSON),
      "utf-8",
    )
    fs.writeFileSync(
      path.join(cwd, "tsconfig.json"),
      JSON.stringify(TSCONFIG_JSON),
      "utf-8",
    )
  })

  afterAll(async () => {
    await fs.remove(path.join(cwd, "components.json"))
    await fs.remove(path.join(cwd, "tsconfig.json"))
  })

  test("components.json의 alias를 실제 경로로 해석합니다", async () => {
    const config = configSchema.schema.parse(loadComponentConfig(cwd))
    const tsconfig = loadTSConfig(cwd)

    expect(await resolveImport(config.components, tsconfig)).toBe(
      path.join(cwd, "src", "components"),
    )
  })

  describe("animatebutton을 추가하면", () => {
    const componentDirectory = path.join(
      cwd,
      "src",
      "components",
      "animatebutton",
    )

    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ANIMATE_BUTTON_REGISTRY),
        }) as Promise<Response>,
    )

    beforeAll(async () => {
      await addCommand.parseAsync(["node", "add", "animatebutton", "-c", cwd])
    })

    afterAll(async () => {
      await fs.remove(path.join(cwd, "src"))
    })

    test("컴포넌트와 함께 제공된 hook을 설정된 경로에 복사합니다", () => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://raw.githubusercontent.com/jongh-design-system/jds/dev/registry/animatebutton.json",
      )
      expect(
        fs.pathExistsSync(path.join(componentDirectory, "index.tsx")),
      ).toBeTruthy()
      expect(
        fs.pathExistsSync(
          path.join(cwd, "src", "hooks", "use-animation-state.ts"),
        ),
      ).toBeTruthy()
    })

    test("내부 import를 components.json의 alias로 변환합니다", () => {
      const content = fs.readFileSync(
        path.join(componentDirectory, "index.tsx"),
        "utf-8",
      )

      expect(content).toContain('from "@/components/button"')
      expect(content).toContain('from "@/hooks/use-animation-state"')
    })
  })
})
