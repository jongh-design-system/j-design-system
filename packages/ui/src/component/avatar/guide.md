---
name: avatar
platform: web
---

# Avatar

## Overview

사람, 팀, 조직 또는 봇처럼 제품 안에서 식별되는 주체를 시각적으로 나타낸다. 이미지가 없거나 로드되지 않아도 같은 크기에서 식별 가능한 fallback을 유지한다.

## Anatomy

```text
Root
├─ Fallback
└─ Image
```

`Image`와 `Fallback`은 같은 영역을 점유한다. badge, 상태 표시, 클릭 동작은 Avatar 자체가 아니라 이를 조합하는 상위 컴포넌트가 소유한다.

## Behavior

- 로드 전과 오류 상태에는 Fallback을 보여 주고, 이미지가 준비된 뒤 Image로 교체한다.
- Fallback은 이니셜 또는 식별 가능한 대체 아이콘을 사용하며 빈 영역을 만들지 않는다.
- 이미지 교체 전후에 Root의 크기와 주변 layout이 바뀌지 않는다.
- 인접 텍스트가 이미 주체의 이름을 제공하면 중복 announcement를 피하도록 Image의 대체 텍스트를 결정한다.

## CSS

```css
.avatar {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: {layout.avatar-size};
  height: {layout.avatar-size};
  aspect-ratio: 1;
  overflow: hidden;
  color: {color.fg};
  background: {color.bg};
  border-radius: {radius.full};
}

.avatar__image,
.avatar__fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.avatar__image {
  display: block;
  object-fit: cover;
}

.avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  color: {color.fg.muted};
  font: {typography.label};
  background: {color.bg.muted};
}

.avatar::after {
  position: absolute;
  inset: 0;
  content: "";
  border: {layout.border-width} solid {color.stroke};
  border-radius: inherit;
  pointer-events: none;
}
```

## Engineering notes

- Image와 Fallback을 absolute layer로 겹치면 로딩 상태가 바뀌어도 주변 layout이 재배치되지 않는다.
- `object-fit: cover`는 원본 비율을 유지한 채 원형 frame을 채우고, `overflow: hidden`은 모서리 밖 이미지를 자른다.
- 테두리를 `::after`에 그리면 이미지 위에 항상 같은 stroke가 남고 포인터 이벤트를 가로채지 않는다.
- Fallback을 잠깐 지연할 수는 있지만 지연 중 빈 Root가 노출되지 않도록 배경을 유지한다.

## Accessibility

- 단독 Avatar가 주체를 식별해야 하면 Image의 `alt` 또는 상위 대화형 요소의 이름으로 주체를 전달한다.
- 이름 텍스트가 바로 옆에 반복되면 Image는 장식 이미지로 처리할 수 있다.
- Fallback의 이니셜만으로 상위 버튼·링크의 접근 가능한 이름을 대신하지 않는다.
- 상태 badge는 색상 외의 텍스트 이름을 별도로 제공한다.

## Tests

- 로딩, 성공, 오류에서 Fallback과 Image의 전환을 확인한다.
- 정사각·세로·가로 원본 이미지의 crop을 확인한다.
- 전환 전후 Root의 크기와 주변 layout이 변하지 않는지 확인한다.
- 단독 사용과 이름 텍스트 병치 사용의 접근 가능한 이름을 확인한다.
- 느린 이미지 로딩에서도 빈 원이나 깨진 이미지가 노출되지 않는지 확인한다.
