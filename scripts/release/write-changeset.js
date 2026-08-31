import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const repositoryRoot = resolve(process.argv[2] ?? process.cwd())
const comparisonPath = resolve(process.argv[3] ?? "package-comparison.json")
const notePath = resolve(process.argv[4] ?? "changeset.json")
const pullRequest = Number(process.argv[5])

if (!Number.isSafeInteger(pullRequest) || pullRequest <= 0) {
  throw new Error("A positive pull request number is required")
}

const comparison = JSON.parse(readFileSync(comparisonPath, "utf8"))
const note = JSON.parse(readFileSync(notePath, "utf8"))

if (comparison.schemaVersion !== 1 || !Array.isArray(comparison.packages)) {
  throw new Error("The package comparison has an unsupported format")
}
if (note.pullRequest !== pullRequest || !Array.isArray(note.releases)) {
  throw new Error(`The Changeset draft must describe PR #${pullRequest}`)
}
if (typeof note.summary !== "string" || note.summary.trim() === "") {
  throw new Error("The Changeset summary must be a non-empty string")
}

// 무결성이 달라진 패키지는 빠질 수 없다. 동일한 패키지는 force 라벨이 있을 때만 추가할 수 있다.
const knownPackages = new Set(comparison.packages.map((pkg) => pkg.name))
const changedPackages = new Set(
  comparison.packages.filter((pkg) => pkg.changed).map((pkg) => pkg.name),
)
const selectedPackages = new Set()

for (const release of note.releases) {
  if (!release || typeof release !== "object") {
    throw new Error("Every release must be an object")
  }
  if (!knownPackages.has(release.name)) {
    throw new Error(
      `The Changeset draft contains unknown package ${release.name}`,
    )
  }
  if (selectedPackages.has(release.name)) {
    throw new Error(`The Changeset draft repeats ${release.name}`)
  }
  if (!["major", "minor", "patch"].includes(release.type)) {
    throw new Error(`${release.name} has invalid release type ${release.type}`)
  }
  if (!comparison.forceRelease && !changedPackages.has(release.name)) {
    throw new Error(
      `${release.name} matches npm and requires the release:force label`,
    )
  }
  selectedPackages.add(release.name)
}

for (const name of changedPackages) {
  if (!selectedPackages.has(name)) {
    throw new Error(`The Changeset draft omitted changed package ${name}`)
  }
}
if (selectedPackages.size === 0) {
  throw new Error("The Changeset draft must contain at least one package")
}

const releases = [...note.releases].sort((left, right) =>
  left.name.localeCompare(right.name),
)
const changesetDirectory = join(repositoryRoot, ".changeset")
mkdirSync(changesetDirectory, { recursive: true })
writeFileSync(
  join(changesetDirectory, `pr-${pullRequest}.md`),
  [
    "---",
    ...releases.map(
      (release) => `${JSON.stringify(release.name)}: ${release.type}`,
    ),
    "---",
    "",
    note.summary.trim(),
    "",
  ].join("\n"),
)
