import { useState } from "react"
import { Tab, TabList, TabItem, TabContent } from "../components/Tab/index"
import type { Meta, StoryObj } from "@storybook/react"
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
          <TabItem value="1" asChild>
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
    const [selectedItems, setSelectedItems] = useState<string>("2")

    const handleValueChange = (newSelectedItems: string) => {
      setSelectedItems(newSelectedItems)
    }
    return (
      <Tab selected={selectedItems} onSelect={handleValueChange}>
        <TabList>
          <TabItem value="1" asChild>
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
      </Tab>
    )
  },
}
