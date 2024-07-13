import { defineConfig } from "@pandacss/dev"
import { colors, radii, fontSizes, textStyles } from "./index"
export default defineConfig({
  outExtension: "mjs",
  jsxFramework: "react",
  syntax: "object-literal",
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  exclude: [],
  presets: ["@pandacss/preset-base"],
  eject: true,
  strictTokens: true,
  strictPropertyValues: true,

  utilities: {
    color: {
      values: "colors",
    },
    borderRadius: {
      values: "radii",
    },
    backgroundColor: {
      values: "colors",
    },
    fontSize: {
      values: "fontSizes",
    },
    extend: {
      width: {
        values: { type: "string" },
      },
      minWidth: {
        values: { type: "string" },
      },
      height: {
        values: { type: "string" },
      },
      minHeight: {
        values: { type: "string" },
      },
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        ...colors,
        white: {
          //임시로 추가
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
  importMap: {
    css: "jh-generated/css",
    recipes: "jh-generated/recipes",
    patterns: "jh-generated/patterns",
    jsx: "jh-generated/jsx",
  },
})
