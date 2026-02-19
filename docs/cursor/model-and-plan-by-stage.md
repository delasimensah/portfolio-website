# Model and plan by project stage (solo developer)

Recommendations for which Cursor model to use at each stage of this repo’s [project build process](../project-build-process.md), and which Cursor plan fits a solo developer. Use these to get the best results without overspending.

---

## Project stages and model choices

**1. Requirements / kickoff** (questionnaire → PRD, scope, estimates)

- **Model: Claude Opus 4.6**
- Goal and scope synthesis, tradeoffs, and turning answers into a clear PRD need strong reasoning. Opus is best for that.
- Optional: **Claude Sonnet 4.6** if you’re only doing light edits to an existing PRD and want to save usage.

**2. System design** (planning checklist: flows, NFRs, entities, API, high-level design, risks)

- **Model: Claude Opus 4.6** (default), or **Gemini 3 Pro** if the design doc plus codebase are very large.
- Architecture, boundaries, and “risks / options / deferred” are multi-step reasoning; Opus excels. Gemini 3 Pro’s 1M context helps when the system design doc and repo together are huge.
- Use **Plan Mode (Shift+Tab)** here so the agent researches the repo and produces a structured plan before writing the design.

**3. Screen flows for design** (flow prompts, screen-by-screen for UX Pilot)

- **Model: Claude Sonnet 4.6**
- Mostly structured, consistent output from the PRD and design. Sonnet is enough and cheaper; use Opus only if flows are highly complex or ambiguous.

**4. Build** (implementation against PRD, system design, and screens)

- **Default: Claude Sonnet 4.6** for most edits (new screens, CRUD, wiring, tests).
- **Use Claude Opus 4.6** for: cross-app boundaries, shared vs app decisions, refactors that touch many files, or when the agent keeps misreading the design.
- **Use Composer 1.5** when you want speed and the task is straightforward (e.g. “add this component and hook it up per the guide”).
- Optional: **Gemini 3 Pro** for build only when a single task needs a huge slice of the repo in context (e.g. “refactor all auth usage”).

---

## Summary by stage

- **Requirements / PRD:** Opus (or Sonnet for light PRD work).
- **System design:** Opus + Plan Mode; Gemini 3 Pro if context is huge.
- **Screen flows:** Sonnet.
- **Build:** Sonnet day-to-day; Opus for architecture and hard refactors; Composer when speed is the priority.

---

## Which Cursor plan to pick (solo developer)

- **Pro ($20/month)** — Best default for a solo developer. Use Opus for requirements and system design, Sonnet (or Composer) for screen flows and most of build. Included usage (~$20 at API rates) is usually enough for that mix (e.g. hundreds of Sonnet requests, fewer Opus). Start here.

- **Pro+ ($60/month)** — Same as Pro with about 3× usage on frontier models. Move to Pro+ if you use Opus heavily at every stage (including build) and regularly hit Pro limits.

- **Ultra ($200/month)** — About 20× usage. Only worth it if you run very high volume (e.g. many projects in parallel or heavy Opus use all day).

- **Teams ($40/user/month)** — For shared rules, billing, SSO, and org features. Not needed for “better planning” as a solo dev.

**Recommendation for solo:** Start with **Pro**. Use **Opus for requirements + system design (with Plan Mode)** and **Sonnet for screen flows and most of build**. If you run out of usage before the month ends, switch to **Pro+**.

---

## See also

- [Models](./models.md) — Model list, pricing, Auto, context, Max Mode
- [Agent modes](./agent-modes.md) — Plan vs Agent vs Ask vs Debug
- [Project build process](../project-build-process.md) — Order of steps (requirements → PRD → system design → screen flows → build)
- [Planning checklist](../system-design/planning-checklist.md) — What to cover in system design
