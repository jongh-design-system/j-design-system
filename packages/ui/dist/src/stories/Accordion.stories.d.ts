import { Accordion } from "../components/Accordion/Accordion.tsx"
import { StoryObj } from "@storybook/react"

declare const _default: {
  title: string
  component: import("react").ForwardRefExoticComponent<
    import("../components/Accordion/Accordion.tsx").AccordionProps &
      import("react").RefAttributes<HTMLElement>
  >
  tags: string[]
}
export default _default
type Story = StoryObj<typeof Accordion>
export declare const Primary: Story
export declare const Controlled: Story
