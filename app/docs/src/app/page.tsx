import { center } from "@styled-system/patterns"
import Link from "next/link"

import { Button } from "@/components/button"

export default function MainPage() {
  return (
    <>
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
