# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 가이드를 제공합니다.

## 프로젝트 개요

`@jongh/cli`라는 PandaCSS 기반 디자인 시스템 CLI입니다. 프로젝트는 다음을 포함합니다:

- 디자인 시스템 컴포넌트 설치를 위한 CLI 도구 (shadcn과 유사)
- PandaCSS와 React로 구축된 컴포넌트 라이브러리
- 컴포넌트 예제가 포함된 문서 사이트
- 디자인-코드 워크플로우를 위한 Figma 통합 도구

## 아키텍처

### Monorepo 구조 (pnpm workspaces)

- `app/docs/` - Next.js 문서 사이트
- `packages/cli/` - 컴포넌트 설치용 메인 CLI 도구
- `packages/ui/` - Storybook이 포함된 React 컴포넌트 라이브러리
- `packages/panda-animation/` - PandaCSS용 애니메이션 유틸리티
- `configs/` - 공유 ESLint 및 TypeScript 설정

### 주요 기술

- **PandaCSS**: 디자인 토큰과 타입 세이프 스타일링이 포함된 디자인 라이브러리
- **Turborepo**: Monorepo 빌드 오케스트레이션
- **Vitest**: 테스팅 프레임워크
- **Storybook**: 컴포넌트 개발 및 테스팅
- **Next.js**: 문서 사이트
- **Velite**: 문서용 콘텐츠 관리

## 개발 명령어

### 루트 레벨 명령어

- `pnpm dev` - 개발 서버 시작 (Vite)
- `pnpm lint` - 모든 패키지에서 ESLint 실행 (styled-system/ 무시)
- `pnpm ci` - 전체 CI 파이프라인 실행 (lint, check-type, test via Turbo)
- `pnpm ci:version` - Changesets로 패키지 버전 관리
- `pnpm ci:publish` - Changesets로 패키지 배포

### 패키지별 명령어

- `turbo run build` - 모든 패키지 빌드
- `turbo run dev` - 모든 개발 서버 시작
- `turbo run test` - 모든 패키지에서 테스트 실행
- `turbo run lint` - 모든 패키지 린트
- `turbo run check-type` - TypeScript 타입 체킹

### 문서 사이트 (app/docs/)

- `pnpm dev` - Turbopack이 포함된 Next.js 개발 서버
- `pnpm build` - 정적 문서 사이트 빌드
- `pnpm check-type` - TypeScript 체킹
- `pnpm prepare` - PandaCSS 산출물 생성

### 컴포넌트 라이브러리 (packages/ui/)

- Vitest addon이 포함된 Storybook을 통해 테스트 실행
- 컴포넌트는 PandaCSS recipe 패턴 (cva/sva) 따름
- 모든 컴포넌트는 해당하는 Storybook 스토리를 가짐

### CLI 패키지 (packages/cli/)

- `vitest` - CLI 테스트 실행
- 주요 명령어: `add`, `init`, `mcp`, `radix-import`

## 디자인 시스템 가이드라인

### PandaCSS 토큰 시스템

- **엄격한 토큰 사용**: 모든 스타일 속성은 디자인 토큰을 사용해야 함 (strictTokens: true)
- **시맨틱 토큰**: 기본 토큰보다 `preset.ts`의 시맨틱 토큰 우선 사용
- **컬러 시스템**: 테마 변형이 포함된 foreground/background 패턴 사용
- **타이포그래피**: 미리 정의된 텍스트 스타일 (display, title, heading, body, label, caption)

### PandaCSS 사용 시 주의사항

- **styled-system/ 폴더 관리**:
  - `styled-system/` 폴더는 PandaCSS가 자동 생성하는 산출물 디렉토리
  - **절대 수동으로 편집하지 말것**: 이 폴더의 파일들은 `panda codegen` 또는 `pnpm prepare` 실행 시 재생성됨
  - Git에서 무시됨 (`.gitignore`에 포함)
  - ESLint에서도 무시됨 (`pnpm lint` 실행 시)
  - 변경이 필요한 경우 `panda.config.ts` 또는 `preset.ts`를 수정할 것
- **코드 생성 명령어**:
  - `panda codegen` - styled-system 폴더 재생성
  - `pnpm prepare` - 빌드 전 PandaCSS 산출물 생성
- **import 경로**:
  - 생성된 파일에서 import: `import { css } from '../styled-system/css'`
  - 상대 경로는 프로젝트 구조에 따라 조정 필요
- **타입 안정성**:
  - styled-system이 생성되지 않으면 TypeScript 에러 발생
  - 새 프로젝트 클론 후 반드시 `pnpm prepare` 또는 `panda codegen` 실행

### 컴포넌트 개발

- 단일 요소 컴포넌트에는 `cva`, 다중 파트 컴포넌트에는 `sva` 사용
- 기본 스타일과 변형이 포함된 recipe.ts 패턴 따름
- 모든 컴포넌트는 적절한 TypeScript 타입을 가져야 함
- Focus 상태는 ring 속성 대신 `outline: "none"`과 `borderColor` 사용
- hover/focus 상태에는 투명도 수식어 사용 (예: `primary/90`)

### 커밋 가이드라인

- commitlint와 함께 conventional commits 사용
- 허용된 타입: feat, fix, docs, style, refactor, test, chore, release
- lint-staged가 포함된 Husky pre-commit hooks

## 주요 파일 및 패턴

### 컴포넌트 구조

```
packages/ui/src/component/[name]/
├── ui/
│   ├── index.tsx    # 메인 컴포넌트 구현
│   └── recipe.ts    # PandaCSS 스타일링 recipes (cva/sva)
└── stories/         # Storybook 스토리 및 테스트
```

### 설정 파일

- `panda.config.ts` - presets이 포함된 PandaCSS 설정
- `preset.ts` - 커스텀 디자인 토큰 및 시맨틱 컬러 시스템
- `turbo.json` - Turborepo 빌드 파이프라인 설정
- `.cursor/rules/` - Cursor AI용 개발 가이드라인

### 테스팅

- 유닛 테스트용 Vitest
- 시각적 및 접근성 테스팅용 Storybook addon
- 일관성을 위해 스토리를 통해 컴포넌트 테스트

## 디자인 토큰 사용 규칙

1. 하드코딩된 값 대신 항상 토큰 사용
2. 시맨틱 토큰 우선 사용 (primary, secondary, destructive 등)
3. 기본 배경의 텍스트에는 foreground 컬러 변형 사용
4. 컬러 배경의 텍스트에는 해당하는 .foreground 컬러 사용
5. 토큰 변형과 함께 상태 조건 적용 (\_hover, \_focus, \_disabled)
6. 타이포그래피 일관성을 위해 텍스트 스타일 사용 (display1, title1, body1 등)
