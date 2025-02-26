import { center } from "@styled-system/patterns"
import Link from "next/link"

import { Button } from "@/components/button"
import { Header } from "@/components/header"

export default function MainPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Tokens", href: "/tokens" },
    { label: "Guidelines", href: "/guidelines" },
  ]

  return (
    <>
      <Header logo={<span>Design System</span>} navItems={navItems} />
      <main
        className={center({
          flexGrow: "1",
          bg: "gray.800",
        })}
      >
        <Link href="/docs/introduction">
          <Button size="lg">시작하기</Button>
        </Link>
      </main>
    </>
  )
}
