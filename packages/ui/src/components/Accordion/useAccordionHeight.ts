import { useEffect, useRef } from "react"
const ACCORDION_HEIGHT = "--accordion-height" //CSS 변수명- accordion의 높이를 제어하여 animation과 sync 맞춤
export const useAccordionHeight = <T extends HTMLElement>(
  isOpen: boolean,
  duration = 150,
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (element === null) {
      return
    }

    if (isOpen) {
      const height = element.style.getPropertyValue(ACCORDION_HEIGHT)
      if (height === "0" || !height) {
        element.style.setProperty(ACCORDION_HEIGHT, `${element.scrollHeight}px`)
      }
    } else {
      setTimeout(() => {
        element.style.setProperty(ACCORDION_HEIGHT, `${element.scrollHeight}px`)
      }, duration)
    }
  }, [isOpen, duration])

  return ref
}
