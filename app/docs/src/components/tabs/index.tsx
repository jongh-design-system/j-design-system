import { Tabs as TabsPrimitive } from "radix-ui"

import { createStyleContext } from "@/utils/createStyleContext"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider(TabsPrimitive.Root, "root")
Root.displayName = "Tabs"

export const List = withContext(TabsPrimitive.List, "list")
List.displayName = "Tabs.List"

export const Trigger = withContext(TabsPrimitive.Trigger, "trigger")
Trigger.displayName = "Tabs.Trigger"

export const Content = withContext(TabsPrimitive.Content, "content")
Content.displayName = "Tabs.Content"
