# 📱 Adding New Screens Guide

> **Purpose**: Step-by-step guide for adding screens to different parts of the mobile app navigation structure.

## 🎯 Overview

This guide explains how to add new screens to different parts of the mobile application. Understanding the navigation architecture is crucial for placing screens correctly.

## 📋 When to Use This Guide

**Use this guide when:**

- Adding new authentication screens (login, signup, etc.)
- Creating onboarding flows for new users
- Adding screens to existing tab stacks
- Implementing dynamic routes (detail screens with parameters)
- Creating modal presentations
- Adding entirely new tabs to the app

**This guide covers:**

- Navigation architecture and hierarchy
- Step-by-step instructions for each scenario
- Code examples and best practices
- Common patterns and troubleshooting

---

## 🏗️ Navigation Architecture Overview

The mobile app uses **Expo Router** with a file-based routing system. The navigation hierarchy is:

```
Root Stack (_layout.tsx)
├── (auth) - Stack Navigator
│   └── Auth screens
├── (onboarding) - Stack Navigator
│   └── Onboarding screens
└── (main-app) - Tab Navigator
    └── (tabs) - Tab Navigator
        ├── tab1/ - Stack Navigator
        │   └── Tab 1 stack screens
        ├── tab2/ - Stack Navigator
        │   └── Tab 2 stack screens
        └── tab3/ - Stack Navigator
            └── Tab 3 stack screens
```

**Note:** Replace `tab1`, `tab2`, `tab3` with your app's actual tab names (e.g., `dashboard`, `browse`, `profile` for an e-commerce app, or `feed`, `explore`, `messages` for a social app).

### **Key Concepts**

- **Route Groups**: Folders wrapped in parentheses `(folder)` don't appear in the URL but organize navigation
- **Layout Files**: `_layout.tsx` files define the navigation structure for their directory
- **Screen Files**: `.tsx` files in the app directory become navigable screens
- **Dynamic Routes**: Files like `[id].tsx` create dynamic routes that accept parameters
- **Index Routes**: `index.tsx` files represent the default route for a directory

---

## 🔐 Scenario 1: Adding an Auth Screen

Auth screens are part of the authentication flow (login, signup, password reset, etc.).

### Location

```
app/(auth)/
```

### Steps

1. **Create the screen file** in `app/(auth)/`

```tsx
// app/(auth)/forgot-password.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const ForgotPasswordScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold mb-4 text-2xl">Forgot Password</Text>
        {/* Your screen content */}
      </VStack>
    </ScrollableStack>
  );
};

export default ForgotPasswordScreen;
```

2. **Register the screen** in `app/(auth)/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import React from "react";

const AuthStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Auth",
        }}
      />
      {/* Add your new screen */}
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "Forgot Password",
        }}
      />
    </Stack>
  );
};

export default AuthStackLayout;
```

3. **Navigate to the screen** from another auth screen

```tsx
import { router } from "expo-router";

// In your component
const handleForgotPassword = () => {
  router.push("/forgot-password");
};
```

### **Notes**

- Auth screens typically don't show the drawer or tabs
- The screen name in `Stack.Screen` must match the filename (without `.tsx`)

---

## 🎓 Scenario 2: Adding an Onboarding Screen

Onboarding screens guide new users through the app (welcome, tutorial, preferences, etc.).

### Location

```
app/(onboarding)/
```

### Steps

1. **Create the screen file** in `app/(onboarding)/`

```tsx
// app/(onboarding)/welcome.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const WelcomeScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold mb-4 text-2xl">Welcome!</Text>
        {/* Your onboarding content */}
      </VStack>
    </ScrollableStack>
  );
};

export default WelcomeScreen;
```

2. **Register the screen** in `app/(onboarding)/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import React from "react";

const OnboardingStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Onboarding",
        }}
      />
      {/* Add your new screen */}
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default OnboardingStackLayout;
```

3. **Navigate between onboarding screens**

```tsx
import { router } from "expo-router";

// Moving forward in onboarding flow
const handleNext = () => {
  router.push("/welcome");
};

// Skip onboarding and go to main app
const handleSkip = () => {
  router.replace("/(main-app)/(tabs)/tab1");
};
```

### Notes

- Onboarding screens typically hide headers (`headerShown: false`)
- Use `router.replace()` for the final step to prevent going back

---

## Scenario 3: Adding a Screen to a Tab Stack

Each tab has its own Stack navigator. This allows deep navigation within each tab.

**Note:** Replace `tab1` in the examples below with your actual tab name.

### **3A: Adding a Screen to a Tab Stack**

**Location:**

```
app/(main-app)/(tabs)/tab1/
```

**Steps:**

1. **Create the screen file** in `app/(main-app)/(tabs)/tab1/`

```tsx
// app/(main-app)/(tabs)/tab1/trending.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const TrendingScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold text-2xl">Trending</Text>
        {/* Your screen content */}
      </VStack>
    </ScrollableStack>
  );
};

export default TrendingScreen;
```

2. **Register the screen** in `app/(main-app)/(tabs)/tab1/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import React from "react";

const Tab1StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Tab 1",
        }}
      />
      {/* Add your new screen */}
      <Stack.Screen
        name="trending"
        options={{
          title: "Trending",
        }}
      />
    </Stack>
  );
};

export default Tab1StackLayout;
```

3. **Navigate to the screen**

```tsx
import { router } from "expo-router";

const handleViewTrending = () => {
  router.push("/trending");
};
```

### **3B: Adding a Screen to Another Tab Stack**

Follow the same pattern as above, but use your other tab name (e.g., `tab2`, `tab3`, etc.):

**Location:**

```
app/(main-app)/(tabs)/tab2/
```

**Steps:**

1. **Create the screen file**

```tsx
// app/(main-app)/(tabs)/tab2/feature-screen.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const FeatureScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold text-2xl">Feature Screen</Text>
        {/* Your screen content */}
      </VStack>
    </ScrollableStack>
  );
};

export default FeatureScreen;
```

2. **Register the screen** in `app/(main-app)/(tabs)/tab2/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import React from "react";

const Tab2StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Tab 2",
        }}
      />
      {/* Add your new screen */}
      <Stack.Screen
        name="feature-screen"
        options={{
          title: "Feature Screen",
        }}
      />
    </Stack>
  );
};

export default Tab2StackLayout;
```

3. **Navigate to the screen**

```tsx
import { router } from "expo-router";

const handleFeature = () => {
  router.push("/feature-screen");
};
```

---

## 🔗 Scenario 4: Adding Dynamic Routes (e.g., Detail Screens)

Dynamic routes use parameters in the URL, like viewing a specific item.

### Steps

1. **Create the dynamic route file** using `[param].tsx` syntax

```tsx
// app/(main-app)/(tabs)/tab1/item/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const ItemDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold text-2xl">Item Detail: {id}</Text>
        {/* Fetch and display item data using id */}
      </VStack>
    </ScrollableStack>
  );
};

export default ItemDetailScreen;
```

2. **Register the dynamic route** in the layout

```tsx
<Stack.Screen
  name="item/[id]"
  options={{
    title: "Item Detail",
  }}
/>
```

3. **Navigate with parameters**

```tsx
import { router } from "expo-router";

const handleViewItem = (itemId: string) => {
  router.push({
    pathname: "/item/[id]",
    params: { id: itemId },
  });
};

// Or using the simpler syntax:
const handleViewItem = (itemId: string) => {
  router.push(`/item/${itemId}`);
};
```

---

## 🎭 Scenario 5: Adding a Modal Screen

Modal screens present content over the current screen, useful for forms, confirmations, or temporary content.

### Steps

1. **Create the modal screen** (same as regular screen)

```tsx
// app/(main-app)/(tabs)/tab1/create-item.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const CreateItemScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold text-2xl">Create Item</Text>
        {/* Your form content */}
      </VStack>
    </ScrollableStack>
  );
};

export default CreateItemScreen;
```

2. **Register with modal presentation**

```tsx
<Stack.Screen
  name="create-item"
  options={{
    title: "Create Item",
    presentation: "modal", // This makes it a modal
    headerShown: true,
  }}
/>
```

3. **Navigate to the modal**

```tsx
import { router } from "expo-router";

const handleCreateItem = () => {
  router.push("/create-item");
};
```

4. **Dismiss the modal**

```tsx
import { router } from "expo-router";

const handleCancel = () => {
  router.back(); // Dismisses the modal
};
```

---

## 🆕 Scenario 6: Adding a New Tab (Advanced)

If you need to add an entirely new tab to the bottom tab navigator:

### Steps

1. **Update `app/(main-app)/(tabs)/_layout.tsx`**

```tsx
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="tab1"
        options={{
          title: "Tab 1",
          tabBarIcon: ({ color }) => <Icon name="tab1" color={color} />,
        }}
      />
      {/* Add your new tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
```

2. **Create the tab directory structure**

```
app/(main-app)/(tabs)/
└── profile/
    ├── _layout.tsx
    └── index.tsx
```

3. **Create the tab's stack layout**

```tsx
// app/(main-app)/(tabs)/profile/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

const ProfileStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
        }}
      />
    </Stack>
  );
};

export default ProfileStackLayout;
```

4. **Create the tab's index screen**

```tsx
// app/(main-app)/(tabs)/profile/index.tsx
import React from "react";

import { ScrollableStack, Text, VStack } from "@/components";

const ProfileScreen = () => {
  return (
    <ScrollableStack padding="lg">
      <VStack spacing="lg" align="center" justify="center" className="flex-1">
        <Text className="font-app-bold text-2xl">Profile</Text>
        {/* Your profile content */}
      </VStack>
    </ScrollableStack>
  );
};

export default ProfileScreen;
```

---

## ✅ Best Practices

### File Organization

- ✅ **DO**: Keep related screens together in folders
- ✅ **DO**: Use descriptive file names (kebab-case)
- ✅ **DO**: Create `index.tsx` for folder-based routes
- ❌ **DON'T**: Mix screen files and component files in the same directory
- ❌ **DON'T**: Create deeply nested folder structures (max 3-4 levels)

### Component Naming

- ✅ **DO**: Use PascalCase for component names
- ✅ **DO**: Suffix screen components with "Screen" (e.g., `DashboardScreen`)
- ✅ **DO**: Export as default export
- ❌ **DON'T**: Use anonymous function exports

### Navigation

- ✅ **DO**: Use typed navigation with TypeScript
- ✅ **DO**: Use `router.replace()` for auth flows
- ✅ **DO**: Use `router.push()` for normal navigation
- ✅ **DO**: Use `router.back()` to go back
- ❌ **DON'T**: Hardcode navigation paths (use constants if repeated)

---

## 📖 Quick Reference

### Navigation Methods

```tsx
import { router } from "expo-router";

// Navigate to a screen
router.push("/path/to/screen");

// Replace current screen
router.replace("/path/to/screen");

// Go back
router.back();

// Navigate with params
router.push({
  pathname: "/path/[id]",
  params: { id: "123" },
});
```

### Getting Parameters

```tsx
import { useLocalSearchParams } from "expo-router";

const { id, name } = useLocalSearchParams<{
  id: string;
  name?: string;
}>();
```

### Screen Options

```tsx
<Stack.Screen
  name="screen-name"
  options={{
    title: "Screen Title",
    headerShown: true,
    presentation: "modal", // or "card"
  }}
/>
```

---

## 🚨 Troubleshooting

### Screen Not Showing

1. Check that the file is in the correct directory
2. Verify the screen is registered in `_layout.tsx`
3. Ensure the filename matches the `name` prop in `Stack.Screen`
4. Check for TypeScript errors

### Navigation Not Working

1. Verify the path is correct (including route groups)
2. Check that all parent layouts are properly configured
3. Ensure you're using `router` from `expo-router`
4. Look for console errors

---

## 📚 Related Documentation

- [Navigation Guide](./navigation-guide.md) - Navigation patterns and protected routes
- [Component Building Guide](../../../docs/component-building-guide.md) - Building reusable components
- [Project Structure](./project-structure.md) - File structure overview

---

_This documentation is maintained by the development team. Update when navigation structure changes._
