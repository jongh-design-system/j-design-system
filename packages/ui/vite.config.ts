import { resolve } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  css: {
    postcss: resolve(import.meta.dirname, ".storybook"),
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    tsconfigPaths: true,
  },
  plugins: [react()],
})
