import { Container } from "@styled-system/jsx"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>
}
