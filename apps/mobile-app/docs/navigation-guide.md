# 🧭 Navigation Guide

This guide explains how to navigate between screens in the mobile app using Expo Router.

## 📋 Overview

Expo Router uses file-based routing where your file structure determines your routes. However, understanding how to navigate between screens requires knowing the routing rules.

## 🚨 **CRITICAL: Navigation Path Rules**

### **Rule 1: Same Route Group Navigation**

When navigating **within the same route group**, use the **short path** (screen name only).

**Example:**

```tsx
// From: app/(auth)/sign-in.tsx
// To: app/(auth)/forgot-password.tsx

router.push("/forgot-password"); // ✅ CORRECT - Same (auth) group
```

### **Rule 2: Different Route Group Navigation**

When navigating **between different route groups**, use the **full path** including all groups.

**Example:**

```tsx
// From: app/(auth)/sign-in.tsx
// To: app/(main-app)/(tabs)/tab1/index.tsx

router.push("/(main-app)/(tabs)/tab1"); // ✅ CORRECT - Different groups
router.push("/tab1"); // ❌ WRONG - TypeScript error
```

## 📂 Understanding Route Groups

Route groups are folders wrapped in parentheses like `(auth)`, `(main-app)`, `(tabs)`.

**File Structure:**

```
app/
├── (auth)/                    ← Route group
│   ├── sign-in.tsx
│   └── forgot-password.tsx
├── (main-app)/                 ← Route group
│   └── (tabs)/                ← Nested route group
│       ├── tab1/
│       └── tab2/
└── (onboarding)/              ← Route group
    └── index.tsx
```

## 🎯 Common Navigation Patterns

### **From Auth to Main App**

```tsx
// After successful sign-in or email verification
router.push("/(main-app)/(tabs)/tab1");
```

**Note:** Replace `tab1` with your actual main tab name.

### **From Onboarding to Main App**

```tsx
// After completing onboarding
router.push("/(main-app)/(tabs)/tab1");
```

**Note:** Replace `tab1` with your actual main tab name.

### **Within Auth Screens**

```tsx
// Sign-in to Forgot Password
router.push("/forgot-password");

// Sign-up to Verify Email
router.push("/verify-email");

// Reset Password to Sign-in
router.replace("/sign-in");
```

### **Within Main App Screens**

```tsx
// Between tabs (same group)
router.push("/tab2");
router.push("/tab3");

// To nested screens
router.push("/tab1/discover");
router.push("/tab2/item/123");
```

**Note:** Replace `tab1`, `tab2`, `tab3` with your actual tab names.

## 🔒 Protected Routes

The app uses protected route logic in `app/_layout.tsx` to automatically redirect users based on authentication and onboarding status.

### **Route Protection Rules:**

The app has three main route groups with automatic redirects:

1. **Not authenticated** → Redirect to `/(auth)`
2. **Authenticated but not onboarded** → Redirect to `/(onboarding)`
3. **Authenticated and onboarded** → Redirect to `/(main-app)` if in auth/onboarding groups

### **Implementation:**

```typescript
// app/_layout.tsx
const inAuthGroup = segments[0] === "(auth)";
const inOnboardingGroup = segments[0] === "(onboarding)";

// Not authenticated - redirect to auth
if (!isLoggedIn && !inAuthGroup) {
  return <Redirect href="/(auth)" />;
}

// Authenticated but not onboarded - redirect to onboarding (from anywhere)
if (isLoggedIn && !hasOnboarded && !inOnboardingGroup) {
  return <Redirect href="/(onboarding)" />;
}

// Authenticated and onboarded but in auth/onboarding - redirect to main app
if (isLoggedIn && hasOnboarded && (inAuthGroup || inOnboardingGroup)) {
  return <Redirect href="/(main-app)/(tabs)/tab1" />;
}
```

### **Best Practices:**

- **Let protected routes handle navigation** - Don't manually navigate after auth state changes
- **Auth screens**: Remove manual navigation after sign-in/sign-up success - protected routes handle it
- **Onboarding completion**: Call `setOnboarded(true)` at the end of onboarding flow, then protected routes redirect to main app

---

## 🔄 Navigation Methods

### **`router.push()`**

Navigates to a new screen and adds it to the navigation stack.

```tsx
router.push("/(main-app)/(tabs)/tab1");
```

### **`router.replace()`**

Replaces the current screen (user can't go back).

```tsx
router.replace("/sign-in");
```

### **`router.back()`**

Goes back to the previous screen.

```tsx
router.back();
```

## 📍 How to Find the Correct Path

### **Method 1: Look at File Structure**

Map the file path to the route path:

```
File: app/(main-app)/(tabs)/tab1/index.tsx
Path: /(main-app)/(tabs)/tab1
```

### **Method 2: Use TypeScript IntelliSense**

When you type `router.push("`, TypeScript will show all valid routes. This is the **most reliable method**.

### **Method 3: Check Existing Navigation**

Look at similar navigation patterns in the codebase:

```bash
grep -r "router.push" app/
grep -r "href=" app/
```

## ⚠️ Common Mistakes

### **❌ Wrong: Using Short Path Between Groups**

```tsx
// From (auth) to (main-app)
router.push("/tab1"); // TypeScript error!
```

### **❌ Wrong: Missing Route Groups**

```tsx
// Incomplete path
router.push("/tab1"); // Missing (main-app)/(tabs)
```

### **❌ Wrong: Using Route Group as Destination**

```tsx
// Groups are not routes
router.push("/(main-app)"); // Goes nowhere!
```

### **✅ Correct: Full Path Between Groups**

```tsx
// Complete path with all groups
router.push("/(main-app)/(tabs)/tab1");
```

## 🧪 Testing Navigation

When adding new navigation:

1. **Check TypeScript** - No type errors
2. **Test the flow** - Navigate and verify correct screen appears
3. **Test back navigation** - Ensure back button works as expected
4. **Check both platforms** - iOS and Android may behave differently

## 📚 Quick Reference

- (auth) → (auth): `/screen` (e.g. `/forgot-password`)
- (auth) → (main-app): `/(main-app)/...` (e.g. `/(main-app)/(tabs)/tab1`)
- (onboarding) → (main-app): `/(main-app)/...` (e.g. `/(main-app)/(tabs)/tab1`)
- (main-app) → (main-app): `/screen` (e.g. `/tab2`, `/tab3`)
- (main-app) → (auth): `/(auth)/...` (e.g. `/(auth)/sign-in`)

**Note:** Replace `tab1`, `tab2`, `tab3` with your actual tab names.

## 🎓 Best Practices

1. **Always use TypeScript** - Let it guide you to valid routes
2. **Use constants** - Define frequently used routes as constants
3. **Test navigation** - Verify paths work before committing
4. **Document new routes** - Add comments for complex navigation flows
5. **Be consistent** - Follow the same patterns throughout the app

## 💡 Tips

- When in doubt, check TypeScript's autocomplete for valid routes
- Use `router.replace()` for auth flows where users shouldn't go back
- Keep navigation simple - avoid deep nesting when possible
- Test on both iOS and Android - navigation can behave differently

---

**Remember:** TypeScript is your friend! It knows all valid routes and will help you avoid navigation errors.
