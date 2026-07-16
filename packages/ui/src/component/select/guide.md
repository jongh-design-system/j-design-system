---
name: select
platform: web
---

# Select

## Overview

Trigger에 현재 값을 보여 주고, 열린 listbox의 Item 중 하나를 선택하는 컨트롤이다. Item이 선택되면 Trigger의 Value, Indicator, form 값이 같은 선택 값으로 동기화된다.

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
- 문자를 입력하면 해당 문자열로 시작하는 enabled Item으로 focus를 이동한다.
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

.select__value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__icon {
  flex-shrink: 0;
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
  padding-inline: {spacing.indicator-clearance} {spacing.item-end};
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

.select__item-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Engineering notes

- Trigger의 실제 너비를 `--select-trigger-width`, viewport에서 사용 가능한 높이를 `--select-available-height`에 넣어 popup 크기에 사용한다.
- popup 위치 계산은 viewport 경계와 Trigger 위치를 기준으로 위·아래 배치 방향과 `--select-transform-origin`을 결정한다. CSS에서 위치 계산을 복제하지 않는다.
- Indicator를 absolute 배치하고 Item의 시작 padding을 확보하면 선택 유무에 따라 Label이 좌우로 움직이지 않는다.
- `Value`의 `min-width: 0`과 ellipsis는 긴 선택값이 Icon을 밀어내거나 Trigger 폭을 넘는 것을 막는다.
- `ItemText`의 `min-width: 0`과 ellipsis는 긴 Label이 Indicator 영역을 밀어내는 것을 막는다.
- 스크롤은 Viewport만 소유한다. Content까지 스크롤 컨테이너로 만들지 않는다.

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
