import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "../../internal/recipe.js"

const tabsSlots = [
  ["root", "jds-tabs__root"],
  ["list", "jds-tabs__list"],
  ["trigger", "jds-tabs__trigger"],
  ["content", "jds-tabs__content"],
]
const defaultVariants = {
  size: "md",
  tone: "neutral",
}
const compoundVariants = []

export const tabsVariantMap = {
  size: ["sm", "md"],
  tone: ["neutral", "accent"],
}
export const tabsVariantKeys = Object.keys(tabsVariantMap)

export function tabs(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    tabsSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(tabs, {
  splitVariantProps: (props) => splitVariantProps(props, tabsVariantMap),
})
