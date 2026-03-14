import { useCallback, useMemo } from "react"

import { useControlledState } from "../../hooks/useControllableState"

export type CalendarWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type CalendarSelectionMode = "none" | "single" | "range" | "multiple"

export interface CalendarRangeValue {
  start: Date | null
  end: Date | null
}

export type CalendarValueByMode = {
  none: null
  single: Date | null
  range: CalendarRangeValue
  multiple: Date[]
}

export interface UseCalendarStateOptions<
  M extends CalendarSelectionMode = "single",
> {
  locale?: Intl.LocalesArgument
  weekStart?: CalendarWeekStart
  fixedWeeks?: boolean
  showOutsideDays?: boolean
  weekdayFormat?: Intl.DateTimeFormatOptions["weekday"]
  selectionMode?: M

  viewDate?: Date
  defaultViewDate?: Date
  onViewDateChange?: (date: Date) => void

  value?: CalendarValueByMode[M]
  defaultValue?: CalendarValueByMode[M]
  onValueChange?: (value: CalendarValueByMode[M]) => void

  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean
}

export interface CalendarDay {
  date: Date
  label: string
  year: number
  monthIndex: number
  day: number
  weekday: number
  weekIndex: number
  dayIndex: number
  isToday: boolean
  isCurrentMonth: boolean
  isOutsideMonth: boolean
  isHidden: boolean
  isDisabled: boolean
  isSelected: boolean
  isSelectionStart: boolean
  isSelectionEnd: boolean
  isInSelection: boolean
}

export interface CalendarWeek {
  index: number
  days: CalendarDay[]
}

export interface CalendarNavigateApi {
  day: (offset: number) => void
  week: (offset: number) => void
  month: (offset: number) => void
  year: (offset: number) => void
  to: (date: Date) => void
  today: () => void
}

export interface CalendarSelectApi<M extends CalendarSelectionMode> {
  date: (date: Date) => void
  today: () => void
  clear: () => void
  set: (value: CalendarValueByMode[M]) => void
}

export interface CalendarQueryApi {
  isToday: (date: Date) => boolean
  isCurrentMonth: (date: Date) => boolean
  isOutsideMonth: (date: Date) => boolean
  isDisabled: (date: Date) => boolean
  isSelected: (date: Date) => boolean
  isInSelection: (date: Date) => boolean
  isSelectionStart: (date: Date) => boolean
  isSelectionEnd: (date: Date) => boolean
}

export interface UseCalendarStateReturn<
  M extends CalendarSelectionMode = "single",
> {
  current: Date
  today: Date
  year: number
  monthIndex: number
  day: number
  weekdays: string[]
  weeks: CalendarWeek[]
  days: CalendarDay[]
  value: CalendarValueByMode[M]
  selectionMode: M
  navigate: CalendarNavigateApi
  select: CalendarSelectApi<M>
  query: CalendarQueryApi
  getDay: (date: Date) => CalendarDay
}

export function useCalendarState<M extends CalendarSelectionMode = "single">(
  options: UseCalendarStateOptions<M> = {} as UseCalendarStateOptions<M>,
): UseCalendarStateReturn<M> {
  const {
    locale = "en-US",
    weekStart = 0,
    fixedWeeks = false,
    showOutsideDays = true,
    weekdayFormat = "short",
    selectionMode: rawSelectionMode,
    viewDate,
    defaultViewDate,
    onViewDateChange,
    value: controlledValue,
    defaultValue,
    onValueChange,
    minDate,
    maxDate,
    isDateDisabled,
  } = options

  const selectionMode = (rawSelectionMode ?? "single") as M
  const emptyValue = useMemo(
    () => createEmptyValue(selectionMode) as CalendarValueByMode[M],
    [selectionMode],
  )

  const [viewState = new Date(), setViewState] = useControlledState<Date>({
    prop: viewDate,
    defaultProp: defaultViewDate,
    onChange: onViewDateChange,
  })

  const [selectedState, setSelectedState] = useControlledState<
    CalendarValueByMode[M]
  >({
    prop: controlledValue,
    defaultProp: defaultValue ?? emptyValue,
    onChange: onValueChange,
  })

  const today = useMemo(() => normalizeDate(new Date()), [])
  const current = useMemo(() => normalizeDate(viewState), [viewState])
  const min = useMemo(() => normalizeNullableDate(minDate), [minDate])
  const max = useMemo(() => normalizeNullableDate(maxDate), [maxDate])
  const value = useMemo(
    () =>
      normalizeCalendarValue(
        (selectedState ?? emptyValue) as CalendarValueByMode[M],
        selectionMode,
      ),
    [emptyValue, selectedState, selectionMode],
  )

  const isDisabled = useCallback(
    (date: Date) => {
      const normalizedDate = normalizeDate(date)

      if (min && normalizedDate < min) return true
      if (max && normalizedDate > max) return true
      if (isDateDisabled?.(normalizedDate)) return true

      return false
    },
    [isDateDisabled, max, min],
  )

  const setValue = useCallback(
    (
      nextValue:
        | CalendarValueByMode[M]
        | ((prev: CalendarValueByMode[M]) => CalendarValueByMode[M]),
    ) => {
      setSelectedState((prev) => {
        const previous = normalizeCalendarValue(
          (prev ?? emptyValue) as CalendarValueByMode[M],
          selectionMode,
        )
        const resolved =
          typeof nextValue === "function"
            ? (
                nextValue as (
                  prev: CalendarValueByMode[M],
                ) => CalendarValueByMode[M]
              )(previous)
            : nextValue

        return normalizeCalendarValue(resolved, selectionMode)
      })
    },
    [emptyValue, selectionMode, setSelectedState],
  )

  const navigate = useMemo<CalendarNavigateApi>(
    () => ({
      day: (offset) =>
        setViewState((prev) => addDays(normalizeDate(prev ?? current), offset)),
      week: (offset) =>
        setViewState((prev) =>
          addDays(normalizeDate(prev ?? current), offset * 7),
        ),
      month: (offset) =>
        setViewState((prev) =>
          addMonthsClamped(normalizeDate(prev ?? current), offset),
        ),
      year: (offset) =>
        setViewState((prev) =>
          addYearsClamped(normalizeDate(prev ?? current), offset),
        ),
      to: (date) => setViewState(normalizeDate(date)),
      today: () => setViewState(today),
    }),
    [current, setViewState, today],
  )

  const selectDate = useCallback(
    (date: Date) => {
      const nextDate = normalizeDate(date)

      if (isDisabled(nextDate)) return

      if (selectionMode === "none") return

      if (selectionMode === "single") {
        setValue(nextDate as CalendarValueByMode[M])
        return
      }

      if (selectionMode === "multiple") {
        setValue((prev) => {
          const previousDates = asDateArray(prev)
          const exists = previousDates.some((entry) =>
            isSameDay(entry, nextDate),
          )

          if (exists) {
            return previousDates.filter(
              (entry) => !isSameDay(entry, nextDate),
            ) as CalendarValueByMode[M]
          }

          return [...previousDates, nextDate] as CalendarValueByMode[M]
        })
        return
      }

      setValue((prev) => {
        const previousRange = asRangeValue(prev)

        if (!previousRange.start) {
          return {
            start: nextDate,
            end: null,
          } as CalendarValueByMode[M]
        }

        if (previousRange.start && !previousRange.end) {
          if (nextDate < previousRange.start) {
            return {
              start: nextDate,
              end: null,
            } as CalendarValueByMode[M]
          }

          return {
            start: previousRange.start,
            end: nextDate,
          } as CalendarValueByMode[M]
        }

        return {
          start: nextDate,
          end: null,
        } as CalendarValueByMode[M]
      })
    },
    [isDisabled, selectionMode, setValue],
  )

  const select = useMemo<CalendarSelectApi<M>>(
    () => ({
      date: selectDate,
      today: () => selectDate(today),
      clear: () => setValue(emptyValue),
      set: (nextValue) => setValue(nextValue),
    }),
    [emptyValue, selectDate, setValue, today],
  )

  const query = useMemo<CalendarQueryApi>(() => {
    const isCurrentMonth = (date: Date) => {
      const normalizedDate = normalizeDate(date)
      return (
        normalizedDate.getFullYear() === current.getFullYear() &&
        normalizedDate.getMonth() === current.getMonth()
      )
    }

    const isSelected = (date: Date) => {
      const normalizedDate = normalizeDate(date)

      if (selectionMode === "none") return false
      if (selectionMode === "single") {
        const selectedDate = asSingleValue(value)
        return selectedDate ? isSameDay(selectedDate, normalizedDate) : false
      }

      if (selectionMode === "multiple") {
        return asDateArray(value).some((entry) =>
          isSameDay(entry, normalizedDate),
        )
      }

      const rangeValue = asRangeValue(value)
      if (rangeValue.start && isSameDay(rangeValue.start, normalizedDate)) {
        return true
      }
      if (rangeValue.end && isSameDay(rangeValue.end, normalizedDate)) {
        return true
      }
      return false
    }

    const isInSelection = (date: Date) => {
      if (selectionMode !== "range") return false

      const normalizedDate = normalizeDate(date)
      const rangeValue = asRangeValue(value)

      if (!rangeValue.start || !rangeValue.end) return false

      return (
        normalizedDate >= rangeValue.start && normalizedDate <= rangeValue.end
      )
    }

    const isSelectionStart = (date: Date) => {
      if (selectionMode !== "range") return false

      const rangeValue = asRangeValue(value)
      return rangeValue.start ? isSameDay(rangeValue.start, date) : false
    }

    const isSelectionEnd = (date: Date) => {
      if (selectionMode !== "range") return false

      const rangeValue = asRangeValue(value)
      return rangeValue.end ? isSameDay(rangeValue.end, date) : false
    }

    return {
      isToday: (date) => isSameDay(date, today),
      isCurrentMonth,
      isOutsideMonth: (date) => !isCurrentMonth(date),
      isDisabled,
      isSelected,
      isInSelection,
      isSelectionStart,
      isSelectionEnd,
    }
  }, [current, isDisabled, selectionMode, today, value])

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: weekdayFormat,
    })
    const start = new Date(2024, 0, 7)

    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, (weekStart + index) % 7)
      return formatter.format(date)
    })
  }, [locale, weekStart, weekdayFormat])

  const getDay = useCallback(
    (date: Date): CalendarDay => {
      const normalizedDate = normalizeDate(date)

      return {
        date: normalizedDate,
        label: formatDateLabel(normalizedDate, locale),
        year: normalizedDate.getFullYear(),
        monthIndex: normalizedDate.getMonth(),
        day: normalizedDate.getDate(),
        weekday: normalizedDate.getDay(),
        weekIndex: -1,
        dayIndex: -1,
        isToday: query.isToday(normalizedDate),
        isCurrentMonth: query.isCurrentMonth(normalizedDate),
        isOutsideMonth: query.isOutsideMonth(normalizedDate),
        isHidden: !showOutsideDays && query.isOutsideMonth(normalizedDate),
        isDisabled: query.isDisabled(normalizedDate),
        isSelected: query.isSelected(normalizedDate),
        isSelectionStart: query.isSelectionStart(normalizedDate),
        isSelectionEnd: query.isSelectionEnd(normalizedDate),
        isInSelection: query.isInSelection(normalizedDate),
      }
    },
    [locale, query, showOutsideDays],
  )

  const weeks = useMemo<CalendarWeek[]>(() => {
    const monthStart = startOfMonth(current)
    const monthEnd = endOfMonth(current)
    const gridStart = startOfWeek(monthStart, weekStart)
    const gridEnd = fixedWeeks
      ? addDays(gridStart, 41)
      : endOfWeek(monthEnd, weekStart)

    const totalDays = differenceInCalendarDays(gridStart, gridEnd) + 1
    const dayModels = Array.from({ length: totalDays }, (_, index) => {
      const date = addDays(gridStart, index)
      const day = getDay(date)

      return {
        ...day,
        weekIndex: Math.floor(index / 7),
        dayIndex: index % 7,
      }
    })

    return chunkDays(dayModels, 7).map((days, index) => ({
      index,
      days,
    }))
  }, [current, fixedWeeks, getDay, weekStart])

  const days = useMemo(() => weeks.flatMap((week) => week.days), [weeks])

  return {
    current,
    today,
    year: current.getFullYear(),
    monthIndex: current.getMonth(),
    day: current.getDate(),
    weekdays,
    weeks,
    days,
    value,
    selectionMode,
    navigate,
    select,
    query,
    getDay,
  }
}

function createEmptyValue<M extends CalendarSelectionMode>(
  selectionMode: M,
): CalendarValueByMode[M] {
  if (selectionMode === "range") {
    return { start: null, end: null } as CalendarValueByMode[M]
  }

  if (selectionMode === "multiple") {
    return [] as unknown as CalendarValueByMode[M]
  }

  return null as CalendarValueByMode[M]
}

function normalizeCalendarValue<M extends CalendarSelectionMode>(
  value: CalendarValueByMode[M],
  selectionMode: M,
): CalendarValueByMode[M] {
  if (selectionMode === "single") {
    return normalizeNullableDate(
      value as CalendarValueByMode["single"],
    ) as CalendarValueByMode[M]
  }

  if (selectionMode === "multiple") {
    return asDateArray(value).map(normalizeDate) as CalendarValueByMode[M]
  }

  if (selectionMode === "range") {
    const range = asRangeValue(value)
    return {
      start: normalizeNullableDate(range.start),
      end: normalizeNullableDate(range.end),
    } as CalendarValueByMode[M]
  }

  return null as CalendarValueByMode[M]
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function normalizeNullableDate(date?: Date | null): Date | null {
  return date ? normalizeDate(date) : null
}

function isSameDay(a: Date, b: Date): boolean {
  return normalizeDate(a).getTime() === normalizeDate(b).getTime()
}

function asSingleValue(value: unknown): Date | null {
  return value instanceof Date ? normalizeDate(value) : null
}

function asDateArray(value: unknown): Date[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is Date => entry instanceof Date)
    .map(normalizeDate)
}

function asRangeValue(value: unknown): CalendarRangeValue {
  if (
    typeof value === "object" &&
    value !== null &&
    "start" in value &&
    "end" in value
  ) {
    const range = value as CalendarRangeValue
    return {
      start: normalizeNullableDate(range.start),
      end: normalizeNullableDate(range.end),
    }
  }

  return {
    start: null,
    end: null,
  }
}

function addDays(date: Date, offset: number): Date {
  const nextDate = normalizeDate(date)
  nextDate.setDate(nextDate.getDate() + offset)
  return normalizeDate(nextDate)
}

function addMonthsClamped(date: Date, offset: number): Date {
  const source = normalizeDate(date)
  const target = new Date(source.getFullYear(), source.getMonth() + offset, 1)
  const day = Math.min(source.getDate(), getDaysInMonth(target))
  return new Date(target.getFullYear(), target.getMonth(), day)
}

function addYearsClamped(date: Date, offset: number): Date {
  const source = normalizeDate(date)
  const target = new Date(source.getFullYear() + offset, source.getMonth(), 1)
  const day = Math.min(source.getDate(), getDaysInMonth(target))
  return new Date(target.getFullYear(), target.getMonth(), day)
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function startOfWeek(date: Date, weekStart: CalendarWeekStart): Date {
  const normalizedDate = normalizeDate(date)
  const diff = (normalizedDate.getDay() - weekStart + 7) % 7
  return addDays(normalizedDate, -diff)
}

function endOfWeek(date: Date, weekStart: CalendarWeekStart): Date {
  return addDays(startOfWeek(date, weekStart), 6)
}

function differenceInCalendarDays(start: Date, end: Date): number {
  const startTime = normalizeDate(start).getTime()
  const endTime = normalizeDate(end).getTime()
  return Math.round((endTime - startTime) / 86400000)
}

function formatDateLabel(date: Date, locale: Intl.LocalesArgument): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

function chunkDays(days: CalendarDay[], size: number): CalendarDay[][] {
  const chunks: CalendarDay[][] = []

  for (let index = 0; index < days.length; index += size) {
    chunks.push(days.slice(index, index + size))
  }

  return chunks
}
