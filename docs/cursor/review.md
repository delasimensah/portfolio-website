# Review

When the Agent generates code changes, they appear in a **review interface** that shows additions and deletions with color-coded lines. You decide which changes are applied to your codebase.

**Use this doc when:** You want to understand the diff UI, how to accept or reject changes, or how to use Agent Review to catch bugs before merging.

**For UI and settings:** [Cursor docs – Review / Agent Review](https://docs.cursor.com/agent/review).

---

## Diffs

The review interface shows changes in a standard diff format:

- **Added lines** — New code; `+ const newVariable = 'hello';`
- **Deleted lines** — Removed code; `- const oldVariable = 'goodbye';`
- **Context lines** — Unchanged code (for context); `  function example() {`

You can accept or reject at the file level or line by line (see [Review UI](#review-ui)).

---

## Review UI

After the Agent finishes generating, you’re prompted to **review all changes** before they’re applied. This gives you an overview of what would be modified.

### File-by-file

A **floating review bar** at the bottom of the screen lets you:

- **Accept** or **Reject** changes for the **current file**
- Move to the **next file** that has pending changes

Work through each file until you’ve accepted or rejected everything.

### Selective acceptance

For finer control:

- **Accept most, reject a few:** Reject the lines you don’t want, then click **Accept all** for the rest.
- **Reject most, keep a few:** Accept only the lines you want, then click **Reject all** for the rest.

---

## Agent Review

**Agent Review** runs the Agent in a mode focused on **finding bugs in your diffs**. It looks at proposed changes line by line and flags issues before you merge.

> **Automatic reviews on every PR?** See [Bugbot](https://docs.cursor.com/bugbot), which runs advanced analysis on pull requests and suggests improvements automatically.

### Where to use it

1. **In the agent diff** – After an Agent response, click **Review**, then **Find Issues** to analyze the proposed edits and get follow-up suggestions.
2. **In Source Control** – Open the Source Control tab and run Agent Review to analyze **all local changes** compared to your main branch.

### Billing

Agent Review starts an agent run and is **billed as a usage-based request** (same as other agent usage).

### Settings

In Cursor settings you can configure:

- **Auto-run on commit** — Run a bug scan automatically after each commit
- **Include submodules** — Include changes from Git submodules in the review
- **Include untracked files** — Include files that aren’t in Git yet

---

## See also

- [Agent](./agent.md) – How the Agent works and generates changes
- [Agent modes](./agent-modes.md) – Modes and when to use them
- [Cursor docs – Bugbot](https://docs.cursor.com/bugbot) – Automated PR reviews
