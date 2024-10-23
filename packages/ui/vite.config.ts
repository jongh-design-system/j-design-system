import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import path, { resolve } from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import { fileURLToPath } from "url"

//Fix: d.ts파일 생성시 경로를 절대경로가 아닌 상대경로로 참조하는 문제

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@styled-system",
        replacement: path.join(__dirname, "./styled-system"),
      },
    ],
  },
  plugins: [react(), tsconfigPaths(), dts()],
  build: {
    lib: {
      entry: [resolve(__dirname, "src/components/index.ts")],
      fileName: (format) => `index.${format}.js`,
      name: "components",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
      treeshake: true,
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      ],
    },

    sourcemap: true,
    emptyOutDir: true,
    minify: false,
  },
})
