---
name: animateButton
platform: web
---

# Animate Button

## Overview

기존 Button의 크기, 의미, focus, disabled, click 동작을 유지하면서 hover나 press에 transform 기반 피드백을 더한다. pulse, bounce, shake, press 모션은 모두 종료·취소 후 기준 위치와 크기로 복귀한다.

## Anatomy

```text
AnimateButton (button)
└─ Content
```

애니메이션을 적용해도 최종 DOM에는 Content를 가진 button 하나만 남는다. 모션을 위한 별도 대화형 요소를 추가하지 않는다.

## Behavior

- hover trigger는 hover를 지원하는 포인터가 Button 위에 있는 동안 모션을 실행한다. Button의 click은 별도로 유지한다.
- click trigger는 pointer나 keyboard로 Button을 누르는 동안 모션을 실행하고 release·cancel에서 복귀한다.
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
  transition: transform {motion.duration} {motion.easing};
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

- 모션 wrapper가 필요해도 button 안에 다른 button을 만들지 않는다. 이벤트, focus, disabled 속성은 실제 button 하나가 소유한다.
- x, y, scale만 바꾸면 주변 layout을 다시 계산하지 않고 같은 hit area에서 피드백을 줄 수 있다.
- `transform-origin: center`는 press scale이 한쪽으로 밀려 보이지 않게 한다.
- `will-change`가 필요하면 애니메이션 중에만 적용하고 종료 후 제거해 불필요한 compositor layer를 계속 유지하지 않는다.

## Accessibility

- 최종 element는 Button의 접근 가능한 이름, role, disabled, focus 동작을 그대로 가진다.
- 모션은 실행 결과나 상태의 유일한 표시가 되지 않는다.
- keyboard press에도 pointer press와 같은 피드백을 제공한다.
- 사용자의 reduced-motion 설정을 존중한다.

## Tests

- 최종 DOM에 대화형 element가 하나만 있는지 확인한다.
- hover와 press 시작·종료 후 transform이 기준값으로 돌아오는지 확인한다.
- pointer cancel과 focus 손실 뒤에도 transform이 남지 않는지 확인한다.
- disabled Button이 실행되거나 애니메이션되지 않는지 확인한다.
- keyboard 실행과 click handler가 Button 계약을 유지하는지 확인한다.
- reduced motion에서 이동·scale 없이 동일한 명령이 실행되는지 확인한다.
