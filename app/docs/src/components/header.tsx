import { css } from "@styled-system/css"
import { Flex } from "@styled-system/jsx"
import { flex } from "@styled-system/patterns"
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
      className={flex({
        px: "6",
        py: "3",
        h: "16",
        justify: "space-between",
        align: "center",
        mx: "auto",
        width: "full",
        position: "sticky",
        top: 0,
        zIndex: 10,
        bg: "background/80",
        backdropFilter: "blur(8px)",
        borderBottom: "base",
      })}
    >
      <Link
        href="/"
        className={css({
          textStyle: "heading1",
        })}
      >
        {logo}
      </Link>
      <Flex
        direction="row"
        gap="2"
        display={{
          base: "flex",
          mdDown: "none",
        }}
      >
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={css({
                color: "muted.foreground",
                fontWeight: "medium",
                px: 3,
                py: 1.5,
                rounded: "md",
                transition: "colors",
                transitionDuration: "fast",
                _hover: {
                  color: "foreground",
                  bg: "muted/50",
                },
              })}
              prefetch={false}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </Flex>
      <Flex gap="2">{icons.map((icon) => icon)}</Flex>
    </header>
  )
}
