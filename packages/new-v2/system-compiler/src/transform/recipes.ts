import type { z } from "zod"

import type { compilerSystemSchema } from "../normalize/schema.ts"
import type { CssDeclaration, CssNode } from "../output/schema.ts"
import type { CompilerRegistry } from "../registry/types.ts"
import { transformProperty } from "./properties.ts"
import {
  getCompoundClassName,
  getNestedSelector,
  getRecipeClassName,
  getSlotClassName,
  getVariantClassName,
} from "./selectors.ts"

type NormalizedSystem = z.infer<typeof compilerSystemSchema>
type NormalizedRecipe = NormalizedSystem["recipes"][number]
type StyleDeclaration = Extract<
  NormalizedRecipe,
  { kind: "recipe" }
>["base"][number]
export type RecipePropertyTransformer = (
  property: string,
  value: unknown,
  registry: CompilerRegistry,
) => CssDeclaration[]

function transformStyle(
  selector: string,
  style: StyleDeclaration[],
  registry: CompilerRegistry,
  propertyTransformer: RecipePropertyTransformer,
) {
  const groups = new Map<
    string,
    {
      scope: StyleDeclaration["scope"]
      declarations: CssDeclaration[]
    }
  >()

  for (const declaration of style) {
    const cssDeclarations = propertyTransformer(
      declaration.property,
      declaration.value,
      registry,
    )

    if (cssDeclarations.length === 0) {
      continue
    }

    const key = JSON.stringify(declaration.scope)
    const group = groups.get(key) ?? {
      scope: declaration.scope,
      declarations: [],
    }

    group.declarations.push(...cssDeclarations)
    groups.set(key, group)
  }

  return Array.from(groups.values()).map((group) =>
    createScopedNode(selector, group.scope, group.declarations),
  )
}

function createScopedNode(
  selector: string,
  scope: StyleDeclaration["scope"],
  declarations: CssDeclaration[],
) {
  let currentSelector = selector
  let node: CssNode
  const atRules: Array<
    Extract<StyleDeclaration["scope"][number], { kind: "atRule" }>
  > = []

  for (const item of scope) {
    if (item.kind === "selector") {
      currentSelector = getNestedSelector(currentSelector, item.value)
      continue
    }

    atRules.push(item)
  }

  node = {
    kind: "rule",
    selector: currentSelector,
    declarations,
  }

  for (const atRule of atRules.reverse()) {
    node = {
      kind: "at-rule",
      name: atRule.name,
      ...(atRule.params === undefined ? {} : { params: atRule.params }),
      children: [node],
    }
  }

  return node
}

function transformRecipe(
  prefix: string,
  recipe: Extract<NormalizedRecipe, { kind: "recipe" }>,
  registry: CompilerRegistry,
  propertyTransformer: RecipePropertyTransformer,
) {
  const baseClassName = getRecipeClassName(prefix, recipe.name)
  const nodes: CssNode[] = [
    ...transformStyle(
      `.${baseClassName}`,
      recipe.base,
      registry,
      propertyTransformer,
    ),
  ]

  for (const variant of recipe.variants) {
    nodes.push(
      ...transformStyle(
        `.${getVariantClassName(baseClassName, variant.name, variant.value)}`,
        variant.style,
        registry,
        propertyTransformer,
      ),
    )
  }

  for (const compoundVariant of recipe.compoundVariants) {
    nodes.push(
      ...transformStyle(
        `.${getCompoundClassName(baseClassName, compoundVariant.when)}`,
        compoundVariant.style,
        registry,
        propertyTransformer,
      ),
    )
  }

  return nodes
}

function transformSlotRecipe(
  prefix: string,
  recipe: Extract<NormalizedRecipe, { kind: "slotRecipe" }>,
  registry: CompilerRegistry,
  propertyTransformer: RecipePropertyTransformer,
) {
  const baseClassName = getRecipeClassName(prefix, recipe.name)
  const nodes: CssNode[] = []

  for (const slotStyle of recipe.base) {
    nodes.push(
      ...transformStyle(
        `.${getSlotClassName(baseClassName, slotStyle.slot)}`,
        slotStyle.style,
        registry,
        propertyTransformer,
      ),
    )
  }

  for (const variant of recipe.variants) {
    for (const slotStyle of variant.slots) {
      nodes.push(
        ...transformStyle(
          `.${getVariantClassName(
            getSlotClassName(baseClassName, slotStyle.slot),
            variant.name,
            variant.value,
          )}`,
          slotStyle.style,
          registry,
          propertyTransformer,
        ),
      )
    }
  }

  for (const compoundVariant of recipe.compoundVariants) {
    for (const slotStyle of compoundVariant.slots) {
      nodes.push(
        ...transformStyle(
          `.${getCompoundClassName(
            getSlotClassName(baseClassName, slotStyle.slot),
            compoundVariant.when,
          )}`,
          slotStyle.style,
          registry,
          propertyTransformer,
        ),
      )
    }
  }

  return nodes
}

export function transformRecipes(
  system: NormalizedSystem,
  registry: CompilerRegistry,
  propertyTransformer: RecipePropertyTransformer = transformProperty,
) {
  return system.recipes.map((recipe) => ({
    kind: "recipe" as const,
    name: recipe.name,
    nodes:
      recipe.kind === "slotRecipe"
        ? transformSlotRecipe(
            system.prefix,
            recipe,
            registry,
            propertyTransformer,
          )
        : transformRecipe(system.prefix, recipe, registry, propertyTransformer),
  }))
}
