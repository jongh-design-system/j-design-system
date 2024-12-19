import { defineConfig } from "@pandacss/dev"
import { defaultPreset } from "./preset"
export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-panda", defaultPreset],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictTokens: true,
})
