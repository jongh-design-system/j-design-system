#!/usr/bin/env node

import { Command } from "commander"

import packageJson from "../package.json"
import { createCompileCommand } from "./command.ts"

async function main() {
  const command = new Command()
    .name("jds-system")
    .version(packageJson.version || "0.0.0")
    .addCommand(createCompileCommand())

  await command.parseAsync()
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
