import type { Meta, StoryObj } from "@storybook/react-vite"
import { PlusCircleIcon } from "lucide-react"
import { ComponentProps } from "react"
import { expect, fn, userEvent } from "storybook/test"

import { Chip } from "../component/chip/ui"

export default {
  title: "Base/Chip",
  tags: ["autodocs"],
  component: Chip,
} as Meta<typeof Chip>

type Story = StoryObj<ComponentProps<typeof Chip>>

export const Primary: Story = {
  args: {
    children: <div>확인</div>,
  },
}

export const Outlined: Story = {
  args: {
    children: <div>확인</div>,
    variant: "outlined",
  },
}

export const IconOnly: Story = {
  args: {
    layout: "iconOnly",
    children: <PlusCircleIcon />,
  },
}

export const WithPrefixIcon: Story = {
  args: {
    children: (
      <>
        <PlusCircleIcon />
        ㅎㅇ
      </>
    ),
  },
}

export const WithSuffixIcon: Story = {
  args: {
    children: (
      <>
        ㅎㅇ
        <PlusCircleIcon />
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "disabled",
    onClick: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
