#!/usr/bin/env node

import { Command } from "commander"
import path from "path"
import { z, ZodError } from "zod"
import fs from "fs-extra"
import { confirm, select, intro, outro } from "@clack/prompts"

import { loadComponentConfig, loadTSConfig } from "./utils/config"
import {
  getPandacssConfigPath,
  resolvePandaConfig,
} from "../common/utils/directoryUtils"
import { resolveImport } from "./utils/resolveImport"
import { configSchema, registrySchema } from "../common/types"
import { transformPreset, transformImports } from "./utils/transform"
import { execa } from "execa"
import { detect } from "package-manager-detector"
import { getPackageManagerRunner } from "../common/utils/packageManager"
import { CommandError, ErrorMap, type FetchIssue } from "../common/error"
import chalk from "chalk"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "https://whdgur.shop"

export const addCommand = new Command()
  .name("add")
  .argument("[components...]")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (components, opts) => {
    const error = chalk.bold.red
    const info = chalk.bold.blue

    try {
      const options = addSchema.parse({
        components,
        ...opts,
      })
      intro(info("install components..."))
      //1. components.json 파일을 읽어온다
      const components_json = configSchema.schema.parse(
        loadComponentConfig(options.cwd),
      )
      //2. tsconfig.json 파일을 읽어온다
      const tsconfig = await loadTSConfig(options.cwd)
      //3. panda.config.* 파일을 읽어온다
      const pandaConfigPath = await getPandacssConfigPath(options.cwd)

      const config = await fs.readFile(
        path.resolve(options.cwd, pandaConfigPath),
        "utf-8",
      )

      const { outdir } = await resolvePandaConfig(config)
      //최종 경로

      const paths = configSchema.schema.parse({
        utils: await resolveImport(components_json.utils, tsconfig),
        components: await resolveImport(components_json.components, tsconfig),
        hooks: await resolveImport(components_json.hooks, tsconfig),
        styledsystem: path.join(options.cwd, outdir || "styled-system"),
      })
      //fetch
      const componentList = options.components?.map((c) => c.toLowerCase())

      if (!componentList?.length) {
        return
      }

      const results = await Promise.allSettled(
        componentList?.map(async (c) => {
          try {
            const response = await fetch(`${BASE_URL}/${c}.json`)
            if (!response.ok) {
              const error = new Error("fetch error", {
                cause: {
                  code: "failed_to_fetch",
                  target: c,
                  statusCode: response.status,
                  message: [response.statusText],
                } satisfies FetchIssue,
              })
              throw error
            }
            return await response.json()
          } catch (e) {
            if (e instanceof TypeError) {
              throw ErrorMap({
                code: "failed_to_fetch",
                target: c,
                statusCode: null,
                message: [
                  error(e.message),
                  error(
                    e.cause ? JSON.stringify(e.cause) : "cause by typeError",
                  ),
                ],
              })
            }
            if (e instanceof Error) {
              throw ErrorMap(e.cause as FetchIssue) //TODO : remove assertion
            }
          }
        }),
      )

      results.forEach(async (result, index) => {
        if (result.status === "rejected") {
          if (result.reason instanceof CommandError) {
            console.log(error(result.reason.format))
          }
          return
        }
        try {
          //1. registry schema check
          const registry = registrySchema.parse(result.value)
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
              components_json,
            )
            //TODO: file의 타입에 따라 변경하기
            if (file.name === "recipe.ts") {
              //현재 export하고있는 recipe 변수명은 componentList[index]+Recipe
              //이걸 preset.ts에 넣어줘야 함 - 현재는 이 파일이 root에 있다고 가정
              //이 파일의 alias는 component alias / 컴포넌트명 / recipe.ts
              transformPreset(
                path.join(options.cwd, "preset.ts"),
                `${componentList[index]}`,
                path.join(
                  components_json.components,
                  `${componentList[index]}`,
                  "recipe",
                ),
              )
            }

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

          const pm = await detect({ cwd: options.cwd })

          let pmName = pm ? pm.name : ""

          if (!pmName) {
            const selected = await select({
              message: "cannot find package manager, select",
              options: [
                { value: "npm", label: "npm" },
                { value: "pnpm", label: "pnpm" },
                { value: "yarn", label: "yarn" },
              ],
            })
            pmName = selected as string
          }
          if (registry.dependencies?.length) {
            await execa(pmName, [
              pmName === "npm" ? "install" : "add",
              ...registry.dependencies,
            ])
          }
          const runner = await getPackageManagerRunner(options.cwd)
          const [name, ...cmd] = runner.split(" ")
          execa(name, [...cmd, "panda", "codegen"])
          outro(info(`${componentList[index]} completed successfully`))
        } catch (e) {
          console.log(e)
        }
      })
    } catch (e) {
      if (e instanceof ZodError) {
        error(e.message)
      }
      if (e instanceof CommandError) {
        error(e.format)
      }
      if (e instanceof Error) {
        error(e.message)
      }
      outro(info("error occured"))
      process.exit(1)
    }
  })
