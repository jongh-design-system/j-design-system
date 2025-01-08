import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { createStyleContext } from "@utils/createStyleContext"
import { avatar } from "@styled-system/recipes"
import type {
  Assign,
  HTMLStyledProps,
  ComponentProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(avatar)

export const Root = withProvider<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof AvatarPrimitive.Root>>
>(AvatarPrimitive.Root, "root")

export const Image = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<"img">, ComponentProps<typeof AvatarPrimitive.Image>>
>(AvatarPrimitive.Image, "image")

export const Fallback = withContext<
  HTMLSpanElement,
  Assign<
    HTMLStyledProps<"span">,
    ComponentProps<typeof AvatarPrimitive.Fallback>
  >
>(AvatarPrimitive.Fallback, "fallback")
