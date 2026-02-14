# AI Design Tool Prompt — Template

Use this template to brief AI design tools (e.g. v0, Galileo, Figma AI, Uizard) so they generate **on-brand, consistent** UI for your project. Fill in each section; copy the **Single prompt** for tools that accept one block of text, or the **Detailed brief** for tools that support longer context. Link to your [project requirements doc](./system-design/project-requirements-template.md) or PRD (Product Requirements Document) so scope stays aligned.

---

## Single prompt (copy-paste)

Fill the bracketed parts and paste into the design tool.

```
Design a unique, [tone: e.g. premium / friendly / professional] UI (user interface) for [Product name], a [one-sentence product description]. Do not copy [competitor or reference to avoid]; aim for a distinct identity.

Brand: [Geography, audience, key differentiator in one line.]

Visual direction:
- Palette: [Primary hex], [neutrals], [optional accent]. [Contrast/readability note.]
- Typography: [Font family]: clear hierarchy with [weights]. [Any font pairing.]
- Layout: [Spacing, corners, shadows]. [Imagery style if relevant.] [Overall feel: e.g. clean, dense, playful.]
- Feel: [2–3 adjectives]. [Key trust signals or CTAs (calls to action) to emphasise.]

Screens to design:
- [Platform 1]: [List key screens, e.g. Home, list, detail, search, booking flow, profile.]
- [Platform 2 if any]: [List key screens.]

Avoid: [3–4 things to avoid, e.g. cramped layouts, direct clone of X, tiny touch targets.]
Ensure: [Accessibility and any must-haves.]
```

---

## Detailed brief (for tools that accept long context)

### 1. Product context

- **Name:** [Product name]
- **What it is:** [2–3 sentences: who it’s for, what they do, what you’re building.]
- **Geography / audience:** [Where, who, any constraints.]
- **MVP (Minimum Viable Product) scope:** [Platforms in scope; what’s in and out for first release.]
- **Reference:** [Link to project requirements doc or PRD (Product Requirements Document).]

### 2. User types and touchpoints

List each user type, their primary touchpoint (web/mobile/desktop), and what they do. Use bullets, not tables.

- **[User type 1]** — Touchpoint: [platform]. [Main actions and goals.]
- **[User type 2]** — Touchpoint: [platform]. [Main actions and goals.]

Design direction per surface: [e.g. “Guest mobile: discovery-oriented; admin web: data-dense but clear.”]

### 3. Design direction and inspiration

- **Primary inspiration:** [What to take from: e.g. clarity, trust, flow.]
- **Secondary inspiration:** [Another reference for specific patterns—e.g. booking flow, cards.]
- **Goal:** [Desired identity in one line: e.g. “Unique, premium, trustworthy—not a clone of X.”]

### 4. Design system requirements

**Colors:**

- Primary: [hex] — [usage: CTAs (calls to action), nav, etc.]
- Neutrals: [list with hex if fixed].
- Accent (optional): [hex] — [usage].
- Contrast: [WCAG target if relevant.]

**Typography:**

- **Mobile:** [Font], weights [e.g. Light, Regular, Medium, Bold]. [Base size, heading sizes.]
- **Web:** [Font if different]. Same hierarchy principle.
- Principles: [Readable body size, clear headings, labels.]

**Layout and components:**

- Spacing: [e.g. 16–24px padding; avoid cramped.]
- Corners: [e.g. 8–16px for cards/buttons.]
- Shadows: [e.g. subtle elevation.]
- Imagery: [Style: large hero, image-first cards, etc.]
- Motion: [Subtle / none / specific transitions.]

**Accessibility:**

- Contrast: [Target.]
- Touch targets: [Min size for mobile, e.g. 44px.]
- Labels: [Visible, clear.]

**Responsiveness:**

- Mobile: [Width range, e.g. 320–428px.]
- Web: [Breakpoints, e.g. 1024px+, 1280px preferred.]

### 5. Key screens to generate (checklist)

Tick what applies to your MVP (Minimum Viable Product); add project-specific screens. Use this list so AI tools know exactly what to design.

**Authentication & onboarding**

- [ ] Sign in (email/password, social, or both)
- [ ] Sign up
- [ ] Forgot password / reset
- [ ] Email verification or magic link
- [ ] Onboarding (post-signup: profile, preferences, or wizard steps)
- [ ] Session expired / re-auth

**Home & discovery**

- [ ] Home (hero, featured sections, entry to main flows)
- [ ] List view (cards or list; filters/sort visible or in sheet)
- [ ] Search (input, suggestions, recent)
- [ ] Filter (facets, price range, dates, etc.)
- [ ] Empty state (no results, no data yet)
- [ ] Detail view (full content, gallery, specs, CTA (call to action))

**Primary flows (adjust to your product)**

- [ ] [Your main flow 1] — e.g. Booking: date picker → guests → summary → payment → confirmation
- [ ] [Your main flow 2] — e.g. Create/post: form steps, preview, submit
- [ ] [Your main flow 3] — e.g. Checkout: cart → delivery → payment → success
- [ ] Multi-step form (list steps and key fields per step)
- [ ] Confirmation / success screen
- [ ] Error state (validation, payment failed, etc.)

**User data & account**

- [ ] Profile (view)
- [ ] Profile (edit): avatar, name, contact, preferences
- [ ] [List of user’s items]: e.g. bookings, orders, wishlist, saved items
- [ ] Detail of one item (e.g. single booking, order)
- [ ] Settings (notifications, theme, language, sign out)
- [ ] Sign out / account removal

**Admin or internal (if applicable)**

- [ ] Dashboard: metrics, recent activity, quick links
- [ ] List (table or cards): [e.g. properties, orders, users]
- [ ] Create form: [main entity]
- [ ] Edit form: [main entity]
- [ ] Detail view: [entity] with actions (approve, reject, etc.)
- [ ] Image/media upload (multi, reorder, crop if needed)
- [ ] Simple analytics (counts, charts, date range)
- [ ] [Other admin screens]

**Global & shared**

- [ ] Navigation (bottom tabs, drawer, top nav)
- [ ] Modals: confirm, picker, date/time
- [ ] Loading states (skeleton, spinner)
- [ ] Error boundaries / generic error message
- [ ] 404 or “not found”

**Project-specific screens**

- [ ] [Screen name] — [brief description]
- [ ] [Screen name] — [brief description]

### 6. Content and copy hints

- **Terms:** [Key nouns: e.g. Property, Booking, Order.]
- **Locations / taxonomy:** [If relevant: e.g. categories, regions.]
- **Currency / units:** [e.g. GHS, USD; dates format.]
- **Labels:** [List important button/label text so the tool uses consistent copy.]

### 7. What to avoid

- [ ] Do not produce a direct clone of [competitor or reference].
- [ ] Avoid [layout or style pitfall].
- [ ] Avoid [second pitfall].
- [ ] Do not add features out of MVP (Minimum Viable Product) scope: [list].

### 8. Output format (if the tool allows)

- [ ] High-fidelity UI (user interface; components, spacing, typography, colors as above).
- [ ] [Mobile / Web / both] variants.
- [ ] [ ] Light and dark variants (if needed).
- [ ] [ ] Component names or design tokens (if you use a design system).

---

## How to use this template

1. Copy this file or create `docs/ai-design-tool-prompt-[project].md` for your project.
2. Fill every section that applies; delete or mark N/A what doesn’t.
3. In **Section 5**, tick only the screens you need and add any extra screens under “Project-specific”.
4. Keep your [project requirements doc](./system-design/project-requirements-template.md) (or PRD (Product Requirements Document)) in sync so implementation and design stay aligned.
5. Paste the **Single prompt** into v0/Galileo/etc., or attach the **Detailed brief** when the tool supports long context.

For a project-specific example (Crown Lusso), see [ai-design-tool-prompt.md](./ai-design-tool-prompt.md).
