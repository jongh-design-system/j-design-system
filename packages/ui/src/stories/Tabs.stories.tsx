import type { Meta, StoryObj } from "@storybook/react"
import { Tabs } from "../components/Tabs"

const meta = {
  title: "Tab",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      description: "제어 컴포넌트로 사용하고 싶을 경우 사용",
      control: { type: "select" },
      options: ["1", "2", "3"],
    },
    defaultValue: {
      description:
        "초기 렌더링 시 기본으로 활성화된 value, 비제어 컴포넌트로 사용하고 싶을 경우 사용",
      control: { type: "select" },
      options: ["1", "2", "3"],
    },
    onSelect: {
      description:
        "탭 선택 시 호출되는 콜백 함수, 제어 컴포넌트 일 경우 selected와 함께 필수로 사용",
      action: "selected",
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: "3",
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          <Tabs.Item value="2">Tab 2</Tabs.Item>
          <Tabs.Item value="3">Tab 3</Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="1">1번</Tabs.Content>
        <Tabs.Content value="2">2번</Tabs.Content>
        <Tabs.Content value="3">3번</Tabs.Content>
      </Tabs>
    )
  },
}

// 제어 컴포넌트 예시
export const Controlled: Story = {
  args: {
    selected: "1",
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          <Tabs.Item value="2">Tab 2</Tabs.Item>
          <Tabs.Item value="3">Tab 3</Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="1">1번</Tabs.Content>
        <Tabs.Content value="2">2번</Tabs.Content>
        <Tabs.Content value="3">3번</Tabs.Content>
      </Tabs>
    )
  },
}
