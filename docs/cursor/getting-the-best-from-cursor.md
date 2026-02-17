# Getting the best out of Cursor (without the frustration)

Short reference so you can get good results from Cursor and avoid common friction with the agent.

---

## 1. Agent vs Chat — what’s the difference?

**Chat** is the conversation interface: the place where you talk to the AI. It has tabs, history, checkpoints, and export. You use it for explanations, step-by-step help, and back-and-forth.

**Agent** is the *mode* that can actually *do* things in that conversation: edit files, run terminal commands, search the codebase, use the browser. You open the Agent side panel with **Cmd+I** (Mac) / **Ctrl+I** (Windows/Linux) and describe a goal; it then plans and applies changes using its tools.

So: **Chat** = where you have the conversation. **Agent** = the “do it for me” mode inside that conversation (vs **Ask** = read-only, **Plan** = plan first then build, **Debug** = investigate then fix). When you want code changed or commands run, you’re using Agent mode in Chat.

---

## 2. How to reference code snippets

The reliable way to send a **specific code selection** to the agent (so it sees only that snippet, not the whole file):

- **Selection shortcut** — Select the code in the editor, then **Cmd+Shift+L** / **Ctrl+Shift+L** to add that selection to the chat as context. This works regardless of which @ menu options your Cursor version shows.
- **Clipboard** — Copy the code (Cmd+C / Ctrl+C). In chat: **Cmd+V** / **Ctrl+V** to add it as context, or **Cmd+Shift+V** / **Ctrl+Shift+V** to paste it into the input box.

Some Cursor versions or builds may show an **@Code** (or similar) option when you type **@**; if you see it, you can use it to attach a selection. In Cursor 2.0 many @ menu items were reduced, so if you don’t see @Code, use the selection shortcut above.

Using snippets (instead of whole files) keeps context focused and often gives better, more relevant edits.

---

## 3. How to reference previous chats

- Type **@** in the chat input.
- Choose **@Past Chats** (or the equivalent in the dropdown) and pick the conversation you want.
- Recent chats usually appear at the top.

The agent can see that conversation’s history (messages, code changes, tool results) and continue from there. Use this when you’re building on earlier work, debugging across sessions, or reminding the agent of past decisions.

---

## 4. Tips to reduce frustration

**Give clear context**

- Attach the right files or snippets (**@Files**, **@Folders**, or select code and **Cmd+Shift+L**) instead of assuming the agent “knows” the file.
- Point to project conventions: e.g. “follow `apps/web-app/docs/developer-decision-guide.md`” or “use patterns from AGENTS.md”.

**Be specific in prompts**

- Name files, components, or flows you care about.
- Break big tasks into small, verifiable steps (e.g. “add the API function first, then the UI”) so the agent has a clear target.

**Use the right mode**

- **Ask** — When you only want explanations or exploration (read-only; no edits).
- **Plan** — When the work is complex or multi-file; review and edit the plan, then trigger “build”. If the agent built the wrong thing, refine the plan and re-run instead of patching with more prompts.
- **Debug** — When the bug is tricky; let the agent use hypotheses and instrumentation, then a targeted fix.

**Control the queue**

- **Enter** — Adds your message to the queue (runs after the current task).
- **Cmd+Enter** / **Ctrl+Enter** — Sends immediately (e.g. to interrupt or redirect: “stop and do X instead”).

**Start a new chat when**

- You’re switching to a different task.
- The agent keeps repeating the same mistake or going in circles.
- The thread is long and noisy; a fresh chat with a short, focused prompt often works better.

**Undo agent edits**

- Use **Restore Checkpoint** (or the **+** on a message) to undo a batch of agent changes. Checkpoints are local only; use Git for real version history and sharing.

**Mention the stack**

- When you care about a specific framework or library, say it in the prompt (e.g. “Using Next.js App Router and Mantine, add…”) so the agent uses the right docs and patterns.

---

## 5. Quick reference

- **Reference a code snippet** — Select code in editor → **Cmd+Shift+L** / **Ctrl+Shift+L** (add selection to chat).
- **Reference a previous chat** — Type @ → pick @Past Chats → select conversation.
- **Send a message now (don't queue)** — Cmd+Enter / Ctrl+Enter.
- **Queue a message for after current task** — Enter.
- **Switch mode (Agent / Ask / Plan / Debug)** — Cmd+. / Ctrl+. or Shift+Tab.
- **Undo agent's changes** — Restore Checkpoint or + on message.
- **Read-only answers (no edits)** — Use Ask mode.
- **Complex or multi-file task** — Use Plan mode; edit plan, then build.

---

## See also

- [Cursor concepts overview](./cursor-concepts-overview.md) — Tab, Agent, Chat, Rules, Context
- [@ Mentions](./at-mentions.md) — Files, folders, Docs, Past Chats in detail
- [Working with agents](./working-with-agents.md) — Prompting, context, Plan/Debug, review
- [Agent modes](./agent-modes.md) — When to use Agent vs Ask vs Plan vs Debug
