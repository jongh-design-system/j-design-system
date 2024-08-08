import { type ReactNode } from "react"
import { useTabContext } from "./useTabContext"
import { motion } from "framer-motion"

interface TabContentProps {
  children: ReactNode
  value: string
}

const tabContentVariant = {
  active: {
    display: "block",
    transition: {
      staggerChildren: 0.2,
    },
  },
  inactive: {
    display: "none",
  },
} as const

const cardVariant = {
  active: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.3,
    },
  },
}
export const TabContent = ({ children, value }: TabContentProps) => {
  const { selected, tabId } = useTabContext("tab")

  const isSelected = selected === value

  return (
    <motion.div
      role="tabpanel"
      tabIndex={0}
      id={tabId + "-tabpanel-" + value}
      data-state={isSelected ? "active" : "inactive"}
      aria-labelledby={tabId + "-tabitem-" + value}
      key={tabId + "-tabpanel-" + value}
      variants={tabContentVariant}
      animate={isSelected ? "active" : "inactive"}
      initial="inactive"
    >
      <motion.div key={value} variants={cardVariant}>
        {isSelected && children}
      </motion.div>
    </motion.div>
  )
}
