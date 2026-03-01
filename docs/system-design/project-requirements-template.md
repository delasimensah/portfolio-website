# Project requirements — [Project name]

Fill this from the [project requirements questionnaire](./project-requirements-questionnaire.md). Keep it short; use bullets. This doc is the single source of truth for **what** we’re building before running the [planning checklist](./planning-checklist.md).

**Project:**  
**Date:**  
**Owner / stakeholder:**

---

## 1. Goal (one sentence)

<!-- e.g. “A mobile app for X that does Y.” -->

---

## 2. Users and platforms

- **Users:**
- **MVP (Minimum Viable Product) platforms:** Web only / Mobile only / Both
- **Notes:** (e.g. admin vs end user, regions.)

---

## 3. Core flows (MVP)

Numbered list of the main user journeys in scope for the Minimum Viable Product (MVP). Mark later phases if useful.

1.
2.
3. …

**Out of scope for MVP (Minimum Viable Product):** (Explicit list so scope doesn’t creep.)

---

## 4. Core entities

Main nouns and how they relate. This drives Supabase schema and `packages/shared` types. One bullet per entity; add a short description and key relations.

- **Entity name** — Brief description. Relations: …
- **Entity name** — Brief description. Relations: …

---

## 5. Integrations and external systems

One bullet per system: name, purpose, and owner/access.

- **System name** — Purpose. Owner / access: …
- **System name** — Purpose. Owner / access: …

---

## 6. Rules and compliance

- **Permissions:** Who can see/do what.
- **Compliance:** GDPR (General Data Protection Regulation), retention, PII (personally identifiable information), or other.
- **Special rules:** Approval flows, visibility, etc.

---

## 7. Non-functional requirements (summary)

- **Scale:** (e.g. “Small internal; &lt;100 users.”)
- **Availability / latency:** (if relevant.)
- **Offline / realtime:** (if relevant.)

---

## 8. Success and priorities

- **Success metric for MVP (Minimum Viable Product):**
- **Must-have vs nice-to-have:** (Or “see Core flows; everything listed is must-have.”)

---

## Next steps

- Run the [planning checklist](./planning-checklist.md) (Non-Functional Requirements (NFRs), resource estimation, core entities and API, high-level design, risks).
- Use [new-project-kickoff.md](./new-project-kickoff.md) for scope, time, and cost estimates.
