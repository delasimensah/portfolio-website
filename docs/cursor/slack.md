# Slack

With Cursor’s Slack integration you can run [Cloud Agents](./cloud-agents.md) from Slack by mentioning **@cursor** with a prompt. Cursor picks the repository and model from your message and recent activity.

**Use this doc when:** You want to install the Slack app, mention @cursor in channels/DMs, set repo/model defaults, use routing rules, or manage agents from Slack.

**For setup and options:** [Cursor docs – Slack](https://docs.cursor.com/integrations/slack).

---

## Get started

### Installation

1. Go to [Cursor integrations](https://www.cursor.com/dashboard?tab=integrations) (or [install page](https://cursor.com/api/install-slack-app)).
2. Click **Connect** next to Slack and install the Cursor app in your workspace.
3. After Slack install, complete in Cursor: connect GitHub, pick default repo, enable usage-based pricing, confirm privacy.
4. Use **@cursor** in Slack to start Cloud Agents.

---

## How to use

- **Basic:** Mention **@cursor** and your prompt. Cursor picks repo and model from your message and recent agent activity.
- **Specific repo:** Include the repo name, e.g. `@Cursor in cursor-app, fix the login bug` or `@Cursor fix the auth issue in backend-api`.
- **Specific model:** Mention the model, e.g. `@Cursor with opus, fix the login bug` or `@Cursor use gpt-5.2 to refactor the auth module`.

Run **@Cursor help** in Slack for the current command list.

### Commands (summary)

- **`@Cursor [prompt]`** — Start a Cloud Agent; in threads with existing agents, adds follow-up (if you own the agent).
- **`@Cursor settings`** — Configure defaults and the channel’s default repository.
- **`@Cursor [options] [prompt]`** — Use options such as `branch`, `autopr`.
- **`@Cursor agent [prompt]`** — Force a **new** agent in the thread (use when you want a separate run).
- **`@Cursor list my agents`** — List your running agents.

### Options

- **branch** — Base branch, e.g. `branch=main`.
- **autopr** — Turn automatic PR creation on/off, e.g. `autopr=false`.

Natural: `@Cursor with opus, fix the login bug in backend-api`  
Inline: `@Cursor branch=dev autopr=false Fix the login bug in backend-api`

Precedence:

- explicit values override defaults
- later values override earlier
- inline options override settings modal

### Thread context

Cloud Agents read the **whole thread** for context. Use this when the thread already discusses a solution and you want the agent to implement it.

### When to use force commands

- **@Cursor agent [prompt]** — Use in threads that already have an agent when you want a **new** agent instead of a follow-up.
- **Add follow-up** (context menu ⋯ on an agent message) — Use when multiple agents are in the thread and you need to target one for follow-up.

---

## Status and handoff

- While the agent runs: you get **Open in Cursor**.
- When it completes: Slack notification and option to view the PR in GitHub.

---

## Managing agents

- **List:** `@Cursor list my agents`.
- **Context menu (⋯)** on any agent message: **Add follow-up**, **Delete**, **View request ID**, **Give feedback**.

---

## Configuration

Manage defaults and privacy at [Dashboard → Cloud Agents](https://www.cursor.com/dashboard?tab=cloud-agents).

### Settings

- **Default model** — Used when you don’t specify one in the message.
- **Repository selection** — Cursor chooses repo by: (1) message content / repo names, (2) recent agent activity, (3) routing rules, (4) channel default, (5) your default repo.
- **Base branch** — Leave blank for repo default (e.g. `main`).

### Channel settings

Run **@Cursor settings** in a channel to set that channel’s default repository. Channel defaults override personal defaults for that channel; mentioning a repo in the message still overrides.

### Routing rules

Define keyword → repository mappings in [Dashboard → Cloud Agents](https://www.cursor.com/dashboard?tab=cloud-agents) under **Routing Rules**. Example: keyword `frontend` → `acme/web-app`. Cursor evaluates in order: message content, recent activity, routing rules, channel default, default repository.

### Privacy

Cloud Agents support **Privacy Mode**. [Privacy overview](https://www.cursor.com/privacy-overview) and [privacy settings](https://www.cursor.com/dashboard?tab=cloud-agents). Privacy Mode (Legacy) is not supported. You can control **Display Agent Summary** and **Display Agent Summary in External Channels** (e.g. Slack Connect).

---

## Permissions

The Slack app requests permissions for: reading @mentions and channel/thread history, joining channels, posting replies and status, reading/uploading files (e.g. summaries), DMs and group DMs, reactions, team and user info. See [Cursor docs – Slack](https://docs.cursor.com/integrations/slack) for the full list and descriptions.

---

## See also

- [Cloud Agents](./cloud-agents.md) — Overview, web/mobile, environment, security.
- [Cursor docs – Slack](https://docs.cursor.com/integrations/slack) — Official setup, commands, and options.
- [Cursor Privacy Policy](https://cursor.com/privacy).
