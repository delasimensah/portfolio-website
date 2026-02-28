# 📁 Project Structure

> **Purpose**: Complete overview of the web app project structure and organization.

## 🏗️ Root Level Structure

```
web-app/
├── app/                          # Next.js App Router directory
├── components/                   # Reusable UI components
├── constants/                    # App constants (colors, fonts, etc.)
├── docs/                        # Project documentation
├── hooks/                       # Custom React hooks
├── services/                    # API and external service integrations
├── providers/                   # Refine providers (auth, data, access control)
├── types/                       # TypeScript type definitions
├── utils/                       # Utility functions and helpers
├── __tests__/                   # Test files
├── next.config.ts              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── yarn.lock                    # Dependency lock file
```

## 📱 App Directory (`app/`)

**Next.js App Router file-based routing structure:**

```
app/
├── layout.tsx                   # Root layout with metadata
├── providers.tsx                # Client providers (Mantine, React Query)
├── page.tsx                     # Root page (redirect logic)
├── globals.css                  # Global styles
├── (auth)/                      # Authentication route group
│   ├── layout.tsx              # Auth layout
│   ├── sign-in/
│   │   └── page.tsx            # Sign in page
│   └── sign-up/
│       └── page.tsx            # Sign up page
├── (onboarding)/                # Onboarding route group
│   ├── layout.tsx              # Onboarding layout
│   └── [onboarding-pages]/
│       └── page.tsx            # Onboarding pages
└── (admin)/                     # Admin dashboard route group
    └── admin/
        ├── layout.tsx          # Admin layout (sidebar, header)
        ├── page.tsx            # Dashboard (or redirect)
        ├── dashboard/
        │   └── page.tsx        # /admin/dashboard
        ├── properties/
        │   ├── page.tsx        # /admin/properties
        │   ├── create/
        │   │   └── page.tsx    # /admin/properties/create
        │   └── [id]/
        │       └── page.tsx    # /admin/properties/[id]
        ├── areas/
        ├── bookings/
        ├── users/
        ├── service-requests/
        ├── reviews/
        ├── analytics/
        ├── settings/
        └── ...
```

**Route Groups:**

- `(auth)` - Public authentication pages
- `(onboarding)` - User onboarding flow
- `(admin)` - Admin dashboard with sidebar layout; nested `admin/` for routes like `/admin/properties`, `/admin/dashboard`

**Key Notes:**

- Route groups use parentheses `(name)` - don't affect URL structure
- Layouts cascade and can handle protection logic
- Each page.tsx file becomes a route

---

## 🧩 Components Directory (`components/`)

**Organized by feature and type:**

```
components/
├── index.ts                     # Barrel export file
├── ui/                         # Base UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── index.ts
├── navigation/                 # Navigation components
│   ├── Sidebar/
│   └── Header/
├── shared/                     # Shared business components
└── [feature]/                  # Feature-specific components
```

**Component Structure Pattern:**

```
ComponentName/
├── ComponentName.tsx          # Component implementation (all types inline)
└── ComponentName.test.tsx     # Tests (REQUIRED)
```

**Note:** NO index.ts files in individual component folders, only at category level

---

## 🔧 Services Directory (`services/`)

**External service integrations:**

```
services/
├── index.ts                   # Barrel export file (ONLY top-level)
├── supabase/                  # Supabase integration
│   ├── client.ts             # Browser Supabase client
│   ├── server.ts             # Server Supabase client
│   └── middleware.ts         # Session refresh logic
└── auth/                     # Authentication services
```

**🚨 CRITICAL:** NO index.ts files in subdirectories (supabase, auth, etc.)

**Pattern:**

```typescript
// ✅ services/index.ts exports directly from subdirectories
export { default as createBrowserClient } from "./supabase/client";
export { updateSession } from "./supabase/middleware";

// ❌ NO services/supabase/index.ts file
// ❌ NO services/auth/index.ts file
```

---

## 🎣 Hooks Directory (`hooks/`)

**Custom React hooks:**

```
hooks/
├── index.ts                   # Barrel export file (ONLY top-level)
├── auth/                     # Authentication hooks
│   └── useAuthStore.ts      # Zustand auth store
└── api/                      # API hooks
```

**🚨 CRITICAL:** NO index.ts files in subdirectories (auth, api, etc.)

**Pattern:**

```typescript
// ✅ hooks/index.ts exports directly from subdirectories
export { default as useAuthStore } from "./auth/useAuthStore";

// ❌ NO hooks/auth/index.ts file
```

---

## 🔌 Providers Directory (`providers/`)

**Refine-specific providers:**

```
providers/
├── index.ts                  # Barrel export file
├── authProvider.ts           # Refine auth provider (Supabase integration)
├── dataProvider.ts           # Refine data provider
└── accessControlProvider.ts  # Route protection logic
```

---

## 📝 Types Directory (`types/`)

**TypeScript type definitions:**

```
types/
├── index.ts                  # Barrel export file
└── auth.ts                   # Authentication types
```

---

## 🛠️ Utils Directory (`utils/`)

**Utility functions and helpers:**

```
utils/
├── index.ts                  # Barrel export file
└── cn.ts                    # Class name utility (tailwind-merge)
```

**Key Rules:**

- **Flat structure** - All utils go directly in `/utils/` (no categories)
- **Descriptive naming** - Use clear, specific names
- **Single responsibility** - One utility file = one type of functionality
- **Must export from index** - All utils must be exported from `/utils/index.ts`
- **Must have tests** - All utils need tests in `/utils/__tests__/`

---

## 📊 Constants Directory (`constants/`)

**App constants:**

```
constants/
├── index.ts                  # Barrel export file
├── colors.ts                 # Color palette
├── fonts.ts                  # Font definitions
├── assets.ts                 # Asset paths
└── apiContants.ts           # API configuration
```

---

## 🧪 Testing Structure

**Test organization:**

```
__tests__/
├── test-utils.tsx            # Testing utilities
└── [test-files].tsx
```

---

## 📚 Documentation Structure

**Project documentation:**

```
docs/
├── asset-management-guide.md        # Asset management guidelines
├── authentication-architecture.md   # Auth flow documentation
├── developer-decision-guide.md     # Development decisions
├── mantine-component-guide.md       # Mantine UI guide
├── navigation-guide.md              # Navigation guide
├── project-structure.md            # This file
└── quick-reference-cheat-sheet.md  # Daily reference
```

---

## 🔧 Configuration Files

**Root level configuration:**

- **`next.config.ts`** - Next.js configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript compiler options
- **`package.json`** - Dependencies, scripts
- **`jest.config.js`** - Jest test configuration

---

## 🎯 Key Architectural Patterns

### **1. Feature-Based Organization**

- Components organized by feature (dashboard, navigation, shared)
- Each feature has its own directory with related files

### **2. Barrel Exports**

- Every top-level directory has an `index.ts` file
- Provides clean public API for each module
- NO index.ts files in subdirectories (services, hooks, etc.)

### **3. Type Safety**

- Comprehensive TypeScript coverage
- Separate type files for complex components
- Shared types in dedicated directory

### **4. Service Layer**

- All external API calls in service files
- Clean separation between UI and business logic
- Centralized error handling

### **5. Testing Strategy**

- Component tests for all components
- Comprehensive mocking for external dependencies

---

## 🚀 Getting Started

1. **Install dependencies**: `yarn install`
2. **Set up environment**: Create `.env.local` file with required environment variables
3. **Run development**: `yarn dev`
4. **Run tests**: `yarn test:ci`

---

_This documentation is maintained by the development team. Update when project structure changes._
