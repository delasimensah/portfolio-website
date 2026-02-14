# System design for this monorepo

System design principles applied when **planning** new projects or major features. The goal is to align architecture with the stack (Next.js, Expo, Supabase, shared package) and to think through boundaries, data flow, and tradeoffs before coding.

The Cursor rule `.cursor/rules/system-design-planning.mdc` tells the agent to use these docs when you ask to plan a project or feature.

## External resources

Add links from **System Design School** here so the agent and team can reference them:

- [What is a system design interview?](https://systemdesignschool.io/fundamentals/what-is-system-design-interview) — Definition, what we design (services, dataflow, storage), functional vs non-functional requirements.
- [System design interview template](https://systemdesignschool.io/fundamentals/system-design-interview-template) — Step-by-step: clarify requirements, Non-Functional Requirements (NFRs), resource estimation, core entities & API, high-level design, detailed design.
- [Core challenges in web-scale system design](https://systemdesignschool.io/fundamentals/core-challenges-in-web-scale-app) — Too many users, too much data; building blocks (load balancing, replication/caching, partitioning, message queues).
- [How to scale a system](https://systemdesignschool.io/fundamentals/how-to-scale-a-system) — Eight strategies: decomposition, vertical/horizontal scaling, partitioning, caching, message-queue buffer, read/write separation, combining techniques, business adaptation.
- [System design interview study guide](https://systemdesignschool.io/fundamentals/system-design-interview-study-guide) — Design goals from the start; four core challenges; building blocks → template → practice.
- [Non-functional requirements](https://systemdesignschool.io/fundamentals/non-functional-requirements) — The big four (availability, scalability, latency, consistency); strategies and trade-offs.
- [High availability](https://systemdesignschool.io/fundamentals/availability) — Definition, measuring availability (nines), SLAs.
- [How to achieve high availability](https://systemdesignschool.io/fundamentals/how-to-achieve-high-availability) — Strategies: redundancy, failover, health checks.
- [Tech stacks to achieve high availability](https://systemdesignschool.io/fundamentals/tech-stacks-to-achieve-high-availability) — Technology choices that support high availability (HA).
- [Latency](https://systemdesignschool.io/fundamentals/latency) — Response time as a Non-Functional Requirement (NFR); measuring and reducing latency.
- [Throughput](https://systemdesignschool.io/fundamentals/throughput) — Work completed per unit time (e.g. QPS — queries per second); capacity and scaling.
- [Back-of-the-envelope resource estimation](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation) — Rough sizing: DAU (daily active users), QPS (queries per second), storage, bottlenecks.
- [Back-of-the-envelope real-world examples](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation-real-world-examples) — Worked examples of resource estimation.
- [QPS and system design](https://systemdesignschool.io/fundamentals/qps) — RPS (requests per second) vs QPS (queries per second); how architecture changes by QPS tier (low / medium / high / very high).
- [Microservices vs monolithic](https://systemdesignschool.io/fundamentals/microservices) — When to decompose into services vs keep a monolith.
- [System design components](https://systemdesignschool.io/fundamentals/system-design-components) — Critical building blocks: load balancing, caching, partitioning, message queues.
- [API design intro](https://systemdesignschool.io/fundamentals/api-design-intro) — REST: statelessness, resource-based URLs (nouns), HTTP methods (verbs); avoid verbs in URLs.
- [API design example](https://systemdesignschool.io/fundamentals/api-design-example) — Worked example applying REST API design.
- [API design - Pagination](https://systemdesignschool.io/fundamentals/api-design-pagination) — Pagination strategies for list endpoints (offset vs cursor).
- [API design - Authentication](https://systemdesignschool.io/fundamentals/api-design-authentication) — How APIs verify client identity (tokens, sessions).
- [API design - Authorization](https://systemdesignschool.io/fundamentals/api-design-authorization) — What an authenticated client is allowed to do (roles, permissions, resource-level).
- [API Gateway](https://systemdesignschool.io/fundamentals/api-gateway) — Single entry point, routing, auth, rate limiting; microservices and BFF (Backend-for-Frontend) patterns.

You can also add these base URLs to **Cursor → Settings → Indexing & Docs** so the agent can search them via @Docs.

## What lives here

- **README.md** (this file) — Overview, external links, stack mapping.
- **principles.md** — Core principles (summarized from the links above); map to this stack.
- **planning-checklist.md** — Checklist the agent and you use when planning a project or feature.
- **project-requirements-questionnaire.md** — Comprehensive questionnaire for client or self: answer before writing the project requirements doc and running the checklist.
- **project-requirements-template.md** — Minimal template for the project requirements doc; fill from the questionnaire, then use with the planning checklist.
- **new-project-kickoff.md** — What to ask the client/stakeholder and how to estimate scope and time to a working MVP.
- **stack-application.md** — How every System Design School link applies to this monorepo’s tech stack (single reference).

**Project requirements doc:** Every project (or major product) should have a **project requirements doc** that records the outcome of discovery: one-sentence goal, users, core flows, core entities, and out-of-scope. Create it from the [questionnaire](./project-requirements-questionnaire.md) and [template](./project-requirements-template.md), then run the [planning checklist](./planning-checklist.md).

## Stack mapping

When applying system design, map concepts to this repo:

- **Frontends**: `apps/web-app` (Next.js), `apps/mobile-app` (Expo)
- **Backend / data**: Supabase (auth, DB, realtime, storage)
- **Shared logic / types**: `packages/shared`
- **State**: TanStack Query (server state), Zustand (client state), Supabase session

Before designing a new service or feature, read the relevant app docs (`project-structure.md`, `developer-decision-guide.md`) and `docs/data-fetching-patterns-guide.md`, `docs/supabase-integration-patterns.md`.

## When to use

- Planning a **new project** or **new product area**
- Designing a **major feature** (new flows, new services, new data models)
- Reviewing or refactoring **boundaries** (apps vs shared, services vs hooks)

For small, localized changes (e.g. one new screen or component), follow the existing project-structure and developer-decision guides; system design docs are optional.
