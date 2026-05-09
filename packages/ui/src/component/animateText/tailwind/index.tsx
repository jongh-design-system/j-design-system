import { motion, type MotionProps, type Variants } from "framer-motion"
import {
  Children,
  type ElementType,
  isValidElement,
  memo,
  type PropsWithChildren,
  type ReactNode,
} from "react"

type SplitBy = "words" | "chars" | "lines"

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight"

interface AnimateTextProps extends MotionProps {
  children?: ReactNode
  by?: SplitBy
  as?: ElementType
  animation?: AnimationType
  staggerDelay?: number
  itemDelay?: number
  duration?: number
  className?: string
}

const animationVariants = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  fadeDown: {
    hidden: {
      opacity: 0,
      y: -30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  fadeLeft: {
    hidden: {
      opacity: 0,
      x: 30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  fadeRight: {
    hidden: {
      opacity: 0,
      x: -30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  },
} as const

const createContainerVariants = (staggerDelay: number, itemDelay: number) => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: itemDelay,
    },
  },
})

function extractTextFromChildren(children: ReactNode) {
  if (typeof children === "string") {
    return children
  }
  if (isValidElement<PropsWithChildren>(children)) {
    return children.props.children as string
  }
}

export function AnimateTextBase({
  children,
  by = "lines",
  as = "div",
  animation = "fadeLeft",
  staggerDelay = 0.05,
  itemDelay = 0,
  duration = 0.4,
  className,
  initial = "hidden",
  animate = "show",
  ...rest
}: AnimateTextProps) {
  const MotionContainer = motion.create(as)

  const selectedAnimationVariant = animationVariants[animation]

  const itemVariants: Variants = {
    hidden: selectedAnimationVariant.hidden,
    show: {
      ...selectedAnimationVariant.show,
      transition: {
        ...selectedAnimationVariant.show.transition,
        duration,
      },
    },
  }

  const containerVariants = createContainerVariants(staggerDelay, itemDelay)

  const renderLineItems = () => {
    const nodes = Children.toArray(children)
    return nodes.map((nodeContent, index) => {
      const key = `line-item-${index}`
      if (!isValidElement(nodeContent)) {
        return null
      }
      return (
        <motion.div
          key={key}
          variants={itemVariants}
          {...(nodeContent.props || {})}
        />
      )
    })
  }

  const renderItems = (by: SplitBy) => {
    const segment = extractTextFromChildren(children)
    if (typeof segment !== "string" || !segment) {
      return null
    }
    if (by === "chars") {
      const nodes = segment.split("")

      return nodes?.map((nodeContent, index) => {
        const key = `segment-char-${index}`

        const MotionComponent = motion.create("span")

        return (
          <MotionComponent key={key} variants={itemVariants}>
            {nodeContent}
          </MotionComponent>
        )
      })
    }

    if (by === "words") {
      const nodes = segment.split(/(\s+)/)

      return nodes?.map((nodeContent, index) => {
        const key = `segment-word-${index}`
        const MotionComponent = motion.create("span")

        if (nodeContent.trim() === "") {
          return <span key={key}>{nodeContent}</span>
        }

        return (
          <MotionComponent
            key={key}
            variants={itemVariants}
            style={{
              display: "inline-block",
            }}
          >
            {nodeContent}
          </MotionComponent>
        )
      })
    }
  }

  return (
    <MotionContainer
      variants={containerVariants}
      initial={initial}
      animate={animate}
      className={className}
      {...rest}
    >
      {by === "lines" ? renderLineItems() : renderItems(by)}
    </MotionContainer>
  )
}

export const AnimateText = memo(AnimateTextBase)
