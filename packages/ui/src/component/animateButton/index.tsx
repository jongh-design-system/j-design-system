import { token } from "@styled-system/tokens"
import { motion, useReducedMotion, type Variants } from "motion/react"
import type { ComponentProps, ComponentRef } from "react"
import { forwardRef } from "react"

import { Button } from "@/component/button"

export type AnimateButtonProps = {
  animate: keyof typeof variants
  trigger?: "hover" | "click"
  initialAnimation?: keyof typeof variants
  static?: boolean
} & Omit<ComponentProps<typeof Button>, "asChild">

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
      duration: parseFloat(token("durations.d6")) / 1000,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  bounce: {
    y: [0, -6, 0, -3, 0],
    transition: {
      duration: parseFloat(token("durations.d6")) / 1000,
      ease: "easeOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  shake: {
    x: [0, -6, 6, -3, 3, 0],
    transition: {
      duration: parseFloat(token("durations.d6")) / 1000,
      ease: "easeInOut",
    },
  },
  press: {
    scale: 0.96,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
} satisfies Variants

export const AnimateButton = forwardRef<
  ComponentRef<typeof Button>,
  AnimateButtonProps
>((props, ref) => {
  const {
    animate,
    children,
    disabled,
    initialAnimation,
    static: isStatic,
    trigger = "hover",
    type,
    ...restProps
  } = props
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !disabled && !isStatic && !shouldReduceMotion

  return (
    <Button
      ref={ref}
      {...restProps}
      asChild
      disabled={disabled}
      type={type ?? "button"}
    >
      <motion.button
        initial={shouldAnimate ? "initial" : false}
        animate={shouldAnimate ? (initialAnimation ?? "initial") : undefined}
        whileFocus={shouldAnimate && trigger === "hover" ? animate : undefined}
        whileHover={shouldAnimate && trigger === "hover" ? animate : undefined}
        whileTap={shouldAnimate && trigger === "click" ? animate : undefined}
        variants={variants}
      >
        {children}
      </motion.button>
    </Button>
  )
})
