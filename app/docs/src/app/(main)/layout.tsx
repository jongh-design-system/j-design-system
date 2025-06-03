import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* // px="2"
    // py="16"
    // h="[50%]"
    // className={flex({
    //   direction: "column",
    //   gap: "5",
    // })} */}
      {children}
    </>
  )
}
