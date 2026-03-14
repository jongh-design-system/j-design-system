import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "@jongh/new-system-runtime"

const sliderSlots = [
  ["root", "jds-slider__root"],
  ["track", "jds-slider__track"],
  ["range", "jds-slider__range"],
  ["thumb", "jds-slider__thumb"],
]
const defaultVariants = {}
const compoundVariants = []

export const sliderVariantMap = {}
export const sliderVariantKeys = Object.keys(sliderVariantMap)

export function slider(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    sliderSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(slider, {
  splitVariantProps: (props) => splitVariantProps(props, sliderVariantMap),
})
