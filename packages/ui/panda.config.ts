import { defineConfig } from "@pandacss/dev"

import { breakpoints } from "./src/layout"
import { recipes, slotRecipes } from "./src/recipes"
import {
  colorThemes,
  colorTokens,
  durationTokens,
  easingTokens,
  fontSizeTokens,
  fontWeightTokens,
  gradientTokens,
  lineHeightTokens,
  radiusTokens,
  semanticColorTokens,
  shadowTokens,
  spacingTokens,
  textStyleTokens,
} from "./src/token"

export default defineConfig({
  preflight: true,
  minify: true,
  presets: [],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictPropertyValues: true,
  strictTokens: true,
  conditions: {
    extend: Object.fromEntries(
      Object.keys(breakpoints).map((breakpoint) => [
        breakpoint,
        `@container style(--breakpoint-active: ${breakpoint})`,
      ]),
    ),
  },
  hooks: {
    "codegen:prepare": ({ artifacts }) =>
      artifacts.map((artifact) => {
        if (artifact.id !== "themes" && artifact.id !== "types-conditions") {
          return artifact
        }

        return {
          ...artifact,
          files: artifact.files.map((file) => ({
            ...file,
            code: file.code
              ?.replaceAll("data-panda-theme", "data-color-theme") //pandacss 네이밍 대신 중립적으로 변경
              .replaceAll("pandaTheme", "colorTheme"),
          })),
        }
      }),
    "cssgen:done": ({ content }) =>
      content.replaceAll("data-panda-theme", "data-color-theme"),
  },
  globalCss: {
    ":root": {
      "--breakpoint-active": "base",
      ...(Object.fromEntries(
        Object.entries(breakpoints).map(([breakpoint, value]) => [
          `@media screen and (min-width: ${value})`,
          { "--breakpoint-active": breakpoint },
        ]),
      ) as Record<string, { "--breakpoint-active": string }>),
    },
    "*, *::before, *::after": {
      "@media (prefers-reduced-motion: reduce)": {
        animationDuration: "[0.01ms]",
        animationIterationCount: "[1]",
        transitionDuration: "[0.01ms]",
      },
    },
  },
  staticCss: {
    recipes: "*",
  },
  themes: colorThemes,
  theme: {
    extend: {
      keyframes: {
        "accordion-down_radix": {
          from: { height: "[0]" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up_radix": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "[0]" },
        },
        contentShow: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        contentHide: {
          "0%": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
          to: {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.96)",
          },
        },
        selectContentShow: {
          "0%": {
            opacity: 0,
            transform: "scale(0.97)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        selectContentHide: {
          "0%": {
            opacity: 1,
            transform: "scale(1)",
          },
          to: {
            opacity: 0,
            transform: "scale(0.99)",
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          to: { opacity: 0 },
        },
        slideInDown: {
          "0%": {
            transform: "translate3d(0, -100%, 0)",
            visibility: "visible",
          },
          to: { transform: "translateZ(0)" },
        },
      },
      textStyles: textStyleTokens,
      tokens: {
        colors: colorTokens,
        durations: durationTokens,
        easings: easingTokens,
        fontSizes: fontSizeTokens,
        fontWeights: fontWeightTokens,
        lineHeights: lineHeightTokens,
        radii: radiusTokens,
        spacing: spacingTokens,
      },
      semanticTokens: {
        colors: semanticColorTokens,
        gradients: gradientTokens,
        shadows: shadowTokens,
      },
      recipes,
      slotRecipes,
    },
  },
})
