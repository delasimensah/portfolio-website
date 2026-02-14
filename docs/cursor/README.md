# Cursor documentation

Documentation for doing things the Cursor way in this project. Use these guides when you need to set up Cursor features, follow conventions, or help the agent (or yourself) find the right steps.

## How to use these docs

- **You:** When asking the agent to do something Cursor-related, you can say e.g. "check `docs/cursor`" or "follow the Supabase MCP setup in docs/cursor."
- **Agent:** Use semantic search or these file paths to find the relevant guide; follow the steps and point the user to the right doc when needed.
- **Project conventions** (code organization, system design, official docs) live in **`.cursor/rules`** and **AGENTS.md**; these docs explain Cursor features and how to configure them.

## Table of contents

- [Cursor concepts overview](./cursor-concepts-overview.md) — Tab, Agent, Inline Edit, Chat, Rules, Semantic Search, MCP, Context, Models. Use when you or the agent need a quick definition or "what's what" in Cursor.
- [Tab](./tab.md) — Tab completions, jump in/cross-file, auto-import, settings, snooze/disable. Use when: inline multi-line completion, shortcuts, or turning Tab off.
- [Semantic Search](./semantic-search.md) — How indexing works, semantic vs grep, privacy, configuration, FAQ. Use when: how code search works or what gets indexed.
- [Ignore files](./ignore-files.md) — .cursorignore, .cursorindexingignore, global ignore, patterns, negation. Use when: hiding files from AI/indexing or configuring what Cursor can access.
- [@ Mentions](./at-mentions.md) — @Files, @Code, @Docs, @Past Chats, context management, Cursor 2.0 changes. Use when: adding files, folders, docs, or past chats to Agent context.
- [Rules](./rules.md) — Project, User, Team rules, AGENTS.md, importing, best practices. Use when: adding or sharing instructions for the Agent.
- [Official docs setup](./official-docs-setup.md) — AGENTS.md, @Docs, indexing doc sites for this monorepo's stack. Use when: getting the Agent to follow official documentation.
- [Commands](./commands.md) — Custom slash commands (project, global, team), parameters, examples. Use when: reusable workflows triggered with `/` in chat.
- [Agent Skills](./agent-skills.md) — SKILL.md, directories, scripts, auto vs manual invocation, migrate rules/commands. Use when: extending the Agent with portable, executable skills.
- [Subagents](./subagents.md) — Built-in vs custom subagents, Task tool, when to use vs skills, hooks. Use when: delegation, parallel work, context isolation.
- [Agent](./agent.md) — How Agent works, tools, summarization, checkpoints, export, queued messages. Use when: using or explaining the Agent (shortcuts, queue, undo).
- [Common Agent Workflows](./agent-workflows.md) — TDD, git/PR commands, codebase onboarding, diagrams, hooks loops, design-to-code, Cloud Agents. Use when: proven patterns for using the Agent effectively.
- [Working with agents](./working-with-agents.md) — Prompting, context, Plan/Debug, review, and how they tie to AGENTS.md and this repo. Use when: you want a short reference for getting good results from the Agent.
- [Agent modes](./agent-modes.md) — Agent / Ask / Plan / Debug, custom slash commands, switching, settings. Use when: choosing a mode or configuring Agent behavior.
- [Parallel Agents](./parallel-agents.md) — Worktrees, Best-of-N (multiple models), Apply, worktrees.json, cleanup. Use when: running parallel agents or same prompt on multiple models.
- [Review](./review.md) — Diff UI, accept/reject changes, Agent Review (bug finding), settings. Use when: reviewing agent output or scanning diffs for issues.
- [Terminal](./terminal.md) — Agent shell commands, sandbox, allowlist, Auto-Run, Enterprise, troubleshooting. Use when: how commands run, sandbox errors, or broken terminal output.
- [Browser](./browser.md) — Agent browser control, tools, design sidebar, security, Enterprise, origin allowlist. Use when: testing, visual editing, a11y, design-to-code, or Browser settings.
- [Agent security](./agent-security.md) — Guardrails, approval defaults, .cursorignore, MCP, network, workspace trust, disclosure. Use when: what needs approval, locking down files, or reporting vulnerabilities.
- [Hooks](./hooks.md) — Agent/Tab hooks, command vs prompt, config, events, team distribution, partners. Use when: formatters, gating risky ops, secrets scan, or policy distribution.
- [Models](./models.md) — Model list, per-model pricing, Auto, context windows, Max Mode, FAQ. Use when: choosing a model, understanding cost or context limits.
- [Pricing](./pricing.md) — Plans, included usage, on-demand, Teams, Bugbot, Cloud Agents. Use when: choosing a plan or explaining what happens at limits.
- [Billing](./billing.md) — Billing portal, cycles, seats, monthly/annual, invoices, payment, cancel. Use when: managing subscription, invoices, or payment method.
- [Cloud Agents](./cloud-agents.md) — Setup, web & mobile, environment.json, secrets, Slack, testing, security. Use when: running agents in the cloud, from web/phone, or team follow-ups.
- [Slack](./slack.md) — @cursor in Slack, install, commands, options, channel/routing, permissions. Use when: using Cloud Agents from Slack or configuring the Slack integration.
- [Linear](./linear.md) — Assign issues to Cursor, @Cursor in comments, repo/branch/model labels, triage rules. Use when: using Cloud Agents from Linear or configuring the Linear integration.
- [GitHub](./github.md) — Connect GitHub app, @cursor on PRs/issues, IP allow list, permissions, troubleshooting. Use when: setting up GitHub for Cloud Agents/Bugbot or fixing access issues.
- [Git](./git.md) — AI commit message, AI resolve conflicts, Agent attribution (Co-authored-by, PR footer). Use when: generating commit messages, resolving merge conflicts, or configuring Agent attribution.
- [Deeplinks](./deeplinks.md) — Share prompts, commands, rules, skills via link; app vs web URL. Use when: sharing or opening prompt/command/rule/skill links.
- [Extensions](./extensions.md) — VS Code extensions, marketplace, extension URLs, publisher verification, VS Code import. Use when: installing or managing extensions, or verifying a publisher.
- [Keyboard Shortcuts](./keyboard-shortcuts.md) — Chat, Inline Edit, Tab, Terminal, general shortcuts; remapping. Use when: finding or customizing keybindings.
- [Themes](./themes.md) — Light/dark theme, change theme, VS Code themes, custom theme. Use when: switching or creating color themes.
- [MCP](./mcp.md) — What MCP is, transports, mcp.json, OAuth, using in chat, security. Use when: installing or configuring MCP servers (Supabase, APIs, docs).
- [Building an MCP Server](./building-mcp-server.md) — Build MCP server (stdio/HTTP), MCP Inspector, scaffold with Cursor. Use when: building your own MCP server.
- [Large Codebases](./large-codebases.md) — Chat to explore, rules for domain knowledge, Ask to plan / Agent to implement, Tab vs Inline Edit vs Chat. Use when: working in large or unfamiliar repos.
- [Setup Supabase MCP](./setup-supabase-mcp.md) — *(Coming soon)* Setting up the Supabase MCP server. Use when: you want to connect Cursor to Supabase via MCP.

## See also

- Project-wide docs: [docs/](../) (Supabase, deployment, testing, etc.)
- App-specific docs: `apps/web-app/docs/`, `apps/mobile-app/docs/`
- **Web dev workflows** (Linear, Figma, browser): [Cursor Web Development cookbook](https://docs.cursor.com/cookbook/web-development)
