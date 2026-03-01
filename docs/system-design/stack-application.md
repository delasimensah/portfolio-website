# How System Design School applies to this monorepo

This doc ties every [System Design School](https://systemdesignschool.io) topic we've linked to the tech stack in this repo: **Next.js** (web), **Expo** (mobile), **Supabase** (auth, DB, storage, realtime, edge functions), **packages/shared** (services, hooks, types), **TanStack Query**, **Zustand**, and hosting (**Vercel**, **EAS**).

---

## 1. Planning process

**[What is system design](https://systemdesignschool.io/fundamentals/what-is-system-design-interview)** — You design services, dataflow, and storage; you separate functional from non-functional requirements. In this repo: **Services** are the Next.js app, Expo app, Supabase, and `shared`. **Dataflow** is client → Supabase (REST/realtime) with TanStack Query and wrapper hooks (see [data-fetching-patterns-guide](../data-fetching-patterns-guide.md)). **Storage** is Supabase Postgres + RLS (Row Level Security) + storage and the TanStack Query cache.

**[Interview template](https://systemdesignschool.io/fundamentals/system-design-interview-template)** — The sequence is: clarify requirements → Non-Functional Requirements (NFRs) → (optional) resource estimation → core entities & API → high-level design → detailed design. In this repo you use [planning-checklist.md](./planning-checklist.md) for every new project or major feature, and you follow each app’s `project-structure.md` and `developer-decision-guide.md` when implementing.

**[Study guide](https://systemdesignschool.io/fundamentals/system-design-interview-study-guide)** — Design goals come first; then the four challenges; then building blocks, template, and practice. In this repo the NFRs (Non-Functional Requirements) and challenges live in [principles.md](./principles.md); you apply them via the checklist and iterate.

---

## 2. Non-functional requirements (NFRs — Non-Functional Requirements)

**[Non-functional requirements](https://systemdesignschool.io/fundamentals/non-functional-requirements)** — The big four are availability, scalability, latency, and consistency; scale drives complexity. In this repo: **Availability** comes from Supabase HA (high availability), Vercel/EAS multi-region, client retries, and offline handling. **Scalability** from stateless apps, TanStack Query, and Supabase, with queues or edge when needed. **Latency** from query design, indexes, CDN (Content Delivery Network), TanStack Query, and avoiding N+1. **Consistency** from RLS (Row Level Security), Postgres transactions, cache invalidation, and documenting where you accept eventual consistency.

**[High availability](https://systemdesignschool.io/fundamentals/availability)** — Availability is operational time / total time; “nines” and SLAs define targets. In this repo Supabase and Vercel/EAS publish SLAs; you choose plans and regions and add client retries and graceful degradation.

**[How to achieve high availability](https://systemdesignschool.io/fundamentals/how-to-achieve-high-availability)** — You use redundancy, failover, and health checks and remove single points of failure. In this repo that’s largely managed by Supabase and hosting; you keep apps stateless so hosting can replicate.

**[Tech stacks for HA](https://systemdesignschool.io/fundamentals/tech-stacks-to-achieve-high-availability)** — In this repo the HA-relevant stack is Supabase + Vercel/EAS; pick plans and regions accordingly.

**[Latency](https://systemdesignschool.io/fundamentals/latency)** — You care about response time and reduce it with CDN, indexes, edge, and fewer hops. In this repo: query design, indexes, TanStack Query + CDN, avoid N+1, and use Supabase realtime only where necessary.

**[Throughput](https://systemdesignschool.io/fundamentals/throughput)** — Throughput is work per unit time (e.g. QPS — queries per second); you scale horizontally, cache, and use async. In this repo Supabase and hosting have limits; when you approach them you use the Building blocks (caching, replicas, queues).

**[QPS and system design](https://systemdesignschool.io/fundamentals/qps)** — RPS (requests per second) is all requests/sec; QPS (queries per second) is database queries/sec. Architecture varies by tier (low / medium / high / very high QPS). In this repo many products sit in **low (1–100 QPS)** with a single Supabase and simple setup. As QPS grows you add caching, read replicas, then queues per [Building blocks](./principles.md#building-blocks).

---

## 3. Resource estimation

**[Back-of-the-envelope](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation)** — You do rough sizing (DAU (daily active users), QPS, storage, bottlenecks). In this repo you use it in planning checklist step 3 for scale-sensitive features and compare results to Supabase and hosting limits.

**[Real-world examples](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation-real-world-examples)** — Worked examples of resource estimation. Use them when doing step 3; apply the same kind of math to your DAU (daily active users), retention, and object sizes.

---

## 4. API design

**[API design intro](https://systemdesignschool.io/fundamentals/api-design-intro)** — REST is stateless; URLs are resources (nouns); HTTP methods are the verbs. In this repo Supabase tables are the resources; you use `.from('table').select()/.insert()/.update()/.delete()` and name tables and columns as nouns.

**[API design example](https://systemdesignschool.io/fundamentals/api-design-example)** — Use it when defining new tables or edge function contracts.

**[Pagination](https://systemdesignschool.io/fundamentals/api-design-pagination)** — You use offset or cursor-based lists. In this repo: **Offset** = Supabase `.range(from, to)` for small or admin lists. **Cursor** = `.lt('id', cursor).order().limit(n)` for feeds and return `next_cursor`.

**[Authentication](https://systemdesignschool.io/fundamentals/api-design-authentication)** — The API must know who is calling; each request carries a credential (e.g. JWT). In this repo Supabase Auth handles sign-in/sign-up; `supabaseClient` is created with the session and sends the JWT on every request; Supabase verifies the JWT and RLS (Row Level Security) enforces what that user can read/write.

**[Authorization](https://systemdesignschool.io/fundamentals/api-design-authorization)** — Once identity is known, you enforce what the caller is allowed to do (resource- or role-based). In this repo **RLS (Row Level Security)** in Supabase does that:

- policies use `auth.uid()`, ownership columns, and roles (in profile or JWT)
- edge functions verify again after the JWT

**[API Gateway](https://systemdesignschool.io/fundamentals/api-gateway)** — A single entry point routes requests and often does auth at the edge. In this repo **Supabase** is that gateway: one URL for REST, Auth, Storage, and Edge Functions. Add Next.js API routes or edge functions as a BFF only if you add more backends or need rate limiting or aggregation.

---

## 5. Scaling and architecture

**[Core challenges](https://systemdesignschool.io/fundamentals/core-challenges-in-web-scale-app)** — Too many users and too much data; you address them with load balancing, replication/caching, partitioning, and queues. In this repo you address “too many users” with connection and query efficiency and TanStack Query; “too much data” with pagination, indexes, and optionally replicas or CDN; see Building blocks.

**[System design components](https://systemdesignschool.io/fundamentals/system-design-components)** — The main components are load balancing, caching, partitioning, and message queues. In this repo: **Load balancing** is handled by Vercel/EAS with stateless apps. **Caching** is TanStack Query and CDN (Redis only if needed). **Partitioning** is Postgres partitioning and indexes. **Queues** are edge functions or something like Inngest/Trigger.dev when you need async.

**[How to scale a system](https://systemdesignschool.io/fundamentals/how-to-scale-a-system)** — Strategies include decomposition, vertical/horizontal scaling, partitioning, caching, queues, and read/write separation. In this repo: **Decomposition** = web / mobile / shared and edge functions. **Horizontal** = stateless apps + hosting. **Caching** = TanStack Query, CDN. **Queues** only when you add async. **Read/write** = Supabase read replicas (Pro/Team) or CQRS if you need it.

**[Microservices vs monolithic](https://systemdesignschool.io/fundamentals/microservices)** — You choose when to split into services vs keep a monolith. This repo is a **modular monolith**: web app, mobile app, shared package, and Supabase edge functions for isolated server work. Add separate services or more edge functions when one capability needs different scale or ownership.

---

## 6. Stack summary

When you ask “where does X go?” or “how do we achieve Non-Functional Requirement (NFR) Y?” in the monorepo, use this:

- **Frontends** — Next.js (`apps/web-app`), Expo (`apps/mobile-app`).
- **Backend / data** — Supabase (auth, Postgres, RLS (Row Level Security), storage, realtime, edge functions).
- **Shared logic** — `packages/shared` (services, hooks, types).
- **Server state** — TanStack Query and app-specific wrapper hooks.
- **Client state** — Zustand or local component state.
- **Session / identity** — Supabase Auth (JWT in `supabaseClient`).
- **Hosting** — Vercel (web), EAS (mobile).
- **Single API surface** — Supabase project URL (DB, auth, storage, functions).
