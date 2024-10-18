import { defineConfig } from "@pandacss/dev"
import { preset } from "../panda-preset/src/preset"
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
  strictPropertyValues: true,
  strictTokens: true,
  presets: ["@pandacss/preset-base", preset],

  dependencies: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  preflight: true,
  polyfill: true,

  outdir: "./src/styled-system",
})
