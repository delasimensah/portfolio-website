# Agent security

AI can behave in unexpected ways (prompt injection, hallucinations, etc.). Cursor uses **guardrails** so sensitive actions need your **manual approval** by default. This doc explains those guardrails and what they mean for you.

**Recommendation:** Keep these defaults enabled.

**Use this doc when:** You want to understand what the Agent can do with or without approval, how to lock down files, or how to report security issues.

**For guardrails and settings:** [Cursor docs – Agent security](https://docs.cursor.com/agent/security).

---

## First-party tool calls

Cursor’s built-in tools let the Agent read files, edit files, run terminal commands, search the web, and more.

### Reading and searching

- **Reading files** and **searching the codebase** do **not** require approval.
- To block the Agent from specific files, use [.cursorignore](./ignore-files.md).
- Actions that could expose sensitive data require your **explicit approval**.

### Editing workspace files

- The Agent **can modify workspace files without approval** (except config files). Changes are **saved to disk immediately**.
- **Always use version control** so you can revert.
- **Configuration files** (e.g. workspace settings) need your approval before the Agent can change them.

**Warning:** If **auto-reload** is on (e.g. dev server), agent changes may **run before you review them**. Consider disabling auto-reload when the Agent is making edits, or review changes promptly.

### Terminal commands

- **Terminal commands need your approval by default.** Review each command before allowing it to run.
- You can turn on auto-approval (e.g. allowlist, “Run in Sandbox”) if you accept the risk.
- The [allowlist](https://docs.cursor.com/agent/tools) is **best-effort**—bypasses are possible. It is not a security guarantee.
- **Never use “Run Everything” mode**—it skips safety checks.

---

## Third-party tool calls (MCP)

External tools are connected via [MCP](./mcp.md). **Every MCP connection** needs your approval. After you approve a connection, **each MCP tool call** still needs **individual approval** before it runs (unless you’ve configured allowlists).

---

## Network requests

Attackers could use network requests to exfiltrate data. By default, Cursor’s tools only make network requests to:

- **GitHub**
- **Direct link retrieval** (e.g. fetching a URL you provide)
- **Web search providers**

The Agent **cannot make arbitrary network requests** with default settings.

---

## Workspace trust

Cursor supports [VS Code workspace trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust). It is **disabled by default**. When enabled, Cursor prompts you to choose **normal** or **restricted** mode for new workspaces. **Restricted mode disables AI features.** For repos you don’t trust, use a plain text editor instead of Cursor.

**To enable workspace trust:**

1. Open your user `settings.json`.
2. Add:

```json
"security.workspace.trust.enabled": true
```

Organizations can enforce this via MDM or similar.

---

## Responsible disclosure

If you find a **security vulnerability**, email **[security-reports@cursor.com](mailto:security-reports@cursor.com)** with details and steps to reproduce.

- Cursor aims to acknowledge reports within **5 business days**.
- For **critical** issues, Cursor notifies users by email.

---

## See also

- [Hooks](./hooks.md) – Custom scripts to gate or audit agent actions (shell, MCP, file read/edit)
- [Terminal](./terminal.md) – Sandbox, allowlist, Auto-Run (and why “Run Everything” is risky)
- [Browser](./browser.md) – Browser tool approval and allow/block lists
- [Cursor docs – Ignore files (.cursorignore)](https://docs.cursor.com/context/ignore-files)
- [Cursor docs – Agent tools](https://docs.cursor.com/agent/tools)
- [Cursor docs – Security](https://docs.cursor.com/agent/security)
