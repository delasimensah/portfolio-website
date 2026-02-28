# 🎯 Developer Decision Guide

> **Purpose**: Quick reference for making consistent development decisions.

## 🚀 Quick Start - Common Tasks

### **Adding a New Page**

1. Create page file in appropriate route group:
   - `app/(auth)/page-name/page.tsx` - Auth pages
   - `app/(onboarding)/page-name/page.tsx` - Onboarding pages
   - `app/(main-app)/page-name/page.tsx` - Main app pages

2. Navigate to it:
   ```tsx
   router.push("/page-name");
   ```

### **Adding a New Component**

1. Check existing components first
2. Decide where it goes (see decision trees below)
3. Create component structure:

   ```
   components/[category]/ComponentName/
   ├── ComponentName.tsx        # All types inline
   └── ComponentName.test.tsx   # Tests (REQUIRED)
   ```

4. Export from components/index.ts:

   ```typescript
   export { default as ComponentName } from "./[category]/ComponentName/ComponentName";
   ```

5. Use in pages:
   ```tsx
   import { ComponentName } from "@/components";
   ```

**IMPORTANT:**

- ALWAYS check existing components first
- Read `docs/component-building-guide.md` — use built-in components (e.g. `Heading` for page/section/subsection/card titles) instead of raw Mantine primitives
- Build by composing existing components
- Use Tailwind classes for styling
- Export from `components/index.ts`

---

### **Adding a New Hook**

1. Create hook file:

   ```
   hooks/[category]/useHookName.ts
   ```

2. Export from hooks/index.ts:
   ```typescript
   export { useHookName } from "./[category]/useHookName";
   ```

**Export Rules:**

- Use **named exports** for hooks: `export const useHookName = () => { ... }`

---

### **Adding a New Service**

1. Create service file in appropriate category:

   ```
   services/auth/authService.ts
   services/api/userService.ts
   ```

2. Group related functions in a single file
3. Use named exports for each function:

   ```typescript
   export const signIn = async (data) => { ... };
   export const signOut = async () => { ... };
   ```

4. Export from services/index.ts:
   ```typescript
   export { signIn, signOut } from "./auth/authService";
   ```

---

### **Adding a New Utility**

1. Create utility file:

   ```
   utils/utilityName.ts
   ```

2. Export from utils/index.ts:
   ```typescript
   export { default as utilityName } from "./utilityName";
   ```

**Export Rules:**

- Use **default exports** for utilities: `export default utilityFunction`

---

## 🌳 Decision Trees

### **Where Should I Put This Component?**

```
What user need does this serve?
├── Complete user journey? → Feature component
├── UI element used everywhere? → components/ui/
├── Business logic used across features? → components/shared/
└── Page-specific logic? → Keep inline in page

When to extract from page:
├── Component > 50 lines?
├── Used in multiple pages?
├── Has distinct responsibility?
└── Will be reused?

THEN create: components/[feature]/ComponentName/
```

---

### **Where Should I Put This Hook?**

```
What type of hook is this?
├── Authentication-related → /hooks/auth/
├── API-related → /hooks/supabase/
├── UI state-related → /hooks/ui/
└── Shared utility → /hooks/shared/
```

---

### **Where Should I Put This Type?**

```
Is this type used in multiple files?
├── YES → Extract to types/ folder
└── NO → Keep with component

Is this type a business domain type?
├── YES → Extract to types/ folder
└── NO → Keep with component

Is this type complex (>10 lines)?
├── YES → Consider extracting
└── NO → Keep inline

Examples:
├── Component props → Keep inline
├── Component variants → Extract to ComponentName.types.ts
├── User, API, Business types → Extract to types/
```

---

## 📋 Quick Reference Tables

### **Component Placement**

- **Basic UI** — `/components/ui/` (e.g. Button, Heading, Input, Modal, Card)
- **Navigation** — `/components/navigation/` (e.g. Header, Sidebar, Breadcrumbs)
- **Shared Business** — `/components/shared/` (e.g. Profile, ProductCard)
- **Feature-specific** — `/components/[feature]/` (e.g. DashboardHeader, FilterBar)

### **Hook Placement**

- **Authentication** — `/hooks/auth/` (e.g. useAuth, useLogin)
- **API** — `/hooks/supabase/` (e.g. useUser, useData)
- **UI State** — `/hooks/ui/` (e.g. useModal, useToast)

---

## 📦 Import Patterns

### **Page Imports**

```tsx
// ✅ ALWAYS use @ notation for pages
import { Button, Text } from "@/components";
import { User } from "@/types";
import { COLORS } from "@/constants";
import { supabase } from "@/services";
import { useAuthStore } from "@/hooks";
import { cn } from "@/utils";
```

### **Component Internal Imports**

```tsx
// ✅ Use relative paths for same-folder
import { ButtonVariant } from "./Button.types";
import Text from "../Text/Text";

// ✅ Use @ notation for cross-folder
import { User } from "@/types";
import { COLORS } from "@/constants";
```

---

## 🛠️ Troubleshooting

### **"Where should this component go?"**

1. Ask: "What user need does this serve?"
2. Use the decision tree above
3. Default to `components/shared/` if unsure

### **"Import not working?"**

1. Check component is exported from main index
2. Verify using `export default` in component
3. Import from `@/components` not specific paths

---

## 📚 Related Documentation

- [Component Building Guide](../../../docs/component-building-guide.md)
- [Navigation Guide](./navigation-guide.md)
- [Import Patterns Guide](../../../docs/import-patterns-guide.md)
- [Type Organization Guide](../../../docs/type-organization-guide.md)

---

_Use this guide to make consistent decisions quickly. When in doubt, follow the decision trees!_
