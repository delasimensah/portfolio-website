# Delasi Mensah — Portfolio Website

Personal portfolio website showcasing product builds, services, pricing, and a contact form. Built with Next.js, Mantine, and Tailwind CSS. Deployed on Vercel.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: Mantine + Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Resend (contact form submissions)
- **Language**: TypeScript
- **Monorepo**: Turborepo + Yarn workspaces

---

## Project Structure

```
portfolio-website/
├── apps/
│   └── web-app/           # Next.js portfolio site
│       ├── app/           # App Router pages and API routes
│       ├── components/    # UI components
│       ├── constants/     # Colors, fonts, assets
│       ├── utils/         # Data and helpers
│       └── docs/          # Web app documentation
├── docs/                  # Project-wide documentation
├── vercel.json            # Vercel deployment config
└── turbo.json             # Turborepo config
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn >= 1.22

### Install dependencies

```bash
yarn install
```

### Environment variables

Create `apps/web-app/.env.local`:

```
RESEND_API_KEY=your_resend_api_key
```

### Start development server

```bash
yarn dev:web
```

Site runs at `http://localhost:3001`.

---

## Commands

```bash
# Development
yarn dev:web             # Start the web app

# Code quality
yarn lint                # Lint all code
yarn lint:fix            # Auto-fix lint issues
yarn type-check          # TypeScript type check
yarn format              # Format with Prettier

# Testing
yarn test:web            # Run web app tests
yarn test:web --watch    # Watch mode
```

---

## Deployment

The site is deployed to Vercel from the monorepo root using the Vercel CLI.

```bash
vercel --prod
```

See [Deployment Guide](./docs/deployment-guide.md) for the full setup and CLI walkthrough.

---

## Documentation

- [Deployment Guide](./docs/deployment-guide.md)
- [Web App Project Structure](./apps/web-app/docs/project-structure.md)
- [Developer Decision Guide](./apps/web-app/docs/developer-decision-guide.md)
- [Component Building Guide](./docs/component-building-guide.md)
- [Testing Strategy](./docs/testing-strategy.md)
