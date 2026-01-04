# 📱 Template Mobile App

Modern React Native mobile app built with Expo, TypeScript, and streamlined architecture.

---

## 🎯 Quick Links

**Start here:**

- [Monorepo Overview](../../README.md) - Understanding the monorepo structure
- [Shared Package Documentation](../../packages/shared/README.md) - Using shared code

**Universal rules (apply to both mobile and web):**

- [Component Building Guide](../../docs/component-building-guide.md) - Composition-first approach
- [Import Patterns](../../docs/import-patterns-guide.md) - How to import
- [Export Patterns](../../docs/export-patterns-guide.md) - How to export
- [Type Organization](../../docs/type-organization-guide.md) - TypeScript patterns
- [Git & PR Guidelines](../../docs/git-and-pr-guidelines.md) - Workflow
- [Testing Strategy](../../docs/testing-strategy.md) - Testing approach
- [Deployment Guide](../../docs/deployment-guide.md) - CI/CD and builds

**Mobile-specific documentation:**

- [Adding Screens Guide](./docs/adding-screens-guide.md) - Screen creation guide
- [Navigation Guide](./docs/navigation-guide.md) - Navigation patterns
- [Asset Management Guide](./docs/asset-management-guide.md) - Images, fonts, colors
- [Project Structure](./docs/project-structure.md) - File structure overview
- [Developer Decision Guide](./docs/developer-decision-guide.md) - Quick decisions
- [Quick Reference Cheat Sheet](./docs/quick-reference-cheat-sheet.md) - Daily reference

---

## 📱 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript with strict mode
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand with persistence
- **Navigation**: Expo Router (file-based routing) + React Navigation
- **Authentication**: Supabase Auth (Email/Password + OAuth ready)
- **Data Fetching**: Supabase for authentication and data fetching
- **Testing**: Jest + React Native Testing Library
- **CI/CD**: GitHub Actions + EAS Build/Submit

---

## 🚀 Quick Start

### **From Monorepo Root**

```bash
# Install dependencies (if not done)
cd project-template
yarn install

# Start mobile app
yarn dev:mobile
# Or from root
yarn dev  # Starts both mobile and web
```

### **From Mobile App Directory**

```bash
cd apps/mobile-app

# Start development
yarn dev
```

**Development URL**: Expo dev server (QR code in terminal)

---

## 🛠️ Development Commands

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
yarn format:check          # Check if files are formatted
yarn type-check            # Check TypeScript types
```

### **Testing**

```bash
yarn test                  # Run all tests
yarn test:watch            # Run tests in watch mode
yarn test:coverage         # Run tests with coverage report
yarn test:ci               # Run tests in CI mode
```

### **Building**

```bash
# Development builds
yarn build:dev:android     # Android device/emulator
yarn build:dev:ios         # iOS device
yarn build:dev:ios-simulator # iOS simulator

# Preview builds (PR testing)
yarn build:preview         # Both platforms
yarn build:preview:ios     # iOS only
yarn build:preview:android # Android only

# Production builds (releases)
yarn build:production      # Both platforms
yarn build:production:ios  # iOS only
yarn build:production:android # Android only
```

### **App Store Submission**

```bash
yarn submit:android    # Submit to Google Play Store
yarn submit:ios        # Submit to App Store
```

---

## 📱 Development Options

### **Expo Go (Default - Quick Start)**

For rapid development without custom native modules:

```bash
yarn dev          # Start with Expo Go
```

- Works immediately
- No build required
- Limited to Expo SDK modules

### **Development Build (Advanced)**

For apps with custom native modules or full feature testing:

**First time setup:**

```bash
cd apps/mobile-app
eas build:configure    # Connect to Expo project
```

**Create development build:**

```bash
yarn build:dev:android  # Android
yarn build:dev:ios      # iOS
```

**Then use:**

```bash
yarn dev:build    # Start with development client
```

**See**: [Deployment Guide](../../docs/deployment-guide.md) for detailed instructions.

---

## 📁 Project Structure

See [Project Structure Guide](./docs/project-structure.md) for complete overview.

Key directories:

- `app/` - Expo Router app directory (file-based routing)
- `components/` - Reusable UI components
- `constants/` - App constants (colors, fonts, assets)
- `hooks/` - Custom React hooks
- `services/` - API and external service integrations
- `types/` - TypeScript type definitions
- `utils/` - Utility functions and helpers

---

## 🎨 Styling

This app uses **NativeWind** (Tailwind CSS for React Native).

```typescript
import { View, Text } from "react-native";

export const Card: React.FC<CardProps> = () => {
  return (
    <View className="bg-white rounded-lg p-4">
      <Text className="text-black font-bold">Hello</Text>
    </View>
  );
};
```

**See**: [Asset Management Guide](./docs/asset-management-guide.md) for colors, fonts, and images.

---

## 📦 Key Dependencies

- **Expo Router** - File-based routing
- **NativeWind** - Tailwind CSS for React Native
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Supabase** - Authentication and backend

---

## 🧪 Testing

```bash
yarn test                  # Run all tests
yarn test:watch            # Run tests in watch mode
yarn test:coverage         # Run tests with coverage report
yarn test:ci               # Run tests in CI mode
```

**See**: [Testing Strategy](../../docs/testing-strategy.md) for testing approach.

---

## 🏗️ Building & Deployment

### **Preview Builds**

For testing on real devices:

```bash
yarn build:preview              # Both platforms
yarn build:preview:android      # Android only
yarn build:preview:ios          # iOS only
```

### **Production Builds**

For app store submission:

```bash
yarn build:production           # Both platforms
yarn build:production:android  # Android only
yarn build:production:ios       # iOS only
```

### **App Store Submission**

```bash
yarn submit:android    # Submit to Google Play Store
yarn submit:ios        # Submit to App Store
```

### **First Time Setup**

1. **Connect to Expo Project:**

```bash
cd apps/mobile-app
eas build:configure
```

2. **Update app.config.ts** with your project details

3. **Set up credentials** (EAS will guide you):

```bash
eas credentials
```

**See**: [Deployment Guide](../../docs/deployment-guide.md) for detailed instructions.

---

## 📚 Additional Resources

- [Adding Screens Guide](./docs/adding-screens-guide.md) - Screen creation
- [Navigation Guide](./docs/navigation-guide.md) - Navigation patterns
- [Asset Management Guide](./docs/asset-management-guide.md) - Assets
- [Project Structure](./docs/project-structure.md) - File structure
- [Developer Decision Guide](./docs/developer-decision-guide.md) - Quick decisions
- [Quick Reference Cheat Sheet](./docs/quick-reference-cheat-sheet.md) - Daily reference

---

_This documentation is maintained by the development team._
