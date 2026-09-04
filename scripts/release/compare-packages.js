import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import {
  appendFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"

const repositoryRoot = resolve(process.argv[2] ?? process.cwd())
const outputPath = resolve(
  process.argv[3] ??
    join(repositoryRoot, ".release-work/package-comparison.json"),
)

// 공개 workspace를 찾는다. 패키지 이름과 경로를 별도 매핑으로 관리하지 않는다.
const packages = []
for (const entry of readdirSync(join(repositoryRoot, "packages"), {
  withFileTypes: true,
})) {
  if (!entry.isDirectory()) continue

  const path = join(repositoryRoot, "packages", entry.name)
  const manifest = JSON.parse(readFileSync(join(path, "package.json"), "utf8"))
  if (manifest.private === true || !manifest.name) continue

  packages.push({ name: manifest.name, path, sourceVersion: manifest.version })
}
packages.sort((left, right) => left.name.localeCompare(right.name))

if (packages.length === 0) {
  throw new Error("No public packages were found under packages/*")
}

function changelogContainsVersion(path, version) {
  const changelogPath = join(path, "CHANGELOG.md")
  if (!existsSync(changelogPath)) return false

  const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`^##\\s+${escapedVersion}(?:\\s|$)`, "m").test(
    readFileSync(changelogPath, "utf8"),
  )
}

// 실제 publish와 같은 pnpm pack 결과를 npm latest tarball과 비교한다.
function buildAndPack(root, relativePath, name) {
  const path = join(root, relativePath)
  const manifestPath = join(path, "package.json")

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
  if (!manifest.scripts?.build) {
    throw new Error(
      `${name} must define a build script before it can be packed`,
    )
  }

  execFileSync("pnpm", ["--filter", name, "build"], {
    cwd: root,
    stdio: "inherit",
  })

  const packDirectory = mkdtempSync(join(tmpdir(), "jds-pack-"))
  const tarballPath = join(packDirectory, "package.tgz")
  try {
    execFileSync("pnpm", ["pack", "--out", tarballPath, "--json"], {
      cwd: path,
      stdio: "inherit",
    })
    return `sha512-${createHash("sha512")
      .update(readFileSync(tarballPath))
      .digest("base64")}`
  } finally {
    rmSync(packDirectory, { recursive: true, force: true })
  }
}

// npm latest와 현재 dev의 배포 결과가 다른 패키지만 Changeset 대상으로 삼는다.
const comparison = []
for (const pkg of packages) {
  const response = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`,
  )

  let metadata = null
  let latestVersion = null
  if (response.status !== 404) {
    if (!response.ok) {
      throw new Error(
        `npm registry returned ${response.status} while reading ${pkg.name}`,
      )
    }

    metadata = await response.json()
    latestVersion = metadata["dist-tags"]?.latest
    if (
      !latestVersion ||
      !metadata.versions?.[latestVersion]?.dist?.integrity
    ) {
      throw new Error(`${pkg.name} latest metadata is incomplete`)
    }
  }

  const publishedVersion = metadata?.versions?.[pkg.sourceVersion]
  const versionRecorded = changelogContainsVersion(pkg.path, pkg.sourceVersion)
  const pendingPublish = publishedVersion === undefined && versionRecorded

  if (metadata !== null && publishedVersion === undefined && !versionRecorded) {
    throw new Error(
      `${pkg.name} source version ${pkg.sourceVersion} is not on npm or in its changelog`,
    )
  }

  if (
    metadata !== null &&
    publishedVersion !== undefined &&
    pkg.sourceVersion !== latestVersion
  ) {
    throw new Error(
      `${pkg.name} source version ${pkg.sourceVersion} is published but npm latest is ${latestVersion}`,
    )
  }

  let publishedIntegrity = null
  let devIntegrity = null
  let changed = false
  if (!pendingPublish) {
    publishedIntegrity = publishedVersion?.dist?.integrity ?? null
    if (metadata !== null && !publishedIntegrity) {
      throw new Error(`${pkg.name}@${pkg.sourceVersion} has no npm integrity`)
    }

    const relativePath = pkg.path.slice(repositoryRoot.length + 1)
    devIntegrity = buildAndPack(repositoryRoot, relativePath, pkg.name)
    changed = publishedIntegrity !== devIntegrity
  }

  const relativePath = pkg.path.slice(repositoryRoot.length + 1)

  comparison.push({
    name: pkg.name,
    path: relativePath,
    sourceVersion: pkg.sourceVersion,
    latestVersion,
    publishedIntegrity,
    devIntegrity,
    changed,
    pendingPublish,
    state: pendingPublish ? "pending-publish" : changed ? "changed" : "current",
  })
}

const result = {
  schemaVersion: 1,
  hasRelease: comparison.some((pkg) => pkg.changed),
  hasPendingPublish: comparison.some((pkg) => pkg.pendingPublish),
  packages: comparison,
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`)

console.table(
  comparison.map((pkg) => ({
    package: pkg.name,
    npm: pkg.latestVersion ?? "not published",
    state: pkg.state,
  })),
)
console.log(
  result.hasRelease
    ? "release draft required"
    : result.hasPendingPublish
      ? "release prepared and waiting to be published"
      : "current dev packages match npm latest",
)

if (process.env.GITHUB_OUTPUT) {
  const changedPackages = comparison
    .filter((pkg) => pkg.changed)
    .map((pkg) => pkg.name)
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    [
      `has_release=${result.hasRelease}`,
      `has_pending_publish=${result.hasPendingPublish}`,
      `changed_packages=${JSON.stringify(changedPackages)}`,
      "",
    ].join("\n"),
  )
}
