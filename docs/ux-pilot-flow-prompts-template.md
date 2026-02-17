# UX Pilot — Per-screen flow prompts template

Use this template to generate a **project-specific** flow prompts doc for UX Pilot. Copy the file, replace all `[placeholders]` with your project’s values, then add or remove screens to match your PRD. The result is the doc you paste into UX Pilot when defining each screen in a flow.

**Workflow:** PRD → list every screen (mobile and web) → one **Shared context** block per platform → one **Screen: [Name]** + prompt per screen. Only **tab root** screens get “Tab bar visible”; all other screens (stack, modal, overlay) get “No tab bar”.

---

## How to use in UX Pilot

1. Create a new flow (e.g. “[Project name] – Mobile” or “[Project name] – Web”).
2. In the flow’s context or description field, paste the **Shared context** for that platform (mobile or web).
3. Add the first screen: when UX Pilot asks for a description, copy the full prompt for that screen from this doc and paste it in.
4. Repeat for every screen in order. Each screen = one prompt from the matching section.
5. Generate the flow; use Edit Section / Edit Whole Screen to refine.

---

## Design system (reference — fill and keep in sync)

- **Primary:** [e.g. #043838]
- **Neutrals:** [e.g. white #FFFFFF, black #000000, grey #808080, light grey #C2C2C2, dark grey #1C1C1C, border #262626]
- **Optional accent:** [e.g. gold or deep blue]
- **Typography (mobile):** [e.g. Plus Jakarta Sans — Light, Regular, Medium, SemiBold, Bold]
- **Typography (web):** [e.g. Satoshi or similar geometric sans]
- **Layout:** [e.g. generous spacing 16–24px, rounded corners 12–16px cards, 8–12px buttons, subtle shadows]
- **Product-specific:** [currency, locales, key labels, or “none”]

---

## Shared context (paste once per flow)

**For mobile flows, paste this in the flow context (after replacing placeholders):**

[Project name] — [One-line product description]. Brand: [e.g. refined, trustworthy, calm]. Design system: Primary [hex] (CTAs, accents, active states). Neutrals: [list hexes]. [Optional accent]. Typography: [Mobile font] (weights). Body ~16px, headings 20–28px. Layout: [spacing, corners, shadows]. Bottom tab bar on every tab screen: [N] tabs — [Tab 1 (icon)], [Tab 2 (icon)], … Active tab [primary hex], inactive grey, white bar. Minimal UI: no extra top nav unless screen needs title or back. [Currency/locale if relevant]. [Product-specific constants or “none”]. Good contrast and labels; touch targets at least 44px.

**For web flows, paste this in the flow context:**

[Project name] — [One-line product description]. [e.g. Admin dashboard.] Brand: [vibe]. Design system: Primary [hex]. Neutrals: [list]. Typography: [Web font]. Body ~16px, headings 20–28px. Layout: [spacing, corners, shadows]. Desktop 1280px+; usable at 1024px. Avoid cramped layout; good contrast and labels.

---

## Mobile flow — [Section name, e.g. Auth & onboarding]

### Screen: [Screen name, e.g. First-open auth modal]

[2–4 sentences describing exactly what appears: layout, key elements, labels, primary/secondary actions. Mention if overlay, modal, or full screen. End with “No tab bar” unless this is a tab root.]

### Screen: [Screen name, e.g. Sign in]

[Same format: what the user sees, inputs, buttons, footer links. No tab bar for auth screens.]

### Screen: [Screen name, e.g. Onboarding]

[Required and optional fields, primary button, short copy. No tab bar.]

---

## Mobile flow — [Section name, e.g. Home & discovery]

### Screen: [Screen name, e.g. Home (tab)]

[Header: logo, wordmark, any icons. Main content: sections, cards, list. Describe card content (image, title, key data). “Tab bar visible with [Tab name] selected.”]

### Screen: [Screen name, e.g. Search overlay]

[Overlay over which screen; dimmed backdrop. Search input, filters/chips, “Filters” button if applicable, result count, list/grid of items. “Cancel” or tap backdrop to close. No tab bar.]

### Screen: [Screen name, e.g. Filters (sheet)]

[Opened from where. Form fields. Apply, Clear, Close. No tab bar.]

### Screen: [Screen name, e.g. Detail / List view]

[Back button, title. Main content. Optional map, list, or both. No tab bar.]

---

## Mobile flow — [Section name, e.g. Tab name — list/detail]

### Screen: [Tab root screen, e.g. Wishlist (tab)]

[Title. Empty state if applicable. List/grid of items (describe item content). “Tab bar visible with [Tab] selected.”]

### Screen: [Detail screen, e.g. Item detail]

[Back, header. Sections: image, title, key data, actions. No tab bar.]

---

## Mobile flow — [Flow name, e.g. Booking flow]

### Screen: [Step 1 name]

[Title. Inputs or controls (e.g. calendar, guest count). Primary “Next” or “Continue”. Back. No tab bar.]

### Screen: [Step 2 name]

[Same pattern.]

### Screen: [Success / confirmation]

[Success icon/message, reference number if any, primary and secondary actions. No tab bar.]

---

## Web flow — Auth

### Screen: Login (web)

[Centered card. Logo. Title. Email, password. Primary “Sign in”. Optional “Forgot password?”, “Sign in with Google”. Subtext if relevant (e.g. invite-only). No sidebar yet.]

### Screen: [Accept invite (web)] — only if your product has invite-only dashboard

[Same layout as Login. Headline for invite. Sign up or sign in. Primary “Accept invite”. No sidebar.]

---

## Web flow — [Section, e.g. Dashboard & users]

### Screen: Dashboard (main)

[Sidebar or top nav with links. Main: welcome, metric cards (label + number), recent items list/table with “View all”, quick action buttons. Use primary for key actions.]

### Screen: [List screen, e.g. Users & roles]

[Page title. “Add” or “Invite” button. List/table columns. Filters if any. Actions per row.]

### Screen: [Form screen, e.g. Invite user]

[Title. Form fields. Primary submit. Back/Cancel.]

---

## Web flow — [Section, e.g. Main entity CRUD]

### Screen: [Entity] list

[“Add [entity]” button. Columns: image if relevant, title/name, status, actions (Edit, Delete/Deactivate). Pagination. Filters optional.]

### Screen: [Entity] form (create)

[Title “Add [entity]”. All fields with labels. Upload zone if relevant. Save, Cancel.]

### Screen: [Entity] form (edit)

[Same as create. Title “Edit [entity]”. Pre-filled. Optional Delete.]

---

## Web flow — [Section, e.g. Secondary features]

### Screen: [Screen name]

[Page title. Filters. List/table content. Actions. Same design system.]

---

## Notes

- **Tab bar:** Only the root screen of each tab gets “Tab bar visible with [Tab] selected.” Every other screen (stack, modal, overlay, flow step) gets “No tab bar.”
- **Overlays vs screens:** If search (or similar) is an overlay over another screen, say “Overlay over [screen]” and “No separate screen, no tab bar.”
- **Detail prompts:** The more concrete (labels, placeholder text, section names), the better UX Pilot’s output. Use your PRD and real copy where possible.
