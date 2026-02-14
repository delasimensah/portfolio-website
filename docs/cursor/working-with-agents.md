# Working with agents

Short reference for getting good results from the Cursor agent in this project. For modes and tools, see [Agent](./agent.md), [Agent modes](./agent-modes.md), and [Common Agent Workflows](./agent-workflows.md).

## Prompting

- **Be specific.** Reference files (`@file` or `{{file:path}}`), existing components, and docs (e.g. `apps/web-app/docs/developer-decision-guide.md`) so the agent follows this repo’s patterns instead of inventing new ones.
- **Point to conventions.** Mention AGENTS.md, `.cursor/rules`, or the relevant project-structure / developer-decision guide when the task touches structure, imports, or app layout.
- **Break big work into steps.** One large request often leads to scope creep; smaller, verifiable steps get better results.

## Context

- Start a **new chat** when switching to a different task or when the agent keeps making the same mistakes.
- **Reuse past chats** with `@Past Chats` or `{{chat:name}}` when continuing the same feature so the agent keeps context.
- Prefer **@file** when you know the file; use a short description and let semantic search find the rest when you don’t.

## Features and planning

- Use **Plan mode** (e.g. Shift+Tab) for non-trivial features: get a step-by-step plan, edit it, then Build. See [Agent modes](./agent-modes.md).
- For **new projects or major features**, the agent is instructed to use `docs/system-design/` (README, principles, planning checklist); you can say “follow the system-design planning checklist” in the prompt.
- If the agent builds the wrong thing, **revert and refine the plan** rather than patching with follow-up prompts.

## Debugging

- For **tricky bugs**, use **Debug mode** so the agent gathers evidence (hypotheses, logging, reproduction, analysis) before proposing a fix.
- **Paste runtime evidence** (stack traces, `EXPLAIN ANALYZE`, logs) when code inspection alone isn’t enough.
- For **simple errors** with clear messages, paste the error and a one-line context; the agent can often fix directly.

## Review and quality

- **Self-review:** Use `@Branch` and ask the agent to review your changes for bugs and pattern consistency before you push.
- Use **Agent Review** (e.g. Source Control → Find Issues) on your diff vs main.
- Prefer **small, semantic commits** for reviewability; when a feature is done, you can ask the agent to rework the commit history (e.g. via a skill).

## How this ties to this repo

- **AGENTS.md** and **.cursor/rules** tell the agent how to organize code and when to use system-design docs; they’re always applied.
- **docs/cursor/** (this folder) holds Cursor-specific how-tos; the agent can search or be pointed here for workflows and setup.
- **docs/system-design/** is for planning and design; the agent is instructed to use it for new projects and major features.
