# Crown Lusso MVP (Minimum Viable Product) — Product Requirements Document

**Version:** 1.0  
**Last updated:** 2026-02-10  
**Status:** MVP (Minimum Viable Product) scope (implementation in progress)  
**Related:** [Complete System Design](/Users/delasimensah/.cursor/plans/crown_lusso_complete_system_design.md) · [Requirements Analysis](./requirements-analysis.md)

---

## 1. Purpose & Scope

This document defines the **Minimum Viable Product (MVP)** for Crown Lusso. based on system design and implementation planning. It describes **what** we are building for the first release: a guest-facing mobile app and an admin-facing web dashboard, with no payment processing and no third-party agents.

**In scope:** Features listed in Sections 4 (Mobile) and 5 (Web Admin) with acceptance criteria.  
**Out of scope for MVP:** Section 6.  
**Long-term vision:** See `crown_lusso_mvp/.cursor/rules/product-requirements.mdc` for full product vision (subscription model, agents, facility managers, messaging, etc.).

---

## 2. Product Overview

### 2.1 What is Crown Lusso?

Crown Lusso is a **luxury property rental platform** that connects guests with premium accommodations. For the MVP, Crown Lusso operates as a single-brand inventory: all properties are managed by Crown Lusso staff. There are no third-party agents or landlords in scope.

### 2.2 MVP User Types

- **Guest** — Primary touchpoint: mobile app (Expo). Browses properties, books stays, manages wishlist, submits reviews and service requests.
- **Admin** — Primary touchpoint: web app (Next.js). Manages properties, bookings, users, service requests, and reviews; views analytics.

There is **no web guest portal** in the MVP (browse/book on web is out of scope). There are **no agents or facility managers** in the MVP.

### 2.3 Core Entities

- **Property** — Listing (title, description, type, bedrooms, bathrooms, address, pricing, amenities, house rules, availability). Relations:
  - has many images
  - has many bookings
  - has many reviews
  - has many wishlist entries
- **User / Profile** — Identity and profile data (name, email, phone, avatar, onboarding status, role). Relations: has many bookings, reviews, wishlist entries, service requests.
- **Booking** — Stay (property, guest, check-in/out dates, guest count, status, pricing). Relations:
  - belongs to property and user
  - can have one review
  - drives availability
- **Wishlist** — Saved property per user. Relations: user + property.
- **Review** — Rating and comment per booking (moderation status). Relations: belongs to booking, property, user.
- **Service request** — Cleaning, maintenance, etc. (property, type, date, description, status, admin response). Relations: belongs to user; linked to property/booking as applicable.

### 2.4 Data Approach & Integrations

- **Properties:** Added and edited **manually** by admins via the web dashboard. No bulk import from external datasets for MVP.
- **Users:** Created via sign-up (guests) or seed/manual creation (admin). Profile data stored in `profiles` and extended as needed.
- **Payments:** **Placeholder only** for MVP (e.g. “Payment successful” without real charge). Paystack integration is post-MVP.
- **Integrations (MVP):** None. Payment is placeholder only. Post-MVP: Paystack for real payments.

---

## 3. Tech Stack & Architecture

- **Mobile:** Expo (React Native), shared Supabase client, NativeWind, Zustand, React Query.
- **Web:** Next.js 15, Refine (admin), Mantine, Supabase (SSR (server-side rendering) + browser client).
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions).
- **Shared:** Monorepo package `shared` for Supabase service functions, React Query hooks, and generated database types.

Architecture, data model, RLS (Row Level Security), and implementation roadmap are in the project’s system design document (e.g. `docs/crown_lusso_system_design.md` or `.cursor/plans/` in the Crown Lusso repo).

---

## 4. Mobile App (Guest) — MVP Features

All features below are **in scope** for the MVP. Each is required unless marked optional.

### 4.1 Authentication & Onboarding

- **Email/password:** Sign up, sign in, forgot password, email verification where configured.
- **Social login:** Google and Apple (native flows; web OAuth for web admin).
- **Onboarding:** Post-sign-up flow to collect essential profile data (e.g. full name, phone, date of birth) and set `onboarding_completed`.
- **Session:** Persistent session (e.g. AsyncStorage), auto-refresh token, and clear sign-out.
- **Route protection:** Unauthenticated users can browse properties; booking, wishlist, profile, bookings history, reviews, and service requests require sign-in (redirect or modal to auth).

**Acceptance:** Guest can register with email or Google/Apple, complete onboarding once, stay signed in across app restarts, and sign out. Protected screens are inaccessible without auth.

### 4.2 Home Screen & Property Browsing

- **Sections:** e.g. Featured, “For you”, or similar curated sections backed by real data from Supabase.
- **Property cards:** Show key info (image, title, price, bedrooms/bathrooms, location) from `properties` (active only).
- **Navigation:** From home to list view, search, and property detail.
- **Data source:** Replace mock listing data with shared property services/hooks (e.g. `getProperties`, `getFeaturedProperties`).

**Acceptance:** Home loads real properties from Supabase; tapping a card opens the correct property detail.

### 4.3 Search & Filter

- **Search:** By location, building name, or text relevant to property (e.g. title/address).
- **Filters:** Listing type (rent/buy if in schema), property type, bedrooms, bathrooms, price range, amenities as defined in schema.
- **Results:** Paginated list of matching properties; sort options (e.g. price, relevance) if specified in design.
- **State:** Filters and search query drive `searchProperties` (or equivalent); state can be reflected in URL/query for list view where applicable.

**Acceptance:** User can search and apply filters; results update from Supabase and match selected criteria.

### 4.4 Property Detail Page

- **Content:** Full property details: gallery, description, specs (bedrooms, bathrooms, etc.), amenities, house rules, location (address + map when implemented).
- **Reviews:** Display approved reviews (rating, title, comment, photos if present) with pagination or limit.
- **Actions:** “Book” (start booking flow), “Save to wishlist” / “Remove from wishlist” (heart toggle).
- **Map:** Optional for MVP: show property location; “Get directions” opens device maps app with property coordinates.

**Acceptance:** Detail loads for a given property ID from Supabase; reviews and wishlist state are correct; Book and wishlist actions work for signed-in users.

### 4.5 Booking Flow

- **Date selection:** Check-in and check-out; availability from `is_property_available` (or equivalent) so unavailable dates are disabled or clearly indicated.
- **Guest count:** Number of guests (and any limits per property if in schema).
- **Pricing:** Display nightly rate, number of nights, cleaning/service fees if applicable, and total.
- **Auth:** If not signed in, prompt to sign in before confirming.
- **Confirmation:** User reviews details and confirms; create booking via atomic booking function (e.g. `create_booking_atomic`) to prevent double booking.
- **Payment:** **Placeholder:** show “Payment” step that simulates success (e.g. “Payment successful”) without processing real payment.
- **Success:** Confirmation screen with booking reference and next steps (e.g. view in Bookings tab).

**Acceptance:** Guest can select available dates, see correct pricing, confirm booking, and see a success state. No double booking for same property/dates. No real payment.

### 4.6 Wishlist

- **View:** Dedicated wishlist tab/screen showing saved properties (from `wishlist` + property details).
- **Add/remove:** From property detail or property cards; one toggle per property (add to / remove from wishlist).
- **Persistence:** Wishlist stored in Supabase; list and toggle state reflect server state (with optimistic updates if implemented).

**Acceptance:** Signed-in user can add/remove properties from wishlist and see consistent list across app.

### 4.7 Booking History

- **View:** List of current and past bookings for the signed-in user (from `bookings` filtered by `user_id`).
- **Per booking:** Property name, image, dates, status (e.g. pending, confirmed, cancelled, completed), total.
- **Detail:** Tap to see full booking details (property, dates, guests, pricing, status).

**Acceptance:** Guest sees only their bookings; status and details match database.

### 4.8 Reviews

- **Submit:** After stay, user can submit a review for a booking (rating 1–5, title optional, comment, optional photos). One review per booking; `moderation_status` starts as `pending`.
- **Display:** On property detail, only reviews with `moderation_status = 'approved'` are shown.
- **History:** User can see their own reviews (e.g. in profile or booking detail) and moderation status.

**Acceptance:** Guest can submit a review per completed booking; only approved reviews appear on property detail.

### 4.9 Service Requests (Cleaning, Maintenance)

- **Types:** At least cleaning and maintenance (and any other types in schema, e.g. laundry, supplies).
- **Form:** User selects property (e.g. current or past booking), service type, requested date, optional time, description.
- **List:** User can see their requests and status (e.g. pending, acknowledged, in progress, completed, cancelled).
- **Admin response:** When admin responds, user can see response and updated status in app (real-time optional; at least on refresh/navigation).

**Acceptance:** Guest can create a service request and see list and status; admin response visible after admin action.

### 4.10 Profile Management

- **View/edit profile:** Display and edit profile fields (e.g. full name, phone, date of birth, avatar).
- **Avatar:** Optional upload to Supabase Storage and store URL in `profiles`.
- **Settings:** Sign out; optionally app preferences (e.g. notifications) if implemented.

**Acceptance:** User can view and update profile and sign out.

### 4.11 Maps & Directions

- **Property location:** Show property on a map on property detail (optional but in scope if time permits).
- **Directions:** “Get directions” or equivalent opens the device’s maps app with property coordinates so the guest can navigate to the property.

**Acceptance:** Directions open device maps with correct coordinates; in-app map optional.

---

## 5. Web App (Admin Dashboard) — MVP Features

All features below are **in scope** for the MVP. Access restricted to users with admin role (e.g. `user_metadata.role === 'admin'`).

### 5.1 Admin Authentication & Access Control

- **Login:** Email/password and/or OAuth (e.g. Google) as configured for web.
- **Role check:** Only users with admin role can access dashboard routes; others are redirected or shown forbidden.
- **Session:** Secure session handling (e.g. Supabase SSR (server-side rendering) + middleware); logout clears session.

**Acceptance:** Only admins can reach dashboard; non-admins cannot access admin pages.

### 5.2 Property Management (CRUD — Create, Read, Update, Delete)

- **List:** Paginated list of all properties (including inactive); filters/search if needed.
- **Create:** Form for all required property fields (title, description, listing type, property type, bedrooms, bathrooms, address, location, pricing, amenities, house rules, etc.); save to `properties`.
- **Edit:** Same fields; update existing property.
- **Delete:** Soft delete (e.g. set `is_active = false`) so property no longer appears in guest app.
- **Validation:** Required fields and basic validation (e.g. price ≥ 0, dates valid).

**Acceptance:** Admin can create, edit, and soft-delete properties; guest app only shows active properties.

### 5.3 Property Image Upload & Management

- **Upload:** Per property, upload images to Supabase Storage (e.g. `property-images` bucket); support multiple images (e.g. 10–15 per property); enforce size/type limits (e.g. 10MB, jpeg/png/webp).
- **Ordering:** Ability to set or reorder primary image and order of gallery images (if supported by schema).
- **Display:** Show thumbnails in admin property list/detail and ensure guest app uses same URLs.
- **RLS (Row Level Security):** Only admins can upload/update/delete; guests have read-only access to public URLs.

**Acceptance:** Admin can add, replace, and reorder property images; images appear correctly in mobile app.

### 5.4 Bookings Management

- **List:** View all bookings (all users); filters by status, date range, property if needed.
- **Detail:** View full booking details (guest, property, dates, guests, pricing, status).
- **Status:** Update booking status (e.g. confirm, cancel); optional notes.
- **Payment status:** Display payment status; update if schema supports admin override for MVP (otherwise read-only).

**Acceptance:** Admin sees all bookings and can confirm or cancel them; guest booking list reflects status.

### 5.5 User Management

- **List:** View users (e.g. from `profiles` or auth); basic info (email, name, role, created date).
- **Detail:** View user profile and linked data (bookings, reviews, service requests) as needed.
- **Role:** Assign or change admin role (e.g. via `user_metadata.role`) so new admins can access dashboard.

**Acceptance:** Admin can list users and promote/demote admin access.

### 5.6 Service Request Management

- **List:** All service requests (all users); filter by status, type, property.
- **Detail:** View request details (user, property, booking, type, date, description, status).
- **Respond:** Admin can add response text and set status (e.g. acknowledged, in progress, completed, cancelled); store `admin_response`, `responded_by`, `responded_at`.
- **Real-time (optional):** New requests appear via Supabase Realtime for faster response.

**Acceptance:** Admin can see all requests and respond; guest sees response and status in app.

### 5.7 Review Moderation

- **List:** All reviews with moderation status (pending, approved, rejected); filter by status, property.
- **Detail:** View review content (rating, title, comment, photos) and context (user, property, booking).
- **Actions:** Approve or reject; set `moderation_status`, `moderated_by`, `moderated_at`. Approved reviews appear on property detail in mobile app.

**Acceptance:** Admin can approve/reject reviews; only approved reviews show on property pages.

### 5.8 Analytics Dashboard

- **Metrics:** At least high-level metrics such as: total properties (active), total bookings (e.g. by status), recent bookings, revenue placeholder (if desired), and optionally counts of service requests and reviews.
- **Visualization:** Simple charts or tables (e.g. bookings over time, top properties).
- **Data source:** Supabase queries (and RPC if needed); no external analytics required for MVP.

**Acceptance:** Admin sees meaningful counts and trends; data matches database.

### 5.9 Property Availability Calendar

- **Per property:** View and edit availability (e.g. blocked dates, available dates).
- **Model:** Align with schema (e.g. availability table or fields on `properties`); ensure booking flow and `is_property_available` respect this data.
- **UI (user interface):** Calendar or date-range interface to block/unblock dates.

**Acceptance:** Admin can set availability per property; guest cannot book blocked dates.

---

## 6. Out of Scope for MVP

The following are explicitly **not** in the first release:

- **Payment processing:** No Paystack or other real payment gateway; placeholder only. Paystack integration is post-MVP.
- **Agent/landlord features:** No subscription signup, no agent dashboard, no commission tracking, no third-party listings.
- **Messaging:** No in-app messaging between guests and admins; use notifications and service request responses instead.
- **Web guest portal:** No browse or book on web for guests; web app is admin-only for MVP.
- **Facility management dashboard:** No dedicated facility manager role or dashboard; admin handles service requests.
- **Multi-language:** Single language (e.g. English) for MVP.
- **Advanced recommendations/AI:** No ML-based or complex recommendation engine.
- **Bulk property import:** No script to import the 97 legacy properties; all properties added via admin UI (user interface).
- **Resident-only services:** No separate “resident” product for cleaning/maintenance only; service requests are in context of stays/bookings where applicable.

---

## 7. Non-Functional Requirements (Summary)

- **Scalability:** Support 100–1,000 concurrent users at launch; design for 5k–20k users and hundreds of properties within 1–2 years without architectural change (see system design doc for QPS (queries per second) / data sizing).
- **Availability:** Target 99.5% for launch; 99.9% for production (Supabase/Vercel SLAs).
- **Latency:** Property list &lt; 2s, property detail &lt; 1.5s, search &lt; 1s, booking creation &lt; 3s.
- **Reliability:** No double bookings (atomic booking creation); valid dates and constraints enforced in DB.
- **Security & permissions:** RLS (Row Level Security) on all tables; admin-only write for properties, storage, and moderation; guests can only write their own bookings, reviews, wishlist, service requests, profile. No PII (personally identifiable information) export or third-party sharing in MVP.
- **Offline (mobile):** Optional: cache property list and show cached data when offline; queue mutations and sync when online (detailed in system design doc).

---

## 8. Success Criteria for MVP Launch

- All mobile guest flows (browse, search, detail, book with placeholder payment, wishlist, bookings, reviews, service requests, profile, directions) work against real Supabase data and RLS (Row Level Security).
- All web admin flows (auth, property CRUD (Create, Read, Update, Delete), images, bookings, users, service requests, review moderation, analytics, availability) work and are restricted to admins.
- No double bookings under concurrent use (atomic booking function).
- At least one admin user can log in and manage content; at least one guest can sign up, complete onboarding, and complete a full booking with placeholder payment.
- Types generated from database schema; shared services and hooks used by both apps where applicable.

---

## 9. Document History

- **1.0** (2026-02-10) — Initial MVP PRD (Product Requirements Document) from system design and implementation discussions.

---

## 10. References

- **System design & roadmap:** Project system design doc (implementation phases, schema, RLS (Row Level Security), services, hooks).
- **Full product vision:** Project rules or PRD (Product Requirements Document) for post-MVP (subscription model, agents, facility managers, messaging, etc.).
- **Codebase patterns:** `docs/data-fetching-patterns-guide.md`, `docs/supabase-integration-patterns.md`.
