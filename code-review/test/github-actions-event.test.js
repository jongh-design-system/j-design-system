import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { readPullRequestRefsFromGitHubEvent } from "../src/github-actions-event.js"

test("reads pull request base and head refs from a GitHub Actions event file", () => {
  const dir = mkdtempSync(join(tmpdir(), "code-review-event-"))
  const eventPath = join(dir, "event.json")

  writeFileSync(
    eventPath,
    JSON.stringify({
      pull_request: {
        number: 42,
        base: {
          ref: "main",
          sha: "1111111111111111111111111111111111111111",
          repo: { full_name: "owner/repo" },
        },
        head: {
          ref: "feature/review",
          sha: "2222222222222222222222222222222222222222",
          repo: { full_name: "contributor/repo" },
        },
      },
    }),
  )

  assert.deepEqual(readPullRequestRefsFromGitHubEvent(eventPath), {
    pullNumber: 42,
    baseRef: "main",
    baseSha: "1111111111111111111111111111111111111111",
    baseRepo: "owner/repo",
    headRef: "feature/review",
    headSha: "2222222222222222222222222222222222222222",
    headRepo: "contributor/repo",
  })
})
