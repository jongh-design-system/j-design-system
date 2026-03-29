import { renderStyleObject } from "../resolve/style-value.ts"
import {
  getPrimitiveStringTokenEntries,
  getPrimitiveTypographyTokenEntries,
  getSemanticTokenEntries,
  resolveTokenVarPath,
  tokenVar,
} from "../resolve/tokens.ts"
import type {
  AnyRecipeDefinition,
  KeyframeDefinition,
  RecipeDefinition,
  SlotRecipeDefinition,
  SystemDefinition,
} from "../types/recipe.ts"
import type { ThemeContract } from "../types/style.ts"

export class CssGenerator<TTheme extends ThemeContract> {
  private readonly system: SystemDefinition<TTheme>

  constructor(system: SystemDefinition<TTheme>) {
    this.system = system
  }

  generateBaseCss(): string {
    return [
      this.renderPrimitiveTokenCss(),
      this.renderSemanticTokenCss(),
      this.renderKeyframes(
        (this.system.theme.keyframes ?? {}) as Record<
          string,
          KeyframeDefinition
        >,
      ),
    ]
      .filter(Boolean)
      .join("\n\n")
  }

  generateAllCss(): string {
    return [
      this.generateBaseCss(),
      ...Object.values(this.system.theme.recipes).map((recipe) =>
        this.generateRecipeCss(recipe),
      ),
    ].join("\n\n")
  }

  generateRecipeCss(recipe: AnyRecipeDefinition<TTheme>): string {
    const baseClassName = `${this.system.prefix}-${recipe.name}`

    if ("slots" in recipe) {
      return this.generateSlotRecipeCss(recipe, baseClassName)
    }

    return this.generateSingleRecipeCss(recipe, baseClassName)
  }

  generateLayeredBaseCss(): string {
    return this.wrapInLayer("jds-base", this.generateBaseCss())
  }

  generateLayeredAllCss(): string {
    const recipeCss = Object.values(this.system.theme.recipes)
      .map((recipe) => this.generateRecipeCss(recipe))
      .filter(Boolean)
      .join("\n\n")

    return [
      this.generateLayeredBaseCss(),
      this.wrapInLayer("jds-components", recipeCss),
    ]
      .filter(Boolean)
      .join("\n\n")
  }

  generateLayeredRecipeCss(recipe: AnyRecipeDefinition<TTheme>): string {
    return this.wrapInLayer("jds-components", this.generateRecipeCss(recipe))
  }

  private toCssVariable(path: string): string {
    return tokenVar(path, this.system.prefix).replace(/^var\(|\)$/g, "")
  }

  private renderCssRule(selector: string, declarations: string[]): string {
    return `${selector} {\n${declarations.map((line) => `  ${line}`).join("\n")}\n}`
  }

  private wrapInLayer(layerName: string, css: string): string {
    const trimmedCss = css.trim()
    if (!trimmedCss) {
      return ""
    }

    return `@layer ${layerName} {\n${trimmedCss
      .split("\n")
      .map((line) => (line ? `  ${line}` : ""))
      .join("\n")}\n}`
  }

  private renderPrimitiveTokenCss(): string {
    const declarations = [
      ...getPrimitiveStringTokenEntries(this.system.theme).map(
        ({ varPath, value }) => `${this.toCssVariable(varPath)}: ${value};`,
      ),
      ...getPrimitiveTypographyTokenEntries(this.system.theme).flatMap(
        ({ varPath, value }) => [
          `${this.toCssVariable(`${varPath}.fontSize`)}: ${value.fontSize};`,
          `${this.toCssVariable(`${varPath}.lineHeight`)}: ${value.lineHeight};`,
          `${this.toCssVariable(`${varPath}.fontWeight`)}: ${value.fontWeight};`,
          `${this.toCssVariable(`${varPath}.letterSpacing`)}: ${value.letterSpacing ?? "normal"};`,
        ],
      ),
    ]

    return this.renderCssRule(":root", declarations)
  }

  private renderSemanticTokenCss(): string {
    const lightDeclarations: string[] = []
    const darkDeclarations: string[] = []

    for (const semantic of getSemanticTokenEntries(this.system.theme)) {
      const variable = this.toCssVariable(semantic.varPath)
      lightDeclarations.push(
        `${variable}: ${tokenVar(
          resolveTokenVarPath(semantic.value.light, this.system),
          this.system.prefix,
        )};`,
      )
      darkDeclarations.push(
        `${variable}: ${tokenVar(
          resolveTokenVarPath(semantic.value.dark, this.system),
          this.system.prefix,
        )};`,
      )
    }

    return [
      lightDeclarations.length > 0
        ? this.renderCssRule(
            ":root, :root[data-theme='light']",
            lightDeclarations,
          )
        : "",
      darkDeclarations.length > 0
        ? this.renderCssRule(":root[data-theme='dark']", darkDeclarations)
        : "",
    ]
      .filter(Boolean)
      .join("\n\n")
  }

  private renderKeyframes(
    definitions: Record<string, KeyframeDefinition>,
  ): string {
    return Object.entries(definitions)
      .map(([name, definition]) => {
        const blocks = Object.entries(definition)
          .map(([step, style]) => {
            const declarations = Object.entries(style ?? {})
              .map(
                ([property, value]) =>
                  `    ${property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${value};`,
              )
              .join("\n")
            return `  ${step} {\n${declarations}\n  }`
          })
          .join("\n")

        return `@keyframes ${name} {\n${blocks}\n}`
      })
      .join("\n\n")
  }

  private renderRecipeCompoundClass(
    baseClassName: string,
    selection: Record<string, string | undefined>,
  ): string {
    return `${baseClassName}--${Object.entries(selection)
      .filter(([, variantValue]) => variantValue !== undefined)
      .map(([variantName, variantValue]) => `${variantName}_${variantValue}`)
      .join("-")}`
  }

  private generateSingleRecipeCss(
    recipe: RecipeDefinition<TTheme>,
    baseClassName: string,
  ): string {
    const chunks = [
      renderStyleObject(`.${baseClassName}`, recipe.base, this.system),
    ]

    for (const [variantName, variantValues] of Object.entries(
      recipe.variants,
    )) {
      for (const [variantValue, style] of Object.entries(variantValues)) {
        chunks.push(
          renderStyleObject(
            `.${baseClassName}--${variantName}_${variantValue}`,
            style,
            this.system,
          ),
        )
      }
    }

    for (const compoundVariant of recipe.compoundVariants ?? []) {
      chunks.push(
        renderStyleObject(
          `.${this.renderRecipeCompoundClass(baseClassName, compoundVariant.when)}`,
          compoundVariant.css,
          this.system,
        ),
      )
    }

    return chunks.filter(Boolean).join("\n\n")
  }

  private generateSlotRecipeCss(
    recipe: SlotRecipeDefinition<string, TTheme>,
    baseClassName: string,
  ): string {
    const chunks: string[] = []

    for (const [slot, style] of Object.entries(recipe.base)) {
      if (!style) {
        continue
      }

      chunks.push(
        renderStyleObject(`.${baseClassName}__${slot}`, style, this.system),
      )
    }

    for (const [variantName, variantValues] of Object.entries(
      recipe.variants,
    )) {
      for (const [variantValue, slotStyles] of Object.entries(variantValues)) {
        for (const [slot, style] of Object.entries(slotStyles)) {
          if (!style) {
            continue
          }

          chunks.push(
            renderStyleObject(
              `.${baseClassName}__${slot}--${variantName}_${variantValue}`,
              style,
              this.system,
            ),
          )
        }
      }
    }

    for (const compoundVariant of recipe.compoundVariants ?? []) {
      for (const [slot, style] of Object.entries(compoundVariant.css)) {
        if (!style) {
          continue
        }

        chunks.push(
          renderStyleObject(
            `.${this.renderRecipeCompoundClass(`${baseClassName}__${slot}`, compoundVariant.when)}`,
            style,
            this.system,
          ),
        )
      }
    }

    return chunks.join("\n\n")
  }
}

export function generateRecipeCss<TTheme extends ThemeContract>(
  recipe: AnyRecipeDefinition<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateRecipeCss(recipe)
}

export function generateBaseCss<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateBaseCss()
}

export function generateAllCss<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateAllCss()
}

export function generateLayeredBaseCss<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateLayeredBaseCss()
}

export function generateLayeredAllCss<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateLayeredAllCss()
}

export function generateLayeredRecipeCss<TTheme extends ThemeContract>(
  recipe: AnyRecipeDefinition<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  return new CssGenerator(system).generateLayeredRecipeCss(recipe)
}
