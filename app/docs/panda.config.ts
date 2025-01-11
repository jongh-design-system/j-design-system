import { defineConfig } from "@pandacss/dev"
import { preset } from "panda-animation"
import { defaultPreset } from "./preset"

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/app/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

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
