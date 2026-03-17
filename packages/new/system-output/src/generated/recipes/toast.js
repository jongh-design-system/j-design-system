import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "../../internal/recipe.js"

const toastSlots = [
  ["container", "jds-toast__container"],
  ["item", "jds-toast__item"],
  ["close", "jds-toast__close"],
]
const defaultVariants = {
  position: "bottom-right",
  variant: "default",
}
const compoundVariants = []

export const toastVariantMap = {
  position: [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ],
  variant: ["default", "destructive"],
}
export const toastVariantKeys = Object.keys(toastVariantMap)

export function toast(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    toastSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(toast, {
  splitVariantProps: (props) => splitVariantProps(props, toastVariantMap),
})
