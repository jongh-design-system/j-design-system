import type { Meta, StoryObj } from "@storybook/react-vite"
import { css } from "@styled-system/css"
import { useState } from "storybook/preview-api"
import { expect, userEvent, waitFor, within } from "storybook/test"

import * as Accordion from "../component/accordion/ui"

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
            <Accordion.Trigger
              className={css({
                color: "red.100",
              })}
            >
              1번
            </Accordion.Trigger>
            <Accordion.Content>내용1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.Trigger>2번</Accordion.Trigger>
            <Accordion.Content>내용1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.Trigger>3번</Accordion.Trigger>
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

const StateExample = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <Accordion.Root
      type="multiple"
      value={selectedItems}
      onValueChange={(items) => setSelectedItems(items)}
    >
      <Accordion.Item value="1">
        <Accordion.Header>
          <Accordion.Trigger data-testid="1">1번</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>내용1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export const WithState: Story = {
  render: () => <StateExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 초기 상태 확인
    expect(canvas.queryByText("내용1")).toBeDefined()

    // 트리거 클릭
    const trigger = canvas.getByTestId("1")
    await userEvent.click(trigger)

    // 상태 변경 후 내용 표시 확인
    expect(canvas.getByText("내용1")).toBeDefined()
  },
}

export const ControlledState: Story = {
  render: () => {
    return (
      <Accordion.Root type="multiple" value={["1"]} onValueChange={() => {}}>
        <Accordion.Item value="1">
          <Accordion.Trigger data-testid="trigger-1">1번</Accordion.Trigger>
          <Accordion.Content>내용1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 트리거 찾기 및 클릭
    const trigger = canvas.getByTestId("trigger-1")
    await userEvent.click(trigger)

    // 내용이 보이는지 확인
    expect(canvas.getByText("내용1")).toBeInTheDocument()
  },
}
