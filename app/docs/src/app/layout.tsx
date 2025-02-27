import "./globals.css"

import { css, cx } from "@styled-system/css"
import { Flex } from "@styled-system/jsx"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cx(
          `${geistSans.variable}`,
          css({
            bg: "background",
            color: "foreground",
          }),
        )}
      >
        <ThemeProvider attribute="data-color-mode">
          <Flex direction="column" maxWidth="full" minHeight="100vh">
            {children}
          </Flex>
        </ThemeProvider>
      </body>
    </html>
  )
}
