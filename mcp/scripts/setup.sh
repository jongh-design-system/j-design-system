#!/bin/bash

# Create .cursor directory if it doesn't exist
mkdir -p .cursor

# Install dependencies with pnpm
pnpm install

# Create mcp.json with the current directory path
echo "{
  \"mcpServers\": {
    \"TalkToFigma\": {
      \"command\": \"npx\",
      \"args\": [
        \"cursor-talk-to-figma-mcp\"
      ]
    }
  }
}" > .cursor/mcp.json 