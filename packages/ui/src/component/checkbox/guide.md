---
name: checkbox
platform: web
---

# Checkbox

## 역할

Checkbox는 서로 독립적으로 선택하거나 해제할 수 있는 이진 선택을 표현한다. 여러 하위 선택의 집계 상태를 보여 줄 때만 혼합 상태를 사용할 수 있다. HTML의 checkbox는 checkedness를 나타내는 두 상태 컨트롤이며, indeterminate는 checkedness와 독립적인 표시·접근성 상태다. [HTML Standard](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>)

## 보장해야 하는 계약

| 조건                           | 규칙                                                                                                                                                       | 근거                                                                                                                                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 항상                           | 가능한 경우 네이티브 `input type="checkbox"`의 폼 값, 키보드, 포커스, 이벤트, 접근성 의미를 보존한다.                                                      | [HTML Standard](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>), [ARIA in HTML](https://www.w3.org/TR/html-aria/)                                                           |
| 각 checkbox                    | 기능을 설명하는 접근 가능한 이름을 제공하고, 보이는 레이블이 있다면 컨트롤과 프로그램적으로 연결한다.                                                      | [HTML Standard: label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element), [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)                                                    |
| 사용자가 상태를 변경할 때      | 시각적 표시, 접근성 상태, 폼 값, 애플리케이션 상태가 같은 checked 상태를 반영해야 한다.                                                                    | [HTML Standard](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>), [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)                                            |
| 일부 하위 항목만 선택되었을 때 | 혼합 상태는 부분 선택을 표현해야 하며 일반적인 제3의 제출 값으로 취급하지 않는다. 네이티브 `indeterminate`는 checkedness와 독립적이다.                     | [HTML Standard: indeterminate](https://html.spec.whatwg.org/multipage/input.html#dom-input-indeterminate)                                                                                                       |
| 커스텀 checkbox를 구현할 때    | `checkbox` 역할, 접근 가능한 이름, `aria-checked`의 `true`·`false`·필요 시 `mixed`, `Space` 조작을 구현한다. APG의 키보드 패턴은 유용하지만 비규범 자료다. | [WAI-ARIA checkbox role](https://www.w3.org/TR/wai-aria/#checkbox), [APG Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), [APG 소개](https://www.w3.org/WAI/ARIA/apg/about/introduction/) |
| 필수 동의일 때                 | 미선택 상태를 폼의 누락 값으로 처리하고, 요구 조건을 레이블이나 지시문으로 전달한다.                                                                       | [HTML Standard](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>), [WCAG 2.2 3.3.2](https://www.w3.org/TR/WCAG22/#labels-or-instructions)                                     |
| 비활성일 때                    | 실제 조작과 제출 가능 여부가 시각적 상태와 일치해야 한다.                                                                                                  | [HTML Standard: disabled](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled), [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)                            |
| 포인터로 조작할 때             | 입력과 연결된 레이블을 함께 사용할 수 있게 하고 목표 크기 또는 간격의 최소 요구를 만족한다.                                                                | [HTML Standard: label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element), [WCAG 2.2 2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum)                                                |

## 프로젝트에서 결정할 항목

| 결정                           | 적용 조건                           | 판단에 사용하는 정보                           |
| ------------------------------ | ----------------------------------- | ---------------------------------------------- |
| 단독 선택과 그룹 경계          | 여러 checkbox가 같은 질문에 답할 때 | 제품 정보 구조, 폼 모델, 콘텐츠 전략           |
| 혼합 상태의 계산과 활성화 결과 | 부모·자식 선택 관계가 있을 때       | 도메인 선택 규칙, 상태 전이 정책               |
| 도움말과 오류 위치             | 요구 조건이나 검증이 있을 때        | 폼 검증 정책, 콘텐츠 Foundation                |
| 선택 표시 방식                 | 사용자 정의 외형을 적용할 때        | Color, Icon, Border Foundation, 강제 색상 지원 |
| 읽기 전용과 비활성의 구분      | 값을 보여 주되 변경 권한이 없을 때  | 권한 모델, 제출 정책, 제품 피드백 방식         |
| 그룹 배열과 레이블 줄바꿈      | 항목이 많거나 문구가 길 때          | 레이아웃, Typography, Spacing, 지원 로케일     |

## 토큰 결정 지도

```yaml
control:
  color: color
  background-color: color
  border-color: color
  border-width: border
  border-radius: radius
  size: sizing
label:
  color: color
  typography: typography
layout:
  control-label-gap: spacing
  group-gap: spacing
indicator:
  color: color
  size: sizing
focus:
  outline-color: color
  outline-width: border
  outline-offset: spacing
state:
  disabled-opacity: opacity
motion:
  transition-duration: motion
  transition-timing-function: motion
```

## 엔지니어링 지식

### 의미와 동작

Checkbox는 각 항목을 독립적으로 선택할 수 있을 때 사용한다. 하나만 선택 가능한 집합은 radio 계열의 책임이다. 혼합 상태는 하위 선택의 집계라는 실제 관계가 있을 때만 노출하며, 사용자가 부모를 활성화했을 때 전체 선택·전체 해제·이전 부분 상태 복원 중 무엇이 일어나는지는 도메인 규칙으로 명시한다. APG는 여러 가능한 혼합 상태 전이를 설명하지만 이는 비규범 권고다. [APG Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), [APG 소개](https://www.w3.org/WAI/ARIA/apg/about/introduction/)

### 레이아웃

레이블 전체가 읽히고 자연스럽게 줄바꿈되어야 한다. 항목이 그룹이면 질문을 설명하는 그룹 레이블을 제공하고, 시각적 근접성과 프로그램적 그룹 관계를 함께 설계한다. Carbon도 checkbox 레이블을 생략하거나 말줄임하지 않고 긴 문구를 줄바꿈하도록 권고한다. 이는 성숙한 디자인 시스템의 사용 지침이지 웹 표준 요구 자체는 아니다. [Carbon Checkbox](https://carbondesignsystem.com/components/checkbox/usage/)

### 접근성

네이티브 입력을 시각적으로 숨길 때도 포커스 가능성과 접근성 트리 노출을 유지한다. checked, unchecked, mixed를 색상만으로 구분하지 않고 형태나 표시를 함께 사용한다. 상태를 바꾸는 실제 focus target에 focus indicator가 나타나야 한다. [WCAG 2.2 1.4.1](https://www.w3.org/TR/WCAG22/#use-of-color), [WCAG 2.2 2.4.7](https://www.w3.org/TR/WCAG22/#focus-visible)

### 렌더링과 브라우저

네이티브 외형을 유지하며 테마 색만 조정할지, 외형을 완전히 대체할지 프로젝트에서 정한다. `accent-color`는 일부 사용자 인터페이스 컨트롤의 accent를 바꾸지만 모든 컨트롤과 상태에 적용되지는 않는다. 강제 색상 모드는 색, 그림자, 배경 이미지를 바꾸거나 제거할 수 있으므로 URL 이미지나 그림자에만 선택 표시를 의존하지 않는다. [MDN `accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color), [MDN `forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)

## 검증 관점

- 레이블을 누르면 의도한 checkbox가 활성화되는가
- `Space`로 상태가 바뀌고 포커스가 계속 보이는가
- checked, unchecked, indeterminate가 시각·접근성·애플리케이션 상태에서 일치하는가
- 폼 초기화와 제출에서 네이티브 값 계약이 유지되는가
- 긴 레이블이 잘리지 않고 컨트롤과의 관계를 잃지 않는가
- 강제 색상 모드에서도 선택과 혼합 상태를 구분할 수 있는가

## 출처

- [HTML Standard: Checkbox state](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>)
- [HTML Standard: The label element](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [WAI-ARIA: checkbox role](https://www.w3.org/TR/wai-aria/#checkbox)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [APG Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [APG Introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/)
- [Carbon Design System: Checkbox](https://carbondesignsystem.com/components/checkbox/usage/)
- [MDN: `accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)
- [MDN: `forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
