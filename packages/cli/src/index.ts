#!/usr/bin/env node

import { initCommand } from "./init"
import { Command } from "commander"
import packageJson from "../package.json"
import { addCommand } from "./add"

async function main() {
  const cmd = new Command()
    .name("design-system")
    .version(packageJson.version || "0.0.0")

  cmd.addCommand(initCommand).addCommand(addCommand).parse()
}

main()
