"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import { createStyleContext } from "@utils/createStyleContext"
import { tabs } from "@styled-system/recipes"
import type {
  Assign,
  HTMLStyledProps,
  ComponentProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(tabs)

const TabsRoot = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.Root>>
>(TabsPrimitive.Root, "root")
const TabsList = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.List>>
>(TabsPrimitive.List, "list")
const TabsTrigger = withContext<
  HTMLButtonElement,
  Assign<
    HTMLStyledProps<"button">,
    ComponentProps<typeof TabsPrimitive.Trigger>
  >
>(TabsPrimitive.Trigger, "trigger")
const TabsContent = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof TabsPrimitive.Content>>
>(TabsPrimitive.Content, "content")

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})

export default Tabs
