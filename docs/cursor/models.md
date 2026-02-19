# Cursor models

Overview of the AI models available in Cursor, how pricing and context work, and when to choose which option.

---

## What Cursor offers

Cursor supports frontier coding models from major providers (Anthropic, Google, OpenAI, xAI, and others). Each model has a **context window** (how much code and chat it can consider at once), and some support **Max Mode** (larger context for big codebases or long conversations).

**Use this doc when:** You’re picking a model, wondering about cost, or hitting context limits (e.g. “response got cut off” or “model didn’t see my file”).

---

## Model list and pricing

Cursor supports multiple models (e.g. Claude, Gemini, GPT, Grok, Composer) with different **default context** sizes (often ~200k tokens) and **Max Mode** (up to 1M for some models). Your [Cursor plan](https://docs.cursor.com/account/pricing) includes usage consumed at each model’s API rate; usage and limits are shown in the editor.

**For the current model list, context sizes, and per-model pricing (per million tokens), use the model picker in the editor or see:** [Cursor docs – Models](https://docs.cursor.com/models). Provider pricing links (OpenAI, Anthropic, Google, xAI) are in that doc.

---

## Auto (let Cursor choose the model)

**What it is:** With **Auto** enabled, Cursor picks the model it thinks is best for the current task and most reliable given demand. It can also switch models if it detects worse output (e.g. due to load).

Auto has fixed per-token rates (input+cache write, output, cache read). Usage is visible in the editor and on your [dashboard](https://cursor.com/dashboard?tab=usage). If you pick a model yourself, you’re charged at that model’s API price. **Current Auto and per-model rates:** [Cursor docs – Models](https://docs.cursor.com/models).

**Use when:** You want a good default without choosing a model every time, or when you’re okay with Cursor optimizing for task and reliability.

---

## Context windows

**What it is:** The [context window](https://learn.cursor.com/context) is the maximum amount of tokens (text + code) the model can use in one go—both what you send (prompt, files) and what it generates (response).

Each **chat** in Cursor has its own context. More messages, attached files, and long replies all add tokens and fill that window. When it’s full, older content can be dropped or the model may stop earlier.

**Use when:** Explaining “the model didn’t see my whole file” or “my reply was cut off”—usually a context limit. Reduce attached code, start a new chat, or use a model with a larger window / Max Mode.

---

## Max Mode

**What it is:** By default, Cursor uses a context window of about **200k tokens** (~15k lines of code). **Max Mode** increases the window to the model’s maximum (e.g. 1M for some models). Responses can be a bit slower and cost more.

**Use when:** You have very large files, long conversations, or need to send a lot of code in one go. Most relevant for models that support a much larger window (e.g. Gemini 2.5 Flash, Gemini 3 Pro, GPT 4.1, Grok 4).

---

## FAQ

### Where are models hosted?

Models run on infrastructure in **US, Canada, and Iceland**, operated by the model provider, a trusted partner, or Cursor.

With **Privacy Mode** on, Cursor and the providers do not store your data; it’s deleted after each request. See Cursor’s [Privacy Policy](https://cursor.com/privacy) and [Security](https://cursor.com/security) pages for details.

---

## See also

- [Model and plan by stage (solo)](./model-and-plan-by-stage.md) – Which model to use at each project stage (requirements, system design, screen flows, build) and which plan to pick as a solo developer
- [Pricing](./pricing.md) – Plans, included usage, Teams, Bugbot, Cloud Agents
- [Cursor concepts overview](./cursor-concepts-overview.md) – Context, Rules, MCP, etc.
- [Cursor docs – Models](https://docs.cursor.com/models)
- [Cursor docs – Pricing](https://docs.cursor.com/account/pricing)
- [Learn – Context](https://learn.cursor.com/context)
