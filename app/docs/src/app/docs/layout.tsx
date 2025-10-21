import { css } from "@styled-system/css"
import { styled } from "@styled-system/jsx"
import type { ReactNode } from "react"

import { Aside } from "@/components/aside"
import aside from "@/components/aside/aside.json"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        md: {
          display: "grid",
          gridTemplateColumns: "200px minmax(0,1fr)",
          gap: "2.5",
        },
      })}
    >
      <Aside data={aside} />
      <styled.main
        width="100%"
        maxW="48rem"
        mx="auto"
        pos="relative"
        px="6"
        py="8"
      >
        {children}
      </styled.main>
    </div>
  )
}
