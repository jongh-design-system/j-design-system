import { confirm, spinner } from "@clack/prompts"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"
import { z } from "zod"

import { CommandError, ErrorMap } from "@/common/error"
import { checkJsonInit, getBaseAlias, loadTSConfig } from "@/common/get-config"
import { resolveImport } from "@/common/resolve"
import { configSchema } from "@/common/types"

const CN_TEMPLATE = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

export const initSchema = z.object({
  cwd: z.string(),
})

const error = chalk.bold.red
const info = chalk.bold.blue
export const initCommand = new Command()
  .name("init")
  .description("Initialize the project")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (opts) => {
    const s = spinner()
    s.start("Initializing")
    try {
      const options = initSchema.parse({
        cwd: path.resolve(opts.cwd),
      })
      await init(options)
      s.stop("successfully Initialized!")
    } catch (e) {
      s.stop(error(info("error occured")))
      if (e instanceof z.ZodError) {
        console.log(e.message)
      }
      if (e instanceof CommandError) {
        console.log(error(e.format))
      }
      if (e instanceof Error) {
        console.log(error(e.message))
      }
      process.exit(1)
    }
  })

export async function init(options: z.infer<typeof initSchema>) {
  const root = options.cwd || (await packageDirectory())
  if (!root) {
    throw ErrorMap({
      code: "config_not_found",
      configFile: "package.json",
      message: [`cannot find package.json in ${root}`],
    })
  }

  const result = loadTSConfig(root)

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    const conf = await confirm({
      message: "you already initialize, are you want to overwrite it?",
    })
    if (!conf) {
      process.exit(0)
    }
  }

  const baseAlias = getBaseAlias(root, result)
  if (baseAlias === null) {
    throw ErrorMap({
      code: "resolve_path_fail",
      target: "tsconfig.json",
      cwd: root,
      message: [
        `cannot find paths alias in your ${path.join(root, "tsconfig.json")}`,
      ],
    })
  }

  const config = configSchema.schema.parse(
    {
      utils: `${baseAlias}/utils`,
      components: `${baseAlias}/components`,
      hooks: `${baseAlias}/hooks`,
    },
    {
      errorMap: () => ({ message: `components.json is invalid` }),
    },
  )

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config, null, 2),
    "utf-8",
  )

  // Generate cn.ts utility
  const utilsPath = await resolveImport(config.utils, result)
  await fs.outputFile(path.join(utilsPath, "cn.ts"), CN_TEMPLATE, "utf-8")

  return config
}
