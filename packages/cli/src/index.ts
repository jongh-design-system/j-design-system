#!/usr/bin/env node

import { Command } from "commander"

import { addCommand } from "@/commands/add"
import { guideCommand } from "@/commands/guide"
import { initCommand } from "@/commands/init"
import { mcpCommand } from "@/commands/mcp"
import { codemodCommand } from "@/commands/radix-import"

import packageJson from "../package.json"

async function main() {
  const cmd = new Command()
    .name("design-system")
    .version(packageJson.version || "0.0.0")
  cmd
    .addCommand(initCommand)
    .addCommand(addCommand)
    .addCommand(guideCommand)
    .addCommand(codemodCommand)
    .addCommand(mcpCommand)
    .parse()
}
main()
