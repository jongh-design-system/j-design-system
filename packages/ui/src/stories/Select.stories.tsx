import type { Meta, StoryObj } from "@storybook/react"

import { Select } from "../components/Select"
import { css } from "@styled-system/css"

export default {
  title: "Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Primary: Story = {
  render: () => {
    return (
      <Select>
        <Select.Trigger placeholder="Select a language" />
        <Select.Portal>
          <ul
            className={css({
              bgColor: "red_300",
              overflow: "auto",
              boxSizing: "border-box",
            })}
          >
            <Select.Item value="javascript">JavaScript</Select.Item>
            <Select.Item value="python">Python</Select.Item>
            <Select.Item value="java">Java</Select.Item>
            <Select.Item value="typescript">TypeScript</Select.Item>
          </ul>
        </Select.Portal>
      </Select>
    )
  },
}
