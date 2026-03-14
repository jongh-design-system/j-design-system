import type {
  AnyRecipeDefinition,
  SlotRecipeDefinition,
} from "../types/recipe.ts"
import type { ThemeContract } from "../types/style.ts"

export class RecipeDtsGenerator<TTheme extends ThemeContract> {
  private readonly recipe: AnyRecipeDefinition<TTheme>

  constructor(recipe: AnyRecipeDefinition<TTheme>) {
    this.recipe = recipe
  }

  generate(): string {
    const name = this.pascalCase(this.recipe.name)
    const exportName = this.camelCase(this.recipe.name)
    const variants = this.renderVariantInterface()

    if ("slots" in this.recipe) {
      return this.generateSlotRecipeDts(this.recipe, name, exportName, variants)
    }

    return `declare interface ${name}Variant {
${this.indent(variants)}
}

export declare type ${name}VariantProps = Partial<${name}Variant>

export declare const ${exportName}: ((props?: ${name}VariantProps) => string) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    ${name}VariantProps,
    Omit<T, keyof ${name}VariantProps>
  ]
}
`
  }

  private renderVariantInterface(): string {
    return Object.entries(this.recipe.variants)
      .map(([variantName, variantValues]) => {
        const values = Object.keys(variantValues)
          .map((value) => `"${value}"`)
          .join(" | ")
        const defaultValue = this.recipe.defaultVariants[variantName]
        return `/**
 * @default "${defaultValue}"
 */
${variantName}: ${values};`
      })
      .join("\n")
  }

  private generateSlotRecipeDts(
    recipe: SlotRecipeDefinition<string, TTheme>,
    name: string,
    exportName: string,
    variants: string,
  ): string {
    const slotUnion = recipe.slots.map((slot) => `"${slot}"`).join(" | ")

    return `declare interface ${name}Variant {
${this.indent(variants)}
}

export declare type ${name}VariantProps = Partial<${name}Variant>
export declare type ${name}SlotName = ${slotUnion}

export declare const ${exportName}: ((props?: ${name}VariantProps) => Record<${name}SlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    ${name}VariantProps,
    Omit<T, keyof ${name}VariantProps>
  ]
}
`
  }

  private pascalCase(value: string): string {
    return value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  }

  private camelCase(value: string): string {
    return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
  }

  private indent(value: string): string {
    return value
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n")
  }
}

export function generateRecipeDts<TTheme extends ThemeContract>(
  recipe: AnyRecipeDefinition<TTheme>,
): string {
  return new RecipeDtsGenerator(recipe).generate()
}
