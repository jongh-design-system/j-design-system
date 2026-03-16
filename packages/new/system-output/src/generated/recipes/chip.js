import { createClassName, mergeVariants, splitVariantProps } from "../../internal/recipe.js"

const defaultVariants = {
  "variant": "filled",
  "size": "md",
  "layout": "withText"
}
const compoundVariants = [
  {
    "layout": "iconOnly",
    "size": "sm"
  },
  {
    "layout": "iconOnly",
    "size": "md"
  },
  {
    "variant": "outlined",
    "layout": "withText",
    "size": "sm"
  }
]

export const chipVariantMap = {
  "variant": [
    "filled",
    "outlined"
  ],
  "size": [
    "sm",
    "md"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
}
export const chipVariantKeys = Object.keys(chipVariantMap)

export function chip(props = {}) {
  return createClassName("jds-chip", mergeVariants(defaultVariants, props), compoundVariants)
}

Object.assign(chip, {
  splitVariantProps: (props) => splitVariantProps(props, chipVariantMap)
})
