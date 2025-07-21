# Component Reference Guide

This document provides detailed API documentation and examples for all components in the JH Design System.

## Table of Contents

- [Base Components](#base-components)
  - [Button](#button)
  - [TextField](#textfield)
  - [Checkbox](#checkbox)
- [Layout Components](#layout-components)
  - [Dialog](#dialog)
  - [Accordion](#accordion)
  - [Tabs](#tabs)
- [Data Components](#data-components)
  - [Avatar](#avatar)
  - [Chip](#chip)
- [Form Components](#form-components)
  - [Select](#select)
  - [Slider](#slider)
  - [Calendar](#calendar)
- [Animation Components](#animation-components)
  - [AnimateText](#animatetext)
  - [AnimateButton](#animatebutton)

---

## Base Components

### Button

The Button component is a versatile interactive element that supports multiple variants, sizes, and states.

#### API Reference

```typescript
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "link"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
  disabled?: boolean
}
```

#### Styling Tokens

```typescript
// Base styles
{
  alignItems: "center",
  cursor: "pointer",
  display: "inline-flex",
  flexShrink: 0,
  gap: "1",
  justifyContent: "center",
  minH: "9",
  rounded: "md",
  textStyle: "label1",
  whiteSpace: "nowrap"
}
```

#### Examples

**Basic Usage**
```tsx
import { Button } from "@/components/button"

<Button>Default Button</Button>
```

**All Variants**
```tsx
<div className="space-y-4">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>
```

**All Sizes**
```tsx
<div className="flex items-center space-x-4">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>
```

**With Icons**
```tsx
import { Plus, Download, Settings } from "lucide-react"

<div className="space-x-4">
  <Button>
    <Plus />
    Add Item
  </Button>
  <Button variant="outline">
    <Download />
    Download
  </Button>
  <Button size="sm">
    <Settings />
    Settings
  </Button>
</div>
```

**As Child (Polymorphic)**
```tsx
import { Link } from "react-router-dom"

<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>

<Button asChild>
  <a href="https://example.com" target="_blank">
    External Link
  </a>
</Button>
```

**Loading State**
```tsx
import { Loader2 } from "lucide-react"

<Button disabled>
  <Loader2 className="animate-spin" />
  Loading...
</Button>
```

#### Accessibility

- Uses semantic `button` element or preserves semantics with `asChild`
- Supports keyboard navigation (Enter and Space)
- Proper focus indicators
- ARIA attributes for disabled state
- Screen reader compatible

#### Testing

```typescript
import { render, screen, userEvent } from "@testing-library/react"
import { Button } from "./button"

test("calls onClick handler when clicked", async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  await userEvent.click(screen.getByRole("button"))
  expect(handleClick).toHaveBeenCalledOnce()
})

test("does not call onClick when disabled", async () => {
  const handleClick = vi.fn()
  render(<Button disabled onClick={handleClick}>Disabled</Button>)
  
  await userEvent.click(screen.getByRole("button"))
  expect(handleClick).not.toHaveBeenCalled()
})
```

---

### TextField

A comprehensive input component with built-in label, helper text, and addon support.

#### API Reference

```typescript
interface TextFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "size" | "width"> {
  id: string
  label?: string
  helperText?: string
  required?: boolean
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  status?: "default" | "negative"
}
```

#### Structure

```
TextField
├── Label (optional)
├── Input Container
│   ├── Leading Addon (optional)
│   ├── Input Element
│   └── Trailing Addon (optional)
└── Helper Text (optional)
```

#### Examples

**Basic Input**
```tsx
import { TextField } from "@/components/textfield"

<TextField
  id="email"
  label="Email Address"
  placeholder="Enter your email"
  type="email"
/>
```

**Required Field**
```tsx
<TextField
  id="name"
  label="Full Name"
  required
  placeholder="Enter your full name"
/>
```

**With Helper Text**
```tsx
<TextField
  id="password"
  label="Password"
  type="password"
  helperText="Must be at least 8 characters with numbers and symbols"
/>
```

**Error State**
```tsx
<TextField
  id="email-error"
  label="Email Address"
  status="negative"
  helperText="Please enter a valid email address"
  value="invalid-email"
/>
```

**With Leading Icon**
```tsx
import { Search, User, Mail } from "lucide-react"

<div className="space-y-4">
  <TextField
    id="search"
    label="Search"
    placeholder="Search items..."
    leadingAddon={<Search />}
  />
  
  <TextField
    id="username"
    label="Username"
    placeholder="Enter username"
    leadingAddon={<User />}
  />
</div>
```

**With Trailing Actions**
```tsx
import { Eye, EyeOff, Copy } from "lucide-react"
import { useState } from "react"

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <TextField
      id="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      trailingAddon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      }
    />
  )
}
```

**Copy to Clipboard**
```tsx
import { Copy, Check } from "lucide-react"
import { useState } from "react"

function ApiKeyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <TextField
      id="api-key"
      label="API Key"
      value={value}
      readOnly
      trailingAddon={
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy API key"
        >
          {copied ? <Check /> : <Copy />}
        </button>
      }
    />
  )
}
```

#### Form Integration

```tsx
import { useForm } from "react-hook-form"
import { TextField } from "@/components/textfield"
import { Button } from "@/components/button"

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>()
  
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        id="email"
        label="Email Address"
        type="email"
        {...register("email", { 
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address"
          }
        })}
        status={errors.email ? "negative" : "default"}
        helperText={errors.email?.message}
      />
      
      <TextField
        id="password"
        label="Password"
        type="password"
        {...register("password", { 
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        })}
        status={errors.password ? "negative" : "default"}
        helperText={errors.password?.message || "Must be at least 8 characters"}
      />
      
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === watch("password") || "Passwords do not match"
        })}
        status={errors.confirmPassword ? "negative" : "default"}
        helperText={errors.confirmPassword?.message}
      />
      
      <Button type="submit">Create Account</Button>
    </form>
  )
}
```

#### Accessibility

- Proper label association with `htmlFor` and `id`
- ARIA attributes for error states (`aria-invalid`, `aria-describedby`)
- Helper text is announced by screen readers
- Focus management and keyboard navigation
- Required field indicators

---

### Checkbox

An accessible checkbox component with label and description support.

#### API Reference

```typescript
interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  id: string
  label?: string
  description?: string
  required?: boolean
}
```

#### Examples

**Basic Checkbox**
```tsx
import { Checkbox } from "@/components/checkbox"

<Checkbox
  id="terms"
  label="I agree to the Terms of Service"
/>
```

**With Description**
```tsx
<Checkbox
  id="newsletter"
  label="Subscribe to newsletter"
  description="Get weekly updates about new features and improvements"
/>
```

**Required Checkbox**
```tsx
<Checkbox
  id="consent"
  label="I consent to data processing"
  description="Required for account creation"
  required
/>
```

**Checkbox Group**
```tsx
import { useState } from "react"

function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false
  })
  
  const handleChange = (key: string) => (checked: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: checked }))
  }
  
  return (
    <div className="space-y-4">
      <h3>Notification Preferences</h3>
      
      <Checkbox
        id="email-notifications"
        label="Email notifications"
        description="Receive updates via email"
        checked={preferences.email}
        onCheckedChange={handleChange("email")}
      />
      
      <Checkbox
        id="sms-notifications"
        label="SMS notifications"
        description="Receive updates via text message"
        checked={preferences.sms}
        onCheckedChange={handleChange("sms")}
      />
      
      <Checkbox
        id="push-notifications"
        label="Push notifications"
        description="Receive updates via browser notifications"
        checked={preferences.push}
        onCheckedChange={handleChange("push")}
      />
    </div>
  )
}
```

#### Accessibility

- Native checkbox semantics
- Proper label association
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators

---

## Layout Components

### Dialog

A modal dialog component built on Radix UI primitives with customizable content areas.

#### API Reference

```typescript
// Root component
interface DialogRootProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

// Content component
interface DialogContentProps extends ComponentPropsWithoutRef<typeof Dialog.Content> {
  closeIcon?: boolean
}
```

#### Component Structure

```
Dialog.Root
├── Dialog.Trigger
└── Dialog.Portal
    ├── Dialog.Overlay
    └── Dialog.Content
        ├── Dialog.Header
        │   ├── Dialog.Title
        │   └── Dialog.Description
        ├── Dialog body content
        ├── Dialog.Footer
        └── Dialog.Close (optional)
```

#### Examples

**Basic Dialog**
```tsx
import * as Dialog from "@/components/dialog"
import { Button } from "@/components/button"

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Welcome</Dialog.Title>
      <Dialog.Description>
        This is a basic dialog example.
      </Dialog.Description>
    </Dialog.Header>
    
    <p>Dialog content goes here.</p>
    
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="outline">Close</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

**Confirmation Dialog**
```tsx
import * as Dialog from "@/components/dialog"
import { Button } from "@/components/button"
import { AlertTriangle } from "lucide-react"

function DeleteConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </Dialog.Trigger>
      
      <Dialog.Content>
        <Dialog.Header>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-destructive" />
            <Dialog.Title>Confirm Deletion</Dialog.Title>
          </div>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete the item.
          </Dialog.Description>
        </Dialog.Header>
        
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

**Form Dialog**
```tsx
import * as Dialog from "@/components/dialog"
import { Button } from "@/components/button"
import { TextField } from "@/components/textfield"
import { useForm } from "react-hook-form"

interface FormData {
  name: string
  email: string
}

function CreateUserDialog() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
  const [open, setOpen] = useState(false)
  
  const onSubmit = (data: FormData) => {
    console.log(data)
    setOpen(false)
    reset()
  }
  
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Create User</Button>
      </Dialog.Trigger>
      
      <Dialog.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Header>
            <Dialog.Title>Create New User</Dialog.Title>
            <Dialog.Description>
              Enter the user's information below.
            </Dialog.Description>
          </Dialog.Header>
          
          <div className="space-y-4 py-4">
            <TextField
              id="name"
              label="Full Name"
              {...register("name", { required: "Name is required" })}
              status={errors.name ? "negative" : "default"}
              helperText={errors.name?.message}
            />
            
            <TextField
              id="email"
              label="Email Address"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email"
                }
              })}
              status={errors.email ? "negative" : "default"}
              helperText={errors.email?.message}
            />
          </div>
          
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Create User</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

**Controlled Dialog**
```tsx
import * as Dialog from "@/components/dialog"
import { Button } from "@/components/button"
import { useState } from "react"

function ControlledDialogExample() {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSave = () => {
    // Perform save operation
    console.log("Saving...")
    setIsOpen(false)
  }
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Controlled Dialog
      </Button>
      
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog's state is controlled by the parent component.
            </Dialog.Description>
          </Dialog.Header>
          
          <p>Content goes here...</p>
          
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
```

#### Accessibility

- Focus trap within dialog
- Escape key closes dialog
- Click outside closes dialog (configurable)
- Proper ARIA attributes
- Focus restoration on close
- Scroll locking

---

### Accordion

Collapsible content sections with smooth animations and keyboard navigation.

#### API Reference

```typescript
// Root component
interface AccordionRootProps {
  type: "single" | "multiple"
  collapsible?: boolean // Only for single type
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

// Item component
interface AccordionItemProps {
  value: string
  disabled?: boolean
}
```

#### Examples

**Single Accordion**
```tsx
import * as Accordion from "@/components/accordion"

<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>
      What is the JH Design System?
    </Accordion.Trigger>
    <Accordion.Content>
      JH Design System is a comprehensive collection of reusable components
      built with PandaCSS and React, designed for building consistent and
      accessible user interfaces.
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="item-2">
    <Accordion.Trigger>
      How do I install components?
    </Accordion.Trigger>
    <Accordion.Content>
      Use the CLI tool to install components: `npx @jongh/cli add button`
      This will download the component code to your project.
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="item-3">
    <Accordion.Trigger>
      Is it accessible?
    </Accordion.Trigger>
    <Accordion.Content>
      Yes! All components follow WCAG guidelines and include proper ARIA
      attributes, keyboard navigation, and focus management.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

**Multiple Accordion (Multiple Items Open)**
```tsx
<Accordion.Root type="multiple">
  <Accordion.Item value="features">
    <Accordion.Trigger>
      Features
    </Accordion.Trigger>
    <Accordion.Content>
      <ul className="list-disc pl-5 space-y-1">
        <li>Type-safe styling with PandaCSS</li>
        <li>Accessible components</li>
        <li>CLI for easy installation</li>
        <li>Comprehensive documentation</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="getting-started">
    <Accordion.Trigger>
      Getting Started
    </Accordion.Trigger>
    <Accordion.Content>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Install the CLI: `npm install -g @jongh/cli`</li>
        <li>Initialize your project: `npx @jongh/cli init`</li>
        <li>Add components: `npx @jongh/cli add button`</li>
        <li>Start building!</li>
      </ol>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

**Controlled Accordion**
```tsx
import { useState } from "react"

function ControlledAccordion() {
  const [value, setValue] = useState<string[]>(["item-1"])
  
  return (
    <Accordion.Root 
      type="multiple" 
      value={value} 
      onValueChange={setValue}
    >
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Always Open Initially
        </Accordion.Trigger>
        <Accordion.Content>
          This item is controlled and starts open.
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          Controlled Item
        </Accordion.Trigger>
        <Accordion.Content>
          This accordion's state is managed by the parent component.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

**FAQ Section**
```tsx
const faqs = [
  {
    question: "What browsers are supported?",
    answer: "All modern browsers including Chrome, Firefox, Safari, and Edge."
  },
  {
    question: "Can I customize the theme?",
    answer: "Yes! You can extend the default theme or create completely custom themes."
  },
  {
    question: "Is TypeScript required?",
    answer: "While not required, TypeScript is highly recommended for the best developer experience."
  }
]

function FAQSection() {
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <Accordion.Root type="single" collapsible>
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`}>
            <Accordion.Trigger>
              {faq.question}
            </Accordion.Trigger>
            <Accordion.Content>
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
```

#### Accessibility

- Keyboard navigation (Arrow keys, Home, End)
- Enter and Space to toggle items
- Focus management
- ARIA attributes for screen readers
- Proper heading structure

---

### Tabs

Tab navigation component for organizing and switching between different content panels.

#### API Reference

```typescript
interface TabsRootProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
}
```

#### Examples

**Basic Tabs**
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
    <p>
      Welcome to the JH Design System. This comprehensive library provides
      everything you need to build consistent, accessible user interfaces.
    </p>
  </Tabs.Content>
  
  <Tabs.Content value="components">
    <h2>Component Library</h2>
    <p>
      Browse our collection of reusable components, each designed with
      accessibility and customization in mind.
    </p>
  </Tabs.Content>
  
  <Tabs.Content value="examples">
    <h2>Usage Examples</h2>
    <p>
      See how to implement common patterns and use cases with our components.
    </p>
  </Tabs.Content>
</Tabs.Root>
```

**Controlled Tabs**
```tsx
import { useState } from "react"

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="profile">
        <h3>Profile Information</h3>
        <p>Manage your personal information and preferences.</p>
      </Tabs.Content>
      
      <Tabs.Content value="settings">
        <h3>Account Settings</h3>
        <p>Configure your account settings and privacy options.</p>
      </Tabs.Content>
      
      <Tabs.Content value="notifications">
        <h3>Notification Preferences</h3>
        <p>Choose how you want to receive notifications.</p>
      </Tabs.Content>
    </Tabs.Root>
  )
}
```

**Tabs with Icons**
```tsx
import { User, Settings, Bell, Shield } from "lucide-react"

<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">
      <User />
      Account
    </Tabs.Trigger>
    <Tabs.Trigger value="settings">
      <Settings />
      Settings
    </Tabs.Trigger>
    <Tabs.Trigger value="notifications">
      <Bell />
      Notifications
    </Tabs.Trigger>
    <Tabs.Trigger value="security">
      <Shield />
      Security
    </Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="account">
    <div className="space-y-4">
      <h3>Account Information</h3>
      <TextField id="name" label="Display Name" />
      <TextField id="email" label="Email Address" type="email" />
    </div>
  </Tabs.Content>
  
  <Tabs.Content value="settings">
    <div className="space-y-4">
      <h3>Application Settings</h3>
      <Checkbox id="dark-mode" label="Enable dark mode" />
      <Checkbox id="auto-save" label="Auto-save changes" />
    </div>
  </Tabs.Content>
  
  <Tabs.Content value="notifications">
    <div className="space-y-4">
      <h3>Notification Settings</h3>
      <Checkbox id="email-notif" label="Email notifications" />
      <Checkbox id="push-notif" label="Push notifications" />
    </div>
  </Tabs.Content>
  
  <Tabs.Content value="security">
    <div className="space-y-4">
      <h3>Security Settings</h3>
      <Button>Change Password</Button>
      <Button variant="outline">Enable 2FA</Button>
    </div>
  </Tabs.Content>
</Tabs.Root>
```

**Dashboard Tabs**
```tsx
function DashboardTabs() {
  const tabData = {
    analytics: {
      title: "Analytics",
      metrics: { views: 1234, clicks: 567, conversions: 89 }
    },
    users: {
      title: "Users",
      count: 2456,
      active: 1823
    },
    settings: {
      title: "Settings",
      lastUpdated: "2 hours ago"
    }
  }
  
  return (
    <Tabs.Root defaultValue="analytics">
      <Tabs.List>
        <Tabs.Trigger value="analytics">
          Analytics
          <span className="badge">{tabData.analytics.metrics.views}</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="users">
          Users
          <span className="badge">{tabData.users.count}</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="settings">
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="analytics">
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <h4>Page Views</h4>
            <p>{tabData.analytics.metrics.views}</p>
          </div>
          <div className="stat-card">
            <h4>Clicks</h4>
            <p>{tabData.analytics.metrics.clicks}</p>
          </div>
          <div className="stat-card">
            <h4>Conversions</h4>
            <p>{tabData.analytics.metrics.conversions}</p>
          </div>
        </div>
      </Tabs.Content>
      
      <Tabs.Content value="users">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h4>Total Users</h4>
              <p>{tabData.users.count}</p>
            </div>
            <div>
              <h4>Active Users</h4>
              <p>{tabData.users.active}</p>
            </div>
          </div>
        </div>
      </Tabs.Content>
      
      <Tabs.Content value="settings">
        <div>
          <p>Last updated: {tabData.settings.lastUpdated}</p>
          <Button>Update Settings</Button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
```

#### Accessibility

- Keyboard navigation (Arrow keys, Home, End)
- Tab key moves focus to active panel
- ARIA attributes for screen readers
- Focus management between tabs and content
- Proper tab list semantics

---

## Data Components

### Avatar

User avatar component with image fallback and size variants.

#### API Reference

```typescript
interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
  className?: string
}
```

#### Examples

**Basic Avatar**
```tsx
import { Avatar } from "@/components/avatar"

<Avatar 
  src="/user-avatar.jpg"
  alt="John Doe"
  fallback="JD"
/>
```

**Different Sizes**
```tsx
<div className="flex items-center space-x-4">
  <Avatar size="sm" fallback="S" />
  <Avatar size="md" fallback="M" />
  <Avatar size="lg" fallback="L" />
</div>
```

**Fallback Only**
```tsx
<Avatar fallback="AB" />
```

**User List with Avatars**
```tsx
const users = [
  { id: 1, name: "Alice Johnson", avatar: "/alice.jpg", initials: "AJ" },
  { id: 2, name: "Bob Smith", avatar: "/bob.jpg", initials: "BS" },
  { id: 3, name: "Charlie Brown", avatar: null, initials: "CB" }
]

function UserList() {
  return (
    <div className="space-y-3">
      {users.map(user => (
        <div key={user.id} className="flex items-center space-x-3">
          <Avatar 
            src={user.avatar}
            alt={user.name}
            fallback={user.initials}
          />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  )
}
```

#### Accessibility

- Proper alt text for images
- Fallback text for screen readers
- Semantic image element

---

### Chip

Small status or category indicators with optional remove functionality.

#### API Reference

```typescript
interface ChipProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md"
  removable?: boolean
  onRemove?: () => void
}
```

#### Examples

**Basic Chips**
```tsx
import { Chip } from "@/components/chip"

<div className="flex space-x-2">
  <Chip>Design System</Chip>
  <Chip variant="secondary">React</Chip>
  <Chip variant="outline">TypeScript</Chip>
</div>
```

**Removable Chips**
```tsx
import { useState } from "react"

function TagList() {
  const [tags, setTags] = useState(["React", "TypeScript", "PandaCSS", "Design"])
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Chip 
          key={tag}
          removable
          onRemove={() => removeTag(tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  )
}
```

**Status Indicators**
```tsx
function StatusChips() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span>Project Status:</span>
        <Chip variant="primary">Active</Chip>
      </div>
      
      <div className="flex items-center space-x-2">
        <span>Priority:</span>
        <Chip variant="outline">Medium</Chip>
      </div>
      
      <div className="flex items-center space-x-2">
        <span>Category:</span>
        <Chip variant="secondary">Frontend</Chip>
      </div>
    </div>
  )
}
```

---

## Form Components

### Select

Dropdown selection component with search and multi-select capabilities.

#### API Reference

```typescript
interface SelectProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  disabled?: boolean
}
```

#### Examples

**Basic Select**
```tsx
import { Select } from "@/components/select"
import { useState } from "react"

function BasicSelect() {
  const [value, setValue] = useState("")
  
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" }
  ]
  
  return (
    <Select
      placeholder="Choose a framework"
      value={value}
      onValueChange={setValue}
      options={options}
    />
  )
}
```

**Form Integration**
```tsx
import { useForm, Controller } from "react-hook-form"

interface FormData {
  framework: string
  experience: string
}

function DeveloperForm() {
  const { control, handleSubmit } = useForm<FormData>()
  
  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" }
  ]
  
  const experienceOptions = [
    { value: "beginner", label: "Beginner (0-1 years)" },
    { value: "intermediate", label: "Intermediate (2-4 years)" },
    { value: "advanced", label: "Advanced (5+ years)" }
  ]
  
  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-4">
      <div>
        <label>Preferred Framework</label>
        <Controller
          name="framework"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select framework"
              options={frameworkOptions}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      
      <div>
        <label>Experience Level</label>
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select experience level"
              options={experienceOptions}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

---

### Slider

Range input component for selecting numeric values.

#### API Reference

```typescript
interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  disabled?: boolean
}
```

#### Examples

**Single Value Slider**
```tsx
import { Slider } from "@/components/slider"
import { useState } from "react"

function VolumeControl() {
  const [volume, setVolume] = useState([50])
  
  return (
    <div className="space-y-2">
      <label>Volume: {volume[0]}%</label>
      <Slider
        min={0}
        max={100}
        step={1}
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  )
}
```

**Range Slider**
```tsx
function PriceRangeFilter() {
  const [priceRange, setPriceRange] = useState([100, 500])
  
  return (
    <div className="space-y-2">
      <label>
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </label>
      <Slider
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onValueChange={setPriceRange}
      />
    </div>
  )
}
```

---

### Calendar

Date selection component with single, multiple, and range selection modes.

#### API Reference

```typescript
interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | DateRange
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void
  disabled?: (date: Date) => boolean | Date[]
  locale?: Locale
}
```

#### Examples

**Single Date Selection**
```tsx
import { Calendar } from "@/components/calendar"
import { useState } from "react"

function DatePicker() {
  const [date, setDate] = useState<Date>()
  
  return (
    <div>
      <p>Selected date: {date?.toLocaleDateString()}</p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    </div>
  )
}
```

**Date Range Selection**
```tsx
import { DateRange } from "react-day-picker"

function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>()
  
  return (
    <div>
      <p>
        Selected range: {range?.from?.toLocaleDateString()} - {range?.to?.toLocaleDateString()}
      </p>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />
    </div>
  )
}
```

---

## Animation Components

### AnimateText

Text animation component with various entrance effects.

#### API Reference

```typescript
interface AnimateTextProps {
  text: string
  animation?: "fadeIn" | "slideUp" | "typewriter"
  delay?: number
  duration?: number
  className?: string
}
```

#### Examples

**Fade In Animation**
```tsx
import { AnimateText } from "@/components/animateText"

<AnimateText 
  text="Welcome to our design system"
  animation="fadeIn"
  duration={1000}
/>
```

**Typewriter Effect**
```tsx
<AnimateText
  text="Building amazing interfaces with JH Design System..."
  animation="typewriter"
  duration={3000}
/>
```

**Slide Up Animation**
```tsx
<AnimateText
  text="Smooth animations make better experiences"
  animation="slideUp"
  delay={500}
/>
```

---

### AnimateButton

Button component with built-in hover and click animations.

#### API Reference

```typescript
interface AnimateButtonProps extends ButtonProps {
  animationType?: "scale" | "bounce" | "pulse"
}
```

#### Examples

**Scale Animation**
```tsx
import { AnimateButton } from "@/components/animateButton"

<AnimateButton animationType="scale">
  Hover to scale
</AnimateButton>
```

**Bounce Effect**
```tsx
<AnimateButton 
  animationType="bounce"
  variant="secondary"
>
  Click for bounce
</AnimateButton>
```

**Pulse Animation**
```tsx
<AnimateButton 
  animationType="pulse"
  variant="outline"
>
  Pulsing button
</AnimateButton>
```

---

## Testing Components

### Unit Testing

All components include comprehensive unit tests using Vitest and React Testing Library:

```typescript
import { render, screen, userEvent } from "@testing-library/react"
import { Button } from "@/components/button"

describe("Button", () => {
  test("renders with correct text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })
  
  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledOnce()
  })
  
  test("applies correct variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("secondary-variant-class")
  })
})
```

### Accessibility Testing

Use the Storybook a11y addon for automated accessibility testing:

```typescript
// In your stories file
import { expect } from "@storybook/test"

export const AccessibleButton: Story = {
  args: {
    children: "Accessible button"
  },
  play: async ({ canvasElement }) => {
    // Accessibility tests run automatically with a11y addon
  }
}
```

### Visual Testing

Components support visual regression testing through Storybook:

```bash
# Run visual tests
npm run test-storybook

# Update visual snapshots
npm run test-storybook -- --updateSnapshots
```

---

This component reference provides comprehensive documentation for implementing and using all components in the JH Design System. Each component includes detailed API references, practical examples, accessibility considerations, and testing approaches.