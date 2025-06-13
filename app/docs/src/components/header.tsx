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
        px: "4",
        py: "2",
        h: "14",
        justify: "space-between",
        align: "center",
        mx: "auto",
        width: "full",
        position: "sticky",
        top: 0,
        zIndex: 10,
      })}
    >
      <Link
        href="/"
        className={css({
          textStyle: "2xl",
          _hover: {
            animationName: "tada",
            animationDuration: "faster",
            animationTimingFunction: "ease-in",
          },
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
                color: "foreground",
                fontWeight: "medium",
                px: 2,
                py: 1,
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
