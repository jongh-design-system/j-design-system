import { Tabs as TabsPrimitive } from "radix-ui"
import { createStyleContext } from "@utils/createStyleContext"
import { tabs } from "@styled-system/recipes"
import type {
  Assign,
  HTMLStyledProps,
  ComponentProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(tabs)

export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.Root>>
>(TabsPrimitive.Root, "root")
export const List = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.List>>
>(TabsPrimitive.List, "list")
export const Trigger = withContext<
  HTMLButtonElement,
  Assign<
    HTMLStyledProps<"button">,
    ComponentProps<typeof TabsPrimitive.Trigger>
  >
>(TabsPrimitive.Trigger, "trigger")
export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.Content>>
>(TabsPrimitive.Content, "content")
