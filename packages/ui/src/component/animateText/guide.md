---
name: animateText
platform: web
---

# Animate Text

## 역할

Animate Text는 실제 텍스트의 의미, 읽기 순서와 레이아웃을 보존하면서 등장이나 상태 전환의 관계를 모션으로 보강한다. 글자, 단어 또는 시각적 줄 단위 효과는 조건부 표현 방식이며, 원문을 대체하는 새로운 콘텐츠 구조가 아니다.

## 보장해야 하는 계약

| 조건                                                        | 규칙                                                                                                                                                           | 근거                                                                                                                                   |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 항상                                                        | 애니메이션 유무와 관계없이 동일한 원문, 언어, 의미 구조와 읽기 순서를 제공한다. 텍스트를 이미지나 모션 효과에만 담지 않는다.                                   | CSS로 실제 텍스트의 구조와 표현을 분리하면 사용자가 텍스트 표현을 조정할 수 있다. [S1]                                                 |
| 텍스트를 단위별로 분절할 때                                 | 시각적 wrapper가 원문의 공백, 구두점, 단어 순서와 접근 가능한 문자열을 바꾸거나 중복 발표를 만들지 않는다.                                                     | WCAG는 정보와 관계가 프로그램적으로 결정되거나 텍스트로 제공되어야 한다고 요구한다. [S2]                                               |
| 글자 단위로 분절할 때                                       | UTF-16 코드 단위가 아니라 사용자에게 하나의 문자로 인식되는 grapheme 경계를 고려한다.                                                                          | 여러 코드 포인트로 구성된 emoji 등은 단순 문자열 분할로 깨질 수 있으며 `Intl.Segmenter`가 grapheme 단위 분절을 제공한다. [S3]          |
| 단어 또는 줄 단위로 분절할 때                               | locale과 실제 레이아웃에 따라 경계가 달라질 수 있음을 전제로 한다. 소스의 공백만으로 모든 언어의 단어 경계를 추정하거나 고정된 줄 경계를 영구 사용하지 않는다. | 국제화 API의 분절은 locale에 맞는 문자열 경계를 다루며 [S3], 사용자 텍스트 간격 변경에서도 콘텐츠 손실이나 겹침이 없어야 한다. [S4]    |
| 사용자가 감소된 모션을 선호할 때                            | 원문과 최종 시각 상태를 즉시 제공하고 비필수 이동, 확대, 순차 지연을 제거하거나 정적인 표현으로 대체한다.                                                      | `prefers-reduced-motion`은 비필수 모션의 제거·감소·대체 선호를 전달하며 [S5], 상호작용 유발 비필수 모션은 비활성화 가능해야 한다. [S6] |
| 텍스트가 자동으로 등장할 때                                 | 읽기를 모션 완료에 의존시키지 않는다. 자동 모션이 길게 지속되거나 다른 콘텐츠와 병행된다면 사용자가 pause, stop 또는 hide할 수 있어야 하는 조건을 평가한다.    | 자동 시작해 일정 시간 이상 다른 콘텐츠와 함께 움직이는 정보에는 pause, stop 또는 hide 메커니즘이 필요하다. [S7]                        |
| 모션 중 콘텐츠, locale, viewport 또는 사용자 설정이 바뀔 때 | 이전 애니메이션을 정리하고 최신 원문과 레이아웃에 맞는 최종 상태를 보존한다. 오래된 분절이나 완료 콜백이 새 콘텐츠를 덮지 않는다.                              | Web Animations API는 실행 중 효과를 취소하는 제어 모델을 제공한다. [S8]                                                                |
| 애니메이션이 초기 렌더링에 적용될 때                        | 최종 텍스트 공간을 먼저 확보해 모션이 주변 콘텐츠의 예기치 않은 이동을 만들지 않는다.                                                                          | 가시 요소가 프레임 사이에 위치를 바꾸면 layout shift로 관찰된다. [S9]                                                                  |

## 프로젝트에서 결정할 항목

| 결정                  | 적용 조건                                           | 판단에 사용하는 정보                                        |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| 모션의 정보 목적      | 모션을 적용할 때마다                                | Content hierarchy, User journey, Brand expression           |
| 분절 단위             | 순차 등장 효과가 필요할 때                          | Locale, Copy structure, Typography, Accessibility           |
| 유발 시점과 재생 정책 | 초기 등장, viewport 진입 또는 상태 변화에 반응할 때 | Product behavior, Navigation model, Replay frequency        |
| 순서와 시차           | 여러 단위를 순차 표시할 때                          | Reading order, Motion foundation, Content length            |
| 이동 방향과 거리      | 위치 이동이 목적에 부합할 때                        | Writing direction, Layout direction, Motion foundation      |
| duration과 easing     | 모션을 사용할 때                                    | Motion foundation, Content length, Interaction frequency    |
| interruption 결과     | 콘텐츠나 상태가 모션 중 바뀔 수 있을 때             | State machine, Live updates, User intent                    |
| 감소된 모션 대체      | 비필수 모션이 있을 때                               | Accessibility preference, Static hierarchy, Color           |
| 접근성 트리 표현 방식 | 시각 분절이 DOM 구조를 늘릴 때                      | Semantic element, Screen reader behavior, Copy requirements |

## 토큰 결정 지도

```yaml
text:
  color: color
  typography: typography

item-motion:
  transition-duration: motion
  transition-timing-function: motion
  transform-distance: motion
  opacity: motion

sequence:
  stagger-interval: motion
  start-delay: motion

layout:
  inline-gap: spacing
  block-gap: spacing

reduced-motion:
  transition-duration: motion
  opacity: motion
```

`inline-gap`과 `block-gap`은 원문에 없는 간격을 임의로 추가하기 위한 값이 아니다. 프로젝트 typography와 원문의 공백을 보존하면서 별도 레이아웃 간격이 필요한 경우에만 사용한다.

## 엔지니어링 지식

### 의미와 동작

애니메이션 전후의 콘텐츠는 동일한 실제 텍스트여야 한다. heading, paragraph, label 등 원래 요소의 의미를 컨테이너 편의를 위해 일반 요소로 바꾸지 않는다. 시각 분절용 노드와 보조 기술용 원문을 별도로 두는 전략을 선택한다면 한 표현만 접근성 트리에 노출해 중복 발표를 막고, 검색·선택·복사 결과도 원문과 일치시키는지 확인한다.

글자 분절은 grapheme cluster를 기준으로 한다. 단어 분절은 공백이 없는 언어와 구두점 규칙을 고려한다. 시각적 줄은 작성자가 넣은 줄바꿈과 브라우저가 폭에 따라 만든 줄바꿈을 구분하며, 반응형 reflow 후 오래된 줄 그룹을 유지하지 않는다.

### 레이아웃

모든 항목의 최종 geometry를 정상 문서 흐름에서 먼저 결정한 뒤 표현만 애니메이션한다. 항목을 inline wrapper로 나눌 때 기존 줄바꿈 기회와 공백을 보존한다. 글자나 단어 wrapper가 `inline-block`처럼 동작하면 kerning, ligature, 줄바꿈과 양쪽 맞춤 결과가 달라질 수 있으므로 지원 typography와 locale에서 확인한다.

viewport, font load, zoom, writing mode와 사용자 지정 글자·단어·줄 간격이 바뀌어도 텍스트가 잘리거나 겹치지 않아야 한다. WCAG의 text spacing 기준은 특정 값을 강제하는 것이 아니라 사용자가 간격을 덮어써도 정보 손실이 없어야 한다는 요구다. [S4]

### 접근성

화면 낭독기가 각 글자를 끊어 읽도록 시각 wrapper를 의미 단위로 노출하지 않는다. 원래 문장의 언어 속성, 강조, 링크 같은 의미 있는 하위 구조를 보존한다. 숨김 초기 상태가 접근성 트리에서도 원문을 제거하는 구현이라면, 모션이 실행되지 않거나 JavaScript가 실패했을 때 텍스트가 영구히 사라지지 않도록 정적 기본 상태를 우선한다.

감소된 모션에서는 stagger delay를 단순히 줄이는 것보다 읽을 수 있는 최종 텍스트를 즉시 보여주는 것이 우선이다. 텍스트 등장 자체가 새로운 상태나 오류를 알리는 경우에는 애니메이션과 별개로 적절한 상태 전달 패턴을 적용하며, 모든 프레임을 live region에 발표하지 않는다.

### 렌더링과 브라우저

콘텐츠 변경마다 새 애니메이션을 누적하지 않는다. 이전 실행을 취소하고 최신 DOM의 현재 시각 상태에서 새 최종 상태로 이어지게 하거나 즉시 완료한다. 취소된 애니메이션의 완료 promise와 콜백이 새 원문을 수정하지 않도록 실행 식별자나 상태 소유권을 분명히 한다. [S8]

분절 결과는 locale, 텍스트, writing direction이 바뀌면 무효화한다. 줄 단위 측정이 필요한 구현은 font load와 container resize 후 재계산 비용을 고려하며, 측정과 쓰기를 반복해 프레임마다 layout을 강제하지 않는다. 서버 렌더링과 hydration을 사용하는 프로젝트에서는 초기 원문 DOM과 클라이언트 분절 DOM의 불일치도 별도로 다룬다.

## 검증 관점

- 애니메이션, JavaScript, 스타일시트를 각각 끈 상태에서도 완전한 원문과 의미 구조가 남는가
- 화면 낭독기가 문장을 글자별로 끊거나 같은 원문을 두 번 발표하지 않는가
- emoji, 결합 문자, 비라틴 문자와 공백 없는 언어가 글자·단어 분절에서 깨지지 않는가
- 텍스트 선택, 복사, 페이지 검색 결과가 원문과 일치하는가
- zoom, font load, 좁은 viewport, writing direction 변경 후 줄 그룹과 읽기 순서가 올바른가
- 사용자 지정 글자·단어·줄 간격에서 텍스트가 잘리거나 겹치거나 사라지지 않는가
- 감소된 모션에서 순차 지연 없이 최종 텍스트와 같은 정보가 즉시 보이는가
- 콘텐츠를 빠르게 교체하거나 컴포넌트를 제거할 때 오래된 애니메이션과 콜백이 남지 않는가
- 모션 전후에 주변 콘텐츠의 예기치 않은 layout shift가 발생하지 않는가

## 출처

- [S1] [W3C WAI, Technique C22: Using CSS to control visual presentation of text](https://www.w3.org/WAI/WCAG22/Techniques/css/C22.html)
- [S2] [WCAG 2.2, Success Criterion 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships)
- [S3] [MDN, JavaScript Internationalization: Segmentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization#segmentation)
- [S4] [W3C WAI, Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [S5] [MDN, `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [S6] [W3C WAI, Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [S7] [W3C WAI, Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- [S8] [MDN, `Animation.cancel()`](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel)
- [S9] [MDN, `LayoutShift`](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift)
- [S10] [Carbon Design System, Motion](https://carbondesignsystem.com/elements/motion/overview/)
