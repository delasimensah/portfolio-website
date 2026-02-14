# Planning checklist

Use this when planning a **new project**, **new product area**, or **major feature**. The agent should work through it (and reference `docs/system-design/README.md` and `docs/system-design/principles.md`) when the user asks for project or feature planning. Structure follows the [System Design School interview template](https://systemdesignschool.io/fundamentals/system-design-interview-template).

---

## 1. Clarify functional requirements

- [ ] **Project requirements doc** exists (or create from [project-requirements-questionnaire.md](./project-requirements-questionnaire.md) and [project-requirements-template.md](./project-requirements-template.md)); it records one-sentence goal, users, core flows, core entities, and out-of-scope.
- [ ] What is the project or feature? One-sentence goal.
- [ ] Which features are already covered by existing services/APIs? Which need to be built?
- [ ] Who are the users? (web, mobile, both?) What are the main flows or outcomes (the **nouns** and **verbs**)?

## 2. Non-functional requirements

Discuss and prioritize as relevant to the problem:

- [ ] **Scalability** — Target users/workload; design to handle growth (Supabase limits, read/write patterns).
- [ ] **Availability** — Operational when needed; replication, failover, client retries, offline considerations.
- [ ] **Latency** — Acceptable response time for this app (e.g. realtime vs batch).
- [ ] **Reliability** — Service returns correct, expected results.
- [ ] **Consistency** — Data consistency between services/cache; where data is saved; invalidation strategy.
- [ ] **Efficiency** — Minimize redundant operations; optimize resources.
- [ ] **Privacy** — GDPR (General Data Protection Regulation) or other requirements if handling PII (personally identifiable information; e.g. email, user data).

## 3. Resource estimation (optional)

For infrastructure-heavy or scale-sensitive features, use [back-of-the-envelope](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation) math to size the system; see [real-world examples](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation-real-world-examples) for worked exercises. Estimate if useful:

- [ ] DAU (daily active users) or target users; data retention.
- [ ] Read/write QPS (queries per second); ongoing connections (e.g. WebSockets/realtime); throughput (e.g. media).
- [ ] Storage (retention × size); identify bottlenecks (database, QPS, Supabase limits).

## 4. Core entities and API / contracts

- [ ] **Core entities** (nouns) — Domain models and database schema: tables, RLS (Row Level Security), relations. Map to Supabase + `packages/shared` types.
- [ ] **API / contracts** (verbs) — Request/response interfaces for the features: REST, Supabase client, or tRPC; only what’s needed for the functional requirements.
- [ ] **Bidirectional** — If needed: WebSockets, SSE, or Supabase realtime.

## 5. High-level design

- [ ] **Components** — Main parts and how they interact (web app, mobile app, Supabase, shared).
- [ ] **Data flow** — How data moves through the system; traffic patterns (e.g. push vs pull) if relevant.
- [ ] **Boundaries** — What lives in web vs mobile vs shared; server vs client; new services/hooks and where they live.
- [ ] **Data and state** — TanStack Query + wrapper hooks; Zustand; Supabase. Pages/screens and route groups per app docs.

Ensure every functional requirement is covered; don’t over-detail or buzzword-stack. Use `project-structure.md`, `developer-decision-guide.md`, `data-fetching-patterns-guide.md`, `supabase-integration-patterns.md`.

## 6. Detailed design (deep dive)

- [ ] **Risks** — Parts that could cause scalability, latency, or consistency problems.
- [ ] **Options** — Propose solutions and tradeoffs (e.g. scalability vs latency vs consistency).
- [ ] **Deferred** — What is explicitly out of scope or later iteration?

---

After the checklist, produce a short **plan** (bullets or sections) the user can follow or hand to the agent for implementation. When implementing, the agent must still follow the repo’s code organization and the relevant app/docs guides.
