import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "../components/Slider/Slider.tsx"
import { useState } from "@storybook/preview-api"

export default {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  args: {},
}

export const Controlled: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState(40)
    return <Slider value={value} setValue={setValue}></Slider>
  },
}
