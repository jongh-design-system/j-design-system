import * as React from "react"
import { createContext } from "../../hooks/createContext"
import { useControlledState } from "../../hooks/useControllableState"
import { useAccordionHeight } from "./useAccordionHeight"
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent"
import { Slot } from "@radix-ui/react-slot"

const ACCORDION_KEYS = [
  "Home",
  "End",
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
]
export type TAccordionContext = {
  selected?: string[]
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
  refs?: HTMLElement[]
}

const [AccordionProvider, useAccordionContext] =
  createContext<TAccordionContext>("accordion")

export interface AccordionProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  asChild?: boolean
  type?: "single" | "multi"
}
//ref 관련 문제 해결 필요
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { type = "single", ...accordionProps } = props
    if (type === "single") {
      return <SingleAccordion {...accordionProps} ref={ref} />
    }
    if (type === "multi") {
      return <MultiAccordion {...accordionProps} />
    }
  },
)

Accordion.displayName = "Accordion"

interface AccordionImplSingleProps {
  value?: string[] // 현재 선택되어있는 item들을 담아놓는 용도
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  asChild?: boolean
  children?: React.ReactNode
}

const SingleAccordion = React.forwardRef<
  HTMLDivElement,
  AccordionImplSingleProps
>(
  (
    { value, defaultValue = [], onValueChange, children, asChild, ...props },
    forwardedRef,
  ) => {
    const [selected = [], setSelected] = useControlledState({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    const { refs: accordionRefs, handleKeyDown } = useKeyboardEvent({
      keyList: ACCORDION_KEYS,
    })

    const Comp = asChild ? Slot : "div"

    return (
      <AccordionProvider
        selected={selected}
        onItemOpen={(value) => setSelected((_) => [value])}
        onItemClose={() => setSelected((_) => [])}
        refs={accordionRefs.current || []}
      >
        <Comp
          ref={(node) => {
            accordionRefs.current = Array.from(
              node?.children || [],
            ) as HTMLElement[]
            if (typeof forwardedRef === "function") {
              forwardedRef(node)
            } else if (forwardedRef) {
              ;(
                forwardedRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = node
            }
          }}
          onKeyDown={(e) => {
            handleKeyDown(e)
          }}
          {...props}
        >
          {children}
        </Comp>
      </AccordionProvider>
    )
  },
)

interface AccordionImplMultiProps {
  value?: string[] // 현재 선택되어있는 item들을 담아놓는 용도
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  asChild?: boolean
  children?: React.ReactNode
}

const MultiAccordion = React.forwardRef<
  HTMLDivElement,
  AccordionImplMultiProps
>(
  (
    { value, defaultValue, onValueChange, children, asChild, ...props },
    forwardedRef,
  ) => {
    const [selected, setSelected] = useControlledState({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    const handleItemOpen = React.useCallback(
      (item: string) => {
        setSelected((prev = []) => [...prev, item])
      },
      [setSelected],
    )

    const handleItemClose = React.useCallback(
      (item: string) =>
        setSelected((prev = []) => prev.filter((value) => value !== item)),
      [setSelected],
    )

    const { refs: accordionRefs, handleKeyDown } = useKeyboardEvent({
      keyList: ACCORDION_KEYS,
    })

    const Comp = asChild ? Slot : "div"

    return (
      <AccordionProvider
        selected={selected}
        onItemOpen={handleItemOpen}
        onItemClose={handleItemClose}
      >
        <Comp
          ref={(node) => {
            accordionRefs.current = Array.from(
              node?.children || [],
            ) as HTMLElement[]
            if (typeof forwardedRef === "function") {
              forwardedRef(node)
            } else if (forwardedRef) {
              ;(
                forwardedRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = node
            }
          }}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </Comp>
      </AccordionProvider>
    )
  },
)
//AccordionItem
interface TAccordionItemContext {
  isOpen: boolean
  onToggle: () => void
  value?: string
}

const [AccordionItemProvider, useAccordionItemProvider] =
  createContext<TAccordionItemContext>("accordionItem")
export interface AccordionItemProps {
  value: string //unique value
  disabled?: boolean
  children: React.ReactNode
  asChild?: boolean
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, disabled = false, children, asChild, ...props }, forwardedRef) => {
  const { selected, onItemOpen, onItemClose } = useAccordionContext("accordion")

  const isOpen = selected?.includes(value) && !disabled

  const onToggle = () => {
    if (disabled) {
      return
    }
    isOpen ? onItemClose(value) : onItemOpen(value)
  }

  const Comp = asChild ? Slot : "div"

  return (
    <AccordionItemProvider isOpen={!!isOpen} onToggle={onToggle} value={value}>
      <Comp
        ref={forwardedRef}
        data-state={isOpen ? "open" : "close"}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onToggle()
          }
        }}
        {...props}
      >
        {children}
      </Comp>
    </AccordionItemProvider>
  )
})

export interface AccordionTriggerProps extends React.PropsWithChildren {}
export const AccordionTrigger = ({
  children,
  ...props
}: AccordionTriggerProps) => {
  const { onToggle, isOpen, value } = useAccordionItemProvider("accordionItem")
  return (
    <h3 data-state={isOpen ? "open" : "close"} {...props}>
      <span
        onClick={onToggle}
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls={`content-${value}`}
        id={`trigger-${value}`}
      >
        <span>{children}</span>
      </span>
    </h3>
  )
}
//AccordionContent
export interface AccordionContentProps extends React.PropsWithChildren {
  duration?: number
  asChild?: boolean
}
export const AccordionContent = ({
  children,
  duration = 150,
  asChild,
  ...props
}: AccordionContentProps) => {
  const Comp = asChild ? Slot : "div"
  const { isOpen, value } = useAccordionItemProvider("accordionItem")

  const contentRef = useAccordionHeight<HTMLDivElement>(isOpen, duration) //duration 초 뒤에 accordion을 열거나 닫아줌

  if (!isOpen) {
    return null
  }

  return (
    <Comp
      data-state={isOpen ? "open" : "close"}
      id={`content-${value}`}
      aria-labelledby={`trigger-${value}`}
      role="region"
      ref={contentRef}
      {...props}
    >
      {children}
    </Comp>
  )
}
