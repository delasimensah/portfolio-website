# Deeplinks

Deeplinks let you **share prompts, commands, rules, and skills** so others can open them in Cursor (or on [cursor.com](https://cursor.com)). The recipient always **reviews and confirms** before anything runs; deeplinks never auto-execute.

**Use this doc when:** You want to share a prompt/command/rule/skill via link, open a deeplink on the web, or understand the URL format.

**For URL limits and options:** [Cursor docs – Deeplinks](https://docs.cursor.com/features/deeplinks).

---

**Security:** Review content before sharing. Don’t include API keys, passwords, or proprietary code in shared prompts or commands.

---

## Base URL

- **App:** `cursor://anysphere.cursor-deeplink/`
- **Web:** `https://cursor.com/link/` — same path and query params. Web links open on cursor.com; users can open in Cursor or copy for the app.

Example: `cursor://anysphere.cursor-deeplink/prompt?text=Hello%20world` → `https://cursor.com/link/prompt?text=Hello%20world`

---

## Prompts

Opens Cursor with the prompt **pre-filled in chat**. User confirms before execution.

- **Path:** `prompt`
- **Param:** `text` (URL-encoded prompt)

Example: `cursor://anysphere.cursor-deeplink/prompt?text=Research%20and%20find%20one%20bug%20in%20this%20codebase`

---

## Commands

Creates a **new command** from your `.cursor/commands` content. User reviews and confirms before it’s saved.

- **Path:** `command`
- **Params:** `name` (letters, numbers, dots, hyphens, underscores), `text` (command content, URL-encoded)

Example: `cursor://anysphere.cursor-deeplink/command?name=debug-api&text=Add%20console.log%20statements%20to%20debug%20API%20responses`

---

## Rules

Creates a **new rule** from your `.cursor/rules` content. User reviews and confirms before it’s added.

- **Path:** `rule`
- **Params:** `name` (letters, numbers, dots, hyphens, underscores), `text` (rule content, URL-encoded)

Example: `cursor://anysphere.cursor-deeplink/rule?name=typescript-strict&text=Always%20use%20strict%20TypeScript%20types%20and%20avoid%20'any'`

---

## Skills

Creates a **new skill** (SKILL.md). User reviews and confirms before it’s added.

- **Path:** `skill`
- **Params:** `name` (letters, numbers, dots, hyphens, underscores), `text` (skill content, URL-encoded)

Example: `cursor://anysphere.cursor-deeplink/skill?name=rework-commits&text=Rework%20a%20branch%20into%20a%20sequence%20of%20small%2C%20semantic%20commits%20for%20review`

---

## FAQ

- **Max length for deeplink URLs?** See [Cursor docs – Deeplinks](https://docs.cursor.com/features/deeplinks).
- **Use on web instead of app?** Use `https://cursor.com/link/` plus the same path and query params (e.g. `/prompt?text=...`). Users can open in the browser or copy the link to use in Cursor.

---

## See also

- [Rules](./rules.md) — Project/user/team rules, `.cursor/rules`.
- [Commands](./commands.md) — Custom slash commands, `.cursor/commands`.
- [Agent Skills](./agent-skills.md) — SKILL.md, skills directory.
- [Cursor docs – Deeplinks](https://docs.cursor.com/features/deeplinks) — Official reference and limits.
