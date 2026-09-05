# @jongh/ui

## 2.20260905.2

### Minor Changes

- e14077b: Adds a built-in icon system to `@jongh/ui`, including the `Icon` component and seven exported line icons with supported sizing, semantic foreground colors, and standard SVG props. Existing UI components now use these icons internally, and consumers do not need to migrate.

## 2.20260905.1

### Patch Changes

- cc56c6f: Fixes distributed UI recipe modules failing during import with `p is not a function` by ensuring Panda runtime helpers are initialized independently of the public entry. The CLI package is republished with the corresponding updated package artifacts. No migration is required.

## 2.20260902.1

### Major Changes

- 4527f23: Make `@jongh/ui` the canonical source for components, design tokens, responsive layout primitives, and component-scoped CSS. The Panda/Tailwind implementation choice and `Chip` are removed; migrate `Chip` usages to `Badge`, import components from the package root, and load `@jongh/ui/theme/blue.css` or `@jongh/ui/theme/purple.css` when selecting a color theme.

## 1.6.5

### Patch Changes

- Updated dependencies [2b064ae]
  - panda-animation@0.1.0

## 1.6.4

### Patch Changes

- Updated dependencies [7b2feec]
  - panda-animation@0.0.2

## 1.6.3

### Patch Changes

- Updated dependencies [412a4ca]
  - @jongh/panda-preset@1.4.0

## 1.6.2

### Patch Changes

- Updated dependencies [cb4aefa]
  - @jongh/panda-preset@1.3.0

## 1.6.1

### Patch Changes

- Updated dependencies [fc499b8]
  - @jongh/panda-preset@1.2.0

## 1.6.0

### Minor Changes

- a27c196: add fadeIn keyframes in preset

### Patch Changes

- Updated dependencies [a27c196]
  - @jongh/panda-preset@1.1.0

## 1.5.22

### Patch Changes

- Updated dependencies
  - @jongh/panda-preset@1.0.0
