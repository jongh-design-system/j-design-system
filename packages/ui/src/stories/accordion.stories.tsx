import type { Meta, StoryObj } from "@storybook/react-vite"
import { css } from "@styled-system/css"
import { useState } from "react"
import {
  expect,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "storybook/test"

import * as Accordion from "../accordion"

export default {
  title: "Base/Accordion",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const Item = canvas.getByText("1번")
    expect(Item).toBeVisible()
    //1번 아이템을 클릭하면 내용1이 열림

    await userEvent.click(Item)

    const Content = canvas.queryByText("내용1")

    await expect(Content).toBeVisible()

    await userEvent.click(Item)

    await waitForElementToBeRemoved(Content)
    expect(canvas.queryByText("내용1")).toBeNull()
  },
}

const ControlledAccordion = () => {
  const [value, setValue] = useState<string[]>(["1"])
  return (
    <Accordion.Root type="multiple" value={value} onValueChange={setValue}>
      <Accordion.Item value="1">
        <Accordion.Trigger>1번</Accordion.Trigger>
        <Accordion.Content>내용1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="2">
        <Accordion.Trigger>2번</Accordion.Trigger>
        <Accordion.Content>내용2</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export const Controlled: Story = {
  render: () => <ControlledAccordion />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 1번 내용이 처음에 열려있어야 함
    expect(canvas.getByText("내용1")).toBeVisible()

    const trigger1 = canvas.getByRole("button", { name: "1번" })
    const trigger2 = canvas.getByRole("button", { name: "2번" })

    await userEvent.click(trigger2)
    expect(canvas.getByText("내용1")).toBeVisible()
    expect(canvas.getByText("내용2")).toBeVisible()

    await userEvent.click(trigger1)

    await waitForElementToBeRemoved(canvas.getByText("내용1"))
    // console.log(canvas.getByText("내용1"))
    expect(canvas.queryByText("내용1")).toBeNull()
    expect(canvas.getByText("내용2")).toBeVisible()
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
    const trigger = canvas.getByRole("button", { name: "1번" })
    await userEvent.click(trigger)

    // 내용이 보이는지 확인
    expect(canvas.getByText("내용1")).toBeVisible()
  },
}
