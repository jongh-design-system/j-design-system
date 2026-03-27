import { motion, type Variants } from "framer-motion"
import type { ComponentProps, ComponentRef } from "react"
import { forwardRef } from "react"

import { Button } from "@/button"

function getSlowMotionDurationSeconds() {
  if (typeof document === "undefined") {
    return 0.28
  }

  const rootStyles = getComputedStyle(document.documentElement)
  const rawDuration = rootStyles
    .getPropertyValue("--jds-primitive-motion-duration-slow")
    .trim()
  const parsedDuration = Number.parseFloat(rawDuration)

  if (!Number.isFinite(parsedDuration)) {
    return 0.28
  }

  if (rawDuration.endsWith("ms")) {
    return parsedDuration / 1000
  }

  return parsedDuration
}

export type AnimateButtonProps = {
  animate: keyof typeof variants
  trigger?: "hover" | "click"
  initialAnimation?: keyof typeof variants
} & ComponentProps<typeof Button>

const variants = {
  initial: {
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
  pulse: {
    scale: [1, 1.05, 1, 1.05, 1],
    transition: {
      duration: getSlowMotionDurationSeconds(),
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  bounce: {
    y: [0, -6, 0, -3, 0],
    transition: {
      duration: getSlowMotionDurationSeconds(),
      ease: "easeOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  shake: {
    x: [0, -6, 6, -3, 3, 0],
    transition: {
      duration: getSlowMotionDurationSeconds(),
      ease: "easeInOut",
    },
  },
  press: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
} satisfies Variants

export const AnimateButton = forwardRef<
  ComponentRef<typeof Button>,
  AnimateButtonProps
>((props, ref) => {
  const { animate, trigger = "hover", initialAnimation, ...restProps } = props

  return (
    <Button ref={ref} {...restProps} asChild>
      <motion.button
        initial="initial"
        animate={initialAnimation || "initial"}
        whileHover={trigger === "hover" ? animate : undefined}
        whileTap={trigger === "click" ? animate : undefined}
        variants={variants}
      >
        {props.children}
      </motion.button>
    </Button>
  )
})
