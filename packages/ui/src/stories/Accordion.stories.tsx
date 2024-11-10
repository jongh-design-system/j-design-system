import { Accordion, Content, Item, Trigger } from "../components"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor } from "@storybook/test"
export default {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  render: () => {
    return (
      <div style={{ width: "500px" }}>
        <Accordion>
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
      </div>
    )
  },
  play: async ({ canvas }) => {
    const Item = canvas.getByText("1번")
    expect(Item).toBeInTheDocument()
    //토글로 내용이 열고 닫히는지 확인
    await userEvent.click(Item)
    await expect(canvas.getByText("내용1")).toBeInTheDocument()

    await userEvent.click(Item)
    await waitFor(async () => {
      const Content = canvas.queryByText("내용1")
      expect(Content).toBeNull()
    })
  },
}
