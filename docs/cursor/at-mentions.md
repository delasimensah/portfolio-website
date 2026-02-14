# @ Mentions

**@ mentions** let you add specific context to the Agent chat: files, folders, code snippets, docs, past chats, and more. Use **arrow keys** to move through suggestions and **Enter** to select. If you pick a **category** (e.g. Files), the list filters to show relevant items in that category.

**Use this doc when:** You want to attach files, folders, code, docs, or past conversations to your prompt so the Agent has the right context.

**For UI and options:** [Cursor docs – Chat / context](https://docs.cursor.com/agent/chat/tabs).

---

## @Files & Folders

### Referencing files

- Choose **@Files & Folders** (or the equivalent file picker), then search and select a filename to reference the **whole file**.
- You can also **drag files** from the sidebar into the Agent chat to add them as context.

### Referencing folders

- Use **@Folders** to reference a directory. Cursor sends the **folder path** and an **overview of its contents** so the AI knows what’s there.
- After selecting a folder, type **`/`** to go deeper and see **subfolders**.

### Context management

Large files and folders are **automatically condensed** to fit within context limits. See Cursor’s docs on [file & folder condensation](https://docs.cursor.com/agent/chat/summarization#file--folder-condensation) for details.

---

## @Code

Use **@Code** to reference **specific code sections** instead of whole files. You get finer control by selecting exact snippets (functions, blocks, or lines) so the Agent sees only what’s relevant.

---

## @Docs

**@Docs** pulls in documentation to help the Agent write code. Cursor ships with popular docs and lets you add your own.

### Using existing documentation

Type **@Docs** in chat to see available documentation. Browse and select from the listed frameworks and libraries.

### Adding your own documentation

1. Type **@Docs** and choose **Add new doc**.
2. Paste the **URL** of the documentation site.

Cursor indexes and understands the doc site, including subpages. Use it like any other @Docs source.

Turn on **Share with team** to make the doc available to your whole team.

### Managing documentation

Go to **Cursor Settings → Indexing & Docs** to:

- Edit documentation URLs
- Remove docs you no longer need
- Add new documentation

---

## @Past Chats

Use **@Past Chats** to bring in **previous conversations** as context. The Agent can see that conversation’s history (messages, code changes, tool results) and continue from there.

- Type **@** in the chat input and pick a past chat from the dropdown. Recent chats appear at the top.
- Use this to build on earlier work, debug across sessions, or remind the Agent of past decisions.

---

## Built-in commands

- **Summarize** – Compresses the context window and summarizes the conversation. Use when the chat is long and you want to free space without losing the thread.

You can also add [custom commands](./commands.md) that appear when you type `/` in chat.

---

## Changelog (Cursor 2.0)

Cursor 2.0 changed how context and @ mentions work:

1. **Context tray → inline pills** – The top tray that showed included context was removed. Context is now shown **inline as pills** in the prompt input. The Agent still receives the same context; copy/paste of prompts with tagged context was improved.
2. **Fewer explicit @ menu items** – Items like **@Definitions**, **@Web**, **@Link**, **@Recent Changes**, **@Linter Errors**, and **@Git** were removed from the menu. The Agent **gathers context itself** when needed (e.g. you can ask it to “review changes on my branch” instead of attaching @Git).
3. **Notepads deprecated** – Notepads are [deprecated](https://forum.cursor.com/t/deprecating-notepads-in-cursor/138305/5); use other context (files, rules, chat) instead.
4. **Applied rules** – Hover the **context gauge** in the prompt input to see which rules are applied.

---

## See also

- [Agent](./agent.md) – How the Agent uses context and tools
- [Commands](./commands.md) – Custom slash commands
- [Semantic Search](./semantic-search.md) – How code is indexed and searched
- [Rules](./rules.md) – Project and user rules as context
- [Cursor docs – Summarization](https://docs.cursor.com/agent/chat/summarization#file--folder-condensation)
