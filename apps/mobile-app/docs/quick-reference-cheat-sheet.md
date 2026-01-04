# 🚀 Quick Reference Cheat Sheet

> **Purpose**: Daily reference for common development tasks in the mobile app.

## 📋 Component Creation Checklist

### **Step-by-Step Component Creation**

1. **Check existing components first** - Can you reuse or extend existing ones?
2. **Create component directory** - `components/[category]/ComponentName/`
3. **Create component file** - `ComponentName.tsx` (with all types inline)
4. **Write tests** - `ComponentName.test.tsx`
5. **Export from index.ts** - Add to appropriate `index.ts` file
6. **Test the export** - Import elsewhere to verify

### **Component Template**

**Standard Component:**

```tsx
import React from "react";
import { View, Text } from "react-native";

interface ComponentNameProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
}

const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-2xl font-bold">{title}</Text>
      {/* Component content */}
    </View>
  );
};

export default ComponentName;
```

**Generic Component (without React.FC):**

```tsx
import React from "react";

interface ListContainerProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
}

const ListContainer = <T extends { id: string | number }>({
  data,
  renderItem,
}: ListContainerProps<T>): React.ReactElement => {
  return (
    <View>
      {data.map((item) => (
        <View key={String(item.id)}>{renderItem(item)}</View>
      ))}
    </View>
  );
};

export default ListContainer;
```

---

## 📦 Import/Export Quick Reference

### **Import Rules**

```tsx
// ✅ Within same folder - use relative paths
import { ComponentVariant } from "./ComponentName.types";
import ComponentText from "../ComponentText/ComponentText";

// ✅ Cross-folder imports - use @ notation
import { Button, Text, VStack } from "@/components";
import { User } from "@/types";
import { COLORS } from "@/constants";
import { handleAuthError } from "@/utils";
```

### **Export Rules**

```tsx
// ✅ Export from index.ts files
export { default as ComponentName } from "./ui/ComponentName/ComponentName";
export { utilityFunction } from "./utility";

// ✅ Group exports by category
// UI Components
export { default as Button } from "./ui/Button/Button";
export { default as Text } from "./ui/Text/Text";
```

---

## 🧭 Navigation Paths Quick Reference

### **Common Navigation Patterns**

```tsx
// ✅ Same route group - use short path
router.push("/forgot-password"); // (auth) to (auth)
router.push("/tab2"); // (main-app) to (main-app)

// ✅ Different route groups - use full path
router.push("/(main-app)/(tabs)/tab1"); // (auth) to (main-app)
router.push("/(auth)/sign-in"); // (main-app) to (auth)

// ✅ Common routes (replace tab names with your actual tabs)
router.push("/(main-app)/(tabs)/tab1"); // Main tab
router.push("/(main-app)/(tabs)/tab2"); // Second tab
router.push("/(main-app)/(tabs)/tab3"); // Third tab
```

### **Route Group Rules**

| From Group   | To Group   | Path Format       | Example                   |
| ------------ | ---------- | ----------------- | ------------------------- |
| (auth)       | (auth)     | `/screen`         | `/forgot-password`        |
| (auth)       | (main-app) | `/(main-app)/...` | `/(main-app)/(tabs)/tab1` |
| (onboarding) | (main-app) | `/(main-app)/...` | `/(main-app)/(tabs)/tab1` |
| (main-app)   | (main-app) | `/screen`         | `/tab2`, `/tab3`          |
| (main-app)   | (auth)     | `/(auth)/...`     | `/(auth)/sign-in`         |

**Note:** Replace `tab1`, `tab2`, `tab3` with your actual tab names.

---

## 🧪 Testing Quick Reference

### **Component Test Template**

```tsx
import { render, screen, fireEvent } from "@testing-library/react-native";
import ComponentName from "./ComponentName";

describe("ComponentName", () => {
  describe("Rendering", () => {
    it("should render with required props", () => {
      render(<ComponentName title="Test" />);
      expect(screen.getByText("Test")).toBeTruthy();
    });
  });

  describe("User Interactions", () => {
    it("should handle button press", () => {
      const onPress = jest.fn();
      render(<ComponentName title="Test" onPress={onPress} />);

      fireEvent.press(screen.getByText("Test"));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
```

---

## 🎨 Asset Management Quick Reference

### **Images**

```tsx
// ✅ Always use expo-image
import { Image } from "expo-image";
import { ASSETS } from "@/constants";

<Image
  source={ASSETS.images.appIcon}
  style={{ width: 32, height: 32 }}
  contentFit="cover"
/>;
```

### **Fonts**

```tsx
// ✅ Use Tailwind classes
<Text className="font-bold">Bold Text</Text>
<Text className="font-light">Light Text</Text>

// ✅ Layout files (when CSS classes aren't available)
import { FONTS } from "@/constants";
<Stack screenOptions={{ headerTitleStyle: { fontFamily: FONTS.bold } }} />
```

### **Colors**

```tsx
// ✅ Use Tailwind classes
<View className="bg-primary" />
<Text className="text-white" />

// ✅ Layout files (when CSS classes aren't available)
import { COLORS } from "@/constants";
<Stack screenOptions={{ tabBarActiveTintColor: COLORS.primary }} />
```

---

## 💻 Common Commands

### **Development**

```bash
yarn dev                    # Start development server
yarn dev:go                 # Start with Expo Go
yarn dev:build              # Start with development build
```

### **Code Quality**

```bash
yarn lint                  # Check for ESLint issues
yarn lint:fix              # Auto-fix ESLint issues
yarn format                # Format all files with Prettier
yarn type-check            # Check TypeScript types
```

### **Testing**

```bash
yarn test                  # Run tests in watch mode
yarn test:ci               # Run all tests in CI mode
yarn test:coverage         # Run tests with coverage report
```

### **Building**

```bash
yarn build:dev:android     # Build for Android
yarn build:dev:ios         # Build for iOS device
yarn build:dev:ios-simulator # Build for iOS simulator
yarn build:preview         # Preview build (both platforms)
yarn build:production      # Production build (both platforms)
```

---

## 🔧 Troubleshooting Quick Fixes

### **Top 10 Common Issues**

1. **TypeScript Error: "Cannot find module"**
   - Check import path (relative vs @ notation)
   - Verify component is exported from index.ts

2. **Navigation Error: "Cannot resolve screen"**
   - Use full path for different route groups: `/(main-app)/(tabs)/tab1`
   - Use short path for same route group: `/tab2`

3. **Image Not Loading**
   - Use `expo-image`, not `react-native` Image
   - Check asset exists in `constants/assets.ts`

4. **Component Not Found**
   - Verify component is exported from `components/index.ts`
   - Check import path uses `@/components`

5. **ESLint Errors**
   - Run `yarn lint:fix` to auto-fix
   - Check for missing `React.FC` usage

6. **Test Failures**
   - Mock external dependencies
   - Check test file is in correct location

7. **Build Errors**
   - Clear cache: `yarn dev --clear`
   - Check for TypeScript errors: `yarn type-check`

8. **Styling Not Applied**
   - Use Tailwind classes, not inline styles
   - Check className prop spelling

9. **Font Not Loading**
   - Verify font exists in `constants/fonts.ts`
   - Check font name matches in Tailwind config

10. **Color Not Working**
    - Use color constants from `@/constants`
    - Check color exists in `constants/colors.ts`

---

## 📚 Quick Links

### **Essential Documentation**

- [Component Building Guide](../../../docs/component-building-guide.md) - How to build components
- [Import Patterns Guide](../../../docs/import-patterns-guide.md) - Import/export rules
- [Navigation Guide](./navigation-guide.md) - Routing and navigation
- [Asset Management Guide](./asset-management-guide.md) - Images, fonts, colors
- [Testing Strategy](../../../docs/testing-strategy.md) - Testing approach

### **Reference Documentation**

- [Export Patterns Guide](../../../docs/export-patterns-guide.md) - Export patterns
- [Type Organization Guide](../../../docs/type-organization-guide.md) - TypeScript patterns
- [Component Organization Guide](../../../docs/component-organization-guide.md) - Component structure
- [Developer Decision Guide](./developer-decision-guide.md) - Quick decisions

---

_This cheat sheet is your daily companion for mobile app development. Bookmark it and refer to it often!_
