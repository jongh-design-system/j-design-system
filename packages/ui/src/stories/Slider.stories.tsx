import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "../components/Slider/Slider.tsx"

export default {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  args: {},
}
