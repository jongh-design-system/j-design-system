import { forwardRef } from "react"
import { useControlledState } from "../../hooks/useControllableState"
import { cx } from "jh-generated/cx"
import { slider } from "jh-generated/recipes"

type SliderProps = {
  min?: number
  max?: number
  className?: string
  step?: number
  value?: number
  setValue?: (value: number) => void
  defaultValue?: number
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (props, ref) => {
    const { value, setValue, defaultValue, className, ...restProps } = props
    const [slideValue, setSlideValue] = useControlledState({
      prop: value,
      onChange: setValue,
      defaultProp: defaultValue,
    })

    return (
      <input
        type="range"
        className={cx(slider(), className)}
        value={slideValue}
        ref={ref}
        {...restProps}
        onChange={(e) => setSlideValue(Number(e.target.value))}
      />
    )
  },
)
