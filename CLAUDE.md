# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Alongside the documentation scaffolding, this repository has early application code — no root package manifest, build system, or test suite yet. The `docs/` directory is an Obsidian-style knowledge base (files link to each other with `[[wikilink]]` syntax) that defines the intended workflow for this project, written in Thai.

- `scripts/` — one-off Node.js scripts (e.g. `seed_meallogs.js`, a Firebase Admin SDK seeding script; has its own `package.json` with a `firebase-admin` dependency)
- `app/` — working frontend pages that talk to the real Firestore backend (e.g. `meallogs.html`), as opposed to the static design mockups under `docs/02-design/01-prototypes/`

When more source code is added, update this file with real build/lint/test commands and architecture notes — don't invent them ahead of time.

### Running the seed script

```
cd scripts
npm install
node seed_meallogs.js
```

Requires a Firebase service account JSON (e.g. `jaifit-ai-coach-firebase-adminsdk-*.json`) placed alongside `seed_meallogs.js` — it is gitignored and must never be committed. Ask the user for it; don't invent or fetch one.

### Two coexisting architectures — do not conflate them

This repo currently holds two different, unreconciled pictures of the data model:

1. **The actual running prototype** (`app/meallogs.html`, `scripts/seed_meallogs.js`, and [[docs/01-requirements/01-spec/20260831-01-scope.md]]) talks directly to **Firestore** from the browser with a hardcoded client config, gated behind **Firebase Auth (email/password)** sign-in. Collections: `users` (document id = uid, includes a `role` field), `foodCategories`, `mealLogs` (with a `nudges` subcollection per meal log). Names are denormalized onto `mealLogs` (`userName`, `foodCategoryName`) to avoid joins when rendering the list. A `mealLogs.status` field holds one of exactly three values — `safe`, `risky`, `exceeded` — as defined in `20260831-01-scope.md`.
2. **The target/planned architecture** described in `docs/02-design/02-technical/` (see `20260827-02-database-schema.md`) is a much larger, separately-scoped system: Node.js + Express + React + **PostgreSQL**, with ~15 relational entities (users, consent records, push subscriptions, nudge logs, streaks, motivation profiles, etc.) covering the full JaiFit product spec.

These are not the same system at two points in time being incrementally merged — the design docs are conceptual/aspirational and the app code is a minimal Firestore-backed teaching exercise (ADT-RAISE course module). Don't assume fields or collections from one apply to the other, and don't "fix" the app code to match the PostgreSQL schema unless the user asks for that migration explicitly.

### Security rules are enforced — Firestore requires sign-in

The `jaifit-ai-coach` Firestore project is **no longer in test mode**. `firestore.rules` (repo root) requires `request.auth != null` for every read and write, across all collections. This was confirmed empirically: an unauthenticated request to the Firestore REST API for `mealLogs` returns `403 PERMISSION_DENIED`.

`app/meallogs.html` already has the matching Firebase Auth flow built in — a single-page login/signup toggle gates the whole app behind `onAuthStateChanged`; logged-out visitors only see the login form and no Firestore reads happen until a user signs in. So the app and the rules are in sync: don't treat "empty" data as a rules/query bug without first checking whether the browser session is actually signed in.

There is currently **no per-owner (ownership) restriction** in either the rules or the UI: any signed-in user can view, change the status of, and delete every other user's `mealLogs`, not just their own. `ACL.md` (repo root) documents this access-control intent/gap in detail — check it alongside `firestore.rules` when reasoning about who can read/write what.

Never seed, enter, or suggest entering real personal data (real names, emails, health data, etc.) for any actual person into any collection, regardless of the rules in place. Use fictional/placeholder data only (as `scripts/seed_meallogs.js` already does).

## Documentation structure and workflow

Docs live under `docs/` and are organized as a pipeline, each stage feeding the next. Each folder has an `index.md` explaining its purpose and linking to neighboring stages:

1. **`01-requirements/`** — requirements, source of truth for what to build
   - `01-spec/` — feature requirements, user stories, business rules, scope
   - `02-plan/` — roadmap, phases/milestones, priorities
   - `03-task/` — task breakdown, actionable to-dos with status
2. **`02-design/`** — design derived from requirements
   - `01-prototypes/` — wireframes/mockups, user flow, design system basics
   - `02-technical/` — architecture, database schema, API design, tech stack choices
3. **`03-testing/`** — testing derived from design
   - `01-test-plan/` — test cases/scenarios, test data, in/out of scope
   - `02-test-result/` — pass/fail results, bugs found, fix status
4. **`04-retrospectives/`** — lessons learned per phase/sprint, sourced from test results and the log
5. **`05-log/`** — chronological changelog and decision log
6. **`00-archived/`** — superseded documents; **never delete docs, move them here instead** to preserve decision history

When adding new documentation, place it in the matching stage folder and link back to the requirement/design doc it originates from, following the existing `[[relative/path/index|label]]` link convention.
