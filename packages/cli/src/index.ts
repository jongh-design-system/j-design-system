#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { getConfig } from "./getConfig"
import * as p from "@clack/prompts"
import { copyComponent } from "./copyComponent"
import { init } from "./init"

const main = async () => {
  try {
    await init()
    await yargs(hideBin(process.argv))
      .command(
        "components add [components..]",
        "Add components to your project",
        (yargs) => {
          return yargs
            .positional("components", {
              describe: "List of components to add",
              type: "string",
              array: true,
              default: [],
            })
            .option("all", {
              type: "boolean",
              description: "Add all components",
              default: false,
            })
        },
        async (argv) => {
          // 컴포넌트가 없고 --all 플래그도 없으면 에러
          if (argv.components.length === 0 && !argv.all) {
            p.cancel(
              "Error: You need to specify at least one component or use the --all flag",
            )
            console.log('Run "cli --help" for more information')
            return
          }
          const config = await getConfig()
          await copyComponent(argv.components[0], config.outputPath)
        },
      )
      .demandCommand(1, "You need at least one command before moving on")
      .strict()
      .help().argv
  } catch (error) {
    if (error instanceof Error) {
      p.cancel(error.message)
      process.exit(1)
    }
  }
}

main()
