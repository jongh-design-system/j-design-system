import { defineConfig } from "@pandacss/dev"
import { preset } from "@jongh/panda-preset"
export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", preset()],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  watch: true,
})
