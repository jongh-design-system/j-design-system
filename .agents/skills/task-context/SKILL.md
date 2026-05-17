---
name: task-context
description: Use when starting or resuming a coding task and the user needs task intent, background, done criteria, and related references captured before technical planning or implementation.
---

# Task Context

Create or update a lightweight task context document before technical planning starts.

This skill does one job: make the current work understandable to both the user and future AI agents. It captures what the task is, why it exists, what context matters, and what "done" means.

**Core principle:** Capture the problem, not the solution. Preserve intent, background, references, and done criteria without making design or implementation decisions.

## Output Location

Use one directory per task, with the context stored at `context.md`:

```text
.context/tasks/YYYY-MM-DD-<task-slug>/context.md
```

If the user is continuing the same task, update that task's `context.md`. If the goal materially changes, create a new task directory.

## Document Format

```markdown
---
title: <task title>
date: YYYY-MM-DD
references:
  - kind: <url | file | github | linear | jira | figma | note>
    value: <link, path, ticket id, or short note>
---

# <Task Title>

## What

<What this task is trying to do.>

## Why

<Why this task exists or why it matters.>

## Context

<Background the AI must know to avoid misunderstanding the work.>

## Done

<What must be true for this task to be considered complete.>

## Notes

<Optional. Extra facts, unresolved details, or follow-up context.>
```

Omit `Notes` if there is nothing useful to put there.

## Reference Rules

`references` is intentionally open-ended. Do not create fixed fields like `github_issue` or `linear_issue`.

References may be:

- GitHub issues, PRs, commits, branches
- Linear or Jira tickets
- Google Docs, Figma, Slack, Notion, or any URL
- Local files or directories
- A short note when the source is only conversation context

Use `references: []` when there are no references.

## Boundaries

This document is context, not a technical plan.

Do include:

- what the user wants
- why the work exists
- user-provided background
- product/domain facts
- links and local files that explain the task
- completion criteria

Do not include unless the user explicitly asks for it in this document:

- implementation steps
- file change lists
- architecture decisions
- library choices
- test strategy
- command plans

## Common Mistakes

| Mistake                                                    | Fix                                          |
| ---------------------------------------------------------- | -------------------------------------------- |
| Turning context into a plan                                | Move implementation steps to `writing-plans` |
| Designing architecture here                                | Leave design decisions for `brainstorming`   |
| Creating a new task directory for the same continuing goal | Update the existing task context             |
| Leaving `Done` vague                                       | Make completion observable                   |
| Treating guesses as facts                                  | Mark uncertainty in `Notes` or ask           |
| Re-asking captured facts                                   | Read and update existing context first       |

## Red Flags

Never:

- Include implementation steps unless explicitly requested
- Choose architecture, libraries, files, or commands
- Duplicate an existing task directory for the same goal
- Treat inferred guesses as user-provided facts
- Re-ask facts already captured in the existing context

Always:

- Start from an existing `.context/tasks/<task-slug>/context.md` file when continuing work
- Keep `Done` concrete enough to guide later design
- Put design decisions in `brainstorming`, not task context
- Use `references: []` when there are no references
- Keep the document short enough to scan quickly

## Integration

This skill feeds later workflow skills:

1. `task-context` captures the problem definition.
2. `brainstorming` consumes the exact `context.md` path and writes the approved design to the same task directory.
3. `writing-plans` turns the approved design into implementation steps.

Do not collapse these stages into one document.

## Workflow

1. Identify whether this is a new task or continuation.
2. Gather context from the user's message and any provided references.
3. Ask only for missing information that blocks a useful context document.
4. Write or update `.context/tasks/YYYY-MM-DD-<task-slug>/context.md`.
5. Keep the document concise. Prefer direct facts over inferred explanations.
6. After writing, summarize the `context.md` path and the key captured context.
