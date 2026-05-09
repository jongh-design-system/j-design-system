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

/**
 *
 * 주어진 경로를 기반으로 tsconfig.json파일을 탐색
 * 현재 경로에 없다면, 부모 디렉토리로 이동
 */
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

/**
 * react, nextJS 사용자가 일반적으로 많이 사용하는 경로를 기반으로 alias를 반환하는 함수
 *
 * @example
const exampleTsConfig = {
  baseUrl: ".",
  paths: {
    "@/*": ["./src/*"],
    "@app/*": ["./src/app/*"],
    "@components/*": ["./src/components/*"],
  }
}
  getBaseAlias(process.cwd(),exampleTsConfig) // @
 */
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

export function getBasePath(cwd: string, tsConfig: ConfigLoaderSuccessResult) {
  const basePaths = ["./", "./src/", "./app/", "./src/app"].map((p) =>
    path.resolve(cwd, p),
  )

  for (const paths of Object.values(tsConfig.paths)) {
    const resolvedPaths = path.join(
      cwd,
      tsConfig.baseUrl || "",
      paths[0].replace(/\/\*$/, ""),
    )

    if (
      basePaths.some((p) => p === resolvedPaths || p.includes(resolvedPaths))
    ) {
      return resolvedPaths
    }
  }

  return null
}

/**
 * pandacss의 output 경로에 해당하는 alias를 반환하는 함수
 * @param styleFolderName panda.config의 output 설정, 기본값은 styled-system
 * @example
const exampleTsConfig = {
  baseUrl: ".",
  paths: {
    "@/*": ["./src/*"],
    "@app/*": ["./src/app/*"],
    "@styledSysytem/*": ["./styled-system/*"],
  }
}
  getBaseAlias(process.cwd(),exampleTsConfig) // '@styledSysytem'
 */

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
