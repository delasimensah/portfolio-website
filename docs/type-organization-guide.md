# 🏷️ Type Organization Guide

> **Purpose**: Clear guidelines for organizing TypeScript types to maintain clean, readable code.

## 🚀 Quick Start

### **Type Placement Decision Tree:**

```
Is this type used in multiple files?
├── YES → Extract to types/ folder
└── NO → Keep with component

Is this type a business domain type?
├── YES → Extract to types/ folder
└── NO → Keep with component

Is this type complex (>10 lines)?
├── YES → Consider extracting for readability
└── NO → Keep inline
```

---

## 📁 Type Organization Strategy

### **Co-location with Selective Extraction**

**Keep types with components by default** - This improves readability and keeps related code together.

**Extract only when shared** - Use `types/` folder for cross-component types.

---

## 🎯 Type Categories

### **1. Component Types (Keep Inline)**

**All component types stay inline with the component:**

```tsx
// ✅ GOOD: All component types stay inline in the component file
// components/ui/Button/Button.tsx
export type ButtonVariant = "link" | "primary" | "secondary" | "ghost";

export interface ButtonProps extends Omit<PressableProps, "onPress"> {
  variant?: ButtonVariant;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ ... }) => {
  // component implementation
};
```

**Examples of types that stay with components:**

- Component props interfaces (always inline)
- Component variant types (always inline)
- Simple utility types (always inline)
- Event handler types (always inline)
- Component-specific state types (always inline)

### **2. Shared Types (Extract to types/ folder)**

**Types used across multiple components or files:**

```tsx
// ✅ GOOD: Shared types go to types/ folder
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Then import where needed
import { User, ApiResponse } from "@/types";
```

**Examples of types that should be extracted:**

- Business domain types (User, Product, Order)
- API response types
- Navigation parameter types
- Shared utility types
- Global state types

---

## 📂 File Organization

### **types/ Folder Structure:**

```
types/
├── index.ts           # Main exports
├── user.ts           # User-related types
├── api.ts            # API response types
├── navigation.ts     # Navigation types
└── [domain].ts       # Domain-specific types
```

### **Component Type Files:**

**All component types stay inline:**

```tsx
// ComponentName.tsx
export type ComponentVariant = "primary" | "secondary";
export interface ComponentProps {
  variant?: ComponentVariant;
  // ... other props
}

const ComponentName: React.FC<ComponentProps> = ({ ... }) => {
  // component implementation
};
```

> **No separate .types.ts files** - Everything stays in the component file.

---

## 📝 Examples

### **✅ Good Examples:**

**Component with inline types:**

```tsx
// components/ui/Button/Button.tsx
export type ButtonVariant = "link" | "primary" | "secondary" | "ghost";

export interface ButtonProps extends Omit<PressableProps, "onPress"> {
  variant?: ButtonVariant;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ ... }) => {
  // implementation
};
```

**Shared types in types/ folder:**

```tsx
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// components/shared/Profile/Profile.tsx
import { User } from "@/types";

interface ProfileProps {
  user: User;
  onEdit?: () => void;
}
```

### **❌ Bad Examples:**

**Over-extracting simple types:**

```tsx
// ❌ BAD: Don't extract simple component props to global types
// types/button.ts
export interface ButtonProps {
  title: string;
  onPress: () => void;
}

// components/ui/Button/Button.tsx
import { ButtonProps } from "@/types/button";
```

**Keeping shared types inline:**

```tsx
// ❌ BAD: Don't keep shared types with components
// components/shared/Profile/Profile.tsx
interface User {
  id: string;
  name: string;
  email: string;
}
```

---

## 🎯 Decision Guidelines

### **When to Keep Types Inline:**

1. **Component props interfaces** - Always keep with component
2. **Component variants** - Button variants, input types, etc. (always inline)
3. **Component utilities** - Helper types for the component (always inline)
4. **Component state types** - Internal state interfaces (always inline)
5. **Event handler types** - Component-specific event types (always inline)

### **When to Extract to types/ folder:**

1. **Shared types** - Used in multiple components
2. **Business domain types** - User, Product, Order, etc.
3. **API types** - Request/response interfaces
4. **Navigation types** - Route parameters
5. **Global state types** - Zustand store types
6. **Complex types** - More than 10 lines for readability

---

## 📋 Quick Reference

### **Type Placement Rules:**

| Type Category      | Location              | Example              |
| ------------------ | --------------------- | -------------------- |
| Component props    | Inline with component | `ButtonProps`        |
| Component variants | Inline with component | `ButtonVariant`      |
| Business domain    | `types/` folder       | `User`, `Product`    |
| API responses      | `types/` folder       | `ApiResponse<T>`     |
| Navigation params  | `types/` folder       | `RootStackParamList` |

### **Import Patterns:**

**1. Within Same Folder - Use Relative Paths:**

```tsx
// ✅ GOOD: Component to component within same folder
import Text from "../Text/Text";
```

**2. Cross-Folder Imports - Use @ Notation:**

```tsx
// ✅ GOOD: Import shared types from types/ folder
import { User, ApiResponse } from "@/types";
```

---

## 🚨 Common Anti-Patterns

### **❌ Over-extracting Simple Types:**

```tsx
// ❌ BAD: Don't extract simple component props
// types/button.ts
export interface ButtonProps {
  title: string;
  onPress: () => void;
}
```

### **❌ Keeping Shared Types Inline:**

```tsx
// ❌ BAD: Don't keep shared types with components
// components/shared/Profile/Profile.tsx
interface User {
  id: string;
  name: string;
  email: string;
}
```

---

## 🎯 Best Practices

1. **All component types stay inline** - Component props, variants, utilities all stay with component
2. **No separate .types.ts files** - All component types defined in the component file
3. **Extract shared types** - Move to `types/` folder when used in multiple places
4. **Be consistent** - Follow the same pattern across the codebase
5. **Keep it simple** - Don't over-engineer type organization

---

## 📚 Related Documentation

- [Component Building Guide](./component-building-guide.md)
- [Component Organization Guide](./component-organization-guide.md)
- [Import Patterns Guide](./import-patterns-guide.md)

---

_This documentation is maintained by the development team. Update when type organization patterns change._
