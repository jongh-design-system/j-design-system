import {
  getPrimitiveStringTokenEntries,
  getPrimitiveTypographyTokenEntries,
  getSemanticTokenEntries,
  tokenVar,
} from "../../system-core/src/resolve/tokens.ts"
import { system as defaultSystem } from "../../system-spec/src/system.ts"

function createThemeName(path: string): string {
  const [, ...segments] = path.split(".")
  if (segments[0] === "common" && segments.length === 2) {
    return segments[1]
  }

  return segments.join("-")
}

function createMotionName(path: string): string {
  return path.split(".").slice(2).join("-")
}

function createTypographyName(path: string): string {
  return path.split(".").slice(1).join("-")
}

export function generateTailwindThemeCss(system = defaultSystem): string {
  const themeEntries = new Map<string, string>()

  for (const entry of getPrimitiveStringTokenEntries(system.theme)) {
    const value = tokenVar(entry.varPath, system.prefix)

    if (entry.family === "color") {
      themeEntries.set(`--color-${createThemeName(entry.publicPath)}`, value)
      continue
    }

    if (entry.family === "radius") {
      themeEntries.set(`--radius-${createThemeName(entry.publicPath)}`, value)
      continue
    }

    if (entry.family === "shadow") {
      themeEntries.set(`--shadow-${createThemeName(entry.publicPath)}`, value)
      continue
    }

    if (
      entry.family === "motion" &&
      entry.publicPath.startsWith("motion.easing.")
    ) {
      themeEntries.set(`--ease-${createMotionName(entry.publicPath)}`, value)
    }
  }

  for (const entry of getSemanticTokenEntries(system.theme)) {
    if (entry.family !== "color") {
      continue
    }

    themeEntries.set(
      `--color-${createThemeName(entry.publicPath)}`,
      tokenVar(entry.varPath, system.prefix),
    )
  }

  for (const entry of getPrimitiveTypographyTokenEntries(system.theme)) {
    const name = createTypographyName(entry.publicPath)

    themeEntries.set(
      `--text-${name}`,
      tokenVar(`${entry.varPath}.fontSize`, system.prefix),
    )
    themeEntries.set(
      `--leading-${name}`,
      tokenVar(`${entry.varPath}.lineHeight`, system.prefix),
    )
    themeEntries.set(
      `--font-weight-${name}`,
      tokenVar(`${entry.varPath}.fontWeight`, system.prefix),
    )

    if (entry.value.letterSpacing) {
      themeEntries.set(
        `--tracking-${name}`,
        tokenVar(`${entry.varPath}.letterSpacing`, system.prefix),
      )
    }
  }

  themeEntries.set("--spacing", tokenVar("primitive.spacing.1", system.prefix))

  const durationUtilities = getPrimitiveStringTokenEntries(system.theme)
    .filter(
      (entry) =>
        entry.family === "motion" &&
        entry.publicPath.startsWith("motion.duration."),
    )
    .map((entry) => {
      const name = createMotionName(entry.publicPath)

      return `@utility duration-${name} {\n  transition-duration: ${tokenVar(entry.varPath, system.prefix)};\n}`
    })

  const themeBlock = `@theme static {\n${Array.from(themeEntries.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n")}\n}`

  return [themeBlock, ...durationUtilities].join("\n\n")
}
