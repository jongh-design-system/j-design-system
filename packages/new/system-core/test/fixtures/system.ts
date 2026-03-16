import {
  defineRecipe,
  defineSlotRecipe,
  defineSystem,
} from "../../src/define.ts"

const primitiveTokens = {
  color: {
    slate: {
      50: "oklch(98.4% 0.003 247.858)",
      100: "oklch(96.8% 0.007 247.896)",
      200: "oklch(92.9% 0.013 255.508)",
      300: "oklch(86.9% 0.022 252.894)",
      400: "oklch(70.4% 0.04 256.788)",
      500: "oklch(55.4% 0.046 257.417)",
      600: "oklch(44.6% 0.043 257.281)",
      700: "oklch(37.2% 0.044 257.287)",
      800: "oklch(27.9% 0.041 260.031)",
      900: "oklch(20.8% 0.042 265.755)",
      950: "oklch(12.9% 0.042 264.695)",
    },
    blue: {
      300: "oklch(80.9% 0.105 251.813)",
      400: "oklch(70.7% 0.165 254.624)",
      500: "oklch(62.3% 0.214 259.815)",
      600: "oklch(54.6% 0.245 262.881)",
      700: "oklch(48.8% 0.243 264.376)",
      800: "oklch(42.4% 0.199 265.638)",
    },
    green: {
      500: "oklch(72.3% 0.219 149.579)",
      600: "oklch(62.7% 0.194 149.214)",
    },
    amber: {
      500: "oklch(76.9% 0.188 70.08)",
      600: "oklch(66.6% 0.179 58.318)",
    },
    red: {
      500: "oklch(63.7% 0.237 25.331)",
      600: "oklch(57.7% 0.245 27.325)",
    },
    sky: {
      500: "oklch(68.5% 0.169 237.323)",
      600: "oklch(58.8% 0.158 241.966)",
    },
    common: {
      white: "#fff",
      black: "#000",
    },
  },
  spacing: {
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    10: "2.5rem",
  },
  radius: {
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
  typography: {
    body: {
      md: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: "400",
      },
    },
    label: {
      sm: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: "500",
      },
      md: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: "500",
      },
    },
    title: {
      sm: {
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        fontWeight: "600",
      },
    },
  },
  shadow: {
    md: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },
  motion: {
    duration: {
      fast: "120ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
    },
  },
} as const

const semanticTokens = {
  color: {
    bg: {
      canvas: { light: "color.slate.50", dark: "color.slate.950" },
      surface: { light: "color.slate.100", dark: "color.slate.900" },
      subtle: { light: "color.slate.200", dark: "color.slate.800" },
      elevated: { light: "color.common.white", dark: "color.slate.900" },
      accent: { light: "color.blue.600", dark: "color.blue.500" },
      "accent-hovered": { light: "color.blue.700", dark: "color.blue.400" },
      "accent-active": { light: "color.blue.800", dark: "color.blue.300" },
    },
    fg: {
      default: { light: "color.slate.950", dark: "color.slate.50" },
      muted: { light: "color.slate.700", dark: "color.slate.300" },
      subtle: { light: "color.slate.600", dark: "color.slate.400" },
      inverse: { light: "color.common.white", dark: "color.slate.950" },
      accent: { light: "color.blue.700", dark: "color.blue.300" },
    },
    stroke: {
      default: { light: "color.slate.300", dark: "color.slate.700" },
      subtle: { light: "color.slate.200", dark: "color.slate.800" },
      strong: { light: "color.slate.400", dark: "color.slate.600" },
      accent: { light: "color.blue.500", dark: "color.blue.400" },
    },
    icon: {
      default: { light: "color.slate.800", dark: "color.slate.200" },
      muted: { light: "color.slate.600", dark: "color.slate.400" },
      accent: { light: "color.blue.600", dark: "color.blue.400" },
    },
    focus: {
      ring: { light: "color.blue.500", dark: "color.blue.400" },
    },
    overlay: {
      default: { light: "color.common.black", dark: "color.common.black" },
    },
    success: {
      default: { light: "color.green.600", dark: "color.green.500" },
    },
    warning: {
      default: { light: "color.amber.600", dark: "color.amber.500" },
    },
    danger: {
      default: { light: "color.red.600", dark: "color.red.500" },
    },
    info: {
      default: { light: "color.sky.600", dark: "color.sky.500" },
    },
  },
} as const

const avatar = defineSlotRecipe({
  name: "avatar",
  slots: ["root", "image", "fallback"],
  base: {
    root: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      overflow: "hidden",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.subtle",
      borderRadius: "radius.full",
      backgroundColor: "color.bg.subtle",
      color: "color.fg.default",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    fallback: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "color.bg.subtle",
      color: "color.fg.muted",
      textStyle: "typography.label.md",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          width: "2rem",
          height: "2rem",
        },
        fallback: {
          textStyle: "typography.label.sm",
        },
      },
      md: {
        root: {
          width: "3rem",
          height: "3rem",
        },
      },
      lg: {
        root: {
          width: "4rem",
          height: "4rem",
        },
        fallback: {
          textStyle: "typography.title.sm",
        },
      },
    },
    shape: {
      circle: {},
      rounded: {
        root: {
          borderRadius: "radius.lg",
        },
        fallback: {
          borderRadius: "radius.lg",
        },
      },
    },
    tone: {
      neutral: {},
      accent: {
        root: {
          borderColor: "color.stroke.accent",
          backgroundColor: "color.bg.accent",
          color: "color.fg.inverse",
        },
        fallback: {
          backgroundColor: "color.bg.accent",
          color: "color.fg.inverse",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    shape: "circle",
    tone: "neutral",
  },
})

const button = defineRecipe({
  name: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing.2",
    minHeight: "2.5rem",
    paddingInline: "spacing.4",
    borderRadius: "radius.md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color.stroke.default",
    backgroundColor: "color.bg.surface",
    color: "color.fg.default",
    textStyle: "typography.label.md",
    transitionDuration: "motion.duration.fast",
    transitionTimingFunction: "motion.easing.standard",
    transitionProperty: "background-color, border-color, color, box-shadow",
    _hover: {
      backgroundColor: "color.bg.subtle",
    },
    _focusVisible: {
      outline: "2px solid var(--jds-color-focus-ring)",
      outlineOffset: "2px",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  variants: {
    size: {
      sm: {
        minHeight: "2.25rem",
        paddingInline: "spacing.3",
        textStyle: "typography.label.sm",
        "& svg": {
          width: "0.875rem",
          height: "0.875rem",
        },
      },
      md: {
        "& svg": {
          width: "1rem",
          height: "1rem",
        },
      },
      lg: {
        minHeight: "3rem",
        paddingInline: "spacing.5",
        "& svg": {
          width: "1.25rem",
          height: "1.25rem",
        },
      },
    },
    variant: {
      primary: {
        backgroundColor: "color.bg.accent",
        color: "color.fg.inverse",
        borderColor: "color.bg.accent",
        _hover: {
          backgroundColor: "color.bg.accent-hovered",
        },
      },
      secondary: {
        backgroundColor: "color.bg.surface",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
      destructive: {
        backgroundColor: "color.danger.default",
        color: "color.fg.inverse",
        borderColor: "color.danger.default",
        _hover: {
          opacity: "0.92",
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: "color.fg.accent",
        minHeight: "auto",
        paddingInline: "0",
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})

export const testSystem = defineSystem({
  name: "jds-native-test",
  prefix: "jds",
  theme: {
    primitiveTokens,
    semanticTokens,
    recipes: {
      avatar,
      button,
    },
    keyframes: {
      "fade-in": {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
    },
  },
})
