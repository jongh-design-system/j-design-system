import { collectTokenPaths, isTokenReference } from "../resolve/tokens.ts"
import type { AnyRecipeDefinition, SystemDefinition } from "../types/recipe.ts"
import type { StyleObject, ThemeContract } from "../types/style.ts"

function visitStyleObject<TTheme extends ThemeContract>(
  style: StyleObject<TTheme>,
  visitor: (value: string, property: string) => void,
): void {
  for (const [property, value] of Object.entries(style)) {
    if (value === undefined) {
      continue
    }

    if (typeof value === "object" && value !== null) {
      visitStyleObject(value, visitor)
      continue
    }

    if (typeof value === "string") {
      visitor(value, property)
    }
  }
}

function validateRecipeStyleTokens<TTheme extends ThemeContract>(
  recipeName: string,
  style: StyleObject<TTheme>,
  tokenPaths: Set<string>,
): void {
  visitStyleObject(style, (value, property) => {
    if (property === "textStyle" && !value.startsWith("typography.")) {
      throw new Error(
        `Recipe "${recipeName}" uses an invalid textStyle reference "${value}"`,
      )
    }

    if (isTokenReference(value) && !tokenPaths.has(value)) {
      throw new Error(
        `Recipe "${recipeName}" references an unknown token "${value}"`,
      )
    }
  })
}

function validateDefaultVariants<TTheme extends ThemeContract>(
  recipe: AnyRecipeDefinition<TTheme>,
): void {
  for (const [variantName, defaultValue] of Object.entries(
    recipe.defaultVariants,
  )) {
    const values = recipe.variants[variantName]

    if (!values) {
      throw new Error(
        `Recipe "${recipe.name}" defaultVariants references missing variant "${variantName}"`,
      )
    }

    if (!Object.hasOwn(values, String(defaultValue))) {
      throw new Error(
        `Recipe "${recipe.name}" defaultVariants references missing value "${defaultValue}" for variant "${variantName}"`,
      )
    }
  }
}

export function validateRecipes<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): void {
  const tokenPaths = collectTokenPaths(system.theme)

  for (const recipe of Object.values(system.theme.recipes)) {
    validateDefaultVariants(recipe)

    if ("slots" in recipe) {
      for (const slot of Object.keys(recipe.base)) {
        if (!recipe.slots.includes(slot)) {
          throw new Error(
            `Slot recipe "${recipe.name}" base defines an unknown slot "${slot}"`,
          )
        }
      }

      for (const style of Object.values(recipe.base)) {
        if (!style) {
          continue
        }
        validateRecipeStyleTokens(recipe.name, style, tokenPaths)
      }

      for (const variant of Object.values(recipe.variants)) {
        for (const variantStyle of Object.values(variant)) {
          for (const [slot, style] of Object.entries(variantStyle)) {
            if (!recipe.slots.includes(slot)) {
              throw new Error(
                `Slot recipe "${recipe.name}" variant defines an unknown slot "${slot}"`,
              )
            }

            if (style) {
              validateRecipeStyleTokens(recipe.name, style, tokenPaths)
            }
          }
        }
      }

      for (const compoundVariant of recipe.compoundVariants ?? []) {
        for (const [variantName, variantValue] of Object.entries(
          compoundVariant.when,
        )) {
          if (variantValue === undefined) {
            continue
          }

          const variantDefinition = recipe.variants[variantName]
          if (
            !variantDefinition ||
            !Object.hasOwn(variantDefinition, variantValue)
          ) {
            throw new Error(
              `Slot recipe "${recipe.name}" compoundVariant references missing value "${variantValue}" for variant "${variantName}"`,
            )
          }
        }

        for (const style of Object.values(compoundVariant.css)) {
          if (style) {
            validateRecipeStyleTokens(recipe.name, style, tokenPaths)
          }
        }
      }

      continue
    }

    validateRecipeStyleTokens(recipe.name, recipe.base, tokenPaths)

    for (const variant of Object.values(recipe.variants)) {
      for (const style of Object.values(variant)) {
        validateRecipeStyleTokens(recipe.name, style, tokenPaths)
      }
    }

    for (const compoundVariant of recipe.compoundVariants ?? []) {
      for (const [variantName, variantValue] of Object.entries(
        compoundVariant.when,
      )) {
        if (variantValue === undefined) {
          continue
        }

        const variantDefinition = recipe.variants[variantName]
        if (
          !variantDefinition ||
          !Object.hasOwn(variantDefinition, variantValue)
        ) {
          throw new Error(
            `Recipe "${recipe.name}" compoundVariant references missing value "${variantValue}" for variant "${variantName}"`,
          )
        }
      }

      validateRecipeStyleTokens(recipe.name, compoundVariant.css, tokenPaths)
    }
  }
}
