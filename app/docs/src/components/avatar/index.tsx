import { css, cx } from "@styled-system/css"
import { Avatar as AvatarPrimitive } from "radix-ui"
import type { ComponentProps } from "react"

import { recipe } from "./recipe"

export const Root = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root>) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Root
      className={cx(css(styles.root), className)}
      {...props}
    />
  )
}

export const Image = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Image
      className={cx(css(styles.image), className)}
      {...props}
    />
  )
}

export const Fallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Fallback
      className={cx(css(styles.fallback), className)}
      {...props}
    />
  )
}
