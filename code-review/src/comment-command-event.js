import { readFileSync } from "node:fs"

export function readCodexReviewCommentCommand({
  eventPath,
  allowedUserId,
  command = "/codex review",
}) {
  if (!eventPath) {
    throw new Error("eventPath is required")
  }

  const allowedId = Number(allowedUserId)
  if (!Number.isSafeInteger(allowedId)) {
    throw new Error("allowedUserId is required")
  }

  const event = JSON.parse(readFileSync(eventPath, "utf8"))
  if (!event.issue?.pull_request) {
    throw new Error("comment is not on a pull request")
  }
  if (event.comment?.body?.trim() !== command) {
    throw new Error("comment is not a codex review command")
  }
  if (event.comment?.user?.id !== allowedId) {
    throw new Error("comment author is not allowed")
  }

  const [owner, repo] = (event.repository?.full_name ?? "").split("/")
  if (!owner || !repo) {
    throw new Error("repository full_name is required")
  }

  return {
    owner,
    repo,
    repositoryFullName: event.repository.full_name,
    pullNumber: event.issue.number,
    commentAuthorId: event.comment.user.id,
    command,
  }
}
