# 📘 Supabase Database Types Guide

> **Purpose**: Guide for importing and using Supabase database types in the shared package

## Overview

The shared package uses TypeScript types generated from your Supabase database schema. These types ensure type safety when querying Supabase from both mobile and web apps.

---

## Generating Types

### Method 1: Using Supabase CLI (Recommended)

1. **Install Supabase CLI**:

   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:

   ```bash
   supabase login
   ```

3. **Link your project**:

   ```bash
   cd packages/shared
   supabase link --project-ref your-project-ref
   ```

   You can find your project ref in your Supabase dashboard URL: `https://app.supabase.com/project/your-project-ref`

4. **Generate types**:
   ```bash
   supabase gen types typescript --linked > src/types/database.ts
   ```

### Method 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Scroll down to **"TypeScript types"** section
4. Copy the generated types
5. Paste them into `packages/shared/src/types/database.ts`

### Method 3: Using Supabase CLI with API Key

```bash
supabase gen types typescript --project-id your-project-ref --schema public > src/types/database.ts
```

---

## Type Structure

The generated types follow this structure:

```typescript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          // ... other columns
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          // ... other columns (optional for inserts)
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          // ... all columns optional for updates
        };
      };
      // ... other tables
    };
    Views: {
      // ... views if any
    };
    Functions: {
      // ... functions if any
    };
    Enums: {
      // ... enums if any
    };
  };
}
```

---

## Using Types in Services

### Example: User Service

```typescript
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database";

export const getUserById = async (
  client: SupabaseClient<Database>,
  userId: string
) => {
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  // data is automatically typed as Database["public"]["Tables"]["users"]["Row"] | null
  return data;
};
```

### Example: Insert Operation

```typescript
export const createUser = async (
  client: SupabaseClient<Database>,
  userData: Database["public"]["Tables"]["users"]["Insert"]
) => {
  const { data, error } = await client
    .from("users")
    .insert(userData)
    .select()
    .single();

  return data;
};
```

### Example: Update Operation

```typescript
export const updateUser = async (
  client: SupabaseClient<Database>,
  userId: string,
  updates: Database["public"]["Tables"]["users"]["Update"]
) => {
  const { data, error } = await client
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  return data;
};
```

---

## Using Types in Hooks

### Example: React Query Hook

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database";
import { getUserById } from "../../services";

export const useUserById = (
  client: SupabaseClient<Database>,
  userId: string
) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(client, userId),
  });
  // Return type is automatically inferred as:
  // UseQueryResult<Database["public"]["Tables"]["users"]["Row"] | null, Error>
};
```

---

## Type Safety Benefits

1. **Autocomplete**: Get full autocomplete for table names, columns, and operations
2. **Compile-time checks**: TypeScript will catch errors before runtime
3. **Refactoring safety**: When you change your database schema, regenerate types and fix all type errors
4. **Documentation**: Types serve as documentation for your database structure

---

## Updating Types

When you make changes to your Supabase database schema:

1. **Regenerate types** using one of the methods above
2. **Fix any type errors** in your codebase
3. **Test thoroughly** to ensure everything still works

### Automated Type Generation (Optional)

You can add a script to `package.json`:

```json
{
  "scripts": {
    "generate-types": "supabase gen types typescript --linked > src/types/database.ts"
  }
}
```

Then run:

```bash
yarn generate-types
```

---

## Best Practices

1. **Always regenerate types** after schema changes
2. **Commit types to version control** so all developers have the same types
3. **Use type aliases** for commonly used types:
   ```typescript
   export type User = Database["public"]["Tables"]["users"]["Row"];
   export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
   export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
   ```
4. **Don't modify generated types manually** - always regenerate them

---

## Troubleshooting

### Types not updating

- Make sure you're linked to the correct project
- Check that your Supabase CLI is up to date: `supabase update`

### Type errors after regeneration

- This is expected! Fix the errors by updating your code to match the new schema
- Use TypeScript's error messages to guide your fixes

### Missing tables in types

- Ensure tables are in the `public` schema
- Check that you're generating types for the correct schema: `supabase gen types typescript --linked --schema public`

---

## Related Documentation

- [Supabase TypeScript Types Documentation](https://supabase.com/docs/reference/javascript/typescript-support)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli/introduction)
