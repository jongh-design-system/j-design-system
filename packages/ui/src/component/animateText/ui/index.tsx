import { AnimatePresence, motion, type Variants } from "framer-motion"
import {
  Children,
  type ElementType,
  isValidElement,
  type ReactNode,
} from "react"

type SplitBy = "words" | "chars" | "lines"

function splitTextByNodes(childrenInput: ReactNode, by: SplitBy): ReactNode[] {
  if (by === "lines") {
    return Children.toArray(childrenInput)
  }

  if (typeof childrenInput === "string") {
    if (by === "words") {
      return childrenInput.split(/\s+/).filter((word) => word.length > 0)
    }
    if (by === "chars") {
      return childrenInput.split("")
    }
  }

  if (
    isValidElement(childrenInput) &&
    typeof childrenInput.props.children === "string" &&
    (by === "words" || by === "chars")
  ) {
    const text = childrenInput.props.children
    if (by === "words") {
      return text.split(/\s+/).filter((word: string) => word.length > 0)
    }
    if (by === "chars") {
      return text.split("")
    }
  }

  return []
}

interface AnimateTextProps {
  children?: ReactNode
  by?: SplitBy
  as?: ElementType
  staggerDelay?: number
  itemDelay?: number
  duration?: number
}

const createItemVariants = (duration: number): Variants => ({
  hidden: {
    opacity: 0,
    x: 20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration,
    },
  },
})

const createContainerVariants = (
  staggerDelay: number,
  itemDelay: number,
): Variants => ({
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
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
})

export function AnimateText({
  children,
  by = "lines",
  as = "div",
  staggerDelay = 0.1,
  itemDelay = 0,
  duration = 0.6,
}: AnimateTextProps) {
  const MotionContainer = motion(as)
  const nodes = splitTextByNodes(children, by)

  const itemVariants = createItemVariants(duration)
  const containerVariants = createContainerVariants(staggerDelay, itemDelay)

  const renderLineItems = () => {
    return nodes.map((nodeContent, index) => {
      const key = `line-item-${index}`

      if (isValidElement(nodeContent)) {
        return (
          <motion.div key={key} variants={itemVariants}>
            {nodeContent}
          </motion.div>
        )
      }

      return (
        <motion.div key={key} variants={itemVariants}>
          {nodeContent}
        </motion.div>
      )
    })
  }

  const renderItems = () => {
    return nodes.map((nodeContent, index) => {
      const key = `segment-item-${index}`
      return (
        <motion.span
          key={key}
          variants={itemVariants}
          style={{
            display: "inline-block",
          }}
        >
          {nodeContent}
        </motion.span>
      )
    })
  }

  return (
    <AnimatePresence mode="wait">
      <MotionContainer
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {by === "lines" ? renderLineItems() : renderItems()}
      </MotionContainer>
    </AnimatePresence>
  )
}
