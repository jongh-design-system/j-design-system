import "./globals.css"

import { Flex } from "@styled-system/jsx"
import { Geist } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Flex direction="column" maxWidth="full" minHeight="100vh">
          {children}
        </Flex>
      </body>
    </html>
  )
}
