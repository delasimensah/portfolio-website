# Ignore files

Control which files Cursor can **read and index** using a **`.cursorignore`** file in your project root. Uses `.gitignore`-style patterns.

**Use this doc when:** You want to hide files from semantic search and AI (Tab, Agent, Inline Edit, @mentions), set global ignores, or use indexing-only ignores.

**For pattern details and full default list:** [Cursor docs – Ignore files](https://docs.cursor.com/context/ignore-files).

---

## What .cursorignore affects

Cursor **blocks access** to paths in `.cursorignore` for:

- [Semantic search](./semantic-search.md)
- Code used by [Tab](./tab.md), [Agent](./agent.md), and Inline Edit (Cmd/Ctrl+K)
- [@ mention references](./at-mentions.md)

**Not covered:** Terminal and MCP tools used by the Agent can still read the filesystem; `.cursorignore` does not restrict them.

---

## Why ignore files?

- **Security** — Restrict API keys, credentials, secrets. Cursor blocks ignored files from AI features, but LLMs can be unpredictable; not a complete guarantee.
- **Performance** — In large codebases or monorepos, exclude irrelevant parts for faster indexing and better discovery.

---

## Global ignore

In **user settings** you can set **global ignore patterns** that apply to all projects (empty by default). Useful for sensitive files without per-project config.

Common patterns: `**/.env`, `**/.env.*`, `**/credentials.json`, `**/secrets.json`, `**/*.key`, `**/*.pem`, `**/id_rsa`.

---

## Configuring .cursorignore

Create **`.cursorignore`** in the **project root**. Syntax matches **`.gitignore`**.

### Pattern examples

```
config.json      # Specific file
dist/            # Directory
*.log            # File extension
**/logs          # Nested directories
!app/            # Negation (exclude from ignore)
```

Comments: `#`. Later patterns override earlier ones. Patterns are relative to the file’s location.

### Hierarchical .cursorignore

**Cursor Settings → Features → Editor → Hierarchical Cursor Ignore** — When enabled, Cursor looks for `.cursorignore` in parent directories as well.

---

## .cursorindexingignore

Use **`.cursorindexingignore`** to exclude files from **indexing only**. Those files stay accessible to AI (Agent, Tab, etc.) but **do not appear in codebase search**.

---

## Default ignores

Cursor automatically ignores:

- Everything in **`.gitignore`**
- A **default list** (for indexing): lock files (`package-lock.json`, `yarn.lock`, etc.), `.env*`, `.git/`, binary/media/archive extensions, dirs like `node_modules/`, `__pycache__/`, `.next/`, `.venv/`, and many others.

Override with **`!`** in `.cursorignore` (e.g. `!some-file.txt`). For the **full default list**, see [Cursor docs – Ignore files](https://docs.cursor.com/context/ignore-files).

### Negation limitations

With **negation** (`!`), you cannot re-include a file if a **parent** was excluded with a pattern that matches whole directories (e.g. `*`).

- `public/*` then `!public/index.html` — ✅ works (file at top level of `public/`).
- `public/*` then `!public/assets/style.css` — ❌ doesn’t work (nested path).

**Workaround:** Exclude the nested directory explicitly, then negate the file:

```
public/assets/*
!public/assets/style.css
```

Excluded directories are not traversed, so patterns on files inside them have no effect. Same behavior as `.gitignore`; see [Git docs – gitignore](https://git-scm.com/docs/gitignore).

---

## Troubleshooting

Test whether a path is ignored: **`git check-ignore -v [file]`** (same pattern rules as `.gitignore`).

---

## See also

- [Agent security](./agent-security.md) — Guardrails, blocking Agent from files.
- [Semantic Search](./semantic-search.md) — What gets indexed.
- [Cursor docs – Ignore files](https://docs.cursor.com/context/ignore-files) — Full reference and default list.
