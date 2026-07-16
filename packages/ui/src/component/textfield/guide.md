---
name: textfield
platform: web
---

# TextField

## Overview

한 줄의 자유 형식 텍스트를 입력하고 편집한다. Label, Input, 보조 내용, 검증 상태를 하나의 form field로 연결한다.

## Anatomy

```text
Root
├─ Heading
│  └─ Label
├─ Container
│  ├─ LeadingAddon
│  ├─ Input
│  └─ TrailingAddon
└─ HelperText
```

Input이 값과 native form 동작을 소유한다. Addon은 값의 단위나 보조 동작을 제공하며 Label이나 Input을 대신하지 않는다.

## Behavior

- Label을 실행하면 Input으로 focus가 이동한다.
- Input은 브라우저의 편집, selection, autocomplete, validation 동작을 유지한다.
- status가 negative이면 시각 상태와 `aria-invalid`가 함께 바뀐다.
- HelperText가 렌더링될 때만 Input의 `aria-describedby`에 해당 id를 연결한다.
- trailing action은 자신의 접근 가능한 이름과 disabled 상태를 가지며 Input의 focus를 불필요하게 빼앗지 않는다.

## CSS

```css
.textfield {
  display: flex;
  flex-direction: column;
  gap: {spacing.field};
  width: 100%;
}

.textfield__label {
  color: {color.fg};
  font: {typography.label};
}

.textfield__container {
  display: flex;
  align-items: center;
  gap: {spacing.gap};
  width: 100%;
  min-height: {layout.control-height};
  padding-inline: {spacing.inline};
  background: {color.bg};
  border: {layout.border-width} solid {color.stroke};
  border-radius: {radius};
  box-shadow: {elevation};
  transition: border-color {motion.duration} {motion.easing};
}

.textfield__container:focus-within {
  border-color: {color.stroke.focus};
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.textfield__input {
  flex: 1;
  min-width: 0;
  padding-block: {spacing.block};
  color: {color.fg};
  font: {typography.body};
  background: transparent;
  border: 0;
  outline: 0;
}

.textfield__input::placeholder {
  color: {color.fg.placeholder};
}

.textfield__addon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: {color.fg.muted};
  white-space: nowrap;
}

.textfield__helper {
  color: {color.fg.muted};
  font: {typography.caption};
}

.textfield:has(.textfield__input[aria-invalid="true"]) .textfield__container {
  border-color: {color.stroke.negative};
}

.textfield:has(.textfield__input[aria-invalid="true"]) .textfield__helper {
  color: {color.fg.negative};
}

.textfield__container:has(.textfield__input:disabled) {
  color: {color.fg.disabled};
  background: {color.bg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}
```

## Engineering notes

- Input의 `min-width: 0`은 긴 값이 Addon을 밀어내고 Container 폭을 넘는 것을 막는다.
- focus ring은 Container의 `:focus-within`이 소유해 Input과 Addon을 하나의 field surface로 보이게 한다. 실제 keyboard focus는 Input에 남는다.
- `aria-describedby`를 항상 고정 id로 출력하면 HelperText가 없을 때 dangling reference가 생기므로 렌더 여부와 함께 계산한다.
- 브라우저가 제공하는 autocomplete와 편집 키를 keydown handler로 가로채지 않는다.

## Accessibility

- 보이는 Label을 `for`와 Input id로 연결한다. placeholder는 Label을 대신하지 않는다.
- required는 native required와 보이는 표시를 함께 제공한다.
- 오류 상태는 `aria-invalid`와 구체적인 HelperText로 전달한다.
- LeadingAddon과 TrailingAddon이 장식 아이콘이면 보조 기술에서 숨기고, 동작이면 독립된 이름을 제공한다.

## Tests

- Label 클릭, 입력, selection, clear와 form submit을 확인한다.
- disabled, required, negative 상태의 native 속성과 시각 상태를 확인한다.
- HelperText가 있을 때만 `aria-describedby`가 연결되는지 확인한다.
- LeadingAddon과 TrailingAddon이 있어도 Input 폭과 focus ring이 유지되는지 확인한다.
- 긴 값, 긴 Label, 브라우저 확대에서 overflow를 확인한다.
- autocomplete와 keyboard 편집 동작이 유지되는지 확인한다.
