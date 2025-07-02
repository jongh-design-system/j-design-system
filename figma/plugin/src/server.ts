#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import WebSocket from "ws"
import { v4 as uuidv4 } from "uuid"

// Define TypeScript interfaces for Figma responses
interface FigmaResponse {
  id: string
  result?: any
  error?: string
}

// Custom logging functions that write to stderr instead of stdout to avoid being captured
const logger = {
  info: (message: string) => process.stderr.write(`[INFO] ${message}\n`),
  debug: (message: string) => process.stderr.write(`[DEBUG] ${message}\n`),
  warn: (message: string) => process.stderr.write(`[WARN] ${message}\n`),
  error: (message: string) => process.stderr.write(`[ERROR] ${message}\n`),
  log: (message: string) => process.stderr.write(`[LOG] ${message}\n`),
}

// WebSocket connection and request tracking
let ws: WebSocket | null = null
const pendingRequests = new Map<
  string,
  {
    resolve: (value: unknown) => void
    reject: (reason: unknown) => void
    timeout: ReturnType<typeof setTimeout>
  }
>()

// Track which channel each client is in
let currentChannel: string | null = null

// Create MCP server
const server = new McpServer({
  name: "@jongh/figma-plugin",
  version: "1.0.0",
})
// Add command line argument parsing
const args = process.argv.slice(2)
const serverArg = args.find((arg) => arg.startsWith("--server="))
const serverUrl = serverArg ? serverArg.split("=")[1] : "localhost"
const WS_URL =
  serverUrl === "localhost" ? `ws://${serverUrl}` : `wss://${serverUrl}`

// Document Info Tool
server.tool(
  "get_document_info",
  "Get detailed information about the current Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_document_info")
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting document info: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Selection Tool
server.tool(
  "get_selection",
  "Get information about the current selection in Figma",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_selection")
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting selection: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

//get component set styles
server.tool(
  "get_component_set_styles",
  "Get the styles of a component set",
  {
    nodeId: z.string().describe("The ID of the node to get information about"),
  },
  async ({ nodeId }) => {
    try {
      const result = await sendCommandToFigma("get_component_set_styles", {
        nodeId,
      })
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting node info: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Node Info Tool
server.tool(
  "get_node_info",
  "Get detailed information about a specific node in Figma",
  {
    nodeId: z.string().describe("The ID of the node to get information about"),
  },
  async ({ nodeId }) => {
    try {
      const result = await sendCommandToFigma("get_node_info", { nodeId })
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting node info: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Nodes Info Tool
server.tool(
  "get_nodes_info",
  "Get detailed information about multiple nodes in Figma",
  {
    nodeIds: z
      .array(z.string())
      .describe("Array of node IDs to get information about"),
  },
  async ({ nodeIds }) => {
    try {
      const results = await Promise.all(
        nodeIds.map(async (nodeId) => {
          const result = await sendCommandToFigma("get_node_info", { nodeId })
          return { nodeId, info: result }
        }),
      )
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting nodes info: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Get Styles Tool
server.tool(
  "get_styles",
  "Get all styles from the current Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_styles")
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting styles: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Get Local Components Tool
server.tool(
  "get_local_components",
  "Get all local components from the Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_local_components")
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting local components: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

//Get Team Components Tool
server.tool(
  "get_team_components",
  "Get all team library components available in Figma",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_team_components")
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting team components: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Export Node as Image Tool
server.tool(
  "export_node_as_image",
  "Export a node as an image from Figma",
  {
    nodeId: z.string().describe("The ID of the node to export"),
    format: z
      .enum(["PNG", "JPG", "SVG", "PDF"])
      .optional()
      .describe("Export format"),
    scale: z.number().positive().optional().describe("Export scale"),
  },
  async ({ nodeId, format, scale }) => {
    try {
      const result = await sendCommandToFigma("export_node_as_image", {
        nodeId,
        format: format || "PNG",
        scale: scale || 1,
      })
      const typedResult = result as any

      // return {
      //   content: [
      //     {
      //       type: "image",
      //       data: typedResult.imageData,
      //       mimeType: typedResult.mimeType || "image/png"
      //     }
      //   ]
      // };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(typedResult),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error exporting node as image: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

//Execute Figma Code Tool
server.tool(
  "execute_figma_code",
  "Execute arbitrary JavaScript code in Figma (use with caution)",
  {
    code: z.string().describe("JavaScript code to execute in Figma"),
  },
  async ({ code }) => {
    try {
      const result = await sendCommandToFigma("execute_code", { code })
      return {
        content: [
          {
            type: "text",
            text: `Code executed successfully: ${JSON.stringify(result, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing code: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Define design strategy prompt
server.prompt(
  "design_strategy",
  "Best practices for working with Figma designs",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `When working with Figma designs, follow these best practices:

1. Start with Document Structure:
   - First use get_document_info() to understand the current document
   - Plan your layout hierarchy before creating elements
   - Create a main container frame for each screen/section

2. Naming Conventions:
   - Use descriptive, semantic names for all elements
   - Follow a consistent naming pattern (e.g., "Login Screen", "Logo Container", "Email Input")
   - Group related elements with meaningful names

3. Layout Hierarchy:
   - Create parent frames first, then add child elements
   - For forms/login screens:
     * Start with the main screen container frame
     * Create a logo container at the top
     * Group input fields in their own containers
     * Place action buttons (login, submit) after inputs
     * Add secondary elements (forgot password, signup links) last

4. Input Fields Structure:
   - Create a container frame for each input field
   - Include a label text above or inside the input
   - Group related inputs (e.g., username/password) together

5. Element Creation:
   - Use create_frame() for containers and input fields
   - Use create_text() for labels, buttons text, and links
   - Set appropriate colors and styles:
     * Use fillColor for backgrounds
     * Use strokeColor for borders
     * Set proper fontWeight for different text elements

6. Mofifying existing elements:
  - use set_text_content() to modify text content.

7. Visual Hierarchy:
   - Position elements in logical reading order (top to bottom)
   - Maintain consistent spacing between elements
   - Use appropriate font sizes for different text types:
     * Larger for headings/welcome text
     * Medium for input labels
     * Standard for button text
     * Smaller for helper text/links

8. Best Practices:
   - Verify each creation with get_node_info()
   - Use parentId to maintain proper hierarchy
   - Group related elements together in frames
   - Keep consistent spacing and alignment

Example Login Screen Structure:
- Login Screen (main frame)
  - Logo Container (frame)
    - Logo (image/text)
  - Welcome Text (text)
  - Input Container (frame)
    - Email Input (frame)
      - Email Label (text)
      - Email Field (frame)
    - Password Input (frame)
      - Password Label (text)
      - Password Field (frame)
  - Login Button (frame)
    - Button Text (text)
  - Helper Links (frame)
    - Forgot Password (text)
    - Don't have account (text)`,
          },
        },
      ],
      description: "Best practices for working with Figma designs",
    }
  },
)

// Define command types and parameters
type FigmaCommand =
  | "get_document_info"
  | "get_selection"
  | "get_node_info"
  | "get_styles"
  | "get_local_components"
  | "get_team_components"
  | "export_node_as_image"
  | "execute_code"
  | "join"
  | "get_component_set_styles"

// Update the connectToFigma function
function connectToFigma(port: number = 3055) {
  // If already connected, do nothing
  if (ws && ws.readyState === WebSocket.OPEN) {
    logger.info("Already connected to Figma")
    return
  }

  const wsUrl = serverUrl === "localhost" ? `${WS_URL}:${port}` : WS_URL
  logger.info(`Connecting to Figma socket server at ${wsUrl}...`)
  ws = new WebSocket(wsUrl)

  ws.on("open", () => {
    logger.info("Connected to Figma socket server")
    // Reset channel on new connection
    currentChannel = null
  })

  ws.on("message", (data: any) => {
    try {
      const json = JSON.parse(data) as { message: FigmaResponse }
      const myResponse = json.message
      logger.debug(`Received message: ${JSON.stringify(myResponse)}`)
      logger.log("myResponse" + JSON.stringify(myResponse))

      // Handle response to a request
      if (
        myResponse.id &&
        pendingRequests.has(myResponse.id) &&
        myResponse.result
      ) {
        const request = pendingRequests.get(myResponse.id)!
        clearTimeout(request.timeout)

        if (myResponse.error) {
          logger.error(`Error from Figma: ${myResponse.error}`)
          request.reject(new Error(myResponse.error))
        } else {
          if (myResponse.result) {
            request.resolve(myResponse.result)
          }
        }

        pendingRequests.delete(myResponse.id)
      } else {
        // Handle broadcast messages or events
        logger.info(`Received broadcast message: ${JSON.stringify(myResponse)}`)
      }
    } catch (error) {
      logger.error(
        `Error parsing message: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  })

  ws.on("error", (error) => {
    logger.error(`Socket error: ${error}`)
  })

  ws.on("close", () => {
    logger.info("Disconnected from Figma socket server")
    ws = null

    // Reject all pending requests
    for (const [id, request] of pendingRequests.entries()) {
      clearTimeout(request.timeout)
      request.reject(new Error("Connection closed"))
      pendingRequests.delete(id)
    }

    // Attempt to reconnect
    logger.info("Attempting to reconnect in 2 seconds...")
    setTimeout(() => connectToFigma(port), 2000)
  })
}

// Function to join a channel
async function joinChannel(channelName: string): Promise<void> {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    throw new Error("Not connected to Figma")
  }

  try {
    await sendCommandToFigma("join", { channel: channelName })
    currentChannel = channelName
    logger.info(`Joined channel: ${channelName}`)
  } catch (error) {
    logger.error(
      `Failed to join channel: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}

// Function to send commands to Figma
function sendCommandToFigma(
  command: FigmaCommand,
  params: unknown = {},
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // If not connected, try to connect first
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      connectToFigma()
      reject(new Error("Not connected to Figma. Attempting to connect..."))
      return
    }

    // Check if we need a channel for this command
    const requiresChannel = command !== "join"
    if (requiresChannel && !currentChannel) {
      reject(new Error("Must join a channel before sending commands"))
      return
    }

    const id = uuidv4()
    const request = {
      id,
      type: command === "join" ? "join" : "message",
      ...(command === "join"
        ? { channel: (params as any).channel }
        : { channel: currentChannel }),
      message: {
        id,
        command,
        params: {
          ...(params as any),
        },
      },
    }

    // Set timeout for request
    const timeout = setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id)
        logger.error(`Request ${id} to Figma timed out after 30 seconds`)
        reject(new Error("Request to Figma timed out"))
      }
    }, 30000) // 30 second timeout

    // Store the promise callbacks to resolve/reject later
    pendingRequests.set(id, { resolve, reject, timeout })

    // Send the request
    logger.info(`Sending command to Figma: ${command}`)
    logger.debug(`Request details: ${JSON.stringify(request)}`)
    ws.send(JSON.stringify(request))
  })
}

// Update the join_channel tool
server.tool(
  "join_channel",
  "Join a specific channel to communicate with Figma",
  {
    channel: z.string().describe("The name of the channel to join").default(""),
  },
  async ({ channel }) => {
    try {
      if (!channel) {
        // If no channel provided, ask the user for input
        return {
          content: [
            {
              type: "text",
              text: "Please provide a channel name to join:",
            },
          ],
          followUp: {
            tool: "join_channel",
            description: "Join the specified channel",
          },
        }
      }

      await joinChannel(channel)
      return {
        content: [
          {
            type: "text",
            text: `Successfully joined channel: ${channel}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error joining channel: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  },
)

// Start the server
async function main() {
  try {
    // Try to connect to Figma socket server
    connectToFigma()
  } catch (error) {
    logger.warn(
      `Could not connect to Figma initially: ${error instanceof Error ? error.message : String(error)}`,
    )
    logger.warn("Will try to connect when the first command is sent")
  }

  // Start the MCP server with stdio transport
  const transport = new StdioServerTransport()
  await server.connect(transport)
  logger.info("FigmaMCP server running on stdio")
}

// Run the server
main().catch((error) => {
  logger.error(
    `Error starting FigmaMCP server: ${error instanceof Error ? error.message : String(error)}`,
  )
  process.exit(1)
})
