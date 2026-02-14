# Building an MCP Server

How to build a **custom MCP server** so Cursor can use your external data or actions. Servers run over **stdio** (local) or **HTTP/SSE** (shared).

**Use this doc when:** You want to build your own MCP server, test it with MCP Inspector, or move from stdio to HTTP deployment.

**Prerequisites:** [MCP](./mcp.md) — transports, config. [@ Mentions](./at-mentions.md) — using @ URLs in prompts.

**For protocol and SDK:** [MCP introduction](https://modelcontextprotocol.io/introduction), [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk), [Cursor docs – MCP](https://docs.cursor.com/context/mcp).

---

## Steps

1. **Use the MCP SDK** (e.g. [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)) to define **tools** (actions) and **resources** (read-only context). Use **Zod** (or equivalent) for input/output schemas.
2. **Run over stdio** for local use — Cursor starts the process and talks via stdin/stdout. For **shared access**, deploy as an **HTTP/SSE** server and add the URL to `mcp.json`.
3. **Test** with the [MCP Inspector](https://modelcontextprotocol.io/legacy/tools/inspector): e.g. `npx @modelcontextprotocol/inspector bun run index.ts` (or your entrypoint). Verify tools and resources, then add the server to Cursor.
4. **Scaffold with Cursor** by writing a short spec and @-mentioning the SDK and any library READMEs so the Agent can generate the initial server code.

Example refactor prompt for adding HTTP to an existing stdio server: *“Based on the existing MCP server, create a new file that implements the HTTP protocol. Move shared logic to a core module; keep stdio and HTTP as separate transport implementations. @[MCP SDK README URL]”*

---

## See also

- [MCP](./mcp.md) — Installing servers, mcp.json, transports, directory
- [@ Mentions](./at-mentions.md) — Using @ URLs in prompts
- [Cursor docs – MCP](https://docs.cursor.com/context/mcp)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
