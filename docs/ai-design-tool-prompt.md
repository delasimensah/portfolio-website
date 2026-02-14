# Crown Lusso — AI Design Tool Prompt

Use this document to brief AI design tools (e.g. v0, Galileo, Figma AI, Uizard) so they generate **on-brand, unique** UI for Crown Lusso. Copy the **Single prompt** for tools that accept one block of text, or the **Detailed brief** for tools that support longer context.

---

## Single prompt (copy-paste)

```
Design a unique, luxury-focused UI for Crown Lusso, a premium property rental platform (mobile app for guests, web dashboard for admins). Do not copy Airbnb; aim for a distinct identity.

Brand: Luxury property rentals in Ghana (Accra: East Legon, Cantonments, Airport). Single-brand inventory, discerning travelers, premium accommodations.

Visual direction:
- Palette: Deep teal primary (#043838), white, black, warm neutrals (light grey #C2C2C2, dark grey #1C1C1C). Optional luxury accents: gold or deep blue for CTAs and highlights. High contrast for readability.
- Typography: Premium, modern sans-serif (e.g. Plus Jakarta Sans or Satoshi): clear hierarchy with light, regular, medium, bold weights.
- Layout: Generous spacing, rounded corners (e.g. 12–16px), subtle shadows. Large hero and property images; cards with image-first layout. Clean, uncluttered.
- Feel: Refined, trustworthy, calm—not playful or generic. Review scores and trust signals visible; booking flow clear and minimal-friction.

Screens to design:
- Mobile: Home (featured + property cards), property detail (gallery, specs, reviews, book CTA), search/filter, booking flow (dates → summary → placeholder payment → confirmation), wishlist, profile.
- Web admin: Dashboard (metrics, recent bookings), property list + create/edit form, image upload, bookings table, simple analytics.

Avoid: Cramped layouts, tiny images, harsh colors, direct Airbnb clone. Ensure accessibility (contrast, touch targets, clear labels).
```

---

## Detailed brief (for tools that accept long context)

### 1. Product context

- **Name:** Crown Lusso  
- **What it is:** Luxury property rental platform. Guests discover and book premium accommodations; admins manage properties, bookings, users, and service requests.  
- **Geography:** Ghana (Accra—East Legon, Cantonments, Airport, Embassy Gardens, Signature, Villagio).  
- **MVP scope:** Mobile app for guests only; web app for admin dashboard only. No web guest portal, no agents, no real payment in MVP.  
- **Reference:** [MVP PRD](./product-requirements-mvp.md) (in same repo); system design doc for implementation details.

### 2. User types and touchpoints

| User   | Touchpoint   | Purpose |
|--------|--------------|---------|
| Guest  | Mobile (iOS/Android) | Browse properties, search/filter, view details, book (placeholder payment), wishlist, booking history, reviews, service requests, profile, maps/directions |
| Admin  | Web (desktop) | Auth, property CRUD, image upload, bookings management, user management, service requests, review moderation, analytics, availability calendar |

Design two coherent systems: **guest mobile** (warm, discovery-oriented, booking-focused) and **admin web** (efficient, data-dense but clear, dark or light by choice).

### 3. Design direction and inspiration

- **Primary inspiration:** TripAdvisor-style discovery and trust (reviews, ratings, traveler photos, clear rankings).  
- **Secondary inspiration:** Airbnb-style booking flow and cards (clear CTAs, date selection, pricing summary)—but **avoid a direct clone**; Crown Lusso should feel like its own brand.  
- **Goal:** Unique, luxury-focused identity: refined, trustworthy, calm. Premium feel without being cold or corporate.

### 4. Design system requirements

**Colors (implemented in code):**

- Primary: `#043838` (deep teal—use for main CTAs, key accents, nav active states).  
- Neutrals: White `#FFFFFF`, Black `#000000`, Grey `#808080`, Light grey `#C2C2C2`, Dark grey `#1C1C1C`, Border `#262626`.  
- Optional for luxury accent: gold or deep blue for secondary CTAs, badges, or highlights (ensure contrast).

**Typography:**

- **Mobile:** Plus Jakarta Sans (Light, Regular, Medium, SemiBold, Bold). Use for headings, body, captions with clear size/weight hierarchy.  
- **Web:** Satoshi or similar modern geometric sans. Same hierarchy principle.  
- Principles: Readable body (e.g. 16px base), clear headings (e.g. 20–28px), captions/labels smaller but legible.

**Layout and components:**

- **Spacing:** Generous padding and margins (e.g. 16–24px); avoid cramped blocks.  
- **Corners:** Rounded (e.g. 12–16px for cards, 8–12px for buttons/chips).  
- **Shadows:** Subtle (e.g. soft elevation for cards and modals).  
- **Imagery:** Large, high-quality property photos; image-first cards; gallery/lightbox feel on detail.  
- **Motion:** Smooth, subtle (e.g. modals, tab switches, image transitions)—no distracting animation.

**Accessibility:**

- Contrast: Text and interactive elements meet WCAG AA where possible.  
- Touch targets: Minimum ~44px for primary actions on mobile.  
- Labels: Buttons and inputs have clear, visible labels.

**Responsiveness:**

- Mobile: 320px–428px width; support large phones and small tablets.  
- Web admin: 1280px+ preferred; layout remains usable at 1024px.

### 5. Key screens to generate

**Mobile (guest):**

1. **Home:** Header, search bar or search entry, 1–2 curated sections (e.g. “Featured”, “For you”), horizontal or grid property cards (image, title, price, beds/baths, location).  
2. **Property card (component):** Image, title, price (e.g. “From GHS X/night”), bedrooms/bathrooms, location, optional rating; heart icon for wishlist.  
3. **Property detail:** Full-width gallery (swipeable), title, price, specs (beds, baths, type), description, amenities, house rules, map pin, reviews list (rating, title, comment, photos), sticky “Book” CTA.  
4. **Search / filter:** Search input, filters (e.g. type, bedrooms, price range, amenities), result count, list of results (same card style as home).  
5. **Booking flow:** Step 1 dates (calendar), step 2 guests, step 3 summary (nights, price breakdown), step 4 placeholder payment (card form or “Pay” button), step 5 confirmation (success message, booking ref).  
6. **Wishlist:** Grid/list of saved properties (same card style).  
7. **Profile:** Avatar, name, edit profile, booking history entry, wishlist entry, service requests, sign out.

**Web (admin):**

1. **Dashboard:** Welcome/metrics (e.g. total properties, bookings, revenue placeholder), recent bookings table, quick links (properties, bookings).  
2. **Properties list:** Table or card list with image, title, status, actions (edit, deactivate). “Add property” button.  
3. **Property form (create/edit):** Title, description, type, bedrooms, bathrooms, address, location, pricing, amenities, house rules, image upload (multi, reorder).  
4. **Bookings:** Table with guest, property, dates, status, actions (view, confirm, cancel).  
5. **Analytics (simple):** Counts and simple charts (e.g. bookings over time, top properties).

### 6. Content and copy hints

- **Property types:** Apartment, townhouse, studio, luxury estate.  
- **Locations:** East Legon, Cantonments, Airport, Embassy Gardens, Signature, Villagio (Accra, Ghana).  
- **Currency:** GHS (Ghana Cedi); show “GHS” with amounts.  
- **Labels:** “Book”, “Save”, “Wishlist”, “Reviews”, “Check in / Check out”, “Guests”, “Amenities”, “House rules”, “Get directions”.

### 7. What to avoid

- Do not produce a direct Airbnb or TripAdvisor clone; layouts and components should feel distinct.  
- Avoid cramped layouts, very small images, or long walls of text.  
- Avoid harsh or neon colors; keep the palette refined.  
- Do not add features out of MVP scope (e.g. messaging, agent dashboard, web guest booking).

### 8. Output format (if the tool allows)

- Prefer: High-fidelity UI (components, spacing, typography, colors as above).  
- Include: Mobile and web variants where relevant.  
- Optional: Light and dark variants for admin dashboard; ensure primary teal and neutrals work in both.

---

## Changelog

| Date       | Change |
|------------|--------|
| 2026-02-10 | Initial prompt and detailed brief. |
