---
name: chip
platform: web
---

# Chip

## Overview

짧은 명령을 작은 면적에 배치하는 native button 컨트롤이다. Label과 아이콘을 함께 보이는 withText 배치와 아이콘만 보이는 iconOnly 배치를 제공하며, 선택 값은 소유하지 않는다.

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
- PrefixIcon과 SuffixIcon은 Label의 의미를 보조하고, Chip 전체가 하나의 클릭 영역으로 동작한다.

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

@media (hover: hover) and (pointer: fine) {
  .chip:hover:not(:disabled) {
    background: {color.bg.hover};
  }
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
}

.chip--icon-only {
  width: {layout.control-height};
  padding-inline: 0;
}
```

## Engineering notes

- `flex-shrink: 0`과 `white-space: nowrap`은 toolbar에서 Chip이 읽을 수 없는 폭으로 찌그러지는 것을 막는다. 공간이 부족하면 Chip 자체를 줄이지 말고 컨테이너가 wrap 또는 scroll을 소유한다.
- 아이콘 전용 크기는 width와 height를 같게 만들어 아이콘 위치와 조작 영역이 변형되지 않게 한다.

## Accessibility

- Chip은 수행하는 명령을 설명하는 접근 가능한 이름을 가진다.
- 아이콘만 보일 때도 `aria-label`을 제공한다.

## Tests

- 클릭, Enter, Space로 handler가 한 번 실행되는지 확인한다.
- disabled Chip이 실행되지 않는지 확인한다.
- 아이콘 전용 Chip의 이름과 정사각 hit area를 확인한다.
- PrefixIcon, Label, SuffixIcon의 정렬과 전체 클릭 영역을 확인한다.
- 긴 Label과 wrap·scroll 컨테이너에서 overflow를 확인한다.
