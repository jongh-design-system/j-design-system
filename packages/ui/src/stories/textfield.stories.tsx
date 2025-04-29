import { useState } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { css } from "@styled-system/css"

import { TextField, type TextFieldProps } from "../component/textfield/ui"

// 아이콘 컴포넌트 (예시)
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z"
      fill="currentColor"
    />
  </svg>
)

const ClearIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  </svg>
)

const meta: Meta<TextFieldProps> = {
  title: "Components/TextField",
  tags: ["autodocs"],
  component: TextField,
} as Meta<TextFieldProps>

export default meta
type Story = StoryObj<TextFieldProps>

// 기본 TextField
export const Default: Story = {
  args: {
    label: "이름",
    helperText: "이름을 입력하세요",
    required: true,
    placeholder: "이름을 입력하세요",
    id: "default-field",
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
}

// 후행 버튼이 있는 TextField
export const WithTrailingButton: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    trailingAddon: <EyeIcon />,
    helperText: "비밀번호를 입력하세요",
    id: "trailing-button-field",
  },
}
//에러에 대한 판단을 누가?
export const Validation: Story = {
  render: function RenderValidation() {
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
      <TextField
        label="기본 상태"
        helperText="기본 상태의 텍스트 필드입니다"
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
        status="negative"
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
        value="후행 버튼이 있는 필드"
        trailingAddon={<ClearIcon />}
        helperText="후행 버튼이 있는 텍스트 필드입니다"
        id="all-trailing-button-field"
      />
    </div>
  ),
}
