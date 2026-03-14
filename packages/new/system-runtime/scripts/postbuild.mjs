import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, "../dist")
const entries = await fs.readdir(distDir)
const declarationFile = entries.find((entry) => /^index-.*\.d\.ts$/.test(entry))

if (!declarationFile) {
  throw new Error("Expected a generated index-*.d.ts file in dist")
}

await fs.copyFile(
  path.join(distDir, declarationFile),
  path.join(distDir, "index.d.ts"),
)
