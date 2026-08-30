import {
  motion,
  type MotionProps,
  useReducedMotion,
  type Variants,
} from "motion/react"
import {
  Children,
  type ElementType,
  isValidElement,
  memo,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
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

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join(" ")
  }
  if (isValidElement<PropsWithChildren>(children)) {
    return extractTextFromChildren(children.props.children)
  }
  return ""
}

export function AnimateTextBase({
  children,
  by = "lines",
  as = "div",
  animation = "fadeLeft",
  staggerDelay = 0.035,
  itemDelay = 0,
  duration = 0.8,
  className,
  initial = "hidden",
  animate = "show",
  ...rest
}: AnimateTextProps) {
  const MotionContainer = useMemo(() => motion.create(as), [as])
  const shouldReduceMotion = useReducedMotion()

  const selectedAnimationVariant = animationVariants[animation]

  const itemVariants: Variants = {
    hidden: selectedAnimationVariant.hidden,
    show: {
      ...selectedAnimationVariant.show,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
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
      } //for type safety
      return (
        <motion.div
          key={key}
          variants={itemVariants}
          {...(nodeContent.props || {})}
          aria-hidden="true"
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

        return (
          <motion.span aria-hidden="true" key={key} variants={itemVariants}>
            {nodeContent}
          </motion.span>
        )
      })
    }

    if (by === "words") {
      const nodes = segment.split(/(\s+)/)

      return nodes?.map((nodeContent, index) => {
        const key = `segment-word-${index}`
        if (nodeContent.trim() === "") {
          return (
            <span aria-hidden="true" key={key}>
              {nodeContent}
            </span>
          )
        }

        return (
          <motion.span
            aria-hidden="true"
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
  }

  return (
    <MotionContainer
      aria-label={extractTextFromChildren(children)}
      variants={containerVariants}
      initial={shouldReduceMotion ? false : initial}
      animate={shouldReduceMotion ? undefined : animate}
      className={className}
      {...rest}
    >
      {by === "lines" ? renderLineItems() : renderItems(by)}
    </MotionContainer>
  )
}
/**
 * Children constraints depend on the 'by' prop value.
 *
 * ```tsx
 * // by="lines": Array of React elements
 * <AnimateText by="lines">
 * <div>First line</div>
 * <div>Second line</div>
 * </AnimateText>
 *
 * // by="words" | "chars": String or single element containing string
 * <AnimateText by="words">Split by words</AnimateText>
 * <AnimateText by="chars"><p>Split by characters</p></AnimateText>
 * ```
 */
export const AnimateText = memo(AnimateTextBase)
