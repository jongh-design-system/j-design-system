# Design Tokens & Theming Guide

This guide covers the design token system in JH Design System, including how to customize themes, create semantic tokens, and implement dark mode support.

## Table of Contents

- [Overview](#overview)
- [Token Categories](#token-categories)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Sizing](#spacing--sizing)
- [Theme Customization](#theme-customization)
- [Dark Mode](#dark-mode)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)

---

## Overview

JH Design System uses a comprehensive token system built on PandaCSS that provides:

- **Consistency**: Standardized values across all components
- **Scalability**: Easy to extend and modify
- **Type Safety**: Full TypeScript support
- **Theme Support**: Light/dark mode and custom themes
- **Semantic Meaning**: Tokens with contextual purpose

### Token Architecture

```
Design Tokens
├── Base Tokens (Primitives)
│   ├── Colors (blue.500, gray.100)
│   ├── Spacing (1, 2, 4, 8)
│   ├── Typography (font sizes, weights)
│   └── Other primitives
└── Semantic Tokens (Contextual)
    ├── Colors (primary, secondary, destructive)
    ├── Spacing (xs, sm, md, lg)
    └── Component-specific tokens
```

---

## Token Categories

### Base Tokens

Primitive values that form the foundation of your design system.

```typescript
const baseTokens = {
  colors: {
    blue: {
      50: { value: "#eff6ff" },
      100: { value: "#dbeafe" },
      200: { value: "#bfdbfe" },
      // ... full scale
      900: { value: "#1e3a8a" },
    }
  },
  spacing: {
    1: { value: "0.25rem" },
    2: { value: "0.5rem" },
    4: { value: "1rem" },
    // ... scale continues
  }
}
```

### Semantic Tokens

Contextual tokens that reference base tokens and provide meaning.

```typescript
const semanticTokens = {
  colors: {
    primary: {
      value: { 
        base: "{colors.blue.500}", 
        _dark: "{colors.blue.400}" 
      }
    },
    background: {
      value: { 
        base: "{colors.white}", 
        _dark: "{colors.gray.900}" 
      }
    }
  }
}
```

---

## Color System

### Color Palette Structure

Each color in the system follows a consistent scale from 50 (lightest) to 950 (darkest):

```typescript
const colorScale = {
  50: "#f8fafc",   // Very light
  100: "#f1f5f9",  // Light
  200: "#e2e8f0",  // Light
  300: "#cbd5e1",  // Light-medium
  400: "#94a3b8",  // Medium
  500: "#64748b",  // Base (primary reference)
  600: "#475569",  // Medium-dark
  700: "#334155",  // Dark
  800: "#1e293b",  // Very dark
  900: "#0f172a",  // Darkest
  950: "#020617"   // Ultra dark
}
```

### Available Color Families

**Primary Colors:**
- `neutral`, `slate`, `stone`, `red`, `orange`, `amber`, `yellow`
- `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`
- `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

**Gray Colors:**
- `gray`, `neutral`, `slate`, `stone`, `zinc`

### Semantic Color Tokens

```typescript
const semanticColors = {
  // Brand colors
  primary: "{colors.blue.500}",
  secondary: "{colors.slate.500}",
  
  // UI colors
  background: "{colors.white}",
  foreground: "{colors.slate.900}",
  
  // Status colors
  destructive: "{colors.red.500}",
  success: "{colors.green.500}",
  warning: "{colors.amber.500}",
  info: "{colors.blue.500}",
  
  // Interactive states
  hover: "{colors.slate.100}",
  active: "{colors.slate.200}",
  focus: "{colors.blue.500}",
}
```

### Usage Examples

```tsx
import { css } from "@styled-system/css"

// Using semantic tokens (recommended)
const styles = css({
  bg: "primary",
  color: "primary.foreground",
  borderColor: "border",
})

// Using base tokens (when semantic doesn't exist)
const customStyles = css({
  bg: "blue.500",
  color: "white",
})

// Responsive and state variants
const interactiveStyles = css({
  bg: "primary",
  _hover: { bg: "primary.hover" },
  _dark: { bg: "primary.dark" }
})
```

---

## Typography

### Font Sizes

```typescript
const fontSizes = {
  xs: { value: "0.75rem" },    // 12px
  sm: { value: "0.875rem" },   // 14px
  base: { value: "1rem" },     // 16px
  lg: { value: "1.125rem" },   // 18px
  xl: { value: "1.25rem" },    // 20px
  "2xl": { value: "1.5rem" },  // 24px
  "3xl": { value: "1.875rem" }, // 30px
  "4xl": { value: "2.25rem" },  // 36px
}
```

### Font Weights

```typescript
const fontWeights = {
  thin: { value: 100 },
  extralight: { value: 200 },
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
  extrabold: { value: 800 },
  black: { value: 900 },
}
```

### Text Styles

Pre-defined combinations of typography properties:

```typescript
const textStyles = {
  // Headers
  h1: {
    value: {
      fontSize: "3xl",
      fontWeight: "bold",
      lineHeight: "tight",
      letterSpacing: "-0.025em"
    }
  },
  h2: {
    value: {
      fontSize: "2xl",
      fontWeight: "semibold",
      lineHeight: "tight"
    }
  },
  
  // Body text
  body1: {
    value: {
      fontSize: "base",
      fontWeight: "normal",
      lineHeight: "relaxed"
    }
  },
  body2: {
    value: {
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "normal"
    }
  },
  
  // Labels
  label1: {
    value: {
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "none"
    }
  },
  label2: {
    value: {
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "none"
    }
  }
}
```

### Usage Examples

```tsx
import { css } from "@styled-system/css"

// Using text styles
const headingStyles = css({
  textStyle: "h1",
  color: "foreground.primary"
})

// Custom typography
const customText = css({
  fontSize: "lg",
  fontWeight: "semibold",
  lineHeight: "1.5",
  letterSpacing: "0.025em"
})

// Responsive typography
const responsiveText = css({
  textStyle: { base: "body1", md: "body2" },
  fontSize: { base: "sm", md: "base", lg: "lg" }
})
```

---

## Spacing & Sizing

### Spacing Scale

Based on a 4px grid system:

```typescript
const spacing = {
  0: { value: "0" },
  0.5: { value: "0.125rem" },  // 2px
  1: { value: "0.25rem" },     // 4px
  1.5: { value: "0.375rem" },  // 6px
  2: { value: "0.5rem" },      // 8px
  2.5: { value: "0.625rem" },  // 10px
  3: { value: "0.75rem" },     // 12px
  3.5: { value: "0.875rem" },  // 14px
  4: { value: "1rem" },        // 16px
  5: { value: "1.25rem" },     // 20px
  6: { value: "1.5rem" },      // 24px
  7: { value: "1.75rem" },     // 28px
  8: { value: "2rem" },        // 32px
  9: { value: "2.25rem" },     // 36px
  10: { value: "2.5rem" },     // 40px
  11: { value: "2.75rem" },    // 44px
  12: { value: "3rem" },       // 48px
  // ... continues up to 96
}
```

### Semantic Spacing

```typescript
const semanticSpacing = {
  xs: { value: "{spacing.1}" },    // 4px
  sm: { value: "{spacing.2}" },    // 8px
  md: { value: "{spacing.4}" },    // 16px
  lg: { value: "{spacing.6}" },    // 24px
  xl: { value: "{spacing.8}" },    // 32px
  "2xl": { value: "{spacing.12}" }, // 48px
  "3xl": { value: "{spacing.16}" }, // 64px
}
```

### Border Radius

```typescript
const radii = {
  none: { value: "0" },
  sm: { value: "0.125rem" },  // 2px
  base: { value: "0.25rem" }, // 4px
  md: { value: "0.375rem" },  // 6px
  lg: { value: "0.5rem" },    // 8px
  xl: { value: "0.75rem" },   // 12px
  "2xl": { value: "1rem" },   // 16px
  "3xl": { value: "1.5rem" }, // 24px
  full: { value: "9999px" },  // Pill shape
}
```

### Usage Examples

```tsx
import { css } from "@styled-system/css"

// Using spacing tokens
const cardStyles = css({
  p: "4",        // padding: 1rem
  m: "2",        // margin: 0.5rem
  gap: "3",      // gap: 0.75rem
})

// Semantic spacing
const layoutStyles = css({
  p: "md",       // padding: 16px
  gap: "sm",     // gap: 8px
  borderRadius: "lg"
})

// Directional spacing
const asymmetricStyles = css({
  pt: "4",       // padding-top
  pb: "2",       // padding-bottom
  px: "6",       // padding-left & padding-right
  my: "8",       // margin-top & margin-bottom
})
```

---

## Theme Customization

### Extending the Default Theme

Create custom themes by extending the base preset:

```typescript
// preset.ts
import { definePreset } from "@pandacss/dev"

export const customPreset = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: {
          // Add custom color palette
          brand: {
            50: { value: "#f0f9ff" },
            100: { value: "#e0f2fe" },
            500: { value: "#0ea5e9" },
            900: { value: "#0c4a6e" }
          },
          // Custom accent colors
          accent: {
            primary: { value: "#ff6b6b" },
            secondary: { value: "#4ecdc4" }
          }
        },
        // Custom spacing values
        spacing: {
          18: { value: "4.5rem" },
          72: { value: "18rem" },
          84: { value: "21rem" }
        },
        // Custom fonts
        fonts: {
          display: { value: "Playfair Display, serif" },
          mono: { value: "JetBrains Mono, monospace" }
        }
      },
      semanticTokens: {
        colors: {
          // Map semantic tokens to custom colors
          primary: { value: "{colors.brand.500}" },
          accent: { value: "{colors.accent.primary}" },
          
          // Custom semantic colors
          highlight: {
            value: {
              base: "{colors.accent.primary}",
              _dark: "{colors.accent.secondary}"
            }
          }
        }
      },
      textStyles: {
        // Custom text styles
        display: {
          value: {
            fontFamily: "display",
            fontSize: "4xl",
            fontWeight: "bold",
            lineHeight: "tight"
          }
        },
        code: {
          value: {
            fontFamily: "mono",
            fontSize: "sm",
            backgroundColor: "gray.100",
            padding: "1",
            borderRadius: "sm"
          }
        }
      }
    }
  }
})
```

### Component-Specific Tokens

Create tokens specifically for component variants:

```typescript
const componentTokens = {
  colors: {
    button: {
      primary: {
        bg: { value: "{colors.primary}" },
        color: { value: "{colors.primary.foreground}" },
        hover: { value: "{colors.primary.hover}" }
      },
      secondary: {
        bg: { value: "{colors.secondary}" },
        color: { value: "{colors.secondary.foreground}" },
        hover: { value: "{colors.secondary.hover}" }
      }
    },
    input: {
      bg: { value: "{colors.background}" },
      border: { value: "{colors.border}" },
      focus: { value: "{colors.focus}" }
    }
  }
}
```

### Using Custom Tokens

```tsx
import { css } from "@styled-system/css"

// Using custom brand colors
const heroStyles = css({
  bg: "brand.500",
  color: "white",
  textStyle: "display"
})

// Using custom spacing
const layoutStyles = css({
  maxW: "72",  // Custom 18rem width
  p: "18"      // Custom 4.5rem padding
})

// Using semantic custom tokens
const highlightStyles = css({
  bg: "highlight",
  color: "highlight.foreground"
})
```

---

## Dark Mode

### Semantic Token Strategy

Use semantic tokens with conditional values for automatic dark mode support:

```typescript
const semanticTokens = {
  colors: {
    // Background colors
    background: {
      value: { 
        base: "{colors.white}", 
        _dark: "{colors.gray.900}" 
      }
    },
    foreground: {
      value: { 
        base: "{colors.gray.900}", 
        _dark: "{colors.gray.50}" 
      }
    },
    
    // Surface colors
    card: {
      value: { 
        base: "{colors.white}", 
        _dark: "{colors.gray.800}" 
      }
    },
    border: {
      value: { 
        base: "{colors.gray.200}", 
        _dark: "{colors.gray.700}" 
      }
    },
    
    // Interactive colors
    primary: {
      value: { 
        base: "{colors.blue.500}", 
        _dark: "{colors.blue.400}" 
      }
    },
    "primary.foreground": {
      value: { 
        base: "{colors.white}", 
        _dark: "{colors.gray.900}" 
      }
    }
  }
}
```

### Dark Mode Implementation

```tsx
// App.tsx - Theme provider setup
import { useEffect, useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    // Check system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])
  
  useEffect(() => {
    // Apply dark class to html element
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme
      </button>
      {/* Your app content */}
    </div>
  )
}
```

### Component Dark Mode Support

```tsx
import { css } from "@styled-system/css"

// Automatic dark mode through semantic tokens
const cardStyles = css({
  bg: "card",
  border: "1px solid",
  borderColor: "border",
  color: "foreground"
})

// Manual dark mode overrides
const customStyles = css({
  bg: "white",
  color: "gray.900",
  _dark: {
    bg: "gray.800",
    color: "gray.100"
  }
})

// Conditional styling
const conditionalStyles = css({
  bg: { base: "gray.100", _dark: "gray.800" },
  borderColor: { base: "gray.300", _dark: "gray.600" }
})
```

### Dark Mode Best Practices

1. **Use Semantic Tokens**: Always prefer semantic tokens over base tokens
2. **Test Contrast**: Ensure sufficient contrast in both themes
3. **Consider Images**: Use different images/icons for light/dark themes
4. **System Preference**: Respect user's system preference by default
5. **Persistence**: Remember user's theme choice in localStorage

```tsx
// Theme hook with persistence
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'system'
  })
  
  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])
  
  return { theme, setTheme }
}
```

---

## Best Practices

### Token Naming Conventions

1. **Semantic Names**: Use purpose-based names (`primary`, `destructive`) over descriptive ones (`red`, `blue`)
2. **Consistent Scale**: Follow consistent naming scales (50-950 for colors, 1-12 for spacing)
3. **Contextual Grouping**: Group related tokens (`button.primary.bg`, `button.primary.color`)

### Token Usage Guidelines

```tsx
// ✅ Good - Using semantic tokens
const styles = css({
  bg: "primary",
  color: "primary.foreground",
  borderColor: "border"
})

// ❌ Avoid - Using base tokens directly
const styles = css({
  bg: "blue.500",
  color: "white",
  borderColor: "gray.300"
})

// ✅ Good - Consistent spacing
const styles = css({
  p: "4",    // 16px
  m: "2",    // 8px
  gap: "3"   // 12px
})

// ❌ Avoid - Arbitrary values
const styles = css({
  p: "17px",
  m: "9px",
  gap: "13px"
})
```

### Component Token Strategy

1. **Component Recipes**: Use PandaCSS recipes for component variants
2. **Semantic Mapping**: Map component states to semantic tokens
3. **Consistent Variants**: Use consistent variant names across components

```typescript
// Component recipe with semantic tokens
export const buttonRecipe = cva({
  base: {
    px: "4",
    py: "2",
    borderRadius: "md",
    fontWeight: "medium",
    transition: "colors"
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "primary.foreground",
        _hover: { bg: "primary.hover" }
      },
      secondary: {
        bg: "secondary",
        color: "secondary.foreground",
        _hover: { bg: "secondary.hover" }
      }
    }
  }
})
```

### Performance Considerations

1. **Token Consolidation**: Avoid creating too many similar tokens
2. **CSS Variables**: Leverage CSS custom properties for runtime changes
3. **Tree Shaking**: Only include tokens that are actually used

---

## Migration Guide

### From Hardcoded Values

```tsx
// Before - Hardcoded values
const oldStyles = css({
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "16px 24px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600"
})

// After - Using tokens
const newStyles = css({
  bg: "primary",
  color: "primary.foreground",
  px: "6",
  py: "4",
  borderRadius: "lg",
  fontSize: "sm",
  fontWeight: "semibold"
})
```

### From Other Design Systems

```tsx
// From Tailwind classes
// "bg-blue-500 text-white p-4 rounded-lg text-sm font-medium"

// To JH Design System tokens
const styles = css({
  bg: "primary",
  color: "primary.foreground",
  p: "4",
  borderRadius: "lg",
  textStyle: "label1"
})
```

### Gradual Migration Strategy

1. **Start with Colors**: Replace hardcoded colors with semantic tokens
2. **Add Spacing**: Convert padding/margin to token-based spacing
3. **Typography**: Replace font properties with text styles
4. **Components**: Update component recipes to use tokens
5. **Dark Mode**: Add dark mode variants using semantic tokens

---

This design tokens guide provides comprehensive information for understanding and implementing the JH Design System token architecture. The system is designed to be flexible, scalable, and maintainable while providing excellent developer experience and design consistency.