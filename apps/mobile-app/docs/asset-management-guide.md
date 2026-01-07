# 🎨 Asset Management Guide

> **Purpose**: Guide for managing colors, fonts, and assets in the mobile app.

## 🚀 Quick Start

> **For New Developers**: This guide shows you how to add images, fonts, and colors to the app. Each asset type follows a simple pattern: add file → update constants → use in components.

### **📋 Quick Reference**

| Asset Type | File Location    | Constants File        | Usage                                   |
| ---------- | ---------------- | --------------------- | --------------------------------------- |
| **Images** | `assets/images/` | `constants/assets.ts` | `<Image source={ASSETS.images.name} />` |
| **Icons**  | `assets/icons/`  | `constants/assets.ts` | `<Image source={ASSETS.icons.name} />`  |
| **Videos** | `assets/videos/` | `constants/assets.ts` | `<Video source={ASSETS.videos.name} />` |
| **Fonts**  | `assets/fonts/`  | `constants/fonts.ts`  | `className="font-app-bold"`                 |
| **Colors** | N/A              | `constants/colors.ts` | `className="bg-primary"`                |

## 🚨 **CRITICAL: Image Component Requirements**

> **⚠️ MANDATORY**: ALL images in the mobile app MUST use `expo-image`, NEVER `react-native` Image components.
>
> **✅ CORRECT**: `import { Image } from "expo-image"`
> **❌ WRONG**: `import { Image } from "react-native"`
>
> **Consequence**: PR will be rejected if `react-native` Image is used anywhere in the codebase.

### **Adding a New Image**

**Step 1: Add Image File to Assets**

```bash
# Add your image file to the appropriate assets folder
assets/images/new-image.png
assets/icons/new-icon.png
assets/videos/new-video.mp4
```

**Step 2: Update Constants (constants/assets.ts)**

```typescript
// Add to the appropriate category in ASSETS
export const ASSETS = {
  images: {
    // ... existing images
    newImage: require("../assets/images/new-image.png"),
  },
  icons: {
    // ... existing icons
    newIcon: require("../assets/icons/new-icon.png"),
  },
  videos: {
    // ... existing videos
    newVideo: require("../assets/videos/new-video.mp4"),
  },
} as const;
```

**Step 3: Use in Components**

```typescript
// Option A: React Native Image component
import { Image } from "expo-image";
import { ASSETS } from "@/constants";
<Image source={ASSETS.images.newImage} />

// Option B: With styling
<Image
  source={ASSETS.images.newImage}
  style={{ width: 300, height: 200 }}
  contentFit="cover"
/>
```

> ⚠️ **Important**: `expo-image` does NOT support `className` prop. Use inline styles.

**Step 4: Expo Image Styling**

**expo-image requires inline styles (not Tailwind classes):**

```typescript
// ✅ Correct - expo-image with inline styles
import { Image } from "expo-image";
<Image
  source={ASSETS.images.appIcon}
  style={{ width: 32, height: 32, borderRadius: 16 }}
  contentFit="cover"
/>

// ❌ Wrong - className does NOT work on expo-image
<Image
  source={ASSETS.images.appIcon}
  className="h-8 w-8 rounded-2xl"
  contentFit="cover"
/>
```

**Why expo-image?**

- Better performance than React Native Image
- Built-in caching and placeholder support
- Modern features (blurhash, priority loading)

**Step 5: For app.config.ts (if needed)**

> ⚠️ **Important**: `app.config.ts` runs in Node.js context and cannot import from constants. Use direct string paths.

```typescript
// app.config.ts - Use direct string paths (cannot import constants)
const ASSET_PATHS = {
  // ... existing paths
  newImage: "./assets/images/new-image.png",
} as const;

// Use in app config
icon: ASSET_PATHS.newImage;
```

### **Adding a New Font**

**Step 1: Add Font File**

```bash
# Add your font file to assets/fonts/
# Example: assets/fonts/NewFont-Regular.otf
```

**Step 2: Update Font Loading (constants/fonts.ts)**

```typescript
export const FONTS = {
  // ... existing fonts
  newFont: "Template-NewFont", // Generic name for easy switching
} as const;

export const FONT_LOADING_MAP = {
  // ... existing fonts
  [FONTS.newFont]: require("../assets/fonts/NewFont-Regular.otf"),
} as const;
```

**Step 3: Update Tailwind Config (tailwind.config.js)**

```javascript
const { FONTS } = require("./constants/fonts");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // ... existing fonts
        "template-new": [FONTS.newFont, "system-ui", "sans-serif"],
      },
    },
  },
};
```

**Step 4: Use in Components**

**Option A: Tailwind Classes (PRIMARY APPROACH)**

```typescript
// Use Tailwind classes for ALL component styling
<Text className="font-template-new">New Font Text</Text>
```

**Option B: Layout Files (When CSS Classes Aren't Available)**

```typescript
// app/_layout.tsx, app/(main-app)/_layout.tsx
import { FONTS } from "@/constants";

<Stack
  screenOptions={{
    headerTitleStyle: {
      fontFamily: FONTS.newFont,
    },
  }}
/>
```

**Note:** **Tailwind classes are the PRIMARY approach for all component styling.**

### **Adding a New Color**

**Key Principle: All colors must be exported from the colors constant**

```typescript
// constants/colors.ts - Organize colors however makes sense for your project

// Option A: Add to existing group
export const PRIMARY_COLORS = {
  // ... existing colors
  accent: "#FF6B9D",
  newColor: "#10B981",
} as const;

// Option B: Create new groups as needed
export const PROJECT_COLORS = {
  specialBlue: "#1E40AF",
  customGreen: "#059669",
} as const;

// MOST IMPORTANT: Export all groups from colors constant
export const COLORS = {
  ...PRIMARY_COLORS,
  ...PROJECT_COLORS,
} as const;
```

**Step 2: Add to Tailwind Config (to use as Tailwind classes)**

```javascript
// tailwind.config.js
const { COLORS } = require("./constants/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your new colors here - all from constants
        accent: COLORS.accent,
        "special-blue": COLORS.specialBlue,
        // Or add with variants - all from constants
        "custom-green": {
          DEFAULT: COLORS.customGreen,
          light: COLORS.customGreenLight,
          dark: COLORS.customGreenDark,
        },
      },
    },
  },
};
```

**Step 3: Use in Components**

```typescript
// Primary approach: Tailwind classes (after adding to config)
<View className="bg-accent" />
<View className="bg-special-blue" />
<Text className="text-primary">Text</Text>

// Layout files only (when CSS classes aren't available)
import { COLORS } from "@/constants";
<Stack screenOptions={{ tabBarActiveTintColor: COLORS.primary }} />
```

---

## 🔤 Font System Architecture

### **Font Naming Convention**

```typescript
// Generic names for easy font switching
export const FONTS = {
  light: "Template-Light", // Not "Satoshi-Light"
  regular: "Template-Regular", // Not "Satoshi-Regular"
  medium: "Template-Medium", // Not "Satoshi-Medium"
  bold: "Template-Bold", // Not "Satoshi-Bold"
  black: "Template-Black", // Not "Satoshi-Black"
} as const;
```

**Benefits:**

- Easy to switch font families without changing component code
- Consistent naming across the app
- Future-proof for font changes

### **Font Usage Patterns**

**1. Layout Components (Navigation) - Direct Style Usage**

```typescript
// app/_layout.tsx, app/(main-app)/_layout.tsx
import { FONTS } from "@/constants";

<Stack
  screenOptions={{
    headerTitleStyle: {
      fontFamily: FONTS.bold,
    },
  }}
/>
```

**2. Component Styling - Tailwind Classes (PRIMARY APPROACH)**

```typescript
// Use Tailwind classes for ALL component styling
<Text className="font-app-bold">Bold Heading</Text>
<Text className="font-light">Light Caption</Text>
<Text className="font-medium">Medium Text</Text>
```

**Best Practice:** **Tailwind classes are the PRIMARY approach for all component styling.**

---

## 📁 Asset Organization

### **File Structure**

```
constants/
├── assets.ts     # Images, icons, videos
├── colors.ts     # Color system
└── fonts.ts      # Font system

assets/
├── fonts/        # Font files (.otf, .ttf)
├── images/       # Image files (.png, .jpg, .svg)
├── icons/        # Icon image assets (.png)
└── videos/       # Video files (.mp4)
```

### **Constants Structure**

```typescript
// constants/assets.ts
export const ASSETS = {
  images: {
    appIcon: require("../assets/images/app-icon.png"),
  },
  icons: {
    // Icon mappings
  },
  videos: {
    // Video mappings
  },
} as const;

// constants/colors.ts
export const PRIMARY_COLORS = {
  primary: "#9933FF",
  primaryLight: "#B366FF",
  primaryDark: "#7A29CC",
} as const;

export const COLORS = {
  ...PRIMARY_COLORS,
} as const;

// constants/fonts.ts
export const FONTS = {
  light: "Template-Light",
  regular: "Template-Regular",
  medium: "Template-Medium",
  bold: "Template-Bold",
  black: "Template-Black",
} as const;
```

---

## 🔧 Maintenance

### **Updating Assets**

1. **Replace asset file** in `assets/` folder
2. **Update constant** if name changes
3. **Test** in app to ensure it loads correctly

### **Changing Fonts**

1. **Replace font files** in `assets/fonts/`
2. **Update FONT_LOADING_MAP** in `constants/fonts.ts`
3. **Test** font loading in app

### **Changing Colors**

1. **Update color values** in `constants/colors.ts`
2. **Update Tailwind config** if needed
3. **Test** color changes across app

### **Best Practices**

- **Use generic names**: `Template-Regular` instead of `Satoshi-Regular`
- **Keep constants organized**: Group by type and purpose
- **Test changes**: Verify assets load correctly
- **Document additions**: Update this guide for new patterns
- **Use TypeScript**: Leverage `as const` for type safety

---

## 🚨 Troubleshooting

### **Font Not Loading**

1. Check font file exists in `assets/fonts/`
2. Verify `FONT_LOADING_MAP` includes the font
3. Ensure font name matches in `FONTS` constant
4. Check `app/_layout.tsx` loads fonts correctly

### **Image Not Loading**

1. Check image file exists in `assets/images/`
2. Verify `ASSETS.images` includes the image
3. Check file path in `require()` statement
4. Ensure image format is supported
5. **CRITICAL**: Make sure you're using `expo-image`, not `react-native` Image

### **Color Not Applying**

1. Check color exists in `COLORS` in `constants/colors.ts`
2. Verify Tailwind config includes the color (if using Tailwind classes)
3. Ensure proper import from `@/constants`
4. Use `COLORS.colorName` for direct usage

### **Asset Not Found**

1. Verify file path in constants
2. Check file exists in correct `assets/` subfolder
3. Ensure proper export from constants file
4. Verify import in component

---

## 📚 Related Documentation

- [Developer Decision Guide](./developer-decision-guide.md) - Where to put assets
- [Component Organization Guide](../../../docs/component-organization-guide.md) - Component structure
- [Testing Strategy](../../../docs/testing-strategy.md) - Testing approach

---

_This guide ensures consistent asset management across the mobile app while maintaining scalability and developer experience._
