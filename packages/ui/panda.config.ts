import { defineConfig } from "@pandacss/dev"
import { defaultPreset } from "./preset"
import { preset } from "panda-animation"
export default defineConfig({
  preflight: true,
  presets: [preset(), "@pandacss/preset-panda", defaultPreset],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictPropertyValues: true,
  strictTokens: true,
})
