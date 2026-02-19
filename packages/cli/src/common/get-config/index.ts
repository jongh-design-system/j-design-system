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
