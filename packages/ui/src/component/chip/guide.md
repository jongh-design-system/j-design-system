---
name: chip
platform: web
---

# Chip

## Overview

짧은 명령을 작은 면적에 배치하는 button 형태의 컴포넌트다. 현재 구현은 command Chip이며 선택 상태를 소유하지 않는다. 필터 선택은 Checkbox 또는 RadioGroup 의미를 가진 별도 컴포넌트로 만든다.

## Anatomy

```text
Chip
├─ PrefixIcon
├─ Label
└─ SuffixIcon
```

아이콘 전용 Chip은 같은 크기의 정사각 조작 영역과 접근 가능한 이름을 가진다.

## Behavior

- 포인터, Enter, Space로 명령을 한 번 실행한다.
- disabled 상태에서는 focus와 실행을 막는다.
- PrefixIcon과 SuffixIcon은 Label의 의미를 보조하며 별도 클릭 target이 되지 않는다.
- 제거 동작처럼 결과가 즉시 사라지는 경우 다음 논리적 요소로 focus를 이동한다.

## CSS

```css
.chip {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: {spacing.gap};
  min-width: {layout.control-height};
  height: {layout.control-height};
  padding-inline: {spacing.inline};
  color: {color.fg};
  font: {typography.label};
  line-height: 1;
  white-space: nowrap;
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius.full};
  cursor: pointer;
  transition:
    background-color {motion.duration} {motion.easing},
    color {motion.duration} {motion.easing},
    border-color {motion.duration} {motion.easing};
}

.chip:hover:not(:disabled) {
  background: {color.bg.hover};
}

.chip:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.chip:disabled {
  color: {color.fg.disabled};
  background: {color.bg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}

.chip > svg {
  flex-shrink: 0;
  width: {iconography.size};
  height: {iconography.size};
  pointer-events: none;
}

.chip[aria-label]:not(:has(.chip__label)) {
  width: {layout.control-height};
  padding-inline: 0;
}
```

## Engineering notes

- `flex-shrink: 0`과 `white-space: nowrap`은 toolbar에서 Chip이 읽을 수 없는 폭으로 찌그러지는 것을 막는다. 공간이 부족하면 Chip 자체를 줄이지 말고 컨테이너가 wrap 또는 scroll을 소유한다.
- 아이콘 전용 크기는 width와 height를 같게 만들어 아이콘 위치와 조작 영역이 변형되지 않게 한다.
- button Chip과 선택 Chip은 모양이 비슷해도 상태·form·ARIA 계약이 다르므로 같은 prop으로 의미를 전환하지 않는다.

## Accessibility

- Chip은 수행하는 명령을 설명하는 접근 가능한 이름을 가진다.
- 아이콘만 보일 때도 `aria-label`을 제공한다.
- 선택 상태가 필요하면 `aria-pressed`를 임의로 붙이지 않고 Checkbox 또는 RadioGroup 계약을 사용한다.
- 색상만으로 위험한 제거 동작을 구분하지 않는다.

## Tests

- 클릭, Enter, Space로 handler가 한 번 실행되는지 확인한다.
- disabled Chip이 실행되지 않는지 확인한다.
- 아이콘 전용 Chip의 이름과 정사각 hit area를 확인한다.
- PrefixIcon, Label, SuffixIcon의 정렬과 event target을 확인한다.
- 긴 Label과 wrap·scroll 컨테이너에서 overflow를 확인한다.
