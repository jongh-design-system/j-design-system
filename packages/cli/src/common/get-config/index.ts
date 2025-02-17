import fg from "fast-glob"
import fs from "fs-extra"
import path from "path"
import { type ConfigLoaderSuccessResult, loadConfig } from "tsconfig-paths"

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
export function loadTSConfig(cwd: string) {
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

export function getBaseAlias(cwd: string, tsConfig: ConfigLoaderSuccessResult) {
  const basePaths = ["./", "./src/", "./app/", "./src/app"].map((p) =>
    path.resolve(cwd, p),
  )

  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    const resolvedPaths = path.join(
      cwd,
      tsConfig.baseUrl || "",
      paths[0].replace(/\/\*$/, ""),
    )

    if (
      basePaths.some((p) => p === resolvedPaths || p.includes(resolvedPaths))
    ) {
      return alias.replace(/\/\*$/, "")
    }
  }

  return null
}
//outdir을 설정하면
//outdir의 경로는 process.cwd+outdir
export function getStyleAlias(
  cwd: string,
  styleFolderName: string,
  tsConfig: ConfigLoaderSuccessResult,
) {
  // outdir를 절대 경로로 변환
  const targetOutdir = path.join(cwd, styleFolderName) //styleForderName이 절대경로일 수도 있음

  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    const normalizedPath = paths[0].replace(/\/\*$/, "")
    if (
      targetOutdir === path.join(cwd, tsConfig.baseUrl || "", normalizedPath)
    ) {
      return alias.replace(/\/\*$/, "")
    }
  }

  return null
}

export async function getPandacssConfigPath(cwd: string) {
  try {
    const paths = await fg.glob(["panda.config.*"], { cwd, deep: 3 })
    if (!paths.length) {
      throw ErrorMap({
        code: "config_not_found",
        configFile: "panda.config.*",
        message: ["failed to find panda.config file"],
      })
    }
    return paths[0]
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
