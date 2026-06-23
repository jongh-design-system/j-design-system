export function buildPullRequestReviewRequest({ owner, repo, pullNumber, summary, comments }) {
  return {
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
    body: {
      event: "COMMENT",
      body: summary,
      comments: comments.map((comment) => ({
        path: comment.path,
        line: comment.line,
        side: "LEFT",
        body: `[${comment.severity}] ${comment.body}`
      }))
    }
  };
}

export function keepCommentsOnReviewableLines({ comments, files }) {
  const linesByPath = new Map();
  for (const file of files) {
    linesByPath.set(file.path, reviewableLinesFromPatch(file.patch));
  }

  return comments.filter((comment) => linesByPath.get(comment.path)?.has(comment.line));
}

export async function postPullRequestReview({ token, owner, repo, pullNumber, summary, comments }) {
  if (!token) {
    throw new Error("GitHub token is required");
  }
  if (comments.length === 0) {
    return { skipped: true, reason: "no-comments" };
  }

  const request = buildPullRequestReviewRequest({ owner, repo, pullNumber, summary, comments });
  const response = await fetch(request.url, {
    method: "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28"
    },
    body: JSON.stringify(request.body)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub review request failed: ${response.status} ${body}`);
  }

  return response.json();
}

function reviewableLinesFromPatch(patch) {
  const lines = new Set();
  let nextLine

  for (const line of (patch ?? "").split("\n")) {
    if (line.startsWith("@@ ")) {
      const match = /\+(\d+)(?:,\d+)?/.exec(line);
      nextLine = match ? Number(match[1]) : undefined;
      continue;
    }
    if (nextLine === undefined || line.startsWith("\\ No newline")) {
      continue;
    }
    if (line.startsWith("-") && !line.startsWith("---")) {
      continue;
    }
    if (line.startsWith("+") && !line.startsWith("+++")) {
      lines.add(nextLine);
      nextLine += 1;
      continue;
    }
    if (line.startsWith(" ")) {
      lines.add(nextLine);
      nextLine += 1;
    }
  }

  return lines;
}
