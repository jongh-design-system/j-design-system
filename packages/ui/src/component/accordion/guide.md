---
name: accordion
platform: web
---

# Accordion

## Overview

여러 Item의 제목과 본문을 하나의 목록으로 구성하고, 각 Trigger가 연결된 Content의 open 상태를 제어한다. 단일 모드와 다중 모드 모두 Trigger·Content 연결과 실제 본문 높이를 기준으로 열림·닫힘을 동기화한다.

## Anatomy

```text
Root
└─ Item
   ├─ Header
   │  └─ Trigger
   │     ├─ Label
   │     └─ Icon
   └─ Content
      └─ ContentWrapper
```

`Header`는 문서 계층에 맞는 heading이고 `Trigger`만 그 안의 대화형 요소다. `ContentWrapper`가 본문 여백을 소유하므로 높이를 측정하는 `Content`에는 padding을 두지 않는다.

## Behavior

- `Trigger`를 Enter, Space 또는 포인터로 실행하면 연결된 `Content`가 열린다.
- 단일 모드에서는 새 Item을 열 때 기존 Item을 닫고, 다중 모드에서는 각 Item을 독립적으로 연다.
- 제어·비제어 사용 모두 같은 open 값과 `aria-expanded` 상태를 만든다.
- disabled Item은 포커스와 상태 변경을 받지 않는다.
- 열린 본문의 실제 높이가 바뀌면 전환에 사용하는 측정값도 다시 계산한다.

## CSS

```css
.accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.accordion__item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.accordion__header {
  display: flex;
  margin: 0;
  padding: 0;
  font: inherit;
}

.accordion__trigger {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: {spacing.block} {spacing.inline};
  color: {color.fg};
  font: {typography.label};
  text-align: start;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.accordion__trigger::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  border-radius: {radius.item};
  transition: background-color {motion.duration} {motion.easing};
}

@media (hover: hover) and (pointer: fine) {
  .accordion__trigger:hover:not(:disabled)::before {
    background: {color.bg.hover};
  }
}

.accordion__trigger:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.accordion__trigger:disabled {
  cursor: not-allowed;
}

.accordion__label {
  min-width: 0;
}

.accordion__icon {
  flex-shrink: 0;
  transform: rotate(0deg);
  transform-origin: center;
  transition: transform {motion.duration} {motion.easing};
}

.accordion__trigger[aria-expanded="true"] .accordion__icon {
  transform: rotate(180deg);
}

.accordion__content {
  overflow: hidden;
  color: {color.fg.muted};
  font: {typography.body};
}

.accordion__content[data-state="open"] {
  animation: accordion-expand {motion.duration} {motion.easing};
}

.accordion__content[data-state="closed"] {
  animation: accordion-collapse {motion.duration} {motion.easing};
}

.accordion__content-wrapper {
  padding: {spacing.content};
}

@keyframes accordion-expand {
  from { height: 0; }
  to { height: var(--accordion-content-height); }
}

@keyframes accordion-collapse {
  from { height: var(--accordion-content-height); }
  to { height: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .accordion__content,
  .accordion__icon {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- `ContentWrapper`의 실제 렌더 높이를 측정해 `--accordion-content-height`에 넣는다. 열린 도중 본문 크기가 바뀌면 변경된 높이를 다시 반영한다.
- `overflow: hidden`은 높이 전환 중 본문이 패널 밖에 먼저 보이는 것을 막는다.
- `min-width: 0`은 긴 제목이 아이콘을 밀어내거나 Trigger 폭을 넘는 것을 막는다.
- `isolation: isolate`는 Trigger 배경을 가상 요소로 확장해도 음수 `z-index`가 Item 밖으로 빠져나가지 않게 한다.

## Accessibility

- Trigger는 접근 가능한 이름을 가진 button이며 문서 계층에 맞는 heading 안에 있다.
- Trigger와 Content는 `aria-controls`, `aria-labelledby`, 고유 id로 서로 연결한다.
- `aria-expanded`는 실제 열린 상태와 항상 같다.
- 닫힌 Content의 자식은 숨겨지거나 unmount되어 focus 순서에 남지 않는다.
- Content의 `region`은 패널 수가 많아 landmark가 과도해지지 않을 때만 사용한다.

## Tests

- 클릭, Enter, Space로 열고 닫히는지 확인한다.
- 단일 모드와 다중 모드의 상태 전이를 각각 확인한다.
- controlled 값과 화면·ARIA 상태가 함께 바뀌는지 확인한다.
- disabled Item이 상태를 바꾸지 않는지 확인한다.
- 긴 제목, 중첩 Accordion, 동적 본문 높이를 확인한다.
- reduced motion에서도 본문이 즉시 올바른 최종 상태가 되는지 확인한다.
