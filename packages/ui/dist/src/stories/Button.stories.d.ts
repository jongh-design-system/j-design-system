import { Button } from "../components/Button/Button.tsx"
import { StoryObj } from "@storybook/react"

declare const _default: {
  title: string
  component: import("react").ForwardRefExoticComponent<
    Partial<import("jh-generated/recipes").ButtonVariant> &
      Omit<
        import("react").DetailedHTMLProps<
          import("react").ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >,
        "ref"
      > & {
        as?: string
      } & {
        leftIcon?: import("react").ReactElement
        rightIcon?: import("react").ReactElement
      } & import("react").RefAttributes<HTMLButtonElement>
  >
  args: {
    onClick: import("@storybook/test").Mock<
      [event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>],
      void
    >
  }
  tags: string[]
}
export default _default
type Story = StoryObj<typeof Button>
export declare const Primary: Story
export declare const Primary_Disabled: Story
export declare const Text: Story
export declare const WithIcon: Story
