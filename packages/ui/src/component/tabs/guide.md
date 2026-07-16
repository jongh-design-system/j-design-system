---
name: tabs
platform: web
---

# Tabs

## Overview

List의 Trigger가 서로 관련된 Content 중 하나를 active 패널로 선택한다. active 값, Trigger focus, `aria-selected`, Content 표시를 함께 바꾸고, 좁은 화면에서도 각 Trigger의 크기를 유지한다.

## Anatomy

```text
Root
├─ List
│  └─ Trigger
└─ Content
```

각 Trigger는 정확히 하나의 Content를 가리킨다. 한 시점에는 하나의 Trigger와 연결된 Content만 active다.

## Behavior

- Trigger를 클릭하면 연결된 Content가 active가 된다.
- Left·Right로 Trigger focus를 이동하고 처음과 끝에서 순환한다.
- Home과 End는 첫 번째와 마지막 enabled Trigger로 이동한다.
- 기본 자동 활성화에서는 Trigger focus가 이동할 때 Content도 바로 바뀐다. 수동 활성화로 설정하면 Enter 또는 Space에서만 Content를 바꾼다.
- disabled Trigger는 focus 이동과 선택에서 제외한다.

## CSS

```css
.tabs {
  min-width: 0;
}

.tabs__list {
  isolation: isolate;
  display: flex;
  align-items: center;
  gap: {spacing.gap};
  max-width: 100%;
  padding: {spacing.list};
  overflow-x: auto;
  color: {color.fg.muted};
  background: {color.bg};
  border-radius: {radius};
  scrollbar-width: none;
}

.tabs__list::-webkit-scrollbar {
  display: none;
}

.tabs__trigger {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  min-height: {layout.tab-height};
  padding-inline: {spacing.inline};
  color: inherit;
  font: {typography.label};
  white-space: nowrap;
  background: transparent;
  border: 0;
  border-radius: {radius.item};
  cursor: pointer;
  transition:
    color {motion.duration} {motion.easing},
    background-color {motion.duration} {motion.easing},
    box-shadow {motion.duration} {motion.easing};
}

.tabs__trigger[aria-selected="true"] {
  color: {color.fg.selected};
  background: {color.bg.selected};
  box-shadow: {elevation};
}

.tabs__trigger:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: calc({accessibility.focus-offset} * -1);
}

.tabs__trigger:disabled {
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}

.tabs__content {
  min-width: 0;
  margin-top: {spacing.content};
}
```

## Engineering notes

- Trigger를 `flex: none`으로 유지하고 List가 수평 scroll을 소유하게 하면 좁은 화면에서 Label과 hit area가 눌리지 않는다.
- `transition: all`은 layout 속성까지 예상치 않게 보간하므로 실제로 바뀌는 color, background, shadow만 지정한다.
- 자동 활성화는 focus 이동마다 Content를 바꾸므로 네트워크 요청이나 무거운 렌더링이 있으면 키보드 탐색을 지연시킨다.

## Accessibility

- List는 `tablist`, Trigger는 `tab`, Content는 `tabpanel` 역할을 가진다.
- active Trigger만 `aria-selected="true"`이고 Tab 순서에 들어간다.
- Trigger와 Content를 `aria-controls`, `aria-labelledby`, 고유 id로 연결한다.
- Content 안에 focus 가능한 요소가 없으면 Content 자체를 Tab 순서에 포함한다.

## Tests

- 클릭과 방향키로 active Trigger와 Content가 함께 바뀌는지 확인한다.
- Home, End, 처음·끝 순환과 disabled 건너뛰기를 확인한다.
- 자동·수동 활성화 정책을 각각 확인한다.
- ARIA role, selected 상태, Trigger·Content 연결을 확인한다.
- 긴 Label과 좁은 viewport에서 수평 scroll과 focus 노출을 확인한다.
- controlled 값 변경이 active Trigger와 Content에 함께 반영되는지 확인한다.
