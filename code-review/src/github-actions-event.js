import { readFileSync } from "node:fs"

export function readPullRequestRefsFromGitHubEvent(eventPath) {
  if (!eventPath) {
    throw new Error("eventPath is required")
  }

  const event = JSON.parse(readFileSync(eventPath, "utf8"))
  const pullRequest = event.pull_request
  if (!pullRequest) {
    throw new Error("GitHub event does not contain pull_request data")
  }

  return {
    pullNumber: pullRequest.number,
    baseRef: pullRequest.base?.ref,
    baseSha: pullRequest.base?.sha,
    baseRepo: pullRequest.base?.repo?.full_name,
    headRef: pullRequest.head?.ref,
    headSha: pullRequest.head?.sha,
    headRepo: pullRequest.head?.repo?.full_name,
  }
}

export function readPullRequestContextFromGitHubEvent(eventPath) {
  if (!eventPath) {
    throw new Error("eventPath is required")
  }

  const event = JSON.parse(readFileSync(eventPath, "utf8"))
  const pullRequest = event.pull_request
  if (!pullRequest) {
    throw new Error("GitHub event does not contain pull_request data")
  }

  const [owner, repo] = (event.repository?.full_name ?? "").split("/")

  return {
    owner,
    repo,
    repositoryFullName: event.repository?.full_name,
    pullRequest: {
      number: pullRequest.number,
      title: pullRequest.title ?? "",
      body: pullRequest.body ?? "",
      baseRef: pullRequest.base?.ref,
      baseSha: pullRequest.base?.sha,
      headRef: pullRequest.head?.ref,
      headSha: pullRequest.head?.sha,
    },
  }
}
