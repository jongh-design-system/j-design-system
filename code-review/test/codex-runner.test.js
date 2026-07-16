import assert from "node:assert/strict"
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { runCodexReviewPacket } from "../src/codex-runner.js"

test("does not pass GitHub credentials to the Codex subprocess", () => {
  const dir = mkdtempSync(join(tmpdir(), "codex-runner-test-"))
  const commandPath = join(dir, "fake-codex.js")
  const previousGithubToken = process.env.GITHUB_TOKEN
  const previousAuthSecret = process.env.CODEX_AUTH_JSON_B64

  process.env.GITHUB_TOKEN = "github-token"
  process.env.CODEX_AUTH_JSON_B64 = "codex-auth-secret"

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
        "}));",
      ].join("\n"),
    )
    chmodSync(commandPath, 0o755)

    const result = runCodexReviewPacket({
      codexCommand: commandPath,
      cwd: dir,
      packet: {
        unit_id: "commit-123",
        pull_request: { number: 1, title: "test", body: "" },
        commits: [],
        changed_files: [],
        skipped_files: [],
      },
    })

    assert.equal(result.summary, "clean")
  } finally {
    if (previousGithubToken === undefined) {
      delete process.env.GITHUB_TOKEN
    } else {
      process.env.GITHUB_TOKEN = previousGithubToken
    }
    if (previousAuthSecret === undefined) {
      delete process.env.CODEX_AUTH_JSON_B64
    } else {
      process.env.CODEX_AUTH_JSON_B64 = previousAuthSecret
    }
    rmSync(dir, { recursive: true, force: true })
  }
})

test("injects local skill files into the Codex prompt and logs which files were used", () => {
  const dir = mkdtempSync(join(tmpdir(), "codex-runner-skill-test-"))
  const commandPath = join(dir, "fake-codex.js")
  const promptPath = join(dir, "prompt.txt")
  const eventLogDir = join(dir, "codex-events")
  const skillDir = join(dir, ".agents", "skills", "code-judgment")

  try {
    mkdirSync(join(skillDir, "principles"), { recursive: true })
    writeFileSync(
      join(skillDir, "SKILL.md"),
      "# Code Judgment\n\nUse direct correctness judgment.",
    )
    writeFileSync(
      join(skillDir, "principles", "indirection.md"),
      "# Indirection\n\nAvoid needless wrappers.",
    )
    writeFileSync(
      commandPath,
      [
        "#!/usr/bin/env node",
        'import { readFileSync, writeFileSync } from "node:fs";',
        'const outputPath = process.argv[process.argv.indexOf("-o") + 1];',
        'const input = readFileSync(0, "utf8");',
        `writeFileSync(${JSON.stringify(promptPath)}, input);`,
        'console.log(JSON.stringify({ type: "turn.completed", usage: { input_tokens: 1 } }));',
        "writeFileSync(outputPath, JSON.stringify({",
        '  unit_id: "commit-123",',
        '  summary: "clean",',
        "  comments: []",
        "}));",
      ].join("\n"),
    )
    chmodSync(commandPath, 0o755)

    runCodexReviewPacket({
      codexCommand: commandPath,
      cwd: dir,
      eventLogDir,
      packet: {
        unit_id: "commit-123",
        pull_request: { number: 1, title: "test", body: "" },
        commits: [],
        changed_files: [],
        skipped_files: [],
      },
    })

    const prompt = readFileSync(promptPath, "utf8")
    assert.match(prompt, /<skill_context>/)
    assert.match(prompt, /Use direct correctness judgment/)
    assert.match(prompt, /Avoid needless wrappers/)
    assert.deepEqual(
      JSON.parse(readFileSync(join(eventLogDir, "skill-context.json"), "utf8")),
      {
        skillName: "code-judgment",
        files: [
          ".agents/skills/code-judgment/SKILL.md",
          ".agents/skills/code-judgment/principles/indirection.md",
        ],
      },
    )
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("writes Codex JSONL events and token usage when an event log directory is provided", () => {
  const dir = mkdtempSync(join(tmpdir(), "codex-runner-events-test-"))
  const commandPath = join(dir, "fake-codex.js")
  const eventLogDir = join(dir, "codex-events")

  try {
    writeFileSync(
      commandPath,
      [
        "#!/usr/bin/env node",
        'import { writeFileSync } from "node:fs";',
        'const outputPath = process.argv[process.argv.indexOf("-o") + 1];',
        'if (process.argv.includes("--json")) {',
        '  console.log(JSON.stringify({ type: "turn.completed", usage: { input_tokens: 10, cached_input_tokens: 2, output_tokens: 3, reasoning_output_tokens: 1 } }));',
        "}",
        "writeFileSync(outputPath, JSON.stringify({",
        '  unit_id: "commit-123",',
        '  summary: "clean",',
        "  comments: []",
        "}));",
      ].join("\n"),
    )
    chmodSync(commandPath, 0o755)

    runCodexReviewPacket({
      codexCommand: commandPath,
      cwd: dir,
      eventLogDir,
      packet: {
        unit_id: "commit-123",
        pull_request: { number: 1, title: "test", body: "" },
        commits: [],
        changed_files: [],
        skipped_files: [],
      },
    })

    assert.match(
      readFileSync(join(eventLogDir, "review-commit-123.events.jsonl"), "utf8"),
      /"type":"turn.completed"/,
    )
    assert.deepEqual(
      JSON.parse(
        readFileSync(join(eventLogDir, "review-commit-123.usage.json"), "utf8"),
      ),
      {
        run: "review-commit-123",
        usage: {
          input_tokens: 10,
          cached_input_tokens: 2,
          output_tokens: 3,
          reasoning_output_tokens: 1,
        },
      },
    )
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
