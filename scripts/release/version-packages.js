import applyReleasePlan from "@changesets/apply-release-plan"
import assembleReleasePlan from "@changesets/assemble-release-plan"
import { read as readConfig } from "@changesets/config"
import readChangesets from "@changesets/read"
import { getPackages } from "@manypkg/get-packages"

import { nextDateVersion } from "./date-version.js"

const repositoryRoot = process.cwd()
const packages = await getPackages(repositoryRoot)
const config = await readConfig(repositoryRoot, packages)
const changesets = await readChangesets(repositoryRoot)
const releasePlan = assembleReleasePlan(changesets, packages, config, undefined)

if (releasePlan.changesets.length === 0 || releasePlan.releases.length === 0) {
  throw new Error("Date versioning requires at least one non-empty Changeset")
}

const dateParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date())
const dateFields = Object.fromEntries(
  dateParts.map((part) => [part.type, part.value]),
)
const date = `${dateFields.year}${dateFields.month}${dateFields.day}`

// Changesets가 계산한 배포 대상과 호환성 수준은 유지하고, 버전 숫자만 날짜 규칙으로 교체한다.
for (const release of releasePlan.releases) {
  if (release.type === "none") continue

  const response = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(release.name)}`,
  )
  if (response.status === 404) {
    release.newVersion = nextDateVersion({
      latestVersion: release.oldVersion,
      publishedVersions: [],
      releaseType: release.type,
      date,
    })
    continue
  }
  if (!response.ok) {
    throw new Error(
      `npm registry returned ${response.status} while versioning ${release.name}`,
    )
  }

  const metadata = await response.json()
  const latestVersion = metadata["dist-tags"]?.latest
  if (!latestVersion || !metadata.versions) {
    throw new Error(`${release.name} registry metadata has no latest version`)
  }

  release.newVersion = nextDateVersion({
    latestVersion,
    publishedVersions: Object.keys(metadata.versions),
    releaseType: release.type,
    date,
  })
}

await applyReleasePlan(releasePlan, packages, config)

console.table(
  releasePlan.releases
    .filter((release) => release.type !== "none")
    .map((release) => ({
      package: release.name,
      type: release.type,
      version: release.newVersion,
    })),
)
