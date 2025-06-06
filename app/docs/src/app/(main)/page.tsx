"use client"

import { css } from "@styled-system/css"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { MemoizedAnimateText } from "@/components/animateText"
import { Button } from "@/components/button"

export default function MainPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const scrollPercent = Math.min(scrollTop / windowHeight, 1)
      setScrollY(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const drawerTransform = scrollY * 100

  return (
    <div className={css({ position: "relative" })}>
      <section
        className={css({
          position: "fixed",
          width: "full",
          zIndex: 1,
          top: 0,
          left: 0,
          h: "100vh",
        })}
      >
        <section
          className={css({
            h: "screen",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgColor: "background",
            color: "foreground",
          })}
        >
          <MemoizedAnimateText
            by="chars"
            staggerDelay={0.05}
            duration={0.5}
            animation="fadeRight"
            className={css({ fontSize: "5xl", textAlign: "center" })}
          >
            Create your project using CLI
          </MemoizedAnimateText>
          <Button size="lg" style={{ position: "relative", bottom: "auto" }}>
            <Link href="/docs">Get Started</Link>
            <ArrowRightIcon size={16} />
          </Button>
        </section>
      </section>

      <div
        className={css({
          display: "flex",
          marginTop: "100vh",
          minH: "100vh",
          h: "200vh",
          borderTopRightRadius: "3xl",
          borderTopLeftRadius: "3xl",
          paddingTop: "16",
          paddingX: {
            base: "4",
            md: "8",
          },
          bgColor: "card",
          color: "card.foreground",
          position: "relative",
          zIndex: 2,
        })}
        style={{
          marginTop: `calc(100vh - ${drawerTransform}px)`,
        }}
      >
        <MemoizedAnimateText
          by="chars"
          staggerDelay={0.05}
          duration={0.5}
          animation="fadeLeft"
          className={css({ fontSize: "2xl", textAlign: "center" })}
        >
          준비중입니다
        </MemoizedAnimateText>
      </div>
    </div>
  )
}
