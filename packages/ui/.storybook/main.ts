import { dirname, join, resolve } from "path"
import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig, normalizePath } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // 👇 Default prop filter, which excludes props from node_modules
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config) {
    const packedOutputPlugin = createPackedOutputAliasPlugin()

    return mergeConfig(config, {
      plugins: [tsconfigPaths({ root: "./" }), packedOutputPlugin],
    })
  },
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}

function createPackedOutputAliasPlugin() {
  const packedOutputDir = process.env.PACKED_NEW_SYSTEM_OUTPUT_DIR

  if (!packedOutputDir) {
    return {
      name: "packed-new-system-output-alias",
    }
  }

  const distDir = normalizePath(resolve(packedOutputDir, "dist"))

  return {
    name: "packed-new-system-output-alias",
    enforce: "pre" as const,
    resolveId(source: string) {
      // When the packed-output test is enabled, every public subpath import
      // must resolve to the extracted package contents instead of the workspace
      // package so the story runs against the publish-shaped artifact.
      if (source === "@jongh/new-system-output/react") {
        return `${distDir}/react/index.js`
      }

      if (source === "@jongh/new-system-output/theme") {
        return `${distDir}/theme/index.js`
      }

      if (source === "@jongh/new-system-output/tokens") {
        return `${distDir}/generated/tokens/index.js`
      }

      const recipeMatch = source.match(
        /^@jongh\/new-system-output\/recipes\/(.+)$/,
      )
      if (recipeMatch) {
        return `${distDir}/generated/recipes/${recipeMatch[1]}.js`
      }

      const styleMatch = source.match(
        /^@jongh\/new-system-output\/styles\/(.+\.css)$/,
      )
      if (styleMatch) {
        return `${distDir}/generated/styles/${styleMatch[1]}`
      }

      return null
    },
  }
}
