import { useEffect, useRef } from "react"

const ACCORDION_HEIGHT = "--accordion-height"

export const useAccordionHeight = <T extends HTMLElement>(isOpen: boolean) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (isOpen) {
      // 열릴 때 높이를 scrollHeight로 설정
      const newHeight = element.scrollHeight
      element.style.setProperty(ACCORDION_HEIGHT, `${newHeight}px`)
      element.style.height = `${newHeight}px`
    } else {
      // 닫힐 때 높이를 0으로 설정
      element.style.setProperty(ACCORDION_HEIGHT, `0px`)
      element.style.height = "0px"
    }
  }, [isOpen])

  return ref
}
