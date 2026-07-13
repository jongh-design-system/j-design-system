---
name: dialog
platform: web
---

# Dialog

## 역할

현재 작업 위에 제한된 범위의 정보나 결정을 제시하고, 사용자가 이를 완료하거나 명시적으로 닫은 뒤 원래 흐름으로 돌아가게 한다. 이 문서는 배경과의 상호작용을 막는 modal dialog를 중심으로 하며, non-modal window나 즉시 확인이 필요한 alert dialog는 별도의 의미와 동작 계약을 가진다.

## 보장해야 하는 계약

| 조건                                | 규칙                                                                                                                          | 근거                                                                                                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 모달로 열리는 경우                  | dialog 컨테이너에 모달 의미를 제공하고, 배경 콘텐츠는 시각적으로만 가리는 것이 아니라 사용자 상호작용에서도 비활성화한다.     | [`dialog` role 명세](https://www.w3.org/TR/wai-aria/#dialog), [`aria-modal` 명세](https://www.w3.org/TR/wai-aria/#aria-modal), [`showModal()` 동작](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)   |
| 항상                                | dialog는 보이는 제목을 참조하거나 별도의 접근 가능한 이름을 가져야 한다.                                                      | [`dialog` role의 accessible name 요구](https://www.w3.org/TR/wai-aria/#dialog), [APG Dialog Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)                                                          |
| 열릴 때                             | 초기 포커스는 dialog 내부의 작업과 콘텐츠 구조에 맞는 요소로 이동해야 하며, 단순히 DOM의 첫 컨트롤로 고정하지 않는다.         | [APG Dialog Pattern의 initial focus 지침 (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [MDN `<dialog>` 접근성](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility) |
| 모달이 열린 동안                    | `Tab`과 `Shift+Tab`이 배경으로 빠져나가지 않으며, 포인터와 보조 기술 사용자도 배경을 조작할 수 없어야 한다.                   | [APG Dialog Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [`showModal()`의 inert 동작](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)                              |
| 닫힐 때                             | 일반적으로 포커스를 dialog를 연 요소 또는 작업 흐름상 다음의 합리적 요소로 복원한다.                                          | [APG Dialog Pattern의 focus return 지침 (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)                                                                                                                      |
| 사용자가 닫을 수 있는 dialog인 경우 | 키보드로 실행 가능한 명시적 닫기 수단을 제공하고, modal dialog의 `Escape` 동작을 유지한다.                                    | [MDN `<dialog>` 접근성](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility), [APG Dialog Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)                      |
| 설명이 복잡한 경우                  | 여러 문단·목록·표 전체를 하나의 `aria-describedby`로 연결하지 않고, 구조를 탐색할 수 있게 초기 포커스와 설명 관계를 결정한다. | [APG Dialog Pattern 설명 연결 지침 (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)                                                                                                                           |

APG dialog pattern과 예제는 **informative 작성 지침**이며 브라우저·보조 기술 지원을 보증하는 프로덕션 구현이 아니다. ARIA로 직접 구현하는 경우 대상 환경에서 focus containment, 이름 계산, 배경 비활성화를 함께 검증한다. [APG Modal Dialog Example 안내](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)

## 프로젝트에서 결정할 항목

| 결정                          | 적용 조건                                    | 판단에 사용하는 정보                                   |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| modal 또는 non-modal          | 새 표면이 기존 작업을 차단할지 결정할 때     | 작업 의존성, 긴급도, 병렬 작업 필요성                  |
| 초기 포커스 대상              | dialog를 열 때                               | 파괴적 작업 여부, 읽어야 할 구조, 스크롤 위치          |
| 닫기 정책                     | backdrop, `Escape`, 명시적 버튼이 있을 때    | 데이터 손실 위험, 필수 결정 여부, 플랫폼 관례          |
| 제목과 설명 구성              | 콘텐츠 복잡도가 달라질 때                    | 정보 구조, 보조 기술 발표 길이, 콘텐츠 지침            |
| action 배치와 기본 동작       | 확인·취소·보조 동작이 있을 때                | Product behavior, 로케일 읽기 방향, 위험도             |
| 크기와 내부 스크롤            | 콘텐츠가 viewport를 넘을 수 있을 때          | 콘텐츠 유형, 반응형 Foundation, 키보드 가시성          |
| 중첩 허용 여부                | dialog에서 다시 dialog를 열 가능성이 있을 때 | 작업 모델, focus 복원 스택, 모바일 제약                |
| 비동기 완료 중 닫기 가능 여부 | 제출·저장 작업이 있을 때                     | 취소 가능성, 중복 실행 방지, 오류 복구                 |
| 열림·닫힘 모션                | 전환을 제공할 때                             | Motion Foundation, reduced-motion 정책, top-layer 동작 |

## 토큰 결정 지도

```yaml
overlay:
  background-color: color
  opacity: color

surface:
  color: color
  background-color: color
  border-color: color
  border-width: border
  border-radius: radius
  box-shadow: elevation
  padding: spacing
  max-inline-size: sizing
  max-block-size: sizing

header:
  gap: spacing
  margin-block-end: spacing

title:
  color: color
  typography: typography

description:
  color: color
  typography: typography

body:
  color: color
  typography: typography
  gap: spacing

footer:
  gap: spacing
  margin-block-start: spacing

close-control:
  color: color
  size: sizing
  inset: spacing

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

열림 상태, 호출자, 초기 포커스, 닫힌 뒤 복원 위치를 하나의 lifecycle로 설계한다. 작업 완료, 취소, 외부 dismiss는 결과가 다를 수 있으므로 모두 같은 “닫기” 이벤트로 손실시키지 않는다. 네이티브 `<dialog>.showModal()`은 top layer, backdrop, background inertness를 제공하므로 요구사항과 브라우저 지원이 맞으면 우선 검토한다. [`<dialog>` 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)

### 레이아웃

dialog 표면은 작은 viewport와 확대 환경에서 화면 밖으로 밀려나지 않아야 한다. 긴 콘텐츠는 제목·주요 action의 문맥을 잃지 않도록 스크롤 소유자를 명확히 하고, 포커스된 요소가 sticky 영역이나 viewport에 가려지지 않게 한다. [WCAG 2.2 Reflow와 Focus Not Obscured](https://www.w3.org/TR/WCAG22/)

### 접근성

초기 포커스는 콘텐츠를 먼저 읽어야 하는지, 가장 안전한 action이 무엇인지에 따라 달라진다. 파괴적 확인에서는 되돌릴 수 없는 action으로 자동 포커스하지 않는 것이 APG의 informative 권고다. 명시적 닫기 버튼은 아이콘만 보여도 정확한 접근 가능한 이름을 가져야 한다. [APG Dialog Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

`aria-modal="true"`는 배경을 실제로 inert하게 만드는 기능이 아니다. 커스텀 ARIA dialog는 focus, pointer, accessibility tree의 배경 접근을 구현에서 함께 차단해야 한다. 반대로 네이티브 modal dialog는 브라우저가 같은 문서의 나머지를 inert하게 처리한다. [`aria-modal` 명세](https://www.w3.org/TR/wai-aria/#aria-modal), [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)

### 렌더링과 브라우저

네이티브 modal dialog는 top layer에 배치되므로 일반 stacking context의 큰 `z-index`로 같은 동작을 재현하려 하지 않는다. [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) 열림·닫힘 애니메이션은 `display`, top-layer 참여, `::backdrop`의 discrete transition 특성을 고려해야 한다. [`<dialog>` 애니메이션](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#animating_dialogs) 포털을 쓰는 경우 논리적 호출 관계, form 소유권, SSR hydration 위치가 보존되는지도 확인한다.

## 검증 관점

- dialog가 열리면 목적에 맞는 내부 요소로 포커스가 이동하는가
- `Tab`과 `Shift+Tab`으로 배경에 도달할 수 없는가
- 포인터와 보조 기술에서도 배경이 조작 불가능한가
- `Escape`와 명시적 닫기 버튼이 정책에 맞게 동작하는가
- 닫힌 뒤 호출자 또는 다음 작업 위치로 포커스가 복원되는가
- 제목만 읽어도 dialog 목적을 알 수 있는가
- 긴 콘텐츠, 확대, 모바일 viewport에서도 action과 포커스가 가려지지 않는가
- 중첩 dialog를 닫을 때 가장 위 표면과 focus 복원 스택이 유지되는가

## 출처

- [WAI-ARIA 1.2: dialog](https://www.w3.org/TR/wai-aria/#dialog)
- [WAI-ARIA 1.2: aria-modal](https://www.w3.org/TR/wai-aria/#aria-modal)
- [WAI-ARIA APG Dialog Pattern (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [APG Modal Dialog Example (informative)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
- [HTML Standard: dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [MDN `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [MDN `showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
