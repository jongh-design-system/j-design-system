import { useState } from "react"
import { Tab, TabList, TabItem, TabContent } from "../components/Tab/index"
import type { Meta, StoryObj } from "@storybook/react"
import { cx } from "@styled-system/css"
import { tab } from "@styled-system/recipes"
import { TabIndicator } from "../components/Tab/TabIndicator"
export default {
  title: "Tab",
  component: Tab,
  tags: ["autodocs"],
} satisfies Meta<typeof Tab>

type Story = StoryObj<typeof Tab>

export const Primary: Story = {
  args: {
    children: (
      <>
        <TabList>
          <TabIndicator />
          <TabItem value="1">
            <div>1</div>
          </TabItem>
          <TabItem value="2">2</TabItem>
        </TabList>
        <TabContent value="1">
          <div>1의 내용</div>
        </TabContent>
        <TabContent value="2">
          <div>2의 내용</div>
        </TabContent>
      </>
    ),
  },
}

export const Controlled: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState("2")

    return (
      <>
        <Tab
          selected={selectedItems}
          onSelect={(value) => setSelectedItems(value)}
        >
          <TabList className={cx(tab({ type: "underline" }))}>
            <TabIndicator />
            <TabItem value="1">
              <div>1</div>
            </TabItem>
            <TabItem value="2">
              <div>2</div>
            </TabItem>
          </TabList>
          <TabContent value="1">
            <div>1의 내용</div>
          </TabContent>
          <TabContent value="2">
            <div>2의 내용</div>
          </TabContent>
        </Tab>
      </>
    )
  },
}
