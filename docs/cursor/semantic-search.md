# Semantic Search

**Semantic search** finds code by **meaning**, not just by matching text. You can ask in natural language (e.g. “where is authentication handled?”) and get relevant results across the whole codebase.

**Use this doc when:** You want to understand how Cursor’s code search works, how indexing and privacy work, or how to configure what gets indexed.

**For current indexing behavior and options:** [Cursor docs – Semantic Search](https://docs.cursor.com/context/semantic-search).

---

## How it works

Cursor turns your code into searchable **vectors** in a multi-step pipeline:

1. **Sync** – Workspace files are synced with Cursor’s servers so the index stays current.
2. **Chunking** – Files are split into meaningful chunks (functions, classes, logical blocks), not arbitrary snippets.
3. **Embeddings** – Each chunk is turned into a vector (a mathematical representation of its meaning) using AI models.
4. **Storage** – Embeddings are stored in a vector database built for fast similarity search over many chunks.
5. **Query** – Your search query is turned into a vector with the same models.
6. **Similarity** – The system finds the most similar stored chunks by comparing vectors.
7. **Results** – You get code snippets with file paths and context, ordered by semantic similarity.

So you search by **concept** (e.g. “top navigation”) and get results like `header.tsx` even when the word “navigation” isn’t in the filename.

---

## Why semantic search?

Tools like **grep** and **ripgrep** are great for **exact** text matches. Semantic search adds **meaning**: it understands that “header” and “top navigation” are related.

### Benefits over grep alone

- **Faster at query time** – Heavy work is done during indexing (offline), so Agent searches are faster and cheaper.
- **Better relevance** – Models trained for code retrieve more relevant results than plain string match.
- **Fewer follow-ups** – Users need fewer clarifying messages and tokens than with grep-only search.
- **Conceptual matching** – Find code by what it **does**, not only by names or keywords.

The Agent uses **both** grep and semantic search: grep for exact patterns, semantic search for conceptual similarity. Together they give the best results.

---

## Getting started

### First-time indexing

Indexing starts **automatically** when you open a workspace. Cursor scans the workspace, syncs files, and builds embeddings. **Semantic search is available once indexing reaches about 80% completion.**

---

## Keeping your index updated

### Automatic sync

Cursor keeps the index in sync with your workspace by checking periodically (about every **5 minutes**). Only **changed** files are updated: old embeddings are removed and new ones created. Updates are batched to limit impact on your workflow.

### What gets indexed

- **New files** — Added to the index automatically
- **Modified files** — Old embeddings removed, new ones created
- **Deleted files** — Removed from the index promptly
- **Large/complex files** — May be skipped for performance

### Performance and troubleshooting

- **Performance** – Batching and caching keep results accurate and up to date.
- **If search or indexing misbehaves:** Check your internet connection, workspace permissions, then restart Cursor. If it still fails, contact support.

---

## Privacy and security

- **Paths** – File paths are **encrypted** before being sent to Cursor’s servers so project structure stays confidential.
- **Content** – Your **source code is not stored in plaintext** on Cursor’s servers. Code is held in memory only during indexing and then discarded; there is no long-term storage of your source.
- See Cursor’s [Privacy](https://cursor.com/privacy) and [Security](https://cursor.com/security) pages for full details.

---

## Configuration

**What’s indexed:** Everything except files covered by [ignore files](https://docs.cursor.com/context/ignore-files) (e.g. `.gitignore`, `.cursorignore`). Ignoring large or irrelevant files improves result quality.

**Settings:** Use **Show Settings** (in the indexing/search area) to:

- Turn on automatic indexing for new repositories
- Configure which files to ignore

**View indexed files:** **Cursor Settings** → **Indexing & Docs** → **View included files**. This opens a `.txt` file listing all indexed paths.

---

## FAQ

- **Where can I see all indexed codebases?** Use **Cursor Settings** → **Indexing & Docs** (and “View included files” for the list). Full management options are in the Cursor docs.
- **How do I delete all indexed codebases?** See Cursor Settings → Indexing & Docs and the [ignore files](https://docs.cursor.com/context/ignore-files) docs.
- **How long are indexed codebases retained?** See Cursor’s privacy and data retention documentation.
- **Is my source code stored on Cursor servers?** No. Code is processed in memory during indexing and not stored in plaintext; only embeddings (vectors) are stored.
- **Can I customize path encryption?** Check the latest Cursor docs and security pages.
- **How does team sharing work?** Indexing is per workspace; see Cursor docs for team and multi-user behavior.
- **What is smart index copying?** See Cursor’s Indexing & Docs documentation for current behavior.
- **Does Cursor support multi-root workspaces?** Yes. [Multi-root workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces) are supported: all roots are indexed, each codebase’s context is available to the AI, and `.cursor/rules` apply across folders. Some features that assume a single git root (e.g. worktrees) are disabled. **Cloud Agents** do not support multi-root workspaces.

---

## See also

- [Cursor concepts overview](./cursor-concepts-overview.md) – Semantic Search, Context, Agent
- [Agent](./agent.md) – How the Agent uses search tools
- [Agent security](./agent-security.md) – .cursorignore and file access
- [Cursor docs – Semantic Search](https://docs.cursor.com/context/semantic-search)
- [Cursor docs – Ignore files](https://docs.cursor.com/context/ignore-files)
