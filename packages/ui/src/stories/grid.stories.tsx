import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps, CSSProperties } from "react"
import { expect, within } from "storybook/test"

import { Grid } from "@/component/grid"

export default {
  title: "Layout/Grid",
  component: Grid,
} as Meta<typeof Grid>

type Story = StoryObj<ComponentProps<typeof Grid>>

export const Responsive: Story = {
  args: {
    children: [1, 2].map((item) => <span key={item}>{item}</span>),
    columns: { base: 1, md: 2 },
    rows: 2,
    gap: { base: "2", md: "4" },
    align: "center",
    justify: "space-between",
    justifyItems: "stretch",
    autoFlow: "row dense",
    autoColumns: "1fr",
    autoRows: "max-content",
    width: "100%",
    style: { width: "240px", height: "100px" },
  },
  render: (args) => (
    <div
      data-testid="breakpoint-scope"
      style={{ "--breakpoint-active": "base" } as CSSProperties}
    >
      <style>{`.consumer-grid-override { justify-content: center; }`}</style>
      <Grid {...args} className="consumer-grid-override" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const scope = canvas.getByTestId("breakpoint-scope")
    const element = canvas.getByText("1").parentElement!
    let style = getComputedStyle(element)

    await expect(style.display).toBe("grid")
    await expect(style.gridTemplateColumns).toBe("240px")
    await expect(style.gridTemplateRows).toBe("46px 46px")
    await expect(style.gap).toBe("8px")
    await expect(style.alignItems).toBe("center")
    await expect(style.justifyContent).toBe("center")
    await expect(style.justifyItems).toBe("stretch")
    await expect(style.gridAutoFlow).toBe("dense")
    await expect(style.gridAutoColumns).toBe("1fr")
    await expect(style.gridAutoRows).toBe("max-content")

    scope.style.setProperty("--breakpoint-active", "md")
    style = getComputedStyle(element)

    await expect(style.gridTemplateColumns).toBe("112px 112px")
    await expect(style.gridTemplateRows).toBe("42px 42px")
    await expect(style.gap).toBe("16px")

    scope.style.setProperty("--breakpoint-active", "lg")
    style = getComputedStyle(element)

    await expect(style.gridTemplateColumns).toBe("112px 112px")
  },
}
