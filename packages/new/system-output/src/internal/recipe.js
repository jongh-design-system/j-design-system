export function cx(...values) {
  return values.filter(Boolean).join(" ")
}

export function mergeVariants(defaults, props) {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props).filter(([, value]) => value != null),
    ),
  }
}

export function splitVariantProps(props, variantMap) {
  const variantProps = {}
  const otherProps = {}

  for (const [key, value] of Object.entries(props)) {
    if (Object.hasOwn(variantMap, key)) {
      variantProps[key] = value
      continue
    }

    otherProps[key] = value
  }

  return [variantProps, otherProps]
}

export function createClassName(
  baseClassName,
  variants,
  compoundVariants = [],
) {
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
