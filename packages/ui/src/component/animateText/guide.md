---
name: animateText
platform: web
---

# Animate Text

## Overview

원문의 의미와 읽기 순서를 유지하면서 line, word 또는 grapheme 단위 등장 순서를 모션으로 보여 준다. 분할된 조각은 시각 효과를 위한 렌더링 단위이며 새로운 콘텐츠가 아니다.

## Anatomy

```text
Container
└─ Item[]
   └─ OriginalTextSegment
```

line 모드는 전달된 line element를 Item으로 사용한다. word와 char 모드는 하나의 원문을 공백과 grapheme을 보존해 분할한다.

## Behavior

- Container가 hidden에서 show로 바뀌면 Item이 문서 순서대로 stagger된다.
- 각 Item은 opacity와 한 축의 translate만 바꾸고 최종 위치는 원래 text layout과 같다.
- 줄바꿈, 복사, selection, 검색 결과와 접근 가능한 이름은 모션 유무와 관계없이 원문과 같다.
- reduced motion에서는 stagger와 translate를 제거하고 최종 텍스트를 즉시 보여 준다.

## CSS

```css
.animate-text {
  white-space: pre-wrap;
}

.animate-text__item {
  display: inline-block;
  opacity: var(--animate-text-opacity, 1);
  transform:
    translate3d(
      var(--animate-text-x, 0),
      var(--animate-text-y, 0),
      0
    );
  transform-origin: center;
  transition:
    opacity {motion.duration} {motion.easing},
    transform {motion.duration} {motion.easing};
}

.animate-text__space {
  display: inline;
  white-space: pre-wrap;
}

.animate-text__line {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .animate-text__item {
    --animate-text-opacity: 1;
    --animate-text-x: 0;
    --animate-text-y: 0;
    animation: none;
    transition-duration: 0.01ms;
  }
}
```

## Engineering notes

- char 분할은 `split("")`이 아니라 locale-aware grapheme segmentation을 사용해야 emoji, 결합 문자, 한글 자모를 중간에서 자르지 않는다.
- word 분할은 공백 token을 버리지 않는다. `.animate-text__space`가 원문의 연속 공백과 줄바꿈을 보존한다.
- Item wrapper를 추가해도 heading, paragraph, link 같은 원래 semantic container는 바꾸지 않는다.
- `will-change`가 필요하면 Item이 실제로 움직이는 동안만 사용한다. 긴 문장의 모든 조각에 계속 남기면 layer와 메모리 비용이 커진다.
- Motion을 쓰면 Container variants의 `staggerChildren`과 Item variants의 opacity·x·y에 이 계약을 매핑한다.

## Accessibility

- DOM에서 읽히는 문자열과 시각 문자열의 내용·순서를 같게 유지한다.
- 장식용 복제 텍스트를 만들면 보조 기술과 text selection에서 제외하고 원문은 한 번만 노출한다.
- 모션이 끝나기 전에도 콘텐츠 자체가 접근성 tree에서 사라지지 않게 한다.
- reduced-motion 설정에서 모든 텍스트를 지연 없이 읽을 수 있어야 한다.

## Tests

- line, word, grapheme 분할 결과를 원문과 다시 결합해 동일한지 확인한다.
- 공백, 줄바꿈, emoji, 결합 문자, 한글 문자열을 확인한다.
- stagger 순서와 마지막 Item의 최종 상태를 확인한다.
- unmount 중 animation이 cancel되어 사라진 element에 완료 처리를 남기지 않는지 확인한다.
- 접근 가능한 이름, 복사 결과, selection 순서가 원문과 같은지 확인한다.
- reduced motion에서 모든 Item이 즉시 최종 상태로 보이는지 확인한다.
