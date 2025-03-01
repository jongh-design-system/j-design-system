import type { Meta, StoryObj } from "@storybook/react"
import {
  expect,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test"
import { css } from "@styled-system/css"

import * as Dialog from "../component/dialog/ui"

const meta = {
  title: "Dialog",
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Dialog</Dialog.Title>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              venenatis feugiat eros aliquam convallis. Donec tincidunt eros sed
              ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
              nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
              semper, nunc dui accumsan orci, consequat accumsan libero quam ac
              est. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Phasellus ac turpis neque.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
  play: async ({ canvasElement }) => {
    //canvasElement -> storybook의 #storybook-root
    //React portal API를 사용할 경우 다른곳에 렌더링
    //더 넓은 범위의 screen으로 테스트하는게 더 올바른 방법이라고 생각
    const canvas = within(canvasElement)
    const ButtonElement = canvas.getByRole("button")
    await userEvent.click(ButtonElement)
    const CloseElement = screen.getByTestId("close")
    expect(CloseElement).not.toBeNull()

    await userEvent.click(CloseElement)

    waitForElementToBeRemoved(CloseElement).then(() =>
      expect(CloseElement).not.toBeInTheDocument(),
    )
  },
}

export const LongText: Story = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger
          className={css({
            textStyle: "6xl",
          })}
        >
          Open
        </Dialog.Trigger>
        <Dialog.Content
          className={css({
            bg: "cyan.600",
          })}
        >
          <Dialog.Header>
            <Dialog.Title
              className={css({
                color: "red.100",
              })}
            >
              Dialog
            </Dialog.Title>
            <Dialog.Description
              className={css({
                fontSize: "sm",
              })}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              venenatis feugiat eros aliquam convallis. Donec tincidunt eros sed
              ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
              nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
              semper, nunc dui accumsan orci, consequat accumsan libero quam ac
              est. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Phasellus ac turpis neque.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Integer venenatis feugiat eros
              aliquam convallis. Donec tincidunt eros sed ligula tincidunt, sit
              amet tristique purus pulvinar. Donec maximus nunc vitae vestibulum
              cursus. Phasellus laoreet, velit non mollis semper, nunc dui
              accumsan orci, consequat accumsan libero quam ac est. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Phasellus ac turpis neque. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Integer venenatis feugiat eros aliquam convallis. Donec
              tincidunt eros sed ligula tincidunt, sit amet tristique purus
              pulvinar. Donec maximus nunc vitae vestibulum cursus. Phasellus
              laoreet, velit non mollis semper, nunc dui accumsan orci,
              consequat accumsan libero quam ac est. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Phasellus ac turpis neque. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Integer venenatis
              feugiat eros aliquam convallis. Donec tincidunt eros sed ligula
              tincidunt, sit amet tristique purus pulvinar. Donec maximus nunc
              vitae vestibulum cursus. Phasellus laoreet, velit non mollis
              semper, nunc dui accumsan orci, consequat accumsan libero quam ac
              est. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Phasellus ac turpis neque.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}
