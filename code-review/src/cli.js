#!/usr/bin/env node

import { readPullRequestContextFromGitHubEvent } from "./github-actions-event.js"
import { readCommitsFromLocalGit } from "./git-commit-reader.js"
import { readFileDiffsFromLocalGit } from "./git-diff-reader.js"
import {
  keepCommentsOnReviewableLines,
  postPullRequestReview,
} from "./github-review.js"
import { filterReviewTargets } from "./review-targets.js"
import { buildReviewPackets } from "./review-packets.js"
import { runCodexReconcile, runCodexReviewPacket } from "./codex-runner.js"

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const repositoryPath =
    options.repo ?? process.env.GITHUB_WORKSPACE ?? process.cwd()
  const eventPath = options.event ?? process.env.GITHUB_EVENT_PATH
  const context = readPullRequestContextFromGitHubEvent(eventPath)
  const base =
    options.base ??
    context.pullRequest.baseSha ??
    `origin/${context.pullRequest.baseRef}`
  const head = options.head ?? context.pullRequest.headSha ?? "HEAD"
  const exclude = options.exclude ?? []

  const diff = readFileDiffsFromLocalGit({ repositoryPath, base, head })
  const commits = readCommitsFromLocalGit({ repositoryPath, base, head })
  const { reviewTargets, skippedFiles } = filterReviewTargets(diff.files, {
    exclude,
  })
  const packets = buildReviewPackets({
    pullRequest: context.pullRequest,
    commits,
    reviewTargets,
    skippedFiles,
  })

  if (options.dryRun) {
    process.stdout.write(`${JSON.stringify({ packets }, null, 2)}\n`)
    return
  }

  const results = []
  for (const packet of packets) {
    results.push(
      runCodexReviewPacket({
        packet,
        cwd: repositoryPath,
        skillName: options.skill ?? "code-judgment",
      }),
    )
  }

  const candidateComments = results.flatMap((result) =>
    result.comments.map((comment) => ({
      ...comment,
      unit_id: result.unit_id,
      unit_summary: result.summary,
    })),
  )

  const finalReview =
    candidateComments.length > 0
      ? runCodexReconcile({
          pullRequest: context.pullRequest,
          candidateComments,
          cwd: repositoryPath,
          skillName: options.skill ?? "code-judgment",
        })
      : { summary: "Codex found no review comments.", comments: [] }
  const reviewToPost = {
    ...finalReview,
    comments: keepCommentsOnReviewableLines({
      comments: finalReview.comments,
      files: reviewTargets,
    }),
  }

  if (options.noPost) {
    process.stdout.write(`${JSON.stringify(reviewToPost, null, 2)}\n`)
    return
  }

  const posted = await postPullRequestReview({
    token: process.env.GITHUB_TOKEN,
    owner: context.owner,
    repo: context.repo,
    pullNumber: context.pullRequest.number,
    summary: reviewToPost.summary,
    comments: reviewToPost.comments,
  })

  process.stdout.write(`${JSON.stringify(posted, null, 2)}\n`)
}

function parseArgs(args) {
  const options = { exclude: [] }
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    switch (arg) {
      case "--repo":
        options.repo = args[++index]
        break
      case "--event":
        options.event = args[++index]
        break
      case "--base":
        options.base = args[++index]
        break
      case "--head":
        options.head = args[++index]
        break
      case "--exclude":
        options.exclude.push(args[++index])
        break
      case "--skill":
        options.skill = args[++index]
        break
      case "--dry-run":
        options.dryRun = true
        break
      case "--no-post":
        options.noPost = true
        break
      default:
        throw new Error(`Unknown option: ${arg}`)
    }
  }
  return options
}

main().catch((error) => {
  console.error(error.stack ?? error.message)
  process.exitCode = 1
})
