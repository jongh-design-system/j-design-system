import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "@jongh/new-system-runtime/recipe"

const defaultVariants = {
  size: "md",
  variant: "primary",
}
const compoundVariants = []

export const buttonVariantMap = {
  size: ["sm", "md", "lg"],
  variant: ["primary", "secondary", "destructive", "outline", "link"],
}
export const buttonVariantKeys = Object.keys(buttonVariantMap)

export function button(props = {}) {
  return createClassName(
    "jds-button",
    mergeVariants(defaultVariants, props),
    compoundVariants,
  )
}

Object.assign(button, {
  splitVariantProps: (props) => splitVariantProps(props, buttonVariantMap),
})
