# Extensions

Cursor supports **VS Code extensions** from a built-in marketplace. You can install from the Extensions panel or via extension URLs. Cursor uses the **Open VSX** registry but **independently verifies** each extension for security, compatibility with AI features, and performance.

**Use this doc when:** You want to install or manage extensions, use extension URLs, understand verification, or import extensions from VS Code.

**For marketplace and verification:** [Cursor docs – Extensions](https://docs.cursor.com/features/extensions).

---

Not every VS Code extension is available or behaves identically in Cursor because of AI integration and verification.

---

## Installing extensions

### Extensions panel

1. Open **Extensions** (⌘/Ctrl + **Shift + X**).
2. Search for the extension.
3. Click **Install**.

### Extension URLs

Open an extension’s page with:

```
cursor:extension/publisher.extensionname
```

Example (ChatGPT extension): `cursor:extension/openai.chatgpt`

Useful for: sharing with teammates, docs links, setup scripts.

---

## Managing extensions

- **Installed:** Extensions panel (⌘/Ctrl + **Shift + X**) → **Installed** filter.
- **Disable / Uninstall / Settings:** Right-click the extension.
- **Extension settings:** Open **Settings** (⌘/Ctrl + **,**), search by extension name.

---

## Publisher verification

Publishers can request a **verification badge** in the marketplace (extra security and identity review).

**Steps:**

1. **Website link** — On a **public site with its own domain** (not only a GitHub README), add a prominent link to the extension’s OpenVSX listing (e.g. in the install section). Set the OpenVSX listing “homepage” to this site.
2. **Extension ID** — Use the **same extension ID** on OpenVSX as on other marketplaces.
3. **Request** — Post in the [Extension Verification category](https://forum.cursor.com/c/showcase/extension-verification/23) with the extension name and the website URL where the OpenVSX link can be verified.
4. **Review** — Cursor verifies and adds the badge when approved.

---

## Importing from VS Code

You can **import all extensions** from VS Code when migrating. See the [Cursor VS Code migration guide](https://docs.cursor.com/configuration/migrations/vscode) for steps.

---

## See also

- [Cursor docs – Extensions](https://docs.cursor.com/features/extensions) — Marketplace, verification, and migration.
