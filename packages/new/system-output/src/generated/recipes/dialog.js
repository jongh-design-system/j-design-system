import { createClassName, mergeVariants, splitVariantProps } from "../../internal/recipe.js"

const dialogSlots = [
  [
    "trigger",
    "jds-dialog__trigger"
  ],
  [
    "overlay",
    "jds-dialog__overlay"
  ],
  [
    "content",
    "jds-dialog__content"
  ],
  [
    "close",
    "jds-dialog__close"
  ],
  [
    "header",
    "jds-dialog__header"
  ],
  [
    "title",
    "jds-dialog__title"
  ],
  [
    "description",
    "jds-dialog__description"
  ],
  [
    "footer",
    "jds-dialog__footer"
  ]
]
const defaultVariants = {
  "tone": "default"
}
const compoundVariants = []

export const dialogVariantMap = {
  "tone": [
    "default",
    "accent"
  ]
}
export const dialogVariantKeys = Object.keys(dialogVariantMap)

export function dialog(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    dialogSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants)
    ])
  )
}

Object.assign(dialog, {
  splitVariantProps: (props) => splitVariantProps(props, dialogVariantMap)
})
