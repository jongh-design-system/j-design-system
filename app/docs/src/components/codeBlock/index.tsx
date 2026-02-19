"use client"

import { type ComponentProps, memo, useRef, useState } from "react"

import Check from "@/components/icons/check"
import Copy from "@/components/icons/copy"

// Children을 memo로 감싸서 불필요한 리렌더링 방지
const PreContent = memo(
  ({ children, className, ...props }: ComponentProps<"pre">) => {
    return (
      <pre
        {...props}
        className={`
          ${className}
          overflow-auto p-4
        `}
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
      className="
        relative mt-4 mb-4 overflow-hidden rounded-xl border border-base-300
        bg-base-200 shadow-md
      "
    >
      <button
        disabled={isCopied || isLoading}
        aria-label={isCopied ? "Copied!" : "Copy code"}
        onClick={handleClickCopy}
        className="
          absolute top-3 right-3 z-10 flex h-fit w-fit cursor-pointer
          items-center rounded-md border border-base-300 bg-base-100/80 px-2
          py-2 text-base-content/60 transition-all duration-150
          hover:bg-base-100 hover:text-base-content
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-primary
          disabled:cursor-default disabled:opacity-60
        "
      >
        {isCopied ? <Check /> : <Copy />}
      </button>
      <PreContent ref={preRef} {...props} className={className}>
        {children}
      </PreContent>
    </div>
  )
}
