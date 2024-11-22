import { render, screen, fireEvent } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Accordion, Content, Item, Trigger } from "../components"

// 예시 컴포넌트
const AccordionExample = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <Accordion
      value={selectedItems}
      onValueChange={(items) => setSelectedItems(items)}
    >
      <Item value="1">
        <Trigger>1번</Trigger>
        <Content>내용1</Content>
      </Item>
    </Accordion>
  )
}

// 테스트
describe("Accordion with useState", () => {
  it("상태 변경 테스트", async () => {
    render(<AccordionExample />)

    // 초기 상태 확인
    expect(screen.queryByText("내용1")).toBeDefined()

    // 트리거 클릭
    const trigger = screen.getByText("1번")
    await fireEvent.click(trigger)

    // 상태 변경 후 내용 표시 확인
    expect(screen.getByText("내용1")).toBeDefined()
  })

  // 외부에서 상태를 제어하는 경우 테스트
  it("외부 상태 제어 테스트", () => {
    const onValueChange = vi.fn()

    render(
      <Accordion value={["1"]} onValueChange={onValueChange}>
        <Item value="1">
          <Trigger data-testid="trigger-1">1번</Trigger>
          <Content>내용1</Content>
        </Item>
      </Accordion>,
    )
    //Fix: getByText로 찾을 시 multiple error 발생
    const trigger = screen.getByTestId("trigger-1")

    fireEvent.click(trigger)

    expect(onValueChange).toHaveBeenCalledWith([])
  })
})
