import {
  definePreset,
  defineRecipe,
  defineSlotRecipe,
  defineSystem,
} from "../../define.ts"

export const basePreset = definePreset({
  primitiveTokens: {
    color: {
      blue: {
        500: "base-blue-500",
        600: "base-blue-600",
      },
    },
    spacing: {
      4: "1rem",
    },
    radius: {
      md: "0.5rem",
      lg: "0.75rem",
    },
    typography: {
      label: {
        md: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: "500",
        },
      },
    },
    shadow: {
      md: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    },
    motion: {
      duration: {
        fast: "120ms",
      },
      easing: {
        standard: "ease",
      },
    },
  },
  semanticTokens: {
    color: {
      bg: {
        surface: { light: "color.blue.500", dark: "color.blue.600" },
      },
      fg: {
        default: { light: "color.blue.600", dark: "color.blue.500" },
      },
      stroke: {
        default: { light: "color.blue.500", dark: "color.blue.600" },
      },
    },
  },
  recipes: {
    button: defineRecipe({
      name: "button",
      base: {
        display: "inline-flex",
        backgroundColor: "color.bg.surface",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        borderRadius: "radius.md",
        borderWidth: "1px",
        borderStyle: "solid",
        paddingInline: "spacing.4",
        textStyle: "typography.label.md",
      },
      variants: {
        tone: {
          neutral: {},
        },
        size: {
          md: {},
        },
      },
      compoundVariants: [
        {
          when: { tone: "neutral", size: "md" },
          css: {
            boxShadow: "shadow.md",
          },
        },
      ],
      defaultVariants: {
        tone: "neutral",
        size: "md",
      },
    }),
    avatar: defineSlotRecipe({
      name: "avatar",
      slots: ["root", "image"],
      base: {
        root: {
          display: "inline-flex",
          backgroundColor: "color.bg.surface",
          color: "color.fg.default",
          borderRadius: "radius.md",
        },
        image: {
          width: "spacing.4",
          height: "spacing.4",
        },
      },
      variants: {
        size: {
          md: {
            root: {
              width: "spacing.4",
              height: "spacing.4",
            },
          },
        },
      },
      compoundVariants: [],
      defaultVariants: {
        size: "md",
      },
    }),
  },
  keyframes: {
    "fade-in": {
      from: { opacity: "0" },
      to: { opacity: "1" },
    },
  },
})

export const accentPreset = definePreset({
  primitiveTokens: {
    color: {
      blue: {
        500: "accent-blue-500",
      },
    },
    spacing: {
      6: "1.5rem",
    },
  },
  semanticTokens: {
    color: {
      bg: {
        accent: { light: "color.blue.600", dark: "color.blue.500" },
      },
    },
  },
  recipes: {
    button: {
      base: {
        backgroundColor: "color.bg.accent",
      },
      variants: {
        tone: {
          accent: {
            backgroundColor: "color.bg.accent",
            color: "color.fg.default",
          },
        },
      },
      compoundVariants: [
        {
          when: { tone: "accent", size: "md" },
          css: {
            paddingInline: "spacing.6",
          },
        },
      ],
      defaultVariants: {
        tone: "accent",
      },
    },
    avatar: {
      slots: ["root", "image", "fallback"],
      base: {
        fallback: {
          color: "color.fg.default",
        },
      },
      variants: {
        size: {
          md: {
            fallback: {
              width: "spacing.6",
            },
          },
        },
      },
      compoundVariants: [
        {
          when: { size: "md" },
          css: {
            fallback: {
              height: "spacing.6",
            },
          },
        },
      ],
    },
  },
  keyframes: {
    "scale-in": {
      from: { transform: "scale(0.95)" },
      to: { transform: "scale(1)" },
    },
  },
})

export const localTheme = {
  primitiveTokens: {
    color: {
      blue: {
        500: "local-blue-500",
      },
    },
  },
  semanticTokens: {
    color: {
      fg: {
        default: { light: "color.blue.500", dark: "color.blue.600" },
      },
    },
  },
  recipes: {
    button: {
      defaultVariants: {
        tone: "accent",
      },
    },
  },
  keyframes: {
    "fade-in": {
      from: { opacity: "0.25" },
      to: { opacity: "1" },
    },
  },
} as const

export const presetTestSystem = defineSystem({
  name: "preset-test",
  prefix: "jds",
  presets: [basePreset, accentPreset],
  theme: localTheme,
})

export function createRecipeKindConflictSystem() {
  return defineSystem({
    name: "preset-conflict",
    prefix: "jds",
    presets: [
      definePreset({
        recipes: {
          button: defineRecipe({
            name: "button",
            base: {
              display: "inline-flex",
            },
            variants: {
              tone: {
                neutral: {},
              },
            },
            defaultVariants: {
              tone: "neutral",
            },
          }),
        },
      }),
      definePreset({
        recipes: {
          button: {
            slots: ["root"],
            base: {
              root: {
                display: "flex",
              },
            },
            variants: {
              tone: {
                neutral: {
                  root: {},
                },
              },
            },
            defaultVariants: {
              tone: "neutral",
            },
          },
        },
      }),
    ],
    theme: {
      primitiveTokens: basePreset.primitiveTokens,
      semanticTokens: basePreset.semanticTokens,
    },
  })
}
