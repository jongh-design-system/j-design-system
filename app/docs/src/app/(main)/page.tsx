"use client"

import { css } from "@styled-system/css"
import { ArrowRightIcon, Terminal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/button"

export default function MainPage() {
  return (
    <section
      className={css({
        minH: "calc(100vh - 4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgColor: "background",
        color: "foreground",
        position: "relative",
        overflow: "hidden",
        py: { base: "16", md: "24" },
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200%",
          height: "100%",
          background:
            "radial-gradient(ellipse 50% 80% at 50% -20%, token(colors.primary/15), transparent)",
          pointerEvents: "none",
          zIndex: 0,
        },
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDir: "column",
          alignItems: "center",
          gap: 6,
          maxW: "3xl",
          px: 4,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        })}
      >
        {/* Badge */}
        <span
          className={css({
            px: 3,
            py: 1,
            rounded: "full",
            bg: "primary/10",
            color: "primary",
            fontSize: "sm",
            fontWeight: "medium",
          })}
        >
          Design System CLI
        </span>

        {/* Title */}
        <h1
          className={css({
            textStyle: { base: "title1", md: "display2" },
            color: "foreground",
            letterSpacing: "tight",
          })}
        >
          Create your project using CLI
        </h1>

        {/* Subtitle */}
        <p
          className={css({
            textStyle: "body1",
            color: "muted.foreground",
            maxW: "xl",
            lineHeight: "relaxed",
          })}
        >
          PandaCSS 기반의 타입 세이프한 컴포넌트를 CLI로 쉽게 설치하세요.
          shadcn/ui 스타일의 개발 경험을 제공합니다.
        </p>

        {/* CLI Command */}
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: 2,
            bg: "muted",
            border: "base",
            rounded: "lg",
            px: 4,
            py: 2.5,
            fontFamily: "mono",
            fontSize: "sm",
            color: "muted.foreground",
          })}
        >
          <Terminal size={16} />
          <span>npx @jongh/cli init</span>
        </div>

        {/* Button Group */}
        <div
          className={css({
            display: "flex",
            flexDirection: { base: "column", sm: "row" },
            gap: 3,
            mt: 2,
          })}
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
