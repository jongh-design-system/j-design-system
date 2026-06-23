import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPullRequestReviewRequest,
  buildReviewPackets,
  keepCommentsOnReviewableLines,
  parseUnifiedDiffByFile,
  filterReviewTargets,
  readCommitsFromLocalGit,
  readFileDiffsFromLocalGit,
  readPullRequestContextFromGitHubEvent,
  readPullRequestRefsFromGitHubEvent,
  runCodexReconcile,
  runCodexReviewPacket
} from "../src/index.js";

test("exports the review pipeline modules", () => {
  assert.equal(typeof buildPullRequestReviewRequest, "function");
  assert.equal(typeof buildReviewPackets, "function");
  assert.equal(typeof keepCommentsOnReviewableLines, "function");
  assert.equal(typeof parseUnifiedDiffByFile, "function");
  assert.equal(typeof filterReviewTargets, "function");
  assert.equal(typeof readCommitsFromLocalGit, "function");
  assert.equal(typeof readFileDiffsFromLocalGit, "function");
  assert.equal(typeof readPullRequestContextFromGitHubEvent, "function");
  assert.equal(typeof readPullRequestRefsFromGitHubEvent, "function");
  assert.equal(typeof runCodexReconcile, "function");
  assert.equal(typeof runCodexReviewPacket, "function");
});
