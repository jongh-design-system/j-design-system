import type { Meta, StoryObj } from "@storybook/react-vite"

import { AnimateButton } from "../component/animateButton/ui"

const meta = {
  title: "Components/AnimateButton",
  component: AnimateButton,
  tags: ["autodocs"],
  argTypes: {
    animate: {
      control: "select",
      options: ["pulse", "bounce", "shake", "press"],
      description: "버튼에 적용할 애니메이션 효과를 선택합니다.",
      table: {
        type: { summary: "'pulse' | 'bounce' | 'shake' | 'press'" },
        defaultValue: { summary: "undefined" },
      },
    },
    trigger: {
      control: "radio",
      options: ["hover", "click"],
      description: "애니메이션이 실행될 트리거 이벤트를 선택합니다.",
      table: {
        type: { summary: "'hover' | 'click'" },
        defaultValue: { summary: "hover" },
      },
    },
    initialAnimation: {
      control: "select",
      options: ["pulse", "bounce", "shake", "press"],
      description:
        "컴포넌트가 처음 마운트될 때 실행될 애니메이션을 선택합니다.",
      table: {
        type: { summary: "'pulse' | 'bounce' | 'shake' | 'press'" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof AnimateButton>

export default meta

type Story = StoryObj<typeof meta>

// 기본 스토리: hover 트리거와 함께 pulse 애니메이션을 보여줍니다.
export const Primary: Story = {
  args: {
    children: "Hover Me!",
    animate: "pulse",
    trigger: "hover",
  },
}

// 클릭 트리거를 사용하는 스토리
export const ClickTrigger: Story = {
  args: {
    children: "Click Me!",
    animate: "press",
    trigger: "click",
  },
}

// 모든 애니메이션 효과를 한번에 보여주는 스토리
export const AllAnimations: Story = {
  args: {
    animate: "pulse",
    trigger: "hover",
    children: "Animation Example",
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <AnimateButton animate="pulse" trigger="hover">
        Pulse on Hover
      </AnimateButton>
      <AnimateButton animate="bounce" trigger="hover">
        Bounce on Hover
      </AnimateButton>
      <AnimateButton animate="shake" trigger="hover">
        Shake on Hover
      </AnimateButton>
      <AnimateButton animate="press" trigger="click">
        Press on Click
      </AnimateButton>
    </div>
  ),
}

// 초기 애니메이션을 보여주는 스토리
export const WithInitialAnimation: Story = {
  args: {
    children: "Initial Animation",
    animate: "pulse",
    trigger: "hover",
    initialAnimation: "bounce",
  },
  parameters: {
    docs: {
      description: {
        story:
          "컴포넌트가 마운트될 때 bounce 애니메이션이 실행되고, hover 시에는 pulse 애니메이션이 실행됩니다.",
      },
    },
  },
}
