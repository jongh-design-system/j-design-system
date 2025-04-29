import {
  definePreset,
  defineSemanticTokens,
  defineTextStyles,
  defineTokens,
} from "@pandacss/dev"

const radii = defineTokens.radii({
  radius: { value: "0.5rem" },
})

export const semanticColors = defineSemanticTokens.colors({
  background: {
    value: { base: "{colors.white}", _dark: "{colors.slate.950}" },
  },
  foreground: {
    value: { base: "{colors.slate.950}", _dark: "{colors.slate.50}" },
  },
  card: {
    DEFAULT: {
      value: { base: "{colors.white}", _dark: "{colors.slate.900}" },
    },
    foreground: {
      value: { base: "{colors.slate.950}", _dark: "{colors.slate.50}" },
    },
  },
  popover: {
    DEFAULT: {
      value: { base: "{colors.white}", _dark: "{colors.slate.900}" },
    },
    foreground: {
      value: { base: "{colors.slate.950}", _dark: "{colors.slate.50}" },
    },
  },
  primary: {
    DEFAULT: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.400}" },
    },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.950}" },
    },
  },
  secondary: {
    DEFAULT: {
      value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.950}" },
    },
  },
  muted: {
    DEFAULT: {
      value: { base: "{colors.slate.100}", _dark: "{colors.slate.800}" },
    },
    foreground: {
      value: { base: "{colors.slate.500}", _dark: "{colors.slate.400}" },
    },
  },
  accent: {
    DEFAULT: {
      value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" },
    },
    foreground: {
      value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
    },
  },
  destructive: {
    DEFAULT: {
      value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.950}" },
    },
  },
  border: {
    value: { base: "{colors.slate.200}", _dark: "{colors.slate.800}" },
  },
  input: {
    value: { base: "{colors.slate.200}", _dark: "{colors.slate.800}" },
  },
  ring: {
    value: { base: "{colors.blue.500}", _dark: "{colors.blue.400}" },
  },
})

const borders = defineSemanticTokens.borders({
  base: { value: "1px solid {colors.border}" },
  input: { value: "1px solid {colors.input}" },
  primary: { value: "1px solid {colors.primary}" },
  destructive: { value: "1px solid {colors.destructive}" },
})

export const textStyles = defineTextStyles({
  // Display 계열
  display1: {
    value: {
      fontWeight: "{fontWeights.bold}",
      fontSize: "4.5rem", // 6xl
      lineHeight: "{lineHeights.loose}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  display2: {
    value: {
      fontWeight: "{fontWeights.bold}",
      fontSize: "3.75rem", // 5xl
      lineHeight: "{lineHeights.relaxed}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  // Title 계열
  title1: {
    value: {
      fontWeight: "semibold",
      fontSize: "2.25rem", // 3xl
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  title2: {
    value: {
      fontWeight: "semibold",
      fontSize: "1.5rem", // 2xl
      lineHeight: "{lineHeights.snug}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  title3: {
    value: {
      fontWeight: "{fontWeights.bold}",
      fontSize: "1.25rem", // xl
      lineHeight: "{lineHeights.snug}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  // Heading 계열
  heading1: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "1.125rem", // lg
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  heading2: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "1rem", // md
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  // Body 계열
  body1: {
    value: {
      fontWeight: "{fontWeights.normal}",
      fontSize: "1rem", // md
      lineHeight: "{lineHeights.relaxed}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  body2: {
    value: {
      fontWeight: "{fontWeights.normal}",
      fontSize: "0.875rem", // sm
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  // Label/Caption 계열
  label1: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "0.875rem", // sm
      lineHeight: "{lineHeights.snug}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
  label2: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "0.75rem", // xs
      lineHeight: "{lineHeights.snug}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
  caption1: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "0.75rem", // xs
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
  caption2: {
    value: {
      fontWeight: "{fontWeights.semibold}",
      fontSize: "0.625rem", // 2xs
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
})

export const defaultPreset = definePreset({
  name: "default",
  globalCss: {
    html: {
      background: "background",
      color: "foreground",
    },
  },
  theme: {
    extend: {
      textStyles,
      tokens: {
        radii,
      },
      semanticTokens: {
        colors: semanticColors,
        borders,
      },
    },
  },
  utilities: {
    extend: {
      fluidFontSize: {
        shorthand: "fluidFontSize",
        values: "fontSizes",
        transform(value) {
          if (!value.endsWith("rem")) {
            return value
          }
          try {
            const min = parseFloat(value) * 16 //html 1rem
            const max = min + 0.5 * 16 //min +0.5rem

            const [minRange, maxRange] = [360, 640]
            const slopePxPerVw = (100 * (max - min)) / (maxRange - minRange)
            const intercept = (min - slopePxPerVw * (minRange / 100)) / 16
            const calcPart = `calc(${intercept.toFixed(4)}rem + ${slopePxPerVw.toFixed(4)}vw)`

            return {
              fontSize: `clamp(${value}, ${calcPart}, ${max / 16}rem)`,
            }
          } catch (error) {
            console.error(
              "[fluidFontSize] Error transforming value:",
              error,
              value,
            )
            return {
              fontSize: value,
            }
          }
        },
      },
    },
  },
})
