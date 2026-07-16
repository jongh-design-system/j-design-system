---
name: animateButton
platform: web
---

# Animate Button

## Overview

Button의 의미와 실행 동작을 그대로 유지하면서 press, 실행 가능 상태 또는 짧은 결과 피드백을 transform 기반 모션으로 보강한다. 모션이 실행되지 않아도 명령은 완전해야 한다.

## Anatomy

```text
AnimateButton
└─ motion.button (final Button element)
   └─ Content
```

Button의 `asChild`가 `motion.button`에 합성되어 최종 button element는 하나만 남는다. 기존 Button의 크기, variant, disabled, focus 계약을 그대로 사용한다.

## Behavior

- hover trigger는 fine pointer에서만 보조 피드백을 제공하고 실행을 대신하지 않는다.
- click trigger는 완료된 click 뒤가 아니라 pointer·keyboard press 동안 피드백을 제공한다.
- pulse, bounce, shake는 짧게 실행한 뒤 기준 위치와 scale로 돌아온다.
- press는 누르는 동안만 scale을 바꾸고 release 또는 cancel 시 즉시 복귀한다.
- reduced motion에서는 translate와 scale 반복을 생략하고 Button 동작과 상태 변경은 그대로 유지한다.

## CSS

```css
.animate-button {
  transform: translate3d(
      var(--animate-button-x, 0),
      var(--animate-button-y, 0),
      0
    )
    scale(var(--animate-button-scale, 1));
  transform-origin: center;
}

@media (prefers-reduced-motion: reduce) {
  .animate-button {
    --animate-button-x: 0;
    --animate-button-y: 0;
    --animate-button-scale: 1;
    animation: none;
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- Button의 `asChild` 합성은 Motion element에 스타일과 event를 전달하되 최종 DOM에 button 하나만 남겨야 한다.
- x, y, scale만 바꾸면 주변 layout을 다시 계산하지 않고 같은 hit area에서 피드백을 줄 수 있다.
- `transform-origin: center`는 press scale이 한쪽으로 밀려 보이지 않게 한다.
- `will-change`가 필요하면 애니메이션 중에만 적용하고 종료 후 제거해 불필요한 compositor layer를 계속 유지하지 않는다.
- Motion을 쓰면 `whileHover`, `whileTap`, variants에 같은 transform 값을 매핑하고 reduced-motion 설정에서 initial과 target을 같은 값으로 만든다.

## Accessibility

- 최종 element는 Button의 접근 가능한 이름, role, disabled, focus 동작을 그대로 가진다.
- 모션만으로 성공, 오류, loading 상태를 전달하지 않는다.
- keyboard press에도 pointer press와 같은 피드백을 제공한다.
- 사용자의 reduced-motion 설정을 존중한다.

## Tests

- 최종 DOM에 대화형 element가 하나만 있는지 확인한다.
- hover와 press 시작·종료 후 transform이 기준값으로 돌아오는지 확인한다.
- pointer cancel과 focus 손실 뒤에도 transform이 남지 않는지 확인한다.
- disabled Button이 실행되거나 애니메이션되지 않는지 확인한다.
- keyboard 실행과 click handler가 Button 계약을 유지하는지 확인한다.
- reduced motion에서 이동·scale 없이 동일한 명령이 실행되는지 확인한다.
