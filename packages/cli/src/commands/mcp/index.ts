import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

import { init, initSchema } from "../init"

export const server = new Server(
  {
    name: "DesignSystemCLI",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "init",
        description: "Initialize the design system and generate theme files.",
        inputSchema: zodToJsonSchema(initSchema),
      },
    ],
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required for the init tool.")
    }

    switch (request.params.name) {
      case "init": {
        try {
          const { cwd, ...color } = request.params.arguments
          const params = initSchema.parse({
            cwd,
            default: true,
            theme: color,
          })

          await init(params)

          return {
            content: [
              {
                type: "text",
                text: `Design system initialized for directory: ${params.cwd}. Theme files generated.`,
              },
            ],
          }
        } catch (e) {
          console.error("Error during init tool execution:", e)
          return {
            content: [
              {
                type: "text",
                text: `Error initializing design system: ${e instanceof Error ? e.message : String(e)}`,
              },
            ],
            isError: true,
          }
        }
      }
      default:
        return {
          content: [
            { type: "text", text: `Tool ${request.params.name} not found` },
          ],
          isError: true,
        }
    }
  } catch (error) {
    console.error("Error parsing MCP request arguments:", error)
    if (error instanceof z.ZodError) {
      return {
        content: [
          {
            type: "text",
            text: `Invalid arguments for tool ${request.params?.name}: ${JSON.stringify(error.errors)}`,
          },
        ],
        isError: true,
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
})
