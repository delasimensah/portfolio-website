# 📦 Shared Package

> **Shared code package for mobile and web applications**

## 🎯 Overview

The `shared` package contains code shared between the mobile (React Native/Expo) and web (Next.js) applications. This package allows both apps to use the same types, utilities, and Supabase logic, ensuring consistency and reducing duplication.

---

## 📁 Package Structure

```
packages/shared/
├── src/
│   ├── services/         # Supabase services
│   │   └── supabase/     # Supabase service functions
│   │       ├── auth.ts        # Authentication helpers
│   │       ├── users.ts       # User data fetching
│   │       └── index.ts       # Barrel exports
│   ├── hooks/            # Shared React Query hooks
│   │   └── supabase/     # Supabase data fetching hooks
│   │       ├── users.ts       # User hooks
│   │       └── index.ts       # Barrel exports
│   ├── types/            # TypeScript type definitions
│   │   ├── database.ts   # Supabase database types (generated)
│   │   └── index.ts      # Type exports
│   ├── utils/            # Shared utility functions
│   │   ├── cn.ts              # className utility
│   │   ├── authErrors.ts      # Auth error handling
│   │   ├── formatText.ts      # Text formatting
│   │   ├── date.ts            # Date utilities
│   │   ├── validation.ts      # Validation helpers
│   │   └── index.ts           # Barrel exports
│   ├── constants/         # Shared constants
│   │   ├── colors.ts          # Color definitions
│   │   └── index.ts           # Barrel exports
│   └── index.ts          # Main exports
├── docs/
│   └── supabase-types-guide.md  # Guide for Supabase types
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Importing from Shared Package

```typescript
// Import types
import type { Database } from "shared";

// Import Supabase services
import { signInWithEmail, getUserById } from "shared";

// Import hooks
import { useUserById, useUsers } from "shared";

// Import utilities
import { formatText, formatDate, isValidEmail } from "shared";
```

---

## 📖 Services

### Supabase Auth Services

Located in `src/services/supabase/auth.ts`:

- `getSession(client)` - Get current session
- `getCurrentUser(client)` - Get current user
- `signUpWithEmail(client, email, password, options?)` - Sign up
- `signInWithEmail(client, email, password)` - Sign in
- `verifyEmailOTP(client, email, token)` - Verify email OTP
- `resendVerificationCode(client, email)` - Resend verification
- `sendPasswordResetEmail(client, email, redirectUrl)` - Password reset
- `updateUserPassword(client, password)` - Update password
- `updateUserMetadata(client, metadata)` - Update metadata
- `signOutUser(client)` - Sign out

### Supabase OAuth Services

Located in `src/services/supabase/oauth.ts`:

**Web OAuth (redirect flow):**

- `signInWithGoogleWeb(client, redirectUrl)` - Sign in with Google (web)
- `signInWithAppleWeb(client, redirectUrl)` - Sign in with Apple (web)
- `signInWithGitHubWeb(client, redirectUrl)` - Sign in with GitHub (web)
- `signInWithOAuth(client, provider, redirectUrl, options?)` - Generic OAuth (web)

**Mobile OAuth (ID token flow):**

- `signInWithGoogleMobile(client, idToken)` - Sign in with Google (mobile)
- `signInWithAppleMobile(client, identityToken)` - Sign in with Apple (mobile)

### Supabase Data Services

Located in `src/services/supabase/users.ts`:

- `getUserById(client, userId)` - Get user by ID
- `getUsers(client, options?)` - Get all users (with pagination)
- `updateUser(client, userId, updates)` - Update user
- `createUser(client, userData)` - Create user

---

## 🎣 Hooks

### Supabase Data Hooks

Located in `src/hooks/supabase/users.ts`:

- `useUserById({ client, userId, options? })` - Fetch user by ID
- `useUsers({ client, options? })` - Fetch all users
- `useUpdateUser({ client, userId })` - Update user mutation
- `useCreateUser({ client })` - Create user mutation

**Usage Example**:

```typescript
"use client";

import { useUserById } from "shared";
import { createClient } from "@/services";

const MyComponent = () => {
  const supabase = createClient();
  const { data: user, isLoading } = useUserById({
    client: supabase,
    userId: "user-id-here",
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.email}</div>;
};
```

---

## 🛠️ Utilities

### Text Formatting

- `formatText(text, options?)` - Format text with optional truncation
- `formatDuration(seconds)` - Format seconds to MM:SS or HH:MM:SS
- `formatCountDisplay(count)` - Format numbers (1000 → "1K")
- `formatNumber(num)` - Alias for formatCountDisplay
- `formatTime(seconds)` - Format seconds to MM:SS

### Date Utilities

- `parseLocalDate(dateString)` - Parse date string as local date
- `formatDateString(dateString, formatStr?)` - Format date string
- `formatDate(date, formatStr?)` - Format Date object
- `getRelativeTime(date)` - Get relative time string ("2 hours ago")

### Validation

- `isValidEmail(email)` - Validate email address
- `validatePassword(password, minLength?)` - Validate password
- `isValidUrl(url)` - Validate URL
- `sanitizeString(input)` - Sanitize string input

### Auth Utilities

- `handleAuthError(error)` - Handle Supabase auth errors

---

## 📘 Types

### Database Types

The `Database` type is generated from your Supabase schema. See [docs/supabase-types-guide.md](./docs/supabase-types-guide.md) for details on generating and using these types.

**Example**:

```typescript
import type { Database } from "shared";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
```

---

## 🔄 Data Fetching Pattern

The shared package follows a three-layer architecture:

1. **Service Functions** (`services/supabase/`) - Direct Supabase queries
2. **Shared Hooks** (`hooks/supabase/`) - React Query hooks that accept `supabaseClient`
3. **Wrapper Hooks** (in apps) - Inject `supabaseClient` and export app-specific hooks

**Example**:

```typescript
// 1. Service function (shared)
export const getUserById = async (client, userId) => {
  const { data } = await client
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
};

// 2. Shared hook (shared)
export const useUserById = ({ client, userId }) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(client, userId),
  });
};

// 3. Wrapper hook (in app)
export const useUser = (userId: string) => {
  const supabase = createClient();
  return useUserById({ client: supabase, userId });
};
```

---

## 📚 Documentation

- [Supabase Types Guide](./docs/supabase-types-guide.md) - How to generate and use Supabase database types

---

## 🧪 Testing

```bash
# Run shared package tests
cd packages/shared
yarn test

# Or from root
yarn test # Runs all tests including shared
```

---

## 🛠️ Development

### Available Scripts

```bash
cd packages/shared

yarn lint          # Lint shared code
yarn type-check    # Type check shared code
yarn test          # Run tests
```

### Hot Reload

Changes to shared package are immediately available in both apps - no rebuild needed!

---

## 🤔 When to Add Code to Shared

### ✅ DO Add:

- Types used by both mobile and web
- Supabase service functions
- React Query hooks for data fetching
- Platform-agnostic utilities
- Validation helpers
- Formatting functions

### ❌ DON'T Add:

- UI components
- Platform-specific code (React Native or Web APIs)
- App-specific state management (Zustand stores)
- Navigation logic
- Feature-specific business rules
