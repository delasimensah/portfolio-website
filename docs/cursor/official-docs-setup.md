# Using official documentation with the Agent

This project is set up so the Agent **prefers official documentation** for the monorepo stack (Next.js, Expo, Supabase, Mantine, Refine, TanStack, etc.). That leads to more accurate, up-to-date code and answers.

**Use this doc when:** You want agents to follow official docs for this repo’s technologies, or you need to add or change which doc sites are used.

---

## What’s already in place

1. **AGENTS.md** (project root) — Lists the full stack and **official doc URLs** for each technology. The Agent is instructed to prefer these sources.
2. **.cursor/rules/official-documentation.mdc** — A project rule (applies when working under `apps/` or `packages/`) that tells the Agent to prefer official docs and use **@Docs** when available. It points to AGENTS.md for the canonical list.

---

## One-time setup: add doc sites to Cursor

For the Agent to **search** official docs (not just be reminded of their URLs), add the documentation sites to Cursor’s index:

1. Open **Cursor Settings** → **Indexing & Docs** (or **Features** → **Docs**, depending on version).
2. Or in Chat, type **@Docs** → **Add new doc**.
3. Paste the **base URL** of each documentation site you care about. Examples from this repo:
   - `https://nextjs.org/docs`
   - `https://docs.expo.dev/`
   - `https://supabase.com/docs`
   - `https://mantine.dev/`
   - `https://refine.dev/docs/`
   - `https://tanstack.com/query/latest`
   - `https://react.dev`
   - `https://zod.dev`
   - (See **AGENTS.md** at the repo root for the full list.)

4. Use a **trailing slash** for the base URL when you want the whole site indexed (e.g. `https://docs.expo.dev/`).
5. Turn on **Share with team** if you want the doc available for everyone on the project.

Cursor will index these sites so the Agent can pull in relevant sections when you use **@Docs** or when the rule suggests it.

---

## Using it in chat

- **@Docs** — In any chat, type **@Docs** and select one or more doc sources (e.g. Next.js, Expo). The Agent will use them as context.
- **Mention the stack** — In your prompt, name the tech you care about: e.g. “Using Next.js App Router and Mantine, add a form that…” so the Agent picks the right docs and patterns.
- **Scoped by path** — The rule applies when you’re in `apps/web-app`, `apps/mobile-app`, or `packages/shared`, so the Agent is reminded to use the right docs for each area.

---

## Adding or changing technologies

When you add a new framework or library to the monorepo:

1. Add its **official doc URL** to **AGENTS.md** in the right section (web app, mobile app, or shared).
2. Add the same URL in **Cursor Settings → Indexing & Docs** (or @Docs → Add new doc) so it’s indexed.
3. The rule **.cursor/rules/official-documentation.mdc** points to AGENTS.md for the stack and doc URLs; update that rule only if you want different path-scoping or reminders.

---

## See also

- [Rules](./rules.md) — How project rules work, globs, descriptions
- [@ Mentions](./at-mentions.md) — @Docs, @Files, @Code
- **AGENTS.md** (project root) — Full stack and doc URL list
