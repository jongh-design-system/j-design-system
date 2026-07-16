---
name: checkbox
platform: web
---

# Checkbox

## Overview

native checkbox Input과 Label을 하나의 컨트롤로 묶어 독립적인 checked 값을 변경한다. Input이 focus·keyboard·form·reset 동작을 소유하고, checkmark와 indeterminate mark는 그 상태를 시각적으로 반영한다.

## Anatomy

```text
Root
└─ Label
   ├─ Input
   └─ Text
```

`Input`은 실제 native checkbox이며 상태, form 참여, focus를 소유한다. 시각 checkmark는 Input의 상태를 표현할 뿐 별도 대화형 요소가 아니다.

## Behavior

- Label, Input 또는 Space를 실행하면 checked 상태가 바뀐다.
- controlled와 uncontrolled 사용 모두 native `checked`와 change event를 유지한다.
- indeterminate 표시는 `input.indeterminate`와 시각 상태를 함께 갱신한다.
- indeterminate는 별도의 제출 값이 아니라 일부만 선택된 집계 상태를 표시한다.
- form reset 후 checked와 indeterminate가 초기 상태로 돌아간다.
- disabled 상태에서는 focus, 상태 변경, form 값 제출이 발생하지 않는다.

## CSS

```css
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  min-height: {layout.control-height};
  color: {color.fg};
  font: {typography.label};
  cursor: pointer;
}

.checkbox__input {
  appearance: none;
  position: absolute;
  inset-inline-start: 0;
  top: 50%;
  width: {iconography.control-size};
  height: {iconography.control-size};
  margin: 0;
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color {motion.duration} {motion.easing},
    border-color {motion.duration} {motion.easing};
}

.checkbox__input::after {
  position: absolute;
  inset: 0;
  content: "";
  background: center / contain no-repeat var(--checkbox-mark);
  opacity: 0;
}

.checkbox__input:checked,
.checkbox__input:indeterminate {
  background: {color.bg.selected};
  border-color: {color.stroke.selected};
}

.checkbox__input:checked::after {
  opacity: 1;
}

.checkbox__input:indeterminate::after {
  background-image: var(--checkbox-indeterminate-mark);
  opacity: 1;
}

.checkbox__input:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.checkbox__text {
  min-width: 0;
  padding-inline-start: calc({iconography.control-size} + {spacing.gap});
}

.checkbox:has(.checkbox__input:disabled) {
  color: {color.fg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}
```

## Engineering notes

- native Input을 유지하면 Space, focus, label activation, form serialization을 다시 구현하지 않아도 된다.
- `indeterminate`는 HTML attribute가 아니라 DOM property이므로 render와 form reset 시점에 다시 대입해야 한다.
- 시각 mark를 Input 내부에 두면 Label 전체 클릭 영역과 focus 대상이 하나로 유지된다.
- Text의 시작 padding은 control 크기와 gap의 합으로 계산해 여러 줄에서도 두 번째 줄이 control 아래로 들어가지 않게 한다.

## Accessibility

- 모든 Checkbox는 보이는 Text 또는 동등한 접근 가능한 이름을 가진다.
- `input.indeterminate`가 mixed 상태를 보조 기술에 전달한다.
- 관련 Checkbox 묶음은 `fieldset`과 `legend`를 사용한다.
- 오류·설명 문구는 `aria-describedby`로 Input에 연결한다.

## Tests

- Label 클릭과 Space 입력으로 checked가 바뀌는지 확인한다.
- controlled와 uncontrolled change 값을 확인한다.
- indeterminate의 DOM property, 시각 mark, 접근성 상태를 확인한다.
- disabled 상태가 변경되지 않는지 확인한다.
- form submit과 reset 결과를 확인한다.
- 긴 Label과 여러 줄 Label의 정렬·클릭 영역을 확인한다.
