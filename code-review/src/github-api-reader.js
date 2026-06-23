export async function readPullRequestReviewDataFromGitHub({ token, owner, repo, pullNumber }) {
  if (!token) {
    throw new Error("GitHub token is required");
  }
  if (!owner) {
    throw new Error("owner is required");
  }
  if (!repo) {
    throw new Error("repo is required");
  }
  if (!pullNumber) {
    throw new Error("pullNumber is required");
  }

  const pullRequest = await githubJson({
    token,
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`
  });
  const files = await readPullRequestFiles({ token, owner, repo, pullNumber });
  const commits = await readPullRequestCommits({ token, owner, repo, pullNumber });

  return {
    pullRequest: {
      number: pullRequest.number,
      title: pullRequest.title ?? "",
      body: pullRequest.body ?? "",
      baseRef: pullRequest.base?.ref,
      baseSha: pullRequest.base?.sha,
      headRef: pullRequest.head?.ref,
      headSha: pullRequest.head?.sha
    },
    files,
    commits
  };
}

async function readPullRequestFiles({ token, owner, repo, pullNumber }) {
  const files = await githubPaginatedJson({
    token,
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`
  });

  return files.map((file) => ({
    path: file.filename,
    oldPath: file.status === "added" ? undefined : file.previous_filename ?? file.filename,
    status: normalizeFileStatus(file.status),
    patch: file.patch ?? "",
    additions: file.additions ?? 0,
    deletions: file.deletions ?? 0,
    isBinary: !file.patch
  }));
}

async function readPullRequestCommits({ token, owner, repo, pullNumber }) {
  const commits = await githubPaginatedJson({
    token,
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits`
  });
  const result = [];

  for (const commit of commits) {
    const detail = await githubJson({
      token,
      url: `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`
    });
    const message = detail.commit?.message ?? commit.commit?.message ?? "";
    const [subject = "", ...bodyLines] = message.split("\n");

    result.push({
      sha: commit.sha,
      subject,
      body: bodyLines.join("\n").trim(),
      touchedFiles: touchedFilesFromCommit(detail.files ?? [])
    });
  }

  return result;
}

function normalizeFileStatus(status) {
  switch (status) {
    case "added":
      return "added";
    case "removed":
      return "removed";
    case "renamed":
      return "renamed";
    default:
      return "modified";
  }
}

function touchedFilesFromCommit(files) {
  return [
    ...new Set(files.flatMap((file) => [file.filename, file.previous_filename].filter(Boolean)))
  ].sort();
}

async function githubPaginatedJson({ token, url }) {
  const results = [];
  let page = 1;

  while (true) {
    const pageItems = await githubJson({
      token,
      url: `${url}?per_page=100&page=${page}`
    });
    results.push(...pageItems);
    if (pageItems.length < 100) {
      return results;
    }
    page += 1;
  }
}

async function githubJson({ token, url }) {
  const response = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub request failed: ${response.status} ${body}`);
  }

  return response.json();
}
