#!/usr/bin/env node

import { confirm, intro, outro } from "@clack/prompts"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { z } from "zod"

import { CommandError, ErrorMap } from "@/common/error"
import {
  getPandacssConfigPath,
  loadComponentConfig,
  loadTSConfig,
} from "@/common/get-config"
import { resolveImport, resolvePandaConfig } from "@/common/resolve"
import { transformImports } from "@/common/transform"
import { configSchema, registrySchema } from "@/common/types"
import { getPackageManagerCommand } from "@/common/utils/packageManager"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "https://whdgur.shop"

const error = chalk.bold.red
const info = chalk.bold.blue

export const addCommand = new Command()
  .name("add")
  .argument("[components...]")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (components, opts) => {
    try {
      const options = addSchema.parse({
        components,
        ...opts,
      })
      intro(info("install components..."))
      //1. components.json 파일을 읽어온다
      const componentsJson = configSchema.schema.parse(
        loadComponentConfig(options.cwd),
      )
      //2. tsconfig.json 파일을 읽어온다
      const tsconfig = loadTSConfig(options.cwd)
      //3. panda.config.* 파일을 읽어온다
      const pandaConfigPath = await getPandacssConfigPath(options.cwd)

      const config = await fs.readFile(
        path.resolve(options.cwd, pandaConfigPath),
        "utf-8",
      )

      const { outdir } = await resolvePandaConfig(config)
      //최종 경로

      const paths = configSchema.schema.parse(
        {
          utils: await resolveImport(componentsJson.utils, tsconfig),
          components: await resolveImport(componentsJson.components, tsconfig),
          hooks: await resolveImport(componentsJson.hooks, tsconfig),
          styledsystem: path.join(options.cwd, outdir || "styled-system"),
        },
        {
          errorMap: () => ({
            message: `validation failed at components.json`,
          }),
        },
      )
      //fetch
      const componentList = options.components?.map((c) => c.toLowerCase())

      if (!componentList?.length) {
        return
      }

      const results = await Promise.allSettled(
        componentList.map(async (c) => {
          const response = await fetch(`${BASE_URL}/${c}.json`)
          if (!response.ok) {
            throw ErrorMap({
              code: "failed_to_fetch",
              target: c,
              statusCode: response.status,
              message: [response.statusText],
            })
          }
          return await response.json()
        }),
      )

      results.forEach(async (result, index) => {
        if (result.status === "rejected") {
          if (result.reason instanceof CommandError) {
            console.log(error(result.reason.format))
          } else {
            console.log(error(result.reason))
          }
          return
        }
        try {
          //1. registry schema check
          const registry = registrySchema.parse(result.value, {
            errorMap: () => ({
              message: `registry for ${componentList[index]} is invaliad`,
            }),
          })
          //2.폴더를 하나 생성해야 함 -> 폴더이름은 reigstry.name
          const src = path.join(paths.components, componentList[index])

          if (fs.pathExistsSync(src)) {
            const isAgreed = await confirm({
              message: `Component ${componentList[index]} already exists. Do you want to overwrite it?`,
            })
            if (!isAgreed) {
              return
            }
          }

          registry.files?.forEach((file) => {
            //import문을 경로를 반영하여 변경하기
            const convertedContent = transformImports(
              file.content,
              componentsJson,
            )

            if (file.type === "ui") {
              fs.outputFileSync(path.join(src, file.name), convertedContent)
            } else {
              fs.outputFileSync(
                path.join(paths[file.type], file.name),
                convertedContent,
                "utf-8",
              )
            }
          })

          const packageManagerCommand = await getPackageManagerCommand(
            options.cwd,
            registry.dependencies || [],
          )

          const outroMsg = !packageManagerCommand
            ? `Cannot find your package manager, install this dependencies: ${registry.dependencies?.join(" ")}`
            : `Run this command in the terminal : ${packageManagerCommand.command} ${packageManagerCommand.args.join(" ")}`

          outro(
            info(
              `${componentList[index]} completed successfully \n ${outroMsg}`,
            ),
          )
          process.exit(0)
        } catch (e) {
          if (e instanceof Error) {
            console.log(error(e.message))
          }
        }
      })
    } catch (e) {
      outro(error(info("error occured")))
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
