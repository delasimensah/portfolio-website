# Model Context Protocol (MCP)

**[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)** lets Cursor connect to external tools and data sources. MCP servers expose capabilities (tools, prompts, resources) that the Agent can use in chat.

**Use this doc when:** You want to install or configure an MCP server, understand transports and config, or use MCP tools in chat.

**For config options and directory:** [Cursor docs – MCP](https://docs.cursor.com/context/mcp).

---

## What is MCP?

MCP is an open protocol. **MCP servers** expose functions and data that Cursor (and other MCP clients) can call. Instead of pasting project structure or docs into chat, you connect Cursor to your DB, APIs, or docs via a server. Servers can be written in any language that can speak over stdio or HTTP (Python, JavaScript, Go, etc.).

---

## Why use MCP?

- **Direct integration** – Connect Cursor to Linear, Figma, Supabase, internal APIs, or docs so the Agent can query and act without you re-explaining.
- **Reusable** – One server, many projects or teams.
- **Flexible** – Run locally (stdio) or as a remote service (HTTP/SSE).

---

## How it works

MCP servers expose **Tools**, **Prompts**, **Resources**, **Roots**, and **Elicitation** over the protocol. Cursor supports three **transports**:

| Transport | Where it runs | Deployment | Users | Input | Auth |
|-----------|----------------|------------|--------|--------|------|
| **stdio** | Local | Cursor runs the command | Single user | Shell command | Env vars |
| **SSE** | Local or remote | You run the server | Multiple users | URL (SSE endpoint) | OAuth |
| **Streamable HTTP** | Local or remote | You run the server | Multiple users | URL (HTTP endpoint) | OAuth |

**Protocol support:** Tools ✅, Prompts ✅, Resources ✅, Roots ✅, Elicitation ✅.

---

## Installing MCP servers

### One-click (directory)

- **Browse** – Use Cursor’s [MCP directory](https://docs.cursor.com/context/mcp/directory) to find servers (e.g. Aikido Security, Airwallex, Alpha Vantage, Amplitude, etc.). Click **Add to Cursor** to install and authenticate (OAuth where needed).
- **Add to Cursor button** – You can create install links for your own servers (see [Install links (deeplinks)](#install-links-deeplinks) below).

### Install links (deeplinks)

MCP servers can be installed via **Cursor deeplinks**. The link uses the same shape as an `mcp.json` entry: a **name** and a **config** (transport and options). Users click the link (or paste it into a browser); Cursor prompts to install and adds the server to their config.

**URL format:**

```
cursor://anysphere.cursor-deeplink/mcp/install?name=$NAME&config=$BASE64_ENCODED_CONFIG
```

| Component | Description |
|-----------|-------------|
| `cursor://` | Protocol scheme |
| `anysphere.cursor-deeplink` | Deeplink handler |
| `/mcp/install` | Path |
| `name` | Query param: display name for the server |
| `config` | Query param: **base64-encoded** JSON for the server (same structure as one entry in `mcpServers`) |

**How to generate a link:**

1. Choose a **name** and the **JSON config** for the server (one key–value pair, e.g. `"postgres": { "command": "npx", "args": [...] }`).
2. **Base64-encode** the JSON (e.g. `JSON.stringify(config)` then base64).
3. URL-encode and substitute: replace `$NAME` with the server name and `$BASE64_ENCODED_CONFIG` with the encoded string.

**Example** – Postgres MCP server:

Config (one server):

```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
  }
}
```

The **config** value in the URL is the base64 encoding of that JSON (the inner object or the full `mcpServers`-style object, depending on what Cursor expects; when in doubt, match what the [MCP install link generator](https://docs.cursor.com/context/mcp/install-links) produces). Resulting link shape:

`cursor://anysphere.cursor-deeplink/mcp/install?name=postgres&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItcG9zdGdyZXMiLCJwb3N0Z3Jlc3FsOi8vbG9jYWxob3N0L215ZGIiXX0=`

**Install flow:** User clicks the link (or pastes in browser) → Cursor opens and prompts to install the server → after confirming, the server is available in Cursor.

You can put these links in READMEs, docs, or “Add to Cursor” buttons. Cursor provides an [install link generator](https://docs.cursor.com/context/mcp/install-links) in the docs to build them from JSON.

### Config file (mcp.json)

Put MCP servers in a JSON config:

- **Project:** **`.cursor/mcp.json`** (project-only).
- **Global:** **`~/.cursor/mcp.json`** (all projects).

**CLI server (Node.js):**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

**CLI server (Python):**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "python",
      "args": ["mcp-server.py"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

**Remote server (HTTP/SSE):**

```json
{
  "mcpServers": {
    "server-name": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "API_KEY": "value"
      }
    }
  }
}
```

### STDIO server fields

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"stdio"` |
| `command` | Yes | Executable (on PATH or full path) |
| `args` | No | Array of arguments |
| `env` | No | Environment variables |
| `envFile` | No | Path to `.env`-style file (STDIO only; not for remote) |

### Static OAuth for remote servers

When the provider gives you a fixed **Client ID** (and optionally **Client Secret**) and requires a **whitelisted redirect URL**, add an **`auth`** object:

```json
{
  "mcpServers": {
    "oauth-server": {
      "url": "https://api.example.com/mcp",
      "auth": {
        "CLIENT_ID": "your-oauth-client-id",
        "CLIENT_SECRET": "your-client-secret",
        "scopes": ["read", "write"]
      }
    }
  }
}
```

- **CLIENT_ID** (required), **CLIENT_SECRET** (optional), **scopes** (optional; if omitted, Cursor can discover via `/.well-known/oauth-authorization-server`).
- **Redirect URL** to register with the provider: **`cursor://anysphere.cursor-mcp/oauth/callback`** (same for all MCP servers; server is identified via OAuth `state`).
- You can use **config interpolation** in `auth`, e.g. `"${env:MCP_CLIENT_ID}"`, so secrets stay out of the file.

### Config interpolation

Use variables in `command`, `args`, `env`, `url`, `headers`:

- **`${env:NAME}`** – Environment variable
- **`${userHome}`** – Home directory
- **`${workspaceFolder}`** – Project root (where `.cursor/mcp.json` lives)
- **`${workspaceFolderBasename}`** – Project root name
- **`${pathSeparator}`**, **`${/}`** – Path separator

Example:

```json
{
  "mcpServers": {
    "local-server": {
      "command": "python",
      "args": ["${workspaceFolder}/tools/mcp_server.py"],
      "env": {
        "API_KEY": "${env:API_KEY}"
      }
    }
  }
}
```

### Extension API

For programmatic registration (e.g. enterprise or automation), use the [MCP Extension API](https://docs.cursor.com/context/mcp-extension-api): **`vscode.cursor.mcp.registerServer()`**. No need to edit `mcp.json` from scripts.

---

## Using MCP in chat

- **Automatic** – Agent uses MCP tools listed under **Available Tools** when relevant (including [Plan mode](./agent-modes.md)). Ask by tool name or describe what you need.
- **Toggle** – In chat, click a tool name in the tools list to enable/disable it. Disabled tools aren’t loaded or available.
- **Approval** – By default the Agent **asks before each MCP call**. Click the arrow next to the tool to see arguments.
- **Auto-run** – You can enable auto-run so the Agent uses MCP tools without asking (similar to [terminal Auto-Run](./terminal.md)). See [Auto-run settings](https://docs.cursor.com/agent/tools#auto-run).
- **Responses** – Cursor shows tool responses in chat with expandable arguments and results.

### Images from MCP

Servers can return **images** (screenshots, diagrams) as **base64** in tool response `content` with `type: "image"`, `data`, and `mimeType`. Cursor attaches them to the chat; if the model supports images, it can analyze them. See Cursor docs and [example](https://github.com/msfeldstein/mcp-test-servers/blob/main/src/image-server.js).

---

## Security

- **Source** – Only install servers from trusted developers/repos.
- **Permissions** – Review what data and APIs the server can access.
- **API keys** – Use restricted keys with minimal permissions.
- **Code** – For critical integrations, audit the server code.
- **Sensitive data** – Use env vars for secrets (no hardcoding); run sensitive servers locally with stdio; limit key scope; consider isolated environments. See [Agent security](./agent-security.md).

MCP servers can call external services and run code on your behalf; understand what each server does before installing.

---

## Examples and FAQ

- **Real-world usage** – [Web Development guide](https://docs.cursor.com/cookbook/web-development) (Linear, Figma, browser tools).
- **Debugging** – Check Cursor’s MCP logs and server stdout/stderr; verify `mcp.json` and env vars.
- **Disable temporarily** – Turn off the tool in the chat tools list, or remove/comment the server in `mcp.json`.
- **Crashes/timeouts** – Agent receives the failure; you can retry or fix the server. Use [hooks](./hooks.md) for `beforeMCPExecution` / `afterMCPExecution` if needed.
- **Updates** – For stdio servers, update the package or script and restart Cursor (or the server process). For remote servers, deploy a new version.
- **Sensitive data** – Prefer local stdio, env vars, minimal API permissions, and code review. See Security above.

---

## See also

- [Building an MCP Server](./building-mcp-server.md) – How to build an MCP server (stdio/HTTP), test with Inspector, scaffold with Cursor
- [Setup Supabase MCP](./setup-supabase-mcp.md) *(when available)* – Supabase-specific MCP setup
- [Agent security](./agent-security.md) – MCP approval and guardrails
- [Terminal](./terminal.md) – MCP allowlist and Auto-Run
- [Hooks](./hooks.md) – `beforeMCPExecution` / `afterMCPExecution`
- [Cursor docs – MCP](https://docs.cursor.com/context/mcp)
- [MCP introduction](https://modelcontextprotocol.io/introduction)
