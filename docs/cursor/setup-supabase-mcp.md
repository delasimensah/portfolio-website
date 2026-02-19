# Setup Supabase MCP

How to connect Cursor to Supabase via the Model Context Protocol—either **local** (Supabase CLI) or **remote** (hosted Supabase).

**Use this doc when:** You want the Agent to query your Supabase database, run migrations, list tables, or use other Supabase tools from Cursor chat.

**Prerequisites:** [MCP](./mcp.md) (transports, `mcp.json`). For local: [Supabase local setup](../supabase-local-setup.md) and Docker.

---

## Local Supabase MCP (this project)

When you run Supabase locally with the CLI, the API (Kong) exposes an MCP endpoint. No OAuth or PAT needed for local. (PAT = personal access token—a secret you generate in the dashboard to authenticate without a browser; used for remote MCP in CI.)

### 1. Start local Supabase

From the project root:

```bash
yarn supabase:start
```

Wait until you see the API URL (e.g. `http://localhost:54321`). The MCP server is served by the same API at:

- **MCP URL:** `http://localhost:54321/mcp`

### 2. Add the server to Cursor

**Option A – Project config (recommended)**

Create or edit **`.cursor/mcp.json`** in the project root:

```json
{
  "mcpServers": {
    "supabase-local": {
      "url": "http://localhost:54321/mcp"
    }
  }
}
```

**Option B – Global config**

Use **`~/.cursor/mcp.json`** with the same `mcpServers` block if you want this server in all projects.

### 3. Use in Cursor

- Restart Cursor (or reload the window) so it picks up `mcp.json`.
- In **Settings → Tools & MCP**, confirm the server appears and is connected.
- In Agent chat, the Supabase MCP tools (e.g. `list_tables`, `execute_sql`, `apply_migration`) appear under Available Tools. Ask things like: “List tables in the database using MCP” or “Run this migration with Supabase MCP.”

**Note:** Local MCP is only available while `supabase start` is running. If you stop Supabase, disable or remove the server in Cursor to avoid connection errors.

---

## Remote (hosted) Supabase MCP

For a **hosted** Supabase project, use Supabase’s hosted MCP server. It uses OAuth; Cursor will open a browser to log in and grant access.

### One-click install

Use the link from [Supabase docs – MCP](https://supabase.com/docs/guides/getting-started/mcp) (Add to Cursor). It installs the server and prompts you to authenticate.

### Manual config

Add to **`.cursor/mcp.json`** (or `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

Optional query params (append to the URL):

- **`project_ref=YOUR_REF`** – Scope to one project (disables account-level tools).
- **`read_only=true`** – Run SQL as read-only user.
- **`features=database,docs`** – Limit to certain tool groups (comma-separated).

Example: `https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true`

After adding, Cursor will prompt for Supabase login when you first use the server.

---

## Tools you get

Supabase MCP exposes tools such as:

- **Database:** `list_tables`, `execute_sql`, `apply_migration`, `list_migrations`, `list_extensions`
- **Development:** `generate_typescript_types`, `get_project_url`, `get_publishable_keys`
- **Edge Functions:** `list_edge_functions`, `get_edge_function`, `deploy_edge_function`
- **Debugging:** `get_logs`, `get_advisors`
- **Docs:** `search_docs`

Storage and some account tools may be disabled by default or by the `features` parameter on the remote server.

---

## Security

- **Local:** MCP talks to your local API only. Don’t expose port 54321 to the internet.
- **Remote:** Prefer scoping to one project (`project_ref`) and read-only where possible. Don’t connect MCP to production; use a dev/staging project. See [Supabase – Security risks](https://supabase.com/docs/guides/getting-started/mcp#security-risks).
- Keep **manual approval** for MCP tool calls in Cursor (Settings → Agent) and review each call before running.

---

## See also

- [MCP](./mcp.md) – Transports, `mcp.json`, approval, security
- [Supabase local setup](../supabase-local-setup.md) – Prerequisites for local MCP
- [Supabase – Model context protocol (MCP)](https://supabase.com/docs/guides/getting-started/mcp)
- [Agent security](./agent-security.md) – MCP approval and guardrails
