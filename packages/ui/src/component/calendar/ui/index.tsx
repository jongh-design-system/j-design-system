import "dayjs/locale/ko"

import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.locale("ko")

import { Context, useControllableState } from "radix-ui/internal"
import { type ReactNode, useCallback, useMemo } from "react"

type DateFormat = {
  year: number
  month: number
  day: number
  daysInMonth: number
  daysInPrevMonth: number
  startWeek: number //0 | 1 | 2 | 3 | 4 | 5 | 6
  nextMonthStartWeek: number //0 | 1 | 2 | 3 | 4 | 5 | 6
}
export interface CalendarContextType {
  value: DateFormat
  weekStart?: 0 | 1
  onChange: (value: Date) => void
  onMonthChange: (amount: number) => void
  onYearChange: (amount: number) => void
}

const contextScopeName = "calendar"

const [CalendarProvider, useCalendarContext] =
  Context.createContext<CalendarContextType>(contextScopeName)
export type CalendarRootProps = {
  children?: ReactNode
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  weekStart: 0 | 1 // 0: 일요일, 1: 월요일
}

export const Calendar = ({
  children,
  value,
  defaultValue,
  onChange,
  weekStart = 0,
}: CalendarRootProps) => {
  const [dateValue = new Date(), setDateValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange,
  })

  dayjs.updateLocale("ko", { weekStart })

  const onMonthChange = useCallback(
    (amount: number) => {
      setDateValue((prevDate) => dayjs(prevDate).add(amount, "month").toDate())
    },
    [setDateValue],
  )

  const onYearChange = useCallback(
    (amount: number) => {
      setDateValue((prevDate) => dayjs(prevDate).add(amount, "year").toDate())
    },
    [setDateValue],
  )

  // 날짜 계산 로직을 useMemo로 최적화
  const dateFormat = useMemo(() => {
    const currentDate = dayjs(dateValue)
    return {
      year: currentDate.year(),
      month: currentDate.month() + 1,
      day: currentDate.date(),
      daysInMonth: currentDate.daysInMonth(),
      startWeek: currentDate.startOf("month").day() - weekStart,
      daysInPrevMonth: currentDate.subtract(1, "month").daysInMonth(),
      nextMonthStartWeek:
        currentDate.add(1, "month").startOf("month").day() - weekStart,
    }
  }, [dateValue, weekStart])

  return (
    <CalendarProvider
      value={dateFormat}
      onChange={setDateValue}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
      weekStart={weekStart}
    >
      {children}
    </CalendarProvider>
  )
}

export const Days = () => {
  const { value } = useCalendarContext(contextScopeName)

  const weeks = useMemo(() => {
    const days: Array<{ day: number; isCurrentMonth: boolean }> = []

    for (let i = value.startWeek; i > 0; i--) {
      days.push({
        day: value.daysInPrevMonth - i + 1,
        isCurrentMonth: false,
      })
    }

    for (let i = 1; i <= value.daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      })
    }

    for (let i = 1; i <= 6 - value.nextMonthStartWeek + 1; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      })
    }

    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return weeks
  }, [
    value.startWeek,
    value.daysInMonth,
    value.daysInPrevMonth,
    value.nextMonthStartWeek,
  ])

  return (
    <div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} style={{ display: "flex" }}>
          {week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`}>{day.day}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

interface HeaderProps {
  short?: boolean
}

export const Header = ({ short = true }: HeaderProps) => {
  const weekdays = short ? dayjs.weekdaysShort(true) : dayjs.weekdays(true)

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {weekdays.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  )
}
