# 🚀 Quick Reference Cheat Sheet

> **Purpose**: Daily reference for common development tasks in the web app.

## 📋 Component Creation Checklist

### **Step-by-Step Component Creation**

1. **Check existing components first** - Can you reuse or extend existing ones?
2. **Create component directory** - `components/[category]/ComponentName/`
3. **Create component file** - `ComponentName.tsx`
4. **Add TypeScript types** - `ComponentName.types.ts` (if needed)
5. **Export from index.ts** - Add to `components/index.ts`
6. **Test the export** - Import elsewhere to verify

### **Component Template**

**Standard Component:**

```tsx
import React from "react";

interface ComponentNameProps {
  title: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onClick,
  variant = "primary",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

**Generic Component (without React.FC):**

```tsx
import React from "react";

interface ListContainerProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
}

const ListContainer = <T extends { id: string | number }>({
  data,
  renderItem,
}: ListContainerProps<T>): React.ReactElement => {
  return (
    <div>
      {data.map((item) => (
        <div key={String(item.id)}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default ListContainer;
```

---

## 📦 Import/Export Quick Reference

### **Import Rules**

```tsx
// ✅ Within same folder - use relative paths
import { ComponentVariant } from "./ComponentName.types";
import Button from "../Button/Button";

// ✅ Cross-folder imports - use @ notation
import { Button, Text } from "@/components";
import { User } from "@/types";
import { COLORS } from "@/constants";
import { supabase } from "@/services";
import { useAuthStore } from "@/hooks";
import { cn } from "@/utils";
```

### **Export Rules**

```tsx
// ✅ Components - default exports
export default ComponentName;

// ✅ Components/index.ts
export { default as ComponentName } from "./ui/ComponentName/ComponentName";

// ✅ Hooks - named exports
export const useCustomHook = () => { ... };

// ✅ Services - named exports
export const serviceFunction = async () => { ... };

// ✅ Utils - default exports
export default utilityFunction;

// ✅ Types - named exports
export interface TypeName { ... }
```

---

## 🧭 Navigation Quick Reference

### **Common Navigation Patterns**

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

// Navigate to pages (replace page names with your actual pages)
router.push("/sign-in");
router.push("/sign-up");
router.push("/page1");
router.push("/page2");
router.push("/page3");
router.push("/profile");

// Replace current page (no back button)
router.replace("/sign-in");

// Go back
router.back();
```

### **Route URLs**

| Page       | File Path                              | URL           |
| ---------- | -------------------------------------- | ------------- |
| Sign In    | `app/(auth)/sign-in/page.tsx`          | `/sign-in`    |
| Sign Up    | `app/(auth)/sign-up/page.tsx`          | `/sign-up`    |
| Onboarding | `app/(onboarding)/onboarding/page.tsx` | `/onboarding` |
| Page 1     | `app/(main-app)/page1/page.tsx`        | `/page1`      |

**Note:** Replace `page1` with your actual page name.

---

## 💻 Common Commands

### **Development**

```bash
yarn dev                    # Start development server
```

### **Code Quality**

```bash
yarn lint                  # Check for ESLint issues
yarn lint:fix              # Auto-fix ESLint issues
yarn format                # Format all files with Prettier
yarn format:check          # Check if files are formatted
yarn type-check            # Check TypeScript types
```

### **Building**

```bash
yarn build                 # Build for production
yarn start                 # Start production server
```

---

## 🔧 Troubleshooting Quick Fixes

### **TypeScript Errors in IDE**

1. Press `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Reload window

### **Build Errors**

```bash
# Clear Next.js cache
rm -rf .next
yarn build
```

### **Import Not Working**

1. Check component is exported from `components/index.ts`
2. Verify using `export default` in component
3. Import from `@/components` not specific paths

---

## 📚 Quick Links

### **Essential Documentation**

- [Component Building Guide](../../../docs/component-building-guide.md) - How to build components
- [Import Patterns Guide](../../../docs/import-patterns-guide.md) - Import/export rules
- [Navigation Guide](./navigation-guide.md) - Routing and navigation
- [Type Organization Guide](../../../docs/type-organization-guide.md) - TypeScript patterns

---

_This cheat sheet is your daily companion for web app development. Bookmark it!_
