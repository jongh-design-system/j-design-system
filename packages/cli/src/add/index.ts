#!/usr/bin/env node

import { Command } from "commander"
import path from "path"
import { z } from "zod"
import fs from "fs-extra"

import { loadComponentConfig, loadTSConfig } from "./utils/config"
import {
  getPandacssConfigFile,
  resolvePandaConfig,
} from "../common/utils/directoryUtils"
import { resolveImport } from "./utils/resolveImport"
import { configSchema } from "../common/types"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "https://whdgur.shop"
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

    configSchema.schema.parse({
      utils: resolveImport(components_json.utils, tsconfig),
      components: resolveImport(components_json.components, tsconfig),
      hooks: resolveImport(components_json.hooks, tsconfig),
      styledsystem: path.join(options.cwd, outdir || "styled-system"),
    })

    //fetch
    const componentList = options.components?.map(
      (c) => c.charAt(0).toUpperCase() + c.slice(1),
    )
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
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`${componentList[index]} completed successfully`)
      }
    })
  })
