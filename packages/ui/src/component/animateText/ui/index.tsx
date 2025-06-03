import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  Children,
  type ElementType,
  isValidElement,
  memo,
  type ReactNode,
} from "react"

type SplitBy = "words" | "chars" | "lines"

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight"

interface AnimateTextProps {
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
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: itemDelay,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
})

function extractTextFromChildren(children: ReactNode) {
  if (typeof children === "string") {
    return children
  } else {
    if (isValidElement(children)) {
      return children.props.children as string
    }
  }
}

export function AnimateTextBase({
  children,
  by = "lines",
  as = "div",
  animation = "fadeUp",
  staggerDelay = 0.1,
  itemDelay = 0,
  duration = 0.6,
  className,
}: AnimateTextProps) {
  const MotionContainer = motion.create(as)

  const itemVariants: Variants = {
    hidden: animationVariants[animation].hidden,
    show: {
      ...animationVariants[animation].show,
      transition: {
        ...animationVariants[animation].show.transition,
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
    if (!segment) {
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
      const nodes = segment.split(/\s+/)

      return nodes?.map((nodeContent, index) => {
        const key = `segment-word-${index}`

        const MotionComponent = motion.create("span")

        return (
          <MotionComponent key={key} variants={itemVariants}>
            {nodeContent}
          </MotionComponent>
        )
      })
    }
  }

  return (
    <AnimatePresence mode="popLayout">
      <MotionContainer
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className={className}
      >
        {by === "lines" ? renderLineItems() : renderItems(by)}
      </MotionContainer>
    </AnimatePresence>
  )
}

export const AnimateText = memo(AnimateTextBase)
