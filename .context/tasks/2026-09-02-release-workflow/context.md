---
title: dev 기반 npm 릴리즈 흐름 정리
date: 2026-09-02
references:
  - kind: file
    value: .github/workflows
  - kind: file
    value: scripts/release
  - kind: note
    value: 이 대화에서 합의한 기능 PR, Release PR, npm publish 흐름
---

# dev 기반 npm 릴리즈 흐름 정리

## What

`dev`에 반영된 코드를 기준으로 공개 패키지의 실제 배포 내용이 npm과 달라졌는지 판정하고, 변경된 패키지만 버전 반영한 Release PR을 만든 뒤 그 PR이 병합되면 npm에 배포하는 흐름을 만든다.

## Why

현재 워크플로우는 패키지 비교, PR 판정, Changeset 생성, 버전 반영, 배포 책임이 섞여 있어 실행 조건과 순서를 예측하기 어렵다. 패키지가 여러 개인데도 배포 변경 여부를 하나로 취급할 위험이 있고, 실제 배포와 다른 pack 결과를 비교하면 불필요한 Release PR이 생긴다.

## Context

- 기능 PR의 CI는 버전 및 배포와 무관하다.
- npm 배포 소스는 항상 `dev`에 병합된 정확한 커밋이다.
- 일반 기능 머지에서는 npm 최신 tarball과 현재 `dev`의 `pnpm pack` 결과를 패키지별로 비교한다.
- 변경된 패키지가 있을 때만 AI가 Changeset 내용을 작성하고 Changesets가 버전, 내부 의존성, changelog를 반영한다.
- 하나의 Release PR은 병합 직후 `changeset publish`로 배포할 수 있는 상태여야 한다.
- Release PR 병합은 다시 Release PR을 만들지 않고 별도 npm 배포 흐름으로 들어간다.
- 강제 배포 라벨은 사용하지 않는다. 필요한 경우에도 Release PR을 만들어 검토 후 병합한다.
- 사용자는 PR을 squash merge한다.
- `dev` 반영 후 작업을 조정하는 상위 워크플로우는 이벤트명이 아니라 CD 책임이 드러나는 이름을 사용한다.

## Done

- `dev` 푸시에서 일반 기능 머지와 Release PR 머지를 한 곳에서 구분한다.
- 상위 워크플로우의 파일명과 표시 이름에서 CD 역할을 바로 알 수 있다.
- 일반 기능 머지는 공개 패키지별 변경 여부만 계산하는 독립 Action을 사용한다.
- 변경된 패키지만 대상으로 하나의 배포 준비 완료 상태의 Release PR을 만든다.
- Release PR 병합 시 PR 조회나 브랜치 판정 없이 전달받은 정확한 SHA를 빌드하고 `changeset publish`한다.
- 비교 결과는 실제 배포와 같은 pnpm 버전 및 `pnpm pack` 산출물을 기준으로 한다.
- 릴리즈 관련 검사와 기존 CI가 통과한다.
