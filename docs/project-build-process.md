# Project build process

This doc outlines the order of work for building a product in this repo.

## Order of steps

1. **Functional requirements** — Capture what the product must do (goal, users, core flows, entities, out-of-scope). Use the questionnaire and template in `docs/system-design/` if needed.
2. **Product requirements document (PRD)** — Write the PRD from the functional requirements. It defines scope, acceptance criteria, and what is in/out for the release. Example: `docs/product-requirements-mvp.md`.
3. **System design** — Do system design **based on the system design principles** in this repo. Read `docs/system-design/README.md`, `docs/system-design/principles.md`, and work through `docs/system-design/planning-checklist.md`. Produce a system design doc (e.g. architecture, data model, phases). Example: `docs/crown_lusso_system_design.md`.
4. **Screen flows for design** — From the PRD, generate **flows for each screen** so they can be passed to a design tool. Use the template `docs/ux-pilot-flow-prompts-template.md` to create a project-specific flow prompts doc (e.g. `docs/ux-pilot-flow-prompts.md`). Use that doc with UX Pilot (or similar) to generate the screens.
5. **Build** — Implement against the PRD and system design; use the generated screens as the UI reference.

## Key docs

- **Requirements** — `docs/system-design/project-requirements-questionnaire.md`, `docs/system-design/project-requirements-template.md`
- **PRD** — Project-specific, e.g. `docs/product-requirements-mvp.md`
- **System design** — `docs/system-design/README.md`, `docs/system-design/principles.md`, `docs/system-design/planning-checklist.md`; output e.g. `docs/crown_lusso_system_design.md`
- **Screen flows** — `docs/ux-pilot-flow-prompts-template.md` (template); then project-specific e.g. `docs/ux-pilot-flow-prompts.md` (paste prompts into UX Pilot per screen)
- **Implementation** — App docs: `apps/web-app/docs/`, `apps/mobile-app/docs/`, `docs/data-fetching-patterns-guide.md`, `docs/supabase-integration-patterns.md`

## UX Pilot

To generate UI from the screen flows:

1. In UX Pilot, create a flow (e.g. Mobile or Web).
2. Paste the **Shared context** from `docs/ux-pilot-flow-prompts.md` into the flow's context.
3. For each screen in the flow, add a screen and paste the matching prompt from that doc.
4. Generate; then implement in the apps to match the design system (e.g. `packages/shared` constants, app structure).
