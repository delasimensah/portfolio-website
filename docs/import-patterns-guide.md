# 📦 Import Patterns Guide

> **Purpose**: Comprehensive guide for import patterns to ensure consistency and clarity.

## 🚀 Quick Start

### **Import Rules:**

```tsx
// ✅ GOOD: Within same folder - use relative paths
import { ButtonVariant } from "./Button.types";
import Text from "../Text/Text";

// ✅ GOOD: Cross-folder imports - use @ notation
import { Button, Text, Stack } from "@/components";
import { User, ApiResponse } from "@/types";
```

---

## 📁 Import Categories

### **1. Within Same Folder - Use Relative Paths**

**When:** Importing from files in the same directory or subdirectories

```tsx
// ✅ GOOD: Same folder
import { ButtonVariant } from "./Button.types";

// ✅ GOOD: Parent folder
import Text from "../Text/Text";

// ✅ GOOD: Nested relative paths
import { Header } from "../../navigation/Header/Header";

// ❌ BAD: Don't use @ notation within same folder
import { ButtonVariant } from "@/components/ui/Button/Button.types";
```

### **2. Cross-Folder Imports - Use @ Notation**

**When:** Importing from different top-level folders

```tsx
// ✅ GOOD: Screens importing components
import { Button, Text, Stack } from "@/components";

// ✅ GOOD: Components importing types
import { User, ApiResponse } from "@/types";

// ✅ GOOD: Components importing constants
import { COLORS, FONTS } from "@/constants";

// ✅ GOOD: Importing from shared package
import { signInWithEmail, getUserById } from "shared";

// ❌ BAD: Don't use relative paths for cross-folder imports
import { Button } from "../../../components/ui/Button/Button";
```

---

## 🎯 Specific Use Cases

### **Screen Imports**

**Screens always use @ notation:**

```tsx
// ✅ GOOD: Screen importing components
import { Button, Text, Stack } from "@/components";

// ✅ GOOD: Screen importing types
import { User } from "@/types";

// ❌ BAD: Screens never use relative paths
import Button from "../../../components/ui/Button/Button";
```

### **Web Page Imports**

**Pages always use @ notation:**

```tsx
// ✅ GOOD: Web page importing components
import { Stack, Title, Text } from "@mantine/core";
import { Button } from "@/components";
import { User } from "@/types";

// ✅ GOOD: Next.js imports
import Image from "next/image";
import { useRouter } from "next/navigation";

// ❌ BAD: Web pages never use relative paths across folders
import Button from "../../../components/ui/Button/Button";
```

### **Component Internal Imports**

**Components use relative paths for internal imports:**

```tsx
// ✅ GOOD: Component importing from same folder
import { ButtonVariant } from "./Button.types";

// ✅ GOOD: Component importing from sibling components
import Text from "../Text/Text";

// ❌ BAD: Components don't use @ notation for internal imports
import { Text } from "@/components";
```

---

## 🔄 Import Best Practices

### **Consistent Import Patterns**

1. **Within same folder** - Use relative paths (`./` or `../`)
2. **Cross-folder imports** - Use `@/` notation
3. **Screens** - Always use `@/` notation
4. **Components** - Use relative paths for internal imports, `@/` for external
5. **Types** - Use `@/` notation when importing from `types/` folder
6. **Constants** - Use `@/` notation when importing from `constants/` folder

### **Import Ordering**

Group imports in this order:

```tsx
// 1. External dependencies
import React from "react";
import { useRouter } from "next/navigation";

// 2. Shared package imports
import { createApiClient } from "shared";

// 3. Internal @/ imports
import { Button, Text } from "@/components";
import { User } from "@/types";
import { COLORS } from "@/constants";

// 4. Relative imports
import { ButtonVariant } from "./Button.types";
import Text from "../Text/Text";
```

---

## 📋 Import Rules Summary

### **Use Relative Paths (`./` or `../`) When:**

1. **Same folder imports** - Component importing its types file
2. **Sibling component imports** - Component importing from other components
3. **Parent directory imports** - Component importing from parent directories

### **Use @ Notation (`@/`) When:**

1. **Cross-folder imports** - Importing from different top-level folders
2. **Screen imports** - Screens importing from any folder
3. **Shared types** - Importing from `types/` folder
4. **Constants** - Importing from `constants/` folder
5. **External dependencies** - Importing from other top-level folders

---

## 🎯 Decision Tree

```
Is this import within the same folder?
├── YES → Use relative paths (./ or ../)
└── NO → Continue to next question

Is this a cross-folder import?
├── YES → Use @ notation (@/components, @/types, @/constants)
└── NO → Use relative paths

Is this a screen importing?
├── YES → Always use @ notation
└── NO → Follow component rules
```

---

## ✅ Good Examples

**Component with organized imports:**

```tsx
// components/ui/Button/Button.tsx
import React from "react";
import { Pressable, PressableProps } from "react-native";

import { cn } from "@/utils";
import { ButtonVariant } from "./Button.types";
import Text from "../Text/Text";
```

**Screen with organized imports:**

```tsx
// app/(main-app)/(tabs)/tab1/index.tsx
import React from "react";

import { Button, Text, Stack } from "@/components";
import { User } from "@/types";
import { COLORS } from "@/constants";
```

---

## ❌ Bad Examples

**Component with incorrect imports:**

```tsx
// ❌ BAD: Using @ notation for internal imports
import { ButtonVariant } from "@/components/ui/Button/Button.types";
import { Text } from "@/components";

// ❌ BAD: Using relative paths for cross-folder imports
import { User } from "../../../types/user";
```

**Screen with incorrect imports:**

```tsx
// ❌ BAD: Using relative paths in screens
import Button from "../../../components/ui/Button/Button";
import { User } from "../../../types/user";
```

---

## 🚨 Common Anti-Patterns

### **❌ Mixing Import Patterns:**

```tsx
// ❌ BAD: Inconsistent import patterns
import { ButtonVariant } from "./Button.types"; // Relative
import { Text } from "@/components"; // @ notation
import { User } from "../../../types/user"; // Relative
```

### **❌ Over-using @ Notation:**

```tsx
// ❌ BAD: Using @ notation for internal imports
import { ButtonVariant } from "@/components/ui/Button/Button.types";
import Text from "@/components/ui/Text/Text";
```

---

## 📚 Related Documentation

- [Component Building Guide](./component-building-guide.md)
- [Component Organization Guide](./component-organization-guide.md)
- [Export Patterns Guide](./export-patterns-guide.md)

---

_This documentation is maintained by the development team. Update when import patterns change._
