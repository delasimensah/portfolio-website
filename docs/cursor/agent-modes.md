# Agent modes

Agent can run in different **modes**, each tuned for a kind of task. Each mode enables different capabilities and tools. Use this doc to choose the right mode and to configure switching and settings.

**Use this doc when:** You’re deciding between Agent / Ask / Plan / Debug, setting up custom slash commands, or configuring mode shortcuts and options.

**For mode behavior and settings:** [Cursor docs – Modes](https://docs.cursor.com/agent/modes).

---

## Modes at a glance

- **Agent** — Complex features, refactors; Explores on its own, edits many files, runs commands, fixes errors; All tools
- **Ask** — Learning, planning, questions; Read-only: searches and answers, no edits; Search tools only
- **Plan** — Complex work that needs a plan first; Researches, asks questions, writes a plan you can edit, then you trigger “build”; All tools
- **Debug** — Tricky bugs, regressions; Forms hypotheses, adds logs, uses a debug server and runtime data, then makes a targeted fix; All tools + debug server

Understanding [how agents work](https://learn.cursor.com/agents) and [tool calling](https://learn.cursor.com/tool-calling) helps you pick the right mode.

---

## Agent (default)

The default mode for **complex coding tasks**. Agent explores your codebase on its own, edits multiple files, runs commands, and fixes errors to finish your request. All tools are enabled.

**Use when:** You want the agent to implement a feature, refactor, or multi-file change without you specifying every step.

---

## Ask

**Read-only** mode for learning and exploring. Ask searches your codebase and answers questions **without making any changes**. Good for understanding code before you change it.

**Use when:** You need explanations, “how does X work?”, or to explore the codebase without risk of edits.

---

## Plan

Plan mode has the agent **create a detailed implementation plan before writing code**. It researches the codebase, asks clarifying questions, and produces a plan you can review and edit (in chat or in markdown) before you tell it to build.

**Shortcut:** **Shift+Tab** from the chat input cycles to Plan mode. Cursor may also suggest Plan mode when you use wording that suggests a complex task.

### How it works

1. Agent asks clarifying questions to understand what you want.
2. It researches your codebase and gathers context.
3. It writes an implementation plan.
4. You review and edit the plan in chat or in the generated markdown file.
5. You click to **build** the plan when you’re ready.

Plans are saved by default in your home directory. Use **“Save to workspace”** to put the plan in your project so you can share it or use it as documentation.

### When to use Plan mode

- **Complex features** with more than one reasonable approach.
- **Tasks that touch many files or systems.**
- **Unclear requirements** where you need to explore before you know the scope.
- **Architectural decisions** where you want to review the approach before any code.

For small or familiar tasks, using Agent mode directly is fine.

### Starting over from a plan

If the agent built something that doesn’t match what you wanted, **go back to the plan** instead of trying to fix it with more prompts: revert the changes, make the plan more specific, and run it again. That’s often faster and cleaner than correcting a half-done agent run.

For bigger changes, invest time in a **precise, well-scoped plan**. Figuring out _what_ should change is often the hard part—and a good fit for you. With a clear plan, you can leave implementation to the agent.

---

## Debug

Debug mode is for **finding root causes and fixing tricky bugs** that are hard to reproduce or understand. Instead of guessing and editing, the agent forms hypotheses, adds logging, and uses runtime information to pinpoint the issue before making a **targeted fix**.

### When to use Debug mode

- **Bugs you can reproduce but can’t explain** – Something is wrong but the cause isn’t obvious from reading the code.
- **Race conditions and timing issues** – Problems that depend on execution order or async behavior.
- **Performance issues and memory leaks** – When you need runtime or profiling data to understand what’s happening.
- **Regressions** – Something used to work; you need to trace what changed.

Use Debug mode when normal Agent usage isn’t enough and you want the agent to use **runtime evidence** instead of guessing.

### How it works

1. **Explore and hypothesize** – The agent looks at relevant files, builds context, and proposes possible root causes.
2. **Add instrumentation** – It adds log statements that send data to a **local debug server** (run by a Cursor extension).
3. **Reproduce the bug** – Debug mode gives you steps to reproduce; you run them so the agent can capture real runtime behavior.
4. **Analyze logs** – The agent reviews the logs and identifies the actual root cause.
5. **Make a targeted fix** – It applies a focused fix (often small) that addresses that cause.
6. **Verify and clean up** – You reproduce again to confirm; then the agent removes the instrumentation.

### Tips for Debug mode

- **Give detailed context** – Describe the bug, how to reproduce it, error messages, stack traces, and steps. Better context leads to better instrumentation.
- **Follow reproduction steps exactly** – So the logs reflect the real issue.
- **Reproduce multiple times if needed** – Helps with flaky or race-condition bugs.
- **Spell out expected vs actual behavior** – So the agent knows what “correct” looks like.

---

## Custom slash commands

For **specialized workflows**, you can define [custom slash commands](./commands.md) that combine fixed instructions with guidance on which tools to use (e.g. “only search, no edits”).

**Note:** Custom _modes_ are deprecated in Cursor 2.1. If you had custom modes, use **“Export Custom Modes”** to turn them into custom commands.

### Example: `/debug`-style command

You can create a `/debug` command that tells the agent to investigate before fixing. In the command prompt, include something like: _“Investigate using search and terminal first. Only propose fixes after you understand the root cause.”_

Custom commands can:

- Be triggered with a `/` prefix (e.g. `/debug`, `/refactor`).
- Carry instructions about tool usage in the prompt (e.g. “use only search tools—no edits or terminal”).
- Be shared with the team or stored in the project (e.g. `.cursor/commands`).

Full details: [Commands](./commands.md), [Cursor docs – Commands](https://docs.cursor.com/agent/chat/commands).

---

## Switching modes

- **Mode picker** – Use the dropdown in the Agent UI.
- **Quick switch** – **Cmd+.** (Mac) / **Ctrl+.** (Windows/Linux).
- **Shortcuts** – Configure per-mode shortcuts in [Settings](#settings).

---

## Settings

All modes share some options:

- **Model** — Which AI model the agent uses.
- **Keyboard shortcuts** — Shortcuts to switch between modes.

Mode-specific options:

- **Agent** — Auto-run; Automatically run commands.
- **Agent** — Auto-fix errors; Automatically try to fix errors.
- **Ask** — Search codebase; Automatically find relevant files.

---

## Changelog: custom modes removed

**Custom modes** have been removed from Cursor. If you used them for workflows with specific tool combinations, use **custom slash commands** instead.

Custom slash commands let you:

- Define reusable workflows with a `/` prefix.
- Put instructions (including tool limits) in the command prompt.
- Share commands with your team (team commands).
- Store commands in your project (e.g. `.cursor/commands`).

To restrict tools, add it to the command prompt (e.g. _“Use only search tools (read file, codebase search, grep)—do not edit files or run terminal commands.”_).

See the [Commands documentation](https://docs.cursor.com/agent/chat/commands) for creating and using custom slash commands.

---

## See also

- [Large Codebases](./large-codebases.md) – Plan with Ask mode, implement with Agent mode
- [Subagents](./subagents.md) – Task tool, built-in and custom subagents
- [Agent](./agent.md) – How Agent works, tools, checkpoints, queue
- [Cursor concepts overview](./cursor-concepts-overview.md)
- [Learn – How agents work](https://learn.cursor.com/agents)
- [Learn – Tool calling](https://learn.cursor.com/tool-calling)
- [Cursor docs – Commands](https://docs.cursor.com/agent/chat/commands)
