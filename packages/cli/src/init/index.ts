import { packageDirectory } from "pkg-dir"
import { checkPandaInit } from "./utils/checkPandaInit"
import { checkJsonInit } from "./utils/checkJsonInit"
import { getTsConfigAlias } from "./utils/directoryUtils"
import fs from "fs-extra"
import path from "path"
import { type ConfigType } from "../common/types"
import ora from "ora"
import { z } from "zod"
import { Command } from "commander"

const initSchema = z.object({
  cwd: z.string(),
})

export const initCommand = new Command()
  .name("init")
  .description("Initialize the project")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (opts) => {
    const options = initSchema.parse({
      cwd: path.resolve(opts.cwd),
    })
    await init(options)
  })

export async function init(options: z.infer<typeof initSchema>) {
  const spinner = ora("initiating").start("Initializing project...")
  spinner.color = "blue"

  const root = options.cwd || (await packageDirectory())
  if (!root) {
    throw new Error("Failed to find package root")
  }

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    throw new Error("Already initialized")
  }

  const isPandaInit = await checkPandaInit(root)
  if (!isPandaInit) {
    throw new Error("install pandacss")
  }

  const { baseAlias, styledSystemAlias } = getTsConfigAlias(root)
  if (!baseAlias || !styledSystemAlias) {
    throw new Error("Failed to find tsconfig alias")
  } //tsconfig paths를 분석하여 alias 찾기

  const config = {
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
    styledsystem: styledSystemAlias,
  } satisfies ConfigType

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )
}
