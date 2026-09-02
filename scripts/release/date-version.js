export function nextDateVersion({
  latestVersion,
  publishedVersions,
  releaseType,
  date,
}) {
  const match = /^(\d+)\./.exec(latestVersion)
  if (!match) {
    throw new Error(`Cannot read the compatibility major from ${latestVersion}`)
  }
  if (!["major", "minor", "patch"].includes(releaseType)) {
    throw new Error(
      `Cannot create a date version for release type ${releaseType}`,
    )
  }
  if (!/^\d{8}$/.test(date)) {
    throw new Error(`Date version requires YYYYMMDD, received ${date}`)
  }

  const compatibilityMajor =
    Number(match[1]) + (releaseType === "major" ? 1 : 0)
  const prefix = `${compatibilityMajor}.${date}.`
  const sequences = publishedVersions
    .filter((version) => version.startsWith(prefix))
    .map((version) => version.slice(prefix.length))
    .filter((sequence) => /^\d+$/.test(sequence))
    .map(Number)

  return `${prefix}${sequences.length === 0 ? 1 : Math.max(...sequences) + 1}`
}
