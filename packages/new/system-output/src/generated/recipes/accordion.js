import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "../../internal/recipe.js"

const accordionSlots = [
  ["root", "jds-accordion__root"],
  ["item", "jds-accordion__item"],
  ["header", "jds-accordion__header"],
  ["trigger", "jds-accordion__trigger"],
  ["content", "jds-accordion__content"],
  ["contentWrapper", "jds-accordion__contentWrapper"],
]
const defaultVariants = {
  variant: "outline",
}
const compoundVariants = []

export const accordionVariantMap = {
  variant: ["outline", "subtle"],
}
export const accordionVariantKeys = Object.keys(accordionVariantMap)

export function accordion(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    accordionSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(accordion, {
  splitVariantProps: (props) => splitVariantProps(props, accordionVariantMap),
})
