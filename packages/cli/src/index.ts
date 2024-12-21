#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as p from "@clack/prompts"
import { init } from "./init"

yargs(hideBin(process.argv))
  .command(
    "init",
    "Initialize the project",
    () => {},
    async () => {
      try {
        p.note("Initializing project...")
        p.spinner()
        await init()
        p.log.success("Project initialized")
      } catch (e) {
        if (e instanceof Error) {
          p.log.error(e.message)
        }
        process.exit(1)
      }
    },
  )
  .parse()
