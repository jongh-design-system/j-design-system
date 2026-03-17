import type * as React from "react"
import type { ElementType, PropsWithoutRef } from "react"
import type { JSX } from "react/jsx-runtime"

export declare function cx(
  ...values: Array<string | false | null | undefined>
): string

type Recipe<Props extends Record<string, unknown>> = ((
  props?: Props,
) => string) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [Props, Omit<T, keyof Props>]
}

type MergeProps<
  TProps extends Record<string, unknown>,
  TRecipeProps extends Record<string, unknown>,
> = TProps extends unknown
  ? Omit<TProps, keyof TRecipeProps> & TRecipeProps
  : never

export declare function createRecipeContext<
  Props extends Record<string, unknown>,
>(
  recipe: Recipe<Props>,
): {
  withProvider: <TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    options?: { defaultProps?: Partial<TProps & Props> },
  ) => React.ForwardRefExoticComponent<
    PropsWithoutRef<MergeProps<TProps, Props>> & React.RefAttributes<TElement>
  >
  withContext: <TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
  ) => React.ForwardRefExoticComponent<
    PropsWithoutRef<MergeProps<TProps, Props>> & React.RefAttributes<TElement>
  >
  useRecipeProps: () => Props | null
}

type SlotRecipe<
  Props extends Record<string, unknown>,
  Slots extends string,
> = ((props?: Props) => Partial<Record<Slots, string>>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [Props, Omit<T, keyof Props>]
}

export declare function createSlotRecipeContext<
  Props extends Record<string, unknown>,
  Slots extends string,
>(
  recipe: SlotRecipe<Props, Slots>,
): {
  withProvider: <TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    slot: Slots,
    options?: { defaultProps?: Partial<TProps & Props> },
  ) => React.ForwardRefExoticComponent<
    PropsWithoutRef<MergeProps<TProps, Props>> & React.RefAttributes<TElement>
  >
  withRootProvider: <TProps>(
    Component: ElementType<TProps>,
    options?: { defaultProps?: Partial<TProps & Props> },
  ) => (props: MergeProps<TProps, Props>) => JSX.Element
  withContext: <TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    slot: Slots,
  ) => React.ForwardRefExoticComponent<
    PropsWithoutRef<TProps> & React.RefAttributes<TElement>
  >
  useSlotClasses: () => Partial<Record<Slots, string>>
  useRecipeProps: () => Props | null
}

export declare const createStyleContext: typeof createSlotRecipeContext
