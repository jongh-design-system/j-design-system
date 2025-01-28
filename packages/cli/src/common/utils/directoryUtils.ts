import fg from "fast-glob"
import fs from "fs-extra"
import { loadConfig } from "tsconfig-paths"
import path from "path"
import { ErrorMap } from "../error"

export function getTsConfigAlias(cwd: string, styledSytemPath: string) {
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
    // styled-system alias 찾기 - paths 경로 문자열에 포함되어있으면 styled-system alias라고 판단
    if (paths[0].includes(styledSytemPath)) {
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
export async function getPandacssConfigPath(cwd: string) {
  try {
    const files = await fg.glob(["panda.config.*"], { cwd, deep: 3 })
    if (!files.length) {
      throw ErrorMap({
        code: "config_not_found",
        configFile: "panda.config.*",
        message: ["failed to find panda.config file"],
      })
    }
    return files[0]
  } catch (error) {
    throw ErrorMap({
      code: "config_not_found",
      configFile: "panda.config.*",
      message: [
        error instanceof Error
          ? error.message
          : "unknown error occured finding panda.config",
      ],
    })
  }
}

export async function resolvePandaConfig(config: string) {
  const outdirMatch = config.match(/outdir:\s*["']([^"']+)["']/)
  const importMapMatch = config.match(/importMap:\s*({[^}]+}|["'][^"']+["'])/)

  const outdir = outdirMatch ? outdirMatch[1] : null
  let importMap = null

  if (importMapMatch) {
    const value = importMapMatch[1]
    if (value.startsWith("{")) {
      const cssMatch = value.match(/css:\s*["']([^"']+)["']/)
      importMap = cssMatch ? cssMatch[1].replace(/\/css$/, "") : null
    } else {
      importMap = value.replace(/["']/g, "")
    }
  }

  return { outdir, importMap }
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
