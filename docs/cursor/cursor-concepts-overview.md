# Cursor concepts overview

Quick reference for the main Cursor concepts. Use this when you need to understand what a feature is or when to use it.

---

## Tab

**What it is:** Code completion that suggests multi-line edits. Cursor predicts what you might type next based on your current code and recent changes.

**How to use it:** Press **Tab** to accept, **Esc** to reject; **Cmd+Right** / **Ctrl+Right** to accept word-by-word.

**Use when:** You want fast, in-place code completion without opening chat or the agent.

**See also:** [Tab (full guide)](./tab.md).

---

## Agent

**What it is:** An AI that can read and change code across many files. You describe what you want in natural language and the Agent plans and applies the changes.

**How to use it:** **Cmd+I** / **Ctrl+I** to open; describe your goal in the Agent interface. It uses tools (edits, search, terminal, etc.) to complete the task.

**Use when:** You need multi-file refactors, new features, or tasks that span the codebase.

**See also:** [Agent (full guide)](./agent.md).

---

## Inline Edit

**What it is:** Edit a selected piece of code using natural language. You describe the change and see it applied in place.

**Shortcut:** **Cmd+K** (Mac) / **Ctrl+K** (Windows/Linux).

**Use when:** You want to change one snippet (e.g. “add error handling” or “rename this to use the shared type”) without writing the exact diff yourself.

---

## Chat

**What it is:** The main interface for talking to the AI. Supports multiple tabs, conversation history, checkpoints, and export.

**Use when:** You need explanations, step-by-step help, or a back-and-forth before (or instead of) using the Agent or Inline Edit.

---

## Rules

**What it is:** Custom instructions that shape how the AI behaves. You set coding standards, framework preferences, and project-specific conventions so the AI follows them automatically.

**Use when:** You want consistent style, patterns, or decisions (e.g. “always use our Supabase patterns” or “prefer this testing approach”). Rules live in `.cursor/rules/`, User Settings, Team dashboard, or `AGENTS.md`.

**See also:** [Rules (full guide)](./rules.md), [Cursor docs – Rules](https://docs.cursor.com/context/rules).

---

## Semantic Search

**What it is:** Search that finds code by **meaning**, not just exact text. You can ask in natural language (e.g. “where do we validate the user email?”) and get relevant results.

**Use when:** You or the agent need to locate logic, patterns, or behavior without knowing the exact variable or file name.

**See also:** [Semantic Search (full guide)](./semantic-search.md), [Cursor docs – Semantic Search](https://docs.cursor.com/context/semantic-search).

---

## MCP (Model Context Protocol)

**What it is:** A way to connect Cursor to external tools—databases, APIs, docs, etc. MCP “servers” expose data and actions so the AI can use them in context (e.g. query a DB or fetch docs).

**Use when:** You want the agent to use Supabase, internal APIs, or other services directly from Cursor. Setup is per “MCP server” in `.cursor/mcp.json` or via the MCP directory.

**See also:** [MCP (full guide)](./mcp.md), [Setup Supabase MCP](./setup-supabase-mcp.md) *(when available)*, [Cursor docs – MCP](https://docs.cursor.com/context/mcp).

---

## Context

**What it is:** All the information the AI has when generating or editing code: open files, symbols, conversation history, rules, and anything you or MCP add.

**Use when:** You’re debugging why the AI “didn’t know” something—often it’s about what’s in context (e.g. add the right file, rule, or MCP). Use **@** in chat to attach files, folders, code, docs, or past chats.

**See also:** [@ Mentions](./at-mentions.md), [Cursor learn – Context](https://learn.cursor.com/context).

---

## Models

**What it is:** The different AI models you can use in Cursor for completion, chat, and the agent. They differ in speed, quality, context size, and cost.

**Use when:** Choosing a model, understanding usage/cost, or debugging context limits (e.g. replies cut off, model “not seeing” a file).

**See also:** [Models (full guide)](./models.md), [Cursor docs – Models](https://docs.cursor.com/models).

---

## Quick reference

- **Tab** — Multi-line completion; press Tab to accept.
- **Agent** — AI that edits across files from a natural-language goal.
- **Inline Edit** — Cmd+K / Ctrl+K: describe a change for selected code.
- **Chat** — Multi-tab AI conversation with history.
- **Rules** — Custom instructions for consistent AI behavior.
- **Semantic Search** — Find code by meaning, not exact text.
- **MCP** — Connect external tools (DBs, APIs, docs) to Cursor.
- **Context** — Everything the AI sees when it generates or edits.
- **Models** — Different AIs with different speed/capability tradeoffs.
