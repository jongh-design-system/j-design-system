"use client"

import { css } from "@styled-system/css"
import { useEffect, useState } from "react"

import { MemoizedAnimateText } from "@/components/animateText"

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
    <>
      <section
        className={css({
          position: "fixed",
          width: "full",
          inset: 0,
          zIndex: -1,
        })}
      >
        <section
          className={css({
            h: "screen",
            display: "flex",
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
        </section>
      </section>

      <div
        className={css({
          display: "flex",
          bg: "white",
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
    </>
  )
}
