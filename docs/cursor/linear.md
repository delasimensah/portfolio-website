# Linear

Use [Cloud Agents](./cloud-agents.md) from Linear by **assigning issues to Cursor** or **mentioning @Cursor** in comments. Cursor analyzes issues and skips non-development work automatically.

**Use this doc when:** You want to connect Linear, delegate issues to Cursor, mention @Cursor in comments, or configure repo/branch/model via labels or inline syntax.

**For setup and options:** [Cursor docs – Linear](https://docs.cursor.com/integrations/linear).

---

## Get started

### Installation

Only a **Cursor admin** can connect the Linear integration.

1. Go to [Cursor integrations](https://www.cursor.com/dashboard?tab=integrations).
2. Click **Connect** next to Linear.
3. Connect your Linear workspace and select team → **Authorize**.
4. Finish Cloud Agent setup in Cursor: connect GitHub, default repo, usage-based pricing, privacy settings.

First use may prompt **account linking** between Cursor and Linear. GitHub is required for PR creation.

---

## How to use

- **Delegate an issue:** Open the issue → click assignee → select **Cursor**.
- **Mention in comments:** Write `@Cursor` plus instructions, e.g. `@Cursor fix the authentication bug described above`. This can start a new agent or add follow-up to a running one.

---

## Workflow

Cloud Agents show **real-time status** in Linear and **create PRs** when done. Track runs in [Dashboard → Cloud Agents](https://www.cursor.com/dashboard?tab=cloud-agents).

**Follow-up:** Reply in the agent session or mention **@Cursor** in a Linear comment; it’s sent as follow-up to the running agent.

---

## Configuration

Defaults: [Dashboard → Cloud Agents](https://www.cursor.com/dashboard?tab=cloud-agents) — **Default Repository**, **Default Model**, **Base Branch**.

### Inline options (issue description or comments)

Use `[key=value]` in the issue or in a comment:

- `@cursor please fix [repo=anysphere/everysphere]`
- `@cursor implement feature [model=claude-3.5-sonnet] [branch=feature-branch]`

Supported keys: **repo**, **branch**, **model**.

### Repository selection order

1. **Issue description/comments** — `[repo=owner/repository]`
2. **Issue labels** — Repository labels on the issue
3. **Project labels** — Repository labels on the Linear project
4. **Default repository** — Cursor dashboard

### Repository labels (Linear)

Use a **parent-child label** structure: parent = config key, child = value.

To set up repo labels:

1. Linear **Settings** → **Labels** → **New group**.
2. Name the group **repo** (exactly; case insensitive).
3. In that group, create labels like `owner/repo` for each repository.

Assign these labels to **issues** or **projects** to tell the Cloud Agent which repo to use.

**Issue labels** and **project labels** use the same parent-child pattern for repo, branch, model.

---

## Advanced: triage rules

In Linear **project settings** → **triage rules**, you can automate: add labels, assign to Cursor, trigger agents by condition. Linear may require a human assignee for rules to run; behavior can change in future updates.

---

## Help and feedback

- **Activity and request IDs:** [Dashboard → Cloud Agents](https://www.cursor.com/dashboard?tab=cloud-agents); include request ID when contacting support.
- **Feedback:** Linear comments or Cursor dashboard support channels.

---

## See also

- [Cloud Agents](./cloud-agents.md) — Overview, setup, security.
- [Cursor docs – Linear](https://docs.cursor.com/integrations/linear) — Official setup and configuration.
