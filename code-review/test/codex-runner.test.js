import assert from "node:assert/strict";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { runCodexReviewPacket } from "../src/codex-runner.js";

test("does not pass GitHub credentials to the Codex subprocess", () => {
  const dir = mkdtempSync(join(tmpdir(), "codex-runner-test-"));
  const commandPath = join(dir, "fake-codex.js");
  const previousGithubToken = process.env.GITHUB_TOKEN;
  const previousAuthSecret = process.env.CODEX_AUTH_JSON_B64;

  process.env.GITHUB_TOKEN = "github-token";
  process.env.CODEX_AUTH_JSON_B64 = "codex-auth-secret";

  try {
    writeFileSync(
      commandPath,
      [
        "#!/usr/bin/env node",
        'import { writeFileSync } from "node:fs";',
        'const outputPath = process.argv[process.argv.indexOf("-o") + 1];',
        "writeFileSync(outputPath, JSON.stringify({",
        '  unit_id: "commit-123",',
        '  summary: process.env.GITHUB_TOKEN || process.env.CODEX_AUTH_JSON_B64 ? "leaked" : "clean",',
        "  comments: []",
        "}));"
      ].join("\n")
    );
    chmodSync(commandPath, 0o755);

    const result = runCodexReviewPacket({
      codexCommand: commandPath,
      cwd: dir,
      packet: {
        unit_id: "commit-123",
        pull_request: { number: 1, title: "test", body: "" },
        commits: [],
        changed_files: [],
        skipped_files: []
      }
    });

    assert.equal(result.summary, "clean");
  } finally {
    if (previousGithubToken === undefined) {
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = previousGithubToken;
    }
    if (previousAuthSecret === undefined) {
      delete process.env.CODEX_AUTH_JSON_B64;
    } else {
      process.env.CODEX_AUTH_JSON_B64 = previousAuthSecret;
    }
    rmSync(dir, { recursive: true, force: true });
  }
});
