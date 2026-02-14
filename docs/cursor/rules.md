# Rules

**Rules** are system-level instructions for the Agent. They bundle prompts, conventions, and workflows so you can manage and share them across your team.

**Use this doc when:** You want to add project or user instructions, use AGENTS.md, set up team rules, or import rules from GitHub or Agent Skills.

**For rule types and UI details:** [Cursor docs – Rules](https://docs.cursor.com/context/rules).

---

## Rule types

| Type | Where | Scope |
|------|--------|------|
| **Project Rules** | `.cursor/rules/` | Version-controlled, scoped to the codebase (path patterns, relevance, or manual) |
| **User Rules** | Cursor Settings → Rules | Global to your Cursor; used by Agent (Chat) only |
| **Team Rules** | Dashboard (Team/Enterprise) | Team-wide; can be enforced so users can’t disable them |
| **AGENTS.md** | Project root or subdirectories | Plain markdown, no metadata; simple alternative to `.cursor/rules` |

---

## How rules work

LLMs don’t keep memory between turns. Rules give **persistent, reusable context** by being injected at the start of the model context when they apply. That gives the AI consistent guidance for code generation, edits, and workflows.

---

## Project rules

Project rules live in **`.cursor/rules/`** as markdown (`.md` or `.mdc`). They’re version-controlled and can be scoped by path, applied when relevant, or invoked manually with `@rule-name`.

**Use them to:**

- Encode domain knowledge about your codebase
- Automate project-specific workflows or templates
- Standardize style or architecture

### Structure

- Each rule is a **markdown file** (any name). Use **`.mdc`** with frontmatter for `description`, `globs`, and `alwaysApply`.
- You can put rules in subfolders (e.g. `.cursor/rules/frontend/components.md`).

Example layout:

```
.cursor/rules/
  react-patterns.mdc      # Frontmatter: description, globs
  api-guidelines.md      # Simple markdown
  frontend/
    components.md
```

### Rule types (how they’re applied)

| Type | Behavior |
|------|----------|
| **Always Apply** | Applied to every chat session |
| **Apply Intelligently** | Agent applies when it decides the rule is relevant (uses `description`) |
| **Apply to Specific Files** | Applied when the current file matches a `globs` pattern |
| **Apply Manually** | Only when you @-mention in chat (e.g. `@my-rule`) |

### Frontmatter and content

In frontmatter you control `description`, `globs`, and `alwaysApply`. The rest of the file is the rule content.

```yaml
---
description: "Standards for frontend components and API validation"
alwaysApply: false
globs: ["**/*.tsx"]
---

- Use our internal RPC pattern when defining services
- Always use snake_case for service names.

@service-template.ts
```

Reference files with `@filename` instead of pasting large blocks so rules stay short and up to date.

### Creating a rule

- **Command:** “New Cursor Rule” (creates a file in `.cursor/rules`).
- **Settings:** **Cursor Settings → Rules, Commands** to create, view, and manage rules.

---

## Best practices

- **Focused and scoped** – Prefer many small rules over one huge one. Keep under ~500 lines; split if larger.
- **Concrete** – Include examples or `@file` references. Avoid vague advice; write like clear internal docs.
- **Reuse** – If you keep repeating the same prompt in chat, turn it into a rule.
- **Reference, don’t copy** – Point to canonical files instead of duplicating code or long style guides.

**Avoid:**

- Copying entire style guides (use a linter; the Agent already knows common conventions).
- Documenting every CLI command (Agent knows npm, git, pytest, etc.).
- Rules for rare edge cases; focus on patterns you use often.
- Duplicating what’s already in the codebase.

Start with a few rules and add more when the Agent keeps making the same mistake. Commit rules to git so the team benefits. You can tag `@cursor` on a GitHub issue/PR to have the Agent update a rule.

---

## Team rules

**Team** and **Enterprise** plans can create and manage rules from the [Cursor dashboard](https://cursor.com/dashboard?tab=team-content). Team Rules apply across all projects for the team.

- **Enable this rule immediately** – When checked, the rule is active when created. When unchecked, it’s saved as a draft until you enable it.
- **Enforce this rule** – When enabled, the rule is **required** for all team members and cannot be turned off in Cursor Settings. When not enforced, users can disable it under **Cursor Settings → Rules** (Team Rules section).

Team Rules are **plain text** (no folders, no `globs` / `alwaysApply`). They’re included in model context for Agent (Chat) in all repos when enabled (and not disabled by the user unless enforced).

**Precedence:** **Team Rules → Project Rules → User Rules**. All applicable rules are merged; earlier sources win on conflict. Enforced rules are useful for compliance, but don’t rely on AI guidance as your only control.

---

## Importing rules

### Remote rules (GitHub)

Import rules from any GitHub repo you can access (public or private):

1. **Cursor Settings → Rules, Commands**
2. Next to **Project Rules**, click **+ Add Rule** → **Remote Rule (GitHub)**
3. Paste the repo URL that contains the rule
4. Cursor syncs the rule into your project

Imported rules stay in sync with the source repo.

### Agent Skills

Cursor can load rules from [Agent Skills](./agent-skills.md) (open standard for extending AI agents). Skills are **agent-decided**—Cursor applies them when relevant. They can include instructions and executable scripts. You can’t set imported skills as always-apply or manual-only.

**Toggle:** **Cursor Settings → Rules** → **Import Settings** → **Agent Skills** on/off. Full guide: [Agent Skills](./agent-skills.md).

---

## AGENTS.md

**AGENTS.md** is a plain markdown file for agent instructions. Put it in the **project root** (or in subdirectories) as a simple alternative to `.cursor/rules`. No frontmatter or metadata.

Example:

```markdown
# Project Instructions

## Code Style
- Use TypeScript for all new files
- Prefer functional components in React
- Use snake_case for database columns

## Architecture
- Follow the repository pattern
- Keep business logic in service layers
```

### Nested AGENTS.md

You can place **AGENTS.md** in subdirectories. Cursor applies the one for the directory you’re working in (and combines with parent directories). More specific (deeper) instructions take precedence.

Example:

```
project/
  AGENTS.md           # Global
  frontend/
    AGENTS.md         # Frontend-specific
    components/
      AGENTS.md       # Component-specific
  backend/
    AGENTS.md         # Backend-specific
```

---

## User rules

**User Rules** are set in **Cursor Settings → Rules** and apply **globally** to all projects. They’re used by **Agent (Chat)** only—not by Inline Edit (Cmd/Ctrl+K).

Use them for preferred communication style or coding conventions, e.g.:

```
Please reply in a concise style. Avoid unnecessary repetition or filler language.
```

---

## Legacy: .cursorrules

The **`.cursorrules`** file in the project root is still supported but **deprecated**. Prefer **Project Rules** (`.cursor/rules/`) or **AGENTS.md**.

---

## FAQ

- **Why isn’t my rule applied?** Check rule type (Always / Intelligent / Globs / Manual), path/globs, and that the rule is enabled. For Team Rules, see if it’s enforced or if the user has disabled it.
- **Can rules reference other rules or files?** Yes. Use `@filename` or `@rule-name` in the rule content.
- **Can I create a rule from chat?** You can ask the Agent to draft or update a rule; use “New Cursor Rule” or edit files in `.cursor/rules/` to add it.
- **Do rules affect Tab or other features?** Project Rules and AGENTS.md can apply depending on context. **User Rules** apply only to Agent (Chat), not to Inline Edit (Cmd/Ctrl+K).
- **Do User Rules apply to Inline Edit (Cmd/Ctrl+K)?** No. Only Agent (Chat) uses User Rules.

---

## See also

- [Large Codebases](./large-codebases.md) – Using rules for domain knowledge and glob-attached style
- [Commands](./commands.md) – Custom slash commands (same Settings → Rules, Commands area)
- [Cursor concepts overview](./cursor-concepts-overview.md) – Rules, Context, Agent
- [Agent](./agent.md) – How the Agent uses instructions and tools
- [Agent Skills](./agent-skills.md) – SKILL.md, scripts, installing, migrating
- [Cursor docs – Rules](https://docs.cursor.com/context/rules)
- [Cursor docs – Agent Skills](https://docs.cursor.com/context/skills)
