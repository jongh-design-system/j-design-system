"use client"

import { css, cx } from "@styled-system/css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Context, useControllableState } from "radix-ui/internal"
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useMemo,
} from "react"

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
export interface CalendarRootProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date) => void
  weekStart?: 0 | 1 // 0: 일요일, 1: 월요일
  locale?: Intl.LocalesArgument
}

export const Root = forwardRef<HTMLDivElement, CalendarRootProps>(
  (
    {
      className,
      children,
      date,
      defaultDate,
      onDateChange,
      weekStart = 0,
      locale = "en-US",
      ...props
    },
    ref,
  ) => {
    const [dateValue = new Date(), setDateValue] = useControllableState({
      prop: date,
      defaultProp: defaultDate,
      onChange: onDateChange,
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

    const styles = recipe.raw()
    return (
      <CalendarProvider
        value={dateFormat}
        onChange={setDateValue}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        weekStart={weekStart}
        locale={locale}
      >
        <div ref={ref} className={cx(css(styles.root), className)} {...props}>
          {children}
        </div>
      </CalendarProvider>
    )
  },
)

interface HeaderProps {
  month?: Intl.DateTimeFormatOptions["month"]
  year?: Intl.DateTimeFormatOptions["year"]
  render?: (date: Date, locale: Intl.LocalesArgument) => string
  className?: string
}

export const Header = ({
  className,
  month = "long",
  year = "numeric",
  render,
}: HeaderProps) => {
  const { value, onMonthChange, locale } = useCalendarContext(contextScopeName)
  const styles = recipe.raw()

  const monthAndYear = new Intl.DateTimeFormat(locale, {
    month: month,
    year: year,
  }).format(new Date(value.year, value.month - 1))

  return (
    <div className={cx(css(styles.header), className)}>
      <button
        className={cx(css(styles.navButton))}
        onClick={() => onMonthChange(-1)}
        aria-label="Go To Previous month"
      >
        <ChevronLeft />
      </button>
      <div className={cx(css(styles.title))}>
        {render
          ? render(new Date(value.year, value.month - 1), locale)
          : `${monthAndYear}`}
      </div>
      <button
        className={cx(css(styles.navButton))}
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
  className?: string
}

export const Weekday = ({ className, format = "short" }: WeekdayProps) => {
  const { weekStart, locale } = useCalendarContext(contextScopeName)
  const styles = recipe.raw()

  return (
    <div className={cx(css(styles.weekday), className)}>
      {getWeekdays(weekStart, locale, format).map((day, index) => (
        <div key={index} className={cx(css(styles.weekday))}>
          {day}
        </div>
      ))}
    </div>
  )
}

interface DaysProps {
  showOutsideDays?: boolean
  className?: string
}

interface DayButtonProps {
  day: number
  month: number
  year: number
  isHidden: boolean
  isOutsideMonth: boolean
  className?: string
}

const DayButton = ({
  className,
  day,
  month,
  year,
  isHidden,
  isOutsideMonth,
}: DayButtonProps) => {
  const styles = recipe.raw()

  return (
    <button
      className={cx(css(styles.dayCell), className)}
      data-day={day}
      data-month={month}
      data-year={year}
      data-hidden={isHidden}
      data-outside-month={isOutsideMonth}
      aria-hidden={isHidden}
    >
      {!isHidden && day}
    </button>
  )
}

export const Days = ({ className, showOutsideDays = true }: DaysProps) => {
  const { value } = useCalendarContext(contextScopeName)
  const styles = recipe.raw()

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
    <table className={cx(css(styles.daysGrid), className)}>
      <tbody>
        {weeks.map((week, weekIndex) => (
          <tr key={weekIndex} className={cx(css(styles.weekRow))}>
            {week.map((day, dayIndex) => {
              const isHidden = !showOutsideDays && !day.isCurrentMonth
              const month = day.isCurrentMonth
                ? value.month
                : weekIndex === 0
                  ? value.month - 1
                  : value.month + 1

              return (
                <td
                  key={`${weekIndex}-${dayIndex}`}
                  className={cx(css(styles.daysGrid))}
                >
                  <DayButton
                    day={day.day}
                    month={month}
                    year={value.year}
                    isHidden={isHidden}
                    isOutsideMonth={!day.isCurrentMonth}
                  />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
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
