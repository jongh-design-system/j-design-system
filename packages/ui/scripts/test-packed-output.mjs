import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const uiPackageDir = path.resolve(scriptDir, "..")
const repoRoot = path.resolve(uiPackageDir, "../..")
const systemOutputDir = path.join(repoRoot, "packages/new/system-output")
const packedOutputRoot = path.join(uiPackageDir, ".tmp/packed-output")
const packedPackageDir = path.join(packedOutputRoot, "package")

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: "inherit",
    })

    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(`${command} ${args.join(" ")} failed with exit code ${code}`),
      )
    })

    child.on("error", reject)
  })
}

await fs.rm(packedOutputRoot, {
  force: true,
  recursive: true,
})
await fs.mkdir(packedOutputRoot, {
  recursive: true,
})

// This test is intentionally driven from a packed artifact, not the workspace
// package, so Storybook consumes the same file layout a published install would.
await run("pnpm", ["build"], systemOutputDir)
await run(
  "pnpm",
  ["pack", "--pack-destination", packedOutputRoot],
  systemOutputDir,
)

const tarballName = (await fs.readdir(packedOutputRoot)).find((entry) =>
  entry.endsWith(".tgz"),
)

if (!tarballName) {
  throw new Error("Packed output tarball was not created")
}

await fs.mkdir(packedPackageDir, {
  recursive: true,
})

// The Vitest command reads PACKED_NEW_SYSTEM_OUTPUT_DIR and aliases imports
// into this extracted package directory.
await run(
  "tar",
  [
    "-xzf",
    path.join(packedOutputRoot, tarballName),
    "-C",
    packedPackageDir,
    "--strip-components",
    "1",
  ],
  repoRoot,
)
