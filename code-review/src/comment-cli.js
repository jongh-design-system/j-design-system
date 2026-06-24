#!/usr/bin/env node

import { readCodexReviewCommentCommand } from "./comment-command-event.js";
import { readPullRequestReviewDataFromGitHub } from "./github-api-reader.js";
import { keepCommentsOnReviewableLines, postPullRequestReview } from "./github-review.js";
import { filterReviewTargets } from "./review-targets.js";
import { buildReviewPackets } from "./review-packets.js";
import { runCodexReconcile, runCodexReviewPacket } from "./codex-runner.js";

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const eventPath = options.event ?? process.env.GITHUB_EVENT_PATH;
  const eventLogDir = options.eventLogDir ?? process.env.CODEX_REVIEW_EVENT_LOG_DIR;
  const allowedUserId = options.allowedUserId ?? process.env.CODEX_REVIEW_ALLOWED_USER_ID;
  const command = readCodexReviewCommentCommand({
    eventPath,
    allowedUserId,
    command: options.command ?? "/codex review"
  });
  const reviewData = await readPullRequestReviewDataFromGitHub({
    token: process.env.GITHUB_TOKEN,
    owner: command.owner,
    repo: command.repo,
    pullNumber: command.pullNumber
  });
  const { reviewTargets, skippedFiles } = filterReviewTargets(reviewData.files, {
    exclude: options.exclude ?? []
  });
  const packets = buildReviewPackets({
    pullRequest: reviewData.pullRequest,
    commits: reviewData.commits,
    reviewTargets,
    skippedFiles
  });

  if (options.dryRun) {
    process.stdout.write(`${JSON.stringify({ command, packets }, null, 2)}\n`);
    return;
  }

  const results = [];
  for (const packet of packets) {
    results.push(
      runCodexReviewPacket({
        packet,
        cwd: process.cwd(),
        eventLogDir,
        skillName: options.skill ?? "code-judgment"
      })
    );
  }

  const candidateComments = results.flatMap((result) =>
    result.comments.map((comment) => ({
      ...comment,
      unit_id: result.unit_id,
      unit_summary: result.summary
    }))
  );
  const finalReview =
    candidateComments.length > 0
      ? runCodexReconcile({
          pullRequest: reviewData.pullRequest,
          candidateComments,
          cwd: process.cwd(),
          eventLogDir,
          skillName: options.skill ?? "code-judgment"
        })
      : { summary: "Codex found no review comments.", comments: [] };
  const reviewToPost = {
    ...finalReview,
    comments: keepCommentsOnReviewableLines({
      comments: finalReview.comments,
      files: reviewTargets
    })
  };

  if (options.noPost) {
    process.stdout.write(`${JSON.stringify(reviewToPost, null, 2)}\n`);
    return;
  }

  const posted = await postPullRequestReview({
    token: process.env.GITHUB_TOKEN,
    owner: command.owner,
    repo: command.repo,
    pullNumber: command.pullNumber,
    summary: reviewToPost.summary,
    comments: reviewToPost.comments
  });

  process.stdout.write(`${JSON.stringify(posted, null, 2)}\n`);
}

function parseArgs(args) {
  const options = { exclude: [] };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    switch (arg) {
      case "--event":
        options.event = args[++index];
        break;
      case "--allowed-user-id":
        options.allowedUserId = args[++index];
        break;
      case "--command":
        options.command = args[++index];
        break;
      case "--exclude":
        options.exclude.push(args[++index]);
        break;
      case "--event-log-dir":
        options.eventLogDir = args[++index];
        break;
      case "--skill":
        options.skill = args[++index];
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--no-post":
        options.noPost = true;
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

main().catch((error) => {
  console.error(error.stack ?? error.message);
  process.exitCode = 1;
});
