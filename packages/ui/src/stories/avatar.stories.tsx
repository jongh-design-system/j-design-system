import * as Avatar from "@story-components/avatar"
import type { Meta, StoryObj } from "@storybook/react-vite"

export default {
  title: "Base/Avatar",
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {},
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Image src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSDvLC5bOMlnrUBoojLDYnfS0S8G6kuUgQfcFq6d60TsnCmfNGimIc4pIgCmTHdnLaIgxGHBcdNeJ6FAoE" />
      </Avatar.Root>
    )
  },
}

export const Fallback: Story = {
  args: {},
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Image src="" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    )
  },
}
