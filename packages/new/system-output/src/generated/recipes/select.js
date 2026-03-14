import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "@jongh/new-system-runtime"

const selectSlots = [
  ["root", "jds-select__root"],
  ["group", "jds-select__group"],
  ["value", "jds-select__value"],
  ["trigger", "jds-select__trigger"],
  ["viewport", "jds-select__viewport"],
  ["content", "jds-select__content"],
  ["label", "jds-select__label"],
  ["item", "jds-select__item"],
  ["itemIndicator", "jds-select__itemIndicator"],
  ["separator", "jds-select__separator"],
]
const defaultVariants = {}
const compoundVariants = []

export const selectVariantMap = {}
export const selectVariantKeys = Object.keys(selectVariantMap)

export function select(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    selectSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(select, {
  splitVariantProps: (props) => splitVariantProps(props, selectVariantMap),
})
