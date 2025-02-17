import { type ConfigLoaderSuccessResult, createMatchPath } from "tsconfig-paths"

import { ErrorMap } from "@/common/error"
import type { ConfigType } from "@/common/types"
export async function resolveImport(
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">,
) {
  const match = createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
  )
  if (!match) {
    throw ErrorMap({
      code: "resolve_path_fail",
      target: importPath,
      cwd: process.cwd(),
      message: ["resolve error"],
    })
  }
  return match
}

export async function resolveAllPaths(
  config: ConfigType,
  tsconfig: ConfigLoaderSuccessResult,
) {
  return {
    utils: await resolveImport(config.utils, tsconfig),
    components: await resolveImport(config.components, tsconfig),
    hooks: await resolveImport(config.hooks, tsconfig),
    styledsystem: await resolveImport(config.styledsystem, tsconfig),
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
