import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { readCommitsFromLocalGit } from "../src/git-commit-reader.js"

test("reads commits with the files each commit touched", () => {
  const repo = mkdtempSync(join(tmpdir(), "code-review-commits-"))
  git(repo, "init", "-b", "main")
  git(repo, "config", "user.email", "review@example.com")
  git(repo, "config", "user.name", "Review Bot")

  writeFileSync(join(repo, "base.js"), "export const base = true;\n")
  git(repo, "add", ".")
  git(repo, "commit", "-m", "base")

  git(repo, "checkout", "-b", "feature")
  writeFileSync(join(repo, "auth.js"), "export const auth = 1;\n")
  git(repo, "add", ".")
  git(repo, "commit", "-m", "fix(auth): handle expired session")

  writeFileSync(join(repo, "auth.test.js"), "export const covered = true;\n")
  git(repo, "add", ".")
  git(repo, "commit", "-m", "test(auth): cover expired session")

  const commits = readCommitsFromLocalGit({
    repositoryPath: repo,
    base: "main",
    head: "HEAD",
  })

  assert.deepEqual(
    commits.map((commit) => ({
      subject: commit.subject,
      touchedFiles: commit.touchedFiles,
    })),
    [
      {
        subject: "fix(auth): handle expired session",
        touchedFiles: ["auth.js"],
      },
      {
        subject: "test(auth): cover expired session",
        touchedFiles: ["auth.test.js"],
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
