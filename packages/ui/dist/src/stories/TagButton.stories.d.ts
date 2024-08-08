import { TagButton } from "../components/TagButton/TagButton.tsx"
import { StoryObj } from "@storybook/react"

declare const _default: {
  title: string
  component: import("react").ForwardRefExoticComponent<
    Partial<import("jh-generated/recipes").TagButtonVariant> & {
      children: string
      disabled?: boolean
      className?: string
      id?: string
      onClick?: (e?: boolean) => void
      isClicked?: boolean
      defaultClick?: boolean
    } & import("react").RefAttributes<HTMLSpanElement>
  >
  parameters: {
    layout: string
  }
  args: {
    onClick: import("@storybook/test").Mock<[e?: boolean | undefined], void>
  }
  tags: string[]
}
export default _default
type Story = StoryObj<typeof TagButton>
export declare const Primary: Story
