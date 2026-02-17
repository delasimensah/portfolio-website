# 🧭 Navigation Guide

This guide explains how to navigate between pages in the web app using Next.js App Router.

## 📋 Overview

Next.js App Router uses file-based routing where your file structure determines your routes. Route groups organize your app without affecting URLs.

## 🚨 **CRITICAL: Navigation Path Rules**

### **Rule 1: Route Groups Don't Appear in URLs**

**File Structure:**

```
app/(auth)/sign-in/page.tsx
app/(main-app)/page1/page.tsx
```

**URLs:**

```
/sign-in                # NOT /(auth)/sign-in
/page1                  # NOT /(main-app)/page1
```

**Note:** Replace `page1` with your actual page name.

### **Rule 2: Navigation Uses Simple URLs**

```tsx
// ✅ CORRECT - Simple URL paths
router.push("/sign-in");
router.push("/page1");
router.push("/onboarding");

// ❌ WRONG - Don't include route groups
router.push("/(auth)/sign-in");
router.push("/(main-app)/page1");
```

**Note:** Replace `page1` with your actual page name.

## 📂 Understanding Route Groups

Route groups are folders wrapped in parentheses like `(auth)`, `(main-app)`.

**File Structure:**

```
app/
├── (auth)/                    ← Route group (not in URL)
│   ├── sign-in/page.tsx      → URL: /sign-in
│   └── sign-up/page.tsx      → URL: /sign-up
├── (main-app)/                ← Route group (not in URL)
│   ├── page1/page.tsx        → URL: /page1
│   ├── page2/page.tsx        → URL: /page2
│   └── page3/page.tsx        → URL: /page3
└── (onboarding)/              ← Route group (not in URL)
    └── onboarding/page.tsx      → URL: /onboarding
```

**Note:** Replace `page1`, `page2`, `page3` with your actual page names.

## 🎯 Common Navigation Patterns

### **From Auth to Main App**

```tsx
// After successful sign-in
router.push("/page1");
```

**Note:** Replace `page1` with your actual main page name.

### **From Onboarding to Main App**

```tsx
// After completing onboarding
router.push("/page1");
```

**Note:** Replace `page1` with your actual main page name.

### **Within Auth Pages**

```tsx
// Sign-in to Sign-up
router.push("/sign-up");

// Sign-up to Sign-in
router.push("/sign-in");
```

### **Within Main App**

```tsx
// Between pages (replace with your actual page names)
router.push("/page2");
router.push("/page3");
router.push("/profile");
```

## 🔒 Protected Routes

The app uses protected route logic in layouts to automatically redirect users based on authentication and onboarding status.

### **Route Protection Rules:**

1. **Not authenticated** → Redirect to `/sign-in`
2. **Authenticated but not onboarded** → Redirect to `/onboarding`
3. **Authenticated and onboarded** → Access to main app

### **Implementation:**

Protection is handled in layout files:

- `app/(auth)/layout.tsx` - Can add logic to redirect authenticated users
- `app/(onboarding)/layout.tsx` - Can add logic to require auth
- `app/(main-app)/layout.tsx` - Can add logic to require auth + onboarding

---

## 🔄 Navigation Methods

### **`router.push()`**

Navigates to a new page and adds it to history.

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/page1");
```

**Note:** Replace `page1` with your actual page name.

### **`router.replace()`**

Replaces the current page (user can't go back).

```tsx
router.replace("/sign-in");
```

### **`router.back()`**

Goes back to the previous page.

```tsx
router.back();
```

## 📍 Adding New Pages

### **1. Create page file**

```tsx
// app/(main-app)/page2/page.tsx
"use client";

import { Box, Title } from "@mantine/core";

export default function Page2() {
  return (
    <Box>
      <Title order={1}>Page 2</Title>
    </Box>
  );
}
```

**Note:** Replace `page2` with your actual page name.

### **2. Navigate to it**

```tsx
router.push("/page2");
```

That's it! Next.js automatically creates the route.

## 📚 Quick Reference

- Any → Sign In: `router.push("/sign-in")`
- Any → Sign Up: `router.push("/sign-up")`
- Any → Onboarding: `router.push("/onboarding")`
- Any → Page 1: `router.push("/page1")`
- Any → Page 2: `router.push("/page2")`
- Any → Page 3: `router.push("/page3")`
- Any → Profile: `router.push("/profile")`

**Note:** Replace `page1`, `page2`, `page3` with your actual page names.

## 💡 Tips

- Route groups organize code, not URLs
- Use simple paths in navigation
- Layouts handle protection logic
- Test navigation on build, not just dev

---

_Remember: Route groups are for organization only. URLs are simple paths!_
