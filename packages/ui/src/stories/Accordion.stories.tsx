import { Accordion, Content, Item, Trigger } from "../components"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "@storybook/preview-api"
import { expect, userEvent, waitFor, within } from "@storybook/test"
export default {
  title: "",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Controlled: Story = {
  args: {},
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleValueChange = (newSelectedItems: string[]) => {
      setSelectedItems(newSelectedItems)
    }
    return (
      <>
        <Accordion
          value={selectedItems}
          onValueChange={(v) => handleValueChange(v)}
        >
          <Item value="1">
            <Trigger>1번</Trigger>
            <Content>내용1</Content>
          </Item>
          <Item value="2">
            <Trigger>2번</Trigger>
            <Content>내용2</Content>
          </Item>
          <Item value="3">
            <Trigger>3번</Trigger>
            <Content>내용2</Content>
          </Item>
        </Accordion>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const Item = canvas.getByText("1번")

    // 첫 번째 클릭으로 "aria-expanded"가 "true"인지 확인하고, content가 렌더링되었는지 확인
    await userEvent.click(Item.parentElement!)
    await waitFor(async () => {
      expect(Item.parentElement?.getAttribute("aria-expanded")).toBe("true")
      const Content = canvas.queryByText("내용1")
      expect(Content).toBeTruthy()
    })

    // 두 번째 클릭으로 "aria-expanded"가 "false"인지 확인하고, content가 렌더링 안되었는지 확인
    await userEvent.click(Item.parentElement!)
    await waitFor(() => {
      expect(Item.parentElement?.getAttribute("aria-expanded")).toBe("false")
      const Content = canvas.queryByText("내용1")
      expect(Content).toBeFalsy()
    })
  },
}
