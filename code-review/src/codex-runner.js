import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from "node:fs";
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
  eventLogDir,
  env = process.env
}) {
  const skillContext = readLocalSkillContext({ cwd, skillName });

  if (eventLogDir && skillContext) {
    writeSkillContextLog({ dir: eventLogDir, skillContext });
  }

  return runCodexStructuredOutput({
    codexCommand,
    cwd,
    eventLogDir,
    env,
    prompt: formatReviewPrompt({ packet, skillName, skillContext: skillContext?.text }),
    runName: `review-${packet.unit_id}`,
    schema: REVIEW_OUTPUT_SCHEMA
  });
}

export function runCodexReconcile({
  pullRequest,
  candidateComments,
  cwd,
  skillName = "code-judgment",
  codexCommand = "codex",
  eventLogDir,
  env = process.env
}) {
  const skillContext = readLocalSkillContext({ cwd, skillName });

  if (eventLogDir && skillContext) {
    writeSkillContextLog({ dir: eventLogDir, skillContext });
  }

  return runCodexStructuredOutput({
    codexCommand,
    cwd,
    eventLogDir,
    env,
    prompt: formatReconcilePrompt({
      pullRequest,
      candidateComments,
      skillName,
      skillContext: skillContext?.text
    }),
    runName: "reconcile",
    schema: RECONCILE_OUTPUT_SCHEMA
  });
}

function runCodexStructuredOutput({ codexCommand, cwd, eventLogDir, env, prompt, runName, schema }) {
  const dir = mkdtempSync(join(tmpdir(), "code-review-codex-"));
  const schemaPath = join(dir, "schema.json");
  const outputPath = join(dir, "output.json");
  const codexArgs = [
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
  ];

  if (eventLogDir) {
    codexArgs.splice(5, 0, "--json");
  }

  try {
    writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

    const result = spawnSync(codexCommand, codexArgs, {
      cwd,
      env: buildCodexEnvironment(env),
      input: prompt,
      encoding: "utf8",
      maxBuffer: 100 * 1024 * 1024
    });

    if (result.error) {
      throw result.error;
    }
    if (eventLogDir) {
      writeCodexEventLogs({
        dir: eventLogDir,
        runName,
        stdout: result.stdout
      });
    }
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || `codex exited with status ${result.status}`);
    }

    return JSON.parse(readFileSync(outputPath, "utf8"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function writeCodexEventLogs({ dir, runName, stdout }) {
  const safeRunName = runName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const eventLogPath = join(dir, `${safeRunName}.events.jsonl`);
  const usagePath = join(dir, `${safeRunName}.usage.json`);
  const usage = readLastUsage(stdout);

  mkdirSync(dir, { recursive: true });
  writeFileSync(eventLogPath, stdout);
  writeFileSync(
    usagePath,
    `${JSON.stringify(
      {
        run: safeRunName,
        usage
      },
      null,
      2
    )}\n`
  );
}

function writeSkillContextLog({ dir, skillContext }) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "skill-context.json"),
    `${JSON.stringify(
      {
        skillName: skillContext.skillName,
        files: skillContext.files
      },
      null,
      2
    )}\n`
  );
}

function readLocalSkillContext({ cwd, skillName }) {
  const skillDir = join(cwd, ".agents", "skills", skillName);
  const files = [];

  addSkillFile({ files, cwd, path: join(skillDir, "SKILL.md") });
  const principlesDir = join(skillDir, "principles");
  if (existsSync(principlesDir)) {
    for (const entry of readdirSync(principlesDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        addSkillFile({ files, cwd, path: join(principlesDir, entry.name) });
      }
    }
  }

  if (files.length === 0) {
    return null;
  }

  files.sort((left, right) => Number(!left.relativePath.endsWith("/SKILL.md")) - Number(!right.relativePath.endsWith("/SKILL.md")) || left.relativePath.localeCompare(right.relativePath));

  return {
    skillName,
    files: files.map((file) => file.relativePath),
    text: files
      .map(
        (file) => `--- skill file: ${file.relativePath} ---
${file.content}`
      )
      .join("\n\n")
  };
}

function addSkillFile({ files, cwd, path }) {
  if (!existsSync(path)) {
    return;
  }
  files.push({
    relativePath: path.slice(cwd.length + 1).replaceAll("\\", "/"),
    content: readFileSync(path, "utf8")
  });
}

function readLastUsage(stdout) {
  let usage = null;
  for (const line of stdout.split("\n")) {
    if (!line.trim()) {
      continue;
    }
    try {
      const event = JSON.parse(line);
      if (event.usage) {
        usage = event.usage;
      }
    } catch {
      // Keep raw JSONL intact even if Codex prints a non-JSON diagnostic line.
    }
  }
  return usage;
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
