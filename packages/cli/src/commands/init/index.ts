import { confirm, spinner } from "@clack/prompts"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"
import { z } from "zod"

import { CommandError, ErrorMap } from "@/common/error"
import { checkJsonInit, getBaseAlias, loadTSConfig } from "@/common/get-config"

import { initOptionSchema } from "./option"

const error = chalk.bold.red

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
      const options = initOptionSchema.parse({
        cwd: path.resolve(opts.cwd),
      })
      await init(options)
      s.stop("successfully Initialized!")
    } catch (e) {
      s.stop(error("error occured"))
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

export async function init(options: z.output<typeof initOptionSchema>) {
  const root = await packageDirectory({ cwd: options.cwd })
  if (!root) {
    throw ErrorMap({
      code: "config_not_found",
      configFile: "package.json",
      message: [`cannot find package.json in ${root}`],
    })
  }

  const result = loadTSConfig(root)
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

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    const conf = await confirm({
      message: "you already initialize,are you want to overwrite it?",
    })
    if (!conf) {
      process.exit(0)
    }
  }

  const config = {
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
  }

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )

  return config
}
