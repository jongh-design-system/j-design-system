import { createStyleContext } from "@jongh/new-system-output/react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider(AvatarPrimitive.Root, "root")

export const Image = withContext(AvatarPrimitive.Image, "image")

export const Fallback = withContext(AvatarPrimitive.Fallback, "fallback")
