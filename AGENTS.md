# Agent instructions for this project

This is a **Turborepo monorepo** with a **Next.js** web app, an **Expo (React Native)** mobile app, and a **shared** package. Use **official documentation** for all frameworks and libraries so implementations stay correct and up to date.

## Code organization and style

**Follow this repo's code organization and style to the letter.** A Cursor project rule (`.cursor/rules/code-organization-and-style.mdc`) is applied to every chat with the full conventions. In summary:

- **Web app:** Follow `apps/web-app/docs/project-structure.md` and `apps/web-app/docs/developer-decision-guide.md`.
- **Mobile app:** Follow `apps/mobile-app/docs/project-structure.md`, `apps/mobile-app/docs/developer-decision-guide.md`, and `apps/mobile-app/docs/adding-screens-guide.md`.
- **Shared package:** Follow `packages/shared/docs/contributing-guide.md`.
- **Imports, exports, component placement:** Follow `docs/import-patterns-guide.md`, `docs/export-patterns-guide.md`, `docs/component-organization-guide.md`.

Components go in folders with tests; no `index.ts` inside component or service/hook subdirectories; use `@/` for cross-folder imports; barrel exports from top-level `index.ts` only. When adding screens, components, hooks, or services, read the relevant docs above first.

## Project and feature planning

When planning a **new project** or **major feature**, read and apply:

- **`docs/system-design/README.md`** — Scope, stack mapping, when to use system design.
- **`docs/system-design/principles.md`** — Core principles (from System Design School links) mapped to this stack.
- **`docs/system-design/planning-checklist.md`** — Checklist to work through; then produce a short, actionable plan.

A Cursor rule (`.cursor/rules/system-design-planning.mdc`) reminds the agent to use these when the user asks for project or feature planning.

## Stack and official docs

Prefer the following official sources when implementing features, fixing bugs, or answering questions. Add these as **@Docs** in Cursor (Settings → Indexing & Docs) so the agent can search them.

### Monorepo & tooling

- **Turborepo:** https://turbo.build/repo/docs  
- **TypeScript:** https://www.typescriptlang.org/docs/  
- **Yarn workspaces:** https://classic.yarnpkg.com/en/docs/workspaces/

### Web app (`apps/web-app`)

- **Next.js:** https://nextjs.org/docs  
- **React:** https://react.dev/reference  
- **Mantine:** https://mantine.dev/  
- **Refine:** https://refine.dev/docs/  
- **TanStack Query:** https://tanstack.com/query/latest/docs/react/overview  
- **TanStack Table:** https://tanstack.com/table/latest  
- **Supabase (JS/SSR — server-side rendering):** https://supabase.com/docs/reference/javascript  
- **React Hook Form:** https://react-hook-form.com/  
- **Zod:** https://zod.dev/  
- **Tailwind CSS:** https://tailwindcss.com/docs  

### Mobile app (`apps/mobile-app`)

- **Expo:** https://docs.expo.dev/  
- **Expo Router:** https://docs.expo.dev/router/introduction/  
- **React Native:** https://reactnative.dev/docs/getting-started  
- **React Navigation:** https://reactnavigation.org/docs/getting-started  
- **NativeWind:** https://www.nativewind.dev/  
- **Supabase (JS):** https://supabase.com/docs/reference/javascript  
- **TanStack Query:** https://tanstack.com/query/latest/docs/react/overview  
- **React Hook Form:** https://react-hook-form.com/  
- **Zod:** https://zod.dev/  

### Shared (`packages/shared`) & backend

- **Supabase:** https://supabase.com/docs  
- **TanStack Query:** https://tanstack.com/query/latest  
- **Zustand:** https://zustand.docs.pmnd.rs/  
- **Zod:** https://zod.dev/  

### Database & local dev

- **Supabase (local, CLI, API):** https://supabase.com/docs  

Rules in `.cursor/rules` tell the agent when to use these docs and how to scope by path (e.g. `official-documentation.mdc`).

## How to get the best results

1. **Add the docs above to Cursor** — In Cursor: **Settings → Indexing & Docs** (or **@Docs** → Add new doc). Paste each documentation base URL (e.g. `https://nextjs.org/docs`, `https://docs.expo.dev/`) so Cursor indexes them. Then the agent can use **@Docs** to pull in official guidance.
2. **Use project rules** — See `.cursor/rules/` for rules that remind the agent to follow official documentation for this stack.
3. **Mention the stack in prompts** — e.g. “Using Next.js App Router and Mantine, add a form that…” so the agent selects the right docs and patterns.
