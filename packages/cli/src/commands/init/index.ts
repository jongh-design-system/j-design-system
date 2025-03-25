import { confirm, select, spinner } from "@clack/prompts"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"
import { z } from "zod"

import { CommandError, ErrorMap } from "@/common/error"
import {
  checkJsonInit,
  getBaseAlias,
  getStyleAlias,
  loadTSConfig,
} from "@/common/get-config"
import { getPandacssConfigPath } from "@/common/get-config"
import { resolvePandaConfig } from "@/common/resolve"
import {
  colorPalette,
  colorSchema,
  grayColorPalette,
  transformTemplate,
} from "@/common/theme"
import { transformPandaConfig } from "@/common/transform"
import { configSchema } from "@/common/types"

const initSchema = z.object({
  cwd: z.string(),
  default: z.boolean(),
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
  .option("-d, --default", "use default color", false)
  .action(async (opts) => {
    const s = spinner()
    s.start("Initializing")
    try {
      const options = initSchema.parse({
        cwd: path.resolve(opts.cwd),
        default: opts.default,
      })
      await init(options)
      s.stop("successfully Initialized!")
      process.exit(0)
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
  const root = options.cwd || (await packageDirectory()) //뒤에꺼 절대 실행안되고 있음
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
      message: "you already initialize,are you want to overwrite it?",
    })
    if (!conf) {
      process.exit(0)
    }
  }

  const pandacssConfigPath = await getPandacssConfigPath(root)
  const pandacssConfigFile = await fs.readFile(
    path.join(root, pandacssConfigPath),
    "utf-8",
  )

  const baseAlias = getBaseAlias(root, result)

  let defaultStyledSystemAlias = "styled-system"

  const { outdir, importMap } = await resolvePandaConfig(pandacssConfigFile)

  //만약 importMap이 있으면 그 값을 그대로 사용
  if (importMap) {
    defaultStyledSystemAlias = importMap
  } else {
    //존재하지 않을 경우 - outdir || styled-system으로 되어있는 alias를 찾아본 뒤
    defaultStyledSystemAlias =
      getStyleAlias(root, outdir || "styled-system", result) || "." //없다면 현재 디렉토리의 root경로에 있다고 가정(.)
  }
  if (outdir) {
    defaultStyledSystemAlias = outdir //outdir이 있으면 경로는 outdir
  }

  const config = configSchema.schema.parse(
    {
      utils: `${baseAlias}/utils`,
      components: `${baseAlias}/components`,
      hooks: `${baseAlias}/hooks`,
      styledsystem: defaultStyledSystemAlias,
    },
    {
      errorMap: () => ({ message: `components.json is invalid` }),
    },
  )

  fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )

  let primary = "neutral"
  let secondary = "slate"
  let gray = "gray"

  if (!options.default) {
    primary = (await select({
      message: "Pick primary color",
      initialValue: "neutral",
      options: colorPalette.map((color) => ({
        value: color,
        label: color,
      })),
    })) as string

    secondary = (await select({
      message: "Pick secondary color",
      initialValue: "slate",
      options: colorPalette.map((color) => ({
        value: color,
        label: color,
      })),
    })) as string

    gray = (await select({
      message: "Pick gray color",
      initialValue: "gray",
      options: grayColorPalette.map((color) => ({
        value: color,
        label: color,
      })),
    })) as string
  }

  const preset = transformTemplate(
    colorSchema.parse({
      primary,
      secondary,
      gray,
    }),
  )

  fs.writeFile(path.join(root, "preset.ts"), preset)

  transformPandaConfig(path.resolve(root, pandacssConfigPath))

  return config
}
