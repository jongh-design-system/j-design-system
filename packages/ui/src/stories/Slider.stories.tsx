import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "../components/Slider/Slider"
import { useState } from "@storybook/preview-api"
import { StyledSlider } from "src/components/Slider"

export default {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState(50)

    return (
      <div>
        <StyledSlider min={0} max={100} value={value} onChange={setValue}>
          <StyledSlider.Track id="4" bgColor="red_300">
            <StyledSlider.Range />
          </StyledSlider.Track>
          <StyledSlider.Thumb />
        </StyledSlider>
      </div>
    )
  },
}
