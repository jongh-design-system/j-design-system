"use client"

import { ArrowRightIcon, Terminal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/button"

export default function MainPage() {
  return (
    <section
      className="
        relative flex min-h-[calc(100vh-4rem)] flex-col items-center
        justify-center overflow-hidden bg-base-100 py-16 text-base-content
        before:pointer-events-none before:absolute before:top-0 before:left-1/2
        before:z-0 before:h-full before:w-[200%] before:-translate-x-1/2
        before:bg-[radial-gradient(ellipse_50%_80%_at_50%_-20%,oklch(var(--p)/0.15),transparent)]
        before:content-['']
        md:py-24
      "
    >
      <div
        className="
          relative z-1 flex max-w-3xl flex-col items-center gap-6 px-4
          text-center
        "
      >
        {/* Badge */}
        <span
          className="
            rounded-full bg-primary/10 px-3 py-1 text-sm font-medium
            text-primary
          "
        >
          Design System CLI
        </span>

        {/* Title */}
        <h1
          className="
            text-4xl/normal font-semibold tracking-tight text-base-content
            md:text-6xl/relaxed md:font-bold
          "
        >
          Create your project using CLI
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-base/relaxed text-base-content/60">
          PandaCSS 기반의 타입 세이프한 컴포넌트를 CLI로 쉽게 설치하세요.
          shadcn/ui 스타일의 개발 경험을 제공합니다.
        </p>

        {/* CLI Command */}
        <div
          className="
            flex items-center gap-2 rounded-lg border border-base-300
            bg-base-200 px-4 py-2.5 font-mono text-sm text-base-content/60
          "
        >
          <Terminal size={16} />
          <span>npx @jongh/cli init</span>
        </div>

        {/* Button Group */}
        <div
          className="
            mt-2 flex flex-col gap-3
            sm:flex-row
          "
        >
          <Button asChild>
            <Link href="/docs/intro/introduction">
              Get Started
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components/button">View Components</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
