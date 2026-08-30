import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps, CSSProperties } from "react"
import { expect, within } from "storybook/test"

import { Center } from "@/component/center"

export default {
  title: "Layout/Center",
  tags: ["autodocs"],
  component: Center,
} as Meta<typeof Center>

type Story = StoryObj<ComponentProps<typeof Center>>

export const BothAxes: Story = {
  args: {
    children: "Centered content",
  },
  play: async ({ canvasElement }) => {
    const element = within(canvasElement).getByText("Centered content")
    const style = getComputedStyle(element)

    await expect(style.display).toBe("flex")
    await expect(style.alignItems).toBe("center")
    await expect(style.justifyContent).toBe("center")
  },
}

export const HorizontalAxis: Story = {
  args: {
    axis: "horizontal",
    children: "Horizontally centered content",
  },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(
      within(canvasElement).getByText("Horizontally centered content"),
    )

    await expect(style.alignItems).toBe("normal")
    await expect(style.justifyContent).toBe("center")
  },
}

export const VerticalAxis: Story = {
  args: {
    axis: "vertical",
    children: "Vertically centered content",
  },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(
      within(canvasElement).getByText("Vertically centered content"),
    )

    await expect(style.alignItems).toBe("center")
    await expect(style.justifyContent).toBe("normal")
  },
}

export const Inline: Story = {
  args: {
    children: "Inline centered content",
    isInline: true,
  },
  play: async ({ canvasElement }) => {
    const element = within(canvasElement).getByText("Inline centered content")

    await expect(getComputedStyle(element).display).toBe("inline-flex")
  },
}

export const TokenPaddingPrecedence: Story = {
  args: {
    children: "Padded content",
    padding: "4",
    paddingBottom: "3",
    paddingX: "3",
    paddingLeft: "2",
  },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(
      within(canvasElement).getByText("Padded content"),
    )

    await expect(style.paddingTop).toBe("16px")
    await expect(style.paddingRight).toBe("12px")
    await expect(style.paddingBottom).toBe("12px")
    await expect(style.paddingLeft).toBe("8px")
  },
}

export const SizingAndStyleOverride: Story = {
  args: {
    children: "Sized content",
    height: "100vh",
    maxWidth: "80rem",
    minHeight: "50%",
    style: { height: "50px" },
    width: "calc(100% - 40px)",
  },
  play: async ({ canvasElement }) => {
    const element = within(canvasElement).getByText("Sized content")
    const style = getComputedStyle(element)

    await expect(element.style.getPropertyValue("--layout-width-base")).toBe(
      "calc(100% - 40px)",
    )
    await expect(element.style.height).toBe("50px")
    await expect(style.height).toBe("50px")
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <section aria-label="Centered region" data-testid="center">
        Centered section
      </section>
    ),
  },
  play: async ({ canvasElement }) => {
    const element = within(canvasElement).getByRole("region", {
      name: "Centered region",
    })

    await expect(element.tagName).toBe("SECTION")
    await expect(element.parentElement).toBe(canvasElement)
  },
}

export const UtilityOverride: Story = {
  args: {
    children: "Overridden content",
    className: "consumer-center-override",
    paddingLeft: "4",
    width: "100vw",
  },
  render: (args) => (
    <>
      <style>{`
        .consumer-center-override {
          justify-content: flex-start;
          padding-left: 0;
          width: 10rem;
        }
      `}</style>
      <Center {...args} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(
      within(canvasElement).getByText("Overridden content"),
    )

    await expect(style.justifyContent).toBe("flex-start")
    await expect(style.paddingLeft).toBe("0px")
    await expect(style.width).toBe("160px")
  },
}

export const ResponsivePadding: Story = {
  args: {
    children: "Responsive content",
    padding: { base: "2", md: "40px" },
  },
  render: (args) => (
    <div
      data-testid="breakpoint-scope"
      style={{ "--breakpoint-active": "base" } as CSSProperties}
    >
      <Center {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const scope = canvas.getByTestId("breakpoint-scope")
    const element = canvas.getByText("Responsive content")

    await expect(getComputedStyle(element).paddingTop).toBe("8px")

    scope.style.setProperty("--breakpoint-active", "md")

    await expect(getComputedStyle(element).paddingTop).toBe("40px")

    scope.style.setProperty("--breakpoint-active", "lg")

    await expect(getComputedStyle(element).paddingTop).toBe("40px")
  },
}

export const ResponsiveLayoutProps: Story = {
  args: {
    children: (
      <>
        <span>First</span>
        <span>Second</span>
      </>
    ),
    flexDirection: { base: "column", md: "row" },
    gap: { base: "2", md: "4" },
  },
  render: (args) => (
    <div
      data-testid="layout-breakpoint-scope"
      style={{ "--breakpoint-active": "base" } as CSSProperties}
    >
      <Center {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const scope = canvas.getByTestId("layout-breakpoint-scope")
    const element = canvas.getByText("First").parentElement!

    await expect(getComputedStyle(element).flexDirection).toBe("column")
    await expect(getComputedStyle(element).gap).toBe("8px")

    scope.style.setProperty("--breakpoint-active", "md")

    await expect(getComputedStyle(element).flexDirection).toBe("row")
    await expect(getComputedStyle(element).gap).toBe("16px")
  },
}
