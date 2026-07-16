---
name: select
platform: web
---

# Select

## Overview

미리 정해진 목록에서 하나의 값을 고르는 select-only control이다. 검색이나 자유 입력이 필요하면 editable Combobox를 별도 계약으로 사용한다.

## Anatomy

```text
Root
├─ Trigger
│  ├─ Value
│  └─ Icon
└─ Portal
   └─ Content
      └─ Viewport
         ├─ Group
         │  ├─ Label
         │  └─ Item
         │     ├─ Indicator
         │     └─ ItemText
         └─ Separator
```

`Value`는 현재 선택 또는 placeholder를 보여 주고, `Item`만 선택 가능한 option이다. Group Label과 Separator는 선택 항목이 아니다.

## Behavior

- Trigger의 포인터, Enter, Space 또는 방향키 입력으로 목록을 연다.
- 목록이 열리면 방향키로 Item을 이동하고 Enter 또는 Space로 값을 확정한다.
- Escape는 이전 값을 유지한 채 목록을 닫고 focus를 Trigger로 돌린다.
- disabled Item은 focus와 선택 대상에서 제외한다.
- 선택 후 Trigger의 Value, form 값, 선택 Indicator가 같은 값을 반영한다.

## CSS

```css
.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: {spacing.gap};
  width: 100%;
  min-height: {layout.control-height};
  padding-inline: {spacing.inline};
  color: {color.fg};
  font: {typography.label};
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  cursor: pointer;
}

.select__trigger:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.select__trigger:disabled {
  color: {color.fg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}

.select__content {
  z-index: {layout.popover-z};
  width: var(--select-trigger-width);
  max-height: min({layout.list-max-height}, var(--select-available-height));
  padding-block: {spacing.list};
  overflow: hidden;
  color: {color.fg};
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  box-shadow: {elevation};
  transform-origin: var(--select-transform-origin);
}

.select__viewport {
  min-width: var(--select-trigger-width);
  max-height: inherit;
  overflow-y: auto;
}

.select__item {
  position: relative;
  display: flex;
  align-items: center;
  min-height: {layout.item-height};
  padding-inline: {spacing.item-end} {spacing.indicator-clearance};
  border-radius: {radius.item};
  cursor: pointer;
  user-select: none;
}

.select__item[data-highlighted] {
  color: {color.fg.highlighted};
  background: {color.bg.highlighted};
  outline: none;
}

.select__item[data-disabled] {
  pointer-events: none;
  opacity: {state.disabled-opacity};
}

.select__indicator {
  position: absolute;
  inset-inline-start: {spacing.item-start};
}
```

## Engineering notes

- Content와 Viewport의 `--select-trigger-width`는 실제 Trigger 너비를 재사용해 목록이 더 좁아지는 것을 막는다. Radix에서는 `--radix-select-trigger-width`와 `--radix-select-content-available-height`를 매핑한다.
- Portal과 positioning primitive가 viewport 충돌, side, transform origin을 계산하고 CSS는 계산된 변수만 소비한다.
- Indicator를 absolute 배치하고 Item의 시작 padding을 확보하면 선택 유무에 따라 Label이 좌우로 움직이지 않는다.
- `overflow`는 Viewport가 소유한다. Content까지 스크롤 컨테이너로 만들면 위치 계산과 내부 scroll button 동작이 섞인다.

## Accessibility

- Trigger는 접근 가능한 이름, 현재 값, expanded 상태와 popup 관계를 전달한다.
- Content는 단일 선택 listbox이고 Item은 option의 selected·disabled 상태를 전달한다.
- popup의 Item은 페이지의 일반 Tab 순서에 각각 추가하지 않는다.
- form에서 필수 값이면 label, name, required, validation message를 함께 연결한다.

## Tests

- 포인터와 키보드로 열고 닫는 흐름을 확인한다.
- 방향키 이동, 선택 확정, Escape 취소, typeahead를 확인한다.
- controlled와 uncontrolled 값, Indicator, form 값이 일치하는지 확인한다.
- disabled Trigger와 Item이 선택되지 않는지 확인한다.
- 긴 목록의 scroll, Trigger 폭, viewport edge collision을 확인한다.
- label, role, selected·expanded 상태를 접근성 검사로 확인한다.
