# 🔐 Supabase Integration Patterns

> **Purpose**: Guide for integrating Supabase authentication and data fetching in the monorepo.

## 🎯 Overview

This guide covers Supabase integration patterns for both mobile and web applications, including:

- Supabase client setup
- Authentication patterns
- Data fetching with Supabase
- React Query integration
- Platform-specific considerations

---

## 🔧 Supabase Client Setup

### **Mobile App**

```typescript
// apps/mobile-app/services/supabase/client.ts
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file and app.config.ts"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### **Web App**

```typescript
// apps/web-app/services/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
```

---

## 🔑 Automatic Token Management

### **How Supabase Handles Tokens**

When using Supabase for both authentication and data fetching, **tokens are handled automatically** - you never need to manually send tokens with requests.

### **What Happens Automatically**

1. **Session Creation**: When a user signs in, Supabase creates a session with a JWT access token
2. **Token Storage**: The token is automatically stored (AsyncStorage for mobile, cookies for web)
3. **Token Injection**: The Supabase client automatically includes the JWT in all requests
4. **Token Refresh**: Supabase automatically refreshes expired tokens
5. **RLS Enforcement**: Row Level Security policies automatically use the JWT to identify users

### **No Manual Token Handling Required**

```typescript
// ❌ DON'T: Manual token management (not needed!)
const token = await getToken();
const { data } = await supabase
  .from("users")
  .select("*")
  .headers({ Authorization: `Bearer ${token}` }); // Unnecessary!

// ✅ DO: Let Supabase handle it automatically
const { data } = await supabase.from("users").select("*");
// Token is automatically included - no manual handling needed!
```

### **How It Works**

1. User signs in → Supabase creates session with JWT
2. Supabase client stores session automatically
3. All queries automatically include JWT in Authorization header
4. Supabase uses JWT for RLS policy enforcement

### **Key Benefits**

- **No manual token storage/retrieval** for data queries
- **No Authorization headers** needed in queries
- **Automatic token refresh** when expired
- **Automatic RLS enforcement** using JWT user ID

---

## 🔐 Authentication Patterns

### **Mobile: Sign In with Email**

```typescript
// apps/mobile-app/services/auth/authService.ts
import { supabase } from "../supabase/client";

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
```

### **Web: Sign In with Email**

```typescript
// apps/web-app/services/auth/authService.ts
import { supabase } from "../supabase/client";

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
```

### **OAuth Patterns**

**Mobile (Native OAuth):**

```typescript
// Mobile uses native OAuth providers
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const { idToken } = await GoogleSignin.signIn();
await supabase.auth.signInWithIdToken({ provider: "google", token: idToken });
```

**Web (Browser OAuth):**

```typescript
// Web uses browser-based OAuth redirects
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

---

## 📊 Data Fetching with Supabase

### **Automatic Authentication**

All Supabase queries automatically include the JWT token from the current session. You don't need to:

- Manually add Authorization headers
- Retrieve and pass tokens
- Handle token refresh for queries

The Supabase client handles all of this automatically. Once a user is signed in, all queries will automatically include their authentication token.

### **Three-Layer Architecture**

The data fetching pattern uses a three-layer architecture:

1. **Service Functions** (`shared/services/`): Make Supabase queries
2. **Shared Hooks** (`shared/hooks/supabase/`): React Query hooks using service functions
3. **Wrapper Hooks** (`apps/*/hooks/supabase/`): Inject platform-specific Supabase client

```
Components → Wrapper Hooks → Shared Hooks → Service Functions → Supabase
```

### **Service Function Pattern**

Service functions encapsulate Supabase queries and handle errors:

```typescript
// packages/shared/src/services/users.ts
import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "../../types";

export const getUsers = async (
  supabaseClient: SupabaseClient
): Promise<User[]> => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserById = async (
  supabaseClient: SupabaseClient,
  userId: string
): Promise<User | null> => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUsersByRole = async (
  supabaseClient: SupabaseClient,
  role: string
): Promise<User[]> => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("role", role);

  if (error) throw error;
  return data;
};
```

### **Shared Hook Pattern**

Shared hooks use React Query with service functions:

```typescript
// packages/shared/src/hooks/supabase/users.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById, getUsersByRole } from "../../services";
import type {
  UseUsersArgs,
  UseUserByIdArgs,
  UseUsersByRoleArgs,
} from "../../types";

export const useUsers = ({ supabaseClient, options }: UseUsersArgs) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(supabaseClient),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useUserById = ({
  supabaseClient,
  userId,
  options,
}: UseUserByIdArgs) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(supabaseClient, userId),
    enabled: !!userId, // Only fetch if userId is provided
    ...options,
  });
};

export const useUsersByRole = ({
  supabaseClient,
  role,
  options,
}: UseUsersByRoleArgs) => {
  return useQuery({
    queryKey: ["users", "role", role],
    queryFn: () => getUsersByRole(supabaseClient, role),
    enabled: !!role,
    ...options,
  });
};
```

### **Wrapper Hook Pattern**

Wrapper hooks inject the platform-specific Supabase client:

```typescript
// apps/mobile-app/hooks/supabase/useUsers.ts
import {
  useUsers as useSharedUsers,
  useUserById as useSharedUserById,
  useUsersByRole as useSharedUsersByRole,
} from "shared";
import { supabase } from "@/services/supabase/client";

export const useUsers = () => {
  return useSharedUsers({ supabaseClient: supabase });
};

export const useUserById = ({ userId }: { userId: string }) => {
  return useSharedUserById({ supabaseClient: supabase, userId });
};

export const useUsersByRole = ({ role }: { role: string }) => {
  return useSharedUsersByRole({ supabaseClient: supabase, role });
};
```

```typescript
// apps/web-app/hooks/supabase/useUsers.ts
import {
  useUsers as useSharedUsers,
  useUserById as useSharedUserById,
  useUsersByRole as useSharedUsersByRole,
} from "shared";
import { supabase } from "@/services/supabase/client";

export const useUsers = () => {
  return useSharedUsers({ supabaseClient: supabase });
};

export const useUserById = ({ userId }: { userId: string }) => {
  return useSharedUserById({ supabaseClient: supabase, userId });
};

export const useUsersByRole = ({ role }: { role: string }) => {
  return useSharedUsersByRole({ supabaseClient: supabase, role });
};
```

### **Composite Hook Example**

Composite hooks combine multiple related queries:

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

  return {
    featuredItems,
    recentItems,
    categories,
    isLoadingContent,
  };
};
```

---

## ✏️ Mutations with Supabase

### **Service Functions for Mutations**

```typescript
// packages/shared/src/services/users.ts
import type { SupabaseClient } from "@supabase/supabase-js";
import type { User, CreateUserInput, UpdateUserInput } from "../../types";

export const createUser = async (
  supabaseClient: SupabaseClient,
  userData: CreateUserInput
): Promise<User> => {
  const { data, error } = await supabaseClient
    .from("users")
    .insert(userData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUser = async (
  supabaseClient: SupabaseClient,
  userId: string,
  userData: UpdateUserInput
): Promise<User> => {
  const { data, error } = await supabaseClient
    .from("users")
    .update(userData)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (
  supabaseClient: SupabaseClient,
  userId: string
): Promise<void> => {
  const { error } = await supabaseClient
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) throw error;
};
```

### **Mutation Hooks Pattern**

```typescript
// packages/shared/src/hooks/supabase/users.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser, deleteUser } from "../../services";
import type {
  UseCreateUserArgs,
  UseUpdateUserArgs,
  UseDeleteUserArgs,
} from "../../types";

export const useCreateUser = ({ supabaseClient }: UseCreateUserArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserInput) =>
      createUser(supabaseClient, userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = ({ supabaseClient }: UseUpdateUserArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserInput;
    }) => updateUser(supabaseClient, userId, userData),
    onSuccess: (data, variables) => {
      // Invalidate users list and specific user
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
    },
  });
};

export const useDeleteUser = ({ supabaseClient }: UseDeleteUserArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(supabaseClient, userId),
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
```

### **Using Mutations in Components**

```typescript
// apps/mobile-app/components/screens/users/CreateUserScreen.tsx
import { useCreateUser } from "@/hooks/supabase/users";

const CreateUserScreen: React.FC = () => {
  const createUser = useCreateUser();

  const handleSubmit = async (userData: CreateUserInput) => {
    try {
      await createUser.mutateAsync(userData);
      // Navigate back or show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button
        onPress={() => handleSubmit(formData)}
        disabled={createUser.isPending}
      >
        {createUser.isPending ? "Creating..." : "Create User"}
      </Button>
    </Form>
  );
};
```

---

## 🔄 Session Management

### **Token Management**

The session contains a JWT access token that is:

- **Automatically included** in all Supabase queries
- **Automatically refreshed** when expired
- **Automatically used** for RLS policy enforcement

You never need to manually handle tokens for data fetching. The Supabase client manages everything automatically.

### **Mobile: Session Persistence**

```typescript
// Mobile automatically persists sessions via AsyncStorage
// Configured in supabase client setup

// Get current session (contains JWT token)
const {
  data: { session },
} = await supabase.auth.getSession();

// The JWT in the session is automatically used in all queries
const { data } = await supabase.from("users").select("*");
// ↑ JWT is automatically included from the session

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
  // New session automatically used for subsequent queries
});
```

### **Web: Session Management**

```typescript
// Web uses cookies for session management
// Configured via @supabase/ssr

// Get current session (server-side)
import { createServerClient } from "@supabase/ssr";

export async function getSession() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Client-side: Session is automatically managed via cookies
// All queries automatically include the JWT from the session
```

---

## 🔒 Row Level Security (RLS)

### **How RLS Uses JWT Tokens**

Row Level Security policies automatically use the JWT token to identify users. The JWT contains the user ID, and Supabase automatically extracts it for policy evaluation.

### **Example RLS Policy**

```sql
-- Users can only see their own data
CREATE POLICY "Users can only see their own data"
ON users FOR SELECT
USING (auth.uid() = id);
-- ↑ auth.uid() extracts user ID from JWT automatically
```

### **How It Works**

1. User signs in → JWT contains user ID
2. Supabase query is made → JWT is automatically included
3. RLS policy evaluates → `auth.uid()` extracts user ID from JWT
4. Policy enforces access → Only matching rows are returned

### **Common RLS Patterns**

```sql
-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Users can only delete their own posts
CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- Users can see posts from users they follow
CREATE POLICY "Users can see followed users' posts"
ON posts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM follows
    WHERE follows.follower_id = auth.uid()
    AND follows.following_id = posts.user_id
  )
);
```

### **Key Points**

- **No manual token handling**: RLS automatically uses the JWT
- **Automatic user identification**: `auth.uid()` extracts user ID from JWT
- **Policy enforcement**: Happens automatically on every query
- **Secure by default**: Policies must be explicitly created to allow access

---

## 🎯 Best Practices

### **DO:**

- ✅ Use wrapper hooks to inject Supabase client
- ✅ Use React Query for data fetching
- ✅ Handle authentication errors gracefully
- ✅ Use platform-specific Supabase clients
- ✅ Persist sessions appropriately (AsyncStorage for mobile, cookies for web)
- ✅ Let Supabase handle tokens automatically
- ✅ Use RLS policies for data access control
- ✅ Use `auth.uid()` in RLS policies to identify users

### **DON'T:**

- ❌ Don't call Supabase directly in components
- ❌ Don't mix authentication patterns between platforms
- ❌ Don't store sensitive data in AsyncStorage (mobile)
- ❌ Don't expose service role keys in client code
- ❌ Don't manually add Authorization headers to Supabase queries
- ❌ Don't manually store/retrieve tokens for data fetching
- ❌ Don't bypass RLS policies (they're there for security)

---

## 📚 Resources

- [Data Fetching Patterns Guide](./data-fetching-patterns-guide.md) - Complete guide for React Query patterns
- [Supabase Local Development Guide](./supabase-local-setup.md)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Query Documentation](https://tanstack.com/query/latest)

---

_This guide is maintained by the development team. Update when Supabase patterns change._
