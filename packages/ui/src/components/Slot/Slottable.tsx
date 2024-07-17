import { ReactNode } from "react"

interface SlottableProps {
  children: ReactNode
}

const Slottable = ({ children }: SlottableProps) => {
  return <>{children}</>
}

export default Slottable
