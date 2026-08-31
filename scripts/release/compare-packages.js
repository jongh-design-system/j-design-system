import { execFileSync } from "node:child_process"
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, resolve } from "node:path"

const baseRoot = resolve(process.argv[2] ?? process.cwd())
const candidateRoot = resolve(process.argv[3] ?? process.cwd())
const outputPath = resolve(
  process.argv[4] ??
    join(candidateRoot, ".release-work/package-comparison.json"),
)
const forceRelease = process.env.FORCE_RELEASE === "true"

// 공개 workspace를 찾는다. 패키지 이름과 경로를 별도 매핑으로 관리하지 않는다.
const packages = []
for (const entry of readdirSync(join(candidateRoot, "packages"), {
  withFileTypes: true,
})) {
  if (!entry.isDirectory()) continue

  const path = join(candidateRoot, "packages", entry.name)
  const manifest = JSON.parse(readFileSync(join(path, "package.json"), "utf8"))
  if (manifest.private === true || !manifest.name) continue

  packages.push({ name: manifest.name, path, sourceVersion: manifest.version })
}
packages.sort((left, right) => left.name.localeCompare(right.name))

if (packages.length === 0) {
  throw new Error("No public packages were found under packages/*")
}

// base와 merge candidate에 똑같은 build/pack 절차를 적용한다.
function buildAndPack(root, relativePath, name, latestVersion) {
  const path = join(root, relativePath)
  const manifestPath = join(path, "package.json")
  if (!existsSync(manifestPath)) return null

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
  if (manifest.private === true) return null
  if (!manifest.scripts?.build) {
    throw new Error(
      `${name} must define a build script before it can be packed`,
    )
  }

  // npm latest와 같은 version으로 pack해야 version 필드 때문에 생기는 거짓 차이를 피할 수 있다.
  if (latestVersion && manifest.version !== latestVersion) {
    execFileSync("npm", ["pkg", "set", `version=${latestVersion}`], {
      cwd: path,
      stdio: "inherit",
    })
  }

  execFileSync("pnpm", ["--filter", name, "build"], {
    cwd: root,
    stdio: "inherit",
  })

  const packResult = JSON.parse(
    execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], {
      cwd: path,
      encoding: "utf8",
    }),
  )
  if (packResult.length !== 1 || !packResult[0].integrity) {
    throw new Error(`npm pack did not return one integrity for ${name}`)
  }
  return packResult[0].integrity
}

// npm과 다른 결과 중에서도 이 PR이 base 결과를 실제로 바꾼 패키지만 Changeset 대상으로 삼는다.
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
  }

  const relativePath = pkg.path.slice(candidateRoot.length + 1)
  const baseIntegrity = buildAndPack(
    baseRoot,
    relativePath,
    pkg.name,
    latestVersion,
  )
  const candidateIntegrity = buildAndPack(
    candidateRoot,
    relativePath,
    pkg.name,
    latestVersion,
  )
  const changedFromPublished = publishedIntegrity !== candidateIntegrity
  const changedFromBase = baseIntegrity !== candidateIntegrity

  comparison.push({
    name: pkg.name,
    path: relativePath,
    sourceVersion: pkg.sourceVersion,
    latestVersion,
    publishedIntegrity,
    baseIntegrity,
    candidateIntegrity,
    changedFromPublished,
    changedFromBase,
    changed: changedFromPublished && changedFromBase,
  })
}

const result = {
  schemaVersion: 1,
  forceRelease,
  hasRelease: forceRelease || comparison.some((pkg) => pkg.changed),
  packages: comparison,
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`)

console.table(
  comparison.map((pkg) => ({
    package: pkg.name,
    npm: pkg.latestVersion ?? "not published",
    differsFromBase: pkg.changedFromBase,
    changed: pkg.changed,
  })),
)
console.log(
  result.hasRelease
    ? `release draft required${forceRelease ? " (release:force)" : ""}`
    : "this pull request does not add a package release",
)

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `has_release=${result.hasRelease}\n`,
  )
}
