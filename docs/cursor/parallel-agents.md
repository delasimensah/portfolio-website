# Parallel Agents

**Parallel agents** let you run **multiple agents locally in parallel** or run **one prompt across multiple models at once** (Best-of-N). Each agent runs in its own **Git worktree**, so edits and builds don’t conflict. Cursor creates and manages worktrees for you (one worktree per agent).

**Use this doc when:** You want to run parallel agents, use Best-of-N (multiple models on one prompt), configure worktree setup, or understand Apply and cleanup.

**For limits and settings:** [Cursor docs – Parallel Agents](https://docs.cursor.com/features/parallel-agents).

---

## Basic usage

Run a single agent in a worktree. When the run finishes, click **Apply** to bring the agent’s changes into your local branch (unlike **Keep** in normal local agents).

List worktrees: **`git worktree list`**. Cursor worktrees appear under `~/.cursor/worktrees/<repo>/`.

---

## Best-of-N (multiple models)

Run **one prompt on multiple models** at once. You get one card per model; switch between them to compare changes, then **Apply** the one you want to your checked-out branch.

**Good for:**

- Hard problems where different models try different approaches
- Comparing code quality across model families
- Catching edge cases one model might miss
- Benchmarking which models work best for your codebase

Configure notifications/sounds in Cursor settings so you know when parallel agents finish.

---

## Apply

1. Cursor creates a worktree and copies your primary working tree into it (Git-ignored files are not copied).
2. The agent works in isolation in that worktree and can edit files.
3. **Apply** merges those changes into your primary working tree.

When applying from **multiple** Best-of-N results in the same run, Cursor can:

- **Full overwrite** — Replace file contents with the chosen worktree’s version.
- **Merge** — Use the normal conflict-resolution UI to combine choices.

---

## Initialization script (worktree setup)

Customize worktree setup via **`.cursor/worktrees.json`**. Cursor looks for it: (1) in the worktree path, (2) in the project root.

### Config keys

- **`setup-worktree-unix`** — Commands or script path for macOS/Linux (overrides `setup-worktree` on Unix).
- **`setup-worktree-windows`** — Commands or script path for Windows (overrides `setup-worktree` on Windows).
- **`setup-worktree`** — Fallback for all OSes.

Each key: **array of shell commands** (run in order) or **string** path to a script file relative to the directory containing `worktrees.json`.

**Variable:** `$ROOT_WORKTREE_PATH` (Unix) / `%ROOT_WORKTREE_PATH%` (Windows) / `$env:ROOT_WORKTREE_PATH` (PowerShell) — path to the primary working tree. Use it to copy `.env` etc. into the worktree.

Avoid symlinking dependencies into the worktree; use fast package managers (e.g. bun, pnpm, uv) and run install in the setup instead.

### Example: command arrays

**Node:** `npm ci`, copy `.env` from `$ROOT_WORKTREE_PATH`.  
**Python:** `python -m venv venv`, activate and `pip install -r requirements.txt`, copy `.env`.  
**With migrations:** add `npm run db:migrate` (or equivalent) after install and env copy.  
**Build and link:** e.g. `pnpm install`, `pnpm run build`, copy `.env.local`.

### Example: script files

```json
{
  "setup-worktree-unix": "setup-worktree-unix.sh",
  "setup-worktree-windows": "setup-worktree-windows.ps1",
  "setup-worktree": ["echo 'Using generic fallback'"]
}
```

Put scripts in **`.cursor/`** next to `worktrees.json`. Scripts can run `npm ci`, copy env files, run migrations, etc.; use `$ROOT_WORKTREE_PATH` to copy from the main tree.

### OS-specific

Use `setup-worktree-unix` and `setup-worktree-windows` for different commands per OS (e.g. `cp` vs `copy`, `chmod` on Unix only).

### Debugging

Open the **Output** panel, choose **Worktrees Setup** from the dropdown to see setup script output.

---

## Cleanup

- **Per-workspace limit:** Up to **20 worktrees** per workspace (configurable: `cursor.worktreeMaxCount`).
- **Auto cleanup:** When over the limit, Cursor removes the **oldest** worktrees (by last access). Cleanup is per-workspace.

Settings (2.1+):

```json
{
  "cursor.worktreeCleanupIntervalHours": 6,
  "cursor.worktreeMaxCount": 20
}
```

---

## SCM pane

**`git.showCursorWorktrees`** (default `false`) — When enabled, Cursor-created worktrees appear in the Source Control (SCM) pane.

---

## LSP in worktrees

Cursor does **not** currently run the Language Server (LSP) in worktrees for performance. The agent cannot lint inside worktrees; support may be added later.

---

## See also

- [Agent](./agent.md) — How the Agent works; Apply here applies worktree changes to your branch.
- [Agent modes](./agent-modes.md) — Modes and model selection.
- [Cursor docs – Parallel Agents](https://docs.cursor.com/features/parallel-agents) — Official reference and limits.
