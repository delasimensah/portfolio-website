# Subagents

**Subagents** are specialized AI assistants the main Agent can delegate work to. Each runs in its own context window, does a specific kind of task, and returns a result to the parent. Use them to break down complex work, run tasks in parallel, and keep the main conversation’s context clean.

Subagents work in the editor, CLI, and [Cloud Agents](https://docs.cursor.com/cloud-agent).

**Use this doc when:** You want to understand built-in vs custom subagents, when to delegate vs use skills, or how to create and invoke subagents.

**For schemas and options:** [Cursor docs – Subagents](https://docs.cursor.com/agent/subagents).

---

## Benefits

- **Context isolation** — Each subagent has its own context. Long research or exploration doesn’t fill the main chat.
- **Parallel execution** — Run multiple subagents at once for different parts of the codebase.
- **Specialized expertise** — Custom prompts, tool access, and models per subagent for domain-specific work.
- **Reusability** — Define subagents once and use them across projects.

**Plan note:** On legacy **request-based** plans you must enable [Max Mode](./models.md#max-mode) to use subagents. **Usage-based** plans have subagents on by default.

---

## How subagents work

When the Agent hits a complex task, it can **launch a subagent**. The subagent gets a prompt with the needed context, runs on its own, and returns a final message with results. Subagents start with **clean context**—they don’t see prior conversation history; the parent packs the prompt with what’s relevant.

### Foreground vs background

- **Foreground** — Waits until the subagent finishes, then returns the result.; Sequential work where you need the output.
- **Background** — Returns immediately; the subagent keeps running.; Long-running or parallel work.

---

## Built-in subagents

Cursor ships three built-in subagents for context-heavy work:

- **Explore** — Search and analyze the codebase; Exploration produces lots of intermediate output; isolating it keeps the main context small. Uses a faster model for many parallel searches.
- **Bash** — Run sequences of shell commands; Command output is verbose; keeping it in a subagent keeps the parent focused on decisions.
- **Browser** — Control the browser via MCP; DOM snapshots and screenshots are noisy; the subagent filters them down to what matters.

**Why these exist:** They generate noisy intermediate output, benefit from tailored prompts and tools, and can use a lot of context. As subagents they get context isolation, model flexibility (e.g. faster model for Explore), and cost efficiency. You don’t configure them—the Agent uses them when appropriate.

---

## When to use subagents vs skills

- **You need **context isolation** for long research** — The task is **single-purpose** (e.g. generate changelog, format)
- **You’re running multiple workstreams in parallel** — You want a **quick, repeatable** action
- **The task needs specialized expertise over many steps** — The task **finishes in one shot**
- **You want **independent verification** of work** — You don’t need a **separate context window**

For simple, single-purpose tasks (e.g. “generate a changelog”, “format imports”), prefer a [skill](./agent-skills.md) or [slash command](./commands.md).

---

## Quick start

The Agent **automatically** uses subagents when it makes sense. To add **custom** subagents, create markdown files in **`.cursor/agents/`** (project) or **`~/.cursor/agents/`** (user) with YAML frontmatter and a prompt. You can also ask the Agent to create one, e.g.:

_“Create a subagent file at .cursor/agents/verifier.md with YAML frontmatter (name, description) and a prompt. The verifier should validate completed work, check implementations are functional, run tests, and report what passed vs what’s incomplete.”_

---

## Custom subagents

### File locations

- **Project** — `.cursor/agents/`; Current project
- **Project** — `.claude/agents/`, `.codex/agents/`; Current project (Claude/Codex compatibility)
- **User** — `~/.cursor/agents/`, `~/.claude/agents/`, `~/.codex/agents/`; All projects

On name conflicts, **`.cursor/`** wins over `.claude/` or `.codex/`.

### File format

Each subagent is a **markdown file** with **YAML frontmatter** and a prompt body:

```markdown
---
name: security-auditor
description: Security specialist. Use when implementing auth, payments, or handling sensitive data.
model: inherit
---

You are a security expert auditing code for vulnerabilities.

When invoked:

1. Identify security-sensitive code paths
2. Check for common vulnerabilities (injection, XSS, auth bypass)
3. Verify secrets are not hardcoded
4. Review input validation and sanitization

Report findings by severity: Critical, High, Medium.
```

### Configuration fields

- **`name`** — No; Unique id. Lowercase and hyphens. Defaults to filename without extension.
- **`description`** — No; When to use this subagent. The Agent uses this to decide delegation.
- **`model`** — No; `fast`, `inherit`, or a model ID. Default: `inherit`.
- **`readonly`** — No; If `true`, subagent has restricted write permissions.
- **`is_background`** — No; If `true`, runs in background (don’t wait for completion).

---

## Using subagents

### Automatic delegation

The Agent delegates based on task complexity, your custom subagent **descriptions**, and current context. Use phrases like “use proactively” or “always use for” in **description** to encourage automatic use.

### Explicit invocation

Call a subagent by **name** with `/` or by name in natural language:

- `/verifier confirm the auth flow is complete`
- `/debugger investigate this error`
- `/security-auditor review the payment module`

Or: _“Use the verifier subagent to confirm the auth flow is complete.”_

### Parallel execution

Ask for parallel work; the Agent can send multiple Task (subagent) calls in one message:

_“Review the API changes and update the documentation in parallel.”_

---

## Resuming subagents

Subagents can be **resumed** so you can continue a previous run. Each run returns an **agent ID**. Use it to resume with full context:

_“Resume agent abc123 and analyze the remaining test failures.”_

Background subagents persist state; you can resume after they finish to keep the conversation going.

---

## Common patterns

### Verification agent

A **verifier** subagent checks that claimed work is actually done and working (tests run, edge cases considered). Reduces “marked done but incomplete” issues.

- **description:** e.g. “Validates completed work. Use after tasks are marked done to confirm implementations are functional.”
- **Prompt:** Be skeptical; verify implementations exist and work; run tests; report what passed vs what’s incomplete.

### Orchestrator pattern

For complex flows, the parent can chain specialist subagents:

1. **Planner** – Requirements and technical plan
2. **Implementer** – Build from the plan
3. **Verifier** – Confirm implementation matches requirements

Hand off with structured output so the next subagent has clear context.

---

## Example subagents

**Debugger** – Root cause analysis: capture errors and stack traces, reproduction steps, isolate failure, minimal fix, verify. Focus on root cause, not symptoms.

**Test runner** – Proactively run tests when code changes; on failure, analyze, fix while keeping test intent, re-run, report pass/fail and changes made. Use “Use proactively” in description.

Create files at `.cursor/agents/debugger.md` and `.cursor/agents/test-runner.md` with frontmatter (`name`, `description`, optional `model: fast`) and the prompt body.

---

## Best practices

- **Focused responsibility** – One clear job per subagent. Avoid generic “helper” agents.
- **Strong descriptions** – The Agent uses **description** to decide when to delegate. Be specific; test with prompts to see which subagent runs.
- **Concise prompts** – Short, direct prompts beat long ones.
- **Version control** – Commit `.cursor/agents/` so the team shares subagents.
- **Let the Agent draft first** – Ask it to create the file, then edit.
- **Hooks for output** – If subagents must write structured files, use [hooks](./hooks.md) to process and save results.

### Anti-patterns

- **Vague descriptions** – “Use for general tasks” gives no signal. Prefer e.g. “Use when implementing OAuth auth flows.”
- **Very long prompts** – They don’t make the subagent smarter; they slow it down and are hard to maintain.
- **Duplicating slash commands** – Single-purpose, no context isolation → use a [slash command](./commands.md) or [skill](./agent-skills.md).
- **Too many subagents** – Start with 2–3 focused ones; add more only for clear, distinct use cases.

---

## Performance and cost

- **Context isolation** — Startup overhead (each subagent builds its own context)
- **Parallel execution** — Higher token use (multiple contexts at once)
- **Specialized focus** — Can be slower than main agent for simple tasks

- **Subagents use tokens separately** – Each has its own context. Five subagents in parallel ≈ five times the tokens of one agent.
- **Overhead** – For quick, simple tasks the main agent is often faster. Subagents pay off for complex, long, or parallel work.
- **Speed** – The win is isolation and specialization, not raw speed. A subagent on a trivial task may be slower than the main agent.

---

## Managing subagents

- **Creating** – Add `.md` files to `.cursor/agents/` (project) or `~/.cursor/agents/` (user), or ask the Agent to create one (e.g. “Create a subagent at .cursor/agents/security-reviewer.md that checks for injection, XSS, hardcoded secrets”).
- **Viewing** – List files in `.cursor/agents/`; the Agent sees all custom subagents as available tools.

---

## FAQ

- **Built-in subagents?** Explore (codebase search), Bash (shell commands), Browser (MCP browser tools). They’re used automatically when appropriate.
- **Can subagents launch subagents?** Behavior may depend on Cursor version; check the latest docs.
- **See what a subagent is doing?** Subagent activity appears in the Agent UI when it’s running; you can also use [hooks](./hooks.md) (`subagentStart`, `subagentStop`) to observe.
- **If a subagent fails?** The parent receives the failure; you can retry or adjust the task. Use hooks for error handling or retries.
- **MCP in subagents?** Check current Cursor docs for MCP availability in subagent context.
- **Debugging a misbehaving subagent?** Refine **description** and prompt; test with explicit `/name` invocations; check hooks for input/output.
- **Why can’t I use subagents?** On **legacy request-based** plans, enable [Max Mode](./models.md#max-mode) from the model picker. Usage-based plans have them on by default.

---

## See also

- [Agent](./agent.md) – How the Agent and Task tool work
- [Agent modes](./agent-modes.md) – Modes and when to use them
- [Agent Skills](./agent-skills.md) – When to use skills instead of subagents
- [Commands](./commands.md) – Slash commands for single-purpose tasks
- [Hooks](./hooks.md) – `subagentStart` / `subagentStop` for observation and control
- [Cursor docs – Subagents](https://docs.cursor.com/agent/subagents)
