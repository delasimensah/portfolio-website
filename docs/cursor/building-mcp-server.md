# Building an MCP Server

How to build a **custom MCP server** so Cursor can use your external data or actions. Servers run over **stdio** (local) or **HTTP/SSE** (shared).

**Use this doc when:** You want to build your own MCP server, test it with MCP Inspector, or move from stdio to HTTP deployment.

**Prerequisites:** [MCP](./mcp.md) — transports, config. [@ Mentions](./at-mentions.md) — using @ URLs in prompts.

**For protocol and SDK:** [MCP introduction](https://modelcontextprotocol.io/introduction), [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk), [Cursor docs – MCP](https://docs.cursor.com/context/mcp).

---

## Steps to build an MCP server

### 1. Choose language and SDK

- **TypeScript/Node:** [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) — most common; works with Cursor’s Node/npx flow.
- **Python:** [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk).
- **Other:** Implement the [MCP protocol](https://modelcontextprotocol.io/introduction) over stdio or HTTP/SSE in any language.

Use **Zod** (TypeScript) or equivalent for tool input/output schemas so the client gets typed arguments.

### 2. Create the project

- New directory, e.g. `my-mcp-server/`.
- Install the SDK and Zod (if TypeScript): e.g. `npm init -y`, `npm install @modelcontextprotocol/sdk zod`.
- Single entrypoint (e.g. `index.ts` or `src/index.ts`) that will be run by Cursor or the Inspector.

### 3. Define tools and/or resources

- **Tools** — actions the Agent can call (e.g. “run this query”, “fetch this URL”). Each tool has a name, description, and an input schema (e.g. Zod). The handler runs your logic and returns text (or structured content, e.g. images).
- **Resources** — read-only data the client can load by URI (e.g. `file:///path` or custom schemes). Expose things like “contents of config” or “list of endpoints” so the model can read them without a tool call.

Implement the server so it registers these with the SDK and responds to `tools/list`, `tools/call`, and optionally `resources/list` / `resources/read`.

### 4. Choose transport and run the server

- **stdio (local):** Cursor runs your process and talks via stdin/stdout. No network. Use the SDK’s stdio transport; your entrypoint just starts the server and connects the transport.
- **HTTP/SSE (shared):** Run a long-lived process that exposes an HTTP or SSE endpoint. Cursor (or other clients) connect to the URL. Use the SDK’s HTTP/SSE transport and host with your preferred framework (e.g. Express, Hono, or the SDK’s example).

For local use with Cursor, stdio is simplest: Cursor starts the server and no URL is needed.

### 5. Test with MCP Inspector

- Install and run the [MCP Inspector](https://modelcontextprotocol.io/legacy/tools/inspector): e.g. `npx @modelcontextprotocol/inspector`.
- In the Inspector, point it at your server (e.g. “Run command” and enter `node path/to/index.js` or `npx tsx path/to/index.ts`).
- Confirm your tools and resources appear. Invoke tools with sample inputs and check responses.
- Fix any protocol or schema issues before adding to Cursor.

### 6. Add the server to Cursor

- **stdio:** In `.cursor/mcp.json` (project or global), add an entry under `mcpServers` with `command` and `args` that run your server (e.g. `"command": "node", "args": ["path/to/index.js"]` or `npx tsx index.ts`). Use `"env"` if the server needs env vars.
- **HTTP/SSE:** Add an entry with `url` pointing to your server’s MCP endpoint (e.g. `http://localhost:3000/mcp`).
- Restart or reload Cursor. In **Settings → Tools & MCP** the server should appear; in Agent chat your tools show under Available Tools.

### 7. (Optional) Scaffold with Cursor

To generate the initial server code: in Agent chat, write a short spec (e.g. “MCP server that exposes a tool X and a resource Y”) and @-mention the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) README (or Python SDK, etc.). Ask the Agent to create the project and entrypoint. Then run the Inspector and add to `mcp.json` as above.

**Example refactor prompt** (adding HTTP to an existing stdio server): _“Based on the existing MCP server, create a new file that implements the HTTP protocol. Move shared logic to a core module; keep stdio and HTTP as separate transport implementations. @[MCP SDK README URL]”_

---

## See also

- [MCP](./mcp.md) — Installing servers, mcp.json, transports, directory
- [@ Mentions](./at-mentions.md) — Using @ URLs in prompts
- [Cursor docs – MCP](https://docs.cursor.com/context/mcp)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
