# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository currently contains **only documentation scaffolding** — there is no application code, package manifest, build system, or test suite yet. The `docs/` directory is an Obsidian-style knowledge base (files link to each other with `[[wikilink]]` syntax) that defines the intended workflow for this project, written in Thai.

When source code is eventually added, update this file with real build/lint/test commands and architecture notes — don't invent them ahead of time.

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
