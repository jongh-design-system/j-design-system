import type { Meta, StoryObj } from "@storybook/react"
import { css } from "@styled-system/css"

import * as Slider from "../component/slider/ui"

export default {
  title: "Slider",
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  render: () => {
    return (
      <Slider.Root
        defaultValue={[50, 100]}
        max={100}
        step={2}
        className={css({
          width: "[100px]",
        })}
      >
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="volume" />
      </Slider.Root>
    )
  },
}
