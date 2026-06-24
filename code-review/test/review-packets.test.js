import assert from "node:assert/strict";
import test from "node:test";

import { buildReviewPackets, formatReviewPrompt } from "../src/review-packets.js";

test("builds one Codex review packet per commit group using final PR patches", () => {
  const packets = buildReviewPackets({
    pullRequest: {
      number: 7,
      title: "Fix expired session crash",
      body: "Hotfix only. Do not refactor unrelated auth code."
    },
    commits: [
      {
        sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        subject: "fix(auth): handle expired session",
        body: "",
        touchedFiles: ["src/auth.ts"]
      },
      {
        sha: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        subject: "docs: update readme",
        body: "",
        touchedFiles: ["README.md"]
      }
    ],
    reviewTargets: [
      file("src/auth.ts", "diff --git a/src/auth.ts b/src/auth.ts\n@@ -1 +1 @@\n-export const ok = false;\n+export const ok = true;"),
      file("src/other.ts", "diff --git a/src/other.ts b/src/other.ts\n@@ -1 +1 @@\n-export const value = 1;\n+export const value = 2;")
    ],
    skippedFiles: [{ path: "README.md", reason: "excluded-by-default" }]
  });

  assert.equal(packets.length, 1);
  assert.deepEqual(packets[0], {
    unit_id: "commit-aaaaaaaaaaaa",
    pull_request: {
      number: 7,
      title: "Fix expired session crash",
      body: "Hotfix only. Do not refactor unrelated auth code."
    },
    commits: [
      {
        sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        subject: "fix(auth): handle expired session",
        body: "",
        touchedFiles: ["src/auth.ts"]
      }
    ],
    changed_files: [
      {
        path: "src/auth.ts",
        oldPath: "src/auth.ts",
        status: "modified",
        additions: 1,
        deletions: 1,
        final_pr_patch: "diff --git a/src/auth.ts b/src/auth.ts\n@@ -1 +1 @@\n-export const ok = false;\n+export const ok = true;"
      }
    ],
    skipped_files: [{ path: "README.md", reason: "excluded-by-default" }]
  });
});

test("formats a prompt that explicitly invokes the code-judgment skill", () => {
  const prompt = formatReviewPrompt({
    skillName: "code-judgment",
    packet: {
      unit_id: "commit-aaaaaaaaaaaa",
      pull_request: { number: 7, title: "Fix", body: "Hotfix only" },
      commits: [],
      changed_files: [],
      skipped_files: []
    }
  });

  assert.match(prompt, /Use the \$code-judgment skill/);
  assert.match(prompt, /Follow the skill's own routing instructions/);
  assert.match(prompt, /<review_packet>/);
  assert.match(prompt, /"unit_id": "commit-aaaaaaaaaaaa"/);
});

function file(path, patch) {
  return {
    path,
    oldPath: path,
    status: "modified",
    patch,
    additions: 1,
    deletions: 1,
    isBinary: false
  };
}
