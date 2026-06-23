import { execFileSync } from "node:child_process";

import { parseUnifiedDiffByFile } from "./unified-diff-parser.js";

export function readFileDiffsFromLocalGit({
  repositoryPath,
  base,
  head = "HEAD",
  contextLines = 3
}) {
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
  const unifiedDiff = runGit(repositoryPath, [
    "diff",
    "--no-ext-diff",
    "--no-textconv",
    "--find-renames",
    "--no-color",
    `-U${contextLines}`,
    "--end-of-options",
    mergeBase,
    head,
    "--"
  ]);

  return {
    mergeBase,
    unifiedDiff,
    files: parseUnifiedDiffByFile(unifiedDiff)
  };
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
