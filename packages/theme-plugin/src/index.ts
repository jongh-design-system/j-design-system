import plugin from "tailwindcss/plugin"

import { parseThemeSelection } from "./options"
import { builtInThemeMap, builtInThemes } from "./themes"
import type { Theme, ThemeTokens } from "./types"

const colorVariables: Record<string, string> = {
  "base-100": "var(--color-base-100)",
  "base-200": "var(--color-base-200)",
  "base-300": "var(--color-base-300)",
  "base-content": "var(--color-base-content)",
  primary: "var(--color-primary)",
  "primary-content": "var(--color-primary-content)",
  secondary: "var(--color-secondary)",
  "secondary-content": "var(--color-secondary-content)",
  accent: "var(--color-accent)",
  "accent-content": "var(--color-accent-content)",
  neutral: "var(--color-neutral)",
  "neutral-content": "var(--color-neutral-content)",
  info: "var(--color-info)",
  "info-content": "var(--color-info-content)",
  success: "var(--color-success)",
  "success-content": "var(--color-success-content)",
  warning: "var(--color-warning)",
  "warning-content": "var(--color-warning-content)",
  error: "var(--color-error)",
  "error-content": "var(--color-error-content)",
}

const radiusVariables: Record<string, string> = {
  selector: "var(--radius-selector)",
  field: "var(--radius-field)",
  box: "var(--radius-box)",
}

function tokensToVars(tokens: ThemeTokens): Record<string, string> {
  return tokens as unknown as Record<string, string>
}

export default plugin.withOptions(
  (options?: unknown) => {
    const resolvedOptions =
      options && typeof options === "object"
        ? (options as { themes?: string | string[] | boolean })
        : {}

    return ({ addBase }) => {
      const selection = parseThemeSelection(resolvedOptions.themes)

      for (const entry of selection) {
        let themes: Theme[]

        if (entry.name === "all") {
          themes = builtInThemes
        } else {
          const theme = builtInThemeMap[entry.name]
          if (!theme) {
            throw new Error(
              `Unknown theme '${entry.name}'. Available: ${builtInThemes.map((t) => t.name).join(", ")}`,
            )
          }
          themes = [theme]
        }

        for (const theme of themes) {
          const isDefault =
            entry.isDefault ||
            (entry.name === "all" && theme === builtInThemes[0])

          let selector = `[data-theme="${theme.name}"]`
          if (isDefault) {
            selector = `:where(:root), ${selector}`
          }

          // light tokens
          addBase({ [selector]: tokensToVars(theme.light) })

          // dark tokens via prefers-color-scheme
          addBase({
            "@media (prefers-color-scheme: dark)": {
              [selector]: tokensToVars(theme.dark),
            },
          })
        }
      }
    }
  },
  () => ({
    theme: {
      extend: {
        colors: colorVariables,
        borderRadius: radiusVariables,
      },
    },
  }),
)
