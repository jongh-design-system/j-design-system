---
name: button
platform: web
---

# Button

## Overview

한 번의 사용자 입력으로 하나의 명령을 실행하는 native button 컨트롤이다. Label을 기본 콘텐츠로 삼고 필요한 아이콘을 조합하며, default·hover·pressed·focus·disabled 상태에서 같은 배치와 조작 영역을 유지한다.

## Anatomy

```text
Button
├─ PrefixIcon
├─ Label
└─ SuffixIcon
```

Label은 Button이 실행하는 명령을 나타내고, PrefixIcon과 SuffixIcon은 Label의 의미를 보조한다.

## Behavior

- 포인터, Enter, Space로 한 번 실행된다.
- form 안에서 제출 의도가 없으면 `type="button"`을 사용한다.
- disabled 상태는 이벤트와 form 제출을 막고 시각 상태도 함께 바뀐다.

## CSS

```css
.button {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: {spacing.gap};
  min-height: {layout.control-height};
  padding: {spacing.block} {spacing.inline};
  color: {color.fg};
  font: {typography.label};
  white-space: nowrap;
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  cursor: pointer;
  transform-origin: center;
  transition:
    background-color {motion.duration} {motion.easing},
    color {motion.duration} {motion.easing},
    border-color {motion.duration} {motion.easing},
    transform {motion.duration} {motion.easing};
}

@media (hover: hover) and (pointer: fine) {
  .button:hover:not(:disabled) {
    background: {color.bg.hover};
  }
}

.button:active:not(:disabled) {
  transform: scale({motion.pressed-scale});
}

.button:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.button:disabled {
  color: {color.fg.disabled};
  background: {color.bg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}

.button > svg {
  flex-shrink: 0;
  width: {iconography.size};
  height: {iconography.size};
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- `flex-shrink: 0`과 최소 높이는 좁은 flex 컨테이너에서 Button의 조작 영역이 찌그러지는 것을 막는다.
- 눌림 피드백은 layout을 다시 계산하는 width·height가 아니라 transform을 사용하고 중심에서 축소한다.

## Accessibility

- 보이는 Label이 Button의 접근 가능한 이름이 된다. 아이콘만 보이면 같은 명령을 설명하는 `aria-label`을 제공한다.
- 키보드 focus 표시를 hover와 별도로 유지한다.
- disabled는 스타일만 바꾸지 않고 native `disabled` 속성으로 focus·click·form 동작을 함께 막는다.

## Tests

- 클릭, Enter, Space가 정확히 한 번 handler를 실행하는지 확인한다.
- disabled 상태에서 handler와 submit이 실행되지 않는지 확인한다.
- form 안의 submit, reset, button type을 확인한다.
- 아이콘 전용 Button의 접근 가능한 이름을 확인한다.
- 긴 Label, 양쪽 아이콘, 좁은 flex 부모에서 크기와 overflow를 확인한다.
- focus-visible과 reduced motion 상태를 확인한다.
