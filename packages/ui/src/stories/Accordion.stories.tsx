import { css } from "jh-generated/css"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion/Accordion.tsx"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "@storybook/preview-api"
export default {
  title: "Accordion",
  component: Accordion,
  // parameters: {
  //   layout: "centered",
  // },
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
}
