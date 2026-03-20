import { createStyleContext } from "@jongh/new-system-output/react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider(TabsPrimitive.Root, "root")

export const List = withContext(TabsPrimitive.List, "list")

export const Trigger = withContext(TabsPrimitive.Trigger, "trigger")

export const Content = withContext(TabsPrimitive.Content, "content")
