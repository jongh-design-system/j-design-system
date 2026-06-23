import { matchesGlob, posix as posixPath } from "node:path"

const DEFAULT_EXCLUDE_PATTERNS = [
  "node_modules/**",
  "vendor/**",
  "dist/**",
  "build/**",
  "coverage/**",
  ".next/**",
  "out/**",
  "**/*.min.js",
  "**/*.min.css",
  "**/*.md",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
]

export function filterReviewTargets(files, options = {}) {
  const userExclude = compilePatterns(options.exclude ?? [])
  const defaultExclude = compilePatterns(
    options.defaultExclude ?? DEFAULT_EXCLUDE_PATTERNS,
  )
  const maxPatchBytes = options.maxPatchBytes ?? Number.POSITIVE_INFINITY

  const reviewTargets = []
  const skippedFiles = []

  for (const file of files) {
    const normalizedFile = {
      ...file,
      path: posixPath.normalize(file.path),
      oldPath: file.oldPath ? posixPath.normalize(file.oldPath) : file.oldPath,
    }
    let reason

    switch (true) {
      case normalizedFile.isBinary:
        reason = "binary"
        break
      case normalizedFile.status === "removed":
        reason = "removed"
        break
      case Buffer.byteLength(normalizedFile.patch ?? "", "utf8") > maxPatchBytes:
        reason = "too-large"
        break
      case userExclude.some((matches) => matches(normalizedFile.path)):
        reason = "excluded-by-user"
        break
      case defaultExclude.some((matches) => matches(normalizedFile.path)):
        reason = "excluded-by-default"
        break
      default:
        reason = undefined
    }

    if (reason) {
      skippedFiles.push({
        path: normalizedFile.path,
        reason,
      })
      continue
    }

    reviewTargets.push(normalizedFile)
  }

  return { reviewTargets, skippedFiles }
}

function compilePatterns(patterns) {
  return patterns
    .filter(Boolean)
    .map((pattern) => pattern.trim())
    .filter(Boolean)
    .map((pattern) => posixPath.normalize(pattern))
    .map((pattern) => (path) => matchesGlob(path, pattern))
}
