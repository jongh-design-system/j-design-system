# UI 라이브러리 번들링

## 산출물

- 공개 ESM 엔트리: `dist/index.js`
- 전체 CSS 엔트리: `dist/style.css`
- 공통 CSS: `dist/base.css`
- 컴포넌트 CSS: `dist/recipes/<recipe>.css`
- 번들 외부에 유지하는 런타임: `react`, `react-dom`, `radix-ui`
- 컴포넌트를 가져오면 공통 CSS와 해당 컴포넌트에서 도달 가능한 recipe CSS만 연결된다.

## 처리 순서

```text
소스 import 그래프
  → Rolldown codeSplitting.groups
  → JavaScript 청크와 청크 사이의 import
  → component-css의 generateBundle
  → CSS 파일 생성 및 컴포넌트 청크에 CSS import 삽입
```

`codeSplitting.groups`는 JavaScript 모듈이 배치될 청크를 결정한다.
`component-css`는 그 결과인 `OutputChunk.modules`와 `OutputChunk.imports`를
사용하며 JavaScript 청크 배치에는 관여하지 않는다.

## 청크 배치

모든 그룹의 `priority`는 기본값이다. 둘 이상의 그룹과 일치하는 모듈에는
먼저 선언된 그룹이 적용된다.

| 순서 | 대상                                                                | 그룹 이름                                  | 생성 단위         | 사용 목적                  |
| ---: | ------------------------------------------------------------------- | ------------------------------------------ | ----------------- | -------------------------- |
|    1 | `styled-system/recipes/<name>-recipe.mjs`, `create-recipe.mjs` 제외 | `name(id)`가 반환한 `recipe-<name>-recipe` | recipe마다 하나   | 컴포넌트와 recipe CSS 연결 |
|    2 | 나머지 `styled-system/*.mjs`                                        | 고정값 `panda-runtime`                     | 전체에 하나       | Panda 공통 함수 배치       |
|    3 | `src/icon/*`                                                        | 고정값 `icon-runtime`                      | 전체에 하나       | 아이콘 구현 배치           |
|    4 | `src/component/<name>/*`                                            | `name(id)`가 반환한 `component-<name>`     | 컴포넌트마다 하나 | 컴포넌트와 recipe CSS 연결 |

Recipe 모듈은 두 번째 규칙과도 일치한다. Recipe 규칙을 Panda 규칙보다 먼저
적용하여 각 recipe를 별도 청크에 배치한다. `create-recipe.mjs`를 포함한 나머지
Panda 모듈에는 두 번째 규칙을 적용한다.

`includeDependenciesRecursively: false`는 일치한 모듈만 해당 그룹에 배치한다.
그 모듈이 import한 모듈은 import한 쪽의 그룹을 따르지 않고 별도의 그룹
검사를 거친다.

```text
src/component/accordion/index.tsx
  → component-accordion

styled-system/recipes/accordion-recipe.mjs
  → recipe-accordion-recipe

styled-system/recipes/create-recipe.mjs
  → panda-runtime

src/icon/Icon.tsx
src/icon/generated/IconChevronDownLine.tsx
  → icon-runtime
```

`name(id)`는 하나의 규칙에서 모듈별로 다른 그룹 이름이 필요할 때 사용한다.
고정 `name`과 `test(id)`의 조합은 일치한 모든 모듈을 같은 그룹에 배치할 때
사용한다.

## 컴포넌트 CSS 연결

`component-css`는 Rolldown이 JavaScript 청크를 생성한 뒤 `generateBundle`에서
실행된다.

`src/component/<name>/index.tsx`를 포함하는 각 청크에 다음 처리를 적용한다.

1. 컴포넌트 소스 모듈이 정확히 하나인지 검사한다.
2. 동적 import가 없는지 검사한다.
3. 컴포넌트 청크와 그 청크가 직접 import하는 청크를 확인한다.
4. `styled-system/recipes/*-recipe.mjs` 모듈 이름을 수집한다.
5. 하나 이상의 recipe가 있는지 검사한다.
6. 각 recipe CSS를 `dist/recipes/<recipe>.css`로 한 번만 생성한다.
7. 컴포넌트 청크의 `"use client"` 다음에 `base.css`와 recipe CSS import를 삽입한다.

`base.css`는 Panda가 생성한 reset, global, token, utility CSS를 합쳐 빌드마다
한 번 생성한다.

Accordion의 산출물 관계:

```text
index.js
└─ component-accordion.js
   ├─ base.css
   ├─ recipes/accordion-recipe.css
   ├─ recipe-accordion-recipe.js
   │  └─ panda-runtime.js
   ├─ panda-runtime.js
   └─ icon-runtime.js
```

## 공유 구현 코드 배치

### Panda

Panda 공통 함수의 배치 위치를 지정하지 않았을 때 생성된 관계:

```text
index.js
└─ component-accordion.js
   └─ recipe-accordion-recipe.js
      └─ index.js
```

Recipe는 모듈 평가 중에 import한 Panda 함수를 호출한다. 위 관계에서는
`index.js` 본문이 실행되기 전에 recipe가 `index.js`의 Panda 함수를 읽는다.
`panda-runtime` 그룹은 마지막 import를 다음 관계로 변경한다.

```text
recipe-accordion-recipe.js → panda-runtime.js
```

평가 순서를 감싸는 코드를 추가하지 않고 즉시 실행되는 순환 관계를 제거한다.
`strictExecutionOrder`는 사용하지 않는다.

### 아이콘

`src/icon/*`는 공개 엔트리와 컴포넌트 구현에서 함께 import한다. 명시적으로
그룹을 배정한 결과:

```text
index.js → icon-runtime.js
component-accordion.js → icon-runtime.js
component-calendar.js → icon-runtime.js
component-dialog.js → icon-runtime.js
```

아이콘 청크에는 공통 `Icon` 컴포넌트와 생성된 SVG 컴포넌트가 들어 있다.
`icon-runtime`은 고정된 그룹 이름일 뿐 별도의 런타임 시스템을 의미하지 않는다.

## 엔트리 export 처리

`preserveEntrySignatures: "allow-extension"`은 `src/index.ts`의 export를 유지하면서
생성된 청크 사이의 import에 필요한 추가 binding을 엔트리 청크에서 export할 수
있게 한다. `index.js`의 export를 정확히 맞추기 위한 별도 facade 청크는 만들지
않는다.
