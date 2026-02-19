import type { ReactNode } from "react"

import { Aside } from "@/components/aside"
import aside from "@/components/aside/aside.json"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        flex flex-col
        md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-2.5
      "
    >
      <Aside data={aside} />
      <main
        className="
          relative mx-auto w-full max-w-208 px-4 py-6
          md:px-6 md:py-8
          lg:px-8 lg:py-10
        "
      >
        {children}
      </main>
    </div>
  )
}
