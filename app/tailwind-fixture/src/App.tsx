import * as Accordion from "@jongh/ui/src/component/accordion/ui"
import * as Avatar from "@jongh/ui/src/component/avatar/ui"
import { Button } from "@jongh/ui/src/component/button/ui"
import {
  type CalendarDay,
  useCalendarState,
} from "@jongh/ui/src/component/calendar/useCalendarState"
import { Checkbox } from "@jongh/ui/src/component/checkbox/ui"
import { Chip } from "@jongh/ui/src/component/chip/ui"
import * as Dialog from "@jongh/ui/src/component/dialog/ui"
import * as Select from "@jongh/ui/src/component/select/ui"
import * as Slider from "@jongh/ui/src/component/slider/ui"
import * as Tabs from "@jongh/ui/src/component/tabs/ui"
import { TextField } from "@jongh/ui/src/component/textfield/ui"
import { useEffect, useState } from "react"

const colorTokens = [
  { name: "bg-canvas", classes: "bg-bg-canvas text-fg-default" },
  { name: "bg-surface", classes: "bg-bg-surface text-fg-default" },
  { name: "bg-subtle", classes: "bg-bg-subtle text-fg-default" },
  { name: "bg-elevated", classes: "bg-bg-elevated text-fg-default" },
  { name: "bg-accent", classes: "bg-bg-accent text-fg-inverse" },
  { name: "danger", classes: "bg-danger-default text-fg-inverse" },
]

const navigation = [
  { href: "#tokens", label: "Tokens" },
  { href: "#components", label: "Components" },
  { href: "#interactive", label: "Interactive" },
]

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <main className="min-h-screen bg-bg-canvas text-fg-default">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--jds-color-bg-accent-active),transparent_28%),radial-gradient(circle_at_80%_10%,var(--jds-color-bg-accent),transparent_20%),linear-gradient(180deg,var(--jds-color-bg-canvas),transparent_22%,var(--jds-color-bg-canvas))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-52 shrink-0 flex-col justify-between rounded-4xl border border-stroke-subtle bg-bg-elevated/95 p-5 shadow-md backdrop-blur lg:flex">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-fg-muted">
                Tailwind 4
              </div>
              <div className="text-title-sm font-black tracking-[-0.04em]">
                JDS Demo
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl border border-transparent px-3 py-2 text-sm text-fg-muted transition hover:border-stroke-subtle hover:bg-bg-subtle hover:text-fg-default"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl border border-stroke-subtle bg-bg-surface p-3">
            <div className="mb-3 text-xs uppercase tracking-[0.18em] text-fg-muted">
              Theme
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={theme === "light" ? "primary" : "secondary"}
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "primary" : "secondary"}
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <section className="overflow-hidden rounded-4xl border border-stroke-subtle bg-bg-elevated/95 shadow-lg backdrop-blur">
            <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Chip>Layered CSS</Chip>
                  <Chip variant="outlined">Tailwind Theme</Chip>
                  <Chip variant="outlined">UI Gallery</Chip>
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.08em] text-fg-default">
                    JDS Tailwind showcase for real component inspection.
                  </h1>
                  <p className="max-w-2xl text-[1rem] leading-7 text-fg-muted sm:text-[1.05rem]">
                    This fixture renders Tailwind utilities and the actual{" "}
                    <code>@jongh/ui</code> components on the same page, so you
                    can check token mapping, layered CSS priority, and component
                    output without Storybook.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button>Primary action</Button>
                  <Button variant="secondary">Secondary action</Button>
                  <Button variant="outline">Read layered CSS</Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {colorTokens.slice(0, 4).map((token) => (
                  <div
                    key={token.name}
                    className={`${token.classes} flex min-h-32 flex-col justify-between rounded-3xl border border-stroke-subtle p-4 shadow-sm`}
                  >
                    <div className="text-xs uppercase tracking-[0.18em] opacity-70">
                      Semantic token
                    </div>
                    <div className="text-body-md font-semibold">
                      {token.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="tokens"
            className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]"
          >
            <article className="rounded-[1.75rem] border border-stroke-subtle bg-bg-elevated p-6 shadow-md">
              <SectionHeader
                eyebrow="Semantic tokens"
                title="Tailwind utility surface"
                description="These blocks are composed entirely with Tailwind classes wired to JDS theme variables."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className={`${token.classes} rounded-[1.25rem] border border-stroke-subtle p-4 shadow-sm`}
                  >
                    <div className="text-xs uppercase tracking-[0.16em] opacity-70">
                      Utility
                    </div>
                    <div className="mt-3 text-body-md font-semibold">
                      {token.name}
                    </div>
                    <div className="mt-2 text-sm opacity-80">
                      bg/text/border classes are reading{" "}
                      <code>var(--jds-...)</code>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <UtilityCard
                  title="rounded-md shadow-md"
                  className="rounded-md bg-bg-surface p-4 shadow-md"
                >
                  Elevated utility stack
                </UtilityCard>
                <UtilityCard
                  title="rounded-full shadow-sm"
                  className="rounded-full bg-bg-subtle px-4 py-3 shadow-sm"
                >
                  Pills and chips
                </UtilityCard>
                <UtilityCard
                  title="duration-fast ease-standard"
                  className="rounded-md bg-bg-accent p-4 text-fg-inverse shadow-md duration-fast ease-standard"
                >
                  Motion tokens
                </UtilityCard>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-stroke-subtle bg-bg-elevated p-6 shadow-md">
              <SectionHeader
                eyebrow="Pattern"
                title="Mini landing composition"
                description="A shadcn-like composition layer that proves the Tailwind side can sit on top of the generated JDS primitives."
              />

              <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-3xl border border-stroke-subtle bg-bg-surface p-5 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.16em] text-fg-muted">
                    Feature stack
                  </div>
                  <div className="mt-3 space-y-4">
                    <div className="rounded-xl bg-bg-subtle p-4">
                      <div className="font-semibold">Color aliasing</div>
                      <div className="mt-2 text-sm text-fg-muted">
                        Semantic color classes come from Tailwind while the
                        actual values still come from JDS variables.
                      </div>
                    </div>
                    <div className="rounded-xl bg-bg-subtle p-4">
                      <div className="font-semibold">Layer ordering</div>
                      <div className="mt-2 text-sm text-fg-muted">
                        JDS components stay intact, then utilities override
                        where you explicitly opt in.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-stroke-subtle bg-bg-surface p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <Avatar.Root size="lg" tone="accent">
                      <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                      <div className="font-semibold text-fg-default">
                        Accent avatar
                      </div>
                      <div className="text-sm text-fg-muted">
                        Slot recipe styles are coming from{" "}
                        <code>all.layered.css</code>.
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Chip>Default chip</Chip>
                    <Chip variant="outlined">Outlined chip</Chip>
                    <Chip size="sm">Compact chip</Chip>
                  </div>

                  <div className="mt-5 rounded-xl border border-dashed border-stroke-subtle bg-bg-canvas p-4 text-sm text-fg-muted">
                    The page itself is styled with Tailwind utilities. The
                    components inside keep their JDS recipe output.
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section id="components" className="space-y-8">
            <article className="rounded-[1.75rem] border border-stroke-subtle bg-bg-elevated p-6 shadow-md">
              <SectionHeader
                eyebrow="Components"
                title="Core UI gallery"
                description="Actual @jongh/ui components arranged in one page instead of isolated stories."
              />

              <div className="grid gap-6 xl:grid-cols-2">
                <Card title="Buttons">
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link button</Button>
                  </div>
                </Card>

                <Card title="Inputs">
                  <div className="space-y-4">
                    <TextField
                      id="fixture-search"
                      label="Search the fixture"
                      placeholder="Try a query"
                      helperText="Base state driven by generated recipe classes."
                    />
                    <TextField
                      id="fixture-error"
                      label="Negative state"
                      placeholder="Validation example"
                      helperText="This field uses semantic negative state output."
                      status="negative"
                    />
                  </div>
                </Card>

                <Card title="Selection">
                  <div className="space-y-4">
                    <Checkbox
                      label="Enable release mode"
                      checked={checked}
                      onCheckedChange={(next) => setChecked(Boolean(next))}
                    />
                    <Checkbox variant="ghost" label="Ghost checkbox" />
                    <div className="text-sm text-fg-muted">
                      Current controlled state:{" "}
                      {checked ? "checked" : "unchecked"}
                    </div>
                  </div>
                </Card>

                <Card title="Select">
                  <div className="max-w-xs">
                    <Select.Root defaultValue="react">
                      <Select.Trigger>
                        <Select.Value placeholder="Select a stack" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="react">React</Select.Item>
                          <Select.Item value="tailwind">Tailwind</Select.Item>
                          <Select.Item value="radix">Radix</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </Card>

                <Card title="Tabs">
                  <Tabs.Root defaultValue="preview">
                    <Tabs.List>
                      <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                      <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
                      <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="preview">
                      Tailwind utilities and JDS components share the same page.
                    </Tabs.Content>
                    <Tabs.Content value="tokens">
                      Semantic color, radius, shadow, and motion tokens are
                      wired to Tailwind.
                    </Tabs.Content>
                    <Tabs.Content value="notes">
                      Layer order is fixed with
                      theme/base/jds-base/components/jds-components/utilities.
                    </Tabs.Content>
                  </Tabs.Root>
                </Card>

                <Card title="Accordion">
                  <Accordion.Root
                    type="single"
                    collapsible
                    defaultValue="usage"
                  >
                    <Accordion.Item value="usage">
                      <Accordion.Trigger>How this page works</Accordion.Trigger>
                      <Accordion.Content>
                        Layered CSS provides the component styles, and Tailwind
                        uses theme aliases to generate utilities.
                      </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="result">
                      <Accordion.Trigger>What to inspect</Accordion.Trigger>
                      <Accordion.Content>
                        Check color cards, dialog overlay, slider track, and
                        button variants in both light and dark themes.
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                </Card>

                <Card title="Slider">
                  <div className="px-3 py-4">
                    <Slider.Root defaultValue={[35]} max={100} step={1}>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumb aria-label="Progress" />
                    </Slider.Root>
                  </div>
                </Card>
              </div>
            </article>
          </section>

          <section
            id="interactive"
            className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]"
          >
            <article className="rounded-[1.75rem] border border-stroke-subtle bg-bg-elevated p-6 shadow-md">
              <SectionHeader
                eyebrow="Interactive"
                title="Dialog and calendar"
                description="A few richer interactions to check portal styling, motion, and stateful layouts."
              />

              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <Card title="Dialog">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button>Open dialog</Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Release preview</Dialog.Title>
                        <Dialog.Description>
                          This dialog is coming from <code>@jongh/ui</code> and
                          should keep its overlay/content styling under the
                          Tailwind path.
                        </Dialog.Description>
                      </Dialog.Header>
                    </Dialog.Content>
                  </Dialog.Root>
                </Card>

                <Card title="Calendar harness">
                  <CalendarPreview />
                </Card>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-stroke-subtle bg-bg-elevated p-6 shadow-md">
              <SectionHeader
                eyebrow="Checklist"
                title="What to verify visually"
                description="This page is meant to be opened while iterating on the Tailwind extension."
              />

              <div className="space-y-3">
                {[
                  "Semantic color utilities update correctly between light and dark.",
                  "Tailwind utility classes can override the default JDS component surfaces.",
                  "Portal-based components like Dialog keep their overlay and content tokens.",
                  "Form controls, tabs, accordion, slider, and select all preserve recipe styling.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-stroke-subtle bg-bg-surface px-4 py-3 text-sm text-fg-muted shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-5 space-y-2">
      <div className="text-xs uppercase tracking-[0.18em] text-fg-muted">
        {eyebrow}
      </div>
      <h2 className="text-[1.6rem] font-black tracking-[-0.04em] text-fg-default">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-6 text-fg-muted">{description}</p>
    </div>
  )
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-3xl border border-stroke-subtle bg-bg-surface p-5 shadow-sm">
      <div className="mb-4 text-sm font-semibold text-fg-default">{title}</div>
      {children}
    </div>
  )
}

function UtilityCard({
  title,
  className,
  children,
}: {
  title: string
  className: string
  children: React.ReactNode
}) {
  return (
    <div className={`${className} border border-stroke-subtle`}>
      <div className="text-xs uppercase tracking-[0.16em] text-fg-muted">
        {title}
      </div>
      <div className="mt-3 text-sm">{children}</div>
    </div>
  )
}

function CalendarPreview() {
  const calendar = useCalendarState({
    selectionMode: "single",
    defaultViewDate: new Date(2026, 2, 1),
    weekStart: 1,
    locale: "en-US",
  })

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(calendar.current)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => calendar.navigate.month(-1)}
        >
          Prev
        </Button>
        <div className="text-sm font-semibold">{monthLabel}</div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => calendar.navigate.month(1)}
        >
          Next
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.12em] text-fg-muted">
        {calendar.weekdays.map((weekday, index) => (
          <div key={`${weekday}-${index}`}>{weekday}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendar.days.map((day) => (
          <CalendarDayButton
            key={toIsoDate(day.date)}
            day={day}
            onSelect={calendar.select.date}
          />
        ))}
      </div>
    </div>
  )
}

function CalendarDayButton({
  day,
  onSelect,
}: {
  day: CalendarDay
  onSelect: (date: Date) => void
}) {
  const className = [
    "flex h-10 items-center justify-center rounded-xl border text-sm transition",
    day.isOutsideMonth
      ? "border-transparent text-fg-subtle opacity-60"
      : "border-stroke-subtle bg-bg-surface text-fg-default hover:bg-bg-subtle",
    day.isSelected ? "border-stroke-accent bg-bg-accent text-fg-inverse" : "",
    day.isDisabled ? "pointer-events-none opacity-40" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(day.date)}
      disabled={day.isDisabled}
      aria-label={toIsoDate(day.date)}
    >
      {day.day}
    </button>
  )
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
