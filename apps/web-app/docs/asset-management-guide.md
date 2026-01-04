# 🖼️ Asset Management Guide

> **Purpose**: Guide for managing and using images, icons, and other static assets in the web app.

## 📋 Table of Contents

- [Overview](#overview)
- [Asset Organization](#asset-organization)
- [Using Assets in Components](#using-assets-in-components)
- [Adding New Assets](#adding-new-assets)
- [Best Practices](#best-practices)

---

## 🎯 Overview

All static assets (images, icons, videos) are:

1. **Stored in `public/` directory** - Next.js convention for static files
2. **Referenced via constants** - Centralized in `constants/assets.ts`
3. **Loaded with `next/image`** - Optimized for web performance

**Key Benefits:**

- ✅ Automatic image optimization
- ✅ Lazy loading by default
- ✅ Prevents layout shift (CLS)
- ✅ Responsive images
- ✅ Modern format support (WebP, AVIF)

---

## 📁 Asset Organization

### Directory Structure

```
web-app/
├── public/
│   ├── icons/              # UI icons and logos
│   └── images/             # Photos and illustrations
├── assets/
│   └── fonts/              # Custom fonts (not in public/)
└── constants/
    └── assets.ts           # Asset path definitions
```

### Why `public/`?

- Files in `public/` are served at root URL path
- Next.js optimizes these files automatically
- Can be referenced with absolute paths starting with `/`

---

## 🎨 Using Assets in Components

### Basic Usage with next/image

```tsx
import Image from "next/image";
import { ASSETS } from "@/constants";

const MyComponent: React.FC = () => {
  return (
    <Image src={ASSETS.icons.appIcon} alt="App Logo" width={100} height={100} />
  );
};
```

### Priority Images (Above-the-Fold)

For images visible on initial load (LCP elements):

```tsx
<Image
  src={ASSETS.icons.logo}
  alt="Logo"
  width={200}
  height={50}
  priority // Loads immediately, no lazy loading
/>
```

### Responsive Images

```tsx
<Image
  src={ASSETS.icons.appIcon}
  alt="App Icon"
  fill // Fills parent container
  className="object-cover" // Tailwind for object-fit
  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizing
/>
```

---

## ➕ Adding New Assets

### Step 1: Add File to `public/`

```bash
# Add icon
cp new-icon.png public/icons/

# Add image
cp new-image.jpg public/images/
```

### Step 2: Register in `constants/assets.ts`

```typescript
export const ASSETS = {
  icons: {
    // ... existing icons
    newIcon: "/icons/new-icon.png", // Add here
  },
  images: {
    // ... existing images
    newImage: "/images/new-image.jpg", // Add here
  },
} as const;
```

### Step 3: Use in Components

```tsx
import Image from "next/image";
import { ASSETS } from "@/constants";

<Image src={ASSETS.icons.newIcon} alt="New Icon" width={50} height={50} />;
```

---

## ✅ Best Practices

### 1. **Always Use `next/image`**

❌ **DON'T:**

```tsx
<img src="/icons/logo.png" alt="Logo" />
```

✅ **DO:**

```tsx
<Image src={ASSETS.icons.appIcon} alt="Logo" width={100} height={100} />
```

### 2. **Always Provide Alt Text**

```tsx
// Good descriptive alt text
<Image src={ASSETS.icons.success} alt="Success notification icon" width={24} height={24} />

// Decorative images (no semantic meaning)
<Image
  src={ASSETS.icons.decorative}
  alt="" // Empty string for decorative
  aria-hidden="true"
  width={16}
  height={16}
/>
```

### 3. **Specify Width & Height**

```tsx
// ✅ Good - Prevents layout shift
<Image
  src={ASSETS.icons.appIcon}
  alt="App Icon"
  width={100}
  height={100}
/>

// ❌ Bad - Can cause layout shift
<Image src={ASSETS.icons.appIcon} alt="App Icon" />
```

### 4. **Use Priority for Critical Images**

```tsx
// Hero image, above-the-fold logo
<Image src={ASSETS.icons.logo} alt="Logo" width={200} height={50} priority />

// Below-the-fold images
<Image
  src={ASSETS.icons.icon}
  alt="Icon"
  width={24}
  height={24}
  // No priority - lazy loads by default
/>
```

### 5. **Use Constants, Not Direct Paths**

❌ **DON'T:**

```tsx
<Image src="/icons/logo.png" alt="Logo" width={100} height={100} />
```

✅ **DO:**

```tsx
<Image src={ASSETS.icons.appIcon} alt="Logo" width={100} height={100} />
```

**Why?**

- Centralized management
- TypeScript autocomplete
- Easy refactoring
- Catch broken paths at build time

---

## 📚 Related Documentation

- [Component Building Guide](../../../docs/component-building-guide.md)
- [Quick Reference Cheat Sheet](./quick-reference-cheat-sheet.md)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

_Keep assets organized, optimized, and accessible!_ 🎨
