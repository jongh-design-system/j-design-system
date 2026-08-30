"use client"

import { createStyleContext } from "@styled-system/jsx"
import { tabsRecipe } from "@styled-system/recipes"
import { Tabs as TabsPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

const { withContext, withProvider } = createStyleContext(tabsRecipe)

export const Root = withProvider(TabsPrimitive.Root, "root")

export const List = withContext(TabsPrimitive.List, "list")

export const Trigger = withContext(TabsPrimitive.Trigger, "trigger")

const IndicatorPrimitive = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ style, ...props }, forwardedRef) => {
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const [rect, setRect] = useState({ left: 0, width: 0 })

  useImperativeHandle(
    forwardedRef,
    () => indicatorRef.current as HTMLSpanElement,
  )

  useLayoutEffect(() => {
    const indicator = indicatorRef.current
    const list = indicator?.parentElement

    if (!list) return

    const update = () => {
      const activeTrigger = list.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]',
      )

      setRect(
        activeTrigger
          ? { left: activeTrigger.offsetLeft, width: activeTrigger.offsetWidth }
          : { left: 0, width: 0 },
      )
    }

    const mutationObserver = new MutationObserver(update)
    mutationObserver.observe(list, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    })

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(list)
    list
      .querySelectorAll<HTMLElement>('[role="tab"]')
      .forEach((trigger) => resizeObserver.observe(trigger))

    update()

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <span
      {...props}
      aria-hidden="true"
      ref={indicatorRef}
      style={
        {
          ...style,
          "--tabs-indicator-left": `${rect.left}px`,
          "--tabs-indicator-width": `${rect.width}px`,
        } as CSSProperties
      }
    />
  )
})

IndicatorPrimitive.displayName = "TabsIndicator"

export const Indicator = withContext(IndicatorPrimitive, "indicator")

export const Content = withContext(TabsPrimitive.Content, "content")
