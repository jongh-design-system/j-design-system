import { defineConfig } from "@pandacss/dev"
import { preset } from "./src/preset"

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: [preset],
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  watch: true,
  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styled-system",
})
