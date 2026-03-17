import { createClassName, mergeVariants, splitVariantProps } from "../../internal/recipe.js"

const textfieldSlots = [
  [
    "root",
    "jds-textfield__root"
  ],
  [
    "heading",
    "jds-textfield__heading"
  ],
  [
    "container",
    "jds-textfield__container"
  ],
  [
    "input",
    "jds-textfield__input"
  ],
  [
    "trailingButton",
    "jds-textfield__trailingButton"
  ],
  [
    "helper",
    "jds-textfield__helper"
  ]
]
const defaultVariants = {
  "status": "normal"
}
const compoundVariants = []

export const textfieldVariantMap = {
  "status": [
    "normal",
    "negative"
  ]
}
export const textfieldVariantKeys = Object.keys(textfieldVariantMap)

export function textfield(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    textfieldSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants)
    ])
  )
}

Object.assign(textfield, {
  splitVariantProps: (props) => splitVariantProps(props, textfieldVariantMap)
})
