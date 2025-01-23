import type { Meta, StoryObj } from "@storybook/react"

import * as Slider from "../component/slider/ui"

export default {
  title: "Slider",
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  render: () => {
    return (
      <div>
        <Slider.Root defaultValue={[50, 100]} max={100} step={2} w="20">
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Root>
      </div>
    )
  },
}
