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
      className="
        sticky top-0 z-10 mx-auto flex h-16 w-full items-center justify-between
        border-b border-base-300 bg-base-100/80 px-6 py-3 backdrop-blur-sm
      "
    >
      <Link href="/" className="text-lg/normal font-semibold">
        {logo}
      </Link>
      <div
        className="
          flex flex-row gap-2
          max-md:hidden
        "
      >
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="
                rounded-md px-3 py-1.5 font-medium text-base-content/60
                transition-colors duration-150
                hover:bg-base-200/50 hover:text-base-content
              "
              prefetch={false}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </div>
      <div className="flex gap-2">{icons.map((icon) => icon)}</div>
    </header>
  )
}
