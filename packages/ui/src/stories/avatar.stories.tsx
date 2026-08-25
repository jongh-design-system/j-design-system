import type { Meta, StoryObj } from "@storybook/react-vite"

import * as Avatar from "@/component/avatar"

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
        <Avatar.Image
          src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSDvLC5bOMlnrUBoojLDYnfS0S8G6kuUgQfcFq6d60TsnCmfNGimIc4pIgCmTHdnLaIgxGHBcdNeJ6FAoE"
          alt="프로필 이미지"
        />
      </Avatar.Root>
    )
  },
}

export const Fallback: Story = {
  args: {},
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Image src="" alt="" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    )
  },
}
