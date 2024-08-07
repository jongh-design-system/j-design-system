import { Tab } from "../components/Tab/index"
import { StoryObj } from "@storybook/react"

declare const _default: {
  title: string
  component: import("react").ForwardRefExoticComponent<
    import("../components/Tab/Tab").TabProps &
      import("react").RefAttributes<any>
  >
  tags: string[]
}
export default _default
type Story = StoryObj<typeof Tab>
export declare const Primary: Story
export declare const Controlled: Story
