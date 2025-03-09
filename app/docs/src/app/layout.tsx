import "./globals.css"

import { Container } from "@styled-system/jsx"
import { Geist } from "next/font/google"
import Link from "next/link"

import { Header } from "@/components/header"
import Github from "@/components/icons/github"
import { ThemeProvider } from "@/components/theme/themeProvider"
import { ThemeToggleButton } from "@/components/theme/themeToggleButton"

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
      <body className={`${geistSans.variable}`}>
        <ThemeProvider>
          <Container width="full" height="100vh">
            <Header
              logo={<span>Design System</span>}
              navItems={navItems}
              icons={[
                <Link
                  href="https://github.com/jongh-design-system/j-design-system/"
                  key="github"
                >
                  <Github />
                </Link>,
                <ThemeToggleButton key="toggle" />,
              ]}
            />
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
