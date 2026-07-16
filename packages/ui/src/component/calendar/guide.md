---
name: calendar
platform: web
---

# Calendar

## Overview

locale과 week start에 맞춰 월 단위 Grid를 만들고, 현재 보이는 월과 선택 값을 독립적으로 관리한다. none·single·range·multiple 선택 모드를 제공하며 각 DayButton은 today·outside·disabled·selected·range 위치를 표현한다.

## Anatomy

```text
Root
├─ Header
│  ├─ PreviousButton
│  ├─ Heading
│  └─ NextButton
└─ Grid
   ├─ WeekdayHeader
   └─ Week
      └─ DayButton
```

Heading은 현재 보이는 월·년을 나타낸다. 각 DayButton은 날짜, 현재 월 여부, today, disabled, selected, range 안의 위치를 표현한다.

## Behavior

- PreviousButton과 NextButton은 선택값을 바꾸지 않고 보이는 월만 이동한다.
- none 모드에서는 날짜를 표시하지만 선택 값은 만들지 않는다.
- single은 하나의 날짜, multiple은 독립된 여러 날짜를 선택한다.
- range는 첫 선택을 시작일로 두고 두 번째 선택을 종료일로 확정한다. 시작일보다 이른 날짜를 고르면 새 범위를 시작한다.
- min·max 범위와 `isDateDisabled`가 막은 날짜는 선택되지 않는다.
- 날짜에 focus가 있을 때 좌우 방향키는 하루, 상하 방향키는 일주일을 이동한다. Home·End는 해당 주의 처음·마지막 날로 이동한다. PageUp·PageDown은 이전·다음 달의 같은 날짜로 이동하되, 해당 일이 없으면 그 달의 마지막 날로 이동한다.
- locale과 week start에 맞춰 weekday 순서, 월 이름, 날짜의 접근 가능한 이름을 만든다.
- `fixedWeeks`가 true이면 항상 6개 Week를 만들고, false이면 해당 월에 필요한 Week만 만든다.

## CSS

```css
.calendar {
  display: flex;
  flex-direction: column;
  width: max-content;
  max-width: 100%;
  padding: {spacing.content};
  color: {color.fg};
  font: {typography.body};
  background: {color.bg};
  border-radius: {radius};
  box-shadow: {elevation};
}

.calendar__header {
  display: grid;
  grid-template-columns: {layout.control-height} minmax(0, 1fr) {layout.control-height};
  align-items: center;
  gap: {spacing.gap};
}

.calendar__heading {
  min-width: 0;
  margin: 0;
  font: {typography.heading};
  text-align: center;
}

.calendar__nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: {layout.control-height};
  height: {layout.control-height};
  border-radius: {radius.full};
}

.calendar__weekdays,
.calendar__week {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: {spacing.cell-gap};
}

.calendar__weekday {
  color: {color.fg.muted};
  font: {typography.caption};
  text-align: center;
}

.calendar__day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: {layout.day-size};
  height: {layout.day-size};
  padding: 0;
  color: {color.fg};
  font: {typography.label};
  background: transparent;
  border: 0;
  border-radius: {radius.item};
  cursor: pointer;
}

.calendar__day[data-outside="true"] {
  color: {color.fg.muted};
}

.calendar__day[data-in-range="true"] {
  background: {color.bg.range};
}

.calendar__day[data-selected="true"] {
  color: {color.fg.selected};
  background: {color.bg.selected};
}

.calendar__day:focus-visible {
  outline: {accessibility.focus-width} solid {color.focus-ring};
  outline-offset: {accessibility.focus-offset};
}

.calendar__day:disabled {
  color: {color.fg.disabled};
  cursor: not-allowed;
  opacity: {state.disabled-opacity};
}
```

## Engineering notes

- 모든 입력 날짜의 시·분·초·밀리초를 0으로 정규화한 뒤 비교해 같은 달력 날짜가 time 값 때문에 달라지는 것을 막는다.
- 월 이동은 31일에서 짧은 달로 갈 때 overflow가 나지 않도록 대상 달의 마지막 날로 clamp한다.
- weekday와 월 Label은 고정 문자열 배열이 아니라 `Intl.DateTimeFormat`과 locale을 사용한다.
- `fixedWeeks`의 6주 Grid는 월 이동 전후의 Calendar 높이를 일정하게 유지한다.

## Accessibility

- Calendar는 목적을 설명하는 이름과 현재 월을 나타내는 Heading을 가진다.
- 날짜 Grid에서는 한 DayButton만 Tab 순서에 두고 방향키로 날짜 focus를 이동한다.
- DayButton의 이름은 월·일·년을 포함하고 selected, today, disabled 상태를 전달한다.
- 월 이동 후 새 Heading을 보조 기술이 인지할 수 있게 한다.

## Tests

- 이전·다음 월 이동과 월말 clamp를 확인한다.
- single, range, multiple 선택 흐름을 확인한다.
- min·max와 disabled 날짜가 선택되지 않는지 확인한다.
- locale, week start, outside days, fixed weeks 결과를 확인한다.
- 방향키, Home·End, PageUp·PageDown과 roving focus를 확인한다.
- selected·range·today·disabled의 시각 및 접근성 상태를 확인한다.
