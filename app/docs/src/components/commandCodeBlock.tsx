import { css } from "@styled-system/css"
import { flex } from "@styled-system/patterns"

import * as Tabs from "@/components/tabs"

const packageManagers = ["npm", "pnpm", "yarn"] as const

interface CommandCodeBlockProps {
  command: Record<(typeof packageManagers)[number], string>
}

export function CommandCodeBlock({ command }: CommandCodeBlockProps) {
  return (
    <Tabs.Root
      className={css({
        position: "relative",
        w: "full",
        mt: 6,
        maxH: "650px",
        overflow: "hidden",
        rounded: "xl",
        bg: "zinc.950",
        _dark: { bg: "zinc.900" },
      })}
      defaultValue="npm"
    >
      <Tabs.List
        className={flex({
          w: "full",
          display: "flex",
          justifyContent: "flex-start",
          borderBottom: "1px solid",
          borderColor: "zinc.800",
          bgColor: "zinc.900",
          px: 3,
          pt: 2.5,
        })}
      >
        {packageManagers.map((pm) => (
          <Tabs.Trigger
            value={pm}
            key={pm}
            className={css({
              px: 2,
              py: 1,
              color: "zinc.400",
              fontFamily: "mono",
              fontSize: "sm",
            })}
          >
            {pm}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {packageManagers.map((pm) => (
        <Tabs.Content
          value={pm}
          key={pm}
          className={css({
            mt: 0,
            px: 4,
            py: 5,
          })}
        >
          <code
            className={css({
              display: "block",
              fontFamily: "mono",
              fontSize: "sm",
              color: "zinc.50",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            })}
          >
            {command[pm]}
          </code>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
