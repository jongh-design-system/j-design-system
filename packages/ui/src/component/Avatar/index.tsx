"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { createStyleContext } from "@utils/createStyleContext"
import { avatar } from "@styled-system/recipes"
import type {
  Assign,
  HTMLStyledProps,
  ComponentProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(avatar)

const AvatarRoot = withProvider<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof AvatarPrimitive.Root>>
>(AvatarPrimitive.Root, "root")

const AvatarImage = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<"img">, ComponentProps<typeof AvatarPrimitive.Image>>
>(AvatarPrimitive.Image, "image")

const AvatarFallback = withContext<
  HTMLSpanElement,
  Assign<
    HTMLStyledProps<"span">,
    ComponentProps<typeof AvatarPrimitive.Fallback>
  >
>(AvatarPrimitive.Fallback, "fallback")

const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

export default Avatar
