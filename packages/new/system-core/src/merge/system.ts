import type {
  AnyRecipeDefinition,
  KeyframeDefinition,
  RecipeCompoundVariant,
  RecipeDefinition,
  RecipeInputDefinition,
  RecipeVariantRecord,
  SlotRecipeCompoundVariant,
  SlotRecipeDefinition,
  SlotRecipeVariantRecord,
  SystemConfigDefinition,
  SystemDefinition,
  SystemThemeDefinition,
  SystemThemeInput,
} from "../types/recipe.ts"
import type { StyleObject, ThemeContract } from "../types/style.ts"

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry)) as T
  }

  if (isPlainObject(value)) {
    const cloned: Record<string, unknown> = {}

    for (const [key, nestedValue] of Object.entries(value)) {
      cloned[key] = cloneValue(nestedValue)
    }

    return cloned as T
  }

  return value
}

function deepMerge<T>(base: T | undefined, override: unknown): T | undefined {
  if (override === undefined) {
    return base === undefined ? undefined : cloneValue(base)
  }

  if (Array.isArray(override)) {
    return cloneValue(override) as T
  }

  if (isPlainObject(base) && isPlainObject(override)) {
    const merged: Record<string, unknown> = {}
    const keys = new Set([...Object.keys(base), ...Object.keys(override)])

    for (const key of keys) {
      merged[key] = deepMerge(
        base[key] as unknown,
        key in override ? override[key] : undefined,
      )
    }

    return merged as T
  }

  if (isPlainObject(override)) {
    return cloneValue(override) as T
  }

  return override as T
}

function getRecipeName(
  key: string,
  definition: Record<string, unknown>,
): string {
  const name = definition.name

  if (name === undefined) {
    return key
  }

  if (typeof name !== "string") {
    throw new Error(`Recipe "${key}" must declare a string name`)
  }

  if (name !== key) {
    throw new Error(`Recipe key "${key}" must match definition name "${name}"`)
  }

  return name
}

function hasSlotsDeclaration(value: Record<string, unknown>): boolean {
  return Array.isArray(value.slots)
}

function toArray<T>(value: unknown): T[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((entry) => cloneValue(entry as T))
}

function mergeSlots(
  existing: unknown,
  incoming: unknown,
): string[] | undefined {
  const values = new Set<string>()

  for (const slot of [
    ...toArray<string>(existing),
    ...toArray<string>(incoming),
  ]) {
    if (typeof slot === "string") {
      values.add(slot)
    }
  }

  return values.size > 0 ? [...values] : undefined
}

function mergeRecipeDefinition<TTheme extends ThemeContract>(
  key: string,
  existing: RecipeInputDefinition<TTheme> | undefined,
  incoming: RecipeInputDefinition<TTheme>,
): RecipeInputDefinition<TTheme> {
  const existingRecord: Record<string, unknown> = isPlainObject(existing)
    ? existing
    : {}
  const incomingRecord: Record<string, unknown> = isPlainObject(incoming)
    ? incoming
    : {}
  const existingIsSlot = hasSlotsDeclaration(existingRecord)
  const incomingIsSlot = hasSlotsDeclaration(incomingRecord)

  if (existing && existingIsSlot !== incomingIsSlot && incomingIsSlot) {
    throw new Error(`Recipe "${key}" cannot merge slot and single definitions`)
  }

  const merged = deepMerge(existingRecord, incomingRecord) ?? {}
  const mergedRecord: Record<string, unknown> = isPlainObject(merged)
    ? merged
    : {}

  if (
    "compoundVariants" in existingRecord ||
    "compoundVariants" in incomingRecord
  ) {
    mergedRecord.compoundVariants = [
      ...toArray(existingRecord.compoundVariants),
      ...toArray(incomingRecord.compoundVariants),
    ]
  }

  if (existingIsSlot || incomingIsSlot) {
    mergedRecord.slots = mergeSlots(existingRecord.slots, incomingRecord.slots)
  }

  mergedRecord.name = getRecipeName(
    key,
    isPlainObject(incomingRecord) && "name" in incomingRecord
      ? incomingRecord
      : isPlainObject(existingRecord)
        ? existingRecord
        : mergedRecord,
  )

  return mergedRecord as RecipeInputDefinition<TTheme>
}

function mergeRecipeMap<TTheme extends ThemeContract>(
  existing: Record<string, RecipeInputDefinition<TTheme>> | undefined,
  incoming: Record<string, RecipeInputDefinition<TTheme>> | undefined,
): Record<string, RecipeInputDefinition<TTheme>> | undefined {
  if (!existing && !incoming) {
    return undefined
  }

  const merged = cloneValue(existing ?? {})

  for (const [key, recipe] of Object.entries(incoming ?? {})) {
    merged[key] = mergeRecipeDefinition(
      key,
      merged[key] as RecipeInputDefinition<TTheme> | undefined,
      recipe as RecipeInputDefinition<TTheme>,
    )
  }

  return merged as Record<string, RecipeInputDefinition<TTheme>>
}

function mergeThemeInput<TTheme extends ThemeContract>(
  existing: SystemThemeInput<TTheme>,
  incoming: SystemThemeInput<TTheme>,
): SystemThemeInput<TTheme> {
  return {
    primitiveTokens:
      deepMerge(existing.primitiveTokens, incoming.primitiveTokens) ??
      existing.primitiveTokens,
    semanticTokens:
      deepMerge(existing.semanticTokens, incoming.semanticTokens) ??
      existing.semanticTokens,
    recipes: mergeRecipeMap(existing.recipes, incoming.recipes),
    keyframes:
      deepMerge(existing.keyframes, incoming.keyframes) ?? existing.keyframes,
  }
}

function getRequiredObject(
  value: unknown,
  errorMessage: string,
): Record<string, unknown> {
  if (!isPlainObject(value)) {
    throw new Error(errorMessage)
  }

  return value
}

function normalizeCompoundVariants<TVariant>(
  value: unknown,
  recipeName: string,
): TVariant[] {
  const variants = toArray<TVariant>(value)

  for (const variant of variants) {
    const record = getRequiredObject(
      variant,
      `Recipe "${recipeName}" compoundVariants must contain objects`,
    )

    getRequiredObject(
      record.when,
      `Recipe "${recipeName}" compoundVariants entries must define "when"`,
    )
    getRequiredObject(
      record.css,
      `Recipe "${recipeName}" compoundVariants entries must define "css"`,
    )
  }

  return variants
}

function finalizeSingleRecipe<TTheme extends ThemeContract>(
  key: string,
  definition: Record<string, unknown>,
): RecipeDefinition<TTheme> {
  return {
    name: getRecipeName(key, definition),
    base: getRequiredObject(
      definition.base,
      `Recipe "${key}" must define "base" after preset composition`,
    ) as StyleObject<TTheme>,
    variants: getRequiredObject(
      definition.variants,
      `Recipe "${key}" must define "variants" after preset composition`,
    ) as RecipeVariantRecord<TTheme>,
    compoundVariants: normalizeCompoundVariants<RecipeCompoundVariant<TTheme>>(
      definition.compoundVariants,
      key,
    ),
    defaultVariants: getRequiredObject(
      definition.defaultVariants,
      `Recipe "${key}" must define "defaultVariants" after preset composition`,
    ) as Partial<Record<string, string>>,
  }
}

function finalizeSlotRecipe<TTheme extends ThemeContract>(
  key: string,
  definition: Record<string, unknown>,
): SlotRecipeDefinition<string, TTheme> {
  const slots = toArray<string>(definition.slots)

  if (slots.length === 0) {
    throw new Error(
      `Slot recipe "${key}" must define "slots" after preset composition`,
    )
  }

  return {
    name: getRecipeName(key, definition),
    slots,
    base: getRequiredObject(
      definition.base,
      `Slot recipe "${key}" must define "base" after preset composition`,
    ) as Partial<Record<string, StyleObject<TTheme>>>,
    variants: getRequiredObject(
      definition.variants,
      `Slot recipe "${key}" must define "variants" after preset composition`,
    ) as SlotRecipeVariantRecord<string, TTheme>,
    compoundVariants: normalizeCompoundVariants<
      SlotRecipeCompoundVariant<string, TTheme>
    >(definition.compoundVariants, key),
    defaultVariants: getRequiredObject(
      definition.defaultVariants,
      `Slot recipe "${key}" must define "defaultVariants" after preset composition`,
    ) as Partial<Record<string, string>>,
  }
}

function finalizeRecipes<TTheme extends ThemeContract>(
  recipes: Record<string, RecipeInputDefinition<TTheme>> | undefined,
): Record<string, AnyRecipeDefinition<TTheme>> {
  const finalized: Record<string, AnyRecipeDefinition<TTheme>> = {}

  for (const [key, recipe] of Object.entries(recipes ?? {})) {
    const definition = getRequiredObject(
      recipe,
      `Recipe "${key}" must be an object`,
    )

    finalized[key] = hasSlotsDeclaration(definition)
      ? finalizeSlotRecipe(key, definition)
      : finalizeSingleRecipe(key, definition)
  }

  return finalized
}

function finalizePrimitiveTokens<TTheme extends ThemeContract>(
  primitiveTokens: SystemThemeInput<TTheme>["primitiveTokens"],
): TTheme["primitiveTokens"] {
  const definition = getRequiredObject(
    primitiveTokens,
    'defineSystem requires "primitiveTokens" after preset composition',
  )
  const requiredFamilies = [
    "color",
    "spacing",
    "radius",
    "typography",
    "shadow",
    "motion",
  ]

  for (const family of requiredFamilies) {
    if (!isPlainObject(definition[family])) {
      throw new Error(
        `defineSystem requires "primitiveTokens.${family}" after preset composition`,
      )
    }
  }

  return definition as unknown as TTheme["primitiveTokens"]
}

function finalizeTheme<TTheme extends ThemeContract>(
  theme: SystemThemeInput<TTheme>,
): SystemThemeDefinition<TTheme> {
  const finalizedTheme = {
    primitiveTokens: finalizePrimitiveTokens(theme.primitiveTokens),
    semanticTokens: (theme.semanticTokens ?? {}) as TTheme["semanticTokens"],
    recipes: finalizeRecipes(theme.recipes),
  } as SystemThemeDefinition<TTheme>

  if (theme.keyframes !== undefined) {
    finalizedTheme.keyframes = theme.keyframes as Record<
      string,
      KeyframeDefinition
    > &
      TTheme["keyframes"]
  }

  return finalizedTheme
}

export function composeSystemDefinition<TTheme extends ThemeContract>(
  definition: SystemConfigDefinition<TTheme>,
): SystemDefinition<TTheme> {
  let mergedTheme: SystemThemeInput<TTheme> = {}

  for (const preset of definition.presets ?? []) {
    mergedTheme = mergeThemeInput(mergedTheme, preset)
  }

  mergedTheme = mergeThemeInput(mergedTheme, definition.theme)

  return {
    name: definition.name,
    prefix: definition.prefix,
    theme: finalizeTheme(mergedTheme),
  }
}
