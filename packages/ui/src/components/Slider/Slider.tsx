import { forwardRef } from "react"
import { useControlledState } from "../../hooks/useControllableState"
import { cx } from "jh-generated/cx"
import { slider, type SliderVariant } from "jh-generated/recipes"

type SliderProps = {
  min?: number
  max?: number
  className?: string
  step?: number
  value?: number
  setValue?: (value: number) => void
  defaultValue?: number
} & Partial<SliderVariant>

const RANGE_WIDTH: string = "--range-size" //style prop 타입에러로 인해 string타입으로 사용
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (props, ref) => {
    const {
      value,
      setValue,
      defaultValue,
      className,
      orientation,
      max = 100,
      min = 0,
      ...restProps
    } = props
    const [slideValue = min, setSlideValue] = useControlledState({
      prop: value,
      onChange: setValue,
      defaultProp: defaultValue,
    })

    return (
      <>
        <input
          type="range"
          tabIndex={0} //safari에서 focus 잡히지 않아서 추가
          className={cx(slider({ orientation }), className)}
          value={slideValue}
          ref={ref}
          max={max}
          min={min}
          {...restProps}
          style={{
            [RANGE_WIDTH]: `${((slideValue - min) / (max - min)) * 100}% 100%`,
          }}
          onChange={(e) => setSlideValue(Number(e.target.value))}
        />
      </>
    )
  },
)
//FIX : 사파리에서 키보드이벤트 실행 안됨
