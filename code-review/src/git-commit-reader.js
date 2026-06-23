import { execFileSync } from "node:child_process";

export function readCommitsFromLocalGit({ repositoryPath, base, head = "HEAD" }) {
  if (!repositoryPath) {
    throw new Error("repositoryPath is required");
  }
  if (!base) {
    throw new Error("base is required");
  }
  if (!head) {
    throw new Error("head is required");
  }

  const mergeBase = runGit(repositoryPath, ["merge-base", "--", base, head]).trim();
  const log = runGit(repositoryPath, [
    "log",
    "--reverse",
    "--format=%H%x00%s%x00%b%x1e",
    `${mergeBase}..${head}`
  ]);

  return log
    .split("\x1e")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [sha, subject, body = ""] = entry.split("\x00");
      return {
        sha,
        subject,
        body: body.trim(),
        touchedFiles: readTouchedFiles(repositoryPath, sha)
      };
    });
}

function readTouchedFiles(repositoryPath, sha) {
  return runGit(repositoryPath, [
    "diff-tree",
    "--no-commit-id",
    "--name-only",
    "-r",
    "--root",
    sha
  ])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .sort();
}

function runGit(cwd, args) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      maxBuffer: 100 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"]
    });
  } catch (error) {
    const stderr = error.stderr?.toString().trim();
    const command = `git ${args.join(" ")}`;
    throw new Error(stderr ? `${command}: ${stderr}` : `${command} failed`);
  }
}
