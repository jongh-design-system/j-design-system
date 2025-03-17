"use client"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

import Lightmode from "@/components/icons/lightmode"
import { useIsMounted } from "@/hooks/useIsMounted"

export const ThemeToggleButton = () => {
  const isMounted = useIsMounted()
  const { theme, setTheme } = useTheme()
  const handleToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }
  console.log(theme, isMounted)
  if (!isMounted) {
    return null
  }
  if (theme === "light") {
    return (
      <motion.button
        key="dark"
        onClick={handleToggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Lightmode />
      </motion.button>
    )
  }
  if (theme === "dark") {
    return (
      <motion.button
        key="dark"
        onClick={handleToggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Lightmode />
      </motion.button>
    )
  }
}
