import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { readFileDiffsFromLocalGit } from "../src/git-diff-reader.js"

test("reads file diffs from local git using the merge-base of base and head", () => {
  const repo = mkdtempSync(join(tmpdir(), "code-review-git-"))
  git(repo, "init", "-b", "main")
  git(repo, "config", "user.email", "review@example.com")
  git(repo, "config", "user.name", "Review Bot")

  writeFileSync(join(repo, "app.js"), "export const value = 1;\n")
  git(repo, "add", ".")
  git(repo, "commit", "-m", "base")

  git(repo, "checkout", "-b", "feature")
  writeFileSync(
    join(repo, "app.js"),
    "export const value = 2;\nexport const ready = true;\n",
  )
  writeFileSync(join(repo, "new.js"), "export const created = true;\n")
  git(repo, "add", ".")
  git(repo, "commit", "-m", "feature")

  const result = readFileDiffsFromLocalGit({
    repositoryPath: repo,
    base: "main",
    head: "HEAD",
  })

  assert.match(result.mergeBase, /^[0-9a-f]{40}$/)
  assert.equal(result.files.length, 2)
  assert.deepEqual(
    result.files.map((file) => ({
      path: file.path,
      oldPath: file.oldPath,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      isBinary: file.isBinary,
    })),
    [
      {
        path: "app.js",
        oldPath: "app.js",
        status: "modified",
        additions: 2,
        deletions: 1,
        isBinary: false,
      },
      {
        path: "new.js",
        oldPath: undefined,
        status: "added",
        additions: 1,
        deletions: 0,
        isBinary: false,
      },
    ],
  )
})

test("reads quoted file paths from git name-status output", () => {
  const repo = mkdtempSync(join(tmpdir(), "code-review-git-"))
  git(repo, "init", "-b", "main")
  git(repo, "config", "user.email", "review@example.com")
  git(repo, "config", "user.name", "Review Bot")

  mkdirSync(join(repo, "src"), { recursive: true })
  const oldPath = 'src/café\t"old".js'
  const newPath = 'src/café\t"new".js'
  writeFileSync(
    join(repo, oldPath),
    "export const stable = true;\nexport const value = 'old';\n",
  )
  git(repo, "add", ".")
  git(repo, "commit", "-m", "base")

  git(repo, "checkout", "-b", "feature")
  git(repo, "mv", oldPath, newPath)
  writeFileSync(
    join(repo, newPath),
    "export const stable = true;\nexport const value = 'new';\n",
  )
  git(repo, "add", ".")
  git(repo, "commit", "-m", "rename quoted path")

  const result = readFileDiffsFromLocalGit({
    repositoryPath: repo,
    base: "main",
    head: "HEAD",
  })

  assert.deepEqual(
    result.files.map((file) => ({
      path: file.path,
      oldPath: file.oldPath,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      isBinary: file.isBinary,
    })),
    [
      {
        path: newPath,
        oldPath,
        status: "renamed",
        additions: 1,
        deletions: 1,
        isBinary: false,
      },
    ],
  )
})

function git(cwd, ...args) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
}
