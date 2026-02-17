# Cloud Agents

**Cloud Agents** run the same [agent fundamentals](https://learn.cursor.com/agents) as the in-editor Agent but **asynchronously in a remote, isolated environment**. They edit and run code in the cloud; you see status, send follow-ups, or take over anytime.

**Use this doc when:** You want to set up or use Cloud Agents, configure environment/secrets, test changes, or understand security and dashboard settings.

---

## How to use

1. In the Agent UI, choose **Cloud** from the dropdown under the agent input.
2. Or start from **[cursor.com/agents](https://cursor.com/agents)**.

---

## Web & Mobile

You can run Cloud Agents from **any device**—phone, tablet, or browser—at [cursor.com/agents](https://cursor.com/agents). Start an agent on the go; when it’s done, open the work in Cursor on desktop, review and merge changes, or share links with your team.

### Quick setup (web or mobile)

1. Go to **[cursor.com/agents](https://cursor.com/agents)** on any device.
2. **Sign in** with your Cursor account.
3. **Connect GitHub** so you can access repositories.
4. **Start an agent** – Enter a task and the agent runs in the cloud.

### Mobile: install as PWA

For a better mobile experience, install the site as a **Progressive Web App (PWA)**:

- **iOS:** Open [cursor.com/agents](https://cursor.com/agents) in **Safari** → Share → **Add to Home Screen**.
- **Android:** Open in **Chrome** → Menu → **Add to Home Screen** or **Install App**.

You get a full-screen UI, faster startup, and an icon on your home screen.

### Working across devices

Use **Open in Cursor** to continue an agent’s work in the desktop editor. The same Cloud Agent runs whether you started it from desktop, web, or mobile.

### Team collaboration

- **Shared links** – Share agent run links so teammates can view and collaborate.
- **Review** – Collaborators can review diffs and leave feedback.
- **Pull requests** – Create, review, and merge PRs from the web interface.

### Slack

- **Trigger from Slack** – Mention **@Cursor** in Slack to start an agent.
- **Notifications** – When starting from web or mobile, you can opt in to **Slack notifications** when the agent completes.

See [Slack](./slack.md) (in-repo) and [Cursor docs – Slack](https://docs.cursor.com/integrations/slack) for setup and usage.

### Linear

- **Delegate issues** – Assign issues to Cursor in Linear.
- **Mention @Cursor** – In comments to start an agent or send follow-up instructions.

See [Linear](./linear.md) (in-repo) and [Cursor docs – Linear](https://docs.cursor.com/integrations/linear) for setup and configuration.

### Pricing (web & mobile)

Web and mobile agents use the **same pricing** as Cloud Agents (model API rates, spend limit). See [Models](./models.md#model-pricing) and [Pricing](./pricing.md).

---

## Setup

Cloud Agents run on an **isolated Ubuntu** machine with **internet access** and can install packages. Setup steps:

1. **Initial setup** – Use **Cursor: Start Cloud Agent Setup** (Command Palette: **Cmd+Shift+P** / **Ctrl+Shift+P**), or deeplink: `cursor://anysphere.cursor-deeplink/background-agent/setup`.
2. **Environment** – Configure base environment, install commands, and secrets.
3. **Snapshots** – Create a snapshot of the configured environment for reuse.

**Recommended:** Use the UI flow. Run the command above and follow the guided steps. Cursor generates **`.cursor/environment.json`** for you.

**Settings deeplink:** `cursor://anysphere.cursor-deeplink/settings/background-composer`

### GitHub or GitLab

Cloud Agents **clone your repo** from GitHub or GitLab and work on a **separate branch**, then push for handoff. You need **read-write** access to the repo (and any submodules). Other providers (e.g. Bitbucket) may be added later.

For connecting GitHub, @cursor on PRs/issues, and IP allow list: see [GitHub](./github.md) (in-repo) and [Cursor docs – GitHub](https://docs.cursor.com/integrations/github).

### Base environment

**UI flow (recommended):** The setup wizard lets you configure the base environment, install deps, create a snapshot, set install/startup commands, and add secrets. You usually don’t edit `.cursor/environment.json` by hand.

**Manual with Dockerfile (advanced):** Use a Dockerfile for system-level setup (compilers, debuggers, base OS). Don’t `COPY` the whole project—Cursor manages the workspace and checks out the right commit. Take a snapshot manually and edit **`.cursor/environment.json`** for runtime settings. You configure via Dockerfile; you don’t get direct shell access to the remote machine.

If you use the UI flow, the `snapshot` field in `environment.json` is set to **`"POPULATED_FROM_SETTINGS"`**: Cursor stores the snapshot ID in your settings. The file can be committed (recommended) or kept private.

### Install command

When a new machine starts, Cursor runs your **`install`** command (e.g. `npm install`, `bazel build`). This is what a dev would run when switching branches. Design it to be **idempotent**; only **disk state** after `install` is cached—no long-lived processes. They won’t be running when the agent starts.

### Startup and terminals

After `install`, Cursor runs the **`start`** command (optional; use for e.g. `sudo service docker start`), then starts any **`terminals`**. These run in a **tmux** session available to you and the agent (e.g. `npm run watch` for a web app).

### Secrets and environment variables

Cloud Agents need env vars and secrets (API keys, DB credentials, etc.).

**Recommended: Secrets in Cursor**

- **Desktop:** **Cursor Settings** (Cmd+, / Ctrl+,) → **Cloud Agents** → **Secrets**.
- **Web:** [Dashboard → Cloud Agents](https://cursor.com/dashboard?tab=cloud-agents) → **Secrets**.

Add key-value pairs. Secrets are encrypted at rest (KMS), exposed as env vars to cloud agents, and shared for the workspace/team.

**Monorepos with multiple `.env` files:** Add all needed secrets to the same Secrets tab. Use distinct names if there are conflicts (e.g. `NEXTJS_*`, `CONVEX_*`). Alternatively, you can include `.env.local` in your snapshot during setup, but the Secrets tab is recommended for security and management.

### environment.json

Contains `snapshot` (or `"POPULATED_FROM_SETTINGS"` when using the UI), `install` (e.g. `npm install`), optional `start`, and `terminals` (e.g. dev server commands). **Full schema and all options:** [environment.schema.json](https://www.cursor.com/schemas/environment.schema.json).

---

## Verifying and testing changes

### In the cloud instance

1. In the cloud agent sidebar, open the agent’s dropdown → **Open VM** (SSH).
2. Use **port forwarding** to reach web services in the VM.
3. Run commands, check logs, and test in the cloud before merging.

### Locally

1. **Checkout the branch** – Use **Checkout Branch** in the cloud agent UI, or `git fetch origin` and `git checkout <agent-branch-name>`.
2. **Environment** – Branch pull doesn’t include env vars. Copy local `.env.local` files or rely on Cursor Secrets; run setup (e.g. `npm install`).
3. **Test** – Run `npm test`, `npm run dev`, etc.

**Apply Changes** in the UI applies the branch’s changes to your local state without checking out the branch. Never commit `.env.local`; env vars are not part of the repo.

You can also run shell commands **during setup** to validate the environment early.

---

## Fixing CI failures

Cloud Agents can **automatically try to fix CI failures** on PRs they create. They ignore failures that already exist on the PR’s base commit. **GitHub Actions** is supported.

- **Disable for all (personal):** [Dashboard → Cloud Agents → My Settings](https://cursor.com/dashboard?tab=cloud-agents) → turn off **Automatically fix CI Failures**.
- **Disable per PR:** Comment **`@cursor autofix off`**. Re-enable with **`@cursor autofix on`**.
- **Ask to fix:** Comment e.g. **`@cursor please fix the CI failures`** or **`@cursor fix the CI lint check failure`**.

Auto-fix is currently **Teams** only; non-Teams support is planned. Until then, you can ask the cloud agent explicitly to fix CI on the PR.

---

## Models and pricing

- **Models** – Only [Max Mode](./models.md#max-mode)-compatible models are available for Cloud Agents.
- **Pricing** – Billed at the [model API price](./models.md#model-pricing) you choose. Set a **spend limit** when you first use Cloud Agents. VM compute will be priced in the future. See [Cloud Agent pricing](https://docs.cursor.com/account/pricing#cloud-agent).

---

## Security

Cloud Agents are available in **Privacy Mode**. Cursor doesn’t train on your code and only retains it for running the agent. [Privacy overview](https://www.cursor.com/privacy-overview).

Important points:

1. **GitHub app** – Grant read-write to repos you want Cloud Agents to edit; used to clone and push.
2. **Infrastructure** – Code runs in **isolated VMs** on Cursor’s AWS infrastructure; stored on VM disks while the agent is active.
3. **Internet** – The agent has internet access.
4. **Auto-run** – Cloud Agents **auto-run terminal commands** (unlike the foreground agent, which asks per command). That enables prompt-injection and data-exfiltration risk (e.g. tricking the agent to send code to a malicious site). See [OpenAI on risks of agent internet access](https://platform.openai.com/docs/codex/agent-network#risks-of-agent-internet-access).
5. **Privacy off** – If Privacy Mode is disabled, Cursor may collect prompts and dev environments to improve the product.
6. **Privacy toggled mid-run** – If you start with privacy off then turn it on during a run, the agent keeps running with privacy off until it finishes.

---

## Dashboard settings

Admins configure Cloud Agents from the [Cloud Agents tab](https://cursor.com/dashboard?tab=cloud-agents) on the dashboard.

**Defaults**

- **Default model** – Model used when a run doesn’t specify one (must support Max Mode).
- **Default repository** – If set, users don’t have to pick a repo each time.
- **Base branch** – Branch agents fork from for PRs; blank = repo default.

**Security** (admin only)

- **Display agent summary** – Show or hide the agent’s file diffs and code snippets in the sidebar.
- **Display agent summary in external channels** – Same for Slack or other connected channels.
- **Team follow-ups** – Whether other team members can send follow-ups to cloud agents they didn’t create (see below).

Settings apply immediately to new agents.

### Team follow-ups

Team members can send follow-up messages to Cloud Agents created by **other** users. Admins control this in Cloud Agents security settings:

- **Disabled** — Only the creator can send follow-ups.
- **Service accounts only** — Follow-ups allowed only to agents created by a [service account](https://docs.cursor.com/account/enterprise/service-accounts), not other humans.
- **All** — Any team member can follow up on any team agent.

**Risk:** Follow-ups run with the **creator’s** secrets and credentials. A user could direct the agent to read env vars, log secrets, or push credentials elsewhere. Someone with limited access could effectively use a more privileged user’s agent. Treat this like shared SSH or service credentials.

---

## Egress IP ranges

Cloud Agents make **outbound** connections from specific **IP address ranges**. If your org uses firewall rules or IP allowlists, you may need to allow these ranges so Cloud Agents can reach your services.

### API endpoint

IP ranges are published as JSON:

```bash
curl https://cursor.com/docs/ips.json
```

**Response shape:**

- **version** – Schema version.
- **modified** – ISO 8601 timestamp of last update.
- **cloudAgents** – Object keyed by cluster (e.g. `us3p`, `us4p`, `us5p`); values are arrays of IP ranges in **CIDR notation** (e.g. `100.26.13.169/32`). Use a [CIDR tool](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) to convert to IP ranges if needed.

### What Cloud Agents use these IPs for

- Cloning and pushing to remote repos (unless you use the [GitHub IP allow list](./github.md#ip-allow-list-configuration)).
- Downloading packages and dependencies.
- Calling external APIs.
- Accessing web resources during the run.

### Important

- Cursor **may change** these IPs over time for scaling and operations.
- **Don’t rely on IP allowlisting** as your main security control.
- If you allowlist these IPs, **monitor the JSON endpoint** regularly for updates.

### GitHub vs general egress

Cursor supports a **GitHub egress proxy** for [GitHub IP allow list configuration](https://docs.cursor.com/integrations/github#ip-allow-list-configuration). That proxy applies to all GitHub-dependent features, including Cloud Agents.

- **For GitHub:** Prefer the **GitHub-specific IP allow list** (proxy); it’s integrated with the Cursor GitHub app.
- **For other services:** Use the **egress IP ranges** from `https://cursor.com/docs/ips.json` in your firewall or allowlist.

---

## Troubleshooting

- **Secrets not available** – Ensure they’re in Cursor Settings → Cloud Agents → Secrets (or Dashboard → Cloud Agents → Secrets). They’re exposed as env vars to the agent.
- **Can’t find Secrets tab** – Look under **Cursor Settings → Cloud Agents** (desktop) or **Dashboard → Cloud Agents** (web).
- **POPULATED_FROM_SETTINGS** – The snapshot ID is stored in Cursor settings, not in the repo file. Used when you set up via the UI.
- **Test before merging** – Use **Open VM** to test in the cloud, or **Checkout Branch** / **Apply Changes** and test locally with env vars and setup commands.
- **Snapshots and .env.local** – Snapshots can include `.env.local` if you add them during snapshot creation. Prefer the **Secrets** tab for env vars.
- **Agent runs not starting (web/mobile)** – Check sign-in, GitHub connection, and network. Retry from [cursor.com/agents](https://cursor.com/agents) or the desktop app.
- **Can’t see agent runs on mobile** – Refresh or re-open the PWA; ensure you’re on the same account. Runs appear in the same list as on web/desktop.
- **Slack integration not working** – Confirm your workspace admin has installed the Cursor Slack app and that you have the right permissions. See [Slack integration](https://docs.cursor.com/integrations/slack).

---

## Cloud Agents API

You can **launch and manage Cloud Agents programmatically** via the Cloud Agents API.

- **Authentication:** [Basic auth](https://docs.cursor.com/api#basic-authentication) with an API key. Create keys in the [Cursor Dashboard](https://cursor.com/settings).
- **Base URL:** `https://api.cursor.com`
- **Docs:** [API overview](https://docs.cursor.com/api) (rate limits, best practices), [OpenAPI spec](https://docs.cursor.com/docs-static/cloud-agents-openapi.yaml) (full schemas and examples).
- **MCP** is not supported for the Cloud Agents API.

### Endpoints (summary)

- **GET** — `/v0/agents`; List agents (pagination, filter by PR)
- **GET** — `/v0/agents/{id}`; Get agent status and result
- **GET** — `/v0/agents/{id}/conversation`; Get conversation history
- **POST** — `/v0/agents`; Launch an agent (`prompt`, `source`, optional `target`, `model`, `webhook`)
- **POST** — `/v0/agents/{id}/followup`; Add follow-up instruction
- **POST** — `/v0/agents/{id}/stop`; Stop a running agent
- **DELETE** — `/v0/agents/{id}`; Delete an agent
- **GET** — `/v0/me`; API key info
- **GET** — `/v0/models`; Recommended models for Cloud Agents
- **GET** — `/v0/repositories`; List GitHub repos (strict rate limits: 1/min, 30/hr per user)

**For request/response schemas, all parameters, webhooks, and examples, use:** [Cursor docs – Cloud Agents API](https://docs.cursor.com/cloud-agent/api) and the [OpenAPI spec](https://docs.cursor.com/docs-static/cloud-agents-openapi.yaml).

---

## Naming

Cloud Agents were formerly called **Background Agents**.

---

## See also

- [Agent](./agent.md) – In-editor Agent and tools
- [Pricing](./pricing.md) – Cloud Agent billing and spend limit
- [Models](./models.md) – Max Mode and model list
- [Cursor docs – Cloud Agents](https://docs.cursor.com/cloud-agent)
- [Cursor docs – Cloud Agents API](https://docs.cursor.com/cloud-agent/api)
- [Cursor docs – Pricing (Cloud Agent)](https://docs.cursor.com/account/pricing#cloud-agent)
