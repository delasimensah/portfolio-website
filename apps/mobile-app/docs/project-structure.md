# 📁 Project Structure

> **Purpose**: Complete overview of the mobile app project structure and organization.

## 🏗️ Root Level Structure

```
mobile-app/
├── app/                          # Expo Router app directory
├── components/                   # Reusable UI components
├── constants/                    # App constants (colors, fonts, etc.)
├── docs/                        # Project documentation
├── hooks/                       # Custom React hooks
├── services/                    # API and external service integrations
├── types/                       # TypeScript type definitions
├── utils/                       # Utility functions and helpers
├── __mocks__/                   # Jest mocks for testing
├── __tests__/                   # Test files
├── app.config.ts                # Expo configuration
├── eas.json                     # EAS Build configuration
├── jest.setup.ts                # Jest test setup
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── eslint.config.js             # ESLint configuration
└── yarn.lock                    # Dependency lock file
```

## 📱 App Directory (`app/`)

**Expo Router file-based routing structure:**

```
app/
├── _layout.tsx                  # Root layout with auth logic
├── (auth)/                      # Authentication group
│   ├── _layout.tsx             # Auth layout
│   ├── index.tsx               # Welcome screen
│   ├── sign-in.tsx             # Sign in screen
│   ├── sign-up.tsx             # Sign up screen
│   ├── forgot-password.tsx     # Password reset screen
│   └── verify-email.tsx        # Email verification screen
├── (onboarding)/               # Onboarding group
│   ├── _layout.tsx             # Onboarding layout
│   ├── index.tsx               # Intro screen
│   └── [onboarding-screens].tsx
└── (main-app)/                 # Main app group
    ├── _layout.tsx             # Main app layout
    └── (tabs)/                 # Tab navigation
        ├── _layout.tsx         # Tab layout
        ├── tab1/               # Tab 1
        │   ├── _layout.tsx     # Tab 1 layout
        │   └── index.tsx       # Tab 1 screen
        ├── tab2/               # Tab 2
        │   ├── _layout.tsx     # Tab 2 layout
        │   └── index.tsx       # Tab 2 screen
        └── tab3/               # Tab 3
            ├── _layout.tsx     # Tab 3 layout
            └── index.tsx       # Tab 3 screen
```

**Note:** Replace `tab1`, `tab2`, `tab3` with your app's actual tab names (e.g., `dashboard`, `browse`, `profile`).

```

## 🧩 Components Directory (`components/`)

**Organized by feature and type:**

```

components/
├── index.ts # Barrel export file
├── ui/ # Base UI components
│ ├── Button/
│ │ ├── Button.tsx # All types inline
│ │ └── Button.test.tsx
│ └── Text/
│ ├── Text.tsx # All types inline
│ └── Text.test.tsx
├── navigation/ # Navigation components
│ ├── Header/
│ │ ├── Header.tsx # All types inline
│ │ └── Header.test.tsx
│ └── TabBar/
│ ├── TabBar.tsx # All types inline
│ └── TabBar.test.tsx
├── shared/ # Shared components
│ └── ProductCard/
│ ├── ProductCard.tsx # All types inline
│ └── ProductCard.test.tsx
├── bottom-sheets/ # Bottom sheet components
│ └── BottomSheetManager/
│ ├── BottomSheetManager.tsx
│ └── BottomSheetManager.test.tsx
└── [feature]/ # Feature-specific components
└── ComponentName/
├── ComponentName.tsx
└── ComponentName.test.tsx

```

**IMPORTANT:**
- ALL components MUST be in folders (not loose files)
- ALL components MUST have tests
- NO index.ts files in component folders
- All types stay with component (inline)
- No separate .types.ts files

## 🔧 Services Directory (`services/`)

**External service integrations:**

```

services/
├── index.ts # Barrel export file
├── supabase/ # Supabase integration
│ └── client.ts # Supabase client configuration
├── auth/ # Authentication services
│ └── authService.ts # Native OAuth wrappers
└── api/ # API services
└── client.ts # API client configuration

````

**🚨 CRITICAL:** NO index.ts files in subdirectories (supabase, auth, api, etc.)

**Pattern:**

```typescript
// ✅ services/index.ts exports directly from subdirectories
export { signInWithEmail, signOutUser } from "./auth/authService";
export { supabase } from "./supabase/client";
export { apiClient } from "./api/client";

// ❌ NO services/supabase/index.ts file
// ❌ NO services/auth/index.ts file
````

## 🎣 Hooks Directory (`hooks/`)

**Custom React hooks:**

```
hooks/
├── index.ts                   # Barrel export file (ONLY top-level)
├── auth/                     # Authentication hooks
│   └── useAuthStore.ts       # Zustand auth store
├── api/                      # React Query bindings
│   └── useData.ts           # Data fetching hooks
└── navigation/               # Navigation hooks
    └── useScreenContext.ts
```

**🚨 CRITICAL:** NO index.ts files in subdirectories (auth, api, etc.)

**Pattern:**

```typescript
// ✅ hooks/index.ts exports directly from subdirectories
export { useAuthStore } from "./auth/useAuthStore";
export { useData } from "./api/useData";

// ❌ NO hooks/auth/index.ts file
```

## 📝 Types Directory (`types/`)

**TypeScript type definitions:**

```
types/
├── index.ts                  # Barrel export file
├── auth.ts                   # Authentication types
├── api.ts                    # API response types
└── user.ts                   # User-related types
```

## 🛠️ Utils Directory (`utils/`)

**Utility functions and helpers:**

```
utils/
├── index.ts                  # Barrel export file
├── cn.ts                     # Class name utility
├── navigation.ts             # Navigation utilities
└── validation.ts             # Validation utilities
```

**Key Rules:**

- **Flat structure** - All utils go directly in `/utils/` (no categories)
- **Descriptive naming** - Use clear, specific names
- **Single responsibility** - One utility file = one type of functionality
- **Must export from index** - All utils must be exported from `/utils/index.ts`
- **Must have tests** - All utils need tests in `/utils/__tests__/`

## 📊 Constants Directory (`constants/`)

**App constants:**

```
constants/
├── index.ts                  # Barrel export file
├── colors.ts                 # Color palette
├── fonts.ts                  # Font definitions
├── assets.ts                 # Asset paths
└── apiConstants.ts           # API configuration
```

## 🧪 Testing Structure

**Test organization:**

```
__tests__/
├── critical/                 # Critical flow tests
│   └── auth.test.tsx        # Authentication flow tests
└── __mocks__/               # Jest mocks
    └── [mock-files].ts
```

## 📚 Documentation Structure

**Project documentation:**

```
docs/
├── adding-screens-guide.md        # Screen creation guide
├── asset-management-guide.md      # Asset management guidelines
├── authentication-architecture.md # Auth flow documentation
├── bottom-sheet-guide.md           # Bottom sheet system
├── developer-decision-guide.md     # Development decisions
├── navigation-guide.md             # Navigation guide
├── project-structure.md            # This file
└── quick-reference-cheat-sheet.md  # Daily reference
```

## 🔧 Configuration Files

**Root level configuration:**

- **`app.config.ts`** - Expo configuration with environment variables
- **`eas.json`** - EAS Build profiles and environment mapping
- **`package.json`** - Dependencies, scripts, and Jest configuration
- **`tsconfig.json`** - TypeScript compiler options
- **`eslint.config.js`** - ESLint rules and configuration
- **`jest.setup.ts`** - Jest test environment setup

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

- Critical flow tests for authentication
- Component tests for all components
- Comprehensive mocking for external dependencies

## 🚀 Getting Started

1. **Install dependencies**: `yarn install`
2. **Set up environment**: Create `.env.local` file with required environment variables
3. **Run development**: `yarn dev`
4. **Run tests**: `yarn test:ci`

## 📋 Maintenance Guidelines

### **Adding New Components:**

1. Create component directory in appropriate folder
2. Add component file and test file
3. Export from parent index.ts
4. Update documentation if needed

### **Adding New Screens:**

1. Create screen file in appropriate app directory
2. Follow naming conventions
3. Update navigation if needed
4. Add tests for critical flows

### **Adding New Services:**

1. Create service file in services directory
2. Add to services/index.ts
3. Create tests for service functions
4. Update documentation

---

_This documentation is maintained by the development team. Update when project structure changes._
