import type { Meta, StoryObj } from "@storybook/react"

import * as Select from "../component/select/ui"

export default {
  title: "Select",
  tags: ["autodocs"],
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

const arr = Array.from({ length: 100 }, (_, i) => i)
//부모 요소의 width 고정값 or Trigger의 width 고정값 필요
export const Primary: Story = {
  render: () => {
    return (
      <div style={{ width: "300px" }}>
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select a frui" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {arr.map((num) => (
                <Select.Item key={num} value={num.toString()}>
                  {num}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    )
  },
}
