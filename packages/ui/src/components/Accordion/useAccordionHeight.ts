import { useEffect, useRef } from "react"

export const useAccordionHeight = <T extends HTMLElement>(
  isOpen: boolean,
  duration = 150,
) => {
  const contentRef = useRef<T>(null)
  useEffect(() => {
    const element = contentRef.current
    if (element === null || !element.parentElement) {
      return
    }
    const { parentElement } = element
    if (isOpen) {
      parentElement.style.display = "block"

      const height = element.style.getPropertyValue("--accordion-height")

      if (height === "0" || !height) {
        element.parentElement!.style.setProperty(
          "--accordion-height",
          `${element.clientHeight}px`,
        )
      }
    } else {
      setTimeout(() => {
        parentElement.style.display = "none"
        parentElement.style.setProperty(
          "--accordion-height",
          `${element.clientHeight}px`,
        )
      }, duration)
    }
  }, [isOpen, duration])

  return contentRef
}
