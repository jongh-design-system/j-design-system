import assert from "node:assert/strict"
import test from "node:test"

import { nextDateVersion } from "./date-version.js"

test("date versions keep the compatibility major and increment the daily sequence", () => {
  assert.equal(
    nextDateVersion({
      latestVersion: "1.6.5",
      publishedVersions: ["1.6.5"],
      releaseType: "minor",
      date: "20260831",
    }),
    "1.20260831.1",
  )
  assert.equal(
    nextDateVersion({
      latestVersion: "1.20260831.2",
      publishedVersions: ["1.20260831.1", "1.20260831.2"],
      releaseType: "patch",
      date: "20260831",
    }),
    "1.20260831.3",
  )
})

test("major Changesets increment the compatibility major", () => {
  assert.equal(
    nextDateVersion({
      latestVersion: "4.20260830.7",
      publishedVersions: ["4.20260830.7"],
      releaseType: "major",
      date: "20260831",
    }),
    "5.20260831.1",
  )
})
