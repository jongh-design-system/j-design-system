"use client"

import { css } from "@styled-system/css"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { recipe } from "./recipe"

export interface AsideItem {
  title: string
  href?: string
  items?: AsideItem[]
  label?: string
  disabled?: boolean
  external?: boolean
}

export interface AsideProps {
  metaData: AsideItem[]
}

export function Aside({ metaData }: AsideProps) {
  const { root, content } = recipe()

  return (
    <aside className={root}>
      <div className={content}>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "6",
          })}
        >
          {metaData.map((item, index) => (
            <AsideNavItem key={index} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}

function AsideNavItem({
  item,
  level = 1,
}: {
  item: AsideItem
  level?: number
}) {
  const pathname = usePathname()
  const { navItem } = recipe({ active: pathname === item.title })

  return (
    <div style={{ paddingLeft: 8 * level }}>
      <Link href={item?.href || "#"} className={navItem}>
        {item.title}
      </Link>
      {item.items?.length &&
        item.items.map((item) => (
          <AsideNavItem key={item.title} item={item} level={level + 1} />
        ))}
    </div>
  )
}
