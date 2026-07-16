import assert from "node:assert/strict"
import test from "node:test"

import { readPullRequestReviewDataFromGitHub } from "../src/github-api-reader.js"

test("reads pull request review data from GitHub API without a local checkout", async () => {
  const previousFetch = globalThis.fetch
  const requests = []

  globalThis.fetch = async (url, options) => {
    requests.push({ url, authorization: options.headers.authorization })

    if (url === "https://api.github.com/repos/owner/repo/pulls/12") {
      return jsonResponse({
        number: 12,
        title: "Fix auth",
        body: "Handle expired tokens",
        base: { ref: "dev", sha: "base-sha" },
        head: { ref: "feature/auth", sha: "head-sha" },
      })
    }
    if (
      url ===
      "https://api.github.com/repos/owner/repo/pulls/12/files?per_page=100&page=1"
    ) {
      return jsonResponse([
        {
          filename: "src/auth.ts",
          status: "modified",
          additions: 2,
          deletions: 1,
          patch: "@@ -1 +1,2 @@\n-old\n+new\n+next",
        },
        {
          filename: "src/new-auth.ts",
          previous_filename: "src/old-auth.ts",
          status: "renamed",
          additions: 1,
          deletions: 1,
          patch: "@@ -1 +1 @@\n-old\n+new",
        },
      ])
    }
    if (
      url ===
      "https://api.github.com/repos/owner/repo/pulls/12/commits?per_page=100&page=1"
    ) {
      return jsonResponse([
        { sha: "abc123", commit: { message: "Fix auth\n\nBody" } },
      ])
    }
    if (url === "https://api.github.com/repos/owner/repo/commits/abc123") {
      return jsonResponse({
        commit: { message: "Fix auth\n\nBody" },
        files: [
          { filename: "src/auth.ts" },
          { filename: "src/new-auth.ts", previous_filename: "src/old-auth.ts" },
        ],
      })
    }

    throw new Error(`Unexpected request: ${url}`)
  }

  try {
    const result = await readPullRequestReviewDataFromGitHub({
      token: "token",
      owner: "owner",
      repo: "repo",
      pullNumber: 12,
    })

    assert.deepEqual(result, {
      pullRequest: {
        number: 12,
        title: "Fix auth",
        body: "Handle expired tokens",
        baseRef: "dev",
        baseSha: "base-sha",
        headRef: "feature/auth",
        headSha: "head-sha",
      },
      files: [
        {
          path: "src/auth.ts",
          oldPath: "src/auth.ts",
          status: "modified",
          patch: "@@ -1 +1,2 @@\n-old\n+new\n+next",
          additions: 2,
          deletions: 1,
          isBinary: false,
        },
        {
          path: "src/new-auth.ts",
          oldPath: "src/old-auth.ts",
          status: "renamed",
          patch: "@@ -1 +1 @@\n-old\n+new",
          additions: 1,
          deletions: 1,
          isBinary: false,
        },
      ],
      commits: [
        {
          sha: "abc123",
          subject: "Fix auth",
          body: "Body",
          touchedFiles: ["src/auth.ts", "src/new-auth.ts", "src/old-auth.ts"],
        },
      ],
    })
    assert.ok(
      requests.every((request) => request.authorization === "Bearer token"),
    )
  } finally {
    globalThis.fetch = previousFetch
  }
})

function jsonResponse(body) {
  return {
    ok: true,
    json: async () => body,
  }
}
