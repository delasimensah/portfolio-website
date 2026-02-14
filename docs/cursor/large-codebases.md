# Large Codebases

Short guide for working in **large or unfamiliar** repos with Cursor.

**Use this doc when:** You want to onboard faster, document conventions, plan larger changes, or choose the right Cursor tool (Tab vs Inline Edit vs Chat).

---

In large codebases:

- **Use Chat (Agent)** to ask “where is X?” and “how does Y work?” — the Agent uses [semantic search](./semantic-search.md) and file reads to find and explain code.
- **Write [Rules](./rules.md)** for domain knowledge and conventions (how to add a service, formatting, globs) so the Agent has the full picture.
- **Plan with [Ask mode](./agent-modes.md), implement with [Agent mode](./agent.md)** — use Ask to draft a plan with context from tickets/docs; then switch to Agent to execute.
- **Pick the right tool:** [Tab](./tab.md) for quick single-file edits, **Inline Edit** (Cmd/Ctrl+K) for scoped changes in one file, **Chat** for multi-file or exploratory work. Use [@files](./at-mentions.md) and [@folder](./at-mentions.md) to give Chat context; start new chats when switching tasks.

---

## See also

- [Agent](./agent.md) | [Agent modes](./agent-modes.md) — Ask vs Agent, when to use each
- [Rules](./rules.md) — Project rules, globs, descriptions
- [@ Mentions](./at-mentions.md) — Files, folders, code
- [Tab](./tab.md) — Completions and quick edits
- [Cursor concepts overview](./cursor-concepts-overview.md)
