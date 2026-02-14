# Hooks

**Hooks** let you observe, control, and extend the agent loop with custom scripts. They are processes that talk over stdio using JSON. Hooks run before or after defined stages and can observe, block, or change behavior.

**Use this doc when:** You want to run formatters after edits, gate risky operations, scan for secrets, inject context at session start, or distribute policies to your team.

---

## What you can do with hooks

- Run **formatters** after Agent or Tab edits
- Add **analytics** or audit events
- **Scan for PII or secrets** before content reaches the model
- **Gate risky operations** (e.g. SQL writes, network commands)
- Control **subagent (Task tool)** execution
- **Inject context** at session start
- Apply different policies for **Tab** (inline completions) vs **Agent**

Cursor can also load hooks from **third-party tools** like Claude Code so you can reuse the same hook scripts. See [Third-party hooks (Claude Code)](#third-party-hooks-claude-code) below.

---

## Agent vs Tab hook events

| Context | Events |
|--------|--------|
| **Agent** (Cmd+I / Agent Chat) | `sessionStart`, `sessionEnd`, `preToolUse`, `postToolUse`, `postToolUseFailure`, `subagentStart`, `subagentStop`, `beforeShellExecution`, `afterShellExecution`, `beforeMCPExecution`, `afterMCPExecution`, `beforeReadFile`, `afterFileEdit`, `beforeSubmitPrompt`, `preCompact`, `stop`, `afterAgentResponse`, `afterAgentThought` |
| **Tab** (inline completions) | `beforeTabFileRead`, `afterTabFileEdit` |

Tab hooks let you apply different policies to autonomous Tab operations than to user-directed Agent operations.

---

## Quickstart

1. Create **`hooks.json`** at project level (**`<project>/.cursor/hooks.json`**) or user level (**`~/.cursor/hooks.json`**). Project = that repo only; user = global.
2. Add a hook entry, e.g. run a script after every file edit:

```json
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [{ "command": "./hooks/format.sh" }]
  }
}
```

3. Create the script (e.g. **`~/.cursor/hooks/format.sh`** for user hooks, **`.cursor/hooks/format.sh`** for project hooks). It reads JSON from stdin and can write JSON to stdout. Make it executable: `chmod +x .../format.sh`.
4. **Restart Cursor.** The hook runs after every file edit.

**Paths:** For **project** hooks, scripts run from the **project root**—use paths like **`.cursor/hooks/script.sh`**. For **user** hooks, scripts run from **`~/.cursor/`**—use **`./hooks/script.sh`**.

---

## Hook types

### Command-based (default)

A **command** runs a shell script. It receives JSON on stdin and returns JSON on stdout.

**Exit codes:**

- **0** – Success; Cursor uses the JSON output.
- **2** – **Block** the action (same as returning `permission: "deny"`).
- **Other** – Hook failed; by default the **action proceeds** (fail-open).

Example with optional **matcher** (e.g. only for commands matching `curl|wget|nc`):

```json
{
  "hooks": {
    "beforeShellExecution": [
      {
        "command": "./scripts/approve-network.sh",
        "timeout": 30,
        "matcher": "curl|wget|nc"
      }
    ]
  }
}
```

### Prompt-based

An LLM evaluates a natural-language condition. Good for policy without custom scripts.

```json
{
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "prompt",
        "prompt": "Does this command look safe? Only allow read-only operations.",
        "timeout": 10
      }
    ]
  }
}
```

- Returns `{ "ok": boolean, "reason?: string" }`.
- Uses a fast model. Optional `model` field overrides it.
- **`$ARGUMENTS`** in the prompt is replaced with the hook input JSON; if omitted, input is appended.

---

## Configuration

### Where hooks load (priority: highest → lowest)

| Level | Location |
|-------|----------|
| **Enterprise** | macOS: `/Library/Application Support/Cursor/hooks.json`; Linux/WSL: `/etc/cursor/hooks.json`; Windows: `C:\ProgramData\Cursor\hooks.json` |
| **Team** | Cloud-distributed (Enterprise only) |
| **Project** | `<project-root>/.cursor/hooks.json` (runs from project root) |
| **User** | `~/.cursor/hooks.json` (runs from `~/.cursor/`) |

Higher priority overrides lower. Project hooks are usually committed to the repo; user/enterprise are local or MDM-managed.

### Options

**Global (file):** `version` (number, default `1`).

**Per hook:** `command` (required), `type` (`"command"` | `"prompt"`, default `"command"`), `timeout` (seconds), `loop_limit` (for `stop`/`subagentStop`, default `5`; `null` = no limit), `matcher` (filter when the hook runs).

### Matchers

Which field the matcher uses depends on the hook:

- **preToolUse** (and other tool hooks): Filter by **tool type** — e.g. `Shell`, `Read`, `Write`, `MCP`, `Task`.
- **subagentStart**: Filter by **subagent type** — e.g. `generalPurpose`, `explore`, `shell`.
- **beforeShellExecution**: Filter by the **full shell command string** — e.g. `curl|wget|nc `.

---

## Hook events (summary)

All hooks receive common fields (e.g. `conversation_id`, `hook_event_name`, `workspace_roots`). Events include:

- **Lifecycle:** `sessionStart`, `sessionEnd`, `stop`
- **Tools:** `preToolUse`, `postToolUse`, `postToolUseFailure`; `beforeShellExecution` / `afterShellExecution`; `beforeMCPExecution` / `afterMCPExecution`; `beforeReadFile`, `afterFileEdit`
- **Tab:** `beforeTabFileRead`, `afterTabFileEdit`
- **Subagents:** `subagentStart`, `subagentStop`
- **Other:** `beforeSubmitPrompt`, `afterAgentResponse`, `afterAgentThought`, `preCompact`

Blocking hooks (e.g. `beforeShellExecution`, `beforeMCPExecution`, `beforeReadFile`) return `permission` / `decision` to allow or deny. **For full input/output schemas and field details for every event, see:** [Cursor docs – Hooks](https://docs.cursor.com/agent/hooks).

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `CURSOR_PROJECT_DIR` | Workspace root |
| `CURSOR_VERSION` | Cursor version |
| `CURSOR_USER_EMAIL` | User email (if logged in) |
| `CURSOR_CODE_REMOTE` | Remote-aware project path (remote workspaces) |
| `CLAUDE_PROJECT_DIR` | Alias for project dir (Claude compatibility) |

Session-scoped `env` from **sessionStart** is passed to all later hooks in that session.

---

## Team distribution

- **Project hooks** – Put **`.cursor/hooks.json`** (and scripts under **`.cursor/hooks/`**) in the repo. Everyone in a trusted workspace gets them. Use paths like **`.cursor/hooks/script.sh`** (from project root).
- **MDM** – Push **hooks.json** and scripts to user dir (**`~/.cursor/`**) or global dir (see Configuration table). Your IT/security team manages deployment.
- **Cloud (Enterprise)** – Configure hooks in the [dashboard](https://cursor.com/dashboard?tab=team-content&section=hooks). Cursor syncs them to clients (e.g. every 30 minutes). Supports OS targeting and centralized management.

---

## Partner integrations

Cursor partners offer hooks-based integrations for security, governance, and secrets:

- **MCP governance:** [MintMCP](https://www.mintmcp.com/blog/mcp-governance-cursor-hooks), [Oasis Security](https://www.oasis.security/blog/cursor-oasis-governing-agentic-access), [Runlayer](https://www.runlayer.com/blog/cursor-hooks)
- **Code security:** [Corridor](https://corridor.dev/blog/corridor-cursor-hooks/), [Semgrep](https://semgrep.dev/blog/2025/cursor-hooks-mcp-server)
- **Dependency security:** [Endor Labs](https://www.endorlabs.com/learn/bringing-malware-detection-into-ai-coding-workflows-with-cursor-hooks)
- **Agent safety:** [Snyk Evo Agent Guard](https://snyk.io/blog/evo-agent-guard-cursor-integration/)
- **Secrets:** [1Password](https://marketplace.1password.com/integration/cursor-hooks)

More: [Hooks for security and platform teams](https://cursor.com/blog/hooks-partners) (Cursor blog).

---

## Third-party hooks (Claude Code)

Cursor can load and run hooks configured for **Claude Code**, so you can use the same hook scripts in both tools.

### Requirements

1. Enable **Third-party skills** in **Cursor Settings → Features → Third-party skills**.
2. The feature must be enabled for your account.

### Where Claude Code hooks load

| Location | Path | Description |
|----------|------|-------------|
| **Project local** | `.claude/settings.local.json` | Project overrides, usually gitignored |
| **Project** | `.claude/settings.json` | Project-level, checked in |
| **User** | `~/.claude/settings.json` | User-level, global |

### Priority order (merged, highest → lowest)

1. Enterprise hooks (Cursor)
2. Team hooks (Cursor dashboard)
3. Project hooks (`.cursor/hooks.json`)
4. User hooks (`~/.cursor/hooks.json`)
5. Claude project local (`.claude/settings.local.json`)
6. Claude project (`.claude/settings.json`)
7. Claude user (`~/.claude/settings.json`)

Higher-priority hooks run first. Any hook can block execution for lower-priority hooks.

### Claude Code hook format

Claude uses a similar format; Cursor maps Claude hook names to Cursor names automatically. Example Claude **settings.json**:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Shell",
        "hooks": [
          { "type": "command", "command": "./hooks/validate-shell.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          { "type": "command", "command": "./hooks/audit.sh" }
        ]
      }
    ]
  }
}
```

### Hook name mapping (Claude → Cursor)

| Claude Code | Cursor |
|-------------|--------|
| `PreToolUse` | `preToolUse` |
| `PostToolUse` | `postToolUse` |
| `UserPromptSubmit` | `beforeSubmitPrompt` |
| `Stop` | `stop` |
| `SubagentStop` | `subagentStop` |
| `SessionStart` | `sessionStart` |
| `SessionEnd` | `sessionEnd` |
| `PreCompact` | `preCompact` |

`Notification` and `PermissionRequest` have no Cursor equivalent and are not supported.

### Tool name mapping (Claude → Cursor)

| Claude Code | Cursor | Supported |
|-------------|--------|-----------|
| `Bash` | `Shell` | Yes |
| `Read` | `Read` | Yes |
| `Write` / `Edit` | `Write` | Yes |
| `Grep` | `Grep` | Yes |
| `Task` | `Task` | Yes |
| `Glob`, `WebFetch`, `WebSearch` | — | No |

### Exit code behavior

Same as Cursor hooks:
- **0** = success, use JSON output
- **2** = block action
- **other** = fail-open (action proceeds). You can share scripts between Cursor and Claude Code.

### Supported features when using Claude config

- Command-based and prompt-based hooks, exit code 2 blocking, tool matchers (regex), timeout – all supported.
- **Not supported:** `subagentStart` (Claude only has SubagentStop), `loop_limit`, Team/Enterprise hook distribution via Cursor dashboard. Use native **`.cursor/hooks.json`** for those.

### Migration

- **Keep Claude config:** Enable third-party skills; existing `.claude/settings.json` hooks run in Cursor automatically.
- **Move to Cursor format:** Copy hooks to `.cursor/hooks.json` in Cursor format for full support (e.g. `subagentStart`, `loop_limit`, dashboard distribution).

### Troubleshooting (third-party)

- **Claude hooks not loading:** Ensure “Third-party skills” is on, validate `.claude/settings.json` JSON, restart Cursor.
- **Hooks not blocking:** Exit with code **2**; ensure JSON output matches the expected schema; check the Hooks output channel.
- **Different behavior:** Execution environments differ; test in both tools.

---

## Troubleshooting

- **Confirm hooks run:** Use the **Hooks** tab in Cursor Settings and the **Hooks** output channel.
- **Hooks not running:** Restart Cursor. Check paths: **project** hooks = relative to **project root** (e.g. `.cursor/hooks/script.sh`); **user** hooks = relative to **`~/.cursor/`** (e.g. `./hooks/script.sh`).
- **Blocking:** Exit code **2** from a command hook blocks the action (same as `permission: "deny"`).

---

## See also

- [Agent](./agent.md) – How the Agent and tools work
- [Agent security](./agent-security.md) – Guardrails and approval
- [Terminal](./terminal.md) – Shell execution and allowlists
- [Cursor docs – Hooks](https://docs.cursor.com/agent/hooks) (full reference)
- [Cursor docs – Third Party Hooks](https://docs.cursor.com/agent/third-party-hooks)
