# React UI Design System 🎨

개인 사이드 프로젝트에서 사용하는 디자인 시스템입니다
개인용으로 제작되었으나, 다른 사용자가 사용하기에 제약이 없도록 headless 패턴을 적용했습니다

## Demo

storybook을 통해 결과물을 확인할 수 있습니다 [링크](https://6683c8acf34b923f7227be4a-etvwiuojnp.chromatic.com/?path=/story/accordion--primary)

## Tech Stack ⚛️

[![My Skills](https://skillicons.dev/icons?i=react&perline=3)](https://skillicons.dev) ![React Version](https://img.shields.io/badge/React-18+-blue)

PandaCSS

## Features ✨

- PandaCSS를 활용한 스타일 관리
- 독립적인 UI 로직과 스타일 분리
- Figma 디자인 토큰 기반 SSOT 원칙 준수
- CLI를 통한 손쉬운 컴포넌트 설치 (실험적)

## Usage 📦

1. PandaCSS 설치
2. 스타일 preset 설치 [@jongh/panda-preset](https://www.npmjs.com/package/@jongh/panda-preset)
3. PandaCSS config에 preset 등록
4. CLI 또는 직접 코드를 복사하여 컴포넌트 사용

## Architecture 🏗️

pnpm workspace를 통한 monorepo 구조:

### @jongh/panda-preset

스타일 시스템 관리

- Figma 디자인 토큰 가공
- 컴포넌트 스타일 레시피 제공
- clean-package를 통한 로컬/배포 환경 분기

### @jongh/cli

컴포넌트 설치 CLI 제공

### UI

- 컴포넌트 UI 로직 구현
- Storybook을 통한 컴포넌트와 관련된 모든 테스트 진행
- Chromatic을 통한 배포
