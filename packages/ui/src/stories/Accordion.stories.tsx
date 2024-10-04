import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion/Accordion.tsx"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "@storybook/preview-api"
import { expect, userEvent, waitFor, within } from "@storybook/test"
export default {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  args: {
    children: (
      <>
        <AccordionItem value="1">
          <AccordionTrigger>1번</AccordionTrigger>
          <AccordionContent>내용1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>2번</AccordionTrigger>
          <AccordionContent>내용2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>3번</AccordionTrigger>
          <AccordionContent>내용2</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
}

export const Controlled: Story = {
  args: {},
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleValueChange = (newSelectedItems: string[]) => {
      setSelectedItems(newSelectedItems)
    }
    return (
      <>
        <Accordion
          value={selectedItems}
          onValueChange={(v) => handleValueChange(v)}
        >
          <AccordionItem value="1">
            <AccordionTrigger>1번</AccordionTrigger>
            <AccordionContent>내용1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>2번</AccordionTrigger>
            <AccordionContent>내용2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>3번</AccordionTrigger>
            <AccordionContent>내용2</AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const accordionItem = canvas.getByText("1번")

    // 첫 번째 클릭으로 "aria-expanded"가 "true"인지 확인하고, content가 렌더링되었는지 확인
    await userEvent.click(accordionItem.parentElement!)
    await waitFor(async () => {
      expect(accordionItem.parentElement?.getAttribute("aria-expanded")).toBe(
        "true",
      )
      const accordionContent = canvas.queryByText("내용1")
      expect(accordionContent).toBeTruthy()
    })

    // 두 번째 클릭으로 "aria-expanded"가 "false"인지 확인하고, content가 렌더링 안되었는지 확인
    await userEvent.click(accordionItem.parentElement!)
    await waitFor(() => {
      expect(accordionItem.parentElement?.getAttribute("aria-expanded")).toBe(
        "false",
      )
      const accordionContent = canvas.queryByText("내용1")
      expect(accordionContent).toBeFalsy()
    })
  },
}
