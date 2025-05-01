"use client"

import { css } from "@styled-system/css"
import { type ComponentProps, memo, useRef, useState } from "react"

import Check from "@/components/icons/check"
import Copy from "@/components/icons/copy"

// Children을 memo로 감싸서 불필요한 리렌더링 방지
const PreContent = memo(
  ({ children, className, ...props }: ComponentProps<"pre">) => {
    return (
      <pre {...props} className={className}>
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
      })}
    >
      <button
        disabled={isCopied || isLoading}
        aria-label={isCopied ? "Copied!" : "Copy code"}
        onClick={handleClickCopy}
        className={css({
          position: "absolute",
          right: "1",
          top: "1",
          display: "flex",
          h: "fit-content",
          w: "fit-content",
          alignItems: "center",
          borderRadius: "sm",
          px: "2",
          py: "2",
          color: "white",
          cursor: "pointer",
          zIndex: 10,
        })}
      >
        {isCopied ? <Check style={{ color: "white" }} /> : <Copy />}
      </button>
      <PreContent ref={preRef} {...props} className={className}>
        {children}
      </PreContent>
    </div>
  )
}
