import { normalizeStyle } from "./styles.ts"
import { entriesOf, isRecord } from "./utils.ts"

export function normalizeRecipes(recipes: unknown) {
  return entriesOf(recipes).map(([key, recipe]) => {
    const recipeRecord = isRecord(recipe) ? recipe : {}
    const name = typeof recipeRecord.name === "string" ? recipeRecord.name : key

    if ("slots" in recipeRecord) {
      return {
        kind: "slotRecipe",
        name,
        slots: Array.isArray(recipeRecord.slots) ? [...recipeRecord.slots] : [],
        base: entriesOf(recipeRecord.base).map(([slot, style]) => ({
          slot,
          style: normalizeStyle(style),
        })),
        variants: entriesOf(recipeRecord.variants).flatMap(
          ([variantName, values]) =>
            entriesOf(values).map(([variantValue, slotStyles]) => ({
              name: variantName,
              value: variantValue,
              slots: entriesOf(slotStyles).map(([slot, style]) => ({
                slot,
                style: normalizeStyle(style),
              })),
            })),
        ),
        compoundVariants: Array.isArray(recipeRecord.compoundVariants)
          ? recipeRecord.compoundVariants.map((compoundVariant) => {
              const compoundVariantRecord = isRecord(compoundVariant)
                ? compoundVariant
                : {}

              return {
                when: Object.fromEntries(
                  entriesOf(compoundVariantRecord.when).filter(
                    ([, value]) => value !== undefined,
                  ),
                ),
                slots: entriesOf(compoundVariantRecord.css).map(
                  ([slot, style]) => ({
                    slot,
                    style: normalizeStyle(style),
                  }),
                ),
              }
            })
          : [],
        defaultVariants: Object.fromEntries(
          entriesOf(recipeRecord.defaultVariants).filter(
            ([, value]) => value !== undefined,
          ),
        ),
      }
    }

    return {
      kind: "recipe",
      name,
      base: normalizeStyle(recipeRecord.base),
      variants: entriesOf(recipeRecord.variants).flatMap(
        ([variantName, values]) =>
          entriesOf(values).map(([variantValue, style]) => ({
            name: variantName,
            value: variantValue,
            style: normalizeStyle(style),
          })),
      ),
      compoundVariants: Array.isArray(recipeRecord.compoundVariants)
        ? recipeRecord.compoundVariants.map((compoundVariant) => {
            const compoundVariantRecord = isRecord(compoundVariant)
              ? compoundVariant
              : {}

            return {
              when: Object.fromEntries(
                entriesOf(compoundVariantRecord.when).filter(
                  ([, value]) => value !== undefined,
                ),
              ),
              style: normalizeStyle(compoundVariantRecord.css),
            }
          })
        : [],
      defaultVariants: Object.fromEntries(
        entriesOf(recipeRecord.defaultVariants).filter(
          ([, value]) => value !== undefined,
        ),
      ),
    }
  })
}
