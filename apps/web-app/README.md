# 🌐 Template Web App

Modern web application built with Next.js, Mantine UI, TypeScript, and streamlined architecture.

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
- [Deployment Guide](../../docs/deployment-guide.md) - CI/CD and deployments

**Web-specific documentation:**

- [Navigation Guide](./docs/navigation-guide.md) - Routing and navigation
- [Asset Management Guide](./docs/asset-management-guide.md) - Images, fonts, colors
- [Mantine Component Guide](./docs/mantine-component-guide.md) - Mantine UI usage
- [Project Structure](./docs/project-structure.md) - File structure overview
- [Developer Decision Guide](./docs/developer-decision-guide.md) - Quick decisions
- [Quick Reference Cheat Sheet](./docs/quick-reference-cheat-sheet.md) - Daily reference

---

## 📱 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Headless Framework**: Refine (for admin/data features)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + Mantine UI
- **State Management**: Zustand with persistence
- **Authentication**: Supabase Auth (Email/Password + OAuth ready)
- **Data Fetching**: Supabase for authentication and data fetching
- **Form Handling**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library

---

## 🚀 Quick Start

### **From Monorepo Root**

```bash
# Install dependencies (if not done)
cd project-template
yarn install

# Start web app
yarn dev:web
# Or from root
yarn dev  # Starts both mobile and web
```

### **From Web App Directory**

```bash
cd apps/web-app

# Start development
yarn dev
```

**Development URL**: `http://localhost:3001`

---

## 🛠️ Development Commands

### **Development**

```bash
yarn dev                    # Start development server
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
# Unit Tests
yarn test                  # Run all tests
yarn test:watch            # Run tests in watch mode
yarn test:coverage         # Run tests with coverage report
yarn test:ci               # Run tests in CI mode
```

### **Building**

```bash
yarn build                 # Build for production
yarn start                 # Start production server
```

---

## 🏗️ Project Structure

See [Project Structure Guide](./docs/project-structure.md) for complete overview.

Key directories:

- `app/` - Next.js App Router directory (file-based routing)
- `components/` - Reusable UI components
- `constants/` - App constants (colors, fonts, assets)
- `hooks/` - Custom React hooks
- `services/` - API and external service integrations
- `providers/` - Refine providers (auth, data, access control)
- `types/` - TypeScript type definitions
- `utils/` - Utility functions and helpers

---

## 🎨 Styling

This app uses **Tailwind CSS** and **Mantine** for UI components.

```typescript
import { Stack, Title, Text } from "@mantine/core";

export const Page: React.FC = () => {
  return (
    <Stack gap="md" className="p-4">
      <Title order={1} className="text-white font-bold">Hello</Title>
      <Text className="text-gray-400 font-regular">Description</Text>
    </Stack>
  );
};
```

**See**: [Mantine Component Guide](./docs/mantine-component-guide.md) for Mantine usage patterns.

---

## 📦 Key Dependencies

- **Next.js 15** - React framework with App Router
- **Mantine** - UI component library
- **Refine** - Headless framework for admin/data features
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

## 🚀 Building & Deployment

### **Local Build**

```bash
yarn build        # Production build
yarn start        # Start production server
```

### **Vercel Deployment**

**Automatic Deployment:**

- Push to `main` branch → Production deployment
- Create PR → Preview deployment

**Manual Deployment:**

```bash
# From project root
vercel --prod
```

**First Time Setup:**

1. **Connect to Vercel:**

```bash
cd project-template
vercel
```

2. **Configure in Vercel Dashboard:**
   - Root Directory: `apps/web-app`
   - Framework: Next.js
   - Build Command: `cd ../.. && yarn build --filter=@template/web-app`
   - Output Directory: `.next`

3. **Set Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**See**: [Deployment Guide](../../docs/deployment-guide.md) for detailed instructions.

---

## 📚 Additional Resources

- [Navigation Guide](./docs/navigation-guide.md) - Routing and navigation
- [Asset Management Guide](./docs/asset-management-guide.md) - Assets
- [Mantine Component Guide](./docs/mantine-component-guide.md) - Mantine UI
- [Project Structure](./docs/project-structure.md) - File structure
- [Developer Decision Guide](./docs/developer-decision-guide.md) - Quick decisions
- [Quick Reference Cheat Sheet](./docs/quick-reference-cheat-sheet.md) - Daily reference

---

_This documentation is maintained by the development team._
