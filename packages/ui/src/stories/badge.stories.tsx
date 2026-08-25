import type { Meta, StoryObj } from "@storybook/react-vite"
import { css } from "@styled-system/css"

import { Badge, type BadgeProps } from "@/component/badge"

const tones: Array<NonNullable<BadgeProps["tone"]>> = [
  "neutral",
  "brand",
  "informative",
  "positive",
  "warning",
  "critical",
]

const variants: Array<NonNullable<BadgeProps["variant"]>> = ["weak", "outline"]

export default {
  title: "Base/Badge",
  tags: ["autodocs"],
  component: Badge,
  args: {
    children: "Badge",
  },
} as Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

export const Primary: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className={css({ display: "grid", gap: "3" })}>
      {variants.map((variant) => (
        <div
          key={variant}
          className={css({ alignItems: "center", display: "flex", gap: "2" })}
        >
          {tones.map((tone) => (
            <Badge key={tone} tone={tone} variant={variant}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className={css({ alignItems: "center", display: "flex", gap: "2" })}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
}

export const Truncation: Story = {
  args: {
    children: "아주 긴 상태를 표시하는 배지",
    variant: "weak",
  },
}
