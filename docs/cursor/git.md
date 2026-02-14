# Git

Cursor adds AI-backed Git features: **AI commit messages** from staged changes and **AI merge conflict resolution** via the Agent. It can also add **attribution** to Agent commits and PRs.

**Use this doc when:** You want to generate commit messages, resolve merge conflicts with the Agent, bind a shortcut for commit generation, or configure Agent attribution (Co-authored-by / PR footer).

**For UI and options:** [Cursor docs – Git](https://docs.cursor.com/features/git).

---

## AI commit message

Cursor generates commit messages from **staged changes** (and repo history). If you use a style like [Conventional Commits](https://www.conventionalcommits.org/), it follows that pattern. You can’t customize the generation; Cursor adapts to your existing style.

**Steps:**

1. Stage the files you want to commit.
2. Open the **Git** tab in the sidebar.
3. Click the **sparkle (✨)** icon next to the commit message input.

### Keyboard shortcut

To bind a shortcut (e.g. **Cmd+M** / **Ctrl+M**):

1. Open Keyboard Shortcuts (JSON): **Cmd+Shift+P** / **Ctrl+Shift+P** → “Open Keyboard Shortcuts (JSON)”.
2. Add:

```json
{
  "key": "cmd+m",
  "command": "cursor.generateGitCommitMessage"
}
```

3. Save.

---

## AI resolve conflicts

When you have **merge conflict markers** in a file, the Agent can propose a resolution.

**Steps:**

1. Open the file with conflict markers.
2. Click **Resolve in Chat** in the merge conflict UI.
3. The Agent analyzes both sides and suggests a resolution.
4. Review and apply the proposed changes.

---

## Agent attribution

Cursor can add **attribution** to commits and PRs created by the Agent so AI-assisted work is visible in history.

**Settings:** **Cursor Settings → Agent → Attribution**. Both options are on by default.

### Commit attribution

When enabled, commits made by the Agent get a `Co-authored-by` trailer:

```
Co-authored-by: Cursor <cursoragent@cursor.com>
```

Appended automatically to any git commit the Agent runs. Idempotent: not added again if already present.

### PR attribution

When enabled, PRs created by the Agent get a footer in the body:

```
Made with [Cursor](https://cursor.com)
```

Added automatically to `gh pr create` output from the Agent. Idempotent: not duplicated if already present.

Attribution applies only to **Agent-created** commits and PRs, not to your manual commits.

---

## See also

- [Agent](./agent.md) — How the Agent runs and makes edits/commits.
- [Cursor docs – Git](https://docs.cursor.com/features/git) — Official Git features and settings.
