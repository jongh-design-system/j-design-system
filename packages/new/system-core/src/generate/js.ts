import type { AnyRecipeDefinition, SystemDefinition } from "../types/recipe.ts"
import type { ThemeContract } from "../types/style.ts"

export class RecipeJsGenerator<TTheme extends ThemeContract> {
  private readonly recipe: AnyRecipeDefinition<TTheme>
  private readonly system: SystemDefinition<TTheme>

  constructor(
    recipe: AnyRecipeDefinition<TTheme>,
    system: SystemDefinition<TTheme>,
  ) {
    this.recipe = recipe
    this.system = system
  }

  generate(): string {
    const exportName = this.camelCase(this.recipe.name)
    const variantMap = this.variantMapToString()
    const defaultVariants = JSON.stringify(this.recipe.defaultVariants, null, 2)
    const compoundSelections = this.compoundSelectionsToString()
    const baseClassName = `${this.system.prefix}-${this.recipe.name}`

    if ("slots" in this.recipe) {
      const slots = JSON.stringify(
        this.recipe.slots.map((slot) => [slot, `${baseClassName}__${slot}`]),
        null,
        2,
      )

      return `import { createClassName, mergeVariants, splitVariantProps } from "../../internal/recipe.js"

const ${exportName}Slots = ${slots}
const defaultVariants = ${defaultVariants}
const compoundVariants = ${compoundSelections}

export const ${exportName}VariantMap = ${variantMap}
export const ${exportName}VariantKeys = Object.keys(${exportName}VariantMap)

export function ${exportName}(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    ${exportName}Slots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants)
    ])
  )
}

Object.assign(${exportName}, {
  splitVariantProps: (props) => splitVariantProps(props, ${exportName}VariantMap)
})
`
    }

    return `import { createClassName, mergeVariants, splitVariantProps } from "../../internal/recipe.js"

const defaultVariants = ${defaultVariants}
const compoundVariants = ${compoundSelections}

export const ${exportName}VariantMap = ${variantMap}
export const ${exportName}VariantKeys = Object.keys(${exportName}VariantMap)

export function ${exportName}(props = {}) {
  return createClassName("${baseClassName}", mergeVariants(defaultVariants, props), compoundVariants)
}

Object.assign(${exportName}, {
  splitVariantProps: (props) => splitVariantProps(props, ${exportName}VariantMap)
})
`
  }

  private variantMapToString(): string {
    const map = Object.fromEntries(
      Object.entries(this.recipe.variants).map(
        ([variantName, variantValues]) => [
          variantName,
          Object.keys(variantValues),
        ],
      ),
    )

    return JSON.stringify(map, null, 2)
  }

  private compoundSelectionsToString(): string {
    return JSON.stringify(
      (this.recipe.compoundVariants ?? []).map(
        (compoundVariant) => compoundVariant.when,
      ),
      null,
      2,
    )
  }

  private camelCase(value: string): string {
    return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
  }
}

export function generateRecipeJs<TTheme extends ThemeContract>(
  recipe: AnyRecipeDefinition<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  return new RecipeJsGenerator(recipe, system).generate()
}
