import { css, cx } from "@styled-system/css"
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
        maxH: "650px",
        overflow: "hidden",
      })}
      defaultValue="npm"
    >
      <Tabs.List
        className={flex({
          w: "full",
          display: "flex",
          justifyContent: "flex-start",
        })}
      >
        {packageManagers.map((pm) => (
          <Tabs.Trigger value={pm} key={pm} className={css({})}>
            {pm}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {packageManagers.map((pm) => (
        <Tabs.Content
          value={pm}
          key={pm}
          className={css({
            bg: "card",
            color: "card.foreground",
          })}
        >
          <pre
            className={cx(
              css({
                textStyle: "body2",
              }),
              "shiki github-dark",
            )}
          >
            <code dangerouslySetInnerHTML={{ __html: `${command[pm]}` }} />
          </pre>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
