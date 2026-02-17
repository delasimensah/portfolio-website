# Tab

**Tab** is Cursor’s autocompletion model. It suggests multi-line edits, imports, and jumps so you can stay in the flow. The more you use it (accept with **Tab**, reject with **Esc**), the better it gets at matching your intent.

**Use this doc when:** You want to understand Tab behavior, shortcuts, settings, or why suggestions appear the way they do.

**For current settings and behavior:** [Cursor docs – Tab](https://docs.cursor.com/tab/overview).

---

## What Tab can do

- **Multi-line edits** – Change several lines in one suggestion.
- **Auto-import** – Add missing import statements (TypeScript and Python).
- **Jump in file** – Suggest the next place to edit in the same file; accept and press Tab again to jump.
- **Jump across files** – Suggest edits in other files; a **portal** at the bottom shows the cross-file suggestion.
- **Context-aware suggestions** – Based on recent changes, linter errors, and accepted edits.

---

## Suggestions

- **New text** – Completions show as **semi-opaque ghost text**.
- **Existing code** – A **diff popup** appears to the right of the current line.

**Accept:** **Tab**  
**Reject:** **Esc**  
**Accept word-by-word:** **Cmd+Right** (Mac) / **Ctrl+Right** (Windows/Linux)  
**Hide:** Keep typing or press **Esc**.

### Jump in file

Tab predicts the **next edit location** in the file. After you accept an edit, press **Tab** again to jump to that location.

### Jump across files

Tab can suggest **edits in other files**. When it does, a **portal window** opens at the bottom with the cross-file suggestion so you can accept or edit there.

---

## Auto-import

In **TypeScript** and **Python**, Tab can add **missing import statements**. Use a symbol from another file and Tab will suggest the import; accepting adds it without leaving the current line.

**If auto-import doesn’t work:**

- Ensure the project has the right **language server** or extensions.
- Try **Cmd+.** / **Ctrl+.** and see if the import appears in **Quick Fix**; if it does, the language server is working and Tab may need the same setup.

---

## Tab in Peek

Tab works inside **Go to Definition** and **Go to Type Definition** peek views. You can change function signatures or types and fix call sites without closing the peek.

**Vim:** Use **`gd`** to go to definition, then use Tab to edit and resolve references in one flow.

---

## Partial accepts

Accept **one word at a time** with **Cmd+Right** / **Ctrl+Right**. The keybinding is **`editor.action.inlineSuggest.acceptNextWord`**. Enable or change it in **Cursor Settings → Tab**.

---

## Settings

- **Cursor Tab** — Turn on context-aware, multi-line suggestions around the cursor (based on recent edits).
- **Partial Accepts** — Accept the next word of a suggestion (Cmd+Right / Ctrl+Right).
- **Suggestions While Commenting** — Allow Tab suggestions inside comment blocks.
- **Whitespace-Only Suggestions** — Allow suggestions that only change formatting.
- **Imports** — Auto-import for TypeScript.
- **Auto Import for Python (beta)** — Auto-import for Python.

---

## Toggling Tab

Use the **status bar** (bottom-right) to:

- **Snooze** – Turn off Tab for a set duration.
- **Disable globally** – Turn off Tab for all files.
- **Disable for extensions** – Turn off Tab for specific file types (e.g. markdown, JSON).

---

## FAQ

- **Tab is distracting in comments** – Use **Suggestions While Commenting** in Cursor Settings → Tab to turn it off in comments, or **Snooze** / **Disable for extensions** from the status bar.
- **Change the shortcut for accepting suggestions** – Edit keybindings for **Tab** / inline suggest actions (e.g. `editor.action.inlineSuggest.accept`) in Cursor or VS Code keybindings.
- **How does Tab generate suggestions?** – Cursor syncs recently edited files to its backend, where they are held encrypted in memory. When generating or updating a suggestion, it decrypts that context and uses it to produce completions. See Cursor’s privacy and security docs for details.

---

## See also

- [Cursor concepts overview](./cursor-concepts-overview.md) – Tab, Agent, Inline Edit
- [Agent](./agent.md) – When to use the Agent instead of Tab
- [Hooks](./hooks.md) – `beforeTabFileRead` / `afterTabFileEdit` for Tab-specific policies
