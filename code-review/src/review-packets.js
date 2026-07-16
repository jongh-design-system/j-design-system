export function buildReviewPackets({
  pullRequest,
  commits,
  reviewTargets,
  skippedFiles = [],
}) {
  const targetByPath = new Map()
  for (const file of reviewTargets) {
    targetByPath.set(file.path, file)
    if (file.oldPath) {
      targetByPath.set(file.oldPath, file)
    }
  }

  return commits
    .map((commit) => {
      const touched = new Set(commit.touchedFiles)
      const changedFiles = [...touched]
        .map((path) => targetByPath.get(path))
        .filter(Boolean)
        .filter(
          (file, index, files) =>
            files.findIndex((candidate) => candidate.path === file.path) ===
            index,
        )
        .map(toPacketFile)

      if (changedFiles.length === 0) {
        return null
      }

      return {
        unit_id: `commit-${commit.sha.slice(0, 12)}`,
        pull_request: {
          number: pullRequest.number,
          title: pullRequest.title,
          body: pullRequest.body ?? "",
        },
        commits: [commit],
        changed_files: changedFiles,
        skipped_files: skippedFiles,
      }
    })
    .filter(Boolean)
}

export function formatReviewPrompt({
  packet,
  skillName = "code-judgment",
  skillContext,
}) {
  return `${formatSkillContextPrompt({ skillName, skillContext })}

You are reviewing one commit-scoped change group from a pull request.
Use the pull request title and body as the author's declared intent and constraints.

Review requirements:
- Judge the code in the context of the PR intent.
- Find correctness, regression, missing test, incomplete integration, maintainability, security, data, or performance issues introduced by this change group.
- Do not produce generic lint-style feedback.
- Only comment on lines present in final_pr_patch.
- Return JSON only.

<review_packet>
${JSON.stringify(packet, null, 2)}
</review_packet>`
}

export function formatReconcilePrompt({
  pullRequest,
  candidateComments,
  skillName = "code-judgment",
  skillContext,
}) {
  return `${formatSkillContextPrompt({ skillName, skillContext })}

Remove comments that are generic, duplicated, not tied to the PR intent, not actionable, or not important enough to post.

<pull_request>
${JSON.stringify(pullRequest, null, 2)}
</pull_request>

<candidate_comments>
${JSON.stringify(candidateComments, null, 2)}
</candidate_comments>

Return JSON only.`
}

function formatSkillContextPrompt({ skillName, skillContext }) {
  if (!skillContext) {
    return `Use the $${skillName} skill.

Follow the skill's own routing instructions for any extra files.`
  }

  return `Use the ${skillName} review guidance provided in <skill_context>.
Do not read skill files from disk; the local skill files needed for this review are already included below.

<skill_context>
${skillContext}
</skill_context>`
}

function toPacketFile(file) {
  return {
    path: file.path,
    oldPath: file.oldPath,
    status: file.status,
    additions: file.additions,
    deletions: file.deletions,
    final_pr_patch: file.patch,
  }
}
