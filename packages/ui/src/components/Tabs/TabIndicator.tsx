import { motion } from "framer-motion"

export interface TabIndicatorProps {}
export const TabIndicator = ({ ...props }: TabIndicatorProps) => {
  return <motion.div {...props}></motion.div>
}
