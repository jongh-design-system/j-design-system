export function parseUnifiedDiffPatches(unifiedDiff) {
  if (!unifiedDiff || unifiedDiff.trim() === "") {
    return [];
  }

  return splitDiffIntoFilePatches(unifiedDiff).map((patch) => {
    const lines = patch.split("\n");
    return {
      patch,
      ...countChangedLines(lines),
      isBinary: lines.some((line) => line.startsWith("Binary files ") || line === "GIT binary patch")
    };
  });
}

function splitDiffIntoFilePatches(unifiedDiff) {
  const lines = unifiedDiff.replaceAll("\r\n", "\n").split("\n");
  const patches = [];
  let current = [];

  for (const line of lines) {
    if (line.startsWith("diff --git ")) {
      if (current.length > 0) {
        patches.push(trimTrailingBlankLines(current).join("\n"));
      }
      current = [line];
      continue;
    }

    if (current.length > 0) {
      current.push(line);
    }
  }

  if (current.length > 0) {
    patches.push(trimTrailingBlankLines(current).join("\n"));
  }

  return patches;
}

function trimTrailingBlankLines(lines) {
  const trimmed = [...lines];
  while (trimmed.length > 0 && trimmed.at(-1) === "") {
    trimmed.pop();
  }
  return trimmed;
}

function countChangedLines(lines) {
  let additions = 0;
  let deletions = 0;
  let inHunk = false;

  for (const line of lines) {
    if (line.startsWith("@@ ")) {
      inHunk = true;
      continue;
    }
    if (!inHunk) {
      continue;
    }
    if (line.startsWith("+") && !line.startsWith("+++")) {
      additions += 1;
    } else if (line.startsWith("-") && !line.startsWith("---")) {
      deletions += 1;
    }
  }

  return { additions, deletions };
}
