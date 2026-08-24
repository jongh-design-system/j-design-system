import { defineConfig } from "@pandacss/dev"

import { defaultPreset } from "./preset"
export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-panda", defaultPreset],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictPropertyValues: true,
  strictTokens: true,
  globalCss: {
    body: {
      fontFamily: "Pretendard Variable",
    },
  },
  theme: {
    extend: {
      keyframes: {
        "accordion-down_radix": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up_radix": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        contentShow: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        fadeIn: { "0%": { opacity: 0 }, to: { opacity: 1 } },
        fadeOut: { "0%": { opacity: 1 }, to: { opacity: 0 } },
        slideInDown: {
          "0%": {
            transform: "translate3d(0, -100%, 0)",
            visibility: "visible",
          },
          to: { transform: "translateZ(0)" },
        },
      },
    },
  },
})
