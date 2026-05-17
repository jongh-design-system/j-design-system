# Principle: Avoid Unnecessary Indirection

## Core Concept

Don't extract functions, variables, or abstractions unless they serve a meaningful purpose. Code should be readable top-to-bottom without constantly jumping to function definitions.

## Why This Matters

**Code is read more than it's written.** When reading code:

1. The brain naturally predicts what comes next, line by line
2. Every function call forces you to jump "up" to find the definition
3. If that definition is trivial (a one-liner wrapper), you've wasted mental energy
4. The cost of indirection exceeds the benefit of "shorter" code

**Readability comes from predictability**, not from splitting everything into tiny functions.

## Bad Examples

### Example 1: Meaningless Wrappers

```typescript
const getUserName = () => user.name
const getUserId = () => user.id

function processUser() {
  const name = getUserName()
  const id = getUserId()
  return { name, id }
}
```

**Problem**:

- `getUserName` and `getUserId` do nothing but wrap a property access
- You have to scroll up to see what they do
- They're used once, adding no semantic value
- The abstraction creates distance between intent and implementation

**Better**:

```typescript
function processUser() {
  return {
    name: user.name,
    id: user.id,
  }
}
```

### Example 2: Single-Use Function Chains

```typescript
const calculateTotal = () => price * quantity
const applyDiscount = () => calculateTotal() * 0.9
const getFinalPrice = () => applyDiscount()

return getFinalPrice()
```

**Problem**:

- Three function definitions for a single calculation
- Each function is used exactly once
- To understand `getFinalPrice()`, you chase through two more functions

**Better**:

```typescript
const finalPrice = price * quantity * 0.9
return finalPrice
```

### Example 3: Over-Extracted Helpers

```typescript
const getUserEmail = (user) => user.email
const formatEmail = (email) => email.toLowerCase()
const validateEmail = (email) => email.includes("@")

function sendWelcome(user) {
  const email = getUserEmail(user)
  const formatted = formatEmail(email)
  if (validateEmail(formatted)) {
    sendEmail(formatted, "Welcome!")
  }
}
```

**Problem**:

- `getUserEmail` is a property accessor disguised as a function
- `formatEmail` is a built-in method wrapped unnecessarily
- `validateEmail` is too simplistic to warrant extraction

**Better**:

```typescript
function sendWelcome(user) {
  const email = user.email.toLowerCase()
  if (email.includes("@")) {
    sendEmail(email, "Welcome!")
  }
}
```

## Good Examples (When Abstraction Makes Sense)

### Example 1: Domain Complexity

```typescript
function applyMembershipDiscount(user: User, price: number): number {
  if (user.isPremium && user.memberSince < new Date("2024-01-01")) {
    return price * 0.7
  }
  if (user.isPremium) {
    return price * 0.8
  }
  if (user.referralCount > 5) {
    return price * 0.85
  }
  return price * 0.9
}

const finalPrice = applyMembershipDiscount(user, price)
```

**Why This Works**:

- "Membership discount" is a clear domain concept
- The logic is non-trivial (multiple business rules)
- The function name communicates business intent

### Example 2: Reusable Complex Logic

```typescript
function normalizePhoneNumber(phone: string): string {
  return phone
    .replace(/\D/g, "")
    .replace(/^1/, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}

const userPhone = normalizePhoneNumber(user.phone)
const partnerPhone = normalizePhoneNumber(partner.phone)
```

**Why This Works**:

- Complex transformation
- Used in multiple places
- Clear semantic name

## Judgment Criteria

### ❌ Mark as violation if:

- Function is used once and only wraps a simple operation
- Function name doesn't add semantic meaning
- Reading requires constant jumping between definitions
- The "abstraction" just splits lines without adding clarity

### ✅ Consider acceptable if:

- Function encapsulates complex domain logic
- Function is reused in multiple places
- Function name communicates business intent
- Abstracting improves testability

## Red Flags

```typescript
// ❌ "Get" functions that just access properties
const getName = () => user.name

// ❌ One-line wrappers around built-in methods
const lowercase = (str) => str.toLowerCase()

// ❌ Functions used exactly once with no semantic value
const doThing = () => {
  /* some code */
}
doThing()
```

## Summary

**Indirection must earn its place** by adding semantic clarity, reducing duplication, encapsulating complexity, enabling reuse, or improving testability.
