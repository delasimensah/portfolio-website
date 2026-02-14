# Cursor pricing

Overview of Cursor plans, usage, and how billing works. Use this when choosing a plan, estimating cost, or explaining what happens when limits are reached.

**For current plan details, exact pricing, and limits, see:** [Cursor docs – Pricing](https://docs.cursor.com/account/pricing).

---

## Plans at a glance

You can use Cursor for **free** or buy an **individual** or **team** plan. All usage beyond the free tier is charged at [model API prices](./models.md#model-pricing); your plan’s “included usage” is a monthly allowance that gets consumed at those rates.

---

## Individual plans

All individual plans include:

- **Unlimited tab completions**
- **Extended agent usage** on all models
- **Bugbot** access
- **Cloud Agents** access

Included usage is applied at the same [model API rates](./models.md#model-pricing) as on-demand usage:

| Plan | Included API agent usage | Also includes |
|------|---------------------------|----------------|
| **Pro** | $20/mo | Generous Auto and Composer usage |
| **Pro Plus** | $70/mo | Generous Auto and Composer usage |
| **Ultra** | $400/mo | Generous Auto and Composer usage |

Cursor often grants extra bonus capacity beyond the guaranteed amount. Because each model has different API costs, **which model you use** affects how fast your included usage is used up. Check [your dashboard](https://cursor.com/dashboard?tab=usage) for usage and token breakdowns; the editor also shows limit notifications.

For how usage is calculated, see Cursor’s guide on [tokens and pricing](https://learn.cursor.com/tokens-pricing).

---

### How much usage do I need?

Rough expectations from Cursor’s usage data:

| Usage pattern | Typical monthly usage |
|---------------|------------------------|
| **Daily Tab only** | Stays within $20 |
| **Light Agent use** | Often within included $20 |
| **Daily Agent use** | ~$60–$100 total |
| **Power users** (many agents/automation) | Often $200+/mo |

---

### What happens when I hit my limit?

When you go over your included monthly usage, you’re notified in the editor and can:

- **Add on-demand usage** – Keep using Cursor at the same API rates, billed as you go.
- **Upgrade your plan** – Move to a higher tier for more included usage.

On-demand usage is billed monthly at the same rates as included usage. Request quality and speed are not reduced.

---

## Teams

Two team options: **Teams** ($40/user/mo) and **Enterprise** (custom pricing).

Team plans add:

- **Privacy Mode** enforcement
- **Admin Dashboard** with usage stats
- **Centralized billing** for the team
- **SAML/OIDC SSO**

- Use **Teams** if you’re fine self-serving.
- Use **[Enterprise](https://cursor.com/contact-sales)** if you need priority support, pooled usage, invoicing, SCIM, or stricter security.

Details: [Teams pricing](https://docs.cursor.com/account/teams/pricing).

---

## Auto

With **Auto** enabled, Cursor picks the model for each task based on fit and current reliability. It can also switch models if it detects worse output.

**Auto pricing (per million tokens):**

- Input + cache write: $1.25  
- Output: $6.00  
- Cache read: $0.25  

Usage (including Auto) appears in the editor and on the [dashboard](https://cursor.com/dashboard?tab=usage). If you turn off Auto and pick a model yourself, you pay that model’s [listed API price](./models.md#model-pricing).

---

## Max Mode

Some models support [Max Mode](./models.md#max-mode): a larger context window (up to 1M tokens) for longer reasoning and bigger codebases. Most tasks don’t need it; it’s useful for complex queries or very large files. **Max Mode uses more usage.** View requests and token breakdowns on [your dashboard](https://cursor.com/dashboard?tab=usage).

---

## Bugbot

Bugbot is **separate** from Cursor subscriptions and has its own plans (Pro, Teams, Enterprise). **Current Bugbot pricing and features:** [Bugbot pricing](https://cursor.com/bugbot#pricing).

---

## Cloud Agents

Cloud Agents are billed at the [API price of the model](./models.md#model-pricing) you select. When you first use them, you set a **spend limit**.

*Note: VM compute for cloud agents will be priced in the future.*

Full setup, security, and dashboard: [Cloud Agents](./cloud-agents.md).

---

## See also

- [Billing](./billing.md) – Billing portal, cycles, seats, invoices, cancel
- [Models](./models.md) – Model list, per-model pricing, context, Max Mode
- [Cursor docs – Pricing](https://docs.cursor.com/account/pricing)
- [Cursor docs – Teams](https://docs.cursor.com/account/teams/pricing)
- [Learn – Tokens and pricing](https://learn.cursor.com/tokens-pricing)
