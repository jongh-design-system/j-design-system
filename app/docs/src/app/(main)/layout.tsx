import { Center } from "@styled-system/jsx"
import { flex } from "@styled-system/patterns"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Center
      px="2"
      py="16"
      h="[50%]"
      className={flex({
        direction: "column",
        gap: "5",
      })}
    >
      {children}
    </Center>
  )
}
