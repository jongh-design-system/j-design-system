import { defineConfig } from "@pandacss/dev"
import { preset } from "panda-animation"

import { defaultPreset } from "./preset"

export default defineConfig({
  // Whether to use css reset
  globalCss: {
    "li,ul": {
      listStyle: "none",
    },
  },
  preflight: true,
  jsxFramework: "react",
  // Where to look for your css declarations
  include: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/mdx-components.tsx",
  ],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
  presets: [preset(), "@pandacss/preset-panda", defaultPreset],
})
