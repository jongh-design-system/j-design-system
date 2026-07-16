---
name: dialog
platform: web
---

# Dialog

## Overview

Overlay와 Content를 현재 화면 위의 modal layer에 렌더링해 제한된 정보나 결정을 처리한다. open 상태와 배경 차단, 초기 focus, Dialog 내부 Tab 순환, 닫힌 후 focus 복귀를 하나의 동작으로 유지한다.

## Anatomy

```text
Root
├─ Trigger
└─ Portal
   ├─ Overlay
   └─ Content
      ├─ Header
      │  ├─ Title
      │  └─ Description
      ├─ Information and controls
      ├─ Footer
      └─ Close
```

`Title`은 Dialog의 이름이고 `Description`은 짧은 목적 설명이다. Content의 children은 실제 정보와 작업 컨트롤을 담는다.

## Behavior

- Trigger를 실행하면 Dialog가 열리고 목적에 맞는 내부 요소로 focus가 이동한다.
- Tab과 Shift+Tab은 열린 Dialog 안에서 순환한다.
- Escape와 Close는 Dialog를 닫고, 작업 결과가 다른 위치를 요구하지 않으면 Trigger로 focus를 돌린다.
- Content 바깥의 Overlay를 누르면 Dialog를 닫고 Trigger로 focus를 돌린다.
- 긴 Content는 viewport 안에서 스크롤되며 Title과 주요 동작에 접근할 수 있어야 한다.

## CSS

```css
.dialog__overlay {
  position: fixed;
  inset: 0;
  z-index: {layout.overlay-z};
  background: {color.overlay};
  overscroll-behavior: contain;
}

.dialog__overlay[data-state="open"] {
  animation: dialog-overlay-show {motion.duration} {motion.easing} both;
}

.dialog__overlay[data-state="closed"] {
  pointer-events: none;
  animation: dialog-overlay-hide {motion.duration} {motion.easing} both;
}

.dialog__content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: {layout.modal-z};
  width: min(calc(100vw - 2 * {spacing.viewport}), {layout.dialog-width});
  max-height: calc(100dvh - 2 * {spacing.viewport});
  padding: {spacing.content};
  overflow: auto;
  color: {color.fg};
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  box-shadow: {elevation};
  transform: translate(-50%, -50%);
  transform-origin: center;
}

.dialog__content[data-state="open"] {
  animation: dialog-content-show {motion.duration} {motion.easing} both;
}

.dialog__content[data-state="closed"] {
  pointer-events: none;
  animation: dialog-content-hide {motion.duration} {motion.easing} both;
}

.dialog__header {
  display: flex;
  flex-direction: column;
  gap: {spacing.title-description};
  padding-inline-end: {spacing.close-clearance};
}

.dialog__title {
  margin: 0;
  color: {color.fg.emphasized};
  font: {typography.heading};
}

.dialog__description {
  margin: 0;
  color: {color.fg.muted};
  font: {typography.body};
}

.dialog__close {
  position: absolute;
  top: {spacing.content};
  inset-inline-end: {spacing.content};
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: {spacing.actions};
  margin-top: {spacing.section};
}

@keyframes dialog-overlay-show {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dialog-overlay-hide {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes dialog-content-show {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes dialog-content-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dialog__overlay,
  .dialog__content {
    animation-duration: 0.01ms;
  }
}
```

## Engineering notes

- Portal은 Content가 조상 stacking context와 `overflow`에 잘리는 것을 막는다. Overlay와 Content의 z-index는 같은 modal layer 안에서 관리한다.
- open 상태에서는 문서 배경의 scroll을 잠그고, 닫힐 때 기존 scroll 위치를 유지한 채 잠금을 해제한다.
- `100dvh` 기반 max-height와 `overflow: auto`는 작은 viewport와 확대 상태에서도 Dialog 내부 동작이 화면 밖에 고정되는 것을 막는다.
- Header의 `gap`이 Title과 Description 사이 간격을 소유하고, `padding-inline-end`가 Close와 긴 제목의 겹침을 막는다.
- 초기 focus 대상을 고르는 로직과 Tab을 Dialog 내부에 유지하는 로직을 분리한다. 초기 대상을 바꾸기 위해 focus 순환을 수동 keydown handler로 다시 구현하지 않는다.

## Accessibility

- Content는 `role="dialog"`, `aria-modal="true"`, Title을 가리키는 이름을 가진다.
- Description이 짧고 선형일 때만 `aria-describedby`로 연결한다.
- 긴 문서 구조 전체를 `aria-describedby`로 연결하지 않는다.
- 배경을 실제로 inert하게 만들지 못하면 modal로 표시하지 않는다.
- 보이는 Close 또는 Cancel 동작을 Tab 순서 안에 제공한다.

## Tests

- Trigger, Escape, Close, Overlay 클릭으로 open 상태가 바뀌는지 확인한다.
- open 시 initial focus, Tab 순환, close 후 focus 복귀를 확인한다.
- Title과 Description의 ARIA 연결을 확인한다.
- 배경 클릭·스크롤·Tab이 차단되는지 확인한다.
- 긴 제목, 긴 본문, 작은 viewport, 200% 확대에서 Close와 주요 동작을 확인한다.
- reduced motion에서도 최종 open·closed 상태가 올바른지 확인한다.
