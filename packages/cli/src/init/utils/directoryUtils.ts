import fg from "fast-glob"
import fs from "fs-extra"
import { loadConfig } from "tsconfig-paths"
import path from "path"

export function getTsConfigAlias(cwd: string) {
  const tsConfig = loadConfig(cwd)

  if (
    tsConfig?.resultType === "failed" ||
    !Object.entries(tsConfig?.paths).length
  ) {
    return { baseAlias: null, styledSystemAlias: null }
  }

  let baseAlias = null
  let styledSystemAlias = null

  // 모든 alias 순회하면서 둘 다 찾기
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    // styled-system alias 찾기
    if (paths.includes("./styled-system/*")) {
      styledSystemAlias = alias.replace(/\/\*$/, "")
    }

    // base alias 찾기
    if (
      paths.includes("./*") ||
      paths.includes("./src/*") ||
      paths.includes("./app/*")
    ) {
      baseAlias = alias.replace(/\/\*$/, "")
    }
  }

  if (!baseAlias) {
    baseAlias = Object.keys(tsConfig?.paths)?.[0].replace(/\/\*$/, "") ?? null
  }
  if (!styledSystemAlias) {
    styledSystemAlias = "."
  }

  return { baseAlias, styledSystemAlias }
}
//panda.config.ts파일 찾기 -> 여기서 outdir이 현재 저장경로(없으면 styled-system)
export async function getPandacssConfigFile(cwd: string) {
  const files = await fg.glob(["panda.config.*"], { cwd })
  return files.length ? files[0] : null
}

//src/app 일수도 있고 /app일수도 있음
export function isAppDir(cwd: string) {
  const isSrc = fs.pathExistsSync(path.resolve(cwd, "src"))
  if (isSrc) {
    return fs.pathExists(path.resolve(cwd, "src/app"))
  } else {
    return fs.pathExists(path.resolve(cwd, "app/"))
  }
}
