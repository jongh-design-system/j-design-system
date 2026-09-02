---
"@jongh/ui": major
---

Make `@jongh/ui` the canonical source for components, design tokens, responsive layout primitives, and component-scoped CSS. The Panda/Tailwind implementation choice and `Chip` are removed; migrate `Chip` usages to `Badge`, import components from the package root, and load `@jongh/ui/theme/blue.css` or `@jongh/ui/theme/purple.css` when selecting a color theme.
