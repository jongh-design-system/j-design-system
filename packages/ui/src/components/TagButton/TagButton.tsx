import { cx } from "jh-generated/css"
import { tagButton, type TagButtonVariant } from "jh-generated/recipes"
import { forwardRef } from "react"
import { useControlledState } from "../../hooks/useControllableState"

type TagButtonProps = Partial<TagButtonVariant> & {
  children: string
  disabled?: boolean
  className?: string
  id?: string
  onClick?: (e: boolean) => void
  isClicked?: boolean
  defaultClick?: boolean
}
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

//태그와 버튼의 차이점 - 눌렀는지 안눌렀는지 표시가 된다
//tag의 선택 유무를 외부에서 주입해주던가 or 내부에서

//데이터를 기반으로 렌더링을 할테고,
//params에 데이터값 or 클릭여부

//외부의 상태를 가지고 이를 태그에 주입할수도 있는거고
//그냥 외부상태없이 할수도있는거임

//만약에 외부에서 뭘 안주면 클릭했을 때 별로 할게없는거잖아
