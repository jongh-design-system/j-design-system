---
name: code-judgment
description: use when evaluate/determine code. Evaluate code against specific principles without forcing refactoring. Focuses on unnecessary indirection, type SSOT, and other patterns that affect code readability and maintainability.
---

# Code Judgment

This skill evaluates code based on specific principles. It does not automatically refactor or force changes—it provides judgment and identifies patterns that align or conflict with the defined principles.

## Purpose

- Identify code patterns that violate or align with core principles
- Provide reasoning for why certain patterns should be avoided or embraced
- Help maintain consistency in code style and architecture decisions
- Works across JS/TS, React, and various library-specific code

## How It Works

When reviewing code, this skill:

1. Analyzes the code against each principle in `principles/`
2. Identifies violations or good patterns
3. Explains **why** the pattern matters (not just what's wrong)
4. Provides judgment without forcing immediate refactoring

## Principles

All principles are documented in the `principles/` directory:

- **indirection.md** - Avoiding unnecessary abstraction and wrapper functions
- **type-ssot.md** - Single Source of Truth for type definitions

Each principle includes:

- Core concept and rationale
- Bad examples (what to avoid)
- Good examples (what to prefer)
- Judgment criteria

## Usage

Invoke this skill when:

- Reviewing code for consistency with established patterns
- Evaluating whether abstractions add value or complexity
- Checking type definition strategies
- Assessing code readability and predictability

The skill provides feedback in the format:
"This violates [principle]: [specific reason and context]"

## Philosophy

Code should be:

- Predictable (read top-to-bottom)
- Direct (avoid unnecessary indirection)
- Consistent (single source of truth for types and data)
- Meaningful (abstractions must serve a purpose)
