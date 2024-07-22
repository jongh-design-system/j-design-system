import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion/Accordion.tsx"
import type { Meta, StoryObj } from "@storybook/react"
export default {
  title: "Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  args: {
    children: (
      <>
        <AccordionItem value="1">
          <AccordionTrigger>sdfsdf</AccordionTrigger>
          <AccordionContent>내용1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>sdfsdf</AccordionTrigger>
          <AccordionContent>내용2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>sdfsdf</AccordionTrigger>
          <AccordionContent>내용2</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
}
