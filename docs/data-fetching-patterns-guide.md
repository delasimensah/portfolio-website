# 🔄 Data Fetching Patterns Guide

> **Purpose**: Complete guide for data fetching patterns, wrapper hooks, composite hooks, and component usage.

## 🎯 Overview

This guide explains how data fetching works in the monorepo, including:

- **Wrapper Hooks Pattern** - Platform-specific hooks that inject `supabaseClient`
- **Composite Hooks Pattern** - Shared hooks that combine multiple data sources
- **Component Usage Patterns** - How screens/pages and sections consume data
- **React Query Caching** - How caching prevents duplicate requests
- **Decision Tree** - When to use which pattern

---

## 📐 Architecture Overview

### **Three-Layer Architecture**

```
┌─────────────────────────────────────────┐
│  Components (Screens, Pages, Sections)  │
│  Use wrapper hooks from apps/*/hooks/   │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Wrapper Hooks (apps/*/hooks/supabase/)      │
│  Inject supabaseClient into shared hooks│
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Shared Hooks (shared)        │
│  Use React Query + require supabaseClient│
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Service Functions (shared)   │
│  Make Supabase queries via supabaseClient│
└─────────────────────────────────────────┘
```

### **Key Concepts**

1. **Shared Hooks** (`shared`): Platform-agnostic hooks that require `supabaseClient`
2. **Wrapper Hooks** (`apps/*/hooks/supabase/`): Platform-specific hooks that inject `supabaseClient`
3. **Composite Hooks**: Shared hooks that combine multiple data fetches
4. **Component Usage**: Screens/pages and sections consume wrapper hooks

---

## 🔌 Wrapper Hooks Pattern

### **What Are Wrapper Hooks?**

Wrapper hooks are platform-specific hooks in each app that inject the platform's `supabaseClient` into shared hooks from `shared`.

### **Why Do We Need Them?**

- Shared hooks require `supabaseClient` as a parameter
- Each app has its own `supabaseClient` instance (different session storage, error handling)
- Wrapper hooks hide the `supabaseClient` dependency from components
- Components don't need to know about `supabaseClient` - they just call the hook

### **Standard Structure**

```typescript
// apps/mobile-app/hooks/supabase/useDashboardData.ts
import { useDashboardData as useSharedDashboardData } from "shared";
import { supabase } from "@/services/supabase/client";

export const useDashboardData = () => {
  return useSharedDashboardData({ supabaseClient: supabase });
};
```

```typescript
// apps/web-app/hooks/supabase/useDashboardData.ts
// Same structure!
import { useDashboardData as useSharedDashboardData } from "shared";
import { supabase } from "@/services/supabase/client";

export const useDashboardData = () => {
  return useSharedDashboardData({ supabaseClient: supabase });
};
```

### **When to Create Wrapper Hooks**

✅ **DO Create Wrapper Hooks When:**

- Using a new shared hook from `shared` that requires `supabaseClient`
- The hook doesn't have a wrapper yet in your app
- You need to customize options or add app-specific logic

❌ **DON'T Create Wrapper Hooks When:**

- A wrapper already exists (check `apps/*/hooks/supabase/`)
- The hook is app-specific (not from `shared`)
- You're directly calling service functions (not using hooks)

### **Examples of Wrapper Hooks**

**Simple Wrapper** (most common):

```typescript
// apps/mobile-app/hooks/supabase/useUsers.ts
import { useUsers as useSharedUsers } from "shared";
import { supabase } from "@/services/supabase/client";

export const useUsers = () => {
  return useSharedUsers({ supabaseClient: supabase });
};
```

**Wrapper with Parameters**:

```typescript
// apps/mobile-app/hooks/supabase/useProfileData.ts
import { useProfileData as useSharedProfileData } from "shared";
import { supabase } from "@/services/supabase/client";

interface UseProfileDataArgs {
  userId: string;
}

export const useProfileData = ({ userId }: UseProfileDataArgs) => {
  return useSharedProfileData({ supabaseClient: supabase, userId });
};
```

---

## 🧩 Composite Hooks Pattern

### **What Are Composite Hooks?**

Composite hooks are shared hooks that combine multiple related data fetches into a single hook. They fetch multiple queries in parallel using React Query.

### **Why Use Composite Hooks?**

1. **Single Source of Truth** - One hook provides all related data
2. **Efficient Loading States** - Aggregated `isLoadingContent` flag
3. **Parallel Fetching** - React Query fetches all endpoints simultaneously
4. **Consistent Caching** - All data shares the same cache strategy
5. **Simplified Components** - Components don't need to manage multiple hooks

### **Example: `useDashboardData`**

```typescript
// packages/shared/src/hooks/supabase/dashboard.ts
export const useDashboardData = ({
  supabaseClient,
  options,
}: UseDashboardDataArgs) => {
  // All hooks run in parallel
  const { data: featuredItems = [], isLoading: isLoadingFeatured } =
    useFeaturedItems({ supabaseClient, options });
  const { data: recentItems = [], isLoading: isLoadingRecent } = useRecentItems(
    { supabaseClient, options }
  );
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories({ supabaseClient, options });

  // Aggregate loading state
  const isLoadingContent =
    isLoadingFeatured || isLoadingRecent || isLoadingCategories;

  // Return unified data
  return {
    featuredItems,
    recentItems,
    categories,
    isLoadingContent,
  };
};
```

---

## 🎨 Component Usage Patterns

### **Pattern 1: Screen/Page Level**

Screens and pages use composite hooks for:

- Loading state management (show skeleton)
- Rendering child sections

```typescript
// apps/mobile-app/components/screens/dashboard/DashboardScreen/DashboardScreen.tsx
const DashboardScreen: React.FC = () => {
  // Use wrapper hook (not shared hook directly)
  const { isLoadingContent } = useDashboardData();

  if (isLoadingContent) {
    return <DashboardScreenSkeleton />;
  }

  return (
    <ScrollView>
      <HeroSection />
      <RecentSection />
    </ScrollView>
  );
};
```

### **Pattern 2: Section Level**

Section components also call the same hook to access their specific data:

```typescript
// apps/mobile-app/components/dashboard/HeroSection/HeroSection.tsx
const HeroSection: React.FC = () => {
  // Same hook as parent - React Query cache prevents duplicate requests!
  const { featuredItems = [] } = useDashboardData();

  return (
    <View>
      <Text>Featured</Text>
      {/* Render featuredItems */}
    </View>
  );
};
```

### **Why This Works: React Query Caching**

When multiple components call the same hook with the same parameters:

1. **First Call**: React Query fetches data and stores it in cache
2. **Subsequent Calls**: React Query returns cached data instantly (no network request)
3. **Automatic Deduplication**: React Query deduplicates identical requests

---

## 🔄 React Query Caching Behavior

### **How Cache Keys Work**

React Query uses `queryKey` to identify cached data:

```typescript
// packages/shared/src/hooks/supabase/items.ts
export const useFeaturedItems = ({ supabaseClient, options }) => {
  return useQuery({
    queryKey: ["items", "featured"], // Cache key
    queryFn: () => getFeaturedItems(supabaseClient),
    ...options,
  });
};
```

### **Service Function Pattern**

Service functions make Supabase queries:

```typescript
// packages/shared/src/services/items.ts
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Item } from "../../types";

export const getFeaturedItems = async (
  supabaseClient: SupabaseClient
): Promise<Item[]> => {
  const { data, error } = await supabaseClient
    .from("items")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
```

### **Cache Sharing Rules**

- ✅ **Same `queryKey`** = Same cache entry (data shared)
- ✅ **Same parameters** = Same cache entry (data shared)
- ❌ **Different parameters** = Different cache entries

---

## 🤔 Decision Tree

### **When to Use Composite Hooks vs Individual Hooks**

```
Need multiple related data sources?
│
├─ YES → Use composite hook (useDashboardData, useProfileData)
│        │
│        └─ Components call same hook, React Query caches efficiently
│
└─ NO → Use individual hook (useUsers, useCategories)
        │
        └─ Single data source, no need to combine
```

### **When to Create Wrapper Hooks**

```
Using shared hook from shared?
│
├─ Wrapper exists? → Use existing wrapper
│
└─ No wrapper? → Create wrapper in apps/*/hooks/supabase/
                 │
                 └─ Follow standard structure (inject supabaseClient)
```

---

## ✅ Best Practices

### **DO:**

- ✅ Use wrapper hooks in components (never call shared hooks directly with `supabaseClient`)
- ✅ Use composite hooks for related data
- ✅ Let sections call the same hook as parent (React Query caches efficiently)
- ✅ Create wrapper hooks for all shared hooks you use
- ✅ Use service functions for Supabase queries (don't query directly in hooks)

### **DON'T:**

- ❌ Call shared hooks directly with `supabaseClient` in components
- ❌ Create individual hooks when composite hooks exist
- ❌ Pass data as props unnecessarily (let React Query cache handle it)
- ❌ Create duplicate wrapper hooks (check if one exists first)
- ❌ Make Supabase queries directly in hooks (use service functions instead)

---

## 📚 Related Documentation

- [Supabase Integration Patterns](./supabase-integration-patterns.md) - Supabase client setup and data fetching examples
- [Shared Package README](../packages/shared/README.md) - Shared package overview
- [React Query Documentation](https://tanstack.com/query/latest) - Official React Query docs

---

_This guide is maintained by the development team. Update when data fetching patterns change._
