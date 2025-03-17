"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Context, useControllableState } from "radix-ui/internal"
import { type ReactNode, useCallback, useMemo } from "react"

import { recipe } from "./recipe"

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
  weekStart: 0 | 1
  locale: Intl.LocalesArgument

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
  weekStart?: 0 | 1 // 0: 일요일, 1: 월요일
  locale?: Intl.LocalesArgument
}

export const Root = ({
  children,
  value,
  defaultValue,
  onChange,
  weekStart = 0,
  locale = "en-US",
  ...props
}: CalendarRootProps) => {
  const [dateValue = new Date(), setDateValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange,
  })

  const onMonthChange = useCallback(
    (amount: number) => {
      const newDate = new Date(dateValue)
      newDate.setMonth(newDate.getMonth() + amount)
      setDateValue(newDate)
    },
    [dateValue, setDateValue],
  )

  const onYearChange = useCallback(
    (amount: number) => {
      const newDate = new Date(dateValue)
      newDate.setFullYear(newDate.getFullYear() + amount)
      setDateValue(newDate)
    },
    [dateValue, setDateValue],
  )

  const dateFormat = useMemo(() => {
    const currentDate = new Date(dateValue)
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )
    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    )
    const nextMonthFirstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    )

    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      daysInMonth: lastDay.getDate(),
      startWeek: firstDay.getDay() - weekStart,
      daysInPrevMonth: prevMonthLastDay.getDate(),
      nextMonthStartWeek: nextMonthFirstDay.getDay() - weekStart,
    }
  }, [dateValue, weekStart])

  const styles = recipe()

  return (
    <CalendarProvider
      value={dateFormat}
      onChange={setDateValue}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
      weekStart={weekStart}
      locale={locale}
    >
      <div className={styles.root} {...props}>
        {children}
      </div>
    </CalendarProvider>
  )
}

interface HeaderProps {
  month?: Intl.DateTimeFormatOptions["month"]
  year?: Intl.DateTimeFormatOptions["year"]
  render?: (date: Date, locale: Intl.LocalesArgument) => string
}

export const Header = ({
  month = "long",
  year = "numeric",
  render,
}: HeaderProps) => {
  const { value, onMonthChange, locale } = useCalendarContext(contextScopeName)
  const styles = recipe()

  const monthAndYear = new Intl.DateTimeFormat(locale, {
    month: month,
    year: year,
  }).format(new Date(value.year, value.month - 1))

  return (
    <div className={styles.header}>
      <button
        className={styles.navButton}
        onClick={() => onMonthChange(-1)}
        aria-label="Go To Previous month"
      >
        <ChevronLeft />
      </button>
      <div className={styles.title}>
        {render
          ? render(new Date(value.year, value.month - 1), locale)
          : `${monthAndYear}`}
      </div>
      <button
        className={styles.navButton}
        onClick={() => onMonthChange(1)}
        aria-label="Go To Next month"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

interface WeekdayProps {
  format?: "short" | "long"
}

export const Weekday = ({ format = "short" }: WeekdayProps) => {
  const { weekStart, locale } = useCalendarContext(contextScopeName)
  const styles = recipe()

  return (
    <div className={styles.weekday}>
      {getWeekdays(weekStart, locale, format).map((day, index) => (
        <div key={index}>{day}</div>
      ))}
    </div>
  )
}

export const Days = () => {
  const { value } = useCalendarContext(contextScopeName)
  const styles = recipe()

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
    <div className={styles.daysGrid}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.weekRow}>
          {week.map((day, dayIndex) => {
            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                className={styles.dayCell}
              >
                {day.day}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function getWeekdays(
  weekStart: 0 | 1,
  locale: Intl.LocalesArgument,
  format: Intl.DateTimeFormatOptions["weekday"] = "short",
): string[] {
  const dayIndices = [0, 1, 2, 3, 4, 5, 6]

  const orderedDayIndices = [
    ...dayIndices.slice(weekStart),
    ...dayIndices.slice(0, weekStart),
  ]

  return orderedDayIndices.map((dayIndex) => {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay() + dayIndex)

    return new Intl.DateTimeFormat(locale, { weekday: format }).format(date)
  })
}
