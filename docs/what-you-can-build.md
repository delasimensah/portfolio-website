# What you can build with this stack

This doc lists **types of applications** that fit this monorepo’s tech stack: **Next.js** (web), **Expo** (mobile), **Supabase** (auth, database, storage, realtime, edge functions), **shared** (services, hooks, types), **TanStack Query**, **Zustand**, **Mantine** / **Refine** (web), **NativeWind** (mobile), and hosting on **Vercel** and **EAS**.

Use it to scope new products or to see where the stack fits and where you might need extra services (e.g. queues, dedicated AI infra).

---

## Stack at a glance

- **Web:** Next.js (App Router), React, Mantine, Refine, TanStack Query/Table, React Hook Form, Zod, Tailwind.
- **Mobile:** Expo, Expo Router, React Native, NativeWind, TanStack Query, React Hook Form, Zod.
- **Backend / data:** Supabase (Postgres, Auth, Realtime, Storage, Edge Functions).
- **Shared:** Types, services, hooks, validation (Zod) in `packages/shared`.
- **Hosting:** Vercel (web), EAS (mobile builds and updates).

---

## 1. Data-driven and CRUD applications

**What they are:** Apps centered on entities (users, projects, orders, content) with create, read, update, delete and list views.

**Why the stack fits:** Supabase Postgres + RLS for data and auth; Refine + TanStack Table on web for admin/data UIs; TanStack Query for caching and mutations; shared services for consistent API usage.

**Examples:**

- **Admin dashboards and internal tools** — Tables, filters, bulk actions, role-based access (RLS + Supabase Auth). Refine and Mantine give you layouts and forms quickly.
- **Content management (lightweight CMS)** — Authors, drafts, publish workflow; media in Supabase Storage; web and optionally mobile for viewing/editing.
- **CRM-style apps** — Contacts, deals, activities, pipelines; realtime updates for collaboration; dashboards and reports.
- **Inventory and resource tracking** — Items, locations, quantities; history and audit in Postgres; optional barcode/scanning on mobile.
- **Form-heavy applications** — Surveys, applications, registrations; React Hook Form + Zod in shared; Supabase for submissions and file uploads.

---

## 2. User-facing products (B2C / B2B)

**What they are:** Products used by end users or businesses, often with auth, profiles, and core workflows.

**Why the stack fits:** Supabase Auth (email, OAuth, magic link); shared auth state and hooks; one codebase for web and mobile with platform-specific UI.

**Examples:**

- **Marketplaces and directories** — Listings, search, filters, user profiles, messaging or bookings; Postgres + full-text search; Stripe or similar via Edge Functions or server actions.
- **Subscription and membership apps** — Plans, billing (Stripe/payment provider), gated content or features; RLS by plan; web + mobile.
- **Social and community apps** — Feeds, posts, comments, likes, follows; Supabase Realtime for live updates; Storage for images/media.
- **Booking and scheduling** — Resources, slots, bookings, calendar views; conflict checks and notifications; email/push via integrations.
- **E-commerce (small to mid)** — Products, cart, checkout, orders; Supabase for data; payments via Edge Functions or Next.js API routes; optional mobile app for shopping.
- **Learning and courses** — Courses, lessons, progress, quizzes; RLS for enrollment; video/docs in Storage or embedded; progress synced across web and mobile.
- **Health and fitness trackers** — Logs, goals, simple analytics; sync across devices via Supabase; native mobile for sensors/offline.

---

## 3. Realtime and collaborative apps

**What they are:** Apps where multiple users see live updates or work together.

**Why the stack fits:** Supabase Realtime (Postgres changes, presence, broadcast); TanStack Query for cache invalidation; shared subscriptions and types.

**Examples:**

- **Live dashboards and monitoring** — Metrics, alerts, status; Realtime for pushing updates to web/mobile.
- **Chat and messaging** — Direct and group chats; messages in Postgres; Realtime for delivery and presence; Storage for attachments.
- **Collaborative editors (simple)** — Shared documents or forms with live cursors or presence; Realtime + optional CRDT/OT if you need richer collaboration.
- **Live feeds and activity** — Activity streams, notifications; Realtime or polling; push on mobile via EAS/expo-notifications.
- **Multiplayer or live sessions** — Sessions, participants, state; Realtime for sync; game logic or session state in Edge Functions if needed.

---

## 4. Mobile-first and cross-platform apps

**What they are:** Apps where mobile is primary or where the same product is offered on web and mobile.

**Why the stack fits:** Expo for one mobile codebase (iOS/Android); shared package for API and business logic; NativeWind for familiar styling; EAS for builds and OTA updates.

**Examples:**

- **Field and on-the-go apps** — Data capture, checklists, photos; offline-friendly patterns with Sync when back online (TanStack Query + persistence or custom sync).
- **Consumer mobile apps with web companion** — Main experience on mobile; web for marketing, account, or light usage; shared auth and data.
- **Delivery and logistics** — Orders, routes, status; mobile for drivers; web for dispatch/admin; Realtime for status updates.
- **Events and check-in** — Tickets, QR codes, check-in; mobile for scanning; web for management and reports.
- **Wearables and companion apps** — Mobile as main app; data in Supabase; web for settings or analytics.

---

## 5. AI-powered applications

**What they are:** Apps that use LLMs, embeddings, RAG, agents, or other AI services to add intelligence, automation, or new UX.

**Why the stack fits:** Next.js API routes or Supabase Edge Functions call AI APIs; Supabase for user data, prompts, and RAG content; shared types and validation; Mantine/React for rich chat and forms. Mobile uses the same backend via shared client.

**Integration pattern:** AI runs in **Edge Functions** or **Next.js API routes** (server-side). Frontends (web and mobile) call these; never expose API keys. Store conversations, embeddings, and prompts in Supabase when needed.

**Examples:**

- **Chatbots and conversational assistants** — User messages → your API/Edge Function → LLM API (OpenAI, Anthropic, etc.) → response. Store thread history in Postgres; optional RAG over your docs (embeddings in Supabase or vector extension).
- **RAG (retrieval-augmented generation)** — Ingest docs (PDF, markdown); embed and store in Supabase (pgvector) or external vector DB; query at runtime and pass context to LLM. Good for internal knowledge bots, support, documentation Q&A.
- **AI copilots and in-app assistants** — In-context help (e.g. “suggest a reply”, “summarize this”, “generate a draft”). Same pattern: server-side LLM call; optional RAG over current entity or workspace data.
- **Content generation** — Drafts for posts, emails, product copy; image generation (DALL·E, etc.) via API; store results in Storage and metadata in Postgres; React Hook Form + Zod for structured input.
- **Classification and extraction** — User uploads or pastes text → LLM or small model for labels, entities, sentiment; store results in Supabase; show in tables or dashboards (Refine/TanStack Table).
- **Agents and workflows** — Multi-step flows: user goal → plan (LLM) → actions (API calls, DB writes via Edge Functions) → report back. Use Postgres for job state, logs, and user-facing history.
- **Personalization and recommendations** — Embeddings for users/items; similarity search (pgvector or external); “similar items” or “for you” feeds. Supabase for data; Edge Function or API route for scoring.
- **Moderation and safety** — User-generated content → LLM or moderation API → flag, block, or allow; store decisions and logs in Postgres; RLS for visibility.
- **Voice and multimodal** — Transcribe (e.g. Whisper API) → text pipeline (LLM, RAG) → TTS or response; store transcripts and outcomes in Supabase; mobile for recording, web for playback or admin.

**AI stack notes:**

- **LLM APIs:** Use OpenAI, Anthropic, or others from Edge Functions or Next.js API routes; keep keys server-side.
- **Vector search:** Supabase with pgvector for embeddings and similarity; or external (Pinecone, etc.) if you need scale.
- **Cost and limits:** Token usage and rate limits live in the AI provider; design prompts and caching to control cost; consider queueing for batch jobs.

---

## 6. Integrations and automation

**What they are:** Apps that connect to external systems, send notifications, or run scheduled or event-driven jobs.

**Why the stack fits:** Supabase Edge Functions for webhooks and cron; Next.js API routes for OAuth or callbacks; Supabase for storing tokens and job state; shared types for payloads.

**Examples:**

- **OAuth and third-party login** — Supabase Auth supports many providers; custom scopes or provider APIs via Edge Functions.
- **Webhooks and event pipelines** — Receive webhooks in Edge Function or Next.js route; validate, transform, write to Postgres; optional Realtime or push to notify users.
- **Scheduled jobs** — Supabase cron or external scheduler calls Edge Function; cleanup, reports, sync from external APIs.
- **Email and notifications** — Send via Resend, SendGrid, etc. from Edge Function or API route; store preferences and history in Postgres; EAS for push on mobile.
- **Payments** — Stripe (or similar) webhooks handled in Edge Function; update subscriptions or orders in Postgres; RLS for access.

---

## 7. When you might need more than this stack

The stack is a strong fit for most product apps, internal tools, and AI features. Consider adding or replacing when you need:

- **Very high write throughput or complex queues** — Dedicated queue (e.g. Inngest, Trigger.dev, SQS) plus workers; Supabase for state and results.
- **Heavy ML training or custom models** — Training and serving often live outside this stack; use APIs or batch jobs that write results back to Supabase.
- **Strict compliance or on-prem** — May need self-hosted Postgres or different auth; pattern (Next/Expo + shared) still applies.
- **Real-time at huge scale** — Supabase Realtime has limits; consider dedicated realtime/WebSocket service and keep Supabase for persistence.
- **Rich media processing** — Transcoding, thumbnails, etc. often via dedicated service (e.g. Mux, Cloudinary); Supabase Storage for final assets and metadata.

---

## Summary

You can build **CRUD and data apps**, **user-facing products** (marketplaces, subscriptions, social, booking, e-commerce, learning), **realtime and collaborative** experiences, **mobile-first and cross-platform** apps, **AI-powered** features (chat, RAG, copilots, agents, content gen, moderation), and **integrations and automation**. The same stack supports web and mobile with one shared backend and consistent patterns; add external services when you hit scale or specialism (queues, vector at scale, media pipelines).
