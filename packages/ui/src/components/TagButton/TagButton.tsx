import { cx } from "jh-generated/css"
import { tagButton, type TagButtonVariant } from "jh-generated/recipes"
import { forwardRef } from "react"
import { useControlledState } from "../../hooks/useControllableState"

type TagButtonProps = Partial<TagButtonVariant> & {
  /** 버튼 내부에 표시될 텍스트 */
  children: string

  /** 버튼의 비활성화 여부를 지정합니다. true일 경우 버튼이 비활성화됩니다. */
  disabled?: boolean

  /** 버튼에 적용할 추가적인 CSS 클래스명 */
  className?: string

  /** 버튼의 고유 식별자 */
  id?: string

  /**
   * 버튼 클릭 시 실행될 함수
   * @param e 선택적 boolean 매개변수
   */
  onClick?: (e?: boolean) => void

  /** 버튼의 클릭 상태를 나타냅니다. true일 경우 클릭된 상태를 의미합니다. */
  isClicked?: boolean

  /** 버튼의 초기 클릭 상태를 설정합니다. true일 경우 처음부터 클릭된 상태로 시작합니다. */
  defaultClick?: boolean
}
/**
 * 컴포넌트 설명
 *
 * - 어쩌고
 * - 저쩌고
 */
export const TagButton = forwardRef<HTMLSpanElement, TagButtonProps>(
  (
    {
      children,
      disabled = false,
      className,
      id,
      onClick,
      isClicked,
      defaultClick = false,
      ...rest
    },
    ref,
  ) => {
    const [clicked, setClicked] = useControlledState({
      prop: isClicked,
      defaultProp: defaultClick,
      onChange: onClick,
    })
    //
    return (
      <span
        role="button"
        ref={ref}
        id={id}
        className={cx(tagButton({ ...rest }), className)}
        aria-disabled={disabled}
        aria-pressed={clicked}
        {...(disabled && { "data-invalid": "true" })}
        data-testid={id}
        onClick={() => {
          if (disabled) {
            return
          }
          setClicked((prev) => !prev)
        }}
      >
        {children}
      </span>
    )
  },
)

TagButton.displayName = "TagButton"
