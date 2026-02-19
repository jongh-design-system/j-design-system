#!/usr/bin/env node

import { confirm, intro, outro } from "@clack/prompts"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { z } from "zod"

import { CommandError, ErrorMap } from "@/common/error"
import { loadComponentConfig, loadTSConfig } from "@/common/get-config"
import { resolveImport } from "@/common/resolve"
import { transformImports } from "@/common/transform"
import { configSchema, registrySchema } from "@/common/types"
import { getPackageManagerCommand } from "@/common/utils/packageManager"

export const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "https://jds-docs.vercel.app"

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

      //최종 경로
      const paths = {
        utils: await resolveImport(componentsJson.utils, tsconfig),
        components: await resolveImport(componentsJson.components, tsconfig),
        hooks: await resolveImport(componentsJson.hooks, tsconfig),
      }

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

      for (const [index, result] of results.entries()) {
        if (result.status === "rejected") {
          if (result.reason instanceof CommandError) {
            console.log(error(result.reason.format))
          } else {
            console.log(error(result.reason))
          }
          continue
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
        } catch (e) {
          if (e instanceof Error) {
            console.log(error(e.message))
          }
        }
      }
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
      process.exit(1) // 전체 프로세스가 실패했을 때만 종료
    }
  })
