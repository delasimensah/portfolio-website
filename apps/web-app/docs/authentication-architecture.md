# 🏗️ Authentication Architecture

> **Purpose**: Comprehensive guide to understanding how authentication works in the web app, including Supabase, Next.js middleware, and state management.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Core Components](#core-components)
- [Authentication Flow](#authentication-flow)
- [OAuth Callback Setup](#oauth-callback-setup)
- [OAuth Configuration](#oauth-configuration)
- [State Management](#state-management)
- [Token Management](#token-management)
- [Route Protection](#route-protection)
- [Customization Guide](#customization-guide)

---

## Overview

The web app uses **Supabase Authentication** for all authentication needs:

- **User Authentication** - Email/password, OAuth (Google, Apple)
- **Session Management** - Automatic token refresh, session persistence
- **Data Access** - Supabase handles both authentication and data fetching

**Key Principle**: Supabase session is the source of truth for authentication state. All data fetching uses the Supabase client with automatic token handling.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Web App Navigation                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Middleware         │
              │ (route protection)   │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Check Supabase      │
              │  Session (cookies)   │
              └──────────┬───────────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
         ┌──────────┐      ┌──────────┐
         │ Session  │      │   No     │
         │  Found   │      │ Session  │
         └────┬─────┘      └────┬─────┘
              │                 │
              ▼                 ▼
      ┌──────────────┐   ┌─────────────┐
      │ Allow Route  │   │  Redirect   │
      │ (if allowed) │   │  to /sign-in│
      └──────────────┘   └─────────────┘
                         │
      ┌──────────────────┴────────────────────┐
      │          User Authentication           │
      └──────────────────┬────────────────────┘
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
      ▼                  ▼                  ▼
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Email/  │      │  Google  │      │  Apple   │
│ Password │      │  OAuth   │      │  OAuth   │
└────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                  │
     └─────────────────┼──────────────────┘
                       │
                       ▼
       ┌──────────────────────┐
       │  Supabase Session    │
       │  (stored in cookies) │
       └──────────┬───────────┘
                  │
                  ▼
      ┌─────────────┐
      │  Navigate   │
      │  to App     │
      └─────────────┘
```

---

## Core Components

### 1. **Supabase Client** (`services/supabase/client.ts`)

**Responsibility**: Manages Supabase authentication in browser

```typescript
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

**Key Features**:

- Automatic token refresh
- Session persistence with cookies (handled by `@supabase/ssr`)
- Client-side usage only (browser context)

### 2. **Next.js Middleware** (`middleware.ts`)

**Responsibility**: Route protection and authentication checks

**Protection Logic**:

1. Check Supabase session from cookies
2. Redirect unauthenticated users to `/sign-in`
3. Redirect authenticated but not onboarded users to onboarding
4. Allow authenticated + onboarded users to access protected routes

### 3. **Auth Provider** (`providers/authProvider.ts`)

**Responsibility**: Refine auth provider implementing auth operations

**Methods** (via Refine hooks):

- `login()` - Sign in with email/password/OAuth
- `register()` - Sign up with email/password
- `logout()` - Sign out and clear session
- `check()` - Check if user is authenticated
- `getIdentity()` - Get current user
- `getPermissions()` - Get user permissions

---

## Authentication Flow

### Email/Password Sign-Up Flow

```
1. User enters email, password, full name
   └─> app/(auth)/sign-up/page.tsx

2. register() called in authProvider
   └─> supabase.auth.signUp()
       └─> Supabase sends OTP to email

3. User navigates to verify-email screen
   └─> app/(auth)/verify-email/page.tsx

4. User enters 6-digit OTP code
   └─> verifyEmail() called
       └─> supabase.auth.verifyOtp()
           └─> Supabase session created

5. Middleware redirects to onboarding or main app (page1)
```

### Email/Password Sign-In Flow

```
1. User enters email, password
   └─> app/(auth)/sign-in/page.tsx

2. login() called in authProvider
   └─> supabase.auth.signInWithPassword()
       └─> Supabase session created

3. Middleware redirects to app or onboarding based on hasOnboarded
```

### OAuth Sign-In Flow (Google, Apple, etc.)

```
1. User clicks "Sign in with Google/Apple"
   └─> authProvider.login() called with providerName

2. supabase.auth.signInWithOAuth() called
   └─> User redirected to OAuth provider

3. User authenticates with provider
   └─> Provider redirects to /api/auth/callback?code=...

4. Server-side callback (app/api/auth/callback/route.ts)
   └─> Exchange code for session
   └─> Session stored in cookies
   └─> Redirect to /auth/callback

5. Client-side callback (app/(auth)/auth/callback/page.tsx)
   └─> Get session from cookies
   └─> Complete any additional auth steps
   └─> Redirect to app
```

---

## OAuth Callback Setup

### Overview

OAuth authentication uses a two-step callback process:

1. **Server-side callback** (`/api/auth/callback`) - Exchanges OAuth code for session
2. **Client-side callback** (`/auth/callback`) - Completes any additional auth steps

### Server-Side Callback (`/api/auth/callback`)

**Location**: `app/api/auth/callback/route.ts`

**Purpose**:

- Handles OAuth provider redirects
- Exchanges authorization code for Supabase session
- Stores session in cookies automatically

**Customization Points**:

- Error redirect paths (default: `/auth?error=...`)
- Success redirect path (default: `/auth/callback`)
- Additional session processing

**How it works**:

1. OAuth provider redirects here with `code` or `error` query parameter
2. Server exchanges code for session using `exchangeCodeForSession()`
3. Session is automatically stored in HTTP-only cookies by Supabase
4. Redirects to client callback page

### Client-Side Callback (`/auth/callback`)

**Location**: `app/(auth)/auth/callback/page.tsx`

**Purpose**:

- Runs after server-side callback completes
- Handles any additional authentication steps
- Redirects to app on success

**Customization Points**:

- Add backend token exchange
- Update user metadata
- Initialize user state/store
- Check onboarding status
- Success redirect path (default: `/`)

**Example Customizations**:

```typescript
// Add backend token exchange
import { completeBackendAuth } from "@/services";

const session = await supabase.auth.getSession();
if (session) {
  await completeBackendAuth(session);
}

// Check onboarding status
const {
  data: { user },
} = await supabase.auth.getUser();
if (user?.user_metadata?.hasOnboarded) {
  router.push("/dashboard");
} else {
  router.push("/onboarding");
}
```

---

## OAuth Configuration

### Supabase Dashboard Setup

For OAuth to work correctly, configure redirect URLs in your Supabase dashboard:

1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project → Authentication → URL Configuration
2. Add the following redirect URLs:

**For Production:**

```
https://your-domain.com/api/auth/callback
```

**For Local Development:**

```
http://localhost:3001/api/auth/callback
```

**For Preview Deployments:**

```
https://your-preview-url.vercel.app/api/auth/callback
```

**Important Notes:**

- The callback URL must point to `/api/auth/callback` (the API route)
- The API route will handle code exchange and redirect to `/auth/callback` (client page)
- Both URLs must be configured if you use the client callback page

### Google OAuth Setup

1. In Supabase Dashboard → Authentication → Providers → Google
2. Enable Google provider
3. Add Client ID and Client Secret from [Google Cloud Console](https://console.cloud.google.com)
4. Configure redirect URLs in Google Cloud Console:
   - Add `https://your-project.supabase.co/auth/v1/callback` as authorized redirect URI
   - Supabase handles the OAuth flow and redirects to your app

### Apple OAuth Setup

1. In Supabase Dashboard → Authentication → Providers → Apple
2. Enable Apple provider
3. Add Service ID, Team ID, Key ID, and Private Key from [Apple Developer Console](https://developer.apple.com)
4. Configure redirect URLs in Apple Developer Console:
   - Add `https://your-project.supabase.co/auth/v1/callback` as redirect URI

### Adding More OAuth Providers

1. Enable provider in Supabase Dashboard
2. Configure provider credentials
3. Update `authProvider.ts` to add provider handling:
   ```typescript
   if (providerName === "github") {
     const { error } = await supabase.auth.signInWithOAuth({
       provider: "github",
       options: { redirectTo: redirectUrl },
     });
     if (error) throw error;
     return { success: true };
   }
   ```

---

## State Management

### Auth Provider (Refine)

**Responsibility**: Authentication state via Refine hooks

**Components**:

- `<Authenticated>` - Protects routes, shows loading/redirects
- `<NotAuthenticated>` - Shows content when not logged in
- `useLogin()` - Sign in hook
- `useRegister()` - Sign up hook
- `useLogout()` - Sign out hook
- `useGetIdentity()` - Get current user hook

### Auth Store (Zustand)

**Responsibility**: Additional auth operations

**Methods**:

- `verifyEmail()` - Email OTP verification
- `resendVerification()` - Resend verification code

---

## Token Management

### Storage

**Supabase Session**:

- Stored in: HTTP-only cookies (handled by `@supabase/ssr`)
- Accessible: Server and client
- Auto-refreshed by Supabase client
- Automatically included in all Supabase data queries

---

## Route Protection

### Middleware-Based Protection

The `middleware.ts` file automatically refreshes Supabase sessions on every request. To protect specific routes:

1. **Check authentication in middleware** (optional):

   ```typescript
   // middleware.ts
   const {
     data: { user },
   } = await supabase.auth.getUser();
   if (!user && request.nextUrl.pathname.startsWith("/protected")) {
     return NextResponse.redirect(new URL("/auth", request.url));
   }
   ```

2. **Use Refine's `<Authenticated>` component**:

   ```tsx
   import { Authenticated } from "@refinedev/core";

   <Authenticated fallback={<LoginPage />}>
     <ProtectedContent />
   </Authenticated>;
   ```

3. **Check auth in Server Components**:

   ```tsx
   import { createServerClient } from "@/services";

   const supabase = await createServerClient();
   const {
     data: { user },
   } = await supabase.auth.getUser();

   if (!user) {
     redirect("/auth");
   }
   ```

### Layout Protection

Layout files can also add protection logic:

- `app/(auth)/layout.tsx` - Can redirect authenticated users
- `app/(onboarding)/layout.tsx` - Can require auth
- `app/(main-app)/layout.tsx` - Can require auth + onboarding

---

## Customization Guide

### Adding Backend Token Exchange

If you need to exchange Supabase session for a backend token:

1. **Create backend auth service**:

   ```typescript
   // services/auth/backendAuth.ts
   export async function completeBackendAuth(session: Session) {
     const response = await fetch("/api/auth/backend", {
       method: "POST",
       body: JSON.stringify({ accessToken: session.access_token }),
     });
     const { token } = await response.json();
     // Store backend token
     localStorage.setItem("backend_token", token);
   }
   ```

2. **Call in client callback**:
   ```typescript
   // app/(auth)/auth/callback/page.tsx
   const session = await supabase.auth.getSession();
   if (session) {
     await completeBackendAuth(session);
   }
   ```

### Custom Redirect Logic

Customize redirect paths based on user state:

```typescript
// app/(auth)/auth/callback/page.tsx
const {
  data: { user },
} = await supabase.auth.getUser();

if (user?.user_metadata?.hasOnboarded) {
  router.push("/dashboard");
} else {
  router.push("/onboarding");
}
```

### Error Handling

Customize error handling in the callback:

```typescript
// app/api/auth/callback/route.ts
if (error) {
  // Log to error tracking service
  console.error("OAuth error:", error);

  // Redirect with specific error code
  return NextResponse.redirect(
    `${origin}/auth?error=${encodeURIComponent(error)}&type=oauth`
  );
}
```

---

## 📚 Related Documentation

- [Navigation Guide](./navigation-guide.md) - Route protection patterns
- [Supabase Integration Patterns](../../../docs/supabase-integration-patterns.md) - Supabase patterns

---

_This documentation is maintained by the development team._
