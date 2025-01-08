import type { Meta, StoryObj } from "@storybook/react"

import * as Select from "../component/Select"

export default {
  title: "Select",
  tags: ["autodocs"],
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

const arr = Array.from({ length: 100 }, (_, i) => i)

export const Primary: Story = {
  render: () => {
    return (
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit" />
        </Select.Trigger>

        <Select.Content position="popper" data-position="popper">
          <Select.Viewport overflow="auto" maxH="12">
            <Select.Group data-position="popper" color="red" overflow="visible">
              {arr.map((num) => (
                <Select.Item key={num} value={num.toString()}>
                  {num}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    )
  },
}
