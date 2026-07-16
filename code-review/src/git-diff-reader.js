import { execFileSync } from "node:child_process"

import { parseUnifiedDiffPatches } from "./unified-diff-parser.js"

export function readFileDiffsFromLocalGit({
  repositoryPath,
  base,
  head = "HEAD",
  contextLines = 3,
}) {
  if (!repositoryPath) {
    throw new Error("repositoryPath is required")
  }
  if (!base) {
    throw new Error("base is required")
  }
  if (!head) {
    throw new Error("head is required")
  }

  const mergeBase = runGit(repositoryPath, [
    "merge-base",
    "--",
    base,
    head,
  ]).trim()
  const changedFiles = readChangedFiles(repositoryPath, mergeBase, head)
  const unifiedDiff = runGit(repositoryPath, [
    "diff",
    "--no-ext-diff",
    "--no-textconv",
    "--find-renames",
    "--no-color",
    `-U${contextLines}`,
    "--end-of-options",
    mergeBase,
    head,
    "--",
  ])

  const patches = parseUnifiedDiffPatches(unifiedDiff)
  if (changedFiles.length !== patches.length) {
    throw new Error(
      `git diff file count mismatch: name-status returned ${changedFiles.length}, unified diff returned ${patches.length}`,
    )
  }

  return {
    mergeBase,
    unifiedDiff,
    files: changedFiles.map((file, index) => ({
      ...file,
      ...patches[index],
    })),
  }
}

function readChangedFiles(repositoryPath, base, head) {
  const output = runGit(repositoryPath, [
    "diff",
    "--name-status",
    "-z",
    "--no-ext-diff",
    "--no-textconv",
    "--find-renames",
    "--end-of-options",
    base,
    head,
    "--",
  ])
  const tokens = output.split("\0").filter(Boolean)
  const files = []

  for (let index = 0; index < tokens.length; ) {
    const statusToken = tokens[index++]
    const statusCode = statusToken[0]

    switch (statusCode) {
      case "A": {
        files.push({
          path: tokens[index++],
          oldPath: undefined,
          status: "added",
        })
        break
      }
      case "D": {
        const path = tokens[index++]
        files.push({ path, oldPath: path, status: "removed" })
        break
      }
      case "R": {
        const oldPath = tokens[index++]
        const path = tokens[index++]
        files.push({ path, oldPath, status: "renamed" })
        break
      }
      default: {
        const path = tokens[index++]
        files.push({ path, oldPath: path, status: "modified" })
      }
    }
  }

  return files
}

function runGit(cwd, args) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      maxBuffer: 100 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (error) {
    const stderr = error.stderr?.toString().trim()
    const command = `git ${args.join(" ")}`
    throw new Error(stderr ? `${command}: ${stderr}` : `${command} failed`)
  }
}
