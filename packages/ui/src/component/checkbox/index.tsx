import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import React, { ComponentPropsWithoutRef } from "react"

import { checkboxRecipe } from "./recipe"

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<"button">,
    "size" | "checked" | "defaultChecked" | "onChange"
  > {
  /**
   * 체크박스의 크기를 설정합니다.
   * @default 'md'
   */
  size?: "sm" | "md"

  /**
   * 체크박스의 상태를 설정합니다.
   * (controlled 컴포넌트로 사용할 경우)
   */
  checked?: boolean

  /**
   * 체크박스의 초기 상태를 설정합니다.
   * (uncontrolled 컴포넌트로 사용할 경우)
   */
  defaultChecked?: boolean

  /**
   * 체크박스 상태가 변경될 때 호출되는 콜백함수입니다.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * 체크박스 비활성화 상태를 설정합니다.
   * @default false
   */
  disabled?: boolean

  /**
   * 필수 입력 항목인지 설정합니다.
   * @default false
   */
  required?: boolean

  /**
   * 체크박스의 이름 속성입니다. 폼 제출 시 사용됩니다.
   */
  name?: string

  /**
   * 체크박스의 값 속성입니다. 폼 제출 시 사용됩니다.
   * @default 'on'
   */
  value?: string

  /**
   * 체크박스가 indeterminate 상태인지 설정합니다.
   * @default false
   */
  indeterminate?: boolean

  /**
   * 체크박스가 좁은 패딩을 가질지 설정합니다.
   * @default false
   */
  tight?: boolean
}

/**
 * 사용자가 선택/미선택 상태를 토글할 수 있는 체크박스 컴포넌트입니다.
 * Radix UI의 Checkbox를 기반으로 하며, 접근성이 보장됩니다.
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      size = "md",
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value,
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked"
    const styles = checkboxRecipe({
      size,
      state,
    })

    // 체크박스 상태에 따라 아이콘 표시 여부 결정
    const isChecked = indeterminate || checked || defaultChecked

    return (
      <CheckboxPrimitive.Root
        className={styles.root}
        checked={indeterminate ? true : checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        ref={ref}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* Indicator는 체크 상태일 때만 렌더링 */}
        {isChecked && (
          <CheckboxPrimitive.Indicator className={styles.icon}>
            {indeterminate ? (
              <div className={styles.indeterminateLine} />
            ) : (
              <CheckIcon />
            )}
          </CheckboxPrimitive.Indicator>
        )}
      </CheckboxPrimitive.Root>
    )
  },
)

Checkbox.displayName = "Checkbox"
