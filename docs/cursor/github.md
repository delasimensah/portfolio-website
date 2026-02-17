# GitHub

[Cloud Agents](./cloud-agents.md) and [Bugbot](https://docs.cursor.com/bugbot) need the **Cursor GitHub app** to clone repos and push changes.

**Use this doc when:** You want to connect or disconnect GitHub, use @cursor on PRs/issues, configure IP allow lists, or fix access/permission issues.

**For permissions and IP allow list:** [Cursor docs – GitHub](https://docs.cursor.com/integrations/github).

---

## Installation

1. Go to [Dashboard → Integrations](https://cursor.com/dashboard?tab=integrations).
2. Click **Connect** next to GitHub.
3. Choose **All repositories** or **Selected repositories**.

To disconnect: same dashboard → **Disconnect Account** next to GitHub.

---

## Using Agent in GitHub

Comment **`@cursor [prompt]`** on any PR or issue to run a Cloud Agent: it reads context, implements changes, and pushes commits.

With [Bugbot](https://docs.cursor.com/bugbot) enabled, **`@cursor fix`** uses Bugbot’s suggested fix to trigger a Cloud Agent.

---

## Permissions

The GitHub app needs:

- **Repository access** — Clone code and create working branches
- **Pull requests** — Create PRs with agent changes
- **Issues** — Track bugs/tasks agents find or fix
- **Checks and statuses** — Report code quality and test results
- **Actions and workflows** — Monitor CI/CD and deployment

Permissions follow least privilege for Cloud Agent use. See [Cursor docs – GitHub](https://docs.cursor.com/integrations/github) for current details.

---

## IP allow list configuration

If your org uses **GitHub’s IP allow list**, Cursor can use a hosted GitHub proxy with a fixed egress IP set. Contact [hi@cursor.com](mailto:hi@cursor.com) to enable this for your team before configuring.

### Recommended: allow access by GitHub Apps

The Cursor GitHub app has a pre-configured IP list. Your org can inherit it:

1. Org **Security** → **IP allow list**.
2. Enable **“Allow access by GitHub Apps”**.

Cursor’s list is then applied automatically and updates when Cursor changes it. See [GitHub: Managing allowed IP addresses](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization#allowing-access-by-github-apps).

### Alternative: add IPs to your allow list

If you use IdP-defined allow lists or can’t use the app-based list, add these IPs manually:

```
184.73.225.134
3.209.66.12
52.44.113.131
```

IPs may change occasionally; teams using allow lists get advance notice. For the current list, see [Cursor docs – GitHub](https://docs.cursor.com/integrations/github#ip-allow-list-configuration).

---

## Troubleshooting

- **Agent can’t access repository** — Check repo is in the connected set (all or selected). Reconnect or adjust selection in [Dashboard → Integrations](https://cursor.com/dashboard?tab=integrations).
- **Permission denied for pull requests** — Ensure the GitHub app has access to the repo and PR scope. Reinstall from [github.com/apps/cursor](https://github.com/apps/cursor) if needed.
- **App not visible in GitHub settings** — Confirm install level (org vs user). Reinstall from [github.com/apps/cursor](https://github.com/apps/cursor). If install looks broken, contact support.

---

## See also

- [Cloud Agents](./cloud-agents.md) — Setup, GitHub/GitLab, egress proxy.
- [Cursor docs – GitHub](https://docs.cursor.com/integrations/github) — Official install, permissions, IP allow list.
