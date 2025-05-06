import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { Command } from "commander"

import { server } from "./server"

export const mcpCommand = new Command()
  .name("mcp")
  .description("Manage your design system")
  .action(async () => {
    try {
      const transport = new StdioServerTransport()
      await server.connect(transport)
    } catch (error) {
      console.error(error)
    }
  })
