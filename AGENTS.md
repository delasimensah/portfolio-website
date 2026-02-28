# Agent instructions for this project

This is a **portfolio website** built with **Next.js** and **Mantine**. Use **official documentation** for all frameworks and libraries so implementations stay correct and up to date.

## Code organization and style

**Follow this repo's code organization and style to the letter.** A Cursor project rule (`.cursor/rules/code-organization-and-style.mdc`) is applied to every chat with the full conventions. In summary:

- **Web app:** Follow `apps/web-app/docs/project-structure.md` and `apps/web-app/docs/developer-decision-guide.md`.
- **Imports, exports, component placement:** Follow `docs/import-patterns-guide.md`, `docs/export-patterns-guide.md`, `docs/component-organization-guide.md`.

Components go in folders with tests; no `index.ts` inside component subdirectories; use `@/` for cross-folder imports; barrel exports from top-level `index.ts` only.

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
- **Tailwind CSS:** https://tailwindcss.com/docs

Rules in `.cursor/rules` tell the agent when to use these docs and how to scope by path (e.g. `official-documentation.mdc`).

## How to get the best results

1. **Add the docs above to Cursor** — In Cursor: **Settings → Indexing & Docs** (or **@Docs** → Add new doc). Paste each documentation base URL so Cursor indexes them.
2. **Use project rules** — See `.cursor/rules/` for rules that remind the agent to follow official documentation for this stack.
3. **Mention the stack in prompts** — e.g. "Using Next.js App Router and Mantine, add a section that…" so the agent selects the right docs and patterns.
