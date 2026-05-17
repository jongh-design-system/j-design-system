# Principle: Test Value and Sustainability

## Core Concept

Tests must be valuable and sustainable. Every test should either protect against regressions or be deleted. Tests that exist "just because" or are clearly temporary waste time and create maintenance burden.

## Why This Matters

**Tests are code that must be maintained.** Bad tests:

1. Give false confidence without actually catching bugs
2. Break when implementation details change (even if behavior is correct)
3. Have unclear names that don't explain what they're protecting
4. Increase CI time without providing value
5. Create noise that makes real failures harder to spot

**The cost of maintaining a test must be justified by its value.**

## Two-Stage Judgment

### Stage 1: Does This Test Have Value?

Ask: "What would break if I deleted this test?"

- If the answer is "nothing important" → **DELETE THE TEST**
- If the answer is "a critical user-facing behavior" → Keep it, move to Stage 2

### Stage 2: Is This Test Sustainable?

Ask: "Will this test still be useful in 6 months?"

- If no (temporary file name, tests implementation details, unclear purpose) → **FIX THE TEST**
- If yes (clear name, tests behavior, well-structured) → Keep it as-is

## Bad Examples

### Example 1: No Value - Existence Checks

```typescript
// ❌ Worthless - TypeScript already guarantees this
test('function exists', () => {
  expect(parseTheme).toBeDefined()
})

test('component renders', () => {
  const { container } = render(<Button />)
  expect(container).toBeTruthy()
})
```

**Problem**:

- Doesn't test any behavior
- Will never catch a bug
- If the function/component doesn't exist, TypeScript compilation fails anyway
- Pure noise

**Action**: DELETE

### Example 2: No Value - Meaningless Mock Verification

```typescript
// ❌ Tests implementation, not behavior
test("processOrder calls validatePayment", () => {
  const spy = jest.spyOn(payment, "validatePayment")

  processOrder(order)

  expect(spy).toHaveBeenCalled()
})
```

**Problem**:

- Tests internal implementation detail
- If you refactor `processOrder` to use a different validation approach, test breaks
- Doesn't verify the actual outcome (was the order processed correctly?)
- Couples test to internal structure

**Action**: DELETE or rewrite to test behavior

**Better** (if keeping):

```typescript
test("processOrder succeeds when payment is valid", () => {
  const result = processOrder(validOrder)

  expect(result.status).toBe("success")
  expect(result.orderId).toBeDefined()
})

test("processOrder fails when payment is invalid", () => {
  const result = processOrder(invalidPaymentOrder)

  expect(result.status).toBe("failed")
  expect(result.error).toContain("payment")
})
```

### Example 3: Not Sustainable - Temporary File Names

```typescript
// ❌ ai-final-theme.test.ts
test("check if theme works", () => {
  const result = parseTheme(someData)
  expect(result).toBeTruthy()
})
```

**Problem**:

- File name screams "temporary" (`ai-final-`, `temp-`, `test-`)
- Test purpose is unclear ("check if theme works" - what does "works" mean?)
- Will be forgotten and rot

**Action**: FIX - Rename to `theme-parser.test.ts` and clarify what's being tested

**Better**:

```typescript
// theme-parser.test.ts
describe("parseTheme", () => {
  test("extracts colors and spacing from valid theme object", () => {
    const theme = parseTheme({
      colors: { primary: "#000" },
      spacing: { base: 4 },
    })

    expect(theme.colors.primary).toBe("#000")
    expect(theme.spacing.base).toBe(4)
  })
})
```

### Example 4: Not Sustainable - Testing Private Implementation

```typescript
// ❌ Coupled to internal state
test("button updates internal counter state", () => {
  const button = new Button()
  const spy = jest.spyOn(button, "_updateInternalState")

  button.handleClick()

  expect(spy).toHaveBeenCalledWith({ count: 1 })
  expect(button._state.count).toBe(1)
})
```

**Problem**:

- Tests private methods and internal state
- Refactoring internal implementation breaks the test
- Doesn't test what users actually see

**Action**: FIX - Test user-visible behavior

**Better**:

```typescript
test('button displays incremented count after each click', () => {
  render(<Button />)

  expect(screen.getByText('Count: 0')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Count: 2')).toBeInTheDocument()
})
```

### Example 5: Not Sustainable - Brittle Snapshots

```typescript
// ❌ Massive snapshot that changes constantly
test('renders dashboard', () => {
  const { container } = render(<Dashboard user={mockUser} />)
  expect(container).toMatchSnapshot()
})
```

**Problem**:

- Captures every tiny DOM detail
- Breaks on any styling or structure change
- Developers just update snapshots without reviewing
- Doesn't document what's actually important

**Action**: FIX - Test specific important behaviors

**Better**:

```typescript
test('dashboard shows user name and recent activity', () => {
  render(<Dashboard user={mockUser} />)

  expect(screen.getByText('Welcome, John')).toBeInTheDocument()
  expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(mockUser.activities.length)
})
```

## Good Examples

### Example 1: Valuable and Sustainable

```typescript
// cart.test.ts
describe("shopping cart", () => {
  test("calculates total with multiple items", () => {
    const cart = new Cart()
    cart.add({ id: 1, price: 10, quantity: 2 })
    cart.add({ id: 2, price: 5, quantity: 3 })

    expect(cart.total()).toBe(35)
  })

  test("applies discount code correctly", () => {
    const cart = new Cart()
    cart.add({ id: 1, price: 100, quantity: 1 })
    cart.applyDiscount("SAVE20")

    expect(cart.total()).toBe(80)
  })
})
```

**Why This Works**:

- Clear file name (`cart.test.ts`)
- Tests critical business logic
- Tests behavior (input → output), not implementation
- Will catch regressions if discount calculation changes
- Easy to maintain

### Example 2: Edge Cases Protected

```typescript
// email-validator.test.ts
describe("validateEmail", () => {
  test("accepts valid email addresses", () => {
    expect(validateEmail("user@example.com")).toBe(true)
    expect(validateEmail("user+tag@example.co.uk")).toBe(true)
  })

  test("rejects invalid formats", () => {
    expect(validateEmail("notanemail")).toBe(false)
    expect(validateEmail("@example.com")).toBe(false)
    expect(validateEmail("user@")).toBe(false)
  })
})
```

**Why This Works**:

- Protects against common edge cases
- Documents expected behavior
- Will catch if someone breaks validation logic
- Name clearly indicates what's being tested

### Example 3: Integration Test for Critical Flow

```typescript
// checkout-flow.test.ts
describe("checkout flow", () => {
  test("completes purchase with valid card", async () => {
    const result = await checkout({
      cart: mockCart,
      payment: validCard,
      address: validAddress,
    })

    expect(result.status).toBe("success")
    expect(result.orderId).toBeDefined()
    expect(result.confirmationEmail).toBe(user.email)
  })

  test("fails gracefully with declined card", async () => {
    const result = await checkout({
      cart: mockCart,
      payment: declinedCard,
      address: validAddress,
    })

    expect(result.status).toBe("failed")
    expect(result.error.code).toBe("PAYMENT_DECLINED")
    expect(result.userMessage).toContain("declined")
  })
})
```

**Why This Works**:

- Tests critical user journey end-to-end
- Covers success and failure cases
- High value - catches integration bugs
- Clear enough to maintain long-term

## Judgment Criteria

### Stage 1: Value Check

**❌ DELETE if the test:**

- Only checks that something exists/is defined
- Tests TypeScript type guarantees
- Verifies trivial getters/setters
- Checks implementation details (internal method calls, private state)
- Is a snapshot with no clear purpose
- Would never catch a real bug

**✅ KEEP if the test:**

- Protects critical business logic
- Covers important edge cases
- Tests user-visible behavior
- Would catch regressions if code changes
- Documents expected behavior clearly

### Stage 2: Sustainability Check

**❌ FIX if the test:**

- Has a temporary file name (`ai-final-`, `temp-`, `check-`, `test-`)
- Couples to implementation details (spies on private methods, checks internal state)
- Uses massive snapshots without clear assertions
- Has unclear test names ("it works", "check functionality")
- Will break on harmless refactoring

**✅ KEEP if the test:**

- Has a clear, permanent file name matching the module/feature
- Tests behavior through public APIs
- Has descriptive test names explaining what's verified
- Is resilient to implementation changes
- Will remain valuable in 6+ months

## Red Flags

Watch for these patterns:

```typescript
// ❌ File names
ai-final-theme.test.ts
temp-check.test.ts
test-something.test.ts

// ❌ Worthless assertions
expect(component).toBeDefined()
expect(result).toBeTruthy()
expect(spy).toHaveBeenCalled()

// ❌ Testing privates
expect(obj._internalState).toBe(...)
jest.spyOn(obj, '_privateMethod')

// ❌ Unclear purpose
test('it works', () => ...)
test('check theme', () => ...)
```

## Summary

Every test must answer "yes" to both questions:

1. **Does this test have value?** (Would we lose important coverage by deleting it?)
2. **Is this test sustainable?** (Will it still be useful and maintainable in 6 months?)

If no to question 1 → **DELETE**
If yes to question 1, but no to question 2 → **FIX**
If yes to both → **KEEP**

Bad tests are worse than no tests because they create maintenance burden without providing protection.
