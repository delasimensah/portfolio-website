# 🧪 Testing Strategy

This document outlines our testing approach and best practices.

## 📋 Testing Types

### **Unit Tests**

Test individual functions and utilities:

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with title", () => {
    render(<Button title="Click me" onPress={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### **Integration Tests**

Test component interactions:

```typescript
import { render, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("submits form with valid data", async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <LoginForm onSubmit={onSubmit} />
    );

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
    });
  });
});
```

## 🎯 Testing Guidelines

### **What to Test**

- ✅ Component rendering
- ✅ User interactions
- ✅ Business logic
- ✅ Error handling
- ✅ Edge cases

### **What NOT to Test**

- ❌ Implementation details
- ❌ Third-party library behavior
- ❌ Framework internals

## 📊 Coverage Goals

- **Minimum**: 70% code coverage
- **Target**: 80%+ code coverage
- **Critical paths**: 100% coverage

## 🚀 Running Tests

```bash
# Run all tests
yarn test

# Run with coverage
yarn test:coverage

# Run in watch mode
yarn test:watch
```

---

_Testing ensures code quality and prevents regressions._
