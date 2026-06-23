export function parseUnifiedDiffByFile(unifiedDiff) {
  if (!unifiedDiff || unifiedDiff.trim() === "") {
    return [];
  }

  return splitDiffIntoFilePatches(unifiedDiff)
    .map(parseFilePatch)
    .filter(Boolean);
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

function parseFilePatch(patch) {
  const lines = patch.split("\n");
  const header = parseDiffHeader(lines[0]);
  if (!header) {
    return null;
  }

  const renameFrom = findLineValue(lines, "rename from ");
  const renameTo = findLineValue(lines, "rename to ");
  const oldMarker = findLineValue(lines, "--- ");
  const newMarker = findLineValue(lines, "+++ ");
  const isBinary = lines.some(
    (line) => line.startsWith("Binary files ") || line === "GIT binary patch"
  );

  const status = getFileStatus(lines, oldMarker, newMarker, renameFrom, renameTo);
  const { additions, deletions } = countChangedLines(lines);
  const normalizedOldPath = normalizeDiffPath(renameFrom ?? oldMarker ?? header.oldPath);
  const normalizedNewPath = normalizeDiffPath(renameTo ?? newMarker ?? header.newPath);

  return {
    path: status === "removed" ? normalizedOldPath : normalizedNewPath ?? normalizedOldPath,
    oldPath: status === "added" ? undefined : normalizedOldPath,
    status,
    patch,
    additions,
    deletions,
    isBinary
  };
}

function parseDiffHeader(line) {
  const match = /^diff --git a\/(.+) b\/(.+)$/.exec(line);
  if (!match) {
    return null;
  }

  return {
    oldPath: match[1],
    newPath: match[2]
  };
}

function findLineValue(lines, prefix) {
  const line = lines.find((candidate) => candidate.startsWith(prefix));
  return line ? line.slice(prefix.length) : undefined;
}

function getFileStatus(lines, oldMarker, newMarker, renameFrom, renameTo) {
  if (renameFrom || renameTo) {
    return "renamed";
  }
  if (lines.some((line) => line.startsWith("new file mode ")) || oldMarker === "/dev/null") {
    return "added";
  }
  if (lines.some((line) => line.startsWith("deleted file mode ")) || newMarker === "/dev/null") {
    return "removed";
  }
  return "modified";
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

function normalizeDiffPath(path) {
  if (!path || path === "/dev/null") {
    return undefined;
  }
  if (path.startsWith("a/") || path.startsWith("b/")) {
    return path.slice(2);
  }
  return path;
}
