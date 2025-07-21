# JH Design System Documentation

## Overview

JH Design System is a comprehensive design system built with PandaCSS, featuring a component library and CLI tool for efficient development. The system provides type-safe styling, consistent design tokens, and easy component installation.

## 🛠 Technology Stack

- **React** - Component library framework
- **TypeScript** - Type safety and better developer experience
- **PandaCSS** - CSS-in-JS with design tokens and type safety
- **Radix UI** - Headless UI primitives for accessibility
- **Framer Motion** - Animation library
- **Storybook** - Component development and testing
- **Turborepo** - Monorepo management

## 📦 Packages

### @jongh/cli
Command-line interface for installing and managing design system components.

### @jongh/ui  
React component library with headless UI components.

### panda-animation
Animation preset for PandaCSS with motion utilities.

---

## 🚀 Getting Started

### Installation

```bash
# Install the CLI globally
npm install -g @jongh/cli

# Or use with npx
npx @jongh/cli --help
```

### Initialize Project

```bash
npx @jongh/cli init
```

This command will:
- Set up design tokens and color palette
- Create `components.json` configuration file
- Generate `preset.ts` with your chosen colors
- Configure PandaCSS integration

### Install Components

```bash
# Install specific components
npx @jongh/cli add button textfield

# Install multiple components at once
npx @jongh/cli add button textfield dialog accordion
```

---

## 🎨 Design System

### Design Tokens

The design system uses a comprehensive token system for consistent styling:

#### Colors
- **Primary Colors**: Main brand colors with semantic naming
- **Secondary Colors**: Supporting colors for variety
- **Neutral Colors**: Grays and neutrals for text and backgrounds
- **Semantic Colors**: Success, error, warning, and info states

#### Typography
- **Font Sizes**: xs (0.75rem) to 3xl (3rem)
- **Text Styles**: Predefined combinations of size, weight, and line-height
- **Font Weights**: Light, regular, medium, semibold, bold

#### Spacing
- **Consistent Scale**: Based on 4px grid system
- **Semantic Names**: xs, sm, md, lg, xl, 2xl, 3xl

#### Border Radius
- **sm**: 3px - Small elements
- **lg**: 5px - Standard elements  
- **rounded**: 30px - Pill-shaped elements

### Theme Configuration

The system supports light/dark modes through semantic tokens:

```typescript
// Example theme configuration
const theme = {
  primary: "blue",      // Choose from available color palette
  secondary: "slate",   // Supporting color
  gray: "gray"         // Neutral color base
}
```

---

## 📚 Component Library

### Base Components

#### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: `primary` | `secondary` | `outline` | `destructive` | `link`
- `size`: `sm` | `md` | `lg`
- `asChild`: boolean - Render as child element
- `disabled`: boolean
- Standard button props (onClick, className, etc.)

**Usage:**
```tsx
import { Button } from "@/components/button"

// Primary button
<Button>Click me</Button>

// Secondary variant
<Button variant="secondary">Secondary</Button>

// Small size
<Button size="sm">Small button</Button>

// With icon
<Button>
  <Icon />
  Button with icon
</Button>

// As a link
<Button asChild>
  <a href="/somewhere">Link button</a>
</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

**Variants:**
- **Primary**: Main call-to-action buttons
- **Secondary**: Supporting actions
- **Outline**: Subtle actions with border
- **Destructive**: Delete or dangerous actions
- **Link**: Text-only button style

#### TextField

A comprehensive input component with labels, helper text, and addons.

**Props:**
- `id`: string (required) - Unique identifier
- `label`: string - Input label
- `helperText`: string - Helper or error text
- `required`: boolean - Required field indicator
- `leadingAddon`: ReactNode - Icon or element before input
- `trailingAddon`: ReactNode - Icon or element after input
- `status`: `default` | `negative` - Visual state
- Standard input props (placeholder, value, onChange, etc.)

**Usage:**
```tsx
import { TextField } from "@/components/textfield"
import { Search, Eye } from "lucide-react"

// Basic input
<TextField 
  id="email"
  label="Email Address"
  placeholder="Enter your email"
/>

// With helper text
<TextField
  id="password"
  label="Password"
  helperText="Must be at least 8 characters"
  type="password"
/>

// With icons
<TextField
  id="search"
  label="Search"
  leadingAddon={<Search />}
  trailingAddon={<Eye />}
/>

// Required field
<TextField
  id="name"
  label="Full Name"
  required
/>

// Error state
<TextField
  id="email-error"
  label="Email"
  status="negative"
  helperText="Please enter a valid email address"
/>
```

#### Checkbox

Accessible checkbox component with labels and descriptions.

**Props:**
- `id`: string (required)
- `label`: string - Checkbox label
- `description`: string - Additional description
- `required`: boolean
- Standard checkbox props (checked, onChange, etc.)

**Usage:**
```tsx
import { Checkbox } from "@/components/checkbox"

// Basic checkbox
<Checkbox id="terms" label="I agree to the terms" />

// With description
<Checkbox
  id="newsletter"
  label="Subscribe to newsletter"
  description="Get weekly updates about new features"
/>

// Required checkbox
<Checkbox
  id="required"
  label="Required field"
  required
/>
```

### Layout Components

#### Dialog

Modal dialog component built on Radix UI primitives.

**Components:**
- `Dialog.Root` - Root provider
- `Dialog.Trigger` - Opens the dialog
- `Dialog.Content` - Main dialog container
- `Dialog.Header` - Header section
- `Dialog.Title` - Dialog title
- `Dialog.Description` - Dialog description
- `Dialog.Footer` - Footer section
- `Dialog.Close` - Close trigger

**Usage:**
```tsx
import * as Dialog from "@/components/dialog"

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to continue?
      </Dialog.Description>
    </Dialog.Header>
    
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="outline">Cancel</Button>
      </Dialog.Close>
      <Button>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

#### Accordion

Collapsible content sections with smooth animations.

**Components:**
- `Accordion.Root` - Root container
- `Accordion.Item` - Individual accordion item
- `Accordion.Trigger` - Clickable header
- `Accordion.Content` - Collapsible content

**Usage:**
```tsx
import * as Accordion from "@/components/accordion"

<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>
      What is the design system?
    </Accordion.Trigger>
    <Accordion.Content>
      A comprehensive collection of reusable components...
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="item-2">
    <Accordion.Trigger>
      How do I install components?
    </Accordion.Trigger>
    <Accordion.Content>
      Use the CLI tool to install components...
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

#### Tabs

Tab navigation component for organizing content.

**Components:**
- `Tabs.Root` - Root container
- `Tabs.List` - Tab navigation list
- `Tabs.Trigger` - Individual tab button
- `Tabs.Content` - Tab panel content

**Usage:**
```tsx
import * as Tabs from "@/components/tabs"

<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="components">Components</Tabs.Trigger>
    <Tabs.Trigger value="examples">Examples</Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="overview">
    <h2>Design System Overview</h2>
    <p>Introduction to our design system...</p>
  </Tabs.Content>
  
  <Tabs.Content value="components">
    <h2>Component Library</h2>
    <p>Browse available components...</p>
  </Tabs.Content>
  
  <Tabs.Content value="examples">
    <h2>Usage Examples</h2>
    <p>See components in action...</p>
  </Tabs.Content>
</Tabs.Root>
```

### Data Components

#### Avatar

User avatar component with fallback support.

**Props:**
- `src`: string - Image source
- `alt`: string - Alt text
- `fallback`: string - Fallback text/initials
- `size`: `sm` | `md` | `lg`

**Usage:**
```tsx
import { Avatar } from "@/components/avatar"

// With image
<Avatar 
  src="/user-avatar.jpg"
  alt="John Doe"
  fallback="JD"
/>

// Fallback only
<Avatar fallback="AB" />

// Different sizes
<Avatar size="sm" fallback="S" />
<Avatar size="lg" fallback="L" />
```

#### Chip

Small status or category indicators.

**Props:**
- `variant`: `primary` | `secondary` | `outline`
- `size`: `sm` | `md`
- `removable`: boolean - Show remove button

**Usage:**
```tsx
import { Chip } from "@/components/chip"

// Basic chip
<Chip>Design System</Chip>

// Different variants
<Chip variant="secondary">Secondary</Chip>
<Chip variant="outline">Outline</Chip>

// Removable chip
<Chip removable onRemove={() => console.log('removed')}>
  Removable
</Chip>
```

### Form Components

#### Select

Dropdown selection component.

**Props:**
- `placeholder`: string
- `options`: Array of option objects
- `value`: string
- `onValueChange`: function

**Usage:**
```tsx
import { Select } from "@/components/select"

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
]

<Select
  placeholder="Choose an option"
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
/>
```

#### Slider

Range input component for numeric values.

**Props:**
- `min`: number - Minimum value
- `max`: number - Maximum value
- `step`: number - Step increment
- `value`: number[] - Current value(s)
- `onValueChange`: function

**Usage:**
```tsx
import { Slider } from "@/components/slider"

// Single value slider
<Slider
  min={0}
  max={100}
  step={1}
  value={[50]}
  onValueChange={(value) => setValue(value[0])}
/>

// Range slider
<Slider
  min={0}
  max={100}
  step={5}
  value={[20, 80]}
  onValueChange={setRange}
/>
```

#### Calendar

Date selection component.

**Props:**
- `mode`: `single` | `multiple` | `range`
- `selected`: Date or Date[]
- `onSelect`: function
- `disabled`: function or Date[]

**Usage:**
```tsx
import { Calendar } from "@/components/calendar"

// Single date selection
<Calendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
/>

// Date range selection
<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
/>

// Multiple dates
<Calendar
  mode="multiple"
  selected={selectedDates}
  onSelect={setSelectedDates}
/>
```

### Animation Components

#### AnimateText

Text animation component with various effects.

**Props:**
- `text`: string - Text to animate
- `animation`: `fadeIn` | `slideUp` | `typewriter`
- `delay`: number - Animation delay
- `duration`: number - Animation duration

**Usage:**
```tsx
import { AnimateText } from "@/components/animateText"

// Fade in animation
<AnimateText 
  text="Welcome to our design system"
  animation="fadeIn"
/>

// Typewriter effect
<AnimateText
  text="Building amazing interfaces..."
  animation="typewriter"
  duration={2000}
/>

// Slide up animation
<AnimateText
  text="Smooth animations"
  animation="slideUp"
  delay={500}
/>
```

#### AnimateButton

Button component with built-in hover and click animations.

**Props:**
- All Button props
- `animationType`: `scale` | `bounce` | `pulse`

**Usage:**
```tsx
import { AnimateButton } from "@/components/animateButton"

// Scale animation
<AnimateButton animationType="scale">
  Hover me
</AnimateButton>

// Bounce effect
<AnimateButton 
  animationType="bounce"
  variant="secondary"
>
  Click me
</AnimateButton>
```

---

## 🛠 CLI Reference

### Commands

#### `init`

Initialize your project with the design system.

```bash
npx @jongh/cli init [options]
```

**Options:**
- `-c, --cwd <path>` - Working directory (default: current directory)
- `-d, --default` - Use default colors without prompts

**What it does:**
1. Analyzes your TypeScript configuration
2. Prompts for color palette selection (primary, secondary, gray)
3. Creates `components.json` with path configurations
4. Generates `preset.ts` with your color theme
5. Updates PandaCSS configuration

**Interactive prompts:**
- **Primary color**: Main brand color (blue, green, red, etc.)
- **Secondary color**: Supporting color palette
- **Gray color**: Neutral color base

#### `add`

Install components from the registry.

```bash
npx @jongh/cli add [components...] [options]
```

**Options:**
- `-c, --cwd <path>` - Working directory (default: current directory)

**Examples:**
```bash
# Install single component
npx @jongh/cli add button

# Install multiple components
npx @jongh/cli add button textfield dialog

# Install all form components
npx @jongh/cli add textfield checkbox select slider
```

**What it does:**
1. Reads your `components.json` configuration
2. Fetches component code from remote registry
3. Transforms import paths to match your project structure
4. Installs components in configured directories
5. Shows required dependencies to install

#### `radix-ui-import`

Codemod to update Radix UI imports to new format.

```bash
npx @jongh/cli radix-ui-import [options]
```

**Options:**
- `-c, --cwd <path>` - Working directory

**What it does:**
Updates import statements from the old format to new Radix UI structure:

```typescript
// Before
import * as AccordionPrimitive from "@radix-ui/react-accordion"

// After  
import { Accordion as AccordionPrimitive } from "radix-ui"
```

### Configuration

#### `components.json`

Generated by `init` command, contains path mappings:

```json
{
  "utils": "@/utils",
  "components": "@/components", 
  "hooks": "@/hooks",
  "styledsystem": "styled-system"
}
```

#### `preset.ts`

Generated theme configuration:

```typescript
import { definePreset } from "@pandacss/dev"

export const defaultPreset = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { /* color palette */ },
          secondary: { /* color palette */ },
          // ... more tokens
        }
      }
    }
  }
})
```

---

## 🎯 Best Practices

### Component Usage

1. **Always use semantic HTML** - Components output proper HTML elements
2. **Leverage composition** - Use `asChild` prop for flexible rendering
3. **Handle accessibility** - Components include ARIA attributes
4. **Use design tokens** - Prefer tokens over hardcoded values

### Styling

1. **Use the recipe pattern** - Components use PandaCSS recipes for variants
2. **Extend with className** - Add custom styles via className prop
3. **Leverage semantic tokens** - Colors adapt to light/dark themes automatically
4. **Follow spacing scale** - Use consistent spacing tokens

### Development Workflow

1. **Start with Storybook** - All components have stories for development
2. **Use TypeScript** - Full type safety for props and styling
3. **Test with Vitest** - Components include comprehensive tests
4. **Check accessibility** - Use Storybook a11y addon

### Project Structure

```
src/
├── components/          # Installed components
│   ├── button/
│   ├── textfield/
│   └── ...
├── hooks/              # Utility hooks
├── utils/              # Helper functions
└── styled-system/      # Generated PandaCSS files
```

---

## 🔧 Advanced Usage

### Custom Themes

Extend the default theme in your `preset.ts`:

```typescript
import { definePreset } from "@pandacss/dev"

export const customPreset = definePreset({
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            50: { value: "#f0f9ff" },
            500: { value: "#3b82f6" },
            900: { value: "#1e3a8a" }
          }
        },
        fonts: {
          custom: { value: "Inter, sans-serif" }
        }
      },
      semanticTokens: {
        colors: {
          primary: { value: "{colors.brand.500}" }
        }
      }
    }
  }
})
```

### Component Customization

Override component styles using PandaCSS:

```tsx
import { Button } from "@/components/button"
import { css } from "@styled-system/css"

<Button 
  className={css({
    bg: "gradient-to-r from-blue-500 to-purple-600",
    _hover: { 
      bg: "gradient-to-r from-blue-600 to-purple-700" 
    }
  })}
>
  Custom Gradient Button
</Button>
```

### Creating New Components

Follow the established patterns:

```typescript
// component/my-component/ui/recipe.ts
import { cva } from "@styled-system/css"

export const recipe = cva({
  base: {
    // base styles
  },
  variants: {
    size: {
      sm: { /* small styles */ },
      md: { /* medium styles */ }
    }
  },
  defaultVariants: {
    size: "md"
  }
})

// component/my-component/ui/index.tsx
import { recipe } from "./recipe"

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  (props, ref) => {
    const [variantProps, componentProps] = recipe.splitVariantProps(props)
    const styles = recipe.raw(variantProps)
    
    return (
      <div 
        ref={ref}
        className={css(styles)}
        {...componentProps}
      />
    )
  }
)
```

---

## 🧪 Testing

### Component Testing

All components include comprehensive tests:

```typescript
// button.test.tsx
import { render, screen, userEvent } from "@testing-library/react"
import { Button } from "./index"

test("calls onClick when clicked", async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  await userEvent.click(screen.getByRole("button"))
  expect(handleClick).toHaveBeenCalledOnce()
})
```

### Visual Testing

Using Storybook for visual regression testing:

```bash
# Run visual tests
npm run test-storybook

# Run accessibility tests
npm run storybook
# Open a11y addon panel
```

---

## 📖 Migration Guide

### From Version 1.x to 2.x

1. **Update CLI**: `npm install -g @jongh/cli@latest`
2. **Run codemod**: `npx @jongh/cli radix-ui-import`
3. **Update imports**: Check for breaking changes in component APIs
4. **Regenerate theme**: Run `npx @jongh/cli init` if needed

### Common Migration Issues

- **Import paths**: Update relative imports to use configured aliases
- **Props changes**: Some component props may have been renamed
- **Styling**: PandaCSS token names may have changed

---

## 🤝 Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/jh-design.git

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build packages
pnpm build
```

### Adding Components

1. Create component in `packages/ui/src/component/`
2. Add Storybook stories
3. Write comprehensive tests
4. Update CLI registry
5. Document usage examples

---

## 📚 Resources

- **Documentation**: [https://whdgur.shop](https://whdgur.shop)
- **Storybook**: View all components and examples
- **GitHub**: Source code and issues
- **PandaCSS**: [https://panda-css.com](https://panda-css.com)
- **Radix UI**: [https://radix-ui.com](https://radix-ui.com)

---

## 📄 License

ISC License - see LICENSE file for details.