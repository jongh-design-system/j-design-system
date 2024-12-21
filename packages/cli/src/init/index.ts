import { packageDirectory } from "pkg-dir"
import { checkPandaInit } from "./utils/checkPandaInit"
import { checkJsonInit } from "./utils/checkJsonInit"
import { getTsConfigAlias } from "./utils/directoryUtils"
import fs from "fs-extra"
import path from "path"

export async function init() {
  const root = await packageDirectory()
  if (!root) {
    throw new Error("Failed to find package root")
  }

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    throw new Error("Already initialized")
  }

  const isPandaInit = await checkPandaInit(root)
  if (isPandaInit) {
    throw new Error("install pandacss")
  }

  const { baseAlias, styledSystemAlias } = getTsConfigAlias(root)
  if (!baseAlias || !styledSystemAlias) {
    throw new Error("Failed to find tsconfig alias")
  } //tsconfig paths를 분석하여 alias 찾기

  const config = {
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
    styledsystem: styledSystemAlias,
  }

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )
}
