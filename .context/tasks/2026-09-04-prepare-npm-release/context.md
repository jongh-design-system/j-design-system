---
title: Prepare npm release 워크플로 단순화
date: 2026-09-04
references:
  - kind: github
    value: https://github.com/jongh-design-system/jds/issues/215
---

# Prepare npm release 워크플로 단순화

## What

GitHub Actions의 `Prepare npm release` 워크플로 흐름을 단순화하고, 변경 맥락을 배포 전까지 유지한다.

## Why

현재 워크플로는 PR 조회부터 Release PR 생성까지 한 번에 처리해 흐름이 복잡하다. 또한 실제 배포 대상은 npm과 `dev`의 누적 차이지만 Codex에는 현재 PR 하나의 맥락만 전달되어, 미배포 변경이 누적되면 실제 변경 범위와 AI의 맥락이 달라질 수 있다.

## Context

`dev`가 코드와 미배포 변경의 기준이다. 병합된 PR의 변경 맥락은 changelog 스타일의 Changeset으로 `dev`에 누적되어야 하며, 실제 release 시 누적된 Changeset이 패키지 버전과 `CHANGELOG.md`로 변환된다. 병합 PR이 없는 push는 이후 작업을 실행하지 않고 정상 종료해야 한다.

## Done

- 병합된 PR의 변경 맥락이 `.changeset/*.md`로 `dev`에 유지된다.
- 여러 미배포 변경의 맥락이 실제 release까지 누적된다.
- 병합 PR이 없는 push는 워크플로를 실패시키지 않는다.
- Release PR을 닫아도 이전 변경 맥락이 유실되지 않는다.
- 실제 npm 배포는 `dev`에 반영된 release 결과를 사용한다.
