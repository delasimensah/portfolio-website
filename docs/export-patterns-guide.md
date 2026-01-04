# 📦 Export Patterns Guide

> **Purpose**: Comprehensive guide for export patterns to ensure consistent public APIs.

## 🚀 Quick Start

### **Export Rules:**

```typescript
// ✅ GOOD: Export from index.ts files
export { default as ComponentName } from "./path/ComponentName";
export { utilityFunction } from "./utility";

// ✅ GOOD: Group exports by category
// UI Components
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";

// ❌ BAD: Don't export internal implementation details
export { ButtonVariant } from "./ui/Button/Button.types";
export { variantStyles } from "./ui/Button/Button";
```

---

## 📁 Required Index.ts Files

### **All Top-Level Folders Must Have Index.ts Files:**

1. **`components/index.ts`** - Export all reusable components
2. **`types/index.ts`** - Export all shared types
3. **`constants/index.ts`** - Export all constants
4. **`utils/index.ts`** - Export all utility functions
5. **`hooks/index.ts`** - Export all custom hooks
6. **`services/index.ts`** - Export all services

**All utilities are exported from the barrel for consistency and ease of use.**

---

## 🎯 Export Patterns

### **1. Component Exports**

**Default exports for components:**

```typescript
// ✅ GOOD: Default exports for components
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";
export { default as DashboardScreen } from "./screens/dashboard/DashboardScreen/DashboardScreen";

// ✅ GOOD: Mixed exports when needed
export { HStack, default as Stack, VStack } from "./ui/Stack/Stack";

// ❌ BAD: Don't export internal types
export { ButtonVariant } from "./ui/Button/Button.types";
```

### **2. Type Exports**

**Named exports for types:**

```typescript
// ✅ GOOD: Named exports for types
export type { User } from "./user";
export type { ApiResponse } from "./api";
export type { Track, Album, Artist } from "./music";

// ❌ BAD: Don't export component-specific types
export type { ButtonVariant } from "./ui/Button/Button.types";
```

### **3. Constant Exports**

**Default exports for constants:**

```typescript
// ✅ GOOD: Default exports for constants
export { default as COLORS } from "./colors";
export { default as FONTS } from "./fonts";
export { default as ASSETS } from "./assets";

// ✅ GOOD: Named exports for multiple constants
export { FONT_LOADING_MAP, default as FONTS } from "./fonts";
```

### **4. Utility Exports**

**Default exports for utilities:**

```typescript
// ✅ GOOD: Default exports for utilities
export { default as cn } from "./cn";
export { default as formatDate } from "./formatDate";

// ✅ GOOD: Named exports for multiple utilities
export { defaultStackScreenOptions, screenPresets } from "./navigation";
```

---

## 📋 Export Rules

### **1. All Public APIs Must Be Exported**

```typescript
// ✅ GOOD: Export all reusable components
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";

// ❌ BAD: Missing exports
// Button exists but not exported from index.ts
```

### **2. Use Consistent Export Patterns**

```typescript
// ✅ GOOD: Default exports for components
export { default as ComponentName } from "./path/ComponentName";

// ✅ GOOD: Named exports for utilities
export { utilityFunction } from "./utility";
```

### **3. Group Exports by Category**

```typescript
// ✅ GOOD: Organized by category
// UI Components
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";

// Navigation Components
export { default as AppHeader } from "./navigation/AppHeader/AppHeader";

// Shared Components
export { default as ProfileCard } from "./shared/ProfileCard/ProfileCard";
```

### **4. Never Export Internal Implementation Details**

```typescript
// ✅ GOOD: Only export public API
export { default as Button } from "./ui/Button/Button";

// ❌ BAD: Don't export internal types or utilities
export { ButtonVariant } from "./ui/Button/Button.types";
export { variantStyles } from "./ui/Button/Button";
```

---

## 🎯 Adding New Exports

### **When Adding a New Component:**

1. **Create the component file** in the appropriate folder
2. **Export from index.ts** using the correct pattern
3. **Test the export** by importing it elsewhere

**Example:**

```typescript
// 1. Create: components/ui/NewButton/NewButton.tsx
const NewButton: React.FC<NewButtonProps> = ({ ... }) => {
  // implementation
};

export default NewButton;

// 2. Export from: components/index.ts
export { default as NewButton } from "./ui/NewButton/NewButton";

// 3. Use elsewhere:
import { NewButton } from "@/components";
```

---

## 🚨 Common Anti-Patterns

### **❌ Missing Exports:**

```typescript
// ❌ BAD: Component exists but not exported
// components/ui/NewButton/NewButton.tsx exists
// but not exported from components/index.ts
```

### **❌ Exporting Internal Details:**

```typescript
// ❌ BAD: Exporting internal implementation details
export { ButtonVariant } from "./ui/Button/Button.types";
export { variantStyles } from "./ui/Button/Button";
```

### **❌ Missing Index.ts Files:**

```typescript
// ❌ BAD: Missing index.ts files
// types/ folder exists but no types/index.ts
// hooks/ folder exists but no hooks/index.ts
```

---

## 🎯 Best Practices

1. **Be consistent** - Use the same export pattern throughout the file
2. **Group exports** - Organize exports by category and type
3. **Use clear names** - Make export names easy to understand
4. **Follow the rules** - Stick to the established export patterns
5. **Test exports** - Verify exports work by importing them elsewhere

---

## 📚 Related Documentation

- [Import Patterns Guide](./import-patterns-guide.md)
- [Component Building Guide](./component-building-guide.md)
- [Component Organization Guide](./component-organization-guide.md)

---

_This documentation is maintained by the development team. Update when export patterns change._
