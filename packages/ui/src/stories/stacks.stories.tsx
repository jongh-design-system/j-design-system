import type { Meta, StoryObj } from "@storybook/react-vite"
import type { CSSProperties } from "react"
import { expect, within } from "storybook/test"

import { HStack } from "@/component/h-stack"
import { VStack } from "@/component/v-stack"

export default {
  title: "Layout/Stacks",
} as Meta

type Story = StoryObj

export const Responsive: Story = {
  render: () => (
    <div
      data-testid="breakpoint-scope"
      style={{ "--breakpoint-active": "base" } as CSSProperties}
    >
      <style>{`.consumer-h-stack-override { justify-content: flex-end; }`}</style>
      <VStack
        asChild
        gap={{ base: "2", md: "4" }}
        align="center"
        justify="space-between"
        grow
      >
        <section aria-label="Vertical stack">
          <span>V1</span>
          <span>V2</span>
        </section>
      </VStack>
      <HStack
        aria-label="Horizontal stack"
        className="consumer-h-stack-override"
        gap={{ base: "2", md: "4" }}
        align="stretch"
        justify="space-between"
        wrap
        shrink={0}
      >
        <span>H1</span>
        <span>H2</span>
      </HStack>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const scope = canvas.getByTestId("breakpoint-scope")
    const vStack = canvas.getByRole("region", { name: "Vertical stack" })
    const hStack = canvas.getByLabelText("Horizontal stack")

    await expect(vStack.tagName).toBe("SECTION")
    await expect(getComputedStyle(vStack).display).toBe("flex")
    await expect(getComputedStyle(vStack).flexDirection).toBe("column")
    await expect(getComputedStyle(vStack).gap).toBe("8px")
    await expect(getComputedStyle(vStack).alignItems).toBe("center")
    await expect(getComputedStyle(vStack).justifyContent).toBe("space-between")
    await expect(getComputedStyle(vStack).flexGrow).toBe("1")

    await expect(getComputedStyle(hStack).display).toBe("flex")
    await expect(getComputedStyle(hStack).flexDirection).toBe("row")
    await expect(getComputedStyle(hStack).gap).toBe("8px")
    await expect(getComputedStyle(hStack).alignItems).toBe("stretch")
    await expect(getComputedStyle(hStack).justifyContent).toBe("flex-end")
    await expect(getComputedStyle(hStack).flexWrap).toBe("wrap")
    await expect(getComputedStyle(hStack).flexShrink).toBe("0")

    scope.style.setProperty("--breakpoint-active", "md")

    await expect(getComputedStyle(vStack).gap).toBe("16px")
    await expect(getComputedStyle(hStack).gap).toBe("16px")

    scope.style.setProperty("--breakpoint-active", "lg")

    await expect(getComputedStyle(vStack).gap).toBe("16px")
    await expect(getComputedStyle(hStack).gap).toBe("16px")
  },
}
