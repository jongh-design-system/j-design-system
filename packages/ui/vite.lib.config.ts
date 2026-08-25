import { readFile } from "node:fs/promises"
import { relative, resolve, sep } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  publicDir: false,
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    {
      name: "color-themes",
      async buildStart() {
        for (const name of ["blue", "purple"]) {
          const css = await readFile(
            resolve(
              import.meta.dirname,
              `styled-system/styles/themes/${name}.css`,
            ),
            "utf8",
          )

          this.emitFile({
            type: "asset",
            fileName: `${name}.css`,
            source: css.replaceAll(
              `[data-panda-theme=${name}]`,
              `[data-color-theme=${name}]`,
            ),
          })
        }
      },
    },
    {
      name: "public-component-entries",
      moduleParsed(moduleInfo) {
        if (moduleInfo.id !== resolve(import.meta.dirname, "src/index.ts")) {
          return
        }

        const componentDirectory = resolve(import.meta.dirname, "src/component")

        for (const id of moduleInfo.importedIds) {
          const [name, file, ...rest] = relative(componentDirectory, id).split(
            sep,
          )

          if (!name || file !== "index.tsx" || rest.length > 0) continue

          this.emitFile({
            type: "chunk",
            id,
            fileName: `component/${name}/index.js`,
          })
        }
      },
    },
    react(),
    dts({
      bundleTypes: true,
      exclude: ["src/**/*.stories.tsx"],
      include: ["src"],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
      cssFileName: "style",
    },
    rolldownOptions: {
      input: {
        index: resolve(import.meta.dirname, "src/index.ts"),
        style: resolve(import.meta.dirname, "styled-system/styles.css"),
      },
      external: [
        "react",
        "react-dom",
        /^react\//,
        /^react-dom\//,
        "radix-ui",
        "radix-ui/internal",
      ],
      output: {
        banner: '"use client";',
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
})
