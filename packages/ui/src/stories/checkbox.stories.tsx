/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite"
import { type FormEvent, useCallback, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/component/button/ui"

import { Checkbox } from "../component/checkbox/ui"

const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["square", "ghost"],
      description: "체크박스의 스타일 변형을 선택합니다.",
      table: {
        type: { summary: "'square' | 'ghost'" },
        defaultValue: { summary: "square" },
      },
    },
    size: {
      control: "radio",
      options: ["md", "lg"],
      description: "체크박스의 크기를 설정합니다.",
      table: {
        type: { summary: "'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "체크박스를 비활성화 상태로 만듭니다. 비활성화 시 상호작용이 불가능합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      control: "boolean",
      description: "체크박스의 선택 상태를 제어합니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    indeterminate: {
      control: "boolean",
      description:
        "체크박스의 불확정(indeterminate) 상태를 설정합니다. 일부 선택된 상태를 나타낼 때 사용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "체크박스에 표시될 텍스트 레이블입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    onCheckedChange: {
      description: "체크박스 상태가 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    size: "md",
    variant: "square",
    disabled: false,
    label: "체크박스",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByLabelText("체크박스")
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox variant="square" label="Square 변형 (기본)" />
      <Checkbox variant="ghost" label="Ghost 변형" />
      <Checkbox variant="square" size="lg" label="Square 변형 (Large)" />
      <Checkbox variant="ghost" size="lg" label="Ghost 변형 (Large)" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <Checkbox disabled label="비활성화 상태" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByLabelText("비활성화 상태")
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}

export const Indeterminate: Story = {
  render: () => {
    const [indeterminate, setIndeterminate] = useState(true)
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Checkbox
          variant="square"
          indeterminate={indeterminate}
          checked={checked}
          onCheckedChange={setChecked}
          label="Indeterminate 상태 (Square)"
        />
        <Checkbox
          variant="ghost"
          indeterminate={indeterminate}
          checked={checked}
          onCheckedChange={setChecked}
          label="Indeterminate 상태 (Ghost)"
        />
        <Button
          onClick={() => setIndeterminate((prev) => !prev)}
          data-testid="toggle"
        >
          Indeterminate 상태 토글
        </Button>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox label="기본 상태" />
      <Checkbox label="선택된 상태" checked={true} />
      <Checkbox label="비활성화 상태" disabled={true} />
      <Checkbox label="선택된 비활성화 상태" checked={true} disabled={true} />
    </div>
  ),
}

export const WithReactHookForm: Story = {
  render: () => {
    const POSSIBLE_FRUIT_VALUES = ["사과", "바나나", "포도"] as const

    type FormValues = Record<(typeof POSSIBLE_FRUIT_VALUES)[number], boolean>

    const { handleSubmit, reset, setValue, control } = useForm<FormValues>({
      defaultValues: {
        사과: false,
        바나나: false,
        포도: true,
      },
    })

    const onValid = useCallback((data: FormValues) => {
      window.alert(JSON.stringify(data, null, 2))
    }, [])

    const onReset = useCallback(
      (event: FormEvent) => {
        event.preventDefault()
        reset()
      },
      [reset],
    )

    return (
      <form onSubmit={handleSubmit(onValid)} onReset={onReset}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {POSSIBLE_FRUIT_VALUES.map((name) => {
            const {
              field: { value },
            } = useController({ name, control })
            return (
              <Checkbox
                key={name}
                label={name}
                checked={value}
                onCheckedChange={(checked) => setValue(name, checked === true)}
              />
            )
          })}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          <Button type="reset">초기화</Button>
          <Button type="button" onClick={() => setValue("바나나", true)}>
            바나나 선택
          </Button>
          <Button type="submit">제출</Button>
        </div>
      </form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    //1. click apple checkbox
    const appleCheckbox = canvas.getByLabelText("사과")
    userEvent.click(appleCheckbox)
    //2. click reset button
    const resetButton = canvas.getByRole("button", { name: "초기화" })
    userEvent.click(resetButton)
    //3. check apple checkbox is not checked
    await expect(appleCheckbox).not.toBeChecked()
  },
}

export const LongText: Story = {
  args: {
    label:
      "매우 긴 텍스트가 있는 체크박스입니다. 체크박스 레이블이 길어도 레이아웃이 깨지지 않고 자연스럽게 줄바꿈되는지 확인합니다. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim laboriosam eos atque consectetur, nemo, incidunt dolorum asperiores dicta magni nihil iusto libero quibusdam? Repellendus tenetur in ipsa placeat. A, laboriosam?",
  },
  render: (args) => {
    return (
      <div
        style={{ width: "250px", border: "1px dashed #ccc", padding: "10px" }}
      >
        <Checkbox {...args} />
      </div>
    )
  },
}
