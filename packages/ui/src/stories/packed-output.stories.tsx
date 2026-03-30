import { applyTheme } from "@jongh/new-system-output/theme"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import * as Accordion from "../accordion"

export default {
  title: "Tests/Packed Output",
  // This story exists only to prove that UI components still render correctly
  // when they consume the packed `@jongh/new-system-output` artifact.
  tags: ["packed"],
} satisfies Meta

type Story = StoryObj

export const AccordionRecipe: Story = {
  render: () => {
    return (
      <div style={{ width: "500px" }}>
        <Accordion.Root type="single" collapsible variant="subtle">
          <Accordion.Item data-testid="packed-item" value="1">
            <Accordion.Trigger data-testid="packed-trigger">
              1번
            </Accordion.Trigger>
            <Accordion.Content data-testid="packed-content">
              내용1
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("packed-trigger")
    const item = canvas.getByTestId("packed-item")

    // These assertions deliberately cover both sides of the contract:
    // 1) recipe classes/styles are actually applied from the packed artifact
    // 2) the play test fails on a real visual regression, not just on import errors
    const lightColor = window.getComputedStyle(trigger).color

    expect(window.getComputedStyle(trigger).display).toBe("flex")
    expect(
      Number.parseFloat(window.getComputedStyle(trigger).paddingInlineStart),
    ).toBeGreaterThan(0)
    expect(window.getComputedStyle(item).borderRadius).toBe("8px")

    await userEvent.click(trigger)

    await waitFor(() => {
      expect(window.getComputedStyle(item).backgroundColor).not.toBe(
        "rgba(0, 0, 0, 0)",
      )
    })

    applyTheme("dark")

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark")
      expect(window.getComputedStyle(trigger).color).not.toBe(lightColor)
    })
  },
}
