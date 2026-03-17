import fs from "node:fs/promises"
import path from "node:path"

import { defineConfig } from "tsdown"

const outputDir = path.resolve("dist")
let copyGeneratedArtifacts: Promise<void> | null = null

async function copyFile(source: string, destination: string): Promise<void> {
  await fs.mkdir(path.dirname(destination), { recursive: true })
  await fs.copyFile(source, destination)
}

async function copyGeneratedFiles(): Promise<void> {
  await fs.cp("src/generated", path.join(outputDir, "generated"), {
    recursive: true,
  })

  await copyFile(
    "src/react/index.d.ts",
    path.join(outputDir, "react/index.d.ts"),
  )
  await copyFile(
    "src/theme/index.d.ts",
    path.join(outputDir, "theme/index.d.ts"),
  )
}

export default defineConfig({
  entry: {
    "react/index": "src/react/index.js",
    "theme/index": "src/theme/index.js",
    "internal/recipe": "src/internal/recipe.js",
  },
  format: ["esm"],
  clean: true,
  target: "es2022",
  platform: "neutral",
  sourcemap: true,
  deps: {
    neverBundle: ["react", /^react\//],
  },
  hooks: {
    "build:done": async () => {
      copyGeneratedArtifacts ??= copyGeneratedFiles()
      await copyGeneratedArtifacts
    },
  },
})
