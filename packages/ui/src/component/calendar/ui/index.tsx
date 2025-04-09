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
  viewDate?: Date // 제어: 현재 보여지는 월/년 기준 날짜
  defaultViewDate?: Date // 비제어: 초기 보여지는 월/년 기준 날짜
  onViewDateChange?: (date: Date) => void // viewDate 변경 시 콜백
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
  type: "range" // 구별자
  range?: RangeDate // 제어: 선택된 날짜 범위
  defaultRange?: RangeDate // 비제어: 초기 선택된 날짜 범위
  onRangeChange?: (range: RangeDate | undefined) => void // range 변경 시 콜백
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
        // 시간을 0으로 설정하여 날짜만 비교 (정확한 비교 위함)
        const normalizedClickedDate = new Date(clickedDate)
        normalizedClickedDate.setHours(0, 0, 0, 0)

        // 현재 상태(prevRange)를 받아 다음 상태를 반환하는 함수형 업데이트 사용
        setRangeValue((prevRange) => {
          if (!prevRange) {
            return prevRange
          }
          const [start, end] = prevRange

          // 시작 날짜의 시간도 0으로 설정 (비교를 위해)
          const normalizedStart = start ? new Date(start) : null
          if (normalizedStart) normalizedStart.setHours(0, 0, 0, 0)

          // 1. 시작 날짜가 없는 경우: 클릭한 날짜를 새 시작 날짜로 설정
          if (!normalizedStart) {
            return [clickedDate, null] // 원본 Date 객체 저장
          }

          // 2. 시작 날짜만 있고 종료 날짜는 없는 경우:
          if (normalizedStart && !end) {
            // 클릭한 날짜가 시작 날짜보다 이전이면 -> 클릭한 날짜를 새 시작 날짜로 설정 (범위 리셋)
            if (normalizedClickedDate < normalizedStart) {
              return [clickedDate, null]
            }
            // 클릭한 날짜가 시작 날짜와 같거나 이후면 -> 클릭한 날짜를 종료 날짜로 설정
            else {
              // 시작 날짜와 동일한 날짜를 클릭하면 종료 날짜도 시작 날짜와 동일하게 설정할지,
              // 아니면 아무것도 안할지 정책 결정 필요 (여기선 종료로 설정)
              return [start, clickedDate] // 원본 Date 객체 저장
            }
          }

          // 3. 시작 날짜와 종료 날짜가 모두 있는 경우: 클릭한 날짜를 새 시작 날짜로 설정 (범위 리셋)
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
    }) //화면에 보여지는 날짜

    const [selectedValue = null, setSelectedValue] = useControllableState({
      prop: date,
      defaultProp: defaultViewDate,
      onChange: onViewDateChange,
    }) //선택된 값 - single은 1개임

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

    const styles = recipe.raw()
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
