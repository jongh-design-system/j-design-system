import fs from "node:fs/promises"
import path from "node:path"

import { CssGenerator } from "./generate/css.ts"
import { RecipeDtsGenerator } from "./generate/dts.ts"
import { RecipeJsGenerator } from "./generate/js.ts"
import {
  getPrimitiveStringTokenEntries,
  getPrimitiveTypographyTokenEntries,
  getSemanticTokenEntries,
  tokenVar,
} from "./resolve/tokens.ts"
import type { SystemDefinition } from "./types/recipe.ts"
import type { ThemeContract } from "./types/style.ts"
import { validateRecipes } from "./validate/recipes.ts"
import { validateTokenReferences } from "./validate/tokens.ts"

export class SystemArtifactGenerator<TTheme extends ThemeContract> {
  private readonly system: SystemDefinition<TTheme>
  private readonly cssGenerator: CssGenerator<TTheme>

  constructor(system: SystemDefinition<TTheme>) {
    this.system = system
    this.cssGenerator = new CssGenerator(system)
  }

  generateSystemFiles(): Array<{ path: string; contents: string }> {
    this.validateSystem()

    return [
      ...this.generateStyleFiles(),
      ...this.generateTokenFiles(),
      ...this.generateThemingFiles(),
      ...this.generateRecipeFiles(),
    ]
  }

  async writeSystemFiles(outputDir: string): Promise<void> {
    const files = this.generateSystemFiles()

    for (const file of files) {
      const destination = path.join(outputDir, file.path)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.writeFile(destination, file.contents, "utf8")
    }
  }

  private validateSystem(): void {
    validateTokenReferences(this.system)
    validateRecipes(this.system)
  }

  private generateStyleFiles(): Array<{ path: string; contents: string }> {
    return [
      {
        path: "generated/styles/base.css",
        contents: this.cssGenerator.generateBaseCss(),
      },
      {
        path: "generated/styles/all.css",
        contents: this.cssGenerator.generateAllCss(),
      },
    ]
  }

  private generateTokenFiles(): Array<{ path: string; contents: string }> {
    return [
      {
        path: "generated/tokens/index.js",
        contents: `export const tokens = ${this.emitTokenObject()}\n`,
      },
      {
        path: "generated/tokens/index.d.ts",
        contents: this.emitTokenDts(),
      },
    ]
  }

  private generateThemingFiles(): Array<{ path: string; contents: string }> {
    return [
      {
        path: "generated/theming.js",
        contents:
          'export { applyTheme, generateThemeScript } from "@jongh/new-system-runtime/theme"\n',
      },
    ]
  }

  private generateRecipeFiles(): Array<{ path: string; contents: string }> {
    return Object.values(this.system.theme.recipes).flatMap((recipe) => [
      {
        path: `generated/recipes/${recipe.name}.css`,
        contents: this.cssGenerator.generateRecipeCss(recipe),
      },
      {
        path: `generated/recipes/${recipe.name}.js`,
        contents: new RecipeJsGenerator(recipe, this.system).generate(),
      },
      {
        path: `generated/recipes/${recipe.name}.d.ts`,
        contents: new RecipeDtsGenerator(recipe).generate(),
      },
    ])
  }

  private emitPrimitiveTokensObject(): Record<string, unknown> {
    const primitive: Record<string, unknown> = {}

    for (const entry of getPrimitiveStringTokenEntries(this.system.theme)) {
      this.setNestedValue(
        primitive,
        entry.publicPath.split("."),
        tokenVar(entry.varPath, this.system.prefix),
      )
    }

    for (const entry of getPrimitiveTypographyTokenEntries(this.system.theme)) {
      this.setNestedValue(primitive, entry.publicPath.split("."), {
        fontSize: tokenVar(`${entry.varPath}.fontSize`, this.system.prefix),
        lineHeight: tokenVar(`${entry.varPath}.lineHeight`, this.system.prefix),
        fontWeight: tokenVar(`${entry.varPath}.fontWeight`, this.system.prefix),
        letterSpacing: tokenVar(
          `${entry.varPath}.letterSpacing`,
          this.system.prefix,
        ),
      })
    }

    return primitive
  }

  private emitSemanticTokensObject(): Record<string, unknown> {
    const semantic: Record<string, unknown> = {}

    for (const entry of getSemanticTokenEntries(this.system.theme)) {
      this.setNestedValue(
        semantic,
        entry.publicPath.split("."),
        tokenVar(entry.varPath, this.system.prefix),
      )
    }

    return semantic
  }

  private emitTokenObject(): string {
    return JSON.stringify(
      {
        primitive: this.emitPrimitiveTokensObject(),
        semantic: this.emitSemanticTokensObject(),
      },
      null,
      2,
    )
  }

  private emitTokenDts(): string {
    const tokenObject = JSON.parse(this.emitTokenObject()) as Record<
      string,
      unknown
    >
    const primitiveStringEntries = getPrimitiveStringTokenEntries(
      this.system.theme,
    )
    const primitiveTypographyEntries = getPrimitiveTypographyTokenEntries(
      this.system.theme,
    )
    const semanticEntries = getSemanticTokenEntries(this.system.theme)

    const primitivePathsByFamily = (family: string): string[] => [
      ...primitiveStringEntries
        .filter((entry) => entry.family === family)
        .map((entry) => entry.publicPath),
      ...primitiveTypographyEntries
        .filter((entry) => entry.family === family)
        .map((entry) => entry.publicPath),
    ]

    const semanticPathsByFamily = (family: string): string[] =>
      semanticEntries
        .filter((entry) => entry.family === family)
        .map((entry) => entry.publicPath)

    return `${this.emitFamilyPathType(
      primitivePathsByFamily("color"),
      semanticPathsByFamily("color"),
      "ColorTokenPath",
    )}
${this.emitFamilyPathType(
  primitivePathsByFamily("spacing"),
  semanticPathsByFamily("spacing"),
  "SpacingTokenPath",
)}
${this.emitFamilyPathType(
  primitivePathsByFamily("radius"),
  semanticPathsByFamily("radius"),
  "RadiusTokenPath",
)}
${this.emitFamilyPathType(
  primitivePathsByFamily("shadow"),
  semanticPathsByFamily("shadow"),
  "ShadowTokenPath",
)}
${this.emitFamilyPathType(
  primitivePathsByFamily("motion").filter((path) =>
    path.startsWith("motion.duration."),
  ),
  semanticPathsByFamily("motion").filter((path) =>
    path.startsWith("motion.duration."),
  ),
  "MotionDurationTokenPath",
)}
${this.emitFamilyPathType(
  primitivePathsByFamily("motion").filter((path) =>
    path.startsWith("motion.easing."),
  ),
  semanticPathsByFamily("motion").filter((path) =>
    path.startsWith("motion.easing."),
  ),
  "MotionEasingTokenPath",
)}
${this.emitFamilyPathType(
  primitivePathsByFamily("typography"),
  semanticPathsByFamily("typography"),
  "TypographyTokenPath",
)}

export declare const tokens: ${this.renderTypeLiteral(tokenObject)}

export declare type Tokens = typeof tokens
`
  }

  private emitFamilyPathType(
    primitivePaths: string[],
    semanticPaths: string[],
    typeName: string,
  ): string {
    const primitiveTypeName = `Primitive${typeName}`
    const semanticTypeName = `Semantic${typeName}`

    return [
      `export declare type ${primitiveTypeName} = ${this.renderUnion(primitivePaths)}`,
      `export declare type ${semanticTypeName} = ${this.renderUnion(semanticPaths)}`,
      `export declare type ${typeName} = ${primitiveTypeName} | ${semanticTypeName}`,
    ].join("\n")
  }

  private renderTypeLiteral(value: unknown, depth = 0): string {
    if (typeof value === "string") {
      return "string"
    }

    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return "unknown"
    }

    const indent = "  ".repeat(depth)
    const childIndent = "  ".repeat(depth + 1)
    const lines = Object.entries(value).map(
      ([key, nestedValue]) =>
        `${childIndent}readonly ${this.renderPropertyName(key)}: ${this.renderTypeLiteral(
          nestedValue,
          depth + 1,
        )};`,
    )

    return `{\n${lines.join("\n")}\n${indent}}`
  }

  private renderUnion(values: string[]): string {
    return values.length > 0
      ? values.map((value) => JSON.stringify(value)).join(" | ")
      : "never"
  }

  private renderPropertyName(key: string): string {
    return this.isIdentifier(key) ? key : JSON.stringify(key)
  }

  private isIdentifier(value: string): boolean {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)
  }

  private setNestedValue(
    target: Record<string, unknown>,
    segments: string[],
    value: unknown,
  ): void {
    const [head, ...tail] = segments

    if (!head) {
      return
    }

    if (tail.length === 0) {
      target[head] = value
      return
    }

    const current =
      target[head] &&
      typeof target[head] === "object" &&
      !Array.isArray(target[head])
        ? (target[head] as Record<string, unknown>)
        : {}

    target[head] = current
    this.setNestedValue(current, tail, value)
  }
}

export function generateSystemFiles<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): Array<{ path: string; contents: string }> {
  return new SystemArtifactGenerator(system).generateSystemFiles()
}

export async function writeSystemFiles<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
  outputDir: string,
): Promise<void> {
  await new SystemArtifactGenerator(system).writeSystemFiles(outputDir)
}
