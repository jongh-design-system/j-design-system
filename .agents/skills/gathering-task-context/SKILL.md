---
name: gathering-task-context
description: Gathers complete development context before any implementation begins. Use when starting a new task — whether from a GitHub issue, Linear ticket, or rough idea. Explores external sources and codebase autonomously, identifies gaps by task type, and fills them through targeted questions. Produces a context document. Does NOT write code or make technical decisions.
---

# Gathering Task Context

Understand a development task completely before any implementation begins.

## Hard Gate

**NEVER write code. NEVER make technical decisions. NEVER suggest implementation approaches.**

This skill only gathers and structures understanding. All decisions happen in the next step.

## Quick Start

User provides one of:

- GitHub issue URL → fetch and explore
- Linear ticket URL → fetch and explore
- Rough idea in natural language → clarify and structure

Output: a context document the user approves before moving on.

## Flow

### Step 1: Detect Input Type

Examine what the user gave you:

- **URL (github.com/_/issues/_)** → GitHub mode
- **URL (linear.app/\*)** → Linear mode
- **Free text / rough idea** → Idea mode

If unclear, ask: "GitHub issue나 Linear 티켓 링크가 있어, 아니면 아이디어부터 얘기할까?"

### Step 2: Autonomous Exploration

**Before asking the user anything**, explore what's available.

**GitHub mode:**

- Fetch the issue body, labels, assignees
- Follow any linked issues or PRs in the body
- Fetch parent issue if referenced
- Check linked PR diffs if present
- Search the codebase for mentioned file paths or function names

**Linear mode:**

- Fetch ticket title, description, status, labels
- Follow linked issues or sub-issues
- Search the codebase for mentioned areas

**Idea mode:**

- Search the codebase for areas related to the idea
- Check recent commits in relevant files
- Look for existing patterns or similar implementations

Explore up to 2 levels deep. Stop when you have enough to assess task type and gaps.

### Step 3: Detect Task Type

Based on gathered context, classify:

```
switch(taskType) {

  case "bug-fix":
    // Something is broken, needs to be fixed
    gaps = [재현경로, 에러내용, 기대동작, 영향범위]

  case "feature":
    // New capability being added
    gaps = [왜필요한가, 누가쓰는가, 범위, 완료기준]

  case "refactor":
    // Existing code being restructured
    gaps = [무엇이문제인가, 어디까지건드리나, 바꾸면안되는것]

  case "unknown":
    // Ask the user to clarify task type first
    → "이게 버그 픽스야, 새 기능 추가야, 아니면 리팩토링이야?"
}
```

If the task type is ambiguous after exploration, ask before proceeding.

### Step 4: Fill Gaps Iteratively

Check each gap item. For each:

- If answerable from explored context → fill it, no question needed
- If unanswerable → ask the user

**Rules:**

- One question per message, never multiple at once
- Ask the most important gap first
- After each answer, re-check remaining gaps before asking the next
- If a gap can be answered by codebase exploration, do that instead of asking

### Step 5: Confirm and Write Context Document

When all gaps are filled, present a summary:

> "이 정도면 작업 시작할 수 있을 것 같아. 확인해줘."

After user confirms, write the context document.

## Context Document Format

Save to `docs/context/YYYY-MM-DD-<task-slug>.md`:

```markdown
# [Task Title]

## 타입

Bug Fix / Feature / Refactor

## 목표

무엇을, 왜 해야 하는가

## 현재 상태 (AS-IS)

관련 코드 위치, 현재 동작 방식

## 완료 기준

이게 되면 끝 (구체적으로)

## 제약 / 참고

- 관련 이슈 링크
- 기술적 제약
- 건드리면 안 되는 것
```

## Gap Checklist by Task Type

### Bug Fix

- [ ] 재현 경로: 어떻게 하면 발생하는가?
- [ ] 에러 내용: 정확히 무슨 일이 벌어지는가?
- [ ] 기대 동작: 원래 어떻게 되어야 하는가?
- [ ] 영향 범위: 어디에, 누구에게 영향을 미치는가?

### Feature

- [ ] Why: 왜 이 기능이 필요한가?
- [ ] Who: 누가 사용하는가?
- [ ] Scope: 어디까지인가? 무엇이 포함되지 않는가?
- [ ] Done: 완료 기준이 무엇인가?

### Refactor

- [ ] Problem: 현재 무엇이 문제인가?
- [ ] Scope: 어디까지 변경하는가?
- [ ] Constraints: 무엇을 바꾸면 안 되는가? (인터페이스, 동작 등)

## Key Principles

- **탐색 먼저, 질문 나중** — 이미 알 수 있는 건 직접 파악하고 물어보지 않는다
- **질문은 하나씩** — 여러 질문을 한꺼번에 쏟아붓지 않는다
- **결정 없음** — 어떻게 구현할지는 일절 언급하지 않는다
- **코드 없음** — 코드 스니펫, 접근법 제안, 아키텍처 의견 없음
