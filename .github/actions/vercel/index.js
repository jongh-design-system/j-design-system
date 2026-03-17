#!/usr/bin/env node

import {
  debug,
  getInput,
  setFailed,
  setSecret,
  warning,
  setOutput,
  exportVariable,
} from "@actions/core"
import { execSync } from "node:child_process"
import { context, getOctokit } from "@actions/github"
import { existsSync } from "node:fs"

function readInputs() {
  try {
    return {
      vercelToken:
        process.env.VERCEL_TOKEN ||
        getInput("vercel-token", { required: true }),
      githubToken:
        process.env.ACTION_GITHUB_TOKEN ||
        getInput("github-token", { required: true }),
      vercelOrgId:
        process.env.VERCEL_ORG_ID ||
        getInput("vercel-org-id", { required: true }),
      vercelProjectId:
        process.env.VERCEL_PROJECT_ID ||
        getInput("vercel-project-id", { required: true }),
      vercelArgs:
        process.env.VERCEL_ARGS || getInput("vercel-args") || "--prod",
      workingDir:
        process.env.WORKING_DIR || getInput("workingDir", { required: true }),
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

const shq = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`

async function main() {
  const inputs = readInputs()
  const octokit = getOctokit(inputs.githubToken)

  setSecret(inputs.vercelToken)
  setSecret(inputs.githubToken)
  setSecret(inputs.vercelOrgId)
  setSecret(inputs.vercelProjectId)

  exportVariable("VERCEL_ORG_ID", inputs.vercelOrgId)
  exportVariable("VERCEL_PROJECT_ID", inputs.vercelProjectId)

  let commitOrg = context.repo.owner
  let commitRepo = context.repo.repo
  let sha = context.sha
  let ref = context.ref
  let commitMessage = ""

  try {
    commitMessage = execSync("git log -1 --pretty=format:%B").toString().trim()
  } catch (error) {
    warning(
      `Failed to read commit message from git history: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  if (context.eventName?.startsWith("pull_request")) {
    const pullRequestPayload = context.payload
    const pr =
      pullRequestPayload.pull_request || pullRequestPayload.pull_request_target
    if (pr?.head) {
      ref = pr.head.ref
      sha = pr.head.sha
      if (pr.head.repo) {
        commitOrg = pr.head.repo.owner.login
        commitRepo = pr.head.repo.name
      } else {
        warning("PR head repository not accessible, using base repository info")
      }
      debug(`PR head ref: ${ref}`)
      debug(`PR head sha: ${sha}`)
      debug(`PR commit org: ${commitOrg}`)
      debug(`PR commit repo: ${commitRepo}`)
    }
  } else if (context.eventName === "release") {
    const tagName = context.payload.release?.tag_name
    ref = tagName ? `refs/tags/${tagName}` : ref
    debug(`Release ref: ${ref}`)
  }

  if (sha) {
    try {
      const { data: commitData } = await octokit.rest.git.getCommit({
        owner: commitOrg,
        repo: commitRepo,
        commit_sha: sha,
      })
      commitMessage = commitData.message
      debug(`Commit message from API: ${commitMessage}`)
    } catch (error) {
      warning(
        `Failed to fetch commit via API: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  debug(`Resolved ref: ${ref}`)
  debug(`Resolved sha: ${sha}`)
  debug(`Resolved commit message: ${commitMessage}`)

  const refShort = ref?.replace("refs/heads/", "")
  const metaArgs = [
    `-m githubDeployment=1`,
    `-m githubOrg=${shq(context.repo.owner)}`,
    `-m githubRepo=${shq(context.repo.repo)}`,
    sha ? `-m githubCommitSha=${shq(sha)}` : "",
    refShort ? `-m githubCommitRef=${shq(refShort)}` : "",
    commitMessage ? `-m githubCommitMessage=${shq(commitMessage)}` : "",
  ]
    .filter(Boolean)
    .join(" ")

  const cwd = inputs.workingDir

  if (!existsSync(cwd)) {
    setFailed(`deployment-path not found: ${cwd}`)
    return
  }

  const cmd = `npx vercel ${inputs.vercelArgs} -t ${shq(inputs.vercelToken)} --yes ${metaArgs}`
  debug(`Run: ${cmd.replaceAll(inputs.vercelToken, "***")}`)

  let deployStdout = ""
  try {
    deployStdout = execSync(cmd, { stdio: "pipe", encoding: "utf8" })
  } catch (e) {
    setFailed(e instanceof Error ? e.message : String(e))
    return
  }

  const urlMatches = deployStdout.match(/https?:\/\/[^\s]+/g) || []
  const deploymentUrl = urlMatches.at(-1) || ""
  if (!deploymentUrl) {
    setFailed("Deployment URL not found in Vercel output")
    return
  }
  setOutput("preview-url", deploymentUrl)

  const inspectCmd = `npx vercel inspect ${shq(deploymentUrl)} -t ${shq(inputs.vercelToken)}`
  debug(`Run: ${inspectCmd.replaceAll(inputs.vercelToken, "***")}`)

  try {
    const inspectOut = execSync(inspectCmd, { stdio: "pipe", encoding: "utf8" })
    const m = inspectOut.match(/^\s*name\s+(.+)$/m)
    const previewName = m?.[1]?.trim() || ""
    if (previewName) setOutput("preview-name", previewName)
    else warning("Failed to parse deployment name from inspect output")
  } catch (e) {
    warning(
      `vercel inspect failed: ${e instanceof Error ? e.message : String(e)}`,
    )
  }
}

try {
  await main()
} catch (error) {
  setFailed(error instanceof Error ? error.message : String(error))
}
