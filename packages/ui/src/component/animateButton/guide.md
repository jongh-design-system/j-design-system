---
name: animateButton
platform: web
---

# Animate Button

## 역할

Animate Button은 버튼의 기존 의미와 동작을 보존하면서 사용자의 의도적인 입력, 실행 가능 상태 또는 작업 결과에 대한 짧은 시각 피드백을 모션으로 보강한다. 모션은 동작 자체가 아니며, 애니메이션이 실행되지 않거나 중단되어도 버튼의 기능과 상태 전달은 완전해야 한다.

## 보장해야 하는 계약

| 조건                                        | 규칙                                                                                                                             | 근거                                                                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 항상                                        | 애니메이션 래퍼가 버튼의 역할, 접근 가능한 이름, 키보드 동작, 포커스, 비활성 상태를 바꾸거나 중복된 대화형 요소를 만들지 않는다. | 사용자 인터페이스 컴포넌트의 이름, 역할, 상태와 값은 프로그램적으로 결정 가능해야 한다. [S1]                                                              |
| 입력 피드백을 제공할 때                     | 피드백은 사용자의 실제 의도와 연결되고 즉시 시작되며, 버튼의 본래 동작 완료를 애니메이션 종료에 의존시키지 않는다.               | Carbon은 목적 있는 모션과 사용자 입력에 대한 즉각적인 피드백을 평가 기준으로 둔다. [S2]                                                                   |
| hover로 모션을 유발할 때                    | hover를 지원하지 않는 입력에서도 버튼의 상태와 동작을 온전히 알 수 있어야 하며, hover 모션을 유일한 피드백으로 사용하지 않는다.  | `hover` 미디어 기능은 주 입력 장치가 편리하게 hover할 수 있는지를 구분하며 많은 모바일 입력은 그렇지 않다. [S3]                                           |
| 사용자가 감소된 모션을 선호할 때            | 비필수 이동과 크기 변화는 제거하거나 정적인 상태 변화로 대체한다. 기능, 결과, 오류 정보는 그대로 유지한다.                       | `prefers-reduced-motion`은 비필수 모션을 제거·감소·대체하려는 사용자 선호를 전달하며 [S4], 상호작용 유발 비필수 애니메이션은 비활성화 가능해야 한다. [S5] |
| 모션 도중 새 입력이나 반대 상태가 발생할 때 | 오래된 애니메이션을 무조건 대기열에 쌓지 않는다. 현재 시각 상태에서 새 의도를 반영하도록 취소, 대체 또는 자연스럽게 전환한다.    | Web Animations API는 실행 중 애니메이션을 취소하고 효과를 제거하는 제어 모델을 제공한다. [S6]                                                             |
| 모션이 상태나 결과를 강조할 때              | 의미를 모션에만 맡기지 않고 상태 속성, 텍스트, 색 또는 아이콘 등 프로젝트가 정한 정적 표현과 함께 전달한다.                      | 감소된 모션에서도 같은 메시지를 정적으로 전달할 대안이 필요하다는 Carbon 지침과 일치한다. [S2]                                                            |
| 버튼이 비활성 또는 처리 중일 때             | 애니메이션이 실제 실행 가능 여부와 모순되는 affordance를 만들지 않는다. 반복 입력 허용 여부는 제품 동작 계약이 결정한다.         | 컴포넌트 상태는 프로그램적으로 결정 가능해야 한다. [S1]                                                                                                   |

## 프로젝트에서 결정할 항목

| 결정                          | 적용 조건                         | 판단에 사용하는 정보                                      |
| ----------------------------- | --------------------------------- | --------------------------------------------------------- |
| 모션이 해결하는 사용자 문제   | 모션을 추가할 때마다              | User journey, Interaction model, Information hierarchy    |
| 유발 시점                     | 입력 또는 상태 변화에 반응할 때   | Pointer, Keyboard, Touch, Product behavior                |
| 피드백의 시각적 속성          | 모션이 유효하다고 판단될 때       | Motion foundation, Brand expression, Component geometry   |
| 지속 시간과 easing            | 모션을 사용할 때                  | Motion foundation, Travel distance, Interaction frequency |
| 반복 입력과 interruption 정책 | 연속 입력이 가능할 때             | Action idempotency, Async behavior, State machine         |
| 감소된 모션 대체 표현         | 비필수 모션이 있을 때             | Accessibility preference, Color, State messaging          |
| 성공, 오류, 처리 중 표현      | 버튼이 실행 결과를 직접 나타낼 때 | Product feedback model, Status components, Accessibility  |
| 표현적 모션의 허용 범위       | 중요한 순간을 강조하려 할 때      | Brand, Frequency, User task criticality                   |

## 토큰 결정 지도

```yaml
feedback:
  transition-duration: motion
  transition-timing-function: motion
  transform-distance: motion
  transform-scale: motion
  opacity: motion

state:
  color: color
  background-color: color
  border-color: color

focus:
  outline-color: color
  outline-width: border
  outline-offset: spacing

reduced-motion:
  transition-duration: motion
  opacity: motion
```

이 지도는 모션 값을 직접 정하지 않는다. `state`와 `focus`는 기반 Button의 결정이 우선하며 Animate Button이 별도 시각 체계를 만들지 않는다.

## 엔지니어링 지식

### 의미와 동작

Animate Button은 Button의 표현 계층이다. 내부에 별도의 버튼을 중첩하거나 애니메이션을 위해 의미 없는 요소를 실제 입력 대상으로 바꾸지 않는다. 클릭, 키보드 활성화, 폼 제출은 기반 Button의 계약을 그대로 따른다.

모션은 “입력을 받았다”, “실행할 수 없다”, “결과가 도착했다” 중 무엇을 나타내는지 하나의 의도를 가져야 한다. hover는 탐색적 포인터 상태이고 activation은 실제 실행 의도이므로 같은 의미로 취급하지 않는다. 결과 모션이 필요하면 비동기 상태 머신에서 결과를 받아 시작하며, 단지 포인터가 떠났다는 이유로 성공이나 오류 정보가 사라지지 않게 한다.

### 레이아웃

시각적 이동이나 크기 변화가 주변 문서 흐름을 재배치하지 않도록 최종 버튼의 레이아웃 공간을 유지한다. 변형된 버튼이 인접 컨트롤을 가리거나 컨테이너에 잘리거나, 포커스 표시가 잘리지 않는지 확인한다. 버튼의 시각적 위치를 크게 이동시키는 피드백은 사용자가 누르려는 목표와 표시 위치를 어긋나게 할 수 있으므로 제품 목적 없이 사용하지 않는다.

처리 중 레이블이나 아이콘이 바뀌는 경우에도 버튼의 폭 변화와 주변 레이아웃 이동을 별도로 평가한다. 모션은 레이아웃 안정성 문제를 숨기는 수단이 아니다.

### 접근성

감소된 모션 선호에서는 단순히 duration만 짧게 만드는 것으로 충분한지 판단한다. 이동과 확대 자체가 문제라면 이를 제거하고 색, 테두리, 아이콘 또는 즉시 완료 상태 같은 정적 피드백으로 바꾼다. [W3C의 상호작용 유발 애니메이션 설명][S5]은 비필수 모션을 끌 수 있어야 한다고 명시한다.

애니메이션은 포커스 표시를 대신하지 않는다. 시각 효과가 접근 가능한 이름이나 live region을 반복 변경해 불필요한 재발표를 만들지 않게 한다. 반복적이거나 자동으로 계속되는 효과로 확장한다면 자동 시작 모션에 대한 pause, stop, hide 요구도 별도로 적용한다. [S7]

### 렌더링과 브라우저

실행 중 애니메이션을 명시적으로 추적해 새 의도에서 이전 효과를 취소하거나 대체한다. 취소 시 완료 promise가 거부될 수 있으므로 취소를 오류 결과로 오인하지 않는다. [S6] 컴포넌트가 제거되거나 비활성화되거나 감소된 모션 설정이 바뀔 때 남아 있는 효과와 완료 콜백을 정리한다.

hover 지원 여부는 viewport 크기로 추정하지 않는다. 브라우저가 제공하는 입력 기능 질의를 사용하고 키보드, 터치, 포인터 각각에서 실제 상태 전이를 확인한다. 성능이 낮은 장치에서도 입력 처리가 애니메이션 프레임에 막히지 않아야 한다.

## 검증 관점

- 모션을 완전히 끈 상태에서도 버튼의 실행, 결과, 오류와 비활성 상태를 이해할 수 있는가
- 키보드, 터치, 마우스 입력에서 같은 기능이 동작하고 hover가 유일한 피드백이 되지 않는가
- 빠르게 반복 입력하거나 반대 상태로 바꿀 때 오래된 애니메이션이 쌓이거나 뒤늦게 재생되지 않는가
- 애니메이션 완료 전에 버튼을 제거하거나 비활성화해도 오래된 콜백이 상태를 덮어쓰지 않는가
- 시각적 이동과 크기 변화가 인접 컨트롤, 포커스 표시, hit area를 가리거나 잘라내지 않는가
- 감소된 모션 설정을 런타임에 바꿔도 기능과 최종 상태가 보존되는가
- 애니메이션 래퍼가 중첩 버튼, 중복 포커스 정지점, 중복 accessible name을 만들지 않는가
- 처리 중 반복 실행 정책과 실제 버튼 활성 상태가 일치하는가

## 출처

- [S1] [WCAG 2.2, Success Criterion 4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG22/#name-role-value)
- [S2] [Carbon Design System, Motion](https://carbondesignsystem.com/elements/motion/overview/)
- [S3] [MDN, `hover` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/hover)
- [S4] [MDN, `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [S5] [W3C WAI, Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [S6] [MDN, `Animation.cancel()`](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel)
- [S7] [W3C WAI, Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
