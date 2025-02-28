import type { Meta, StoryObj } from "@storybook/react"
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
                fontSize: "smaller",
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
