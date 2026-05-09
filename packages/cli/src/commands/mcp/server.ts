import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

import { colorPalette, colorSchema, grayColorPalette } from "@/common/theme"

import { init } from "../init"
import { initOptionSchema, resolveOption } from "../init/option"

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
        inputSchema: zodToJsonSchema(initOptionSchema),
      },
      {
        name: "previewColors",
        description: "Generate a preview of selected color combinations.",
        inputSchema: zodToJsonSchema(colorSchema),
      },
    ],
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required for this tool.")
    }

    switch (request.params.name) {
      case "init": {
        try {
          const params = await resolveOption({
            ...request.params.arguments,
            yes: true,
          })

          await init(params)

          const response = `Design system initialized for directory: ${params.cwd}. Theme files generated.`

          return {
            content: [{ type: "text", text: response }],
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
            name: "primary",
            description: "The primary color using design system",
          },
          {
            name: "secondary",
            description: "The secondary color using design system.",
          },
          {
            name: "gray",
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
          text: `I'll help you set up the theme colors for your design system.

**The goal is to determine primary, secondary, and gray colors based on your preference.**

**Available color palettes:**
- primary,secondary colors: ${colorPalette.join(", ")}
- Gray shades (for gray selection): ${grayColorPalette.join(", ")}

**Guidelines:**
1. **Guide the user to select the primary color only from the list above.**
2. **If the user requests a color not on the list, suggest the closest available color and guide them to choose from the list.**
3. **Secondary and gray colors must also be selected only from the list above.**
4. **Recommend secondary and gray colors that complement the primary color according to color theory and harmony principles.**
- Primary is a color that reflects the brand's message, and is used for major components throughout the UI, such as buttons and active states.
- Secondary is a supporting color, used throughout components that play a secondary role in the UI.
- Gray is used for text, backgrounds, borders, etc., serving to convey information and indicate hierarchy.
- The color contrast ratio must be checked to ensure it meets the WCAG (Web Content Accessibility Guidelines) AA level
5. **Strictly avoid color overlap.** Primary, secondary, and gray colors must be different from each other.
6. **Confirm the finalized color combination with the user.**
7. **Explain to the user the reason for the color selection.**
8. **Execute the 'init' tool with the final colors. Use only values exactly as they appear in the color list above.**


**Important notes:**
- Color values must only be used from the lists above.
- Colors not in the list (e.g., 'magenta', 'brown') cannot be used.
- When executing the 'DesignSystemCLI init' tool, color arguments must be passed with the exact names from the list.`,
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
          text: "I can help you set up the theme colors for your design system. First, you need to select a primary color. Please choose from the following colors: rose, pink, fuchsia, purple, violet, indigo, blue, sky, cyan, teal, emerald, green, lime, yellow, amber, orange, red, neutral, stone, zinc, gray, slate. Which color would you like to use as your primary color?",
        },
      },
    ],
  }
})
