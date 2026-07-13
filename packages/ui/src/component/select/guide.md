---
name: select
platform: web
---

# Select

## 역할

미리 정해진 선택지 집합에서 하나의 값을 선택하게 한다. 이 문서는 텍스트 편집을 지원하지 않는 select-only control을 중심으로 하며, 검색·자유 입력·자동 완성이 필요하면 editable combobox 계약을 별도로 적용한다. 네이티브 `<select>`가 제품 요구를 충족하면 플랫폼 동작, form 참여, 보조 기술 지원을 직접 활용하는 가장 단순한 선택이다. [HTML `<select>`](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element), [APG Combobox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## 보장해야 하는 계약

| 조건                                | 규칙                                                                                                                                                            | 근거                                                                                                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 항상                                | control은 보이는 label과 프로그램적으로 연결된 접근 가능한 이름을 가져야 한다. placeholder나 현재 값만으로 label을 대체하지 않는다.                             | [HTML `<label>`](https://html.spec.whatwg.org/multipage/forms.html#the-label-element), [WCAG 2.2 Labels or Instructions](https://www.w3.org/TR/WCAG22/#labels-or-instructions)                 |
| 커스텀 select-only combobox인 경우  | trigger는 `combobox` 상태를 노출하고, popup의 열림 여부와 제어 대상 관계가 실제 DOM 상태와 일치해야 한다. popup은 단일 선택이라면 보통 `listbox` 의미를 가진다. | [WAI-ARIA combobox 요구사항](https://www.w3.org/TR/wai-aria/#combobox), [APG Combobox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)                               |
| listbox popup을 사용하는 경우       | 각 선택지는 `option` 의미와 선택 상태를 가지며, 단일 선택 control에서는 동시에 하나만 선택되어야 한다.                                                          | [WAI-ARIA listbox 명세](https://www.w3.org/TR/wai-aria/#listbox), [WAI-ARIA option 명세](https://www.w3.org/TR/wai-aria/#option)                                                               |
| popup이 열린 경우                   | 키보드로 옵션을 탐색하고 확정·취소할 수 있어야 하며, 닫힌 뒤 focus는 control에 남거나 돌아와야 한다.                                                            | [APG Combobox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), [APG Listbox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)               |
| 긴 옵션 목록인 경우                 | 이름 기반 type-ahead 또는 검색 등 효율적인 탐색 수단을 검토한다. 검색을 넣으면 editable combobox라는 별도 상호작용 모델로 전환한다.                             | [APG Listbox type-ahead 권고 (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/), [APG Combobox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)       |
| 비활성 옵션이나 control이 있는 경우 | 비활성 상태와 실제 실행 가능 여부를 일치시키고, 필요한 설명이 비활성화 때문에 접근 불가능해지지 않게 한다.                                                      | [`disabled` 속성](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled), [`aria-disabled` 명세](https://www.w3.org/TR/wai-aria/#aria-disabled)             |
| form 값으로 제출되는 경우           | 화면에 표시한 label과 제출 value를 구분하고, required·validation·reset 동작을 form 계약과 일치시킨다.                                                           | [HTML `<select>`](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element), [MDN `<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) |

APG combobox·listbox 패턴은 **informative 작성 지침**이고, 네이티브 `<select>`의 모든 브라우저 동작을 그대로 정의하지 않는다. 커스텀 구현은 대상 브라우저와 보조 기술에서 키보드, 이름, 상태 발표를 별도로 검증한다.

## 프로젝트에서 결정할 항목

| 결정                       | 적용 조건                                     | 판단에 사용하는 정보                                  |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| 네이티브 또는 커스텀 구현  | 항상                                          | 시각 요구, 옵션 콘텐츠, 모바일 동작, 접근성 유지 비용 |
| 초기 값과 미선택 상태      | 값이 필수가 아니거나 placeholder가 필요할 때  | form 의미, required 정책, 기본값의 제품 영향          |
| 선택이 focus 이동을 따를지 | 커스텀 listbox 탐색을 사용할 때               | 취소 가능성, 값 변경의 부작용, 플랫폼 관례            |
| type-ahead 또는 검색       | 옵션 수와 이름이 탐색 비용을 만들 때          | 데이터 규모, 사용자 어휘, 로딩 방식                   |
| 그룹과 구분자              | 선택지에 의미 있는 범주가 있을 때             | 정보 구조, 그룹 label, 옵션 수                        |
| popup 배치와 최대 높이     | popup이 viewport 또는 컨테이너 경계와 만날 때 | 반응형 Foundation, scroll owner, portal 정책          |
| 오류·도움말 표시           | validation이 있을 때                          | Form Foundation, 제출 시점, 오류 복구                 |
| 비동기 옵션과 loading      | 원격 데이터를 사용할 때                       | 캐시, 재시도, 빈 상태, 선택 값 보존                   |
| 선택 직후 popup 닫기       | 단일 값을 확정할 때                           | 값 변경의 가역성, 연속 비교 필요성                    |

## 토큰 결정 지도

```yaml
control:
  color: color
  background-color: color
  border-color: color
  border-width: border
  border-radius: radius
  typography: typography
  padding-block: spacing
  padding-inline: spacing
  min-block-size: sizing

indicator:
  color: color
  size: sizing
  gap: spacing

popup:
  color: color
  background-color: color
  border-color: color
  border-width: border
  border-radius: radius
  box-shadow: elevation
  padding-block: spacing
  max-block-size: sizing

group-label:
  color: color
  typography: typography
  padding: spacing

option:
  color: color
  background-color: color
  typography: typography
  padding-block: spacing
  padding-inline: spacing
  gap: spacing

separator:
  color: color
  thickness: border
  margin-block: spacing

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

현재 값, popup에서 탐색 중인 focus option, 확정된 selection을 분리한다. focus 이동만으로 외부 데이터 요청이나 form 제출 같은 부작용이 발생하지 않게 selection commit 시점을 명시한다. `listbox` option의 접근 가능한 이름은 평면 문자열로 전달되며 내부의 heading·button·link 의미를 상호작용할 수 없으므로, 복합 interactive 콘텐츠가 필요하면 다른 패턴을 선택한다. [APG Listbox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

### 레이아웃

control은 현재 값과 열림 표시가 긴 번역에서도 겹치지 않아야 한다. popup은 trigger 너비를 무조건 복사하기보다 옵션 가독성, viewport 경계, 제품 정렬 규칙으로 크기를 결정한다. 내부 스크롤이 있으면 키보드로 이동한 active option이 항상 보이도록 scroll position을 동기화한다.

### 접근성

네이티브 control이면 연결된 `<label>`과 `<option>` 의미를 보존한다. 커스텀 select-only combobox이면 `aria-expanded`, `aria-controls`, popup role, active option과 selection 상태를 한 상태 모델에서 갱신한다. DOM focus를 option으로 옮기는 방식과 control에 유지하며 `aria-activedescendant`를 쓰는 방식을 섞지 않는다. [WAI-ARIA combobox](https://www.w3.org/TR/wai-aria/#combobox), [`aria-activedescendant`](https://www.w3.org/TR/wai-aria/#aria-activedescendant)

`Escape` 취소, `Enter`·`Space` 확정, 화살표 탐색, 입력 문자 기반 이동은 채택한 패턴과 플랫폼에 맞게 일관되게 제공한다. 정확한 키 조합은 APG의 informative combobox·listbox 지침과 실제 네이티브 동작을 비교해 결정한다. [APG Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), [APG Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

### 렌더링과 브라우저

popup을 portal로 렌더링하면 trigger와 popup의 프로그램적 관계, DOM 읽기 순서, focus 복원, scroll clipping을 확인한다. 모바일 브라우저의 네이티브 `<select>`는 데스크톱과 다른 시스템 picker를 사용할 수 있으므로 커스텀 UI와 동일한 화면을 가정하지 않는다. 서버 렌더링 시 초기 선택 값과 form value가 클라이언트 상태와 같아야 한다.

## 검증 관점

- label, 현재 값, 열림 상태가 보조 기술에 구분되어 전달되는가
- 키보드만으로 열기, 탐색, 확정, 취소할 수 있는가
- 탐색 focus와 확정 selection이 제품 정책대로 구분되는가
- 선택된 option이 하나만 존재하고 trigger 값과 일치하는가
- 비활성 option을 포인터·키보드·프로그램 호출로 확정할 수 없는가
- 긴 옵션과 확대 환경에서 값과 표시자가 겹치지 않는가
- popup 경계에서 active option이 스크롤 영역 안에 보이는가
- form reset, validation, 제출 값이 시각 상태와 일치하는가

## 출처

- [HTML Standard: `select`](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [HTML Standard: `label`](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
- [WAI-ARIA 1.2: combobox](https://www.w3.org/TR/wai-aria/#combobox)
- [WAI-ARIA 1.2: listbox](https://www.w3.org/TR/wai-aria/#listbox)
- [WAI-ARIA APG Combobox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [WAI-ARIA APG Listbox Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [MDN `<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
