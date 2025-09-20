#!/usr/bin/env node

const core = require('@actions/core');

function readInputs() {
  try {
    return {
      vercelToken: core.getInput('vercel-token', { required: true }),
      githubToken: core.getInput('github-token', { required: true }),
      vercelOrgId: core.getInput('vercel-org-id', { required: true }),
      vercelProjectId: core.getInput('vercel-project-id', { required: true }),
      vercelArgs: core.getInput('vercel-args') || '--prod',
    };
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function main() {
  const inputs = readInputs();

  core.setSecret(inputs.vercelToken);
  core.setSecret(inputs.githubToken);
  core.setSecret(inputs.vercelOrgId);
  core.setSecret(inputs.vercelProjectId);

  // TODO: Implement real deployment logic here.
}

main();
