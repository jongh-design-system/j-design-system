import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { generateTailwindThemeCss } from "../src/build.ts"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFilePath)
const packageDir = path.resolve(currentDir, "..")

async function build(): Promise<void> {
  const outputPath = path.join(packageDir, "dist/theme.css")

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${generateTailwindThemeCss()}\n`, "utf8")
}

if (process.argv[1] && path.resolve(process.argv[1]) === currentFilePath) {
  await build()
}
