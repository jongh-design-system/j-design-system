declare interface CalendarVariant {}

export declare type CalendarVariantProps = Partial<CalendarVariant>
export declare type CalendarSlotName =
  | "root"
  | "header"
  | "title"
  | "navButton"
  | "weekday"
  | "daysGrid"
  | "weekRow"
  | "dayCell"

export declare const calendar: ((
  props?: CalendarVariantProps,
) => Record<CalendarSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [CalendarVariantProps, Omit<T, keyof CalendarVariantProps>]
}
