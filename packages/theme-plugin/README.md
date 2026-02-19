# @jongh/theme-plugin

Tailwind CSS v4 theme plugin with semantic color tokens and light/dark mode support.

## Install

```bash
npm install @jongh/theme-plugin
```

## Quick Start

Add the plugin to your CSS file:

```css
@import "tailwindcss";
@plugin "@jongh/theme-plugin";
```

This loads the **default** theme. Use theme tokens as Tailwind utilities:

```html
<button class="bg-primary text-primary-content rounded-selector">
  Click me
</button>
```

## Themes

Three built-in themes are available: **default**, **ocean**, and **forest**.

### Selecting Themes

Configure via the `@plugin` options block:

```css
/* Load default theme */
@plugin "@jongh/theme-plugin";

/* Load a specific theme as default */
@plugin "@jongh/theme-plugin" {
  themes: ocean --default;
}

/* Load multiple themes */
@plugin "@jongh/theme-plugin" {
  themes:
    ocean --default,
    forest;
}

/* Load all built-in themes */
@plugin "@jongh/theme-plugin" {
  themes: all;
}

/* Disable themes */
@plugin "@jongh/theme-plugin" {
  themes: false;
}
```

The `--default` flag sets which theme applies to `:root`. Without it, the first theme listed becomes the default.

## Color Tokens

All colors use the [OKLCh](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) color space.

| Token       | Content Token       | Description        |
| ----------- | ------------------- | ------------------ |
| `base-100`  | `base-content`      | Page background    |
| `base-200`  |                     | Subtle background  |
| `base-300`  |                     | Border / divider   |
| `primary`   | `primary-content`   | Primary action     |
| `secondary` | `secondary-content` | Secondary action   |
| `accent`    | `accent-content`    | Accent / highlight |
| `neutral`   | `neutral-content`   | Neutral surface    |
| `info`      | `info-content`      | Informational      |
| `success`   | `success-content`   | Success state      |
| `warning`   | `warning-content`   | Warning state      |
| `error`     | `error-content`     | Error state        |

Each color has a matching `-content` variant for text on that color's background.

## Design Tokens

| CSS Variable        | Tailwind Utility   | Description                |
| ------------------- | ------------------ | -------------------------- |
| `--radius-selector` | `rounded-selector` | Interactive element radius |
| `--radius-field`    | `rounded-field`    | Input field radius         |
| `--radius-box`      | `rounded-box`      | Container radius           |
| `--size-selector`   | —                  | Interactive element sizing |
| `--size-field`      | —                  | Input field sizing         |
| `--border`          | —                  | Default border width       |
| `--depth`           | —                  | Shadow / depth level       |
| `--noise`           | —                  | Visual noise effect        |

## Dark Mode

Dark mode works automatically via `prefers-color-scheme: dark`. No extra configuration needed — the plugin generates both light and dark token sets for each theme.

```css
/* Generated output (simplified) */
:where(:root),
[data-theme="default"] {
  --color-primary: oklch(45% 0.24 277);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :where(:root),
  [data-theme="default"] {
    --color-primary: oklch(58% 0.233 277);
    color-scheme: dark;
  }
}
```

## Theme Switching

Switch themes at runtime by setting the `data-theme` attribute:

```html
<html data-theme="ocean">
  <!-- ocean theme applied -->
</html>
```

```js
// Switch theme via JavaScript
document.documentElement.dataset.theme = "forest"
```

For React apps with Next.js, pair with [next-themes](https://github.com/pacocoursey/next-themes) for SSR-safe theme management.

## Tailwind Utilities

The plugin extends Tailwind with these utilities:

**Colors** — All color tokens are available as standard Tailwind color utilities:

```html
<div class="bg-primary text-primary-content">Primary</div>
<div class="bg-base-100 text-base-content border border-base-300">Card</div>
<span class="text-error">Error message</span>
```

**Border Radius** — Semantic radius tokens:

```html
<button class="rounded-selector">Button</button>
<input class="rounded-field" />
<div class="rounded-box">Card</div>
```
