# Principle: Type SSOT (Single Source of Truth)

## Core Concept

Never duplicate type definitions for the same data. When a type already exists (in a schema, API response, or type definition), derive related types from it using TypeScript's inference and indexed access types.

## Why This Matters

**Type duplication leads to inconsistency bugs:**

1. When the source changes, manually defined types don't update automatically
2. You create opportunities for type mismatches between runtime and compile-time
3. Maintenance burden increases—every change requires updating multiple places
4. The "source of truth" becomes unclear—which type is correct?

**TypeScript provides powerful inference tools.** Use them to maintain a single source of truth and let the type system propagate changes automatically.

## Bad Examples

### Example 1: Duplicating Schema Types

```typescript
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user", "guest"]),
})

// ❌ Manually duplicating types from schema
type UserId = string
type UserEmail = string
type UserRole = "admin" | "user" | "guest"

function getUserRole(id: UserId): UserRole {
  // ...
}
```

**Problem**:

- If `userSchema` adds `'moderator'` to the role enum, `UserRole` type doesn't update
- Three separate type definitions that must be manually kept in sync
- No compile-time guarantee that `UserId` matches `userSchema.shape.id`

**Better**:

```typescript
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user", "guest"]),
})

type User = z.infer<typeof userSchema>
type UserId = User["id"]
type UserRole = User["role"]

function getUserRole(id: UserId): UserRole {
  // ...
}
```

Now if you change `userSchema`, all derived types update automatically.

### Example 2: Duplicating API Response Types

```typescript
// API returns this structure
async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`)
  return res.json() // { data: { user: {...}, posts: [...] } }
}

// ❌ Manually recreating the structure
type ApiUser = {
  id: string
  name: string
  email: string
}

type ApiResponse = {
  data: {
    user: ApiUser
    posts: Array<{ id: string; title: string }>
  }
}
```

**Problem**:

- If the API changes `user.email` to optional, you have to manually update `ApiUser`
- The type definition is disconnected from the actual API structure
- No single source of truth

**Better**:

```typescript
type ApiResponse = {
  data: {
    user: {
      id: string
      name: string
      email: string
    }
    posts: Array<{ id: string; title: string }>
  }
}

type ApiUser = ApiResponse["data"]["user"]
type ApiPost = ApiResponse["data"]["posts"][number]
```

Or if you have a schema:

```typescript
const apiResponseSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
    posts: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    ),
  }),
})

type ApiResponse = z.infer<typeof apiResponseSchema>
type ApiUser = ApiResponse["data"]["user"]
type ApiPost = ApiResponse["data"]["posts"][number]
```

### Example 3: Form Field Types

```typescript
const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
})

// ❌ Manually defining field types
type UsernameField = string
type EmailField = string
type AgeField = number

function validateUsername(value: UsernameField) {
  // ...
}
```

**Problem**:

- If `formSchema` changes `username` to allow empty strings, `UsernameField` doesn't reflect that
- Three separate type definitions for what's already defined in the schema

**Better**:

```typescript
const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
})

type FormData = z.infer<typeof formSchema>
type UsernameField = FormData["username"]
type EmailField = FormData["email"]
type AgeField = FormData["age"]

function validateUsername(value: UsernameField) {
  // ...
}
```

## Good Examples

### Example 1: Component Props as SSOT

```typescript
type ButtonProps = {
  variant: "primary" | "secondary" | "destructive"
  size: "sm" | "md" | "lg"
  disabled?: boolean
}

// ✅ Derive related types from props
type ButtonVariant = ButtonProps["variant"]
type ButtonSize = ButtonProps["size"]

// ✅ Extract specific prop combinations
type ButtonVariantProps = Pick<ButtonProps, "variant">
type ButtonSizeProps = Pick<ButtonProps, "size">

function getButtonClasses(variant: ButtonVariant, size: ButtonSize) {
  // ...
}
```

**Why This Works**:

- `ButtonProps` is the single source of truth
- All related types automatically update when props change
- Clear lineage: "this type comes from ButtonProps"

### Example 2: Database Schema as SSOT

```typescript
const userTableSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.string().url().optional(),
  }),
})

type UserRow = z.infer<typeof userTableSchema>
type UserId = UserRow["id"]
type UserProfile = UserRow["profile"]
type UserProfileWithAvatar = Required<UserProfile>

// For insert operations (without auto-generated fields)
type UserInsert = Omit<UserRow, "id" | "createdAt">
```

**Why This Works**:

- Schema drives all type definitions
- Insert types are derived, not duplicated
- Adding a field to the schema updates all related types

### Example 3: Enum Extraction

```typescript
const statusSchema = z.enum(["pending", "active", "completed", "cancelled"])

type Status = z.infer<typeof statusSchema>

// ✅ Get the array of possible values
const statusValues = statusSchema.options // ['pending', 'active', 'completed', 'cancelled']

function isValidStatus(value: string): value is Status {
  return statusValues.includes(value as Status)
}
```

**Why This Works**:

- The enum definition is the SSOT
- Runtime validation and type checking are derived from the same source

## Judgment Criteria

### ❌ Mark as violation if:

- Type is manually redefined when it could be inferred from a schema
- Type is manually redefined when it could be extracted from another type using indexed access (`Type['field']`)
- Changes to the source of truth require manual updates elsewhere
- Multiple type definitions exist for the same logical concept

### ✅ Consider acceptable if:

- The type is truly independent and doesn't derive from existing data
- Using `type` or `interface` to define the original SSOT (then others derive from it)
- Deliberately transforming a type for a different context (e.g., `Omit`, `Pick`, `Partial`)

## TypeScript Tools for SSOT

### Inference from schemas:

```typescript
type T = z.infer<typeof schema> // Zod
type T = typeof schema._type // Some schema libraries
```

### Indexed access:

```typescript
type UserId = User["id"] // Extract single field
type Post = ApiResponse["data"]["posts"][number] // Extract array element
```

### Utility types:

```typescript
type T = Pick<User, "id" | "email"> // Subset of fields
type T = Omit<User, "password"> // Exclude fields
type T = Partial<User> // All fields optional
type T = Required<User> // All fields required
type T = Record<string, User> // Map structure
```

### Conditional extraction:

```typescript
type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>
}
```

## Red Flags

Watch for these patterns:

```typescript
// ❌ Manually redefining what's in a schema
const schema = z.object({ id: z.string() })
type Id = string // Should be: type Id = z.infer<typeof schema>['id']

// ❌ Duplicating union types
type Props = { status: "a" | "b" | "c" }
type Status = "a" | "b" | "c" // Should be: type Status = Props['status']

// ❌ Manually maintaining parallel structures
type ApiUser = { id: string; name: string }
type DbUser = { id: string; name: string } // Should derive from one SSOT
```

## Summary

**Let TypeScript do the work.** When a type already exists:

1. Use `z.infer` for schema-to-type
2. Use indexed access (`Type['field']`) for extracting fields
3. Use utility types (`Pick`, `Omit`, etc.) for transformations
4. Never manually redefine what already exists

The goal: change the SSOT once, and all derived types update automatically.
