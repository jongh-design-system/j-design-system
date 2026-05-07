import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  type CompileFile,
  compileSystem,
  emitFiles,
} from "@jongh/new-v2-system-compiler"
import { createJiti } from "jiti"

import { type CliOptions, configFileSchema } from "./schema.ts"

export interface CompileCliResult {
  files: CompileFile[]
  writtenFiles: string[]
}

export async function runCompile(input: CliOptions): Promise<CompileCliResult> {
  const paths = {
    cwd: path.resolve(input.cwd),
    config: input.config,
    outdir: "",
  }
  paths.config = path.resolve(paths.cwd, paths.config)

  const config = configFileSchema.parse(
    await createJiti(paths.config, {
      moduleCache: false,
    }).import(paths.config, {
      default: true,
    }),
  )
  paths.outdir = path.resolve(paths.cwd, input.outdir ?? config.outdir)
  const document = compileSystem(config.system, {
    ...config.compiler,
    ...(input.target === undefined ? {} : { target: input.target }),
  })
  const result = emitFiles(document.layers, config.options)

  const writtenFiles = await Promise.all(
    result.files.map(async (file) => {
      const outputPath = path.isAbsolute(file.path)
        ? file.path
        : path.resolve(paths.outdir, file.path)

      await mkdir(path.dirname(outputPath), {
        recursive: true,
      })
      await writeFile(outputPath, file.content, "utf8")

      return outputPath
    }),
  )

  return {
    files: result.files,
    writtenFiles,
  }
}
