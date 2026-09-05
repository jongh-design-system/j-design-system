import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Icon, IconChevronDownLine, IconCircleArrowDownLine } from "@/icon"

const sizes = [12, 16, 20, 24] as const

const meta = {
  title: "Base/Icon",
  component: Icon,
  args: {
    svg: IconCircleArrowDownLine,
    size: 24,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
      {sizes.map((size) => (
        <Icon
          key={size}
          data-testid={`icon-${size}`}
          svg={IconChevronDownLine}
          size={size}
        />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    for (const size of sizes) {
      const icon = canvas.getByTestId(`icon-${size}`)

      await expect(icon).toHaveStyle({
        height: `${size}px`,
        width: `${size}px`,
      })
      await expect(icon).toHaveAttribute("aria-hidden", "true")
      await expect(icon).toHaveAttribute("focusable", "false")
    }
  },
}

export const SemanticColor: Story = {
  args: {
    color: "fg.critical",
  },
  render: (args) => <Icon {...args} data-testid="semantic-color-icon" />,
  play: async ({ canvasElement }) => {
    const icon = within(canvasElement).getByTestId("semantic-color-icon")

    await expect(icon.style.color).toBe("var(--colors-fg-critical)")
  },
}
