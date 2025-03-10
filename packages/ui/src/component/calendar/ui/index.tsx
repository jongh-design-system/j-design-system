import { Context, useControllableState } from "radix-ui/internal"
import type { ReactNode } from "react"

export interface CalendarContextType {
  value: Date
  onChange: (value: Date) => void
}

const contextScopeName = "calendar"

const [CalendarProvider] =
  Context.createContext<CalendarContextType>(contextScopeName)
export type CalendarRootProps = {
  children?: ReactNode
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
}

export const Calendar = ({
  children,
  value,
  defaultValue,
  onChange,
}: CalendarRootProps) => {
  const [dateValue = new Date(), setDateValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange,
  })
  return (
    <CalendarProvider value={dateValue} onChange={setDateValue}>
      {children}
    </CalendarProvider>
  )
}
