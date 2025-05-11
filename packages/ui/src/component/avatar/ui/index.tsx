import { createStyleContext } from "@utils/createStyleContext"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { type ComponentPropsWithoutRef, ElementRef } from "react"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(AvatarPrimitive.Root, "root")

export const Image = withContext<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(AvatarPrimitive.Image, "image")

export const Fallback = withContext<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(AvatarPrimitive.Fallback, "fallback")
