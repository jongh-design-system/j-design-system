import { defineConfig } from "@pandacss/dev"
import { colors, radii, fontSizes, textStyles } from "./index"
import { preset } from "./src/components/preset"
export default defineConfig({
  outExtension: "mjs",
  jsxFramework: "react",
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/stories/**/*.{js,jsx,ts,tsx}",
  ],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  presets: ["@pandacss/preset-base", preset],
  eject: true,
  exclude: [],
  dependencies: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  preflight: true,
  minify: true,
  polyfill: true,
  strictTokens: true,
  strictPropertyValues: true,
  utilities: {
    width: {
      values: "string",
    },
    height: {
      values: "string",
    },
    minWidth: {
      values: "string",
    },
    minHeight: {
      values: "string",
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        ...colors,
        white: {
          value: {
            base: "#FFFFFF",
            _dark: "#FFFFFF",
          },
        },
      },
    },
    tokens: {
      radii,
      fontSizes,
    },
    textStyles,
  },
  // The output directory for your css system
  outdir: "../generated",
  importMap: "jh-generated",
  staticCss: {
    recipes: {
      button: ["*"],
      tagButton: ["*"],
    },
  },
})
