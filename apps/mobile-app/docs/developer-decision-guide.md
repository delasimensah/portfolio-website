# 🎯 Developer Decision Guide

> **Purpose**: Quick reference for making consistent development decisions.

## 🚀 Quick Start - Common Tasks

### **Adding a New Screen**

```
1. Determine screen type (auth, onboarding, tab stack, modal, etc.)
2. Create screen file in appropriate location:
   app/(auth)/screen-name.tsx           # Auth screens
   app/(onboarding)/screen-name.tsx     # Onboarding screens
   app/(main-app)/(tabs)/[tab]/screen-name.tsx  # Tab stack screens

3. Register in corresponding _layout.tsx:
   <Stack.Screen
     name="screen-name"
     options={{ title: "Screen Title" }}
   />

4. Navigate to screen:
   router.push("/screen-name");

For detailed instructions, see the Adding Screens Guide:
> 📋 [Adding Screens Guide](./adding-screens-guide.md)
```

### **Adding a New Component**

```
1. Check if existing components can be used or extended
2. Check Android compatibility - will this work on both platforms?
3. Decide where it goes (see decision trees below)
4. Create component structure:
   components/[category]/ComponentName/
   ├── ComponentName.tsx               # All types inline
   └── ComponentName.test.tsx          # REQUIRED - Must have tests

5. Export from main index:
   export { default as ComponentName } from "./[category]/ComponentName/ComponentName";

6. Use in screens:
   import { ComponentName } from "@/components";

IMPORTANT:
- ALWAYS check existing components first
- Build by composing existing components when possible
- ALL components MUST work on Android (check platform-specific issues)
- Use Tailwind classes for styling (ALWAYS, unless impossible)
- ALL components MUST be in folders (ComponentName/ not ComponentName.tsx)
- ALL components MUST have tests (ComponentName.test.tsx)
- Export from components/index.ts for proper imports

For detailed component building principles:
> 📋 [Component Building Guide](../../../docs/component-building-guide.md)
```

### **Adding a New Hook**

```
1. Create hook file:
   hooks/[category]/useHookName.ts

2. Export from main index:
   export { useHookName } from "./[category]/useHookName";

**Export Rules:**
- **All hooks must be exported** from `hooks/index.ts`
- **Use named exports** for hooks
- **Group exports by category** (auth, api, navigation, etc.)
```

### **Adding a New Service**

```
1. Create service file in appropriate category:
   services/auth/authService.ts
   services/api/userService.ts

2. Group related functions in a single file:
   - Single responsibility: All auth functions in authService.ts
   - Named exports for individual functions
   - Co-locate related logic for maintainability

3. Export functions from services/index.ts:
   export {
     signInWithEmail,
     signOutUser,
   } from "./auth/authService";

4. Use in hooks/screens:
   import { signInWithEmail, signOutUser } from "@/services";

**Service Structure Rules:**
- **Group related functions** in single files (not one file per function)
- **Use named exports** for each function
- **Keep service files focused** on external API calls
- **Business logic** goes in hooks/stores, not services
- **Error handling** should throw errors, let callers handle them
- **Type safety** - All parameters and return values must be typed
```

### **Adding a New Utility**

```
1. Create utility file:
   utils/utilityName.ts

2. Export from main index:
   export { utilityFunction } from "./utilityName";

**Export Rules:**
- **All utilities must be exported** from `utils/index.ts`
- **Use named exports** for utilities
- **Never export internal helpers** or implementation details

3. Create test file:
   utils/__tests__/utilityName.test.ts

4. Use in components:
   import { utilityFunction } from "@/utils";

**Key Points:**
- **Flat structure** - All utils go directly in `/utils/` (no categories)
- **Descriptive naming** - Use clear, specific names
- **Single responsibility** - One utility file = one type of functionality
- **Must export from index** - All utils must be exported from `/utils/index.ts`
- **Must have tests** - All utils need tests in `/utils/__tests__/`
```

---

## 🌳 Decision Trees

### **Where Should I Put This Component?**

```
What user need does this serve?
├── Complete user journey with own data? → Feature
├── UI element used everywhere? → components/ui/
├── Business logic used across features? → components/shared/
├── Tool/utility function? → utils/
└── Screen-specific logic? → Keep inline in screen

When to extract from screen:
├── Component > 50 lines?
├── Used in multiple screens within same feature?
├── Has distinct responsibility?
└── Will likely be reused in that feature?

THEN create in appropriate category folder
```

### **Where Should I Put This Hook?**

```
What type of hook is this?
├── Authentication-related → /hooks/auth/
├── API-related → /hooks/supabase/
├── Navigation-related → /hooks/navigation/
└── Shared utility → /hooks/shared/
```

### **Where Should I Put This Service?**

```
What type of service is this?
├── API services → /services/api/
├── Supabase service → /services/supabase/
└── External service → /services/[serviceName]/
```

### **Where Should I Put This Type?**

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

Examples:
├── Component props → Keep inline with component
├── Component variants → Keep inline with component
├── User, API, Business types → Extract to types/
└── Shared utilities → Extract to types/
```

### **Where Should I Put This Constant?**

```
What type of constant is this?
├── Colors → /constants/colors.ts
├── Fonts → /constants/fonts.ts
├── Assets → /constants/assets.ts
└── Other utilities → /utils/
```

---

## 📋 Quick Reference Tables

### **Component Placement**

| Component Type   | Location                                   | Examples                                  |
| ---------------- | ------------------------------------------ | ----------------------------------------- |
| Basic UI         | `/components/ui/ComponentName/`            | Button, Input, Modal, Card                |
| Navigation       | `/components/navigation/ComponentName/`    | TabBar, Header, BackButton                |
| Feedback         | `/components/feedback/ComponentName/`      | Toast, Alert, ErrorBoundary               |
| Shared Business  | `/components/shared/ComponentName/`        | Profile, ItemList, ProductCard            |
| Feature-specific | `/components/[feature]/ComponentName/`     | DashboardHeader, FilterBar, ActionButtons |
| Bottom Sheets    | `/components/bottom-sheets/ComponentName/` | YesOrNoBottomSheet, MenuBottomSheet       |

### **Hook Placement**

| Hook Type      | Location             | Examples                     |
| -------------- | -------------------- | ---------------------------- |
| Authentication | `/hooks/auth/`       | useAuth, useLogin, useSignup |
| API            | `/hooks/supabase/`   | useUserData, useItemData     |
| Navigation     | `/hooks/navigation/` | useScreenContext             |
| Shared         | `/hooks/shared/`     | useDebounce, useLocalStorage |

### **Service Placement**

| Service Type | Location                   | Examples                         |
| ------------ | -------------------------- | -------------------------------- |
| API          | `/services/api/`           | authService, userService         |
| Supabase     | `/services/supabase/`      | client                           |
| External     | `/services/[serviceName]/` | analyticsService, paymentService |

### **Constant Placement**

| Constant Type | Location               | Examples                |
| ------------- | ---------------------- | ----------------------- |
| Colors        | `/constants/colors.ts` | COLORS                  |
| Fonts         | `/constants/fonts.ts`  | FONTS, FONT_LOADING_MAP |
| Assets        | `/constants/assets.ts` | ASSETS                  |

---

## 🎨 Naming Conventions

### **Files and Directories**

- **Components**: `PascalCase.tsx` (e.g., `MediaPlayer.tsx`)
- **Hooks**: `usePascalCase.ts` (e.g., `useMediaPlayer.ts`)
- **Services**: `camelCaseService.ts` (e.g., `authService.ts`)
- **Types**: `camelCase.ts` (e.g., `auth.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatTime.ts`)
- **Directories**: `camelCase/` (e.g., `mediaPlayer/`)

### **Component Names**

- **PascalCase** for component names
- **Descriptive names** (e.g., `ProductCard` not `Card`)
- **Consistent suffixes** (e.g., `Form`, `Modal`, `Button`)
- **Avoid abbreviations** (e.g., `MediaPlayer` not `MediaPlyr`)

### **Hook Names**

- **Start with `use`** (e.g., `useAuth`, `useMediaPlayer`)
- **Descriptive names** (e.g., `useProfile` not `useUser`)
- **Action-based names** (e.g., `useLogin`, `useSignup`)

### **Service Names**

- **End with `Service`** (e.g., `authService`, `userService`)
- **Descriptive names** (e.g., `profileService` not `userService`)
- **Domain-based names** (e.g., `paymentService`, `analyticsService`)

---

## 📦 Import Patterns

### **Component Imports**

**1. Within Same Folder - Use Relative Paths:**

```typescript
// ✅ GOOD: Component to component within same folder
import { ComponentVariant } from "./ComponentName.types";
import ComponentText from "../ComponentText/ComponentText";
```

**2. Cross-Folder Imports - Use @ Notation:**

```typescript
// ✅ GOOD: Screens import from root
import { Button, Input, Profile } from "@/components";

// ✅ GOOD: Components import types from types folder
import { User, ApiResponse } from "@/types";

// ✅ GOOD: Components import constants
import { COLORS, FONTS } from "@/constants";
```

**3. Never Import from Specific Paths in Screens:**

```typescript
// ❌ BAD: Screens never use relative paths
import Button from "../../../components/ui/Button/Button";
```

### **Hook Imports**

```typescript
// Main imports (preferred)
import { useAuth, useLogin } from "@/hooks";
```

### **Service Imports**

```typescript
// Main imports (preferred)
import { authService, userService } from "@/services";
```

### **Constant Imports**

```typescript
// Main imports (preferred)
import { COLORS, FONTS, ASSETS } from "@/constants";
```

---

## 🛠️ Troubleshooting

### **"I don't know where to put this component"**

1. Ask: "What user need does this serve?"
2. Use the decision tree above
3. Default to `components/shared/` if unsure

### **"Import not working"**

1. Check component is exported from main index
2. Verify using proper export pattern
3. **Screens**: Import from `@/components` not specific folders
4. **Components**: Use relative imports for internal dependencies

### **"Component doesn't fit any category"**

- Default to `components/shared/`
- Can always move later
- Better to have it somewhere than nowhere

---

## 📚 Related Documentation

- [Component Building Guide](../../../docs/component-building-guide.md) - Building reusable components
- [Adding Screens Guide](./adding-screens-guide.md) - Step-by-step guide for adding screens
- [Component Organization Guide](../../../docs/component-organization-guide.md) - Detailed component organization
- [Testing Strategy](../../../docs/testing-strategy.md) - Testing approach

---

_Use this guide to make consistent decisions quickly. When in doubt, follow the decision trees and reference tables above._
