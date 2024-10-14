import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import { resolve } from "path"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), dts(), tsconfigPaths()],
  build: {
    lib: {
      entry: [resolve(__dirname, "src/components/index.ts")],
      fileName: (format) => `index.${format}.js`,
      name: "components",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
