import {
  defineKeyframes,
  definePreset,
  defineSemanticTokens,
  defineTokens,
} from "@pandacss/dev"
import { buttonRecipe } from "./src/component/Button/recipe"
import { accordionRecipe } from "./src/component/Accordion/recipe"
import { tabsRecipe } from "./src/component/Tabs/recipe"
import { sliderRecipe } from "./src/component/Slider/recipe"
import { selectRecipe } from "./src/component/Select/recipe"
import { avatarRecipe } from "./src/component/Avatar/recipe"

const radii = defineTokens.radii({
  radius: { value: "0.5rem" },
})

export const semanticColors = defineSemanticTokens.colors({
  background: {
    value: { base: "hsl(0 0% 100%)", _dark: "hsl(222.2 84% 4.9%)" },
  },
  foreground: {
    value: { base: "hsl(222.2 84% 4.9%)", _dark: "hsl(210 40% 98%)" },
  },
  card: {
    DEFAULT: {
      value: { base: "hsl(0 0% 100%)", _dark: "hsl(222.2 84% 4.9%)" },
    },
    foreground: {
      value: { base: "hsl(222.2 84% 4.9%)", _dark: "hsl(210 40% 98%)" },
    },
  },
  popover: {
    DEFAULT: {
      value: { base: "hsl(0 0% 100%)", _dark: "hsl(222.2 84% 4.9%)" },
    },
    foreground: {
      value: { base: "hsl(222.2 84% 4.9%)", _dark: "hsl(210 40% 98%)" },
    },
  },
  primary: {
    DEFAULT: {
      value: { base: "hsl(222.2 47.4% 11.2%)", _dark: "hsl(210 40% 98%)" },
    },
    foreground: {
      value: { base: "hsl(210 40% 98%)", _dark: "hsl(222.2 47.4% 11.2%)" },
    },
  },
  secondary: {
    DEFAULT: {
      value: { base: "hsl(210 40% 96.1%)", _dark: "hsl(217.2 32.6% 17.5%)" },
    },
    foreground: {
      value: { base: "hsl(222.2 47.4% 11.2%)", _dark: "hsl(210 40% 98%)" },
    },
  },
  muted: {
    DEFAULT: {
      value: { base: "hsl(210 40% 96.1%)", _dark: "hsl(217.2 32.6% 17.5%)" },
    },
    foreground: {
      value: {
        base: "hsl(215.4 16.3% 46.9%)",
        _dark: "hsl(215 20.2% 65.1%)",
      },
    },
  },
  accent: {
    DEFAULT: {
      value: { base: "hsl(210 40% 96.1%)", _dark: "hsl(217.2 32.6% 17.5%)" },
    },
    foreground: {
      value: { base: "hsl(222.2 47.4% 11.2%)", _dark: "hsl(210 40% 98%)" },
    },
  },
  destructive: {
    DEFAULT: {
      value: { base: "hsl(0 84.2% 60.2%)", _dark: "hsl(0 62.8% 30.6%)" },
    },
    foreground: {
      value: { base: "hsl(210 40% 98%)", _dark: "hsl(210 40% 98%)" },
    },
  },
  border: {
    value: {
      base: "hsl(214.3 31.8% 91.4%)",
      _dark: "hsl(217.2 32.6% 17.5%)",
    },
  },
  input: {
    value: {
      base: "hsl(214.3 31.8% 91.4%)",
      _dark: "hsl(217.2 32.6% 17.5%)",
    },
  },
  ring: {
    value: { base: "hsl(222.2 84% 4.9%)", _dark: "hsl(212.7 26.8% 83.9%)" },
  },
})

const borders = defineSemanticTokens.borders({
  base: { value: "1px solid {colors.border}" },
  input: { value: "1px solid {colors.input}" },
  primary: { value: "1px solid {colors.primary}" },
  destructive: { value: "1px solid {colors.destructive}" },
})

export const radius = defineSemanticTokens.radii({
  xl: { value: `calc({radii.radius} + 4px)` },
  lg: { value: `{radii.radius}` },
  md: { value: `calc({radii.radius} - 2px)` },
  sm: { value: "calc({radii.radius} - 4px)" },
})

export const keyframes = defineKeyframes({
  "accordion-down": {
    from: { height: 0 },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: 0 },
  },
})

export const defaultPreset = definePreset({
  theme: {
    extend: {
      tokens: {
        radii,
      },
      semanticTokens: {
        colors: semanticColors,
        radii: radius,
        borders: borders,
      },
      recipes: {
        button: buttonRecipe,
        accordion: accordionRecipe,
        tabs: tabsRecipe,
        slider: sliderRecipe,
        select: selectRecipe,
        avatar: avatarRecipe,
      },
      keyframes,
    },
  },
  staticCss: {
    recipes: "*",
  },
})
