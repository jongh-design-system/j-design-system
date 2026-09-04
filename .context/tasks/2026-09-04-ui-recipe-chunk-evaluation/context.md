---
title: UI recipe chunk evaluation failure
date: 2026-09-04
references:
  - kind: file
    value: packages/ui/vite.lib.config.ts
  - kind: note
    value: Built UI recipes failed during consumer module evaluation with `p is not a function`.
---

# UI recipe chunk evaluation failure

## What

Prevent the built UI package from reading uninitialized Panda runtime helpers while recipe modules are evaluated.

## Why

Consumers must be able to evaluate the distributed UI entry and recipes without failing because of the generated chunk dependency graph.

## Context

The custom library chunking configuration produced an entry-to-component-to-recipe-to-entry dependency cycle. Some component chunks still import icon and layout values from the public entry, but those remaining references do not currently read the values during module evaluation.

## Done

The eager Panda runtime reverse reference is removed, the UI package type-checks and builds, and the PR records both the chosen scope and the remaining component-to-entry references.
