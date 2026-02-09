import type { Theme } from "../types"
import { defaultTheme } from "./default"
import { forestTheme } from "./forest"
import { oceanTheme } from "./ocean"

export const builtInThemes: Theme[] = [defaultTheme, oceanTheme, forestTheme]

export const builtInThemeMap: Record<string, Theme> = Object.fromEntries(
  builtInThemes.map((theme) => [theme.name, theme]),
)
