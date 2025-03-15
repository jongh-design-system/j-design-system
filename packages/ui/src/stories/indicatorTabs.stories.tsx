import type { Meta, StoryObj } from "@storybook/react"

import * as IndicatorTabs from "../component/indicatorTabs/ui"

const meta = {
  title: "IndicatorTabs",
  tags: ["autodocs"],
} satisfies Meta<typeof IndicatorTabs>

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
      <IndicatorTabs.Root {...args}>
        <IndicatorTabs.List>
          {data.map((item) => (
            <IndicatorTabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </IndicatorTabs.Trigger>
          ))}
          <IndicatorTabs.Indicator />
        </IndicatorTabs.List>
        {data.map((item) => (
          <IndicatorTabs.Content key={item.value} value={item.value}>
            {item.content}
          </IndicatorTabs.Content>
        ))}
      </IndicatorTabs.Root>
    )
  },
}
