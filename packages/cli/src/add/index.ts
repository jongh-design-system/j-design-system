import { Command } from "commander"
import path from "path"
import { z } from "zod"
import fs from "fs-extra"
import { confirm } from "@clack/prompts"

import { loadComponentConfig, loadTSConfig } from "./utils/config"
import {
  getPandacssConfigFile,
  resolvePandaConfig,
} from "../common/utils/directoryUtils"
import { resolveImport } from "./utils/resolveImport"
import { configSchema, registrySchema } from "../common/types"
import { transformPreset, transformImports } from "./utils/transform"
import { execa } from "execa"
import { detect } from "package-manager-detector"
import { getPackageManagerRunner } from "../common/utils/packageManager"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "http://localhost:3000"
export const addCommand = new Command()
  .name("add")
  .description("add components")
  .argument(
    "[components...]",
    "the components to add or a url to the component.",
  )
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (components, opts) => {
    const options = addSchema.parse({
      components,
      cwd: path.resolve(opts.cwd),
      ...opts,
    })

    //1. components.json 파일을 읽어온다
    const components_json = await loadComponentConfig(options.cwd)

    //2. tsconfig.json 파일을 읽어온다

    const tsconfig = await loadTSConfig(options.cwd)

    //3. panda.config.* 파일을 읽어온다
    const PandaConfigPath = await getPandacssConfigFile(options.cwd)

    if (!PandaConfigPath) {
      throw new Error("panda.config.* file not found")
    }
    const config = await fs.readFile(
      path.resolve(options.cwd, PandaConfigPath),
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
        const response = await fetch(`${BASE_URL}/${c}.json`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${c}`)
        }
        const data = await response.json()
        return data
      }),
    )

    results.forEach(async (result, index) => {
      if (result.status === "fulfilled") {
        //1. registry schema check
        const registry = registrySchema.parse(result.value)
        //2.폴더를 하나 생성해야 함 -> 폴더이름은 reigstry.name
        const src = path.join(paths.components, componentList[index])
        const isExists = await fs.pathExists(src)

        if (isExists) {
          const isAgreed = await confirm({
            message: `Component ${componentList[index]} already exists. Do you want to overwrite it?`,
          })
          if (!isAgreed) {
            return
          }
        }
        //이후부터는 파일을 overwrite
        await fs.ensureDir(path.resolve(src))

        registry.files?.forEach((file) => {
          const convertedContent = transformImports(
            file.content,
            components_json,
          )

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
            fs.writeFileSync(path.join(src, file.name), convertedContent)
          } else {
            fs.outputFileSync(
              path.join(paths[file.type], file.name),
              convertedContent,
              "utf-8",
            )
          }
        })

        const pm = await detect({ cwd: options.cwd })
        if (!pm) {
          throw new Error("Could not detect package manager")
        }
        if (registry.dependencies?.length) {
          await execa(pm.name, [
            pm.name === "npm" ? "install" : "add",
            ...registry.dependencies,
          ])
        }
        const runner = await getPackageManagerRunner(options.cwd)
        const [name, ...cmd] = runner.split(" ")
        execa(name, [...cmd, "panda", "codegen"])
      }
      console.log(`${componentList[index]} completed successfully`)
    })
  })
