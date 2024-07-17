import { expect, fn, userEvent, within } from "@storybook/test"
import { TagButton } from "../components/TagButton/TagButton.tsx"
import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "TagButton",
  component: TagButton,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TagButton>

type Story = StoryObj<typeof TagButton>

export const Primary: Story = {
  args: {
    size: "large",
    children: "태그",
    id: "primary",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId("primary")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}
