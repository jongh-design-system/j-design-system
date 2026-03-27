import fs from "node:fs/promises"
import path from "node:path"

import { defineConfig } from "tsdown"

const outputDir = path.resolve("dist")
const stylesSourcePath = path.resolve("src/styles.css")
const stylesDestinationPath = path.join(outputDir, "styles.css")

export default defineConfig({
  entry: ["src/*/index.ts", "src/*/index.tsx"],
  unbundle: true,
  format: ["esm"],
  dts: true,
  clean: true,
  target: "es2022",
  platform: "neutral",
  sourcemap: true,
  deps: {
    neverBundle: [
      "react",
      "react-dom",
      /^react\//,
      "@jongh/new-system-output",
      /^@jongh\/new-system-output\//,
      "radix-ui",
      /^radix-ui\//,
      "framer-motion",
      "lucide-react",
      "react-hook-form",
    ],
  },
  hooks: {
    "build:done": async () => {
      await fs.mkdir(outputDir, {
        recursive: true,
      })
      await fs.copyFile(stylesSourcePath, stylesDestinationPath)
    },
  },
})
