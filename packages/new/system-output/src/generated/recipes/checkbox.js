import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "../../internal/recipe.js"

const checkboxSlots = [
  ["root", "jds-checkbox__root"],
  ["label", "jds-checkbox__label"],
  ["input", "jds-checkbox__input"],
  ["text", "jds-checkbox__text"],
]
const defaultVariants = {
  size: "md",
  variant: "square",
}
const compoundVariants = []

export const checkboxVariantMap = {
  size: ["md", "lg"],
  variant: ["square", "ghost"],
}
export const checkboxVariantKeys = Object.keys(checkboxVariantMap)

export function checkbox(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    checkboxSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(checkbox, {
  splitVariantProps: (props) => splitVariantProps(props, checkboxVariantMap),
})
