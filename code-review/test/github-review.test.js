import assert from "node:assert/strict"
import test from "node:test"

import {
  buildPullRequestReviewRequest,
  keepCommentsOnReviewableLines,
  postPullRequestReview,
} from "../src/github-review.js"

test("builds a GitHub pull request review request from Codex comments", () => {
  const request = buildPullRequestReviewRequest({
    owner: "octo",
    repo: "repo",
    pullNumber: 12,
    summary: "Found one issue.",
    comments: [
      {
        path: "src/auth.ts",
        line: 42,
        body: "This misses the empty token case.",
        severity: "P1",
      },
    ],
  })

  assert.deepEqual(request, {
    url: "https://api.github.com/repos/octo/repo/pulls/12/reviews",
    body: {
      event: "COMMENT",
      body: "Found one issue.",
      comments: [
        {
          path: "src/auth.ts",
          line: 42,
          side: "RIGHT",
          body: "[P1] This misses the empty token case.",
        },
      ],
    },
  })
})

test("keeps only comments that point at right-side lines in the final patch", () => {
  const comments = keepCommentsOnReviewableLines({
    comments: [
      { path: "src/auth.ts", line: 10, body: "context line", severity: "P2" },
      { path: "src/auth.ts", line: 11, body: "added line", severity: "P1" },
      { path: "src/auth.ts", line: 9, body: "removed line", severity: "P1" },
      { path: "src/missing.ts", line: 1, body: "missing file", severity: "P1" },
    ],
    files: [
      {
        path: "src/auth.ts",
        patch: [
          "diff --git a/src/auth.ts b/src/auth.ts",
          "--- a/src/auth.ts",
          "+++ b/src/auth.ts",
          "@@ -9,2 +10,3 @@",
          " const keep = true;",
          "-const expired = false;",
          "+const expired = true;",
          "+const refreshed = true;",
        ].join("\n"),
      },
    ],
  })

  assert.deepEqual(comments, [
    { path: "src/auth.ts", line: 10, body: "context line", severity: "P2" },
    { path: "src/auth.ts", line: 11, body: "added line", severity: "P1" },
  ])
})

test("retries transient GitHub review post failures", async () => {
  const previousFetch = globalThis.fetch
  let attempts = 0

  globalThis.fetch = async () => {
    attempts += 1
    if (attempts === 1) {
      throw new TypeError("fetch failed")
    }
    return {
      ok: true,
      json: async () => ({ id: 123 }),
    }
  }

  try {
    const result = await postPullRequestReview({
      token: "token",
      owner: "octo",
      repo: "repo",
      pullNumber: 12,
      summary: "Found one issue.",
      comments: [
        { path: "src/auth.ts", line: 42, body: "Bug.", severity: "P1" },
      ],
      retryDelayMs: 0,
    })

    assert.deepEqual(result, { id: 123 })
    assert.equal(attempts, 2)
  } finally {
    globalThis.fetch = previousFetch
  }
})
