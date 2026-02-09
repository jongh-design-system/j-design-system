import type { Meta, StoryObj } from "@storybook/react-vite"

import * as Calendar from "../component/calendar/ui"

const meta = {
  title: "Base/Calendar",
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    return (
      <Calendar.Root
        {...args}
        type="range"
        weekStart={1}
        locale="en-US"
        className="p-10"
      >
        <Calendar.Header month="long" year="numeric" />
        <Calendar.Weekday />
        <Calendar.Days />
      </Calendar.Root>
    )
  },
}
