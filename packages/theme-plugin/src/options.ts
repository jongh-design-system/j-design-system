import type { ThemeSelection } from "./types"

export function parseThemeSelection(themes?: unknown): ThemeSelection[] {
  if (themes === false || themes === "false") {
    return []
  }

  if (!themes || themes === true) {
    return [{ name: "default", isDefault: true }]
  }

  const source = Array.isArray(themes) ? themes.join(",") : String(themes)

  if (source.trim().toLowerCase() === "all") {
    return [{ name: "all", isDefault: false }]
  }

  return source
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, ...flags] = entry.split(/\s+/)
      return {
        name,
        isDefault: flags.includes("--default"),
      }
    })
}
