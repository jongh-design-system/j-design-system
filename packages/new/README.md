# Native Design System

현재 `packages/new/*` 아래에는 기존 PandaCSS 경로와 분리된 새 디자인 시스템 구현선이 들어 있다.

이 구현은 런타임 CSS-in-JS 엔진이 아니라, **토큰/레시피를 TS로 작성하고 정적 산출물(CSS/JS/DTS)을 생성하는 방식**이다.

- 핵심 컨셉(코어 로직에는 특정 스타일 라이브러리 의존성을 제거)은 유지하지만, 구현 로직은 수정 가능

## 패키지 구성

### `@jongh/new-system-spec`

- 위치: [system-spec](/Users/jh/jds/packages/new/system-spec)
- 역할: source of truth
- 포함:
  - primitive token
  - semantic token
  - recipe
  - keyframes
  - 최종 system 입력 객체

중요 파일:

- [system.ts](/Users/jh/jds/packages/new/system-spec/src/system.ts)
- [primitive.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/primitive.ts)
- [semantic.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/semantic.ts)
- [color/palette.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/color/palette.ts)
- [color/semantic.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/color/semantic.ts)
- [recipes](/Users/jh/jds/packages/new/system-spec/src/recipes)

### `@jongh/new-system-core`

- 위치: [system-core](/Users/jh/jds/packages/new/system-core)
- 역할: 엔진 본체
- 포함:
  - authoring helper
  - 타입 모델
  - token/reference validator
  - token resolver
  - CSS generator
  - recipe JS/DTS generator
  - build orchestrator

중요 파일:

- [define.ts](/Users/jh/jds/packages/new/system-core/src/define.ts)
- [types/tokens.ts](/Users/jh/jds/packages/new/system-core/src/types/tokens.ts)
- [types/style.ts](/Users/jh/jds/packages/new/system-core/src/types/style.ts)
- [resolve/tokens.ts](/Users/jh/jds/packages/new/system-core/src/resolve/tokens.ts)
- [generate/css.ts](/Users/jh/jds/packages/new/system-core/src/generate/css.ts)
- [generate/js.ts](/Users/jh/jds/packages/new/system-core/src/generate/js.ts)
- [generate/dts.ts](/Users/jh/jds/packages/new/system-core/src/generate/dts.ts)
- [build.ts](/Users/jh/jds/packages/new/system-core/src/build.ts)

### `@jongh/new-system-output`

- 위치: [system-output](/Users/jh/jds/packages/new/system-output)
- 역할: generated artifact 패키지
- 포함:
  - styles
  - tokens
  - recipe JS/DTS/CSS
  - react helper
  - theme helper

빌드 스크립트:

- [build.ts](/Users/jh/jds/packages/new/system-output/scripts/build.ts)

실제 생성 위치:

- [generated/styles](/Users/jh/jds/packages/new/system-output/src/generated/styles)
- [generated/tokens](/Users/jh/jds/packages/new/system-output/src/generated/tokens)
- [generated/recipes](/Users/jh/jds/packages/new/system-output/src/generated/recipes)

## 전체 흐름

1. `system-spec`에서 토큰과 recipe를 정의한다.
2. `system.ts`가 이 데이터를 하나의 `system` 객체로 묶는다.
3. `system-core/build.ts`가 `system`을 입력으로 받는다.
4. build 과정에서
   - token reference validation
   - recipe validation
   - CSS 생성
   - recipe JS 생성
   - recipe DTS 생성
     을 수행한다.
5. 결과를 `system-output/src/generated/*`에 쓴다.
6. 소비자는 `system-output`의 CSS, recipe, react helper, theme helper를 import한다.

## 현재 토큰 구조

현재 토큰 계층은 2단계다.

1. primitive token
2. semantic token

### Primitive token

- color
- spacing
- radius
- typography
- shadow
- motion

primitive token은 최종적으로 CSS 변수 원천값이 된다.

예:

- `color.blue.500`
- `spacing.4`
- `radius.md`
- `typography.body.md`
- `motion.duration.fast`

현재 color primitive는 [color.css](/Users/jh/jds/packages/new/system-spec/color.css) 값을 기준으로 정리돼 있고, [palette.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/color/palette.ts)에서 source로 사용한다.

### Semantic token

semantic token은 실제 UI가 쓰는 역할 이름이다.

예:

- `color.bg.surface`
- `color.fg.default`
- `color.stroke.subtle`
- `color.success.default`

semantic color 정의 파일:

- [color/semantic.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/color/semantic.ts)

semantic token 집계 파일:

- [tokens/semantic.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/semantic.ts)

## Recipe 구조

현재 recipe는 두 종류다.

1. single recipe
2. slot recipe

예:

- single recipe: [button.ts](/Users/jh/jds/packages/new/system-spec/src/recipes/button.ts)
- slot recipe: [avatar.ts](/Users/jh/jds/packages/new/system-spec/src/recipes/avatar.ts)

recipe는 아래 구조를 가진다.

- `name`
- `base`
- `variants`
- `compoundVariants`
- `defaultVariants`
- slot recipe인 경우 `slots`

현재 recipe authoring은 타입 세이프하게 동작한다.

예:

- 없는 semantic color token은 TS 단계에서 에러
- 없는 typography token은 TS 단계에서 에러
- slot recipe에서 잘못된 slot/value 조합은 TS 단계에서 에러

타입 회귀 테스트:

- [type-tests.ts](/Users/jh/jds/packages/new/system-spec/src/type-tests.ts)

## 생성되는 파일

`system-output build`를 실행하면 아래가 생성된다.

### Styles

- [base.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/base.css)
- [all.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/all.css)
- [reset.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/reset.css)
- [base.layered.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/base.layered.css)
- [all.layered.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/all.layered.css)
- [reset.layered.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/reset.layered.css)

의미:

- `base.css`: token vars + semantic vars + keyframes
- `all.css`: `base.css` + 모든 recipe css
- `reset.css`: spec 원본 reset 복사
- `base.layered.css`: `base.css`를 `@layer jds-base`로 감싼 버전
- `all.layered.css`: `base.layered.css` + 모든 recipe css를 `@layer jds-components`로 감싼 버전
- `reset.layered.css`: `reset.css`를 `@layer base`로 감싼 버전

### Tokens

- [tokens/index.js](/Users/jh/jds/packages/new/system-output/src/generated/tokens/index.js)
- [tokens/index.d.ts](/Users/jh/jds/packages/new/system-output/src/generated/tokens/index.d.ts)

### Recipes

recipe별로 아래 3개가 생성된다.

- `generated/recipes/<name>.css`
- `generated/recipes/<name>.layered.css`
- `generated/recipes/<name>.js`
- `generated/recipes/<name>.d.ts`

예:

- [avatar.css](/Users/jh/jds/packages/new/system-output/src/generated/recipes/avatar.css)
- [avatar.js](/Users/jh/jds/packages/new/system-output/src/generated/recipes/avatar.js)
- [avatar.d.ts](/Users/jh/jds/packages/new/system-output/src/generated/recipes/avatar.d.ts)

### React / Theme Helpers

- [react/index.js](/Users/jh/jds/packages/new/system-output/src/react/index.js)
- [theme/index.js](/Users/jh/jds/packages/new/system-output/src/theme/index.js)

## `avatar.js`가 생성되는 방식

예시로 [avatar.js](/Users/jh/jds/packages/new/system-output/src/generated/recipes/avatar.js)는 아래 흐름으로 만들어진다.

1. 입력 recipe:
   - [avatar.ts](/Users/jh/jds/packages/new/system-spec/src/recipes/avatar.ts)
2. JS generator:
   - [generate/js.ts](/Users/jh/jds/packages/new/system-core/src/generate/js.ts)
3. build orchestrator:
   - [build.ts](/Users/jh/jds/packages/new/system-core/src/build.ts)

이 파일은 CSS를 담는 파일이 아니라:

- slot class map 생성
- defaultVariants 병합
- variant className 조합
- `splitVariantProps`

를 제공하는 runtime JS다.

즉:

- 스타일 규칙은 `avatar.css`
- className 계산은 `avatar.js`

로 분리되어 있다.

## 소비 방식

현재 소비 방식은 static CSS 기반이다.

예:

```ts
import "@jongh/new-system-output/styles/reset.css"
import "@jongh/new-system-output/styles/all.css"
```

```ts
import { button } from "@jongh/new-system-output/recipes/button"

const className = button({ size: "sm", tone: "accent" })
```

즉:

- CSS는 엔트리에서 import
- recipe JS는 className 생성기로 import
- UI는 className만 붙인다

## 현재 구현의 성격

이 구현은:

- runtime CSS-in-JS가 아니다
- TS spec을 입력으로 받는 static CSS codegen 시스템이다

즉 흐름은:

`TS spec -> validation -> CSS/JS/DTS generation -> consumer import`

이다.

## 현재 한계

현재 구현 기준 한계도 명확하다.

1. primitive token value는 `csstype` 기반 타입이지만 literal 오타를 엄격히 막지는 못한다.
   예:

- `radius.md = "1re"` 같은 오타는 현재 통과할 수 있다.

2. 조건 기반 token system은 아직 미구현이다.
   즉:

- `light/dark`
- `mobile/pc`
  같은 condition-aware primitive token은 아직 없다.

3. 현재 semantic token은 color 중심으로 구현되어 있다.

4. `packages/new/*`는 아직 기존 메인 경로에 완전히 연결된 상태가 아니라, 별도 구현선이다.

## 현재 기준으로 시작할 때 보는 파일

처음 이해할 때는 이 순서로 보면 된다.

1. [system.ts](/Users/jh/jds/packages/new/system-spec/src/system.ts)
2. [primitive.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/primitive.ts)
3. [semantic.ts](/Users/jh/jds/packages/new/system-spec/src/tokens/semantic.ts)
4. [avatar.ts](/Users/jh/jds/packages/new/system-spec/src/recipes/avatar.ts)
5. [build.ts](/Users/jh/jds/packages/new/system-core/src/build.ts)
6. [generate/css.ts](/Users/jh/jds/packages/new/system-core/src/generate/css.ts)
7. [generated/styles/all.css](/Users/jh/jds/packages/new/system-output/src/generated/styles/all.css)
8. [generated/recipes/avatar.js](/Users/jh/jds/packages/new/system-output/src/generated/recipes/avatar.js)
