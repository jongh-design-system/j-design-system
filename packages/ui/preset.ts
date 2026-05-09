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
    DEFAULT: {
      value: { base: "{colors.slate.700}", _dark: "{colors.slate.300}" },
    },
    muted: {
      value: { base: "{colors.slate.500}", _dark: "{colors.slate.400}" },
    },
    emphasized: {
      value: { base: "{colors.slate.900}", _dark: "{colors.slate.100}" },
    },
    primary: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.400}" },
    },
    destructive: {
      value: { base: "{colors.red.600}", _dark: "{colors.red.400}" },
    },
    inverted: {
      value: { base: "{colors.white}", _dark: "{colors.slate.950}" },
    },
  },
  layer: {
    DEFAULT: { value: { base: "{colors.white}", _dark: "{colors.slate.950}" } },
    floating: {
      value: { base: "{colors.slate.50}", _dark: "{colors.slate.900}" },
    },
    active: {
      value: { base: "{colors.slate.100}", _dark: "{colors.slate.800}" },
    },
    overlay: {
      value: { base: "{colors.black/50}", _dark: "{colors.black/50}" },
    },
  },
  primary: {
    DEFAULT: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.700}" },
    },
    active: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.300}" },
    },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.50}" },
    },
  },
  secondary: {
    DEFAULT: {
      value: { base: "{colors.gray.700}", _dark: "{colors.gray.500}" },
    },
    active: {
      value: { base: "{colors.gray.800}", _dark: "{colors.gray.400}" },
    },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.50}" },
    },
  },
  neutral: {
    DEFAULT: {
      value: { base: "{colors.slate.100}", _dark: "{colors.slate.800}" },
    },
    active: {
      value: { base: "{colors.slate.200}", _dark: "{colors.slate.700}" },
    },
  },
  destructive: {
    DEFAULT: { value: { base: "{colors.red.600}", _dark: "{colors.red.400}" } },
    active: { value: { base: "{colors.red.700}", _dark: "{colors.red.300}" } },
    foreground: {
      value: { base: "{colors.white}", _dark: "{colors.slate.50}" },
    },
  },
  stroke: {
    DEFAULT: {
      value: { base: "{colors.slate.300}", _dark: "{colors.slate.50}" },
    },
    subtle: {
      value: { base: "{colors.slate.200}", _dark: "{colors.slate.800}" },
    },
    interactive: {
      value: { base: "{colors.blue.400}", _dark: "{colors.blue.500}" },
    },
    ring: { value: { base: "{colors.blue.500}", _dark: "{colors.blue.400}" } },
    destructive: {
      value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
  },
})

const borders = defineSemanticTokens.borders({
  base: { value: "1px solid {colors.stroke}" },
  input: { value: "1px solid {colors.stroke.subtle}" },
  primary: { value: "1px solid {colors.stroke.interactive}" },
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
    body: {
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
})
