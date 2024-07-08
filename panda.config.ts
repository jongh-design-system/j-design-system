import { defineConfig } from "@pandacss/dev"
import { colors, radii, fontSizes, textStyles } from "./src/theme/tokens/index"
export default defineConfig({
  outExtension: "js",
  jsxFramework: "react",
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
    fontSize: {
      values: "fontSizes",
    },
  },
  theme: {
    semanticTokens: {
      colors,
    },
    tokens: {
      radii,
      fontSizes,
    },
    textStyles,
  },

  // The output directory for your css system
  outdir: "styled-system",
})
