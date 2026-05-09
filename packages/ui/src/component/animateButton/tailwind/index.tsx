import { motion, type Variants } from "framer-motion"
import type { ComponentProps, ComponentRef } from "react"
import { forwardRef } from "react"

import { Button } from "@/component/button/tailwind"

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
      duration: 0.5,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  bounce: {
    y: [0, -6, 0, -3, 0],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  shake: {
    x: [0, -6, 6, -3, 3, 0],
    transition: {
      duration: 0.5,
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

AnimateButton.displayName = "AnimateButton"
