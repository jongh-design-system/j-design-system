import { cx } from "./cx"

export type VariantSelection = Record<string, string | boolean | undefined>

export function mergeVariants<T extends VariantSelection>(
  defaults: T,
  props: Partial<T>,
): T {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props).filter(([, value]) => value != null),
    ),
  }
}

export function splitVariantProps<T extends Record<string, unknown>>(
  props: T,
  variantMap: Record<string, Array<string | boolean>>,
): [Record<string, unknown>, Omit<T, keyof typeof variantMap>] {
  const variantProps: Record<string, unknown> = {}
  const otherProps: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(props)) {
    if (Object.hasOwn(variantMap, key)) {
      variantProps[key] = value
      continue
    }

    otherProps[key] = value
  }

  return [variantProps, otherProps as Omit<T, keyof typeof variantMap>]
}

export function createClassName(
  baseClassName: string,
  variants: VariantSelection,
  compoundVariants: Array<Record<string, string>> = [],
): string {
  const variantClasses = Object.entries(variants)
    .filter(([, value]) => value != null)
    .map(
      ([variantName, variantValue]) =>
        `${baseClassName}--${variantName}_${String(variantValue)}`,
    )

  const compoundClasses = compoundVariants
    .filter((compoundVariant) =>
      Object.entries(compoundVariant).every(
        ([variantName, variantValue]) => variants[variantName] === variantValue,
      ),
    )
    .map(
      (compoundVariant) =>
        `${baseClassName}--${Object.entries(compoundVariant)
          .map(
            ([variantName, variantValue]) => `${variantName}_${variantValue}`,
          )
          .join("-")}`,
    )

  return cx(baseClassName, ...variantClasses, ...compoundClasses)
}
