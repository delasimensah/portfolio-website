# Browser

The Agent can **control a web browser** to test apps, edit layouts and styles visually, audit accessibility, turn designs into code, and more. It has access to console logs and network traffic, so it can debug issues and run testing workflows. No external tools are required.

**Enterprise:** Browser use is governed by MCP allowlist/denylist (and optional origin allowlist).

**Use this doc when:** You want to understand Browser tools, the design sidebar, security/approval, or Enterprise browser settings.

**For current tools and settings:** [Cursor docs – Browser](https://docs.cursor.com/agent/browser).

---

## Native integration

Browser actions (screenshots, clicks, etc.) show up in chat and in a browser window—either a **separate window** or an **inline pane**. Cursor has optimized the browser tools for efficiency and lower token use:

- **Efficient log handling** – Logs are written to files; the Agent can grep and read only the lines it needs instead of summarizing everything. Full context with fewer tokens.
- **Visual feedback** – Screenshots are fed into the file-reading tool so the Agent sees the page as images, improving layout and UI understanding.
- **Smart prompting** – The Agent gets context on log size and preview snippets so it can decide what to inspect.
- **Dev server awareness** – The Agent is prompted to detect running dev servers and use the right ports instead of starting duplicates or guessing.

---

## Browser tools

- **Navigate** — Go to URLs
- **Click** — Click elements on the page
- **Type** — Enter text into inputs
- **Scroll** — Scroll the page
- **Screenshot** — Capture the current view (Agent sees it as an image)
- **Console output** — Read console logs (e.g. errors, warnings)
- **Network traffic** — Monitor HTTP requests/responses, API calls, payloads, status codes. _(Agent panel only for now; layout support coming.)_

---

## Design sidebar

The browser includes a **design sidebar** for changing your site directly in Cursor. You design and code at the same time with live visual updates.

### Visual editing

- **Position and layout** – Move elements, change flex direction, alignment, grid
- **Dimensions** – Width, height, padding, margins (pixel values)
- **Colors** – Colors from your design system or new gradients; color picker
- **Appearance** – Shadows, opacity, border radius (sliders)
- **Theme testing** – Switch between light and dark to test

### Applying changes

When the layout looks right, click **Apply** to run an agent that updates your codebase from the visual changes. You can also select multiple elements and describe changes in text; agents run in parallel and changes show up after hot-reload.

---

## Session persistence

Browser state is **persistent per workspace** between Agent sessions:

- **Cookies** – Auth and session cookies stay
- **Local Storage** – `localStorage` and `sessionStorage` persist
- **IndexedDB** – Data is kept

Each workspace has its own browser context, so projects don’t share storage or cookies.

---

## Use cases

- **Web development** – Integrate with Figma, Linear, design systems, component libraries. See the [Web Development cookbook](https://docs.cursor.com/cookbook/web-development).
- **Accessibility** – Audit and improve a11y (WCAG): contrast, semantic HTML, ARIA, keyboard nav, alt text. Use `@browser` with a prompt like: _Check color contrast, verify semantic HTML and ARIA, test keyboard navigation, find missing alt text._
- **Automated testing** – Run flows, fill forms, click through, test responsive layouts, check error messages and console errors; capture screenshots for visual regression.
- **Design to code** – Point at a mockup; Agent extracts colors/typography and generates HTML/CSS. Prompt e.g. _Analyze this design mockup, extract colors and typography, generate pixel-perfect HTML and CSS._
- **UI from screenshots** – Compare current UI to a design screenshot and adjust spacing, colors, typography. Prompt e.g. _Compare current UI to this design screenshot and adjust spacing, colors, and typography to match._

---

## Security

The browser runs as a secure web view controlled by an MCP server (extension). Cursor’s Browser integrations have been reviewed by external security auditors.

### Authentication and isolation

- **Token authentication** – A random token is generated when each browser session starts.
- **Tab isolation** – Each tab has a unique ID to avoid cross-tab interference.
- **Session-based** – Tokens are regenerated for new sessions.

### Tool approval

**By default you approve each Browser action** before the Agent runs it. That limits unexpected navigation, form submission, or script execution.

In **Agent Settings** you can set:

- **Manual approval** — Review each browser action (recommended)
- **Allow-listed actions** — Actions on your allowlist run automatically; others need approval
- **Auto-run** — All browser actions run without approval _(use with caution)_

Never use auto-run with untrusted code or unknown sites. The Agent could run malicious scripts or submit sensitive data.

### Allow and block lists

Under **Cursor Settings → Chat → Auto-Run** you can configure:

- **Allow list** – Actions that run without a prompt
- **Block list** – Actions that are always blocked

This is best-effort protection; AI can be unpredictable (e.g. prompt injection). Review auto-approved actions regularly. See [security guardrails](https://docs.cursor.com/agent/security).

### Browser context: Chrome vs Browser Tab

- **Chrome** — Isolated Chrome process, full-screen browsing
- **Browser Tab** — Browser opens as a pane inside Cursor

Both let the Agent use the same MCP browser tools.

**To switch:** **Cursor Settings** (or **Cmd/Ctrl + ,**) → **Tools & MCP** → **Browser Automation** → choose Chrome or Browser Tab. Applies to new sessions.

---

## Recommended models

For best Browser performance, Cursor recommends **Sonnet 4.5**, **GPT-5**, and **Auto**.

---

## Enterprise

For Enterprise customers, Browser is controlled via **MCP** (allowlist/denylist). Admins can enable or disable browser and configure an **origin allowlist**.

### Enabling Browser

1. [Settings Dashboard](https://cursor.com/dashboard?tab=settings) → **MCP Configuration**
2. Toggle **browser features** on

Access then follows your MCP allowlist/denylist.

### Origin allowlist

Admins can set an **origin allowlist** so the Agent can only automatically navigate to (and run MCP tools on) certain origins. _This feature must be enabled for your org by Cursor; contact your account team if you don’t see it._

**Configuration:**

1. [Admin Dashboard](https://cursor.com/dashboard?tab=settings) → **MCP Configuration**
2. Ensure **Enable Browser Automation Features (v2.0+)** is on
3. Under **Browser Origin Allowlist (v2.1+)**, click **Add Origin**
4. Add origins (e.g. `*`, `http://localhost:3000`, `https://internal.example.com`)

Leave the list **empty** to allow all origins. Add each origin separately.

**Behavior:**

- **Automatic navigation** – `browser_navigate` only works for URLs matching the allowlist
- **MCP tools** – Can run only on allowlisted origins
- **Manual navigation** – You can still open any URL in the browser (e.g. docs, external sites)
- **Tool restrictions** – If the browser is on a non-allowlisted origin (e.g. after manual nav), browser tools (click, type, navigate) are **blocked**

**Edge cases (best-effort):**

- **Link navigation** – Agent clicks a link on an allowed site that goes to a non-allowed origin → navigation can succeed
- **Redirects** – Allowed URL redirects to non-allowed → redirect can succeed
- **JavaScript navigation** – Client-side nav (e.g. `window.location`) from allowed to non-allowed → can succeed

The allowlist restricts automatic agent navigation; it cannot block every path. Review the list and consider redirects/links when allowing domains.

---

## See also

- [Agent security](./agent-security.md) – Guardrails, approval defaults, allow/block lists
- [Agent](./agent.md) – Tools including Browser
- [Terminal](./terminal.md) – Browser Protection setting (block auto-run of Browser tools)
- [Cursor docs – Browser](https://docs.cursor.com/agent/browser)
- [Cursor docs – Security](https://docs.cursor.com/agent/security)
- [Web Development cookbook](https://docs.cursor.com/cookbook/web-development)
