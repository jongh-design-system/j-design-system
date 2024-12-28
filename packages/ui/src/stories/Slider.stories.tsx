import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "../component/Slider"

export default {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  render: () => {
    return (
      <div>
        <Slider defaultValue={[50, 100]} max={100} step={2} w="20">
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </div>
    )
  },
}
