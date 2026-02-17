# Agent Skills

**Agent Skills** is an open standard for extending AI agents with specialized capabilities. Skills package domain-specific knowledge and workflows so the Agent can perform specific tasks.

**Use this doc when:** You want to add or install skills (instructions + optional scripts), control when they’re applied, or migrate rules/commands to skills.

**For SKILL.md spec and options:** [Cursor docs – Agent Skills](https://docs.cursor.com/context/skills).

---

## What are skills?

A **skill** is a portable, version-controlled package that teaches the Agent how to do domain-specific tasks. It can include both **instructions** and **executable scripts** the Agent can run.

- **Portable** – Work in any agent that supports the Agent Skills standard.
- **Version-controlled** – Stored as files; track in a repo or install via GitHub.
- **Executable** – Can include scripts/code the Agent runs (e.g. in a `scripts/` folder).
- **Progressive** – Resources load on demand so context stays efficient.

---

## How skills work

When Cursor starts, it **discovers** skills from skill directories and offers them to the Agent. The Agent **decides when a skill is relevant** from context and applies it automatically.

You can also **invoke a skill manually**: type **`/`** in Agent chat and search for the skill name (e.g. `/deploy-app`).

---

## Skill directories

Skills are loaded from these locations (project-level vs user-level):

- **`.cursor/skills/`** — Project
- **`.claude/skills/`** — Project (Claude compatibility)
- **`.codex/skills/`** — Project (Codex compatibility)
- **`~/.cursor/skills/`** — User (global)
- **`~/.claude/skills/`** — User (global, Claude)
- **`~/.codex/skills/`** — User (global, Codex)

Each skill is a **folder** with a **`SKILL.md`** file:

```
.cursor/
└── skills/
    └── my-skill/
        └── SKILL.md
```

You can add optional **scripts**, **references**, and **assets**:

```
.cursor/
└── skills/
    └── deploy-app/
        ├── SKILL.md
        ├── scripts/
        │   ├── deploy.sh
        │   └── validate.py
        ├── references/
        │   └── REFERENCE.md
        └── assets/
            └── config-template.json
```

---

## SKILL.md format

Each skill is defined in **`SKILL.md`** with **YAML frontmatter** and Markdown content.

### Frontmatter fields

- **`name`** — Yes; Skill identifier. Lowercase letters, numbers, hyphens only. Must match the **folder name**.
- **`description`** — Yes; What the skill does and when to use it. Used by the Agent to decide relevance.
- **`license`** — No; License name or path to a license file.
- **`compatibility`** — No; Requirements (system packages, network, etc.).
- **`metadata`** — No; Extra key-value metadata.
- **`disable-model-invocation`** — No; When `true`, the skill is **only** applied when you explicitly type `/skill-name`. The Agent won’t auto-apply it.

### Example

```markdown
---
name: my-skill
description: Short description of what this skill does and when to use it.
---

# My Skill

Detailed instructions for the agent.

## When to Use

- Use this skill when...
- This skill is helpful for...

## Instructions

- Step-by-step guidance for the agent
- Domain-specific conventions
- Best practices and patterns
- Use the ask questions tool if you need to clarify requirements with the user
```

---

## Disabling automatic invocation

By default, skills are **automatically** applied when the Agent thinks they’re relevant. Set **`disable-model-invocation: true`** in frontmatter so the skill is **only** included when you explicitly type **`/skill-name`** in chat—similar to a slash command.

---

## Including scripts in skills

Add a **`scripts/`** directory with executable code. Reference scripts in **SKILL.md** with paths relative to the skill root. The Agent reads the instructions and runs the scripts when the skill is used.

Example **SKILL.md** for a deploy skill:

```markdown
---
name: deploy-app
description: Deploy the application to staging or production. Use when deploying, or when the user mentions deployment, releases, or environments.
---

# Deploy App

Deploy the application using the provided scripts.

## Usage

Run the deployment script: `scripts/deploy.sh <environment>`

Where `<environment>` is `staging` or `production`.

## Pre-deployment Validation

Before deploying, run: `python scripts/validate.py`
```

Scripts can be any language (Bash, Python, JavaScript, etc.). Keep them self-contained, with clear errors and edge-case handling.

---

## Optional directories

- **`scripts/`** — Executable code the Agent can run
- **`references/`** — Extra docs loaded on demand
- **`assets/`** — Static files (templates, images, data)

Keep **SKILL.md** focused; put long reference material in **references/** or other files so the Agent loads it only when needed.

---

## Viewing skills

1. Open **Cursor Settings** (**Cmd+Shift+J** / **Ctrl+Shift+J**).
2. Go to **Rules**.
3. Skills appear under **Agent Decides**.

---

## Installing skills from GitHub

1. **Cursor Settings → Rules**
2. Under **Project Rules**, click **Add Rule**
3. Choose **Remote Rule (Github)**
4. Enter the GitHub repository URL

The skill is synced into your project and appears like other discovered skills.

---

## Migrating rules and commands to skills

Cursor 2.4+ includes a built-in **`/migrate-to-skills`** skill that converts existing rules and slash commands into skills.

**Converted:**

- **Dynamic rules** – “Apply Intelligently” rules (`alwaysApply: false` or unset, no `globs`). Turned into standard skills.
- **Slash commands** – Project and user commands. Turned into skills with **`disable-model-invocation: true`** so they still only run when you type `/command-name`.

**Not converted:**

- Rules with **`alwaysApply: true`** or **`globs`** (different trigger behavior).
- **User rules** (not file-based).

**Steps:**

1. In Agent chat, type **`/migrate-to-skills`**.
2. The Agent finds eligible rules and commands and generates skills.
3. Review the result in **`.cursor/skills/`**.

---

## See also

- [Rules](./rules.md) – Importing rules; Agent Skills toggle in Settings
- [Subagents](./subagents.md) – When to use subagents vs skills
- [Commands](./commands.md) – Slash commands (can be migrated to skills)
- [Cursor docs – Agent Skills](https://docs.cursor.com/context/skills)
- [Agent Skills standard](https://agentskills.io)
