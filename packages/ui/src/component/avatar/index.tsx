import { createStyleContext } from "@styled-system/jsx"
import { avatarRecipe } from "@styled-system/recipes"
import { Avatar as AvatarPrimitive } from "radix-ui"

const { withContext, withProvider } = createStyleContext(avatarRecipe)

export const Root = withProvider(AvatarPrimitive.Root, "root")

export const Image = withContext(AvatarPrimitive.Image, "image")

export const Fallback = withContext(AvatarPrimitive.Fallback, "fallback")
