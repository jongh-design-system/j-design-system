import * as Tabs from "@/components/tabs"

const packageManagers = ["npm", "pnpm", "yarn"] as const

interface CommandCodeBlockProps {
  command: Record<(typeof packageManagers)[number], string>
}

export function CommandCodeBlock({ command }: CommandCodeBlockProps) {
  return (
    <Tabs.Root
      className="relative max-h-[650px] w-full overflow-hidden"
      defaultValue="npm"
    >
      <Tabs.List className="flex w-full justify-start">
        {packageManagers.map((pm) => (
          <Tabs.Trigger value={pm} key={pm}>
            {pm}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {packageManagers.map((pm) => (
        <Tabs.Content
          value={pm}
          key={pm}
          className="bg-base-200 text-base-content"
        >
          {/* eslint-disable-next-line better-tailwindcss/no-unknown-classes */}
          <pre className="shiki github-dark text-sm/normal">
            <code dangerouslySetInnerHTML={{ __html: `${command[pm]}` }} />
          </pre>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
