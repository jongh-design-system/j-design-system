import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
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

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "selectThemeColors",
        description: "Theme color selection guide for AI",
        arguments: [
          {
            name: "primaryColor",
            description: "The primary color using design system",
          },
          {
            name: "secondaryColor",
            description: "The secondary color using design system.",
          },
          {
            name: "grayColor",
            description: "The gray color using design system.",
          },
        ],
      },
    ],
  }
})

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "selectThemeColors") {
    return {
      jsonrpc: "2.0",
      error: {
        code: -32601,
        message: `Prompt ${request.params.name} not found.`,
      },
    }
  }

  return {
    description:
      "Help the user select appropriate primary, secondary, and gray colors for the design system theme.",
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: `You are an AI assistant helping the user configure their design system theme colors.

**Your goal is to determine the primary, secondary, and gray colors based on user preference.**

**Follow these steps:**
1.  **Start by asking the user** (e.g., "What is your preferred color for the primary theme color?").
2.  **Based on the user's preferred color, determine the secondary and gray colors.** You should use color theory and harmony principles to select colors that complement the primary color.
3.  **When selecting secondary and gray colors, prioritize color harmony and contrast.**
4.  **Ensure all selected colors comply with WCAG (Web Content Accessibility Guidelines) Contrast Ratio of at least 4.5** against standard background and foreground text colors where applicable.
5.  **Strictly avoid color overlap.** The primary, secondary, and gray colors must be distinct from each other (e.g., the chosen primary color should not be the same as the chosen secondary or gray, secondary should not be the same as gray, etc.).
6.  Once you have determined a suitable primary, secondary, and gray color (either directly provided by the user or chosen based on their preference and the criteria above), **confirm the selected colors with the user** if necessary.
7.  Inform the user of the reason for the selection of the colors.
8.  Finally, with the determined primary, secondary, and gray color values, **execute the 'init' tool** provided by the DesignSystemCLI server, passing the colors as arguments.

**Tool to use after color determination:** 'DesignSystemCLI init'`,
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "I need to set up the theme colors for my design system. Can you guide me through the process?",
        },
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: "Okay, I can help you with that. Let's start by selecting the theme colors. To begin, what is your preferred color for the primary theme color?",
        },
      },
    ],
  }
})
