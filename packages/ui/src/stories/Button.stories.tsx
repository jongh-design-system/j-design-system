import { expect, fn, userEvent, within } from "@storybook/test"
import { Button } from "../component/button/ui"
import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"
export default {
  title: "Button",
  tags: ["autodocs"],
  component: Button,
} as Meta<typeof Button>

type Story = StoryObj<ComponentProps<typeof Button>>

export const Primary: Story = {
  args: {
    children: "click",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const Secondary: Story = {
  args: {
    children: "click",
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    children: "click",
    variant: "outline",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "disabled",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
