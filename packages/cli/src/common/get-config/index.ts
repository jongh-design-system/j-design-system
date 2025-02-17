import fg from "fast-glob"
import fs from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"

import { ErrorMap } from "../error"
import { configSchema } from "../types"
export function loadComponentConfig(cwd: string) {
  try {
    const configFile = fs.readJsonSync(path.resolve(cwd, configSchema.fileName))
    return configFile
  } catch (e) {
    return ErrorMap({
      code: "config_not_found",
      configFile: configSchema.fileName,
      message: [e instanceof Error ? e.message : ""],
    })
  }
}

// tsConfig 읽기 전용
// loadConfig는 현재 디렉토리에 tsconfig가 없으면 경로를 내려가서 tsconfig를 찾는걸로 보임
export async function loadTSConfig(cwd: string) {
  const tsconfig = loadConfig(cwd)
  if (tsconfig.resultType === "failed") {
    throw ErrorMap({
      code: "config_not_found",
      configFile: "tsconfig.json",
      message: ["cannot found tsconfig.json"],
    })
  }
  return tsconfig
}

export async function checkJsonInit(root: string) {
  return await fs.pathExists(path.join(root, "components.json"))
}

export async function checkPandaInit(cwd: string) {
  const panda = "@pandacss/dev"
  const pkg = JSON.parse(
    fs.readFileSync(path.join(cwd, "package.json"), "utf-8"),
  )

  const devDeps = pkg?.devDependencies || {}
  const deps = pkg?.dependencies || {}

  const isInstalled =
    Object.keys(devDeps).includes(panda) || Object.keys(deps).includes(panda) //panda가 devDependencies나 dependencies에 있는지 확인

  const pandaConfig = await getPandacssConfigPath(cwd)

  return isInstalled && !!pandaConfig
}

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
