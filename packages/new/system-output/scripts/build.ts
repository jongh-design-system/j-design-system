import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { writeSystemFiles } from "../../system-core/src/build.ts"
import { system } from "../../system-spec/src/system.ts"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFilePath)
const outputDir = path.resolve(currentDir, "../src")
const specDir = path.resolve(currentDir, "../../system-spec/src")

await writeSystemFiles(system, outputDir)

await fs.mkdir(path.join(outputDir, "generated/styles"), { recursive: true })
await fs.copyFile(
  path.join(specDir, "reset.css"),
  path.join(outputDir, "generated/styles/reset.css"),
)
