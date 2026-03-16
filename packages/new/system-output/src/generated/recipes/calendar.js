import {
  createClassName,
  mergeVariants,
  splitVariantProps,
} from "@jongh/new-system-runtime/recipe"

const calendarSlots = [
  ["root", "jds-calendar__root"],
  ["header", "jds-calendar__header"],
  ["title", "jds-calendar__title"],
  ["navButton", "jds-calendar__navButton"],
  ["weekday", "jds-calendar__weekday"],
  ["daysGrid", "jds-calendar__daysGrid"],
  ["weekRow", "jds-calendar__weekRow"],
  ["dayCell", "jds-calendar__dayCell"],
]
const defaultVariants = {}
const compoundVariants = []

export const calendarVariantMap = {}
export const calendarVariantKeys = Object.keys(calendarVariantMap)

export function calendar(props = {}) {
  const variants = mergeVariants(defaultVariants, props)

  return Object.fromEntries(
    calendarSlots.map(([slot, className]) => [
      slot,
      createClassName(className, variants, compoundVariants),
    ]),
  )
}

Object.assign(calendar, {
  splitVariantProps: (props) => splitVariantProps(props, calendarVariantMap),
})
