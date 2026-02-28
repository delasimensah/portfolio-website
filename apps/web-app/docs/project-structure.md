# Project Structure

> **Purpose**: Overview of the portfolio web app structure and organization.

## Root Level Structure

```
web-app/
├── app/                    # Next.js App Router directory
├── components/             # Reusable UI components
├── constants/              # App constants (colors, fonts, assets)
├── docs/                   # Project documentation
├── hooks/                  # Custom React hooks
├── services/               # API and external service integrations (if needed)
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions and helpers
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## App Directory (`app/`)

**Next.js App Router file-based routing:**

```
app/
├── layout.tsx              # Root layout with metadata
├── providers.tsx           # Client providers (Mantine, Notifications)
├── page.tsx                # Home page
└── globals.css             # Global styles
```

Add new pages as `app/[route]/page.tsx` for routes like `/about`, `/projects`, etc.

## Components Directory (`components/`)

**Organized by feature and type:**

```
components/
├── index.ts                # Barrel export file
├── ui/                     # Base UI components (Text, Heading, Skeleton)
├── shared/                 # Shared components (LoadingScreen)
└── [feature]/              # Feature-specific components
```

**Component structure:**

```
ComponentName/
├── ComponentName.tsx       # Component implementation
└── ComponentName.test.tsx  # Tests (REQUIRED)
```

No `index.ts` files inside individual component folders.

## Utils Directory (`utils/`)

```
utils/
├── index.ts                # Barrel export file
├── cn.ts                   # Class name utility (tailwind-merge)
└── notificationUtils.ts    # Mantine notification helpers
```

## Constants Directory (`constants/`)

```
constants/
├── index.ts                # Barrel export file
├── colors.ts               # Color palette
├── fonts.ts                # Font definitions
└── assets.ts               # Asset paths
```

## Key Patterns

- **Barrel exports** — Every top-level directory has an `index.ts` file
- **Component tests** — All components require a test file
- **Tailwind** — Use Tailwind for styling; use `cn()` for conditional classes
- **Colors** — Use `COLORS` from `@/constants`; no hardcoded hex values
