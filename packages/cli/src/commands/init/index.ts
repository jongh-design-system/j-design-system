import { confirm, outro, spinner } from "@clack/prompts"
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
  getBasePath,
  getStyleAlias,
  loadTSConfig,
} from "@/common/get-config"
import { getPandacssConfigPath } from "@/common/get-config"
import { resolveImport, resolvePandaConfig } from "@/common/resolve"
import { transformTailwindTemplate, transformTemplate } from "@/common/theme"
import { transformPandaConfig } from "@/common/transform"
import { configSchema } from "@/common/types"
import { getPackageManagerCommand } from "@/common/utils/packageManager"

import { initOptionSchema, resolveOption } from "./option"

const error = chalk.bold.red
const info = chalk.bold.blue
const tailwindInitDependencies = [
  "tailwindcss",
  "clsx",
  "tailwind-merge",
  "tailwind-variants",
]

export const initCommand = new Command()
  .name("init")
  .description("Initialize the project")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .option("-y, --yes", "skip prompts and use default options", false)
  .option("--style <style>", "component style")
  .option("--primary <color>", "primary color")
  .option("--secondary <color>", "secondary color")
  .option("--gray <color>", "gray color")
  .action(async (opts) => {
    const s = spinner()
    s.start("Initializing")
    try {
      const options = await resolveOption({
        cwd: path.resolve(opts.cwd),
        yes: opts.yes,
        style: opts.style,
        primary: opts.primary,
        secondary: opts.secondary,
        gray: opts.gray,
      })
      const config = await init(options)
      s.stop("successfully Initialized!")
      if (config?.style === "tailwind") {
        const packageManagerCommand = await getPackageManagerCommand(
          options.cwd,
          tailwindInitDependencies,
        )
        if (packageManagerCommand) {
          outro(
            info(
              `Run this command in the terminal : ${packageManagerCommand.command} ${packageManagerCommand.args.join(" ")}`,
            ),
          )
        }
      }
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

export async function init(options: z.output<typeof initOptionSchema>) {
  const root = options.cwd || (await packageDirectory())
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

  if (options.style === "panda") {
    const pandacssConfigPath = await getPandacssConfigPath(root)
    const pandacssConfigFile = await fs.readFile(
      path.join(root, pandacssConfigPath),
      "utf-8",
    )

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
        style: options.style,
        utils: `${baseAlias}/utils`,
        components: `${baseAlias}/components`,
        hooks: `${baseAlias}/hooks`,
        styledsystem: defaultStyledSystemAlias,
      },
      {
        errorMap: () => ({ message: `components.json is invalid` }),
      },
    )

    await fs.writeFile(
      path.resolve(root, "components.json"),
      JSON.stringify(config),
      "utf-8",
    )
    const preset = transformTemplate({
      primary: options.primary,
      secondary: options.secondary,
      gray: options.gray,
    })

    await fs.writeFile(path.join(root, "preset.ts"), preset)
    transformPandaConfig(path.resolve(root, pandacssConfigPath))
    return config
  }

  if (options.style === "tailwind") {
    const basePath = getBasePath(root, result)
    if (basePath === null) {
      throw ErrorMap({
        code: "resolve_path_fail",
        target: "tsconfig.json",
        cwd: root,
        message: [
          `cannot find base path in your ${path.join(root, "tsconfig.json")}`,
        ],
      })
    }

    const config = configSchema.schema.parse(
      {
        style: options.style,
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
      JSON.stringify(config),
      "utf-8",
    )

    const styles = transformTailwindTemplate({
      primary: options.primary,
      secondary: options.secondary,
      gray: options.gray,
    })

    await fs.outputFile(path.join(basePath, "styles.css"), styles)
    await fs.outputFile(
      path.join(await resolveImport(config.utils, result), "cn.ts"),
      `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
    )

    return config
  }
}
