# New project kickoff

Use this when **starting a new project**: what to ask the client or stakeholder to understand functional requirements, and how to estimate scope, time, and cost to a working MVP on this stack (Next.js, Expo, Supabase, shared package).

**Before or during kickoff:** Use the [project requirements questionnaire](./project-requirements-questionnaire.md) to gather answers (send to client or fill yourself). Turn answers into a **project requirements doc** from the [project requirements template](./project-requirements-template.md). Then use [planning-checklist.md](./planning-checklist.md) and [principles.md](./principles.md) for the full planning sequence.

---

## 1. Information to get from the client or stakeholder

The [project requirements questionnaire](./project-requirements-questionnaire.md) is the comprehensive list. Below is a condensed version for a live kickoff or discovery call; capture answers in the questionnaire or in a short doc, then transfer to the [project requirements template](./project-requirements-template.md).

**Goal and scope**

- What is the product or feature in one sentence? (e.g. “A mobile app for X that does Y.”)
- Who are the users? (e.g. end customers, internal team, both.)
- Which platforms are in scope for the MVP? (web only, mobile only, or both.)
- What does “done” look like for the MVP? (Concrete outcome or milestone, not “everything we might want.”)

**Existing vs new**

- What already exists? (Current app, APIs, design system, content, or data we can reuse.)
- What must be built from scratch? (New flows, new data, new integrations.)

**Main flows (nouns and verbs)**

- What are the main things users do? (e.g. sign up, create X, view Y, share Z.) List the core flows in order of importance.
- What data do we need? (Key entities: users, posts, orders, etc., and how they relate.)
- Any integrations? (Payments, email, third-party APIs, webhooks.)
- Any special rules? (Permissions, approval flows, visibility, compliance.)

**Constraints and preferences**

- Hard deadline or target launch window?
- Budget or capacity constraints? (e.g. one developer, 2 months.)
- Any non-negotiables? (e.g. must work offline, must support region X, must comply with Y.)

**Success and priorities**

- How will we know the MVP is successful? (Metric or signal.)
- If we had to cut scope, what is the absolute minimum for launch? (Must-have vs nice-to-have.)

---

## 2. Turning that into functional requirements

After the kickoff, write down:

- **One-sentence goal** — Same as “product or feature in one sentence” above.
- **Users and platforms** — Who uses it; web, mobile, or both for MVP.
- **Core flows** — Numbered or bullet list of the main user journeys (e.g. 1. Sign up / sign in, 2. Create X, 3. View list of X, 4. …). Mark which are in MVP and which are later.
- **Core entities** — Main nouns (e.g. User, Project, Task) and how they relate; this will drive the Supabase schema and shared types.
- **Out of scope for MVP** — Explicit list of what we are not building first (so scope doesn’t creep).

Use this to fill in step 1 (and step 4) of the [planning checklist](./planning-checklist.md).

---

## 3. What “working MVP” means on this stack

A working MVP on this monorepo typically means:

- **Web and/or mobile** — At least one of the Next.js app or Expo app delivers the core flows; the other can follow or be deferred.
- **Auth** — Users can sign up and sign in (Supabase Auth; email or OAuth as agreed).
- **Core data** — The main entities live in Supabase (Postgres + RLS (Row Level Security)); the app reads and writes them via the shared layer (services/hooks) and follows [data-fetching-patterns-guide](../data-fetching-patterns-guide.md).
- **UI (user interface)** — Screens/pages for the must-have flows; styling with Tailwind/NativeWind; can be minimal but usable.
- **No “MVP” for** — Polish, edge cases, performance tuning, or scale work beyond what’s needed to validate the product. Defer those to post–Minimum Viable Product (MVP).

You can add one line to the kickoff doc: “Working MVP = [platform(s)] + [list of core flows] + auth + core data in Supabase, usable end-to-end.”

---

## 4. Estimating scope and time to MVP

Estimates are uncertain; treat these as a way to get to a rough range and to spot risk, not a promise.

**Break the work into chunks (effort in developer-days)**

- **Auth and setup** — Supabase project, auth method(s), profile/onboarding: **2–4 days**.
- **Core data model** — Tables, RLS (Row Level Security), types in `shared`, CRUD (Create, Read, Update, Delete) per entity:
  - **3–5 days** for 2–3 entities
  - **5–8 days** for 4–6 entities or non-trivial rules
- **Core flows (per flow)** — Screens, navigation, forms, wiring to shared layer:
  - **0.5–1.5 days** per simple CRUD flow
  - **2–4 days** per complex flow (multi-step, wizards, heavy validation)
- **Integrations** — Per external API or payment provider (auth, errors, tests): **2–5 days** each.
- **UI and copy** — Layout, components, copy:
  - **2–4 days** if reusing patterns
  - **5–10 days** if net-new or polished

**Rough duration (calendar time, 1 FTE developer)**

- **Very small MVP** (1–2 core flows, one platform, no integrations): **2–4 weeks** (≈10–20 dev-days).
- **Small MVP** (3–5 core flows, one or two platforms, maybe one integration): **4–8 weeks** (≈20–40 dev-days).
- **Larger MVP** (many flows, two platforms, several integrations or complex rules): **8–12 weeks** (≈40–60 dev-days).

Adjust for: team size, familiarity with the stack, clarity of requirements, design/content readiness. Add **20–30% buffer** for unknowns and iteration.

**Document the estimate**

- List the assumptions (who’s working, what’s in/out of scope, what “done” means).
- Give a range (e.g. “4–6 weeks to working MVP”) rather than a single date.
- Call out risks (e.g. “Depends on access to API X by date Y”) and what you’ll do if the scope grows (e.g. “We’ll drop flow Z from MVP”).

---

## 5. Estimating cost

Capture estimated cost so the client or stakeholder can plan budget. Separate one-time (build) from ongoing (run).

**Infrastructure and services (ongoing) — approximate figures; check vendor sites for current pricing**

- **Supabase** — Free: **$0**. Pro: **$25/month** (base; production with dedicated compute can be **~$125/month**). [Supabase pricing](https://supabase.com/pricing).
- **Vercel** (web) — Hobby: **$0**. Pro: **$20/user/month**. [Vercel pricing](https://vercel.com/pricing).
- **EAS** (mobile) — Free: **$0** (e.g. 15 Android + 15 iOS builds/month). Starter: **$19/month**. Production: **$199/month**. [Expo pricing](https://expo.dev/pricing).
- **Third-party APIs** — Estimate by volume (e.g. email, payments, SMS); often **$0–50/month** at MVP scale, more for high volume.

**Build / engagement cost (one-time or phased)**

- **Labour:** rate × estimated dev-days (from section 4). Example: 20 dev-days × **$600–1,000/day** → **$12,000–20,000** for a small MVP; substitute your own day rate or hourly (e.g. 8 hrs × $75–125/hr).
- **One-off:** design, content, or licenses if not already covered (e.g. **$0–2,000** for minimal design; more if custom).

**Typical MVP run cost (monthly)**

- **Free/low:** Supabase Free + Vercel Hobby + EAS Free → **$0/month** (within tier limits).
- **Paid low:** Supabase Pro + Vercel Pro (1 seat) + EAS Starter → **~$64/month**.
- **Paid production:** Supabase with dedicated compute + Vercel Pro + EAS Production → **~$350/month** and up.

**What to document**

- **One-time:** Total or phased cost to deliver the MVP (effort × rate + any setup/design).
- **Ongoing:** Monthly run cost and at what scale limits might force a tier change.
- **Assumptions:** e.g. “Build cost assumes 1 developer, 20 dev-days, $X/day; infra on free tier until N users.”

Share the cost estimate together with the scope and timeline so the client can approve or adjust scope to fit budget.

---

## 6. After kickoff

- Share a short summary with the client: goal, core flows for MVP, out of scope, rough estimate range, and estimated cost (build + ongoing).
- Create tickets or a backlog from the core flows and data model.
- Run through the [planning checklist](./planning-checklist.md) (steps 2–6) for Non-Functional Requirements (NFRs), resource estimation if useful, core entities and API, high-level design, and risks.
- Start with auth and one end-to-end flow so you have a working slice early; then add the rest of the MVP.
