# 🏗️ Component Organization Guide

> **Purpose**: Clear, practical guide for organizing components in monorepo applications (mobile and web).

## 🚀 Quick Start

### **Most Common Scenarios:**

**Adding a new UI component used everywhere:**

```
components/ui/Button/
├── Button.tsx
└── Button.test.tsx

Export from components/index.ts:
export { default as Button } from "./ui/Button/Button";
```

**Adding a component used in multiple features:**

```
components/shared/Card/
├── Card.tsx
└── Card.test.tsx

Export from components/index.ts:
export { default as Card } from "./shared/Card/Card";
```

**Adding a feature-specific component:**

```
components/dashboard/HeroSection/
├── HeroSection.tsx
└── HeroSection.test.tsx

Export from components/index.ts:
export { default as HeroSection } from "./dashboard/HeroSection/HeroSection";
```

**Adding a screen component:**

**Mobile (Screen suffix):**

```
components/screens/dashboard/DashboardScreen/
├── DashboardScreen.tsx
└── DashboardScreen.test.tsx

Export from components/index.ts:
export { default as DashboardScreen } from "./screens/dashboard/DashboardScreen/DashboardScreen";
```

**Web (Page suffix):**

```
components/pages/DashboardPage/
├── DashboardPage.tsx
└── DashboardPage.test.tsx

Export from components/index.ts:
export { default as DashboardPage } from "./pages/DashboardPage/DashboardPage";
```

---

## 🌳 Decision Tree

```
Step 1: What is this component?
├── Full screen/page? → Mobile: components/screens/[stack]/ | Web: components/pages/
├── Loading skeleton? → Colocate with corresponding component
├── Bottom sheet/modal? → components/bottom-sheets/
├── Navigation element? → components/navigation/
├── Feedback/notification? → components/feedback/
├── Auth-specific? → components/auth/
├── UI building block? → components/ui/
└── Continue to Step 2...

Step 2: Where is it used?
├── Specific domain (user, product, etc.)?
│   └── Has 3+ related components? → components/[domain]/
│   └── Fewer than 3? → components/shared/
├── Used across multiple features? → components/shared/
├── Used in one feature only? → components/[feature]/
└── Tool/utility function? → utils/
```

---

## 📁 Component Categories

### **Screens/Pages**

**For:** Full screen/page components that represent complete views

**Platform-Specific Organization:**

- **Mobile**: `components/screens/[stack]/` - Stack-specific screens organized by navigation stack
- **Web**: `components/pages/` - Flat structure, all pages directly in `pages/` folder

**Naming Convention:**

- **Mobile**: Use `Screen` suffix (e.g., `DashboardScreen`, `SignInScreen`)
- **Web**: Use `Page` suffix (e.g., `DashboardPage`, `SignInPage`)

### **UI Components** (`components/ui/`)

**For:** Basic building blocks used everywhere across the app
**Examples:** `Button`, `Input`, `Text`, `Stack`, `Avatar`

**Characteristics:**

- Generic, reusable UI elements
- No business logic
- Used in multiple features
- Highly reusable

### **Navigation** (`components/navigation/`)

**For:** Navigation-related components (headers, drawers, tabs)
**Examples:** `AppHeader`, `DrawerHeader`, `TabBar`

### **Bottom Sheets** (`components/bottom-sheets/`)

**For:** Bottom sheet modal components (mobile-specific)
**Examples:** `MenuBottomSheet`, `ActionBottomSheet`

### **Feedback** (`components/feedback/`)

**For:** User feedback and notifications
**Examples:** `Toast`, `Alert`, `ErrorBoundary`

### **Auth** (`components/auth/`)

**For:** Authentication-specific components
**Examples:** `SocialButton`, `AuthForm`

### **Domain-Specific** (`components/[domain]/`)

**For:** Components specific to a business domain, used across features
**Examples:** `components/profile/`, `components/product-card/`

**Note:** Create a domain folder when you have 3+ related components that form a cohesive set.

### **Shared Business** (`components/shared/`)

**For:** Business logic components used across multiple features
**Examples:** `ProfileCard`, `ProductCard`, `ListItem`

### **Feature Components** (`components/[feature]/`)

**For:** Components used primarily within one feature
**Examples:** `components/dashboard/HeroSection`, `components/browse/FilterBar`

---

## 📝 File Structure

### **Component Directory:**

```
ComponentName/
├── ComponentName.tsx        # Main component (includes all types inline)
└── ComponentName.test.tsx   # Tests (REQUIRED)

# If component has a skeleton:
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
└── ComponentNameSkeleton.tsx  # Colocated skeleton (no test needed)

IMPORTANT:
- ALL components MUST be in folders (not loose files)
- ALL components MUST have tests
- Skeletons are colocated with their components
- No index.ts files in component folders
- All types stay with component (inline)
- No separate .types.ts files
```

### **Naming Rules:**

- **Components:** `PascalCase.tsx`
- **Tests:** `ComponentName.test.tsx`
- **Descriptive names:** `ProfileCard` not `Card`
- **Consistent suffixes:** `Form`, `Modal`, `Button`
- **Screen/Page Components:**
  - **Mobile**: Use `Screen` suffix (e.g., `DashboardScreen`)
  - **Web**: Use `Page` suffix (e.g., `DashboardPage`)

---

## 📦 Import/Export Pattern

### **Index.ts Files - Public API:**

**All top-level folders must have index.ts files that export their public API:**

```typescript
// ✅ GOOD: components/index.ts
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";
export { default as DashboardScreen } from "./screens/dashboard/DashboardScreen/DashboardScreen";
export { default as DashboardPage } from "./pages/DashboardPage/DashboardPage";
export { default as ProfileCard } from "./shared/ProfileCard/ProfileCard";
```

### **Export Rules:**

1. **All Public APIs Must Be Exported** - Export all reusable components
2. **Use Consistent Export Patterns** - Default exports for components
3. **Group Exports by Category** - Organize by UI, screens, shared, etc.
4. **Never Export Internal Implementation Details** - Only export public API

### **Required Index.ts Files:**

1. **`components/index.ts`** - Export all reusable components
2. **`types/index.ts`** - Export all shared types
3. **`constants/index.ts`** - Export all constants
4. **`utils/index.ts`** - Export all utility functions
5. **`hooks/index.ts`** - Export all custom hooks
6. **`services/index.ts`** - Export all services

---

## 🛠️ Troubleshooting

### **"Where should this component go?"**

1. **Is it a full screen?** → Mobile: `components/screens/[stack]/` | Web: `components/pages/`
2. **Is it a UI building block?** → `components/ui/`
3. **Is it navigation-related?** → `components/navigation/`
4. **Is it feedback/notification?** → `components/feedback/`
5. **Is it auth-specific?** → `components/auth/`
6. **Is it domain-specific with 3+ related components?** → `components/[domain]/`
7. **Used across multiple features?** → `components/shared/`
8. **Used in one feature?** → `components/[feature]/`

### **"Should I extract from screen?"**

**Extract if:**

- Component > 50 lines
- Used in multiple screens within feature
- Has distinct responsibility
- Will be reused

### **"Import not working?"**

**Check:**

- Component exported from `components/index.ts`
- Using `export default` in component
- **Screens**: Importing from `@/components` (not specific paths)
- **Components**: Using relative imports for internal dependencies

---

## 📊 Component Category Quick Reference

- **Screens/Pages** — Path: Mobile `screens/[stack]/`, Web `pages/` (flat). Use case: full screen/page components. Example: Mobile `DashboardScreen`, Web `DashboardPage`
- **UI** — Path: `ui/`. Use case: basic building blocks. Example: `Button`, `Input`, `Text`
- **Navigation** — Path: `navigation/`. Use case: navigation components. Example: `AppHeader`, `TabBar`
- **Bottom Sheets** — Path: `bottom-sheets/`. Use case: bottom sheet modals. Example: `MenuBottomSheet`
- **Feedback** — Path: `feedback/`. Use case: user notifications. Example: `Toast`, `Alert`
- **Auth** — Path: `auth/`. Use case: auth-specific components. Example: `SocialButton`
- **Domain** — Path: `[domain]/`. Use case: domain-specific (3+ components). Example: `profile/`
- **Shared** — Path: `shared/`. Use case: cross-feature business. Example: `ProfileCard`, `ProductCard`
- **Feature** — Path: `[feature]/`. Use case: feature-specific components. Example: `dashboard/HeroSection`

---

_Keep components organized, imports simple, and decisions clear. When in doubt, use the decision tree!_
