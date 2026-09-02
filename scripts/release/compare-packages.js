import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import {
  appendFileSync,
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

  let latestVersion = null
  let publishedIntegrity = null
  if (response.status !== 404) {
    if (!response.ok) {
      throw new Error(
        `npm registry returned ${response.status} while reading ${pkg.name}`,
      )
    }

    const metadata = await response.json()
    latestVersion = metadata["dist-tags"]?.latest
    publishedIntegrity = metadata.versions?.[latestVersion]?.dist?.integrity
    if (!latestVersion || !publishedIntegrity) {
      throw new Error(`${pkg.name} latest metadata has no version or integrity`)
    }
    if (pkg.sourceVersion !== latestVersion) {
      throw new Error(
        `${pkg.name} source version ${pkg.sourceVersion} does not match npm latest ${latestVersion}`,
      )
    }
  }

  const relativePath = pkg.path.slice(repositoryRoot.length + 1)
  const devIntegrity = buildAndPack(repositoryRoot, relativePath, pkg.name)
  const changed = publishedIntegrity !== devIntegrity

  comparison.push({
    name: pkg.name,
    path: relativePath,
    sourceVersion: pkg.sourceVersion,
    latestVersion,
    publishedIntegrity,
    devIntegrity,
    changed,
  })
}

const result = {
  schemaVersion: 1,
  hasRelease: comparison.some((pkg) => pkg.changed),
  packages: comparison,
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`)

console.table(
  comparison.map((pkg) => ({
    package: pkg.name,
    npm: pkg.latestVersion ?? "not published",
    changed: pkg.changed,
  })),
)
console.log(
  result.hasRelease
    ? "release draft required"
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
      `changed_packages=${JSON.stringify(changedPackages)}`,
      "",
    ].join("\n"),
  )
}
