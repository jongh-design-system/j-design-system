import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"

import * as stories from "../stories/Tabs.stories"
import userEvent from "@testing-library/user-event"

const { Primary } = composeStories(stories)

test("초기 렌더링 시 defaultValue가 존재하면 해당되는 탭이 선택됩니다", async () => {
  await Primary.run({ args: { ...Primary.args } })
  expect(screen.getByText("Tab 1")).toBeDefined()
})

test("클릭 시 해당 tab에 대한 content가 노출됩니다", async () => {
  const user = userEvent.setup()
  await Primary.run({ args: { ...Primary.args } })
  await user.click(screen.getByText("Tab 2"))
  expect(screen.getByText("2번")).toBeDefined()
})

test("arrow key를 통해 탭을 조작할 수 있습니다", async () => {
  const user = userEvent.setup()
  await Primary.run()

  await user.click(screen.getByText("Tab 2"))
  await user.keyboard("{ArrowLeft}")

  expect(document.activeElement).toBe(screen.getByText("Tab 1"))
})
