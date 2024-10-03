import { Slot } from "@radix-ui/react-slot"
import { useAvatar, type UseAvatarStatusProps } from "./useAvatar"
import { forwardRef } from "react"

interface AvatarProps extends UseAvatarStatusProps {
  asChild?: boolean
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { asChild, src, onStatusChange } = props
  const { getRootProps, getImgProps } = useAvatar({ src, onStatusChange })
  const Comp = asChild ? Slot : "span"
  return (
    <Comp ref={ref} {...getRootProps()}>
      <img {...getImgProps()}></img>
    </Comp>
  )
})
