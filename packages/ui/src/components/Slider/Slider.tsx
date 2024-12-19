import { useState, type ComponentPropsWithoutRef } from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { createContext } from "@radix-ui/react-context"
//TODO: props type 관련 정리 및 event composing 필요

const CONTEXT_NAME = "Slider"

const [SliderProvider, useSliderContext] = createContext<{
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: (e: React.PointerEvent) => void
}>(CONTEXT_NAME)

type SliderRootProps = {
  min: number
  max: number
  value: number
  defaultValue?: number
  onChange: (value: number) => void
  children: React.ReactNode
}

const getPercentage = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100

const SliderRoot = ({
  min = 0,
  max = 100,
  value,
  onChange,
  defaultValue,
  children,
  ...props
}: SliderRootProps) => {
  const [isDragging, setIsDragging] = useState(false)

  const [innerValue = 0, setValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue || min,
    onChange,
  })

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
    const { left, width } = e.currentTarget.getBoundingClientRect()
    let percentage = (e.clientX - left) / width
    percentage = Math.min(Math.max(percentage, 0), 1)

    const newValue = min + percentage * (max - min)
    setValue(newValue)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    e.preventDefault()
    if (!isDragging) return

    const { left, width } = e.currentTarget.getBoundingClientRect()
    let percentage = (e.clientX - left) / width
    percentage = Math.min(Math.max(percentage, 0), 1)
    const newValue = min + percentage * (max - min)
    setValue(newValue)
  }

  return (
    <SliderProvider
      min={min}
      max={max}
      value={innerValue}
      onChange={setValue}
      isDragging={isDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        {...props}
      >
        {children}
      </div>
    </SliderProvider>
  )
}

const SliderTrack = ({
  children,
  ...props
}: {
  children?: React.ReactNode
}) => {
  return <span {...props}>{children}</span>
}

const SliderRange = ({ ...props }: ComponentPropsWithoutRef<"span">) => {
  const { min, max, value } = useSliderContext(CONTEXT_NAME)
  const percentage = getPercentage(value, min, max)

  return (
    <span
      {...props}
      style={{
        width: `${percentage}%`,
      }}
    />
  )
}

const SliderThumb = ({ ...props }: ComponentPropsWithoutRef<"span">) => {
  const { min, max, value } = useSliderContext(CONTEXT_NAME)
  const percentage = getPercentage(value, min, max)

  return (
    <span
      {...props}
      style={{
        position: "absolute",
        left: `${percentage}%`,
        transform: "translateX(-50%)",
      }}
    />
  )
}

export const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
})
