"use client"

import { css } from "@styled-system/css"
import { type ComponentProps, memo, useRef, useState } from "react"

import Check from "@/components/icons/check"
import Copy from "@/components/icons/copy"

// Children을 memo로 감싸서 불필요한 리렌더링 방지
const PreContent = memo(
  ({ children, className, ...props }: ComponentProps<"pre">) => {
    return (
      <pre
        {...props}
        className={`${className} ${css({ p: "4", overflow: "auto" })}`}
      >
        {children}
      </pre>
    )
  },
)
PreContent.displayName = "PreContent"

export const CodeBlock = ({
  className = "",
  children,
  ...props
}: ComponentProps<"pre">) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const preRef = useRef<HTMLPreElement>(null)

  // 코드 복사 버튼 이벤트 핸들러
  const handleClickCopy = async () => {
    const code = preRef.current?.textContent // 코드 블록 내용 추출

    if (code) {
      setIsLoading(true)
      await navigator.clipboard.writeText(code) // 클립보드에 복사
      setIsLoading(false)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    }
  }

  return (
    <div
      className={css({
        position: "relative",
        mt: "4",
        mb: "4",
        bg: "code",
        border: "base",
        rounded: "xl",
        overflow: "hidden",
        shadow: "card",
      })}
    >
      <button
        disabled={isCopied || isLoading}
        aria-label={isCopied ? "Copied!" : "Copy code"}
        onClick={handleClickCopy}
        className={css({
          position: "absolute",
          right: "3",
          top: "3",
          display: "flex",
          h: "fit-content",
          w: "fit-content",
          alignItems: "center",
          rounded: "md",
          px: "2",
          py: "2",
          bg: "background/80",
          color: "muted.foreground",
          cursor: "pointer",
          zIndex: 10,
          transition: "all",
          transitionDuration: "fast",
          border: "base",
          _hover: {
            bg: "background",
            color: "foreground",
          },
          _disabled: {
            opacity: 0.6,
            cursor: "default",
          },
          _focusVisible: {
            outline: "2px solid",
            outlineColor: "primary",
            outlineOffset: "2px",
          },
        })}
      >
        {isCopied ? <Check /> : <Copy />}
      </button>
      <PreContent ref={preRef} {...props} className={className}>
        {children}
      </PreContent>
    </div>
  )
}
