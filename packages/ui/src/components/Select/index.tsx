import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react"
import { createContext } from "../../hooks/createContext"
import { useControlledState } from "../../hooks/useControllableState"
import { Slot } from "@radix-ui/react-slot"
import { RovingTabIndexRoot } from "../RovingIndex/RovingTabIndexRoot"
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react-dom"
import {
  useRovingTabIndex,
  useRovingTabIndexContext,
} from "../RovingIndex/useRovingTabIndex"
import {
  getNextFocusableId,
  getPrevFocusableId,
} from "../../utils/getFocusableId"
import { composeRefs } from "../../hooks/useComposedRefs"
import { Primitive } from "src/components/Primitive"

const CONTEXT_NAME = "select"

interface SelectContext {
  isOpen: boolean //option들의 열림/닫힘 여부
  onOpenChange: (Open: boolean) => void
  selected: string | null //option들 중 선택된 value
  onSelectChange: (value: string) => void
  floatingStyles?: CSSProperties
  setFloating: (node: HTMLElement) => void
  setReference: (node: HTMLElement | null) => void
  dir: "horizontal" | "vertical"
}

const [SelectContextProvider, useSelectContext] =
  createContext<SelectContext>(CONTEXT_NAME)

export interface SelectProps extends ComponentPropsWithoutRef<"div"> {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  selected?: string
  onSelectChange?: (value: string) => void
  defaultValue?: string
  children: ReactNode
  dir?: "horizontal" | "vertical"
}

export const SelectRoot = ({
  isOpen,
  onOpenChange,
  defaultOpen,
  selected,
  onSelectChange,
  defaultValue,
  dir = "vertical",
  children,
  ...props
}: SelectProps) => {
  const [open = false, setIsOpen] = useControlledState({
    prop: isOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const [selectedValue, setSelectedValue] = useControlledState({
    prop: selected,
    defaultProp: defaultValue,
    onChange: onSelectChange,
  })

  const { refs, floatingStyles } = useFloating({
    strategy: "absolute",
    open: open,
    middleware: [
      offset(), //trigger와 얼마나 떨어져있는지
      flip(), //화면 밖으로 나가지 않도록
      size({
        apply({ elements, availableHeight }) {
          elements.floating.style.maxHeight = `${availableHeight}px`
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  return (
    <SelectContextProvider
      isOpen={open}
      onOpenChange={setIsOpen}
      selected={selectedValue || null}
      onSelectChange={setSelectedValue}
      setFloating={refs.setFloating}
      setReference={refs.setReference}
      dir={dir}
      floatingStyles={floatingStyles}
    >
      <RovingTabIndexRoot active={selectedValue} dir="vertical">
        <div tabIndex={-1} {...props}>
          {children}
        </div>
      </RovingTabIndexRoot>
    </SelectContextProvider>
  )
}

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof Primitive.button> {
  placeholder?: string
}

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof Primitive.button>,
  SelectTriggerProps
>((props, ref) => {
  const { getOrderedItems } = useRovingTabIndexContext("rovingTabIndex")

  const { setReference, onOpenChange, isOpen, selected } =
    useSelectContext(CONTEXT_NAME)

  const displayText = selected || props.placeholder || ""

  return (
    <Primitive.button
      ref={composeRefs((node) => setReference(node), ref)}
      onClick={(e) => {
        e.preventDefault()
        onOpenChange(!isOpen)
        props?.onClick?.(e)
      }}
      onKeyDown={(e) => {
        setTimeout(() => {
          if (e.key === "ArrowDown") {
            onOpenChange(true)
            getOrderedItems()[0]?.element.focus()
          }
        })
      }}
      {...props}
    >
      <span>{displayText}</span>
    </Primitive.button>
  )
})
export interface SelectPortalProps {
  children: ReactNode
}
export const SelectPortal = ({ children, ...props }: SelectPortalProps) => {
  const { isOpen, floatingStyles, setFloating } = useSelectContext(CONTEXT_NAME)

  if (!isOpen) {
    return null
  }

  return (
    <Slot
      style={floatingStyles}
      ref={(node) => {
        if (node instanceof HTMLElement) {
          setFloating(node)
        }
      }}
      {...props}
    >
      {children}
    </Slot>
  )
}

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof Primitive.li> {
  value: string
}
export const SelectItem = forwardRef<
  React.ElementRef<typeof Primitive.li>,
  SelectItemProps
>(({ children, value, asChild, ...props }, ref) => {
  const { onSelectChange, onOpenChange, dir } = useSelectContext(CONTEXT_NAME)
  const { getOrderedItems, getRovingProps } = useRovingTabIndex(value)

  return (
    <Primitive.li
      {...getRovingProps<typeof Primitive.li>({
        onClick: () => {
          onSelectChange?.(value)
          onOpenChange(false)
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            onSelectChange?.(value)
            onOpenChange(false)
          }
          const items = getOrderedItems()
          let nextItem
          if (dir === "horizontal") {
            if (e.key === "ArrowRight") {
              nextItem = getNextFocusableId(items, value)
            } else if (e.key === "ArrowLeft") {
              nextItem = getPrevFocusableId(items, value)
            }
          }
          if (dir === "vertical") {
            if (e.key === "ArrowDown") {
              nextItem = getNextFocusableId(items, value)
            } else if (e.key === "ArrowUp") {
              nextItem = getPrevFocusableId(items, value)
            }
          }
          nextItem?.element.focus()
        },
      })}
      ref={ref}
      {...props}
    >
      {children}
    </Primitive.li>
  )
})

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Portal: SelectPortal,
  Item: SelectItem,
})
