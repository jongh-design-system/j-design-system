import type { Meta, StoryObj } from "@storybook/react-vite"
import { css } from "@styled-system/css"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/button"
import { TextField } from "@/textfield"

import * as Dialog from "../dialog"

const meta = {
  title: "Base/Dialog",
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
          <Dialog.Title>제목</Dialog.Title>
          <Dialog.Description>
            <p>내용</p>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
  play: async ({ canvasElement }) => {
    //canvasElement -> storybook의 #storybook-root
    //React portal API를 사용할 경우 다른곳에 렌더링
    //canvas 바깥의 body 기준으로 확인해야 portal로 렌더된 dialog를 잡을 수 있다.
    const canvas = within(canvasElement)
    const portal = within(canvasElement.ownerDocument.body)
    const ButtonElement = canvas.getByRole("button")
    await userEvent.click(ButtonElement)
    const CloseElement = portal.getByText("Close")
    expect(CloseElement).not.toBeNull()

    await userEvent.click(CloseElement)

    await waitFor(() => {
      expect(portal.queryByText("Close")).not.toBeInTheDocument()
    })
  },
}

export const LongText: Story = {
  render: () => {
    return (
      <>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          venenatis feugiat eros aliquam convallis. Donec tincidunt eros sed
          ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
          nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
          semper, nunc dui accumsan orci, consequat accumsan libero quam ac est.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Phasellus ac turpis neque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer venenatis feugiat eros aliquam convallis. Donec tincidunt eros
          sed ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
          nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
          semper, nunc dui accumsan orci, consequat accumsan libero quam ac est.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Phasellus ac turpis neque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer venenatis feugiat eros aliquam convallis. Donec tincidunt eros
          sed ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
          nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
          semper, nunc dui accumsan orci, consequat accumsan libero quam ac est.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Phasellus ac turpis neque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer venenatis feugiat eros aliquam convallis. Donec tincidunt eros
          sed ligula tincidunt, sit amet tristique purus pulvinar. Donec maximus
          nunc vitae vestibulum cursus. Phasellus laoreet, velit non mollis
          semper, nunc dui accumsan orci, consequat accumsan libero quam ac est.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Phasellus ac turpis neque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos.
        </span>
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
                venenatis feugiat eros aliquam convallis. Donec tincidunt eros
                sed ligula tincidunt, sit amet tristique purus pulvinar. Donec
                maximus nunc vitae vestibulum cursus. Phasellus laoreet, velit
                non mollis semper, nunc dui accumsan orci, consequat accumsan
                libero quam ac est. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Phasellus ac turpis neque. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                venenatis feugiat eros aliquam convallis. Donec tincidunt eros
                sed ligula tincidunt, sit amet tristique purus pulvinar. Donec
                maximus nunc vitae vestibulum cursus. Phasellus laoreet, velit
                non mollis semper, nunc dui accumsan orci, consequat accumsan
                libero quam ac est. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Phasellus ac turpis neque. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                venenatis feugiat eros aliquam convallis. Donec tincidunt eros
                sed ligula tincidunt, sit amet tristique purus pulvinar. Donec
                maximus nunc vitae vestibulum cursus. Phasellus laoreet, velit
                non mollis semper, nunc dui accumsan orci, consequat accumsan
                libero quam ac est. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Phasellus ac turpis neque. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                venenatis feugiat eros aliquam convallis. Donec tincidunt eros
                sed ligula tincidunt, sit amet tristique purus pulvinar. Donec
                maximus nunc vitae vestibulum cursus. Phasellus laoreet, velit
                non mollis semper, nunc dui accumsan orci, consequat accumsan
                libero quam ac est. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Phasellus ac turpis neque. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
              </Dialog.Description>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  },
}

export const SR: Story = {
  render: () => {
    return (
      <>
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content closeIcon>
            <Dialog.Title>제목</Dialog.Title>
            <div tabIndex={0} role="document">
              <Dialog.Description>내용</Dialog.Description>
              <Dialog.Description asChild>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField id="test" label="test" helperText="test중" />
                  <Dialog.Close asChild>
                    <Button type="submit">제출</Button>
                  </Dialog.Close>
                </form>
              </Dialog.Description>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  },
}
