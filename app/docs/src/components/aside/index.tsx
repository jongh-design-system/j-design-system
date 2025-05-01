"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { recipe } from "./recipe"

export interface CategoryItems {
  title: string
  slug: string
  permalink: string
}

export interface AsideCategory {
  title: string
  items: CategoryItems[]
}

export interface AsideData {
  [key: string]: AsideCategory
}

export interface AsideProps {
  data: AsideData
}

export function Aside({ data }: AsideProps) {
  const { root, content } = recipe()

  return (
    <aside className={root}>
      <div className={content}>
        {Object.entries(data).map(([key, category]) => (
          <AsideCategory key={key} category={category} />
        ))}
      </div>
    </aside>
  )
}

function AsideCategory({ category }: { category: AsideCategory }) {
  const { section, sectionTitle, navItems } = recipe()

  return (
    <div className={section}>
      <h3 className={sectionTitle}>{category.title}</h3>
      <div className={navItems}>
        {category.items.map((item) => (
          <AsideNavItem key={item.slug} item={item} />
        ))}
      </div>
    </div>
  )
}

function AsideNavItem({
  item,
  level = 1,
}: {
  item: CategoryItems
  level?: number
}) {
  const pathname = usePathname()
  const href = item.permalink

  const isActive = pathname === href + "/" || pathname.endsWith(`/${item.slug}`)
  const { navItem } = recipe({ active: isActive })

  return (
    <div style={{ paddingLeft: level > 1 ? `${8 * level}px` : 0 }}>
      <Link href={href} className={navItem}>
        {item.title}
      </Link>
    </div>
  )
}
