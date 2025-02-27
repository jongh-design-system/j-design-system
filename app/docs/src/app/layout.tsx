import "./globals.css"

import { css, cx } from "@styled-system/css"
import { Flex } from "@styled-system/jsx"
import { Geist } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "next-themes"

import { Header } from "@/components/header"
import Icon from "@/components/icons/icon"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const navItems = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Tokens", href: "/tokens" },
  { label: "Guidelines", href: "/guidelines" },
]

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
        <Header
          logo={<span>Design System</span>}
          navItems={navItems}
          icons={[
            <Link
              href="https://github.com/jongh-design-system/j-design-system/"
              key="github"
            >
              <Icon icon="github" />
            </Link>,
          ]}
        />
        <ThemeProvider attribute="data-color-mode">
          <Flex direction="column" maxWidth="full" minHeight="100vh">
            {children}
          </Flex>
        </ThemeProvider>
      </body>
    </html>
  )
}
