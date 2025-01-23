import * as Accordion from "../component/accordion/ui"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor } from "@storybook/test"
export default {
  title: "Accordion",
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  render: () => {
    return (
      <div style={{ width: "500px" }}>
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="1">
            <Accordion.Header>
              <Accordion.Trigger>1번</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <div>내용1</div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.Header>
              <Accordion.Trigger>2번</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <div>내용1</div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.Header>
              <Accordion.Trigger>3번</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>내용3</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
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
