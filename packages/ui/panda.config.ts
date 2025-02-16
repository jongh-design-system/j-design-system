import { defineConfig } from "@pandacss/dev"
import { preset } from "panda-animation"

import { defaultPreset } from "./preset"
export default defineConfig({
  preflight: true,
  presets: [preset(), "@pandacss/preset-panda", defaultPreset],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictPropertyValues: true,
  strictTokens: true,
})
