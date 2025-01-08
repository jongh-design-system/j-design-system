import type { Meta, StoryObj } from "@storybook/react"

import * as Tabs from "../component/Tabs"
import { useState } from "@storybook/preview-api"

const meta = {
  title: "Tabs",
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { value: "1", label: "Tab 1", content: "1번" },
  { value: "2", label: "Tab 2", content: "2번" },
  { value: "3", label: "Tab 3", content: "3번" },
]

export const Primary: Story = {
  render: (args) => {
    return (
      <Tabs.Root {...args}>
        <Tabs.List width="11">
          {data.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {data.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    )
  },
}

// 제어 컴포넌트 예시
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("2")
    return (
      <Tabs.Root value={value} onValueChange={setValue} {...args}>
        <Tabs.List>
          <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="1">1번</Tabs.Content>
        <Tabs.Content value="2">2번</Tabs.Content>
        <Tabs.Content value="3">3번</Tabs.Content>
      </Tabs.Root>
    )
  },
}
