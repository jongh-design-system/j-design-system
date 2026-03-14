import type { Meta, StoryObj } from "@storybook/react-vite"
import type { CSSProperties } from "react"
import { useState } from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  type CalendarDay,
  useCalendarState,
} from "../component/calendar/useCalendarState"

const meta = {
  title: "Base/Calendar",
  tags: ["autodocs"],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const SingleSelectionAndNavigation: Story = {
  render: () => <SingleSelectionHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByTestId("month-label")).toHaveTextContent(
      "March 2026",
    )

    await userEvent.click(canvas.getByRole("button", { name: "Next month" }))

    await expect(canvas.getByTestId("month-label")).toHaveTextContent(
      "April 2026",
    )

    const targetDay = canvas.getByRole("button", { name: "2026-04-10" })
    await userEvent.click(targetDay)

    await expect(canvas.getByTestId("selection-value")).toHaveTextContent(
      "2026-04-10",
    )
    await expect(targetDay).toHaveAttribute("data-selected", "true")
  },
}

export const RangeSelectionFlow: Story = {
  render: () => <RangeSelectionHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole("button", { name: "2026-03-10" }))
    await userEvent.click(canvas.getByRole("button", { name: "2026-03-15" }))

    await expect(canvas.getByTestId("selection-value")).toHaveTextContent(
      "2026-03-10 -> 2026-03-15",
    )
    await expect(
      canvas.getByRole("button", { name: "2026-03-12" }),
    ).toHaveAttribute("data-in-range", "true")

    await userEvent.click(canvas.getByRole("button", { name: "2026-03-08" }))

    await expect(canvas.getByTestId("selection-value")).toHaveTextContent(
      "2026-03-08 -> -",
    )
  },
}

export const ControlledMultipleAndDisabledDates: Story = {
  render: () => <ControlledMultipleHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const disabledWeekend = canvas.getByRole("button", { name: "2026-03-07" })
    await expect(disabledWeekend).toBeDisabled()

    await userEvent.click(canvas.getByRole("button", { name: "2026-03-04" }))
    await expect(canvas.getByTestId("selection-value")).toHaveTextContent(
      "2026-03-03, 2026-03-04",
    )

    await userEvent.click(canvas.getByRole("button", { name: "2026-03-03" }))
    await expect(canvas.getByTestId("selection-value")).toHaveTextContent(
      "2026-03-04",
    )
  },
}

function SingleSelectionHarness() {
  const calendar = useCalendarState({
    selectionMode: "single",
    defaultViewDate: new Date(2026, 2, 14),
    weekStart: 1,
    locale: "en-US",
  })

  return (
    <CalendarTestHarness
      calendar={calendar}
      selectionText={formatSelectionValue(calendar.value)}
    />
  )
}

function RangeSelectionHarness() {
  const calendar = useCalendarState({
    selectionMode: "range",
    defaultViewDate: new Date(2026, 2, 1),
    defaultValue: { start: null, end: null },
    weekStart: 0,
    locale: "en-US",
  })

  return (
    <CalendarTestHarness
      calendar={calendar}
      selectionText={formatSelectionValue(calendar.value)}
    />
  )
}

function ControlledMultipleHarness() {
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1))
  const [value, setValue] = useState<Date[]>([new Date(2026, 2, 3)])

  const calendar = useCalendarState({
    selectionMode: "multiple",
    viewDate,
    onViewDateChange: setViewDate,
    value,
    onValueChange: setValue,
    fixedWeeks: true,
    weekStart: 1,
    locale: "en-US",
    isDateDisabled: (date) => date.getDay() === 0 || date.getDay() === 6,
  })

  return (
    <CalendarTestHarness
      calendar={calendar}
      selectionText={formatSelectionValue(calendar.value)}
    />
  )
}

interface CalendarHarnessProps {
  calendar: {
    current: Date
    weekdays: string[]
    days: CalendarDay[]
    navigate: {
      month: (offset: number) => void
    }
    select: {
      date: (date: Date) => void
    }
  }
  selectionText: string
}

function CalendarTestHarness({
  calendar,
  selectionText,
}: CalendarHarnessProps) {
  return (
    <div style={rootStyle}>
      <div style={toolbarStyle}>
        <button type="button" onClick={() => calendar.navigate.month(-1)}>
          Previous month
        </button>
        <div data-testid="month-label">
          {formatMonthLabel(calendar.current)}
        </div>
        <button type="button" onClick={() => calendar.navigate.month(1)}>
          Next month
        </button>
      </div>

      <div data-testid="selection-value">selected: {selectionText}</div>

      <div style={weekdaysStyle}>
        {calendar.weekdays.map((weekday, index) => (
          <div key={`${weekday}-${index}`}>{weekday}</div>
        ))}
      </div>

      <div style={gridStyle}>
        {calendar.days.map((day) => (
          <button
            key={toIsoDate(day.date)}
            type="button"
            aria-label={toIsoDate(day.date)}
            disabled={day.isDisabled || day.isHidden}
            data-selected={String(day.isSelected)}
            data-in-range={String(day.isInSelection)}
            data-outside={String(day.isOutsideMonth)}
            onClick={() => calendar.select.date(day.date)}
            style={getDayStyle(day)}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  )
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date)
}

function formatSelectionValue(value: unknown) {
  if (value instanceof Date) {
    return toIsoDate(value)
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "none"

    return value
      .filter((entry): entry is Date => entry instanceof Date)
      .map(toIsoDate)
      .join(", ")
  }

  if (isRangeValue(value)) {
    const start = value.start ? toIsoDate(value.start) : "-"
    const end = value.end ? toIsoDate(value.end) : "-"

    return `${start} -> ${end}`
  }

  return "none"
}

function isRangeValue(
  value: unknown,
): value is { start: Date | null; end: Date | null } {
  return (
    typeof value === "object" &&
    value !== null &&
    "start" in value &&
    "end" in value &&
    (value.start === null || value.start instanceof Date) &&
    (value.end === null || value.end instanceof Date)
  )
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function getDayStyle(day: CalendarDay): CSSProperties {
  return {
    width: "40px",
    height: "40px",
    border: "1px solid #d0d7de",
    backgroundColor: day.isSelected
      ? "#2563eb"
      : day.isInSelection
        ? "#dbeafe"
        : "#ffffff",
    color: day.isSelected
      ? "#ffffff"
      : day.isOutsideMonth
        ? "#94a3b8"
        : "#111827",
    opacity: day.isDisabled ? 0.4 : 1,
    cursor: day.isDisabled ? "not-allowed" : "pointer",
    padding: 0,
  }
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "max-content",
  padding: "16px",
}

const toolbarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
}

const weekdaysStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 40px)",
  gap: "4px",
  textAlign: "center",
  fontSize: "12px",
}

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 40px)",
  gap: "4px",
}
