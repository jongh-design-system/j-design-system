import { expect, fn, userEvent, within } from "@storybook/test"
import { Button } from "../components/Button/Button.tsx"
import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "Button",
  component: Button,
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    size: "large",
    variant: "primary",
    children: "클릭하기",
    onClick: fn(),
    disabled: false,
    br: "normal",
  },
}

export const Primary_Disabled: Story = {
  args: {
    size: "large",
    variant: "primary",
    children: "disabled",
    onClick: fn(),
    disabled: true,
    id: "button",
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId("button")
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const Text: Story = {
  args: {
    size: "large",
    variant: "text",
    children: "클릭하기",
    onClick: fn(),
    id: "button",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const WithIcon: Story = {
  args: {
    ...Primary.args,
    leftIcon: <div onClick={() => () => alert("left")}>+</div>,
    rightIcon: <div>+</div>,
  },
}
