# CLAUDE.md - Documentation Site Design System Guide

이 파일은 `/app/docs` 디렉토리에서 작업할 때 Claude Code에게 디자인 시스템 가이드를 제공합니다.

## PandaCSS 설정 개요

이 프로젝트는 **PandaCSS**를 사용하여 타입 세이프하고 일관성 있는 스타일링을 구현합니다.

### 설정 파일 위치

- `panda.config.ts` - PandaCSS 메인 설정 파일
- `preset.ts` - 커스텀 디자인 토큰 및 시맨틱 컬러 시스템 정의
- `styled-system/` - **자동 생성 폴더 (절대 수정 금지!)**

### 핵심 설정

```typescript
{
  preflight: true,              // CSS reset 적용
  jsxFramework: "react",
  outdir: "styled-system",      // 자동 생성 디렉토리
  presets: [
    preset(),                   // panda-animation 프리셋
    "@pandacss/preset-panda",   // PandaCSS 기본 프리셋
    defaultPreset               // 커스텀 프리셋 (preset.ts)
  ]
}
```

### 다크 모드 조건

```typescript
conditions: {
  light: "[data-color-mode=light] &",
  dark: "[data-color-mode=dark] &"
}
```

## 디자인 토큰 시스템

### 1. 시맨틱 컬러 토큰

모든 컬러는 **시맨틱 토큰**을 우선적으로 사용합니다. 직접적인 컬러 값(예: `#eeeeee`) 사용을 피하고, 의미를 담은 토큰을 사용하세요.
시멘틱 토큰은 다크 모드에 대응되는 컬러가 존재합니다. 다크 모드일 때 변경이 불필요하다면 일반 토큰(예: `blue.600`)을 사용하세요

#### 배경 및 기본 컬러

```typescript
// 메인 배경
background: "background"          // white / slate.950
foreground: "foreground"          // slate.900 / slate.50

// 카드 및 팝오버
card: "card"                      // white / slate.900
card.foreground: "card.foreground" // slate.900 / slate.50
popover: "popover"                // white / slate.900
popover.foreground: "popover.foreground" // slate.900 / slate.50
```

#### 인터랙티브 컬러 (버튼, 링크 등)

**사용 패턴**: 각 컬러는 `.DEFAULT`와 `.foreground`를 가집니다.

- `.DEFAULT`: 배경 컬러로 사용
- `.foreground`: 해당 배경 위의 텍스트 컬러로 사용

```typescript
// Primary (주요 액션)
bg: "primary" // slate.800 / slate.400
color: "primary.foreground" // white / slate.950

// Secondary (보조 액션)
bg: "secondary" // gray.600 / gray.400
color: "secondary.foreground" // white / gray.950

// Destructive (삭제, 위험한 액션)
bg: "destructive" // red.600 / red.400
color: "destructive.foreground" // white / slate.950

// Muted (비활성, 보조 정보)
bg: "muted" // slate.100 / slate.800
color: "muted.foreground" // slate.500 / slate.400

// Accent (강조)
bg: "accent" // gray.200 / gray.700
color: "accent.foreground" // gray.900 / gray.50
```

#### 보더 및 입력 필드

```typescript
border: "border" // slate.200 / slate.800
border: "input" // gray.200 / gray.800
ring: "ring" // slate.500 / slate.400

// 시맨틱 보더 토큰 (borders 객체)
border: "base" // 1px solid {colors.border}
border: "input" // 1px solid {colors.input}
border: "primary" // 1px solid {colors.primary}
border: "destructive" // 1px solid {colors.destructive}
```

### 2. 타이포그래피 토큰 (textStyles)

**중요**: 하드코딩된 fontSize/fontWeight 대신 `textStyle` 속성을 사용하세요.

#### Display (히어로 섹션, 대형 제목)

```typescript
textStyle: "display1" // 72px (4.5rem), bold, loose line-height
textStyle: "display2" // 60px (3.75rem), bold, relaxed line-height
```

#### Title (섹션 제목)

```typescript
textStyle: "title1" // 36px (2.25rem), semibold
textStyle: "title2" // 24px (1.5rem), semibold
textStyle: "title3" // 20px (1.25rem), bold
```

#### Heading (서브 헤딩)

```typescript
textStyle: "heading1" // 18px (1.125rem), semibold
textStyle: "heading2" // 16px (1rem), semibold
```

#### Body (본문 텍스트)

```typescript
textStyle: "body1" // 16px (1rem), normal, relaxed line-height
textStyle: "body2" // 14px (0.875rem), normal
```

#### Label & Caption (UI 요소, 작은 텍스트)

```typescript
textStyle: "label1" // 14px (0.875rem), semibold, wide letter-spacing
textStyle: "label2" // 12px (0.75rem), semibold, wide letter-spacing
textStyle: "caption1" // 12px (0.75rem), semibold, tight line-height
textStyle: "caption2" // 10px (0.625rem), semibold, tight line-height
```

### 3. 간격 및 크기 토큰

PandaCSS 기본 spacing scale을 사용합니다 (0.25rem = 4px 단위):

```typescript
// 간격
px: "4" // 16px (1rem)
py: "2" // 8px (0.5rem)
gap: "3" // 12px (0.75rem)
m: "6" // 24px (1.5rem)

// 크기
w: "full" // 100%
h: "12" // 48px (3rem)
minH: "10" // 40px (2.5rem)
```

### 4. Border Radius 토큰

```typescript
rounded: "radius" // 8px (0.5rem) - 커스텀 토큰
rounded: "sm" // PandaCSS 기본값
rounded: "md" // PandaCSS 기본값
rounded: "lg" // PandaCSS 기본값
rounded: "xl" // PandaCSS 기본값
```

### 5. 커스텀 유틸리티

#### fluidFontSize (반응형 폰트)

viewport에 따라 부드럽게 크기가 변하는 폰트 사이즈:

```typescript
fluidFontSize: "1rem" // 360px~640px 구간에서 유동적으로 변화
// clamp(1rem, calc(...), 1.5rem)으로 변환됨
```

## 스타일링 패턴 및 규칙

### ✅ 올바른 사용 예시

```typescript
import { css } from "styled-system/css"

// 1. 시맨틱 토큰 사용
const button = css({
  bg: "primary",
  color: "primary.foreground",
  textStyle: "label1",
  px: "4",
  py: "2",
  rounded: "md",
  _hover: {
    bg: "primary/90", // 투명도 수식어
  },
  _disabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
})

// 2. 다크모드 대응
const card = css({
  bg: "card",
  color: "card.foreground",
  border: "base",
  p: "6",
  rounded: "lg",
})

// 3. 텍스트 스타일
const heading = css({
  textStyle: "title1",
  color: "foreground",
  mb: "4",
})

// 4. 반응형 디자인
const container = css({
  px: { base: "4", md: "6", lg: "8" },
  maxW: "1200px",
  mx: "auto",
})
```

### ❌ 피해야 할 패턴

```typescript
// ❌ 하드코딩된 값
const bad = css({
  fontSize: "16px", // ✅ textStyle: "body1"
  color: "#1e293b", // ✅ color: "foreground"
  padding: "12px 16px", // ✅ px: "4", py: "3"
  borderRadius: "8px", // ✅ rounded: "md" 또는 "radius"
})

// ❌ 직접적인 컬러 토큰 (시맨틱 컨텍스트가 있을 때)
const bad2 = css({
  bg: "blue.600", // ✅ bg: "primary"
  color: "slate.900", // ✅ color: "foreground"
})

// ❌ ring 속성 사용 (이 디자인 시스템에서는 사용 안 함)
const bad3 = css({
  ring: "2px", // ✅ outline: "none", borderColor: "primary"
})
```

### 상태 변형 패턴

```typescript
// Hover/Focus/Active 상태
const interactive = css({
  bg: "primary",
  _hover: { bg: "primary/90" }, // 투명도 수식어
  _focus: {
    outline: "none",
    borderColor: "primary",
  },
  _active: { transform: "scale(0.98)" },
  _disabled: { opacity: "0.5" },
})

// 다크모드 조건
const themed = css({
  color: { base: "slate.900", _dark: "slate.50" },
})
```

## 컴포넌트 작성 가이드

### 1. 시맨틱 토큰 우선 순위

1. **최우선**: 시맨틱 토큰 (`primary`, `destructive`, `muted` 등)
2. **차선**: 기본 컬러 토큰 (`slate.600`, `blue.500` 등)
3. **절대 금지**: 하드코딩된 값 (`#2563eb`, `16px` 등)

### 2. 텍스트 컬러 선택 가이드

| 배경 타입     | 사용할 텍스트 컬러       |
| ------------- | ------------------------ |
| `background`  | `foreground`             |
| `card`        | `card.foreground`        |
| `primary`     | `primary.foreground`     |
| `destructive` | `destructive.foreground` |
| `muted`       | `muted.foreground`       |
| `accent`      | `accent.foreground`      |

### 3. Focus 상태 처리

이 디자인 시스템에서는 **`ring` 대신 `outline`과 `borderColor` 조합**을 사용합니다:

```typescript
const input = css({
  border: "input",
  _focus: {
    outline: "none",
    borderColor: "primary",
  },
})
```

### 4. 반응형 breakpoints

```typescript
const breakpoints = {
  sm: "0px", // Mobile first
  md: "640px", // Tablet
  lg: "1024px", // Desktop
}

// 사용 예시
const responsive = css({
  fontSize: { base: "14px", md: "16px", lg: "18px" },
  px: { base: "4", md: "6", lg: "8" },
})
```

## styled-system 폴더 관리

### ⚠️ 중요: 절대 수동 편집 금지!

`styled-system/` 폴더는 PandaCSS가 자동으로 생성하는 산출물입니다.

- **자동 생성**: `panda codegen` 또는 `pnpm prepare` 실행 시 생성/재생성
- **Git 무시**: `.gitignore`에 포함되어 있음
- **수정 방법**: `panda.config.ts` 또는 `preset.ts` 파일을 수정 후 재생성

### 코드 생성 명령어

```bash
# styled-system 폴더 재생성
pnpm panda codegen

# 또는 prepare 스크립트 (빌드 전 자동 실행)
pnpm prepare
```

### import 경로

```typescript
// styled-system에서 import
import { css } from "styled-system/css"
import { flex, stack } from "styled-system/patterns"
```

## 애니메이션

`panda-animation` 프리셋이 포함되어 있어 100+ 애니메이션 키프레임을 사용할 수 있습니다:

```typescript
const animated = css({
  animation: "fadeIn 0.3s ease-in",
  _hover: {
    animation: "pulse 1s infinite",
  },
})
```

사용 가능한 애니메이션: `fadeIn`, `fadeOut`, `slideInUp`, `slideInDown`, `bounce`, `pulse`, `shake`, `wobble` 등

## 체크리스트

새로운 컴포넌트나 페이지를 작성할 때 다음을 확인하세요:

- [ ] 시맨틱 토큰을 우선적으로 사용했는가?
- [ ] `textStyle`을 사용하여 타이포그래피를 정의했는가?
- [ ] 하드코딩된 컬러/사이즈 값이 없는가?
- [ ] 배경과 텍스트 컬러가 올바르게 매칭되는가? (예: `primary` + `primary.foreground`)
- [ ] 다크모드에서도 올바르게 표시되는가?
- [ ] Focus 상태가 `outline`과 `borderColor`로 처리되었는가?
- [ ] 반응형 디자인이 필요한 경우 breakpoints를 사용했는가?
- [ ] `styled-system/` 폴더를 직접 수정하지 않았는가?

## 참고 자료

- PandaCSS 공식 문서: https://panda-css.com
- 프로젝트 루트 CLAUDE.md: `/Users/jh/jds/CLAUDE.md`
- 토큰 정의: `preset.ts` (app/docs/preset.ts)
- 설정 파일: `panda.config.ts` (app/docs/panda.config.ts)
