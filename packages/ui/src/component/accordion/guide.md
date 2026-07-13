---
name: accordion
platform: web
---

# Accordion

## 역할

서로 관련된 콘텐츠 섹션의 제목을 먼저 보여 주고, 사용자가 필요한 섹션을 펼치거나 접을 수 있게 한다. 페이지의 주요 탐색이나 단계형 작업 흐름을 대신하지 않으며, 대부분의 내용을 동시에 읽어야 하는 경우에는 일반적인 제목과 본문 구조가 더 적합하다. [USWDS는 사용자가 일부 정보만 필요하거나 공간이 제한된 경우를 적합한 조건으로 제시한다](https://designsystem.digital.gov/components/accordion/).

## 보장해야 하는 계약

| 조건                                      | 규칙                                                                                                                        | 근거                                                                                                                                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 항상                                      | 각 섹션 제목은 실행 가능한 컨트롤이며, 접근 가능한 이름이 섹션의 목적을 설명해야 한다.                                      | [WAI-ARIA Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)                                                                                                                 |
| 항상                                      | 트리거의 펼침 상태는 `aria-expanded`와 실제 패널 가시성이 일치해야 하고, 제어 대상과의 관계를 프로그램적으로 제공해야 한다. | [`aria-expanded` 명세](https://www.w3.org/TR/wai-aria/#aria-expanded), [`aria-controls` 명세](https://www.w3.org/TR/wai-aria/#aria-controls)                                                                    |
| 제목 계층을 표현하는 경우                 | 트리거를 감싸는 제목의 수준은 컴포넌트 모양이 아니라 문서의 정보 구조에서 결정한다.                                         | [WAI-ARIA Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), [Scottish Government Design System](https://designsystem.gov.scot/components/accordion)                        |
| 패널이 접힌 경우                          | 숨겨진 패널의 컨트롤이 키보드 순서에 남거나 보조 기술에 펼쳐진 콘텐츠처럼 노출되지 않아야 한다.                             | [`hidden` 속성에 관한 HTML 표준](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute), [WAI-ARIA Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) |
| 트리거를 사용자 정의 요소로 구현하는 경우 | `Enter`와 `Space`로 상태를 바꿀 수 있어야 한다. 네이티브 `button`을 사용하면 이 기본 의미와 입력 동작을 우선 활용한다.      | [HTML `button` 요소](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element), [WAI-ARIA Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)             |
| 상태를 시각적으로 표현하는 경우           | 색상이나 회전 아이콘 하나에만 의존하지 않고, 상태와 키보드 포커스를 구분 가능하게 표현한다.                                 | [WCAG 2.2: Use of Color, Focus Visible, Name·Role·Value](https://www.w3.org/TR/WCAG22/)                                                                                                                         |

APG는 WAI-ARIA 명세 자체가 아니라 **informative 작성 지침**이며, 예제 코드는 프로덕션 사용을 보증하지 않는다. 실제 브라우저와 보조 기술 조합에서 별도로 검증한다. [APG Accordion Example의 사용 전 안내](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)

## 프로젝트에서 결정할 항목

| 결정                                | 적용 조건                               | 판단에 사용하는 정보                                |
| ----------------------------------- | --------------------------------------- | --------------------------------------------------- |
| 한 번에 열 수 있는 섹션 수          | 둘 이상의 섹션이 존재할 때              | 콘텐츠 비교 필요성, 작업 연속성, 제품 상태 모델     |
| 모든 섹션을 접을 수 있는지          | 단일 펼침 모델을 사용할 때              | 빈 상태 허용 여부, 반드시 노출해야 하는 콘텐츠      |
| 패널에 `region`을 부여할지          | 패널이 독립적인 랜드마크로 유용할 때    | 패널 수, 페이지 랜드마크 밀도, 콘텐츠 길이          |
| 방향키·`Home`·`End` 탐색을 제공할지 | 헤더가 많고 연속 탐색의 이점이 있을 때  | 키보드 사용 빈도, 플랫폼 관례, 구현 복잡도          |
| 초기 펼침 상태                      | 서버 렌더링 또는 복원 상태가 있을 때    | 주요 콘텐츠 우선순위, URL·세션 상태, 오류 복구      |
| 펼침·접힘 모션                      | 패널 크기가 변할 때                     | Motion Foundation, 콘텐츠 길이, reduced-motion 정책 |
| 전체 펼치기·접기 제어               | 섹션 수가 많고 전체 검토 작업이 있을 때 | 사용자 조사, 반복 작업 비용, 분석 데이터            |

## 토큰 결정 지도

```yaml
root:
  gap: spacing

item:
  border-color: color
  border-width: border
  border-radius: radius

trigger:
  color: color
  background-color: color
  typography: typography
  padding-block: spacing
  padding-inline: spacing
  gap: spacing
  min-block-size: sizing

indicator:
  color: color
  size: sizing
  transition-duration: motion
  transition-timing-function: motion

panel:
  color: color
  background-color: color
  typography: typography
  padding-block: spacing
  padding-inline: spacing

focus:
  outline-color: color
  outline-width: border
  outline-offset: spacing

motion:
  duration: motion
  easing: motion
```

## 엔지니어링 지식

### 의미와 동작

제목, 트리거, 패널의 관계를 데이터 상태 하나에서 파생해 시각 상태와 접근성 상태가 어긋나지 않게 한다. 상호 배타적 펼침과 다중 펼침은 서로 다른 제품 계약이므로 컴포넌트가 임의로 혼합하지 않는다. 단순한 단일 disclosure만 필요하다면 네이티브 [`details`와 `summary`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)가 더 작은 구현이 될 수 있다.

### 레이아웃

트리거 전체를 일관된 입력 영역으로 만들고, 긴 제목·텍스트 확대·번역으로 줄바꿈되어도 표시자와 제목이 겹치지 않게 한다. 열린 패널의 높이를 임의로 제한하지 않으며, 제품 컨테이너가 높이를 제한한다면 내부 스크롤과 페이지 스크롤의 관계를 명시한다. [Carbon은 열린 패널에 고정 최대 높이를 두지 않고 너비를 문맥에 맞추도록 안내한다](https://carbondesignsystem.com/components/accordion/style/).

### 접근성

트리거는 일반 페이지 `Tab` 순서에 포함하고, 패널 내부의 상호작용 요소도 펼쳐진 동안 자연스러운 문서 순서를 유지한다. 방향키 탐색은 APG의 선택적 권고이며 필수 키보드 계약으로 오해하지 않는다. 아이콘은 상태의 중복 장식이면 접근성 이름에 불필요하게 포함하지 않는다. [APG Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

### 렌더링과 브라우저

서버 렌더링된 초기 상태와 클라이언트 초기화 상태가 같아야 한다. 스크립트 실패 시 핵심 콘텐츠가 영구적으로 사라지지 않는 점진적 향상을 고려한다. 높이 애니메이션을 위해 콘텐츠를 계속 노출하는 구현은 접힌 패널의 focusability와 접근성 트리 상태를 별도로 관리해야 한다. 사용자가 동작 감소를 요청하면 불필요한 크기·회전 애니메이션을 줄인다. [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## 검증 관점

- 트리거의 이름만 읽어도 대응하는 섹션을 예측할 수 있는가
- 포인터, `Enter`, `Space`가 동일한 펼침 상태를 만드는가
- `aria-expanded`와 실제 패널 표시 상태가 항상 일치하는가
- 접힌 패널 내부 요소로 포커스가 이동하지 않는가
- 제목 수준이 주변 문서 구조와 자연스럽게 이어지는가
- 긴 제목, 확대, 좁은 화면에서 제목과 표시자가 겹치지 않는가
- 모션 감소 설정에서도 상태 변화가 즉시 이해되는가

## 출처

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria/)
- [WAI-ARIA APG Accordion Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [APG Accordion Example 사용 전 안내](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)
- [HTML Standard: `button`](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [USWDS Accordion](https://designsystem.digital.gov/components/accordion/)
- [Carbon Accordion](https://carbondesignsystem.com/components/accordion/style/)
- [Scottish Government Design System Accordion](https://designsystem.gov.scot/components/accordion)
