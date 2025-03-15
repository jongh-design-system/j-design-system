import type { Meta, StoryObj } from "@storybook/react"

import { Calendar, Days, Header } from "../component/calendar/ui"

const meta = {
  title: "Calendar",
  tags: ["autodocs"],
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    weekStart: 0,
  },
  render: (args) => {
    return (
      <Calendar {...args}>
        <Header />
        <Days />
      </Calendar>
    )
  },
}
