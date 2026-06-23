import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { formatReconcilePrompt, formatReviewPrompt } from "./review-packets.js";

const REVIEW_OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    unit_id: { type: "string" },
    summary: { type: "string" },
    comments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          path: { type: "string" },
          line: { type: "integer" },
          body: { type: "string" },
          severity: { type: "string", enum: ["P0", "P1", "P2"] }
        },
        required: ["path", "line", "body", "severity"],
        additionalProperties: false
      }
    }
  },
  required: ["unit_id", "summary", "comments"],
  additionalProperties: false
};

const RECONCILE_OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    comments: REVIEW_OUTPUT_SCHEMA.properties.comments
  },
  required: ["summary", "comments"],
  additionalProperties: false
};

export function runCodexReviewPacket({
  packet,
  cwd,
  skillName = "code-judgment",
  codexCommand = "codex",
  env = process.env
}) {
  return runCodexStructuredOutput({
    codexCommand,
    cwd,
    env,
    prompt: formatReviewPrompt({ packet, skillName }),
    schema: REVIEW_OUTPUT_SCHEMA
  });
}

export function runCodexReconcile({
  pullRequest,
  candidateComments,
  cwd,
  skillName = "code-judgment",
  codexCommand = "codex",
  env = process.env
}) {
  return runCodexStructuredOutput({
    codexCommand,
    cwd,
    env,
    prompt: formatReconcilePrompt({ pullRequest, candidateComments, skillName }),
    schema: RECONCILE_OUTPUT_SCHEMA
  });
}

function runCodexStructuredOutput({ codexCommand, cwd, env, prompt, schema }) {
  const dir = mkdtempSync(join(tmpdir(), "code-review-codex-"));
  const schemaPath = join(dir, "schema.json");
  const outputPath = join(dir, "output.json");

  try {
    writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

    const result = spawnSync(
      codexCommand,
      [
        "--sandbox",
        "read-only",
        "--ask-for-approval",
        "never",
        "exec",
        "--ephemeral",
        "--output-schema",
        schemaPath,
        "-o",
        outputPath,
        "Review the packet provided on stdin."
      ],
      {
        cwd,
        env: buildCodexEnvironment(env),
        input: prompt,
        encoding: "utf8",
        maxBuffer: 100 * 1024 * 1024
      }
    );

    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || `codex exited with status ${result.status}`);
    }

    return JSON.parse(readFileSync(outputPath, "utf8"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function buildCodexEnvironment(env) {
  const allowedKeys = [
    "CI",
    "CODEX_ACCESS_TOKEN",
    "CODEX_HOME",
    "HOME",
    "HTTPS_PROXY",
    "HTTP_PROXY",
    "LANG",
    "LC_ALL",
    "LC_CTYPE",
    "NO_PROXY",
    "PATH",
    "SHELL",
    "SSL_CERT_FILE",
    "TEMP",
    "TMP",
    "TMPDIR",
    "USER"
  ];
  const codexEnv = {};

  for (const key of allowedKeys) {
    if (env[key] !== undefined) {
      codexEnv[key] = env[key];
    }
  }

  return codexEnv;
}
