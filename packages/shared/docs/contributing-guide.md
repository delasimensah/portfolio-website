# 🤝 Contributing to Shared Package

> **Purpose**: Guide for contributing code to the shared package that works across both mobile and web platforms.

## 📋 Table of Contents

- [When to Add Code](#when-to-add-code)
- [Adding New Code](#adding-new-code)
- [Testing Requirements](#testing-requirements)
- [Code Review Checklist](#code-review-checklist)
- [Breaking Changes](#breaking-changes)
- [Common Patterns](#common-patterns)

---

## When to Add Code

### **Decision Tree**

```
Is this code used by both mobile and web?
    ├─> YES → Go to shared
    └─> NO → Keep in app-specific folder

Is this platform-specific?
    ├─> YES → Don't add to shared
    └─> NO → Go to shared

Does this depend on React Native or Next.js?
    ├─> YES → Don't add to shared
    └─> NO → Go to shared

Does this use web-only or mobile-only APIs?
    ├─> YES → Don't add to shared
    └─> NO → Go to shared
```

### **✅ Add to Shared**

- **Types**: Shared interfaces, enums, type utilities
- **Utilities**: Pure functions, helpers that work everywhere
- **API Client**: Backend API functions
- **Constants**: Shared constants (API defaults, colors, etc.)
- **Transform Functions**: Data transformation utilities
- **Supabase Helpers**: Auth functions that work on both platforms
- **Schema Validation**: Zod schemas

### **❌ DON'T Add to Shared**

- UI components (platform-specific)
- Navigation logic (Expo Router vs Next.js)
- Platform-specific hooks (useRouter, useNavigation)
- Styling code (NativeWind vs Tailwind)
- Image components (expo-image vs next/image)
- Platform-specific APIs (window, document, AsyncStorage)
- Forms (platform-specific form libraries)

---

## Adding New Code

### **Step 1: Create File in Appropriate Directory**

Based on what you're adding:

```
packages/shared/src/
├── types/        # New types
├── utils/        # New utilities
├── api/          # New API functions
├── supabase/     # New Supabase helpers
├── constants/    # New constants
```

**Examples**:

- **Adding types**: `packages/shared/src/types/newTypes.ts`
- **Adding utility**: `packages/shared/src/utils/newUtility.ts`
- **Adding API function**: `packages/shared/src/api/newService.ts`
- **Adding constant**: `packages/shared/src/constants/newConstants.ts`

### **Step 2: Write Platform-Agnostic Code**

**DO:**

- Write TypeScript that works in any JS runtime
- Use only standard JavaScript/TypeScript APIs
- Import only from shared dependencies (axios, zod, @supabase, etc.)

**DON'T:**

- Import React Native components or APIs
- Import Next.js specific code
- Use platform-specific globals (window, document, etc.) without checks

### **Step 3: Add Tests**

**Create test file**: `packages/shared/src/utils/__tests__/newUtility.test.ts`

**Test Requirements**:

- Must pass on both platforms (use Jest, not React Native Testing Library or React Testing Library)
- Cover happy paths and error cases
- Test edge cases

**Example**:

```typescript
// packages/shared/src/utils/__tests__/newUtility.test.ts
import { newUtility } from "../newUtility";

describe("newUtility", () => {
  it("should handle valid input", () => {
    const result = newUtility("valid");
    expect(result).toBe("expected");
  });

  it("should handle edge case", () => {
    const result = newUtility("");
    expect(result).toBeNull();
  });
});
```

### **Step 4: Export from Index Files**

**Main Index**: `packages/shared/src/index.ts`

```typescript
// Export new utility
export { newUtility } from "./utils/newUtility";

// Export new type
export type { NewType } from "./types/newTypes";

// Export new API function
export { newApiFunction } from "./api/newService";
```

**Directory Index** (if exists): `packages/shared/src/utils/index.ts`

```typescript
export { newUtility } from "./newUtility";
```

### **Step 5: Document in README (If Significant)**

If the addition is significant or complex, add to `packages/shared/README.md`:

````markdown
## New Utility

Description of what newUtility does and when to use it.

```typescript
import { newUtility } from "@aria/shared";

const result = newUtility(input);
```
````

````

---

## Testing Requirements

### **What to Test**

**Utilities**:
- Happy paths
- Edge cases (null, undefined, empty strings)
- Error cases
- Type safety

**API Functions**:
- Mock apiClient
- Test request params
- Test response transformation
- Test error handling

**Transform Functions**:
- Input/output correctness
- Type transformations
- Handling missing/optional fields

### **Testing Best Practices**

**Use Jest** (not React Native Testing Library or React Testing Library):

```typescript
import { newUtility } from "../newUtility";

describe("newUtility", () => {
  it("should work correctly", () => {
    const result = newUtility("test");
    expect(result).toBe("expected");
  });
});
````

**Mock Dependencies**:

```typescript
import type { AxiosInstance } from "axios";

const mockApiClient = {
  get: jest.fn().mockResolvedValue({ data: [] }),
} as unknown as AxiosInstance;

test("newApiFunction", async () => {
  const result = await newApiFunction(mockApiClient);
  expect(mockApiClient.get).toHaveBeenCalledWith("/endpoint");
});
```

**Coverage**: Aim for >80% coverage on new code.

---

## Code Review Checklist

Before submitting PR, verify:

### **Code Quality**

- [ ] Code is platform-agnostic (no React Native or Next.js specific code)
- [ ] Proper TypeScript types (no `any` types)
- [ ] ESLint passing (`yarn lint`)
- [ ] Prettier formatting applied (`yarn format`)
- [ ] No console.logs or debug code
- [ ] No hardcoded values (use constants)

### **Testing**

- [ ] Tests included for all new code
- [ ] Tests pass (`yarn test`)
- [ ] Tests work on both platforms
- [ ] Coverage is adequate (>80%)

### **Exports**

- [ ] Exported from appropriate index.ts files
- [ ] Export names follow conventions (PascalCase for types, camelCase for functions)
- [ ] No internal implementation details exported

### **Documentation**

- [ ] JSDoc comments on public functions
- [ ] Complex logic has inline comments
- [ ] Added to README if significant addition
- [ ] Related documentation updated if needed

### **Shared Package Standards**

- [ ] No breaking changes (or documented if needed)
- [ ] Follows existing patterns in the package
- [ ] Uses shared dependencies only
- [ ] No circular dependencies

---

## Breaking Changes

### **What is a Breaking Change?**

- Removing exported functions or types
- Changing function signatures
- Changing return types
- Renaming exports
- Changing required parameters

### **How to Handle Breaking Changes**

**If Breakage is Necessary**:

1. **Document**: Add clear migration instructions in PR description
2. **Update**: Update all code that uses the changed code
3. **Remove Old**: Add deprecation notice before removal
4. **Coordinate**: Discuss with team before making breaking changes

**Migration Example**:

```typescript
// Before
export const oldFunction = (param: string) => {
  /* ... */
};

// After (with deprecation)
/**
 * @deprecated Use newFunction instead
 */
export const oldFunction = (param: string) => {
  /* ... */
};

export const newFunction = (param: number) => {
  /* ... */
};
```

---

## Common Patterns

### **Adding Types**

**File**: `packages/shared/src/types/newTypes.ts`

```typescript
export interface NewType {
  id: number;
  name: string;
  optional?: string;
}

export type Status = "active" | "inactive";

export type ApiResponse<T> = {
  data: T;
  status: number;
};
```

**Export**: `packages/shared/src/types/index.ts`

```typescript
export type { NewType, Status, ApiResponse } from "./newTypes";
```

**Use**: `import type { NewType } from "@aria/shared";`

### **Adding Utilities**

**File**: `packages/shared/src/utils/newUtility.ts`

```typescript
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
```

**Export**: `packages/shared/src/utils/index.ts`

```typescript
export { formatDate } from "./newUtility";
```

**Use**: `import { formatDate } from "@aria/shared";`

### **Adding API Functions**

**File**: `packages/shared/src/api/newService.ts`

```typescript
import type { AxiosInstance } from "axios";
import type { Artist } from "../types";

export const getCustomArtists = async (
  apiClient: AxiosInstance,
  limit: number = 10
): Promise<Artist[]> => {
  const response = await apiClient.get<ArtistResponse[]>(
    `/custom/artists?limit=${limit}`
  );
  return response.data.map(transformArtistResponse);
};
```

**Export**: `packages/shared/src/api/index.ts`

```typescript
export { getCustomArtists } from "./newService";
```

**Use**: `import { getCustomArtists } from "@aria/shared";`

### **Adding Supabase Helpers**

**File**: `packages/shared/src/supabase/newAuth.ts`

```typescript
import type { SupabaseClient } from "@supabase/supabase-js";

export const newAuthFunction = async (
  supabase: SupabaseClient,
  param: string
): Promise<boolean> => {
  // Platform-agnostic Supabase code
  const { error } = await supabase.from("table").insert({ data: param });
  return !error;
};
```

**Export**: `packages/shared/src/supabase/index.ts`

```typescript
export { newAuthFunction } from "./newAuth";
```

**Use**: `import { newAuthFunction } from "@aria/shared";`

### **Adding Constants**

**File**: `packages/shared/src/constants/newConstants.ts`

```typescript
export const NEW_CONSTANTS = {
  DEFAULT_VALUE: 10,
  MAX_VALUE: 100,
} as const;
```

**Export**: `packages/shared/src/constants/index.ts`

```typescript
export { NEW_CONSTANTS } from "./newConstants";
```

**Use**: `import { NEW_CONSTANTS } from "@aria/shared";`

---

## Examples

### **✅ Good Example: Adding a New Utility**

```typescript
// packages/shared/src/utils/capitalize.ts
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// packages/shared/src/utils/__tests__/capitalize.test.ts
import { capitalize } from "../capitalize";

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

// packages/shared/src/utils/index.ts
export { capitalize } from "./capitalize";

// Usage in mobile or web
import { capitalize } from "@aria/shared";
const result = capitalize("hello world");
```

### **❌ Bad Example: Adding Platform-Specific Code**

```typescript
// ❌ DON'T DO THIS - Platform-specific React Native code
import { View } from "react-native";

export const PlatformSpecificComponent = () => {
  return <View>...</View>;
};
```

### **✅ Good Example: Platform-Agnostic API Function**

```typescript
// packages/shared/src/api/podcastService.ts
import type { AxiosInstance } from "axios";

export const getPodcasts = async (
  apiClient: AxiosInstance
): Promise<Podcast[]> => {
  const response = await apiClient.get<PodcastResponse[]>("/podcasts");
  return response.data.map(transformPodcasts);
};
```

### **❌ Bad Example: Using Platform-Specific APIs**

```typescript
// ❌ DON'T DO THIS - Uses window API without checks
export const getScreenSize = () => {
  return window.innerWidth; // Only exists in browser
};
```

---

## Related Documentation

- [Shared Package README](../README.md) - Package overview
- [API Client Guide](./api-client-guide.md) - Using the API client
- [Component Building Guide](../../docs/component-building-guide.md) - Universal component patterns
- [Testing Strategy](../../docs/testing-strategy.md) - Testing approach

---

## Getting Help

**Questions?**

- Check existing code in shared package for examples
- Review tests for usage patterns
- Ask in team chat or during code review

**Found an Issue?**

- Create issue with reproduction steps
- Propose fix in PR
- Update documentation if needed

---

_This documentation is maintained by the development team. Update when contributing guidelines change._
