---
name: button
platform: web
---

# Button

## Overview

제출, 취소, 열기, 삭제처럼 현재 맥락에서 명령을 실행한다. 다른 위치로 이동하는 동작은 Button 모양이어도 link 의미를 사용한다.

## Anatomy

```text
Button
├─ PrefixIcon
├─ Label
└─ SuffixIcon
```

아이콘만 있는 Button은 Label 대신 같은 의미의 접근 가능한 이름을 가진다. `asChild`로 합성할 때도 최종 DOM에는 대화형 요소가 하나만 남는다.

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

.button:hover:not(:disabled) {
  background: {color.bg.hover};
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
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- `flex-shrink: 0`과 최소 높이는 좁은 flex 컨테이너에서도 조작 영역이 찌그러지는 것을 막는다. 긴 Label을 허용해야 하는 화면에서는 Button 자체가 아니라 배치 규칙에서 줄바꿈 정책을 바꾼다.
- 아이콘의 `pointer-events: none`은 이벤트 target이 SVG path로 갈라져 클릭 로직이 불안정해지는 것을 막는다.
- 눌림 피드백은 layout을 다시 계산하는 width·height가 아니라 transform을 사용하고 중심에서 축소한다.
- `asChild`는 스타일 전달 수단이다. button 안에 link나 다른 button을 중첩하지 않는다.

## Accessibility

- 텍스트 또는 `aria-label`로 동작을 설명하는 접근 가능한 이름을 제공한다.
- 키보드 focus 표시를 hover와 별도로 유지한다.
- 색상만으로 위험·선택·disabled 상태를 구분하지 않는다.
- 상태 변경 결과가 Button 밖에서 발생하면 해당 영역의 focus 또는 live announcement 전략을 별도로 제공한다.

## Tests

- 클릭, Enter, Space가 정확히 한 번 handler를 실행하는지 확인한다.
- disabled 상태에서 handler와 submit이 실행되지 않는지 확인한다.
- form 안의 submit, reset, button type을 확인한다.
- 아이콘 전용 Button의 접근 가능한 이름을 확인한다.
- 긴 Label, 양쪽 아이콘, 좁은 flex 부모에서 크기와 overflow를 확인한다.
- focus-visible과 reduced motion 상태를 확인한다.
