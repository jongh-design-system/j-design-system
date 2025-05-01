/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { css } from "@styled-system/css"
import { CircleArrowDown, EyeClosedIcon, EyeIcon } from "lucide-react"

import { TextField } from "../component/textfield/ui"

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  tags: ["autodocs"],
  component: TextField,
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 TextField
export const Default: Story = {
  args: {
    label: "이름",
    helperText: "이름을 입력하세요",
    required: true,
    placeholder: "이름을 입력하세요",
    id: "default-field",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = await canvas.findByLabelText("이름")
    await userEvent.type(input, "홍길동")
  },
}

// 활성화된 상태의 TextField
export const Active: Story = {
  args: {
    label: "이메일",
    value: "example@email.com",
    helperText: "이메일을 입력하세요",
    id: "active-field",
  },
}

// 성공 상태의 TextField
export const Positive: Story = {
  args: {
    label: "이메일",
    value: "example@email.com",
    status: "normal",
    helperText: "유효한 이메일 형식입니다",
    id: "positive-field",
  },
}

// 음성 상태(오류 상태)의 TextField
export const Negative: Story = {
  args: {
    label: "이메일",
    value: "invalid-email",
    status: "negative",
    helperText: "유효하지 않은 이메일 형식입니다",
    id: "negative-field",
  },
}

// 비활성화된 TextField
export const Disabled: Story = {
  args: {
    label: "비활성화된 필드",
    value: "수정할 수 없는 값",
    disabled: true,
    helperText: "이 필드는 수정할 수 없습니다",
    id: "disabled-field",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = await canvas.findByLabelText("비활성화된 필드")
    expect(input).toBeDisabled()
    await userEvent.type(input, "홍길동")
    expect(input).toHaveValue("수정할 수 없는 값")
  },
}

export const WithTrailingButton: Story = {
  render: () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const handleClick = () => {
      setIsPasswordVisible(!isPasswordVisible)
    }
    return (
      <TextField
        label="비밀번호"
        type={isPasswordVisible ? "text" : "password"}
        trailingAddon={
          isPasswordVisible ? (
            <EyeIcon onClick={handleClick} aria-label="비밀번호 보기" />
          ) : (
            <EyeClosedIcon onClick={handleClick} aria-label="비밀번호 숨김" />
          )
        }
        helperText="비밀번호를 입력하세요"
        id="trailing-button-field"
      />
    )
  },
}
export const Validation: Story = {
  render: () => {
    const [input, setInput] = useState("")
    const status = input.length < 10 ? "negative" : "normal"
    return (
      <TextField
        value={input}
        label="10자 미만"
        onChange={(e) => setInput(e.target.value)}
        status={status}
        helperText={
          status === "negative" ? "10자 이상 입력하세요" : "정상입니다"
        }
        id="validation-field"
        placeholder="10자 미만"
        data-testid="a"
      />
    )
  },
}

// 모든 상태를 보여주는 TextField 모음
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <p
        className={css({
          fluidFontSize: "[1.5rem]",
        })}
      >
        기본 상태
      </p>
      <input title="test"></input>
      <TextField
        label="기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태기본 상태"
        helperText="기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다기본 상태의 텍스트 필드입니다"
        id="all-normal-field"
      />
      <TextField
        label="활성화 상태"
        value="값이 입력되어 있습니다"
        helperText="값이 입력된 상태의 텍스트 필드입니다"
        id="all-active-field"
      />
      <TextField
        label="성공 상태"
        value="올바른 입력값"
        helperText="성공 상태의 텍스트 필드입니다"
        id="all-success-field"
      />
      <TextField
        label="오류 상태"
        value="잘못된 입력값"
        status="negative"
        helperText="오류 상태의 텍스트 필드입니다"
        id="error-field"
      />
      <TextField
        label="비활성화 상태"
        value="수정할 수 없는 값"
        disabled={true}
        helperText="비활성화된 텍스트 필드입니다"
        id="all-disabled-field"
      />
      <TextField
        label="후행 버튼"
        trailingAddon={
          <CircleArrowDown
            onClick={() => {
              console.log("clicked")
            }}
          />
        }
        helperText="후행 버튼이 있는 텍스트 필드입니다"
        id="all-trailing-button-field"
      />
    </div>
  ),
}
