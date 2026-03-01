# System design principles

Core principles applied when planning projects or major features. Content summarized from **System Design School** ([README](./README.md#external-resources)) and mapped to this monorepo’s stack.

---

## What we’re designing

System design is architecting (often data-intensive) applications by selecting and integrating components to handle **data processing and storage**, then stitching them with application code so the system works as a whole. The service’s API hides implementation details and can offer guarantees (e.g. cache consistency).

When planning, focus on three areas:

- **Services** — Components, apps, APIs that provide functionality; can be monolith or microservices. In this repo: Next.js app, Expo app, Supabase (auth, DB, edge functions), `packages/shared` (services, hooks).
- **Dataflow** — How data moves within and between services; formats, protocols, communication patterns. In this repo:
  - Client → Supabase (REST/realtime)
  - TanStack Query + wrapper hooks
  - see `docs/data-fetching-patterns-guide.md`
- **Storage** — Databases, caches, file systems; data modeling, consistency, durability. In this repo:
  - Supabase (Postgres, RLS (Row Level Security), storage)
  - client cache (TanStack Query)
  - consider CDN/caching for static assets

---

## Requirements

- **Functional**: What the system must do (user actions, data input/processing). Capture as user flows and capabilities; align with PRD (Product Requirements Document) or ticket scope.
- **Non-functional**: How the system should behave; they shape architecture. **Scale drives complexity** — the same app for 100 users vs 100M users needs different patterns (caching, queues, distributed DBs). See [Non-functional requirements](https://systemdesignschool.io/fundamentals/non-functional-requirements).

**The big four Non-Functional Requirements (NFRs)** (often in tension; prioritize by business need):

- **Availability** — Eliminate single points of failure; redundancy; health checks; geographic distribution. In this repo:
  - Supabase high availability (HA)
  - hosting (Vercel, EAS) multi-region
  - client retries and offline handling
  - no single server holding critical state. See [High availability](https://systemdesignschool.io/fundamentals/availability) for definition, **nines** (e.g. 99.9% ≈ 8.77 h downtime/year), and **SLAs**.
- **Scalability** — Scale horizontally with stateless services; caching; async processing. In this repo:
  - Stateless Next.js/Expo
  - TanStack Query cache
  - Supabase scales
  - add message queue or edge functions for bursty/async work
- **Latency** — Minimize network hops and processing time; CDN; DB indexes; edge computing. In this repo:
  - Query design and indexes
  - TanStack Query + CDN (Content Delivery Network) for static assets
  - avoid N+1
  - Supabase realtime only where needed. See [Latency](https://systemdesignschool.io/fundamentals/latency).
- **Consistency** — Choose the right model: strong (e.g. payments) vs eventual (e.g. feeds, recommendations). In this repo:
  - RLS and Postgres transactions for strong consistency where required
  - cache invalidation and read-your-writes strategy
  - accept eventual consistency for non-critical paths and document it

**Trade-offs**: These requirements conflict (e.g. strong consistency can reduce availability during partitions; low latency adds cost and complexity). Prioritize based on the product; don’t optimize everything equally.

**Availability in practice** ([High availability](https://systemdesignschool.io/fundamentals/availability)): Availability % = (operational time / total time) × 100. "Nines" (e.g. 99.9% = three nines, 99.99% = four nines) translate to allowed downtime per year. **SLAs** (service-level agreements) set contractual uptime targets; cloud providers (Supabase, Vercel, etc.) publish SLAs. Choose a target that matches product needs and document it; rely on provider SLAs for infra and add client retries and graceful degradation to improve perceived availability. For **how** to achieve it (redundancy, failover, health checks, eliminating single points of failure), see [How to achieve high availability](https://systemdesignschool.io/fundamentals/how-to-achieve-high-availability). For **tech stacks** that support HA (high availability), see [Tech stacks to achieve high availability](https://systemdesignschool.io/fundamentals/tech-stacks-to-achieve-high-availability); in this repo, Supabase and hosting (Vercel, EAS) provide managed HA (high availability)—choose plans and regions accordingly.

**Latency in practice** ([Latency](https://systemdesignschool.io/fundamentals/latency)): Latency is the delay between request and response. Users typically expect sub-second for pages and low milliseconds for API calls; high latency hurts engagement and conversions. Reduce it by:

- fewer network hops (CDN (Content Delivery Network) for static assets, edge where useful)
- fast data access (indexes, efficient queries)
- avoiding N+1 and over-fetching
- using TanStack Query to cache and dedupe. Set targets per use case (e.g. critical path vs background) and measure.

**Throughput** ([Throughput](https://systemdesignschool.io/fundamentals/throughput)): Throughput is work completed per unit time (e.g. requests/sec, QPS — queries per second). It measures system capacity; latency measures per-request delay. To increase throughput:

- scale horizontally (more instances)
- cache to reduce backend load
- use async processing (queues) for bursty work. In this repo, Supabase and hosting have limits; design for expected QPS (queries per second) and use the scaling strategies in the Building blocks section when you approach those limits.

**QPS and system design** ([QPS and system design](https://systemdesignschool.io/fundamentals/qps)): **RPS** = total requests/sec (all types); **QPS (queries per second)** = database queries per second. The DB is often the bottleneck, so QPS is monitored closely. Architecture by tier:

- **Low (1–100 QPS)** — monolith, single instance, simple database (this repo fits here for many products)
- **Medium (100–1K)** — horizontal scaling, caching, read replicas, containers
- **High (1K–100K)** — microservices, message queues, distributed stores, heavy caching
- **Very high (100K+)** — multi-region, edge, serverless. When your back-of-the-envelope QPS approaches the next tier, apply the Building blocks (caching, replicas, queues) before adding complexity.

---

## API design

API design is defining the **interface** between components: endpoints, request/response formats, and operations ([API design intro](https://systemdesignschool.io/fundamentals/api-design-intro)).

**REST-style principles:**

- **Statelessness** — Each request carries what’s needed; server doesn’t rely on stored session for the operation.
- **Resource-based** — URLs are **nouns** (e.g. `/users`, `/posts`); the **HTTP method** is the verb (GET, POST, PUT, PATCH, DELETE). Avoid verbs in URLs (e.g. prefer `GET /books` over `GET /getAllBooks`).
- **Uniform interface** — Consistent use of URIs and methods across resources.

**In this repo:**

- **Supabase** — Tables are resources; client uses `.from('table')` with `.select()`, `.insert()`, `.update()`, `.delete()`. Design tables and RLS (Row Level Security) as the “API”; name tables and columns as nouns.
- **Custom endpoints** (e.g. Supabase edge functions, or tRPC) — Use resource-based paths and clear request/response types; keep service functions in `shared` named by operation but backed by resource-oriented data access.
- **Hooks and services** — Public API of a hook/service is the “contract”; document inputs/outputs and keep them stable.

For a worked example of applying these ideas, see [API design example](https://systemdesignschool.io/fundamentals/api-design-example).

**Pagination** ([API design - Pagination](https://systemdesignschool.io/fundamentals/api-design-pagination)) — For list endpoints, avoid returning unbounded collections.

- **Offset / limit** — `?page=2&page_size=20` (or `offset`, `limit`); server uses `LIMIT n OFFSET k`. Simple but the list can shift if data changes, and `OFFSET` is expensive for large k. In this repo:
  - Supabase `.range(from, to)` e.g. `.range(0, 19)` for first page
  - use for small lists or admin UIs
- **Cursor-based (keyset)** — `?cursor=id_or_timestamp&limit=20`. Client sends last seen value; server returns next page and `next_cursor`. Stable across inserts/deletes and efficient with an index. In this repo: Supabase `.lt('id', cursor)` (or `.gt` for reverse) with `.order('id').limit(n)`. Return last row’s `id` (or `created_at`) as `next_cursor` in the response.

Prefer **cursor-based** for user-facing lists (feeds, search results); use **offset** only when you need “page 5” semantics or small datasets.

**Authentication** ([API design - Authentication](https://systemdesignschool.io/fundamentals/api-design-authentication)) — APIs need to know **who** is calling: verify identity on each request in a stateless way when possible.

- **Identity** — Establish who the client is (user, service). In this repo:
  - Supabase Auth handles sign-in/sign-up (email, OAuth, etc.)
  - the session holds the user identity
- **Credential per request** — Each request carries a credential (e.g. Bearer JWT); server verifies without a server-side session store. In this repo:
  - `supabaseClient` is created with the session
  - the Supabase client attaches the JWT to requests
  - all Supabase API calls (DB, storage, functions) are authenticated via that JWT
- **Enforcement at the boundary** — Auth at the API edge; the data layer can enforce again. In this repo:
  - Supabase verifies the JWT
  - **RLS (Row Level Security)** enforces which rows the authenticated user can read/write. See `apps/web-app/docs/authentication-architecture.md` for app-level flow.

For custom endpoints (e.g. edge functions), read the JWT from the request and verify with Supabase; use the same session as the client so identity is consistent.

**Authorization** ([API design - Authorization](https://systemdesignschool.io/fundamentals/api-design-authorization)) — Once identity is known, **what** is the client allowed to do? Auth = who; Authorization = what they can access or perform.

- **Resource-level** — Allow or deny access to specific resources (e.g. this user can edit only their own post). In this repo:
  - **RLS policies** in Supabase filter rows by `auth.uid()`, ownership columns, or custom claims
  - every query is automatically scoped
- **Role-based** — Permissions derived from roles (e.g. admin, editor). In this repo:
  - store role on profile or in JWT custom claims
  - RLS or edge functions check `auth.jwt() ->> 'role'` or a `profiles.role` join
- **Enforce server-side** — Never trust the client for authorization; verify after authentication. In this repo:
  - Supabase enforces RLS in the DB regardless of client
  - edge functions should check permissions after verifying JWT

Design RLS policies per table so that “can this user read/update/delete this row?” is answered in one place; keep app code to “what to show” and let the API (Supabase) enforce “what is allowed.”

**API Gateway** ([API Gateway](https://systemdesignschool.io/fundamentals/api-gateway)) — A **single entry point** for clients that routes requests to backend services, often handling auth, rate limiting, and request/response transformation. Common in microservices; also used as a BFF (Backend-for-Frontend).

- **Single entry / routing** — The client talks to one host; the gateway routes to the right service. In this repo:
  - **Supabase** is the single API surface (one project URL for REST, Auth, Storage, and Edge Functions)
  - clients don't talk to multiple backends directly
- **Auth at gateway** — Verify identity (and optionally authorize) at the edge before hitting services. In this repo:
  - Supabase verifies the JWT for DB, storage, and edge function invocations
  - there is no separate gateway layer today
- **When to add a gateway** — When you have multiple backends or need rate limiting, aggregation, or transformation in one place. In this repo:
  - if you add another service (e.g. external API, worker), use Next.js API routes or Supabase Edge Functions as a thin BFF that proxies and enforces auth
  - a dedicated gateway (Kong, etc.) is optional and usually for many services

For this monorepo, Supabase effectively acts as the API gateway to data and server logic; add an explicit gateway or BFF only when you have multiple backends or cross-cutting needs (e.g. rate limit, aggregate calls).

---

## Skills to apply

- **Tradeoffs**: Make explicit choices (e.g. consistency vs availability, simplicity vs scale) and document why.
- **Break down**: Start from requirements → services/dataflow/storage → map to this stack; use the [planning checklist](./planning-checklist.md).
- **Communicate**: Articulate boundaries, data flow, and risks in the plan so the team (and agent) can implement consistently.

## Core challenges (web-scale)

Satisfying **non-functional requirements** (especially scalability and availability) is central; they often need to be designed in from the start, not bolted on later. System design is managing **trade-offs**, applying the right **building blocks**, and choosing **technology** appropriately ([Study guide](https://systemdesignschool.io/fundamentals/system-design-interview-study-guide)).

Four recurring design goals / challenges:

- **Too many concurrent users** — A single machine/DB has a RPS/QPS limit; performance degrades when exceeded. In this repo:
  - Supabase has limits (connections, QPS)
  - design for connection pooling, query efficiency, and client-side caching (TanStack Query) to reduce load
- **Too much data to store and access** — Data no longer fits or moves efficiently on one machine. In this repo:
  - Supabase (Postgres) + RLS
  - avoid over-fetching
  - use pagination and indexes
  - consider read replicas or CDN for heavy read paths if needed
- **Low latency** — The application must respond quickly. In this repo:
  - query design, indexes, caching (TanStack Query, CDN), avoid N+1
  - use realtime (Supabase) only where needed
- **Consistency** — State must be consistent across services and cache. In this repo:
  - RLS, cache invalidation strategy, read-your-writes vs eventual consistency
  - document your choices

**Solutions**: Replicate **logic** (load balancing) and **data** (replicas, caches). Use building blocks below; add batch/stream or strict transactions only when requirements justify them.

## Building blocks

The critical design components for scaling are **load balancing**, **caching**, **partitioning**, and **message queues** ([System design components](https://systemdesignschool.io/fundamentals/system-design-components)). Core patterns to reach for when addressing the challenges above:

- **Scale stateless services** — Load balancing:
  - handled by hosting
  - Next.js/Expo clients are stateless
  - Supabase scales independently
- **Scale reads** — Replication + caching:
  - Supabase read replicas if needed
  - TanStack Query + CDN (Content Delivery Network) for static/assets
- **Scale writes** — Partitioning/sharding:
  - Supabase handles this
  - design keys and indexes for your access patterns
- **Scale data flow** — Message queues:
  - only if you add async workers
  - Supabase has no built-in queue
  - consider edge functions or external queue for heavy async work

When planning, ask whether the feature will hit these limits; if not, keep the design simple and avoid adding building blocks prematurely.

**Learning path** (from the [study guide](https://systemdesignschool.io/fundamentals/system-design-interview-study-guide)): (1) Understand design goals and challenges → (2) Grasp building blocks and template → (3) Apply via the [planning checklist](./planning-checklist.md) and iterate.

## How to scale a system

Eight strategies to satisfy scalability Non-Functional Requirements (NFRs) (use in combination when needed):

- **Decomposition** — Break into smaller services by business capability; single responsibility per service. In this repo:
  - web vs mobile vs shared
  - Supabase edge functions for isolated workloads
  - avoid one giant service in `shared`. See [Microservices vs monolithic](https://systemdesignschool.io/fundamentals/microservices) for the tradeoff.
- **Vertical scaling** — Scale up with more powerful machines. In this repo:
  - Supabase/hosting plan upgrades
  - only when horizontal options are exhausted
- **Horizontal scaling** — Run multiple identical **stateless** instances; load balancer distributes requests. In this repo:
  - Next.js/Expo apps are stateless
  - hosting (Vercel, EAS) handles replication
  - Supabase scales independently
- **Partitioning** — Split data/requests into shards by key (e.g. user ID, region). In this repo:
  - Supabase/Postgres partitioning
  - design indexes and keys for access patterns
  - consistent hashing only if you add custom sharding
- **Caching** — Store hot data in faster storage to reduce DB load and improve read latency. In this repo:
  - TanStack Query (client)
  - CDN (Content Delivery Network) for static assets
  - Redis/external cache only if Supabase read load justifies it
- **Buffer with message queues** — Turn synchronous writes into async; queue absorbs write spikes. In this repo:
  - not in Supabase by default
  - add edge functions or external queue (e.g. Inngest, Trigger.dev) for write-heavy, bursty workloads
- **Read/write separation** — Leader for writes; replicas for reads; or CQRS (Command Query Responsibility Segregation; separate read model, async sync). In this repo:
  - Supabase read replicas if on Pro/Team
  - CQRS = e.g. Postgres + Elasticsearch with CDC (Change Data Capture) when you need distinct read optimizations
- **Combining techniques** — Decomposition first, then partition + cache + read/write separation; tune for bottlenecks. In this repo: apply only where the feature actually hits limits.
- **Business adaptation** — Shape traffic via product (e.g. stagger sales by region/day, eventual consistency UX). In this repo: design flows to smooth load or accept eventual consistency when appropriate.

_Source: [How to scale a system](https://systemdesignschool.io/fundamentals/how-to-scale-a-system)_

**Microservices vs monolithic** ([Microservices vs monolithic](https://systemdesignschool.io/fundamentals/microservices)): A **monolith** deploys as one unit; simpler to build and operate but harder to scale parts independently. **Microservices** split by capability and deploy separately; better for independent scaling and teams but add operational and network complexity. This repo is a **modular monolith**:

- separate apps (web, mobile) and a shared package with clear boundaries
- Supabase edge functions give isolated server workloads without full microservices. Consider splitting into separate services (or more edge functions) when a single capability needs different scale, release cadence, or team ownership.

---

## Planning sequence

When planning, follow this order (see [planning checklist](./planning-checklist.md)):

1. **Clarify functional requirements** — What to build vs what exists; main flows.
2. **Non-functional requirements** — Core 6 + privacy as relevant.
3. **Resource estimation** (optional) — Back-of-the-envelope: DAU (daily active users), QPS (queries per second), storage, bottlenecks for scale-sensitive work ([Back-of-the-envelope calculation](https://systemdesignschool.io/fundamentals/back-of-envelope-calculation)).
4. **Core entities and API** — Nouns → schema/types; verbs → API contracts; bidirectional if needed.
5. **High-level design** — Components, data flow, boundaries; ensure every requirement is covered.
6. **Detailed design** — Identify hard parts, propose options and tradeoffs, state what’s deferred.

_Sources: [What is a system design interview?](https://systemdesignschool.io/fundamentals/what-is-system-design-interview), [Interview template](https://systemdesignschool.io/fundamentals/system-design-interview-template), [Core challenges](https://systemdesignschool.io/fundamentals/core-challenges-in-web-scale-app), [How to scale a system](https://systemdesignschool.io/fundamentals/how-to-scale-a-system), [Study guide](https://systemdesignschool.io/fundamentals/system-design-interview-study-guide), [API design intro](https://systemdesignschool.io/fundamentals/api-design-intro)_
