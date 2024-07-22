import { css } from "jh-generated/css"
import { Tab, TabList, TabItem } from "../components/Tab/index"
import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tab>

type Story = StoryObj<typeof Tab>

export const Primary: Story = {
  args: {
    children: (
      <>
        <TabList>
          <TabItem value="1" asChild>
            <div className={css({ border: "1px solid black" })}>1</div>
          </TabItem>
          <TabItem value="2">2</TabItem>
        </TabList>
      </>
    ),
  },
}
