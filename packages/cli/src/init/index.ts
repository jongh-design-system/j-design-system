import { packageDirectory } from "pkg-dir"
import { checkJsonInit } from "./utils/checkJsonInit"
import {
  getPandacssConfigFile,
  getTsConfigAlias,
  resolvePandaConfig,
} from "./utils/directoryUtils"
import path from "path"
import { configSchema, type ConfigType } from "../common/types"
import { z } from "zod"
import { Command } from "commander"
import fs from "fs-extra"
import { spinner } from "@clack/prompts"

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
    const s = spinner()
    s.start("Initializing")
    try {
      const options = initSchema.parse({
        cwd: path.resolve(opts.cwd),
      })
      await init(options)
      s.stop("Initialized")
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
      s.stop("Failed to initialize")
      process.exit(0)
    }
  })

export async function init(options: z.infer<typeof initSchema>) {
  const root = options.cwd || (await packageDirectory())
  if (!root) {
    throw new Error("Failed to find package root")
  }

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    throw new Error("Already initialized")
  }

  // const isPandaInit = await checkPandaInit(root)
  // if (!isPandaInit) {
  //   throw new Error("install pandacss")
  // }

  const pandacssConfigPath = await getPandacssConfigFile(root)

  if (!pandacssConfigPath) {
    throw new Error("Failed to resolve pandacss config file")
  }

  const pandacssConfigFile = await fs.readFile(
    path.resolve(root, pandacssConfigPath),
    "utf-8",
  )

  //styled-system은 상대경로가 어떻게 되어있나만 체크하면 됨
  //outdir 속성이 없으면 default로 styled-system으로 지정되어있음 -> 이 경로에 해당하는 tsconfig alias를 찾아야함
  //outdir 속성이 있으면 -> 해당 값의 경로에 해당하는 tsconfig alias를 찾아야함
  //importMap 속성이 있으면 -> 해당 값 그대로 사용
  //string일수도 , object일수도 있음
  //string이면 -> 그대로 사용
  //object면 -> css라는 속성값만 찾아서 사용

  let defaultStyledSystemAlias = "styled-system"

  const { outdir, importMap } = await resolvePandaConfig(pandacssConfigFile) //outdir와 importMap이 있는지

  if (outdir) {
    defaultStyledSystemAlias = outdir //outdir이 있으면 경로는 outdir
  }

  const { baseAlias, styledSystemAlias } = getTsConfigAlias(
    root,
    defaultStyledSystemAlias,
  ) //tsconfig에 접근해서 찾아내기

  if (!baseAlias || !styledSystemAlias) {
    throw new Error("Failed to find tsconfig alias")
  }

  if (importMap) {
    defaultStyledSystemAlias = importMap //importMap이 있으면 그대로 사용
  } else {
    defaultStyledSystemAlias = styledSystemAlias //importMap이 없으면 찾은 값 사용
  }

  const config = {
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
    styledsystem: defaultStyledSystemAlias,
  } satisfies ConfigType

  configSchema.schema.parse(config)

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )
}
