import { css } from "@styled-system/css"
import { styled } from "@styled-system/jsx"
import type { ReactNode } from "react"

import { Aside } from "@/components/aside"

const asideConfig = [
  {
    title: "get started",
    items: [
      {
        title: "introduction",
        href: "/docs/introduction",
      },
      {
        title: "installation",
        href: "/docs/installation",
      },
    ],
  },
]

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
      <Aside metaData={asideConfig} />
      <styled.main width="100%" pos="relative" px="4">
        {children}
      </styled.main>
    </div>
  )
}
