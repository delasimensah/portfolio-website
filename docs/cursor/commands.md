# Commands

**Custom commands** are reusable workflows you trigger with a **`/`** prefix in the chat input. They standardize processes across your team and speed up common tasks.

**Note:** Commands are currently in **beta**. The feature and syntax may change.

**Use this doc when:** You want to create or share slash commands (e.g. `/review`, `/security-audit`) for your project or team.

**For creation and options:** [Cursor docs – Commands](https://docs.cursor.com/agent/chat/commands).

---

## How commands work

Commands are **plain Markdown files** stored in one of three places:

| Location | Path | Who sees it |
|----------|------|-------------|
| **Project** | `.cursor/commands/` in the project root | Anyone with the project |
| **Global** | `~/.cursor/commands/` in your home directory | Only you, all projects |
| **Team** | [Cursor Dashboard](https://cursor.com/dashboard?tab=team-content&section=commands) | All team members (Team/Enterprise) |

When you type **`/`** in the chat input, Cursor shows available commands from all locations. Pick one to run that workflow.

---

## Creating commands

1. Create a **`.cursor/commands`** directory (in the project root for project commands, or `~/.cursor/commands` for global).
2. Add **`.md`** files with clear names (e.g. `review-code.md`, `write-tests.md`, `create-pr.md`).
3. Write **plain Markdown** that describes what the command should do. That content is sent to the model as the prompt (with any extra text you type after the command).
4. Commands show up automatically when you type `/` in chat.

Example structure:

```
.cursor/
└── commands/
    ├── address-github-pr-comments.md
    ├── code-review-checklist.md
    ├── create-pr.md
    ├── light-review-existing-diffs.md
    ├── onboard-new-developer.md
    ├── run-all-tests-and-fix.md
    ├── security-audit.md
    └── setup-new-feature.md
```

The **filename** (without `.md`) becomes the command name: `onboard-new-developer.md` → **`/onboard-new-developer`**.

---

## Parameters (extra context)

Anything you type **after** the command name is passed to the model **along with** the command content. Use it to add context, ticket IDs, or scope.

Example:

```
/commit and /pr these changes to address DX-523
```

The model sees both the command’s Markdown and “these changes to address DX-523”.

---

## Team commands

**Team** and **Enterprise** plans can use **Team commands**: server-side commands created by admins in the [Team Content dashboard](https://cursor.com/dashboard?tab=team-content&section=commands). They’re automatically available to all team members when they type `/`—no file sync or download.

### Creating a team command

1. Go to [Team Content → Commands](https://cursor.com/dashboard?tab=team-content&section=commands).
2. Create a new command.
3. Fill in:
   - **Name** – What appears after `/` (e.g. `security-audit`).
   - **Description** (optional) – Short explanation of what the command does.
   - **Content** – Markdown that defines the command behavior (the prompt sent to the model).
4. Save. The command is immediately available to the team.

### Benefits

- **Centralized** – Update once; everyone gets the change.
- **Standardization** – Same workflows and practices across the org.
- **No file distribution** – No need to commit or sync command files.
- **Access control** – Only team admins create or edit team commands.

---

## Example: onboard new developer

Example **onboard-new-developer.md** content:

```markdown
# Onboard New Developer

## Overview
Comprehensive onboarding process to get a new developer up and running quickly.

## Steps
1. **Environment setup**
   - Install required tools
   - Set up development environment
   - Configure editor and extensions
   - Set up git and SSH keys

2. **Project familiarization**
   - Review project structure
   - Understand architecture
   - Read key documentation
   - Set up local database

## Onboarding Checklist
- [ ] Development environment ready
- [ ] All tests passing
- [ ] Can run application locally
- [ ] Database set up and working
- [ ] First PR submitted
```

Other ideas: **code-review-checklist**, **security-audit**, **setup-new-feature**, **create-pr**, **run-tests-and-fix**, **address-github-pr-comments**. Use Markdown to describe the workflow; the Agent follows it using the rest of your chat context.

---

## See also

- [Agent modes](./agent-modes.md) – Custom slash commands replace deprecated custom modes
- [Rules](./rules.md) – Project/User/Team instructions (Rules, Commands in same Settings area)
- [Cursor docs – Commands](https://docs.cursor.com/agent/chat/commands)
