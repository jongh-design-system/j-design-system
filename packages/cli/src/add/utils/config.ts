import { configSchema, type ConfigType } from "common/types"
import fs from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"

// 1. Config 파일 읽기 전용
export async function loadComponentConfig(cwd: string): Promise<ConfigType> {
  const configFile = await fs.readJson(path.resolve(cwd, configSchema.fileName))
  return configSchema.schema.parse(configFile)
}

// 2. TSConfig 읽기 전용
export async function loadTSConfig(cwd: string) {
  const tsconfig = loadConfig(cwd)
  if (tsconfig.resultType === "failed") {
    throw new Error("tsconfig file not found")
  }
  return tsconfig
}
