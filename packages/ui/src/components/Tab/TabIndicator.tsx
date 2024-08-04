import { css } from "jh-generated/css"
import { motion } from "framer-motion"

export const TabIndicator = () => {
  return (
    <motion.div
      className={css({
        width: "var(--indicator-width)",
        height: "2px",
        transform: "translateZ(0px)",
        position: "absolute",
        bottom: 0,
        left: `var(--indicator-left)`,
        background: "red_300",
        borderRadius: "rounded",
      })}
    ></motion.div>
  )
}
