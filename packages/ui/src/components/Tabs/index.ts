"use client"
import { Tab, TabProps } from "./Tab"
import { TabContent, TabContentProps } from "./TabContent"
import { TabIndicator, TabIndicatorProps } from "./TabIndicator"
import { TabList, TabListProps } from "./TabList"
import { TabItem, TabItemProps } from "./TabList"
import { type TabsVariantProps, tabs } from "styled-system/recipes"
import type { Assign, HTMLStyledProps } from "styled-system/types"
import { createStyleContext } from "../../utils/createStyleContext"

const { withProvider, withContext } = createStyleContext(tabs)

const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<"div">, TabProps>, TabsVariantProps>
>(Tab, "root")

const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, TabContentProps>
>(TabContent, "content")

const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, TabIndicatorProps>
>(TabIndicator, "indicator")

const List = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, TabListProps>
>(TabList, "list")

const Item = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<"button">, TabItemProps>
>(TabItem, "item")

export const Tabs = Object.assign(Root, {
  Content,
  List,
  Item,
  Indicator,
})
