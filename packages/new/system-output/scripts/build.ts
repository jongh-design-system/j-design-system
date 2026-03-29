import { execFile as execFileCallback } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

import { writeSystemFiles } from "../../system-core/src/build.ts"
import { resetCssPath as defaultResetCssPath } from "../../system-spec/src/reset.ts"
import { system } from "../../system-spec/src/system.ts"

const execFile = promisify(execFileCallback)
const currentFilePath = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFilePath)
const packageDir = path.resolve(currentDir, "..")

async function formatGeneratedFiles(outputDir: string): Promise<void> {
  await execFile(
    "pnpm",
    [
      "exec",
      "prettier",
      "--write",
      "--ignore-unknown",
      path.join(outputDir, "generated"),
    ],
    { cwd: packageDir },
  )
}

function wrapInLayer(layerName: string, css: string): string {
  const trimmedCss = css.trim()
  if (!trimmedCss) {
    return ""
  }

  return `@layer ${layerName} {\n${trimmedCss
    .split("\n")
    .map((line) => (line ? `  ${line}` : ""))
    .join("\n")}\n}\n`
}

export async function buildSystemOutput({
  outputDir,
  resetCssPath = defaultResetCssPath,
}: {
  outputDir: string
  resetCssPath?: string
}): Promise<void> {
  await writeSystemFiles(system, outputDir)

  await fs.mkdir(path.join(outputDir, "generated/styles"), { recursive: true })
  const resetCss = await fs.readFile(resetCssPath, "utf8")
  await fs.copyFile(
    resetCssPath,
    path.join(outputDir, "generated/styles/reset.css"),
  )
  await fs.writeFile(
    path.join(outputDir, "generated/styles/reset.layered.css"),
    wrapInLayer("base", resetCss),
    "utf8",
  )

  await formatGeneratedFiles(outputDir)
}

if (process.argv[1] && path.resolve(process.argv[1]) === currentFilePath) {
  const outputDir = path.resolve(currentDir, "../src")

  await buildSystemOutput({
    outputDir,
  })
}
