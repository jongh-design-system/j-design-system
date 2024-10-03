import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "../components/Avatar/Avatar.tsx"

const TEST_SRC =
  "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"

const meta = {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: TEST_SRC,
  },
}

export const Controlled: Story = {
  render: () => {
    return <Avatar src="fake" onStatusChange={(status) => alert(status)} />
  },
}
