import { motion, type Variants } from "framer-motion"
import type { ComponentProps, ComponentRef } from "react"
import { forwardRef } from "react"

import { Button } from "@/component/button/ui"

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
    opacity: 1,
    transition: {
      ease: "easeIn",
    },
  },
  pulse: {
    scale: [1, 1.05, 1, 1.05, 1],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
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
