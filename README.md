# @jongh/cli - PandaCSS 기반 컴포넌트 CLI

## 프로젝트 소개

- 프로젝트를 진행하면서, 디자인과 관련된 비효율적인 문제를 겪었고,
  이러한 문제를 해결하는 방법 중, 디자인 시스템이라는 것을 접하게 되었고 이를 구현해보고 싶다는 들어 시작하게 되었습니다
- [문서 링크](https://whdgur.shop)

## 🛠 기술 스택

<div align="left">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/pandacss-FFCA28.svg?style=for-the-badge&logo=panda&logoColor=black" alt="PandaCSS" />
  <img src="https://img.shields.io/badge/turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
  <img src="https://img.shields.io/badge/AWS%20S3-%23569A31.svg?style=for-the-badge&logo=amazon-s3&logoColor=white" alt="AWS S3" />
</div>

## 한계점 및 개선 노력

1. 1인 디자인 시스템 개발의 한계

- 팀 내에서 많은 사람들이 사용하고 피드백을 받는 환경이 아니어서 실제 사용 경험에 기반한 개선에 어려움을 겪음
- 이러한 한계를 극복하기 위해 발생할 수 있는 다양한 시나리오를 예측하며 개발 진행

2. 디자이너의 부재

- 전문 디자이너 없이 진행하는 프로젝트였기에 시각적으로 화려한 UI 구현보다는 시스템적 접근과 사용자 경험(UX) 향상에 집중
- 체계적인 시스템 구축에 중점을 두어, 일관된 사용자 경험을 제공하고 향후 디자인 변경 시 빠르게 대응할 수 있는 구조를 마련
- 디자인 퀄리티 확보를 위한 다양한 방법 활용:
- Apple, Google, KRDS의 UX 가이드라인을 분석하고 적용하여 검증된 사용자 경험 원칙 준수
- Figma를 활용해 퀄리티 높은 디자인 시안을 확보하고, Figma plugin을 활용하여 코드로 빠르게 구현하는 방식 선택
- 최근에는 AI(Cursor, Figma MCP)를 활용하여 기존 작업 과정을 더욱 단축

## 이 프로젝트를 통해 해결하고 싶은 과정

**디자인 에셋 관리 미흡**: 일관된 관리 체계 부재로 재사용성 저하

**디자인-코드 구현 비효율**: 디자인 시안을 코드로 옮기는 과정에서 소통 오류 및 중복 작업 발생

**컴포넌트 파편화**: 유사한 기능을 하는 컴포넌트가 중복 개발되어 UI 일관성 및 유지보수성 저하

**스타일 하드코딩**: 스타일 값을 직접 코드에 입력하는 방식으로 변경 시 많은 코드 수정 필요

## 해결을 위해 선택한 결정

### pandacss 도입

- 개인 능력을 고려했을 때 시스템을 구축하고 유지보수하기 위해서는 추상화 수준이 높은 라이브러리의 도움을 받는 것이 좋겠다고 판단
- 다양한 속성의 디자인 에셋(animation,typo,color 등)을 토큰으로 관리할수 있고, 컴포넌트 variant별 스타일 정의등을 API를 통해 간단하게 관리하면서, type-safe한 스타일을 적용할 수 있다는 점을 높게 평가하여 도입
- 작은 커뮤니티, 검증되지 않은 기능

### 디자인 토큰화

- 색상, 간격, 타이포그래피 등을 토큰으로 관리하여 일관성 확보
- `semanticToken` API를 활용하여 베이직 토큰에 계층을 추가하여 유지보수하기 편하고, 다크모드에 폭넓게 대응할 수 있는 토큰 시스템 구성

### 확장성과 일관성을 고려한 컴포넌트 설계

- UI에서 핵심 기능은 일관적으로 제공하고, 이외의 기능은 자유롭게 customize할 수 있도록 설계
- 핵심 기능은 UX 가이드라인을 참고
- customize를 위해 합성 컴포넌트, custom hook 등 리액트의 다양한 패턴을 통해 구현

### CLI를 통한 컴포넌트 코드 제공

- pandacss의 특성상 npm 패키지로 제공하기에는 복잡한 빌드 설정과 사용자 입장에서도 많은 설정이 요구됨
- shadcn에서 영감을 받아, CLI를 통해 필요한 컴포넌트 코드만 일부 제공하는 방식으로 변경

### storybook driven development

- 컴포넌트 제작부터 테스트까지 storybook을 활용
- vitest addon을 활용하여 유닛 테스트, visual 테스트, a11y 테스트를 진행하고 있습니다
- 이 밖에도 다양한 addon을 활용하여 컴포넌트 제작에 활용

### UI 직접 개발 -> 다양한 library 사용

- 더 큰 단위의 컴포넌트를 빠르게 만들기 위해 UI의 기본 로직을 headless UI 라이브러리로 변경
- framer-motion, radix-ui custom hook 등 안정되고 UI 제작에 필요한 다양한 오픈소스를 사용

### 테스트 with vitest+storybook

- storybook의 테스트 기능을 활용하여 제작한 모든 컴포넌트에 대한 테스트 진행
- storybook vitest addon으로 더 빠른 테스트 진행
- UX 원칙을 기반으로 테스트 코드를 작성 -> 컴포넌트의 스타일 변경, 라이브러리 변경에도 일관되게 유지

## 작업 중 및 추후 개선사항

- 다양한 오픈소스 및 AI tool을 적극적으로 활용하여 더 많은 UI를 빠르고, 안정적으로 제작하기
- 문서화 완성하기
