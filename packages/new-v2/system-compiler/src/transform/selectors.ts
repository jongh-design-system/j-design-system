const pseudoSelectors = {
  _active: ":active",
  _checked: ":checked",
  _closed: "[data-state='closed']",
  _disabled: ":disabled",
  _focus: ":focus",
  _focusVisible: ":focus-visible",
  _focusWithin: ":focus-within",
  _hover: ":hover",
  _open: "[data-state='open']",
  _selected: "[data-selected]",
} as const

export function getRecipeClassName(prefix: string, name: string): string {
  return `${prefix}-${name}`
}

export function getVariantClassName(
  baseClassName: string,
  variantName: string,
  variantValue: string,
): string {
  return `${baseClassName}--${variantName}_${variantValue}`
}

export function getCompoundClassName(
  baseClassName: string,
  selection: Record<string, string | undefined>,
): string {
  const suffix = Object.entries(selection)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}_${value}`)
    .join("-")

  return `${baseClassName}--${suffix}`
}

export function getSlotClassName(baseClassName: string, slot: string): string {
  return `${baseClassName}__${slot}`
}

export function getNestedSelector(parent: string, key: string): string {
  if (key in pseudoSelectors) {
    return `${parent}${pseudoSelectors[key as keyof typeof pseudoSelectors]}`
  }

  if (key.startsWith("&")) {
    return key.replaceAll("&", parent)
  }

  return key
}

export function isNestedSelector(key: string): boolean {
  return key in pseudoSelectors || key.startsWith("&")
}

export function isNestedAtRule(key: string): boolean {
  return (
    key.startsWith("@media ") ||
    key.startsWith("@supports ") ||
    key.startsWith("@container ")
  )
}
