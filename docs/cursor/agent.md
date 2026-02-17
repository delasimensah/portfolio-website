# Cursor Agent

The Agent is Cursor’s assistant that can run complex coding tasks on its own: edit code, run terminal commands, search the codebase, and use the web. Open it in the side pane with **Cmd+I** (Mac) / **Ctrl+I** (Windows/Linux).

**Use this doc when:** You want to understand how Agent works, what tools it has, or how to use checkpoints, queued messages, or export. To add context to your prompts (files, folders, code, docs, past chats), see [@ Mentions](./at-mentions.md).

**For tools and UI:** [Cursor docs – Agent](https://docs.cursor.com/agent/overview).

---

## How Agent works

Agent is built from three pieces:

1. **Instructions** – The system prompt and your [Rules](./rules.md) that steer how the agent behaves.
2. **Tools** – What the agent can do: edit files, search the codebase, run the terminal, fetch from the web, etc.
3. **User messages** – Your prompts and follow-ups that tell the agent what to do.

Cursor wires these together for each supported model and keeps model-specific tuning up to date so you can focus on building; the agent handles the rest.

More: [How agents work](https://learn.cursor.com/agents).

---

## Modes

Agent can run in different **modes** for different tasks: **Agent** (default, full power), **Ask** (read-only), **Plan** (plan first, then build), and **Debug** (hypothesis + instrumentation + targeted fix). Each mode enables different tools and behavior.

**Shortcuts:** Use the mode dropdown in Agent, or **Cmd+.** / **Ctrl+.** to switch. See [Agent modes](./agent-modes.md) for when to use each mode, custom slash commands, and settings.

---

## Tools

Tools are what Agent uses to get work done. There is **no limit** on how many tool calls it can make in a single task.

- **Semantic search** — Find code by meaning (natural language), not just text.
- **Search files and folders** — Find files and folders by name or path.
- **Web** — Search or fetch information from the internet.
- **Fetch Rules** — Load and use your project and Cursor rules.
- **Read files** — Open and read file contents.
- **Edit files** — Create, change, or delete code in files.
- **Run shell commands** — Execute commands in the terminal. See [Terminal](./terminal.md) for sandbox, allowlist, and Auto-Run.
- **Browser** — Interact with or inspect web pages (navigate, click, type, screenshot, console, network). See [Browser](./browser.md).
- **Image generation** — Generate images from descriptions.
- **Ask questions** — Ask you clarifying questions. While waiting for your reply, the agent can keep reading files, editing, or running commands; your answer is used as soon as it’s sent.
- **Task (subagents)** — Delegate work to specialized subagents (own context, parallel, or sequential). See [Subagents](./subagents.md).

Under the hood: [Tool calling fundamentals](https://learn.cursor.com/tool-calling).

---

## Message summarization

As the conversation gets long, Cursor **summarizes and compresses context** so the chat stays within the model’s context window and stays efficient. Files and older messages can be condensed; you can still keep working without losing the thread.

### Using `/summarize`

You can trigger summarization yourself with the **`/summarize`** command in chat. Use it when the conversation is getting very long and you want to free up context without losing important information.

More: [Context](https://learn.cursor.com/context).

---

## Checkpoints

**Checkpoints** are automatic snapshots of the changes Agent has made to your code. You can **undo** those changes by restoring a checkpoint.

- **How to restore:** Use “Restore Checkpoint” on a previous request, or the **+** button when you hover over a message.
- **Where they live:** Stored **locally** on your machine, **separate from Git**.
- **When to use:** To undo Agent edits. For real version history and sharing, use **Git**.

---

## Export and share

- **Export:** From the context menu, choose **“Export Chat”** to save the Agent conversation as a markdown file.
- **Share:** Share a read-only link so others can view the chat and optionally fork it to continue in their own Cursor.

Sharing needs a **paid plan**. Common secrets are auto-redacted; sharing is **disabled in Privacy Mode**.

---

## Queued messages

You can **queue** follow-up messages while Agent is still working. Your next instructions wait in line and run automatically when the current task is done.

### How to use the queue

1. While Agent is working, type your next instruction.
2. Press **Enter** to **add it to the queue** (it will run after the current task).
3. Queued messages appear in order below the active task.
4. **Drag** to reorder queued messages if you want.
5. Agent works through them one after another.

### Shortcuts

- **Queue** (wait until Agent finishes) — **Enter**
- **Send immediately** (skip queue, run now) — **Cmd+Enter** (Mac) / **Ctrl+Enter** (Windows/Linux)

### Sending immediately (Cmd+Enter / Ctrl+Enter)

When you use **Cmd+Enter** / **Ctrl+Enter**, your message is **not** queued. It is attached to the most recent user message and sent right away so the agent can react to it immediately. Use this when you need to **interrupt or redirect** the current work (e.g. “stop and do X instead”).

---

## See also

- [Cloud Agents](./cloud-agents.md) – Async agents in a remote environment
- [Parallel Agents](./parallel-agents.md) – Run multiple agents in worktrees or Best-of-N across models
- [Common Agent Workflows](./agent-workflows.md) – TDD, git commands, onboarding, diagrams, hooks, design-to-code
- [@ Mentions](./at-mentions.md) – Attach files, folders, code, docs, past chats to prompts
- [Subagents](./subagents.md) – Delegation, built-in vs custom, when to use vs skills
- [Hooks](./hooks.md) – Observe, block, or extend the agent loop with custom scripts
- [Agent security](./agent-security.md) – Guardrails, approval defaults, .cursorignore, workspace trust
- [Browser](./browser.md) – Agent-controlled browser, design sidebar, security, Enterprise
- [Terminal](./terminal.md) – How Agent runs commands, sandbox, allowlist, Auto-Run settings
- [Review](./review.md) – Reviewing agent diffs, accept/reject, Agent Review for bugs
- [Agent modes](./agent-modes.md) – Agent / Ask / Plan / Debug, custom commands, switching, settings
- [Cursor concepts overview](./cursor-concepts-overview.md) – Agent, Rules, Context, etc.
- [Rules](./rules.md) – Project, User, Team rules, AGENTS.md
- [Models](./models.md) – Which models the agent can use
- [Learn – How agents work](https://learn.cursor.com/agents)
- [Learn – Tool calling](https://learn.cursor.com/tool-calling)
- [Learn – Context](https://learn.cursor.com/context)
