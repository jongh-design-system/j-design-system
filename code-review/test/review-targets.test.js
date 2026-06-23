import assert from "node:assert/strict";
import test from "node:test";

import { filterReviewTargets } from "../src/review-targets.js";

test("keeps files unless they are explicitly excluded or unsafe to review", () => {
  const files = [
    file("src/app.ts"),
    file("src/old.ts", { status: "removed" }),
    file("assets/logo.png", { isBinary: true }),
    file("package-lock.json"),
    file("dist/app.js"),
    file("README.md"),
    file("README.txt"),
    file("src/huge.ts", { patch: "x".repeat(101) })
  ];

  assert.deepEqual(filterReviewTargets(files, { maxPatchBytes: 100 }), {
    reviewTargets: [file("src/app.ts"), file("README.txt")],
    skippedFiles: [
      skipped("src/old.ts", "removed"),
      skipped("assets/logo.png", "binary"),
      skipped("package-lock.json", "excluded-by-default"),
      skipped("dist/app.js", "excluded-by-default"),
      skipped("README.md", "excluded-by-default"),
      skipped("src/huge.ts", "too-large")
    ]
  });
});

test("applies user exclude globs after normalizing file paths", () => {
  const files = [
    file("src/app.ts"),
    file("./src//generated/types.ts"),
    file("package-lock.json")
  ];

  assert.deepEqual(
    filterReviewTargets(files, {
      include: ["package-lock.json"],
      exclude: ["src/generated/**"]
    }),
    {
      reviewTargets: [file("src/app.ts")],
      skippedFiles: [
        skipped("src/generated/types.ts", "excluded-by-user"),
        skipped("package-lock.json", "excluded-by-default")
      ]
    }
  );
});

test("does not treat include globs or extensions as review allowlists", () => {
  const files = [file("src/app.ts"), file("docs/guide.md"), file("script")];

  assert.deepEqual(filterReviewTargets(files, { include: ["src/**"] }), {
    reviewTargets: [file("src/app.ts"), file("script")],
    skippedFiles: [skipped("docs/guide.md", "excluded-by-default")]
  });
});

function file(path, overrides = {}) {
  return {
    path,
    oldPath: path,
    status: "modified",
    patch: `diff --git a/${path} b/${path}`,
    additions: 1,
    deletions: 0,
    isBinary: false,
    ...overrides
  };
}

function skipped(path, reason) {
  return {
    path,
    reason
  };
}
