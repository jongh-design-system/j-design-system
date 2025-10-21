"use client"

import { css } from "@styled-system/css"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { MemoizedAnimateText } from "@/components/animateText"
import { Button } from "@/components/button"

export default function MainPage() {
  return (
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
      <div
        className={css({
          display: "flex",
          flexDir: "column",
          gap: 4,
        })}
      >
        <MemoizedAnimateText
          by="chars"
          staggerDelay={0.05}
          duration={0.5}
          animation="fadeLeft"
          className={css({ fontSize: "5xl", textAlign: "center" })}
        >
          Create your project using CLI
        </MemoizedAnimateText>
        <Button size="lg" role="link" className="group" asChild>
          <Link href="/docs/components/accordion">
            <ArrowRightIcon
              size={16}
              className={css({
                transition: "transform",
                transitionProperty: "all",
                transitionDelay: "faster",
                transform: "translateX(-3.5rem)",
                opacity: 0,
                _groupHover: {
                  transform: "translateX(0)",
                  opacity: 1,
                },
              })}
            />
            <span
              className={css({
                transition: "transform",
                transitionDelay: "faster",
                _groupHover: {
                  transform: "translateX(0.25rem)",
                },
              })}
            >
              Get Started
            </span>
          </Link>
        </Button>
      </div>
    </section>
  )
}
