import assert from "node:assert/strict"
import test from "node:test"

import { parseUnifiedDiffPatches } from "../src/unified-diff-parser.js"

test("splits a unified diff into patches with line counts", () => {
  const diff = [
    "diff --git a/src/a.js b/src/a.js",
    "index 1111111..2222222 100644",
    "--- a/src/a.js",
    "+++ b/src/a.js",
    "@@ -1,3 +1,4 @@",
    " const keep = true;",
    "-const oldName = user.name;",
    "+const name = user?.name;",
    "+const enabled = true;",
    " export { name };",
    "diff --git a/src/b.js b/src/b.js",
    "new file mode 100644",
    "index 0000000..3333333",
    "--- /dev/null",
    "+++ b/src/b.js",
    "@@ -0,0 +1,2 @@",
    "+export const value = 1;",
    "+export const ready = true;",
    "",
  ].join("\n")

  assert.deepEqual(parseUnifiedDiffPatches(diff), [
    {
      patch: [
        "diff --git a/src/a.js b/src/a.js",
        "index 1111111..2222222 100644",
        "--- a/src/a.js",
        "+++ b/src/a.js",
        "@@ -1,3 +1,4 @@",
        " const keep = true;",
        "-const oldName = user.name;",
        "+const name = user?.name;",
        "+const enabled = true;",
        " export { name };",
      ].join("\n"),
      additions: 2,
      deletions: 1,
      isBinary: false,
    },
    {
      patch: [
        "diff --git a/src/b.js b/src/b.js",
        "new file mode 100644",
        "index 0000000..3333333",
        "--- /dev/null",
        "+++ b/src/b.js",
        "@@ -0,0 +1,2 @@",
        "+export const value = 1;",
        "+export const ready = true;",
      ].join("\n"),
      additions: 2,
      deletions: 0,
      isBinary: false,
    },
  ])
})

test("keeps deleted file patches without reading their paths", () => {
  const diff = [
    "diff --git a/src/removed.js b/src/removed.js",
    "deleted file mode 100644",
    "index 4444444..0000000",
    "--- a/src/removed.js",
    "+++ /dev/null",
    "@@ -1,2 +0,0 @@",
    "-export const removed = true;",
    "-export const gone = true;",
    "",
  ].join("\n")

  assert.deepEqual(parseUnifiedDiffPatches(diff), [
    {
      patch: [
        "diff --git a/src/removed.js b/src/removed.js",
        "deleted file mode 100644",
        "index 4444444..0000000",
        "--- a/src/removed.js",
        "+++ /dev/null",
        "@@ -1,2 +0,0 @@",
        "-export const removed = true;",
        "-export const gone = true;",
      ].join("\n"),
      additions: 0,
      deletions: 2,
      isBinary: false,
    },
  ])
})

test("keeps quoted git diff paths as patch text only", () => {
  const diff = [
    'diff --git "a/src/caf\\303\\251\\t\\"old\\".js" "b/src/caf\\303\\251\\t\\"new\\".js"',
    'rename from "src/caf\\303\\251\\t\\"old\\".js"',
    'rename to "src/caf\\303\\251\\t\\"new\\".js"',
    '--- "a/src/caf\\303\\251\\t\\"old\\".js"',
    '+++ "b/src/caf\\303\\251\\t\\"new\\".js"',
    "@@ -1 +1 @@",
    "-export const value = 'old';",
    "+export const value = 'new';",
  ].join("\n")

  assert.deepEqual(parseUnifiedDiffPatches(diff), [
    {
      patch: diff,
      additions: 1,
      deletions: 1,
      isBinary: false,
    },
  ])
})
