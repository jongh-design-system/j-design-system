import {
  useLayoutEffect,
  useState,
  type ComponentProps,
  type HTMLAttributes,
} from "react"

type Status = "loading" | "loaded" | "error"

export interface UseAvatarStatusProps {
  src?: string
  onStatusChange?: (status: Status) => void
}

export const useAvatarStatus = ({
  src,
  onStatusChange,
}: UseAvatarStatusProps) => {
  const [status, setStatus] = useState<Status>("loading")

  useLayoutEffect(() => {
    if (!src) {
      setStatus("error")
      return
    }
    let isMounted: boolean = true
    const image = new window.Image()

    const updateStatus = (status: Status) => () => {
      if (!isMounted) return
      setStatus(status)
      onStatusChange?.(status)
    }

    setStatus("loading")

    image.src = src
    image.onload = updateStatus("loaded")
    image.onerror = updateStatus("error")

    return () => {
      isMounted = false
    }
  }, [src])

  return status
}

type DataAttr = Record<`data-${string}`, string | undefined>

const elementProps = (props: HTMLAttributes<HTMLElement> & DataAttr) => props

const imgProps = (props: ComponentProps<"img"> & DataAttr) => props

interface UseAvatarProps extends UseAvatarStatusProps {}
export const useAvatar = ({ src, onStatusChange }: UseAvatarProps) => {
  const status = useAvatarStatus({ src, onStatusChange })
  const isLoaded = status === "loaded"
  return {
    getRootProps() {
      return elementProps({
        "data-loading-state": status,
      })
    },
    getImgProps() {
      return imgProps({
        hidden: !isLoaded,
        "data-visible": `${isLoaded}`,
        src,
      })
    },
  }
}
