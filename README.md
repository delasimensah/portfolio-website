# 🏗️ Project Template

> **Complete monorepo template for React Native (Expo) and Next.js applications**

## 🎯 Overview

This is a production-ready monorepo template containing:

- **Mobile App** (`apps/mobile-app`) - React Native Expo app with Expo Router
- **Web App** (`apps/web-app`) - Next.js web application
- **Shared Package** (`packages/shared`) - Shared types, utilities, and API client

## 📁 Project Structure

```
project-template/
├── apps/
│   ├── mobile-app/        # Expo mobile app
│   └── web-app/           # Next.js web app
├── packages/
│   └── shared/            # Shared code package
├── supabase/              # Supabase local development
│   ├── migrations/        # Database migrations
│   └── seed.sql           # Database seed data
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD workflows
├── package.json           # Root workspace config
└── turbo.json             # Turborepo config
```

## 🚀 Getting Started

### **Prerequisites**

```bash
node --version  # >= 18.0.0
yarn --version  # >= 1.22.0
```

**Also Required:**

- **Docker Desktop** - For local Supabase development ([Download](https://www.docker.com/products/docker-desktop))

### **Step 1: Install Dependencies**

```bash
yarn install
```

### **Step 2: Set Up Supabase (Local Development)**

```bash
# Initialize Supabase (first time only)
yarn supabase:init

# Start Supabase services
yarn supabase:start
```

This starts a local Supabase instance that both apps will use. Save the connection details displayed in the terminal.

**See**: [Supabase Local Setup Guide](./docs/supabase-local-setup.md) for detailed instructions.

### **Step 3: Set Up Environment Variables**

**Mobile App:**

```bash
cd apps/mobile-app
# Create .env.local with Supabase connection details
# EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
# EXPO_PUBLIC_SUPABASE_ANON_KEY=<from-supabase-start-output>
```

**Note for Android Emulator**: Use `10.0.2.2` instead of `localhost`:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://10.0.2.2:54321
```

**Web App:**

```bash
cd apps/web-app
# Create .env.local with Supabase connection details
# NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<from-supabase-start-output>
```

### **Step 4: Start Development**

```bash
# Start both apps
yarn dev:apps

# Or start individually
yarn dev:mobile    # Mobile only
yarn dev:web       # Web only
```

**Development URLs:**

- **Mobile**: Expo dev server (QR code in terminal)
- **Web**: `http://localhost:3001`

## 🎮 Commands

### **From Monorepo Root**

```bash
# Development
yarn dev:apps            # Start both apps
yarn dev:mobile          # Start mobile only
yarn dev:web             # Start web only

# Code Quality
yarn lint                # Lint all apps
yarn lint:fix           # Fix linting issues
yarn type-check         # Type check all apps
yarn format             # Format all code
yarn format:check       # Check formatting

# Testing
yarn test               # Run all tests
yarn test:mobile        # Test mobile app
yarn test:web           # Test web app
yarn test:shared        # Test shared package

# Supabase
yarn supabase:start     # Start local Supabase
yarn supabase:stop      # Stop local Supabase
yarn supabase:status   # Check Supabase status
yarn supabase:reset     # Reset database

# Mobile Builds (from apps/mobile-app)
cd apps/mobile-app
yarn build:dev:android  # Development build (Android)
yarn build:dev:ios      # Development build (iOS)
yarn build:preview      # Preview build (both platforms)
yarn build:production   # Production build (both platforms)
```

## 📚 Documentation

See the `docs/` directory for comprehensive documentation:

### **Getting Started**

- [Onboarding Checklist](./docs/onboarding-checklist.md) - New developer setup
- [Supabase Local Setup](./docs/supabase-local-setup.md) - Local Supabase development guide
- [Troubleshooting Guide](./docs/troubleshooting-guide.md) - Common issues and fixes
- [Deployment Guide](./docs/deployment-guide.md) - Building and deploying apps

### **Development Workflow**

- [Git and PR Guidelines](./docs/git-and-pr-guidelines.md) - Development workflow
- [Testing Strategy](./docs/testing-strategy.md) - Testing approach

### **Template maintenance**

- [Untrack template docs and Cursor rules](./docs/untrack-template-assets.md) - When handing a project repo to a client (or when you do not want to ship `docs/` and `.cursor/`), run `./scripts/untrack-template-assets.sh` in the project repo. See the doc for when and how.

### **Code Organization**

- [Component Building Guide](./docs/component-building-guide.md) - Component patterns
- [Component Organization Guide](./docs/component-organization-guide.md) - Where components belong
- [Import Patterns Guide](./docs/import-patterns-guide.md) - Import conventions
- [Export Patterns Guide](./docs/export-patterns-guide.md) - Export conventions
- [Type Organization Guide](./docs/type-organization-guide.md) - TypeScript patterns

### **Data & Integration**

- [Data Fetching Patterns Guide](./docs/data-fetching-patterns-guide.md) - React Query patterns
- [Supabase Integration Patterns](./docs/supabase-integration-patterns.md) - Supabase integration guide

## 🔧 Technology Stack

### **Mobile App**

- Expo Router (file-based routing)
- React Native
- NativeWind (Tailwind CSS)
- Zustand (state management)
- React Query (data fetching)
- TypeScript

### **Web App**

- Next.js 15 (App Router)
- React 19
- Refine (data framework for admin/data features)
- Mantine (UI components)
- Zustand (state management)
- React Query (data fetching)
- TypeScript

### **Shared Package**

- TypeScript types
- Shared utilities
- API client
- Common constants

### **Supabase (Local Development)**

- Local PostgreSQL database
- Authentication service
- Storage service
- Shared by both mobile and web apps

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run specific app tests
yarn test:mobile
yarn test:web
yarn test:shared
```

## 🔍 Code Quality

All code must pass:

- ✅ ESLint (with import sorting)
- ✅ Prettier (formatting)
- ✅ TypeScript (type checking)
- ✅ Tests (unit/integration)

## 📖 For New Developers

1. **Start Here**: Follow the [Onboarding Checklist](./docs/onboarding-checklist.md)
2. **Read Documentation**: Check `docs/` directory for guides
3. **Set Up Environment**: Copy `.env.example` files and configure
4. **Start Coding**: Create your first feature branch

---

_This template is maintained for consistent project setup across teams._
