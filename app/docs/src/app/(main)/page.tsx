"use client"
import { css } from "@styled-system/css"
import { motion, type Variants } from "motion/react"
import Link from "next/link"

import { Button } from "@/components/button"

const containerVariant: Variants = {
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
  hidden: {
    opacity: 0,
  },
}

const letterVariant: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 400,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 400,
    },
  },
}

const message = "Create your project using CLI"

export default function MainPage() {
  return (
    <>
      <motion.h1
        whileInView="visible"
        initial="hidden"
        variants={containerVariant}
        className={css({
          textStyle: "4xl",
        })}
      >
        {Array.from(message).map((m, i) => {
          return (
            <motion.span key={i} variants={letterVariant}>
              {m === " " ? "\u00A0" : m}
            </motion.span>
          )
        })}
      </motion.h1>
      <Button size="lg">
        <Link href="/docs/intro/introduction">Start</Link>
      </Button>
    </>
  )
}
