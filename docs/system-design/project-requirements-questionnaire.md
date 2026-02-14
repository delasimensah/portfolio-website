# Project requirements questionnaire

Use this questionnaire with a **client** (send and collect answers) or **yourself** before writing the project requirements doc and running the [planning checklist](./planning-checklist.md). Answer every section that applies; skip only when clearly N/A. When done, transfer answers into [project-requirements-template.md](./project-requirements-template.md).

---

## 1. Product and goal

**What is the product or feature in one sentence?** (e.g. “A mobile app for X that does Y.”)

**What problem does it solve, or what outcome do we want?**

**Who is the product owner or primary stakeholder?**

---

## 2. Users and platforms

**Who are the end users?** (e.g. consumers, internal team, admins, partners.)

**Which platforms are in scope for the MVP (Minimum Viable Product)?** (Web only / mobile only / both.)

**Any specific devices or OS versions we must support?**

**Do we need different experiences per user type?** (e.g. admin vs end user.)

---

## 3. MVP definition and “done”

**What does “done” look like for the MVP?** (Concrete outcome or milestone.)

**What is the absolute minimum we must ship to consider the MVP successful?**

**What is explicitly not in the MVP?** (List so scope doesn’t creep.)

---

## 4. Existing vs new

**What already exists?** (Current app, APIs, design system, content, data, brand.)

**What must be built from scratch?** (New flows, data, integrations.)

**Do we have access to existing code, APIs, or design assets?** (Links, credentials, docs.)

---

## 5. Main user flows (nouns and verbs)

**What are the main things users do?** (e.g. sign up, create X, view Y, share Z.) List in order of importance.

**What are the core entities (nouns)?** (e.g. User, Project, Task, Order.) How do they relate?

**Which flows are must-have for the MVP vs nice-to-have for later?**

---

## 6. Data and integrations

**What data do we need to store?** (Key entities and rough fields.)

**Any third-party integrations?** (Payments, email, SMS, analytics, webhooks, APIs.)

**Who owns or provides external APIs?** Any rate limits or auth requirements?

**Do we need to import or migrate existing data?**

---

## 7. Rules, permissions, and compliance

**Who can see or do what?** (e.g. users see only their data; admins see all.)

**Any approval flows, moderation, or multi-step workflows?**

**Any compliance or legal requirements?** (e.g. GDPR — General Data Protection Regulation; HIPAA — Health Insurance Portability and Accountability Act; regional rules, consent, data retention.)

**Any PII (personally identifiable information) we must handle specially?** (Encryption, retention, deletion.)

---

## 8. Constraints and preferences

**Hard deadline or target launch window?**

**Budget or capacity constraints?** (e.g. one developer, 2 months, fixed budget.)

**Any non-negotiables?** (e.g. must work offline, must support region X, must use provider Y.)

**Preferred auth?** (Email/password, magic link, OAuth, SSO.)

**Any tech stack constraints or preferences?**

---

## 9. Non-functional requirements (as relevant)

**Expected scale?** (Rough users, DAU (daily active users), or “small internal tool” vs “public product.”)

**Availability expectations?** (e.g. 24/7, business hours, or “best effort.”)

**Latency expectations?** (e.g. realtime, sub-second, or “normal web speed.”)

**Need offline support or sync?**

**Any known performance or reliability risks?**

---

## 10. Success and priorities

**How will we know the MVP (Minimum Viable Product) is successful?** (Metric or signal.)

**If we had to cut scope, what is the last thing we would drop?** (Priority order.)

**What would we do in a “Phase 2” after the MVP?** (Optional; helps bound MVP.)

---

## 11. Design, content, and ops

**Do we have designs (Figma, etc.) or will we work from wireframes/copy?**

**Who provides copy and assets?**

**Who will deploy and operate the app?** (You, client, shared.)

**Preferred hosting or infra?** (Use template defaults or something specific?)

---

## Next steps

1. Copy answers into [project-requirements-template.md](./project-requirements-template.md) to produce the **project requirements doc**.
2. Run the [planning checklist](./planning-checklist.md) (Non-Functional Requirements (NFRs), entities, API, high-level design, risks).
3. Use [new-project-kickoff.md](./new-project-kickoff.md) for estimating scope, time, and cost to the MVP.
