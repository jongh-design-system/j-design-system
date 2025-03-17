"use client"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

import Darkmode from "@/components/icons/darkmode"
import Lightmode from "@/components/icons/lightmode"
import { useIsMounted } from "@/hooks/useIsMounted"

import { SwitchCase } from "../switchCase"

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

  return (
    <SwitchCase
      value={theme}
      defaultComponent={
        <motion.button
          key="dark"
          onClick={handleToggle}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Lightmode />
        </motion.button>
      }
      caseBy={{
        light: (
          <motion.button
            key="light"
            onClick={handleToggle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Darkmode />
          </motion.button>
        ),
        dark: (
          <motion.button
            key="dark"
            onClick={handleToggle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Lightmode />
          </motion.button>
        ),
      }}
    />
  )
}
