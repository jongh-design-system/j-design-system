import { definePreset, defineSemanticTokens } from "@pandacss/dev"
import { buttonRecipe } from "./src/components/Button/recipe"
import { accordionRecipe } from "./src/components/Accordion/recipe"
import { define } from "./dev"
import { tabRecipe } from "./src/components/Tabs/recipe"
import { sliderRecipe } from "./src/components/Slider/recipe"

export const semanticColors = defineSemanticTokens.colors({
  colors: {
    background: {
      value: {
        base: "hsl(0 0% 100%)",
        _dark: "hsl(222.2 84% 4.9%)",
      },
    },
    foreground: {
      value: {
        base: "hsl(222.2 84% 4.9%)",
        _dark: "hsl(210 40% 98%)",
      },
    },
    card: {
      value: {
        base: "hsl(0 0% 100%)",
        _dark: "hsl(222.2 84% 4.9%)",
      },
      foreground: {
        base: "hsl(222.2 84% 4.9%)",
        _dark: "hsl(210 40% 98%)",
      },
    },
    popover: {
      value: {
        base: "hsl(0 0% 100%)",
        _dark: "hsl(222.2 84% 4.9%)",
      },
      foreground: {
        base: "hsl(222.2 84% 4.9%)",
        _dark: "hsl(210 40% 98%)",
      },
    },
    primary: {
      value: {
        base: "hsl(222.2 47.4% 11.2%)",
        _dark: "hsl(210 40% 98%)",
      },
      foreground: {
        base: "hsl(210 40% 98%)",
        _dark: "hsl(222.2 47.4% 11.2%)",
      },
    },
    secondary: {
      value: {
        base: "hsl(210 40% 96.1%)",
        _dark: "hsl(217.2 32.6% 17.5%)",
      },
      foreground: {
        base: "hsl(222.2 47.4% 11.2%)",
        _dark: "hsl(210 40% 98%)",
      },
    },
    muted: {
      value: {
        base: "hsl(210 40% 96.1%)",
        _dark: "hsl(217.2 32.6% 17.5%)",
      },
      foreground: {
        base: "hsl(215.4 16.3% 46.9%)",
        _dark: "hsl(215 20.2% 65.1%)",
      },
    },
    accent: {
      value: {
        base: "hsl(210 40% 96.1%)",
        _dark: "hsl(217.2 32.6% 17.5%)",
      },
      foreground: {
        base: "hsl(222.2 47.4% 11.2%)",
        _dark: "hsl(210 40% 98%)",
      },
    },
    destructive: {
      value: {
        base: "hsl(0 84.2% 60.2%)",
        _dark: "hsl(0 62.8% 30.6%)",
      },
      foreground: {
        base: "hsl(210 40% 98%)",
        _dark: "hsl(210 40% 98%)",
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
      value: {
        base: "hsl(222.2 84% 4.9%)",
        _dark: "hsl(212.7 26.8% 83.9%)",
      },
    },
  },
})

export const textStyles = define.textStyles({
  h1: {
    description: "Heading 1",
    value: {
      fontSize: {
        base: "4xl",
        lg: "5xl",
      },
      leading: {
        base: "10",
        lg: "none",
      },
      fontWeight: "extrabold",
      tracking: "tight",
    },
  },
  h2: {
    description: "Heading 2",
    value: {
      fontSize: "3xl",
      leading: "9",
      fontWeight: "semibold",
      tracking: "tight",
    },
  },
  h3: {
    description: "Heading 3",
    value: {
      fontSize: "2xl",
      leading: "8",
      fontWeight: "semibold",
      tracking: "tight",
    },
  },
  h4: {
    description: "Heading 4",
    value: {
      fontSize: "xl",
      leading: "7",
      fontWeight: "semibold",
      tracking: "tight",
    },
  },
  p: {
    description: "Paragraph",
    value: {
      leading: "7",
    },
  },
  lead: {
    description: "Lead paragraph",
    value: {
      fontSize: "xl",
      leading: "7",
    },
  },
  large: {
    description: "Large text",
    value: {
      fontSize: "lg",
      fontWeight: "semibold",
      leading: "7",
    },
  },
  small: {
    description: "Small text",
    value: {
      fontSize: "sm",
      fontWeight: "medium",
      leading: "none",
    },
  },
})

export const defaultPreset = definePreset({
  theme: {
    extend: {
      textStyles,
      semanticTokens: {
        colors: semanticColors,
      },
      recipes: {
        button: buttonRecipe,
        accordion: accordionRecipe,
        tabs: tabRecipe,
        slider: sliderRecipe,
      },
    },
  },
  staticCss: {
    recipes: "*",
  },
})
