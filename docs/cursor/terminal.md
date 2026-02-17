# Terminal

The Agent runs shell commands **directly in your terminal**. On macOS and Linux, commands can run in a **sandbox** for safer execution. Command history is kept across sessions. Use **Ctrl+C** or click **Skip** to stop a running command.

**Use this doc when:** You need to understand how Agent runs commands, sandbox behavior, allowlists, Auto-Run settings, or why terminal output looks wrong (e.g. themes).

**For current settings and platform behavior:** [Cursor docs – Agent tools / Auto-Run](https://docs.cursor.com/agent/tools).

---

## Sandbox

**Available on:** macOS (Cursor v2.0+) and Linux (v2.3.0-pre+). On **Windows**, use WSL or devcontainers for sandboxed execution.

**Note:** **Auto mode** (model selection) is not currently compatible with Sandbox.

By default, the Agent runs terminal commands in a **restricted environment** that blocks unauthorized file and network access. Commands can run automatically while staying confined to your workspace.

- **macOS:** Uses `sandbox-exec` (seatbelt).
- **Linux:** Uses Landlock v3 (kernel 6.2+), seccomp, and user namespaces.

### Linux requirements

For the sandbox on Linux you need:

- **Kernel 6.2 or later** with Landlock v3 (`CONFIG_SECURITY_LANDLOCK=y`).
- **Unprivileged user namespaces** enabled (default on many distros).

If your kernel doesn’t meet this, the Agent will **ask for approval** before running commands instead of using the sandbox.

### How the sandbox works

- **File access** — Read access to the filesystem; read/write only to **workspace** directories
- **Network access** — **Blocked by default** (can be turned on in settings)
- **Temporary files** — Full access to `/tmp` (or system temp equivalent)

The **`.cursor`** config directory is always protected, regardless of allowlist settings.

### When a sandboxed command fails

If a command fails because of sandbox restrictions, you can:

- **Skip** — Cancel the command; the Agent can try something else
- **Run** — Run the command **without** sandbox (this time only)
- **Add to allowlist** — Run without sandbox and **remember** it for future runs (no prompt next time)

Commands on the **allowlist** skip sandbox and run immediately.

---

## Editor configuration (Auto-Run)

Configure how the Agent runs terminal commands and other tools: **Settings → Cursor Settings → Agents → Auto-Run**.

- **Auto-Run Mode** — **Run in Sandbox** – Tools/commands auto-run in sandbox where possible (macOS/Linux). **Ask Every Time** – You approve each tool/command. **Run Everything** – Agent runs all tools and commands without asking.
- **Auto-Run Network Access** — Whether sandboxed commands can use the network
- **Allow Git Writes Without Approval** — When on: git writes (commit, push, etc.) run without approval in the sandbox. When off: they need approval. `git push` still needs network access.
- **Command Allowlist** — Commands that run automatically **outside** the sandbox
- **MCP Allowlist** — MCP tools that run automatically without approval
- **Browser Protection** — Block the Agent from auto-running [Browser](https://cursor.com/docs/agent/browser) tools
- **File-Deletion Protection** — Block the Agent from deleting files automatically
- **Dotfile Protection** — Block the Agent from changing dotfiles (e.g. `.gitignore`) automatically
- **External-File Protection** — Block the Agent from creating or editing files **outside** the workspace

---

## Enterprise controls

**Only for Enterprise** subscriptions. Admins can override or hide these settings for end users. **Settings → Auto-Run** in the [web dashboard](https://cursor.com/dashboard?tab=settings).

- **Auto-Run Controls** — Turn on/off user-facing auto-run and sandbox options. If off, default is: auto-run in sandbox when available, otherwise ask.
- **Sandboxing Mode** — Whether sandbox is available. When on, commands auto-run in sandbox even if not on the allowlist.
- **Sandbox Networking** — Whether sandboxed commands have network access
- **Sandbox Git Access** — Whether git writes run without approval in the sandbox (push still needs network)
- **Delete File Protection** — Block the Agent from deleting files automatically
- **MCP Tool Protection** — Block the Agent from auto-running MCP tools
- **Terminal Command Allowlist** — Commands that can run automatically without sandboxing. If empty, all need approval. With sandbox on, other commands run in sandbox.
- **Enable Run Everything** — Whether users can enable the “Run Everything” Auto-Run mode

---

## Troubleshooting

### Truncated or broken terminal output

Some **shell themes** (e.g. Powerlevel9k / Powerlevel10k) can break inline terminal output when the Agent runs. If output looks truncated or misformatted, **disable the theme** or use a simpler prompt for Agent sessions.

### Disable heavy prompts when the Agent runs

Set **`CURSOR_AGENT`** in your shell config so you can detect Agent sessions and skip fancy prompts:

**zsh (e.g. ~/.zshrc) – skip Powerlevel10k when Agent runs:**

```bash
if [[ -n "$CURSOR_AGENT" ]]; then
  # Skip theme initialization for better compatibility
else
  [[ -r ~/.p10k.zsh ]] && source ~/.p10k.zsh
fi
```

**bash (e.g. ~/.bashrc) – simple prompt in Agent sessions:**

```bash
if [[ -n "$CURSOR_AGENT" ]]; then
  PS1='\u@\h \W \$ '
fi
```

---

## See also

- [Agent security](./agent-security.md) – Why approval and allowlists matter; avoid “Run Everything”
- [Agent](./agent.md) – Tools including “Run shell commands”
- [Agent modes](./agent-modes.md) – Modes and Auto-run / Auto-fix settings
- [Cursor dashboard – Settings](https://cursor.com/dashboard?tab=settings)
