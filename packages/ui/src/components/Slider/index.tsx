import { useState } from "react"
import { useControlledState } from "../../hooks/useControllableState"
type Props = {
  min: number
  max: number
  value: number
  defaultValue?: number
  onChange: (value: number) => void
}

const getPercentage = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100

export const Slider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  defaultValue,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false)

  const [innerValue = 0, setValue] = useControlledState({
    prop: value,
    defaultProp: defaultValue || min,
    onChange,
  })

  const percentage = getPercentage(innerValue, min, max)

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId) //포인터 고정
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
    const { left, width } = e.currentTarget.getBoundingClientRect()
    let percentage = (e.clientX - left) / width
    percentage = Math.min(Math.max(percentage, 0), 1)

    const newValue = min + percentage * (max - min)
    setValue(newValue)
  }

  const handleMouseMove = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    if (!isDragging) return

    const { left, width } = e.currentTarget.getBoundingClientRect()
    let percentage = (e.clientX - left) / width
    percentage = Math.min(Math.max(percentage, 0), 1)

    const newValue = min + percentage * (max - min)
    setValue(newValue)
  }
  //pointerdown -> pointermove -> up/cancel
  return (
    <span
      className="slider-wrapper"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "200px",
        height: "50px",
      }}
    >
      <span
        className="slider-track"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handleMouseMove}
        style={{
          position: "relative",
          backgroundColor: "black",
          flexGrow: 1,
          borderRadius: "9999px",
          height: "15px",
        }}
      >
        <span
          className="slider-value"
          style={{
            backgroundColor: "white",
            borderRadius: "9999px",
            height: "100%",
            position: "absolute",
            width: `${percentage}%`,
          }}
        ></span>
        <span
          className="slider-thumb"
          style={{
            position: "absolute",
            left: `${percentage}%`,
            transform: "translateX(-50%)",
            touchAction: "none",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "15px",
              borderRadius: "100px",
              backgroundColor: "pink",
              opacity: "0.5",
              display: "block",
            }}
          ></span>
        </span>
      </span>
    </span>
  )
}
