import { readFile } from "node:fs/promises"
import { posix, resolve } from "node:path"

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
      name: "component-css",
      async generateBundle(_options, bundle) {
        // Shared CSS
        let baseCss = "@layer reset, base, tokens, recipes, utilities;\n"

        for (const name of ["reset", "global", "tokens", "utilities"]) {
          const fileName = resolve(
            import.meta.dirname,
            `styled-system/styles/${name}.css`,
          )

          try {
            baseCss += `${await readFile(fileName, "utf8")}\n`
          } catch {
            this.error(
              `[component-css:MISSING_BASE_CSS] Panda did not generate ${fileName}`,
            )
          }
        }

        this.emitFile({ type: "asset", fileName: "base.css", source: baseCss })

        const emittedRecipeCss = new Set<string>()

        // Component chunks and their recipes
        for (const output of Object.values(bundle)) {
          if (output.type !== "chunk") continue

          const componentNames = new Set<string>()

          for (const moduleId of Object.keys(output.modules)) {
            const componentModule = moduleId
              .replaceAll("\\", "/")
              .split("?", 1)[0]
              .match(/\/src\/component\/([^/]+)\/index\.tsx$/)

            if (componentModule) componentNames.add(componentModule[1])
          }

          if (componentNames.size === 0) continue

          if (componentNames.size !== 1) {
            this.error(
              `[component-css:AMBIGUOUS_CHUNK] ${output.fileName} contains multiple components: ${[...componentNames].join(", ")}`,
            )
          }

          if (output.dynamicImports.length > 0) {
            this.error(
              `[component-css:DYNAMIC_IMPORT] ${output.fileName} contains a dynamic import`,
            )
          }

          const recipeNames = new Set<string>()
          const recipeChunks = [output]

          for (const importedFileName of output.imports) {
            const normalizedImportedFileName = importedFileName.startsWith(".")
              ? posix.normalize(
                  posix.join(posix.dirname(output.fileName), importedFileName),
                )
              : importedFileName
            const importedOutput =
              bundle[importedFileName] ?? bundle[normalizedImportedFileName]

            if (importedOutput?.type === "chunk") {
              recipeChunks.push(importedOutput)
            } else if (
              importedFileName.startsWith(".") ||
              importedFileName.startsWith("chunks/")
            ) {
              this.error(
                `[component-css:BROKEN_GRAPH] ${output.fileName} imports missing chunk ${importedFileName}`,
              )
            }
          }

          for (const chunk of recipeChunks) {
            for (const moduleId of Object.keys(chunk.modules)) {
              const normalizedModuleId = moduleId
                .replaceAll("\\", "/")
                .split("?", 1)[0]

              if (normalizedModuleId.endsWith("/create-recipe.mjs")) continue

              const recipeModule = normalizedModuleId.match(
                /\/styled-system\/recipes\/([^/]+-recipe)\.mjs$/,
              )

              if (recipeModule) recipeNames.add(recipeModule[1])
            }
          }

          if (recipeNames.size === 0) {
            this.error(
              `[component-css:NO_RECIPE] ${output.fileName} does not reach a Panda recipe`,
            )
          }

          // CSS imports on the implementation chunk
          const baseImportPath = posix.relative(
            posix.dirname(output.fileName),
            "base.css",
          )
          const cssImports = [
            `import "${baseImportPath.startsWith(".") ? baseImportPath : `./${baseImportPath}`}";`,
          ]

          for (const recipeName of [...recipeNames].sort()) {
            const sourceFileName = resolve(
              import.meta.dirname,
              `styled-system/styles/recipes/${recipeName}.css`,
            )
            const outputFileName = `recipes/${recipeName}.css`
            let css: string

            try {
              css = await readFile(sourceFileName, "utf8")
            } catch {
              this.error(
                `[component-css:MISSING_CSS] ${output.fileName} reaches ${recipeName}.mjs, but Panda did not generate ${sourceFileName}`,
              )
            }

            if (!emittedRecipeCss.has(outputFileName)) {
              this.emitFile({
                type: "asset",
                fileName: outputFileName,
                source: css,
              })
              emittedRecipeCss.add(outputFileName)
            }

            const recipeImportPath = posix.relative(
              posix.dirname(output.fileName),
              outputFileName,
            )
            cssImports.push(
              `import "${recipeImportPath.startsWith(".") ? recipeImportPath : `./${recipeImportPath}`}";`,
            )
          }

          if (!output.code.startsWith('"use client";')) {
            this.error(
              `[component-css:MISSING_DIRECTIVE] ${output.fileName} does not start with use client`,
            )
          }

          output.code = output.code.replace(
            '"use client";',
            `"use client";\n${cssImports.join("\n")}`,
          )
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
      preserveEntrySignatures: "allow-extension",
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
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name(id) {
                const normalizedId = id.replaceAll("\\", "/").split("?", 1)[0]
                const recipeModule = normalizedId.match(
                  /\/styled-system\/recipes\/([^/]+-recipe)\.mjs$/,
                )

                if (recipeModule && recipeModule[1] !== "create-recipe") {
                  return `recipe-${recipeModule[1]}`
                }

                return null
              },
            },
            {
              name: "panda-runtime",
              test(id) {
                const normalizedId = id.replaceAll("\\", "/").split("?", 1)[0]

                return (
                  normalizedId.includes("/styled-system/") &&
                  normalizedId.endsWith(".mjs")
                )
              },
            },
            {
              name: "icon-runtime",
              test(id) {
                const normalizedId = id.replaceAll("\\", "/").split("?", 1)[0]

                return normalizedId.includes("/src/icon/")
              },
            },
            {
              name(id: string) {
                const normalizedId = id.replaceAll("\\", "/").split("?", 1)[0]

                const componentModule = normalizedId.match(
                  /\/src\/component\/([^/]+)\//,
                )

                return componentModule
                  ? `component-${componentModule[1]}`
                  : null
              },
            },
          ],
        },
      },
    },
  },
})
