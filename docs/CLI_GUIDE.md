# CLI Usage Guide

The JH Design System CLI (`@jongh/cli`) is a powerful command-line tool that helps you integrate and manage design system components in your projects.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
  - [init](#init-command)
  - [add](#add-command)
  - [radix-ui-import](#radix-ui-import-command)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

---

## Installation

### Global Installation (Recommended)

```bash
npm install -g @jongh/cli
```

### Using npx (No Installation Required)

```bash
npx @jongh/cli --help
```

### Verify Installation

```bash
# Check CLI version
jongh --version

# Or with npx
npx @jongh/cli --version
```

---

## Quick Start

Get started with the JH Design System in 3 simple steps:

### 1. Initialize Your Project

```bash
# Navigate to your project directory
cd my-react-project

# Initialize the design system
npx @jongh/cli init
```

This will:
- Analyze your project structure
- Prompt you to choose colors for your theme
- Create configuration files
- Set up PandaCSS integration

### 2. Install Components

```bash
# Install your first component
npx @jongh/cli add button

# Install multiple components
npx @jongh/cli add button textfield dialog
```

### 3. Use in Your Code

```tsx
import { Button } from "@/components/button"

function App() {
  return (
    <div>
      <Button>Hello Design System!</Button>
    </div>
  )
}
```

---

## Commands

### `init` Command

Initialize your project with the JH Design System.

#### Syntax

```bash
npx @jongh/cli init [options]
```

#### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--cwd <path>` | `-c` | Working directory | `process.cwd()` |
| `--default` | `-d` | Use default colors without prompts | `false` |

#### Interactive Setup

When you run `init` without the `--default` flag, you'll be prompted to configure:

1. **Primary Color**: Your main brand color
   - Available options: neutral, slate, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

2. **Secondary Color**: Supporting color for accents
   - Same options as primary color

3. **Gray Color**: Base neutral color for text and backgrounds
   - Available options: gray, neutral, slate, stone, zinc

#### Example Usage

**Interactive setup:**
```bash
npx @jongh/cli init
```

**With default colors:**
```bash
npx @jongh/cli init --default
```

**Specify working directory:**
```bash
npx @jongh/cli init --cwd ./my-project
```

#### What `init` Does

1. **Analyzes Project Structure**
   - Reads `tsconfig.json` for path aliases
   - Detects existing PandaCSS configuration
   - Determines component installation paths

2. **Creates Configuration Files**
   - `components.json` - Path mappings and settings
   - `preset.ts` - Theme configuration with your chosen colors

3. **Updates PandaCSS Config**
   - Adds the generated preset to your `panda.config.ts`
   - Ensures proper integration

#### Generated Files

**`components.json`**
```json
{
  "utils": "@/utils",
  "components": "@/components",
  "hooks": "@/hooks",
  "styledsystem": "styled-system"
}
```

**`preset.ts`**
```typescript
import { definePreset } from "@pandacss/dev"

export const defaultPreset = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: "#eff6ff" },
            100: { value: "#dbeafe" },
            // ... full color scale
          },
          secondary: {
            // ... secondary color scale
          },
          gray: {
            // ... gray color scale
          }
        }
      },
      semanticTokens: {
        colors: {
          primary: { 
            value: { base: "{colors.primary.500}", _dark: "{colors.primary.400}" }
          },
          // ... more semantic tokens
        }
      }
    }
  }
})
```

#### Error Handling

The CLI will show helpful error messages for common issues:

- **Missing package.json**: "Cannot find package.json in [directory]"
- **No TypeScript config**: "Cannot find paths alias in your tsconfig.json"
- **Already initialized**: Prompts to overwrite existing configuration

---

### `add` Command

Install components from the remote registry into your project.

#### Syntax

```bash
npx @jongh/cli add [components...] [options]
```

#### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--cwd <path>` | `-c` | Working directory | `process.cwd()` |

#### Available Components

- `button` - Versatile button with variants and sizes
- `textfield` - Input field with label and helper text
- `checkbox` - Accessible checkbox component
- `select` - Dropdown selection component
- `slider` - Range input component
- `calendar` - Date picker component
- `dialog` - Modal dialog component
- `accordion` - Collapsible content sections
- `tabs` - Tab navigation component
- `avatar` - User avatar with fallback
- `chip` - Status/category indicators
- `animatetext` - Text with entrance animations
- `animatebutton` - Button with hover animations

#### Example Usage

**Single Component**
```bash
npx @jongh/cli add button
```

**Multiple Components**
```bash
npx @jongh/cli add button textfield checkbox
```

**All Form Components**
```bash
npx @jongh/cli add textfield checkbox select slider calendar
```

**Layout Components**
```bash
npx @jongh/cli add dialog accordion tabs
```

#### What `add` Does

1. **Validates Configuration**
   - Checks for `components.json`
   - Verifies TypeScript configuration
   - Confirms PandaCSS setup

2. **Fetches Components**
   - Downloads component code from registry
   - Includes all dependencies (hooks, utils, etc.)
   - Transforms imports to match your project structure

3. **Installs Files**
   - Places UI components in configured directory
   - Installs hooks and utilities in appropriate folders
   - Shows required npm dependencies

4. **Dependency Management**
   - Detects your package manager (npm, yarn, pnpm)
   - Provides installation commands for required packages

#### Component Structure

When you install a component, you get:

```
src/
├── components/
│   └── button/
│       ├── index.tsx       # Main component
│       └── recipe.ts       # Styling configuration
├── hooks/
│   └── use-*.ts           # Related hooks (if any)
└── utils/
    └── *.ts               # Utility functions (if any)
```

#### Overwrite Protection

If a component already exists, the CLI will ask for confirmation:

```
Component button already exists. Do you want to overwrite it? (y/N)
```

#### Error Handling

- **Component not found**: "Failed to fetch [component] (404 Not Found)"
- **Invalid registry**: "Registry for [component] is invalid"
- **Network issues**: Provides helpful error messages for connection problems

---

### `radix-ui-import` Command

Automatically update Radix UI imports to the new unified format.

#### Syntax

```bash
npx @jongh/cli radix-ui-import [options]
```

#### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--cwd <path>` | `-c` | Working directory | `process.cwd()` |

#### What It Does

Updates import statements from the old individual package format to the new unified `radix-ui` package:

**Before:**
```typescript
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as TabsPrimitive from "@radix-ui/react-tabs"
```

**After:**
```typescript
import { Accordion as AccordionPrimitive } from "radix-ui"
import { Dialog as DialogPrimitive } from "radix-ui"
import { Tabs as TabsPrimitive } from "radix-ui"
```

#### Usage Example

```bash
# Run in your project root
npx @jongh/cli radix-ui-import

# Specify different directory
npx @jongh/cli radix-ui-import --cwd ./src
```

#### Supported Transformations

The codemod handles various import patterns:

1. **Namespace imports**
   ```typescript
   // Before
   import * as Dialog from "@radix-ui/react-dialog"
   
   // After
   import { Dialog } from "radix-ui"
   ```

2. **Named imports**
   ```typescript
   // Before
   import { Root, Trigger } from "@radix-ui/react-dialog"
   
   // After
   import { Dialog } from "radix-ui"
   // Usage: Dialog.Root, Dialog.Trigger
   ```

3. **Aliased imports**
   ```typescript
   // Before
   import * as AccordionPrimitive from "@radix-ui/react-accordion"
   
   // After
   import { Accordion as AccordionPrimitive } from "radix-ui"
   ```

---

## Configuration

### `components.json`

The main configuration file created by the `init` command.

```json
{
  "utils": "@/utils",
  "components": "@/components",
  "hooks": "@/hooks",
  "styledsystem": "styled-system"
}
```

#### Configuration Options

- **`utils`**: Path where utility functions will be installed
- **`components`**: Path where UI components will be installed
- **`hooks`**: Path where custom hooks will be installed
- **`styledsystem`**: Path to PandaCSS generated files

#### Path Resolution

Paths can be:
- **Absolute**: `/src/components`
- **Relative**: `./src/components`
- **Alias-based**: `@/components` (requires TypeScript path mapping)

### TypeScript Configuration

The CLI requires proper TypeScript path mapping in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

### PandaCSS Integration

Your `panda.config.ts` should include the generated preset:

```typescript
import { defineConfig } from "@pandacss/dev"
import { defaultPreset } from "./preset"

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-panda", defaultPreset],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
})
```

---

## Project Structure

### Recommended Structure

```
my-project/
├── src/
│   ├── components/          # Installed UI components
│   │   ├── button/
│   │   ├── textfield/
│   │   └── dialog/
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── app/                # Your application code
│   └── main.tsx
├── styled-system/          # Generated PandaCSS files
├── components.json         # CLI configuration
├── preset.ts              # Theme configuration
├── panda.config.ts        # PandaCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

### Integration with Popular Frameworks

#### Next.js

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

#### Vite

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find package.json"

**Problem**: CLI can't locate your project root.

**Solution**:
```bash
# Make sure you're in the right directory
cd /path/to/your/project

# Or specify the path explicitly
npx @jongh/cli init --cwd /path/to/your/project
```

#### 2. "Cannot find paths alias in tsconfig.json"

**Problem**: Missing or incorrect TypeScript path configuration.

**Solution**: Add path mapping to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 3. "Failed to fetch component"

**Problem**: Network issues or component doesn't exist.

**Solutions**:
- Check your internet connection
- Verify component name: `npx @jongh/cli add --help`
- Try again in a few minutes

#### 4. Import Errors After Installation

**Problem**: TypeScript can't resolve component imports.

**Solutions**:
1. Restart your TypeScript server
2. Check path aliases in `tsconfig.json`
3. Verify `components.json` paths match your project structure

#### 5. PandaCSS Styles Not Applied

**Problem**: Components render without styles.

**Solutions**:
1. Run PandaCSS codegen: `npx panda codegen`
2. Import PandaCSS styles in your app:
   ```typescript
   import "@styled-system/styles.css"
   ```
3. Check `panda.config.ts` includes your preset

#### 6. "Component already exists"

**Problem**: Trying to install a component that's already present.

**Solutions**:
- Choose "Yes" to overwrite if you want to update
- Choose "No" to keep existing version
- Manually remove the component folder first

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Set environment variable for detailed logs
DEBUG=@jongh/cli npx @jongh/cli add button
```

### Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review your configuration files
3. Try with a fresh project to isolate the issue
4. Check the [GitHub issues](https://github.com/your-org/jh-design/issues)

---

## Advanced Usage

### Custom Registry

You can configure a custom component registry:

```bash
# Set custom registry URL
export JONGH_REGISTRY_URL="https://your-registry.com"
npx @jongh/cli add button
```

### Automated Setup

For CI/CD or automated setups:

```bash
# Non-interactive initialization with default colors
npx @jongh/cli init --default

# Install multiple components in one command
npx @jongh/cli add button textfield checkbox select dialog
```

### Scripting

Create setup scripts for consistent project initialization:

```bash
#!/bin/bash
# setup-design-system.sh

echo "Setting up JH Design System..."

# Initialize with default colors
npx @jongh/cli init --default

# Install base components
npx @jongh/cli add button textfield checkbox

# Install layout components  
npx @jongh/cli add dialog accordion tabs

# Install form components
npx @jongh/cli add select slider calendar

echo "Design system setup complete!"
```

### Monorepo Usage

In monorepo setups, run commands from the specific package directory:

```bash
# From monorepo root
cd packages/frontend
npx @jongh/cli init

# Or specify the path
npx @jongh/cli init --cwd packages/frontend
```

### Custom Paths

Override default paths by editing `components.json`:

```json
{
  "utils": "./lib/utils",
  "components": "./lib/components",
  "hooks": "./lib/hooks",
  "styledsystem": "./styled-system"
}
```

### Version Management

Keep track of installed components:

```bash
# Check CLI version
npx @jongh/cli --version

# Update CLI
npm update -g @jongh/cli

# Or with npx (always latest)
npx @jongh/cli@latest add button
```

---

This CLI guide provides comprehensive information for using the JH Design System CLI effectively. The tool is designed to make component installation and management as smooth as possible while providing flexibility for different project setups.