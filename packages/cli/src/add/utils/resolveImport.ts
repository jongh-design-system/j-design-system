import { ErrorMap } from "../../common/error"
import { createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"
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
