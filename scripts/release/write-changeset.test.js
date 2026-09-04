import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

test("a Changeset includes only packages changed by the current PR", () => {
  const fixture = mkdtempSync(join(tmpdir(), "jds-release-"))
  mkdirSync(join(fixture, ".changeset"))
  const comparisonPath = join(fixture, "comparison.json")
  const notePath = join(fixture, "note.json")
  writeFileSync(
    comparisonPath,
    JSON.stringify({
      schemaVersion: 1,
      packages: [
        { name: "@jongh/cli", changed: true },
        { name: "@jongh/ui", changed: true },
      ],
    }),
  )
  writeFileSync(
    notePath,
    JSON.stringify({
      pullRequest: 207,
      releases: [{ name: "@jongh/ui", type: "minor" }],
      summary: "Loads component CSS only when its component is imported.",
    }),
  )

  execFileSync(
    process.execPath,
    [
      new URL("./write-changeset.js", import.meta.url).pathname,
      fixture,
      comparisonPath,
      notePath,
      "207",
    ],
    { stdio: "pipe" },
  )

  assert.match(
    readFileSync(join(fixture, ".changeset/pr-207.md"), "utf8"),
    /"@jongh\/ui": minor/,
  )
  assert.doesNotMatch(
    readFileSync(join(fixture, ".changeset/pr-207.md"), "utf8"),
    /"@jongh\/cli"/,
  )
})

test("an empty release list does not write a Changeset", () => {
  const fixture = mkdtempSync(join(tmpdir(), "jds-release-"))
  mkdirSync(join(fixture, ".changeset"))
  const comparisonPath = join(fixture, "comparison.json")
  const notePath = join(fixture, "note.json")
  writeFileSync(
    comparisonPath,
    JSON.stringify({
      schemaVersion: 1,
      packages: [{ name: "@jongh/ui", changed: true }],
    }),
  )
  writeFileSync(
    notePath,
    JSON.stringify({
      pullRequest: 208,
      releases: [],
      summary: "No published package change.",
    }),
  )

  execFileSync(
    process.execPath,
    [
      new URL("./write-changeset.js", import.meta.url).pathname,
      fixture,
      comparisonPath,
      notePath,
      "208",
    ],
    { stdio: "pipe" },
  )

  assert.equal(existsSync(join(fixture, ".changeset/pr-208.md")), false)
})

test("a Changeset cannot include a package that matches npm", () => {
  const fixture = mkdtempSync(join(tmpdir(), "jds-release-"))
  mkdirSync(join(fixture, ".changeset"))
  const comparisonPath = join(fixture, "comparison.json")
  const notePath = join(fixture, "note.json")
  writeFileSync(
    comparisonPath,
    JSON.stringify({
      schemaVersion: 1,
      packages: [{ name: "@jongh/ui", changed: false }],
    }),
  )
  writeFileSync(
    notePath,
    JSON.stringify({
      pullRequest: 209,
      releases: [{ name: "@jongh/ui", type: "patch" }],
      summary: "Republishes the package.",
    }),
  )

  const result = spawnSync(
    process.execPath,
    [
      new URL("./write-changeset.js", import.meta.url).pathname,
      fixture,
      comparisonPath,
      notePath,
      "209",
    ],
    { encoding: "utf8" },
  )
  assert.equal(result.status, 1)
  assert.match(result.stderr, /matches npm and is not a release target/)
})
