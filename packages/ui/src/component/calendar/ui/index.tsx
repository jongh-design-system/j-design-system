import dayjs from "dayjs"
import { Context, useControllableState } from "radix-ui/internal"
import { type ReactNode, useMemo } from "react"

type DateFormat = {
  year: number
  month: number
  day: number
  daysInMonth: number
  daysInPrevMonth: number
  startWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  nextMonthStartWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
}
export interface CalendarContextType {
  value: DateFormat
  onChange: (value: Date) => void
}

const contextScopeName = "calendar"

const [CalendarProvider, useCalendarContext] =
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

  const currentDate = dayjs(dateValue)

  const dateFormat = {
    year: currentDate.year(),
    month: currentDate.month() + 1,
    day: currentDate.date(),
    daysInMonth: currentDate.daysInMonth(),
    startWeek: currentDate.startOf("month").day(), // 1일의 요일
    daysInPrevMonth: currentDate.subtract(1, "month").daysInMonth(),
    nextMonthStartWeek: currentDate.add(1, "month").startOf("month").day(),
  } satisfies DateFormat

  return (
    <CalendarProvider value={dateFormat} onChange={setDateValue}>
      {children}
    </CalendarProvider>
  )
}

export const Days = () => {
  const { value } = useCalendarContext(contextScopeName)

  useMemo(() => {
    const days: number[] = [] //7*6

    for (let i = value.startWeek; i > 0; i--) {
      days.push(value.daysInPrevMonth - i + 1)
    } //display previous

    for (let i = 1; i <= value.daysInMonth; i++) {
      days.push(i)
    } //display current

    for (let i = 1; i <= 6 - value.nextMonthStartWeek + 1; i++) {
      days.push(i)
    } //display next

    return days
  }, [
    value.startWeek,
    value.daysInMonth,
    value.daysInPrevMonth,
    value.nextMonthStartWeek,
  ])

  return <div></div>
}
