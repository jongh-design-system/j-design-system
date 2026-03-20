import { composeSystemDefinition } from "./merge/system.ts"
import type {
  RecipeDefinition,
  RecipeVariantRecord,
  SlotRecipeDefinition,
  SlotRecipeVariantRecord,
  SystemConfigDefinition,
  SystemDefinition,
  SystemPresetDefinition,
} from "./types/recipe.ts"
import type { ThemeContract } from "./types/style.ts"
import type {
  PrimitiveTokensDefinition,
  SemanticTokensDefinition,
} from "./types/tokens.ts"

type ProxyValue<TValue> = (<const TInput extends TValue>(
  value: TInput,
) => TInput) & {
  [TKey in keyof TValue]-?: <
    const TInput extends Exclude<TValue[TKey], undefined>,
  >(
    value: TInput,
  ) => TInput
}

function createProxy<TValue>(): ProxyValue<TValue> {
  const identity = <const TInput extends TValue>(value: TInput): TInput => value

  return new Proxy(identity, {
    get() {
      return identity
    },
  }) as ProxyValue<TValue>
}

export const definePrimitiveTokens = createProxy<PrimitiveTokensDefinition>()

export function defineRecipe<
  TTheme extends ThemeContract,
  const T extends RecipeVariantRecord<TTheme>,
>(definition: RecipeDefinition<TTheme, T>): RecipeDefinition<TTheme, T> {
  return definition
}

export function defineSlotRecipe<
  const S extends string,
  TTheme extends ThemeContract,
  const T extends SlotRecipeVariantRecord<S, TTheme>,
>(
  definition: SlotRecipeDefinition<S, TTheme, T>,
): SlotRecipeDefinition<S, TTheme, T> {
  return definition
}

export function definePreset<TTheme extends ThemeContract>(
  definition: SystemPresetDefinition<TTheme>,
): SystemPresetDefinition<TTheme> {
  return definition
}

export function defineSystem<TTheme extends ThemeContract>(
  definition: SystemConfigDefinition<TTheme>,
): SystemDefinition<TTheme> {
  return composeSystemDefinition(definition)
}

export function createSemanticTokensFactory<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
>() {
  return {
    defineSemanticTokens:
      createProxy<SemanticTokensDefinition<TPrimitiveTokens>>(),
  }
}

export function createRecipeFactory<TTheme extends ThemeContract>() {
  return {
    defineRecipe<const T extends RecipeVariantRecord<TTheme>>(
      definition: RecipeDefinition<TTheme, T>,
    ): RecipeDefinition<TTheme, T> {
      return definition
    },
    defineSlotRecipe<
      const S extends string,
      const T extends SlotRecipeVariantRecord<S, TTheme>,
    >(
      definition: SlotRecipeDefinition<S, TTheme, T>,
    ): SlotRecipeDefinition<S, TTheme, T> {
      return definition
    },
    definePreset(
      definition: SystemPresetDefinition<TTheme>,
    ): SystemPresetDefinition<TTheme> {
      return definition
    },
    defineSystem(
      definition: SystemConfigDefinition<TTheme>,
    ): SystemDefinition<TTheme> {
      return composeSystemDefinition(definition)
    },
  }
}
