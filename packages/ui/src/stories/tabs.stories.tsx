import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { expect, userEvent, within } from "storybook/test"

import * as Tabs from "@/component/tabs"

const meta = {
  title: "Base/Tabs",
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
        <Tabs.List>
          {data.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        {data.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 초기 렌더링 테스트
    expect(canvas.getByText("Tab 1")).toBeDefined()

    // 클릭 테스트
    const user = userEvent.setup()
    await user.click(canvas.getByText("Tab 2"))
    expect(canvas.getByText("2번")).toBeDefined()

    // 키보드 테스트
    await user.click(canvas.getByText("Tab 2"))
    await user.keyboard("{ArrowLeft}")
    expect(document.activeElement).toBe(canvas.getByText("Tab 1"))
  },
}

// 제어 컴포넌트 예시
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("2")
    return (
      <Tabs.Root value={value} onValueChange={setValue} {...args}>
        <Tabs.List>
          {data.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
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
