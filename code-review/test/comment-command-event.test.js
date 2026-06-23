import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { readCodexReviewCommentCommand } from "../src/comment-command-event.js";

test("accepts only the configured GitHub user id and command on a pull request comment", () => {
  const eventPath = writeEvent({
    issue: {
      number: 12,
      pull_request: { url: "https://api.github.com/repos/owner/repo/pulls/12" }
    },
    comment: {
      body: "/codex review",
      user: { id: 1234, login: "jh" }
    },
    repository: { full_name: "owner/repo" }
  });

  assert.deepEqual(
    readCodexReviewCommentCommand({
      eventPath,
      allowedUserId: "1234"
    }),
    {
      owner: "owner",
      repo: "repo",
      repositoryFullName: "owner/repo",
      pullNumber: 12,
      commentAuthorId: 1234,
      command: "/codex review"
    }
  );
});

test("rejects comments from other GitHub user ids", () => {
  const eventPath = writeEvent({
    issue: {
      number: 12,
      pull_request: { url: "https://api.github.com/repos/owner/repo/pulls/12" }
    },
    comment: {
      body: "/codex review",
      user: { id: 9999, login: "other" }
    },
    repository: { full_name: "owner/repo" }
  });

  assert.throws(
    () => readCodexReviewCommentCommand({ eventPath, allowedUserId: "1234" }),
    /not allowed/
  );
});

test("rejects non-command comments and non-pull-request comments", () => {
  assert.throws(
    () =>
      readCodexReviewCommentCommand({
        eventPath: writeEvent({
          issue: {
            number: 12,
            pull_request: { url: "https://api.github.com/repos/owner/repo/pulls/12" }
          },
          comment: { body: "looks good", user: { id: 1234 } },
          repository: { full_name: "owner/repo" }
        }),
        allowedUserId: "1234"
      }),
    /not a codex review command/
  );

  assert.throws(
    () =>
      readCodexReviewCommentCommand({
        eventPath: writeEvent({
          issue: { number: 12 },
          comment: { body: "/codex review", user: { id: 1234 } },
          repository: { full_name: "owner/repo" }
        }),
        allowedUserId: "1234"
      }),
    /not on a pull request/
  );
});

function writeEvent(event) {
  const dir = mkdtempSync(join(tmpdir(), "code-review-comment-event-"));
  const eventPath = join(dir, "event.json");
  writeFileSync(eventPath, JSON.stringify(event));
  return eventPath;
}
