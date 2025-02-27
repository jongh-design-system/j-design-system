import { css } from "@styled-system/css"
import { Flex } from "@styled-system/jsx"
import Link from "next/link"
import { ReactNode } from "react"

interface NavItem {
  label: string | ReactNode
  href: string
}

interface HeaderProps {
  logo: ReactNode
  navItems: NavItem[]
  icons: ReactNode[]
  className?: string
}

export function Header({ logo, navItems, icons }: HeaderProps) {
  return (
    <header
      className={css({
        bg: "background",
        borderBottom: "1px solid token(colors.border)",
        px: "4",
        py: "2",
      })}
    >
      <Flex justify="space-between" align="center" mx="auto" width="full">
        <Link href="/" className={css({ fontSize: "2xl", fontWeight: "bold" })}>
          {logo}
        </Link>
        <Flex align="center" gap="4">
          <nav>
            <Flex
              gap={{ base: 3, mdDown: 3 }}
              direction={{ base: "row", mdDown: "column" }}
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={css({
                      color: "foreground",
                      fontWeight: "medium",
                      _hover: { color: "primary" },
                      textDecoration: "none",
                      px: 2,
                      py: 1,
                    })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </Flex>
          </nav>
          <Flex gap="2" align="center">
            {icons?.map((icon, index) => <div key={index}>{icon}</div>)}
          </Flex>
        </Flex>
      </Flex>
    </header>
  )
}
