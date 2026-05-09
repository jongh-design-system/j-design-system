import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const rootDir = dirname(fileURLToPath(import.meta.url))
const storyStyle = process.env.JDS_STYLE ?? "panda"
const storyStyleEntries: Record<string, string[]> = {
  panda: [resolve(rootDir, ".storybook/panda.css")],
  tailwind: [resolve(rootDir, "src/tokens/tailwind.css")],
}
const storyStyleEntry = storyStyleEntries[storyStyle]
const storyStyleVirtualId = "\0jds-story-style"

if (!storyStyleEntry) {
  throw new Error(`Unsupported JDS_STYLE: ${storyStyle}`)
}

const storyResolver = {
  name: "jds-story-resolver",
  enforce: "pre",
  resolveId(source) {
    if (source === "@story-style") {
      return storyStyleVirtualId
    }

    if (source.startsWith("@story-components/")) {
      const component = source.slice("@story-components/".length)

      return resolve(
        rootDir,
        `src/component/${component}/${storyStyle}/index.tsx`,
      )
    }

    return null
  },
  load(id) {
    if (id !== storyStyleVirtualId) {
      return null
    }

    return [
      `import ${JSON.stringify(resolve(rootDir, ".storybook/index.css"))}`,
      ...storyStyleEntry.map((entry) => `import ${JSON.stringify(entry)}`),
    ].join("\n")
  },
} satisfies Plugin

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    storyResolver,
    tailwindcss(),
    react(),
    tsconfigPaths({ root: "./" }),
  ],
})
