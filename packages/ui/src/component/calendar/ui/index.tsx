"use client"

import { cn } from "@utils/cn"
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

  onMonthChange: (amount: number) => void
  onYearChange: (amount: number) => void
  selectedValue: Array<Date | null>
  handleDayClick: (date: Date) => void
}

const contextScopeName = "calendar"

const [CalendarProvider, useCalendarContext] =
  Context.createContext<CalendarContextType>(contextScopeName)

type RangeDate = Array<Date | null>

interface CalendarBaseProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode
  weekStart?: 0 | 1
  locale?: Intl.LocalesArgument
}

interface CalendarViewProps {
  viewDate?: Date
  defaultViewDate?: Date
  onViewDateChange?: (date: Date) => void
}

export interface CalendarRootProps
  extends CalendarBaseProps,
    CalendarViewProps {
  type: "single"

  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date) => void
}

export interface CalendarRangeProps
  extends CalendarBaseProps,
    CalendarViewProps {
  type: "range"
  range?: RangeDate
  defaultRange?: RangeDate
  onRangeChange?: (range: RangeDate | undefined) => void
}

export const Root = (props: CalendarRootProps | CalendarRangeProps) => {
  const { type = "single", ...rest } = props
  const singleProps = rest as CalendarRootProps
  const rangeProps = rest as CalendarRangeProps
  if (type === "single") {
    return <SingleCalendar {...singleProps} type="single" />
  } else {
    return <RangeCalendar {...rangeProps} type="range" />
  }
}

export const RangeCalendar = forwardRef<HTMLDivElement, CalendarRangeProps>(
  (
    {
      className,
      children,
      range,
      defaultRange,
      onRangeChange,
      viewDate,
      defaultViewDate,
      onViewDateChange,
      weekStart = 0,
      locale = "en-US",
      ...props
    },
    ref,
  ) => {
    const [rangeValue = [], setRangeValue] = useControllableState<RangeDate>({
      prop: range,
      defaultProp: defaultRange,
      onChange: onRangeChange,
    })

    const [viewDateValue = new Date(), setViewDateValue] = useControllableState(
      {
        prop: viewDate,
        defaultProp: defaultViewDate,
        onChange: onViewDateChange,
      },
    )

    const onMonthChange = useCallback(
      (amount: number) => {
        const newDate = new Date(viewDateValue)
        newDate.setMonth(newDate.getMonth() + amount)
        setViewDateValue(newDate)
      },
      [viewDateValue, setViewDateValue],
    )

    const onYearChange = useCallback(
      (amount: number) => {
        const newDate = new Date(viewDateValue)
        newDate.setFullYear(newDate.getFullYear() + amount)
        setViewDateValue(newDate)
      },
      [viewDateValue, setViewDateValue],
    )

    const dateFormat = useMemo(() => {
      const currentDate = new Date(viewDateValue)
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
        startWeek: (firstDay.getDay() - weekStart + 7) % 7,
        daysInPrevMonth: prevMonthLastDay.getDate(),
        nextMonthStartWeek: (nextMonthFirstDay.getDay() - weekStart + 7) % 7,
      }
    }, [viewDateValue, weekStart])

    const handleDayClick = useCallback(
      (clickedDate: Date) => {
        const normalizedClickedDate = new Date(clickedDate)
        normalizedClickedDate.setHours(0, 0, 0, 0)
        setRangeValue((prevRange) => {
          const [start, end] = prevRange || [null, null]

          const normalizedStart = start ? new Date(start) : null
          if (normalizedStart) normalizedStart.setHours(0, 0, 0, 0)

          if (!normalizedStart) {
            return [clickedDate, null]
          }

          if (normalizedStart && !end) {
            if (normalizedClickedDate < normalizedStart) {
              return [clickedDate, null]
            } else {
              return [start, clickedDate]
            }
          }

          if (normalizedStart && end) {
            return [clickedDate, null]
          }
        })
      },
      [setRangeValue],
    )

    return (
      <div ref={ref}>
        <CalendarProvider
          value={dateFormat}
          weekStart={weekStart}
          locale={locale}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          selectedValue={rangeValue}
          handleDayClick={handleDayClick}
          {...props}
        >
          {children}
        </CalendarProvider>
      </div>
    )
  },
)

export const SingleCalendar = forwardRef<HTMLDivElement, CalendarRootProps>(
  (
    {
      className,
      children,
      date,
      defaultDate,
      onDateChange,
      viewDate,
      defaultViewDate,
      onViewDateChange,
      weekStart = 0,
      locale = "en-US",
      ...props
    },
    ref,
  ) => {
    const [dateValue = new Date(), setDateValue] = useControllableState({
      prop: viewDate,
      defaultProp: defaultViewDate,
      onChange: onViewDateChange,
    })

    const [selectedValue = null, setSelectedValue] = useControllableState({
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
        startWeek: (firstDay.getDay() - weekStart + 7) % 7,
        daysInPrevMonth: prevMonthLastDay.getDate(),
        nextMonthStartWeek: (nextMonthFirstDay.getDay() - weekStart + 7) % 7,
      }
    }, [dateValue, weekStart])

    const styles = recipe()
    return (
      <CalendarProvider
        value={dateFormat}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        weekStart={weekStart}
        locale={locale}
        selectedValue={selectedValue ? [selectedValue] : []}
        handleDayClick={(clickedDate: Date) => setSelectedValue(clickedDate)}
      >
        <div ref={ref} className={cn(styles.root(), className)} {...props}>
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
  const styles = recipe()

  const monthAndYear = new Intl.DateTimeFormat(locale, {
    month: month,
    year: year,
  }).format(new Date(value.year, value.month - 1))

  return (
    <div className={cn(styles.header(), className)}>
      <button
        className={styles.navButton()}
        onClick={() => onMonthChange(-1)}
        aria-label="Go To Previous month"
      >
        <ChevronLeft />
      </button>
      <div className={styles.title()}>
        {render
          ? render(new Date(value.year, value.month - 1), locale)
          : `${monthAndYear}`}
      </div>
      <button
        className={styles.navButton()}
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
  const styles = recipe()

  return (
    <div className={cn(styles.weekday(), className)}>
      {getWeekdays(weekStart, locale, format).map((day, index) => (
        <div key={index} className={styles.weekday()}>
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

interface DayButtonProps extends ComponentPropsWithoutRef<"button"> {
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
  ...props
}: DayButtonProps) => {
  const styles = recipe()

  return (
    <button
      className={cn(styles.dayCell(), className)}
      data-day={day}
      data-month={month}
      data-year={year}
      data-hidden={isHidden}
      data-outside-month={isOutsideMonth}
      aria-hidden={isHidden}
      {...props}
    >
      {!isHidden && day}
    </button>
  )
}

export const Days = ({ className, showOutsideDays = true }: DaysProps) => {
  const { value, handleDayClick } = useCalendarContext(contextScopeName)
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
    <table className={cn(styles.daysGrid(), className)}>
      <tbody>
        {weeks.map((week, weekIndex) => (
          <tr key={weekIndex} className={styles.weekRow()}>
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
                  className={styles.daysGrid()}
                >
                  <DayButton
                    day={day.day}
                    month={month}
                    year={value.year}
                    isHidden={isHidden}
                    isOutsideMonth={!day.isCurrentMonth}
                    onClick={() =>
                      handleDayClick(new Date(value.year, month - 1, day.day))
                    }
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
