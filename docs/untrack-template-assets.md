# Untrack template docs and Cursor rules

Use this when you have created a **project-specific repo** from this template and you do **not** want to include the template’s documentation or Cursor rules in that repo. Typical cases:

- **Client handover** — You are delivering the codebase to a client and do not want to ship internal docs or Cursor/editor rules.
- **Clean repo** — You prefer to track only app and package code, and add project-specific docs or rules later if needed.
- **Selective use** — Whether you include `docs/` and `.cursor/` depends on the project and whether you are collaborating with others; run the script only when you want to untrack them.

## What the script does

1. **Updates `.gitignore`** in the current repo by appending:
   - `/docs`
   - `/.cursor`
     So Git will ignore the root `docs/` folder and the `.cursor/` folder (including `.cursor/rules/`).

2. **Stops tracking those paths** by running `git rm -r --cached docs` and `git rm -r --cached .cursor`. The files and folders remain on disk; they are only removed from Git’s index so future changes are not committed.

3. **Prints next steps** so you can commit the updated `.gitignore` and the removal of the cached paths.

## When to run it

- Run in the **project repo** (the one you created from this template), not in the template repo itself.
- Run **when you are ready** to stop versioning `docs/` and `.cursor/` in that project—for example before the first client handover or when you decide this project will not use template docs/rules.
- You can run it at any time; if the paths are already untracked or missing, the script is effectively a no-op.

## How to run it

**From the project repo root:**

```bash
# Make the script executable (once)
chmod +x scripts/untrack-template-assets.sh

# Run it
./scripts/untrack-template-assets.sh
```

Then commit the result:

```bash
git add .gitignore
git status   # confirm docs and .cursor show as deleted from index / untracked
git commit -m "Untrack template docs and Cursor rules"
```

## After running

- **Files on disk** — `docs/` and `.cursor/` are still present locally. You can keep them for reference or delete them (e.g. `rm -rf docs .cursor`).
- **Future commits** — Changes under `docs/` and `.cursor/` will no longer be tracked or committed in this repo.
- **Other clones** — Anyone who clones the repo after your commit will not get `docs/` or `.cursor/` from Git; they only exist in your working tree if you did not delete them.

## Customizing what is untracked

To untrack only `.cursor/rules` (and keep the rest of `.cursor` or `docs/`):

1. Edit `scripts/untrack-template-assets.sh`.
2. In the `.gitignore` block, replace `/.cursor` with `/.cursor/rules`.
3. In the `git rm` lines, replace `git rm -r --cached .cursor` with `git rm -r --cached .cursor/rules` (and remove or keep the `docs` line as you prefer).

To untrack additional folders (e.g. app-level `docs`), add the paths to the script’s `.gitignore` block and add corresponding `git rm -r --cached <path>` lines.

## Script location

The script lives in the **template** repo at `scripts/untrack-template-assets.sh`. When you create a new project from the template, the script is copied into the new repo so you can run it there when you want.
