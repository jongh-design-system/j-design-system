---
name: slider
platform: web
---

# Slider

## Overview

최소값·최대값·step으로 정의된 숫자 범위를 하나 이상의 Thumb 위치로 표현하고 포인터와 키보드로 조정한다. 각 Thumb의 값, Track 안의 위치, Range 길이, form·ARIA 값을 같은 상태에서 계산한다.

## Anatomy

```text
Root
└─ Track
   ├─ Range
   └─ Thumb
```

범위 Slider는 Thumb을 여러 개 렌더링한다. 각 Thumb은 자신의 값과 접근 가능한 이름을 소유하고, Track과 Range는 시각적 위치를 표현한다.

## Behavior

- Track을 누르면 가장 가까운 Thumb이 해당 step으로 이동한다.
- Thumb drag 중 값은 연속으로 갱신되고, drag 종료 시 commit 이벤트가 한 번 발생한다.
- Arrow는 한 step, Home과 End는 허용 범위의 양 끝으로 이동한다.
- 여러 Thumb은 정렬된 값을 유지하고 설정된 최소 간격을 침범하지 않는다.
- disabled 상태에서는 포인터와 키보드로 값이 바뀌지 않는다.

## CSS

```css
.slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: {layout.control-height};
  touch-action: none;
  user-select: none;
}

.slider__track {
  position: relative;
  flex-grow: 1;
  height: {layout.track-height};
  overflow: hidden;
  background: {color.track};
  border-radius: {radius.full};
}

.slider__range {
  position: absolute;
  height: 100%;
  background: {color.range};
}

.slider__thumb {
  position: relative;
  display: block;
  width: {layout.thumb-size};
  height: {layout.thumb-size};
  background: {color.thumb};
  border: {layout.thumb-border-width} solid {color.stroke};
  border-radius: {radius.full};
  box-shadow: {elevation};
  cursor: grab;
  transform-origin: center;
  transition: transform {motion.duration} {motion.easing};
}

.slider__thumb::before {
  position: absolute;
  inset: calc({spacing.hit-area} * -1);
  content: "";
}

.slider__thumb:active {
  cursor: grabbing;
  transform: scale({motion.active-scale});
}

.slider__thumb:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.slider[data-disabled] {
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}

.slider[data-disabled] .slider__thumb {
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .slider__thumb {
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- `touch-action: none`은 drag gesture가 페이지 pan으로 전환되는 것을 막고, pointer event 한 경로로 마우스·펜·터치를 처리하게 한다.
- 시각 Thumb보다 큰 `::before` hit area를 사용하면 Track 두께와 Thumb 모양을 바꾸지 않고 조작 영역을 확보할 수 있다.
- Thumb 위치와 Range 길이는 CSS에 step 계산을 복제하지 않고 slider logic이 계산한 percentage를 사용한다.
- multi-thumb에서 두 Thumb이 교차할 때 DOM 순서, focus 중인 Thumb, form 값의 인덱스가 서로 어긋나지 않게 한다.

## Accessibility

- 각 Thumb은 slider role, 접근 가능한 이름, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`를 가진다.
- 숫자만으로 의미가 불분명하면 단위가 포함된 `aria-valuetext`를 제공한다.

## Tests

- Track click, Thumb drag, drag commit 횟수를 확인한다.
- Arrow, Home, End와 step snapping을 확인한다.
- min·max 경계와 여러 Thumb의 최소 간격을 확인한다.
- controlled와 uncontrolled 값, form 값이 일치하는지 확인한다.
- disabled 상태를 확인한다.
- 각 Thumb의 이름과 ARIA value, 확대된 hit area를 확인한다.
- touch 입력과 touch 보조 기술에서 drag·값 변경을 확인한다.
