import type { Meta, StoryObj } from "@storybook/react"
import { css } from "@styled-system/css"

import * as Calendar from "../component/calendar/ui"

const meta = {
  title: "Calendar",
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    return (
      <Calendar.Root
        {...args}
        weekStart={1}
        locale="en-US"
        className={css({
          p: "10",
        })}
      >
        <Calendar.Header month="long" year="numeric" />
        <Calendar.Weekday />
        <Calendar.Days />
      </Calendar.Root>
    )
  },
}
