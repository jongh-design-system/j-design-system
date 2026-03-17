import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "../../internal/recipe.js"

const avatarSlots = [
  ["root", "jds-avatar__root"],
  ["image", "jds-avatar__image"],
  ["fallback", "jds-avatar__fallback"],
]
const defaultVariants = {
  size: "md",
  shape: "circle",
  tone: "neutral",
}
const compoundVariants = []

export const avatarVariantMap = {
  size: ["sm", "md", "lg"],
  shape: ["circle", "rounded"],
  tone: ["neutral", "accent"],
}
export const avatarVariantKeys = Object.keys(avatarVariantMap)

export function avatar(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    avatarSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(avatar, {
  splitVariantProps: (props) => splitVariantProps(props, avatarVariantMap),
})
