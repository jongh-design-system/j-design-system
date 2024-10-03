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

const isTouchEvent = (e: TouchEvent | MouseEvent): e is TouchEvent => {
  return e && "touches" in e
}

const isMouseEvent = (e: TouchEvent | MouseEvent): e is MouseEvent => {
  return e && "screenX" in e
}

const getClientX = (
  e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
) => {
  let clientX = 0
  if (isMouseEvent(e.nativeEvent)) {
    clientX = e.nativeEvent.clientX
  } else if (isTouchEvent(e.nativeEvent)) {
    clientX =
      e.nativeEvent.touches.length > 0
        ? e.nativeEvent.touches[0].clientX
        : e.nativeEvent.changedTouches[0].clientX
  }
  return clientX
}

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

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const percentage = getPercentage(innerValue, min, max)

  const handleMouseMove = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    if (!isDragging) return
    //width는 본인의 상위태그여야함..
    const { left, width } = e.currentTarget.getBoundingClientRect()
    let percentage = (getClientX(e) - left) / width
    console.log(left, width)
    percentage = Math.min(Math.max(percentage, 0), 1)
    console.log(percentage)
    const newValue = min + percentage * (max - min)
    setValue(newValue)
  }

  return (
    <>
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
          onPointerDownCapture={handlePointerDown}
          onPointerUpCapture={handlePointerUp}
          onPointerMoveCapture={handleMouseMove}
          onPointerCancelCapture={handlePointerUp}
          style={{
            position: "relative",
            backgroundColor: "black",
            flexGrow: 1,
            borderRadius: "9999px",
            height: "10px",
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
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "100px",
                backgroundColor: "pink",
                opacity: "0.5",
                display: "block",
              }}
            ></span>
          </span>
        </span>
      </span>
      <div style={{ color: "pink" }}>{innerValue}</div>
    </>
  )
}
