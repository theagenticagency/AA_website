# The ADAPT Methodology — Hierarchy, Definitions & Course Design

---

## Part 1: The ADAPT Acronym & Story

### What ADAPT Stands For

**A**gentic **D**evelopment with **A**rtifact **P**ersistence & **T**esting

### The Story Behind the Name

The word "adapt" captures the methodology's core principle: continuous adjustment through persistent feedback loops. It positions against the anti-pattern of ad-hoc prompting ("vibe coding") by encoding the structural mechanisms that make agentic delivery reliable.

The acronym encodes the pillars that differentiate structured agentic engineering from casual AI-assisted coding:

**Artifact Persistence** — Seven knowledge stores that make every iteration smarter than the last. Agents lose context between sessions; persistent artifacts solve this. Lessons learned, decision logs, implementation logs, shared context logs, I&A records, and increment overviews form the institutional memory that allows a new agent to pick up work on a project it has never seen before — just by reading the artifacts. This is the coordination mechanism that replaces human ceremonies.

**Testing** — The iron rule. No task closes with failing tests. The agent loops — implement → test → fail → debug → fix → test — until green. This is not aspirational; it is structural. Combined with outside-in gap verification during the I&A Cycle (trust code, not status), it catches drift that traditional status reporting misses.

The Delivery Engine ties it together: the autonomous execution loop (`/adapt:go`) assesses state, acts, reflects, and continues without human decision points. `tk next` returns the next action in 35ms. Where SAFe uses 7+ recurring ceremonies to maintain flow, ADAPT maintains flow algorithmically. The ceremony cost drops to zero.

### Why "ADAPT" Works for Enterprise Audiences

The English meaning reinforces continuous improvement — the methodology that adapts is the methodology that survives. It positions the transformation arc of The Spark: participants enter as *vibe coders* and leave as practitioners who can *adapt* any delivery challenge to agentic execution. "Have you ADAPTed?" becomes both a question about methodology adoption and about organizational readiness.

---

## Part 2: The ADAPT Hierarchy — Recommended Names & Definitions

### The Four Execution Levels

```
Increment         (30min – 15hr)     Strategic scope — what capability gets built
  Iteration       (30min – 4hr)      Mergeable chunk — produces a PR
    Feature       (15min – 2hr)      Unit of agent context — one agent, one session
      Task        (5 – 30min)        Atomic work unit — implementation + tests
```

### The Cross-Cutting Practice

```
Inspect & Adapt Cycle    (10 – 30min after each Iteration)
```

---

### Level 1: Increment

**Definition:** A major capability milestone. After an Increment, the user can do something they couldn't do before.

**Duration:** 30 minutes to 10–15 hours

**Key properties:**
- Scope is frozen once execution starts — the overview doesn't change
- Exit criteria are testable — not "everything works" but "POST /api/batch returns 200"
- Contains 2–6 Iterations with an explicit iteration map
- Includes a deferral table: what does NOT get built, why, and when

**SAFe analog:** Program Increment (PI)
**Critical difference:** PIs are time-boxed (8–12 weeks), cadenced (quarterly), and planned through Big Room Planning (50–125 people, 2 days). An Increment is scope-boxed (done when exit criteria pass), on-demand (triggered when ready), and planned through a structured dialogue between one human and one orchestrating agent lasting minutes.

**Artifact:** `docs/increments/increment-NN/_overview.md`

---

### Level 2: Iteration

**Definition:** A coherent execution chunk that produces reviewed, tested, mergeable code.

**Duration:** 30 minutes to a few hours

**Key properties:**
- Contains 2–4 Features, organized in parallel waves
- Follows a strict Execute → Reflect rhythm (structural, not optional)
- Planning involves graph-partitioning deliverables into file-independent Features
- All tests must pass before an Iteration can close
- All scope items verified against actual code and screen output

**SAFe analog:** Sprint / Iteration
**Critical difference:** SAFe Sprints are time-boxed (2 weeks typically). ADAPT Iterations are scope-boxed and complete in minutes-to-hours. SAFe Sprint Planning is a human ceremony; ADAPT iteration planning is an automated graph-partitioning algorithm that optimizes for maximum parallel independence.

**Artifacts:** Git PR, iteration `status.md`, tick structure

---

### Level 3: Feature

**Definition:** The unit of agent context isolation. One agent gets one Feature, works it on an isolated git branch, completes all tasks sequentially in a single session.

**Duration:** 15 minutes to 2 hours

**Key properties:**
- The hard constraint: no file modified by two independent Features — zero cross-Feature file overlap
- Each targets 60–70% of agent context window — enough room to think
- Contains 3–6 sequential Tasks
- Always ends with a "Re-ground" task (write implementation log, lessons learned)
- Features run in parallel waves; the orchestrator computes waves from the dependency graph

**SAFe analog:** Feature (Agile Team level) — a capability owned by one team, delivered within one PI
**Critical difference:** SAFe Features are coordinated through shared backlogs and ceremonies. ADAPT Features are coordinated through file-system isolation (zero overlap) and git worktree branches. The coordination problem is solved structurally, not through meetings. Previously named "Epic" in the Devmeta framework — renamed because SAFe's "Epic" is portfolio-level, the exact opposite end of the hierarchy.

**Artifacts:** Code changes, tests, Shared Context Log

---

### Level 4: Task

**Definition:** An atomic work unit with clear acceptance criteria, always including a surgical test command.

**Duration:** 5 to 30 minutes

**Key properties:**
- Sequential within a Feature — later Tasks reference earlier Tasks' work
- Standard format: Objective, Spec Reference, Scope (files), Implementation steps, Tests
- Iron rule: a Task cannot close with failing tests
- The agent loops: implement → test → fail → debug → fix → test → until green
- There is no "close with known failures" state

**SAFe analog:** Task
**Critical difference:** SAFe Tasks rely on team discipline for Definition of Done compliance. ADAPT Tasks structurally cannot close with failing tests. The test loop is automated, not aspirational.

**Artifact:** Tick issue (`.tick/issues/<id>.json`)

---

### Cross-Cutting: Inspect & Adapt Cycle

**Definition:** A mandatory 12-step operational process that converts implicit knowledge into permanent records and verifies work against scope.

**Duration:** 10–30 minutes after each Iteration

**The 12 steps:**
1. Gather learnings from all sources
2. Categorize each learning by destination document
3. Code quality review — read actual code, detect drift patterns
4. Outside-in gap verification — trust code, not tick status
5. Check for cross-Feature pattern problems
6. Living documentation audit
7. Apply updates to all permanent knowledge stores
8. Update iteration status
9. Tag and prune completed ticks
10. Write narrative diary entry
11. Reassess remaining iteration plan
12. Produce structured report — last task IS real work for next iteration

**SAFe analog:** Inspect & Adapt (I&A)
**Critical difference:** SAFe I&A is a ceremony (people in a room, facilitated, 3–4 hours, once per PI). ADAPT I&A is an automated operational process that collapses Sprint Review + Retrospective + Code Review + Documentation Update + Sprint Planning into a single 20-minute agent sequence. It runs after *every* Iteration, not once per PI. Most critically: the last task bootstraps the next iteration, eliminating the stop-and-ask boundary.

**Artifact:** `docs/adapt/reflections/iteration-NN.Y.md`

---

### Supporting Infrastructure

| ADAPT Concept | Definition | SAFe Analog | Key Difference |
|---|---|---|---|
| **Agent Backlog** (Ticks) | Git-tracked JSON issue files with dependency graphs. `tk next` returns the next unblocked item in 35ms. | Team Backlog + Kanban Board | Algorithmic prioritization replaces human PO decisions. Issues travel with code. |
| **Execution Waves** | Dependency-ordered groups of Features that run in parallel. Computed from the blocking graph, executed via git worktree isolation. | ART Sync / Scrum of Scrums | Computed automatically, no coordination meeting needed. Worktree isolation prevents merge conflicts. |
| **Shared Context Log** | Per-Feature markdown files for inter-agent communication. Since agents can't talk directly, this is how Feature B learns what Feature A discovered. | Shared Slack / War Room | Asynchronous, persistent, append-only. Survives session boundaries. |
| **Delivery Engine** (`/go`) | The autonomous loop: assess state → act → reflect → next. Never asks permission. Never presents summaries. | No equivalent | SAFe is ceremony-driven with human decision points at every transition. The Delivery Engine eliminates all decision points. |

---

## Part 3: The Spark — 2-Day Course Draft (ADAPT Terminology Applied)

### Course Identity

**Title:** The Spark — From Vibe Coding to Production-Grade Agentic Engineering
**Format:** 2-day intensive workshop (2 × 7 effective hours)
**Class size:** Max 12 (open, up to 3 orgs) / min 3 (closed/on-site)
**Target:** Lead devs, architects, team leads, AI/data engineers
**Promise:** "By the end of this course, you are a hands-on agentic engineering practitioner — a builder with agentic AI."

---

### Day 1 — Orientation & First Contact

**Theme:** From ad-hoc prompting to structured agentic delivery

| Time | Duration | Session | ADAPT Methodology Connection |
|------|----------|---------|------------------------------|
| 09:00 | 20 min | **Opening: What's In It For You** | Frame the gap: vibe coding vs. ADAPT. "The question isn't how to go faster — it's what delivery looks like when coordination cost is zero." |
| 09:20 | 70 min | **The ADAPT Conceptual Framework** | Introduce the full hierarchy: Increment → Iteration → Feature → Task. The three pillars: Execution, Persistence, Testing. Walk through the paradigm shift table (ceremonies vs. artifacts). Show the timescale compression chart. |
| 10:30 | 15 min | *Break* | |
| 10:45 | 30 min | **Tooling Setup** | Pre-configured workstations (Claude Code + Cursor). Boot-and-verify: `tk init`, `tk next`, basic agent commands. Participants see the Agent Backlog in action. |
| 11:15 | 60 min | **The Application: Onboarding & Exploration** | Participants use clarifying agents to interview an unfamiliar codebase (Atomic CRM). This demonstrates the first phase of the ADAPT flow: *Define* — understanding scope before writing code. Participants experience how agents gather and structure context systematically. |
| 12:15 | 30 min | *Lunch* | |
| 12:45 | 90 min | **Challenge Set 1 — Greenfield (Frontend)** | **Chapter: Greenfield.** High scaffolding (templates provided). Core skill: *follow the ADAPT protocol*. Participants write their first Increment overview, decompose into Features with zero file overlap, execute Tasks with enforced test gates. They experience the full Iteration cycle for the first time. |
| 14:15 | 15 min | *Break* | |
| 14:30 | 90 min | **Challenge Set 2 — Legacy Extension (Backend)** | **Chapter: Legacy Extension.** Medium scaffolding (steps only). Core skill: *write your own specs and prompts*. Participants plan an Iteration on existing code, manage the constraint "existing code is law," and experience how the Shared Context Log enables handoff between Features. |
| 16:00 | 30 min | **Day 1 Debrief** | Reflect on what worked and what failed. Introduction to the I&A Cycle concept: "What you just did informally, the methodology does structurally after every single Iteration." Preview Day 2's progression toward autonomy. |

**Day 1 Learning Arc:** Participants go from "I can prompt an AI to write a function" to "I can structure a multi-Feature Iteration with specs, test gates, and knowledge persistence."

---

### Day 2 — Depth & Commitment

**Theme:** From guided execution to autonomous delivery and organizational strategy

| Time | Duration | Session | ADAPT Methodology Connection |
|------|----------|---------|------------------------------|
| 09:00 | 60 min | **Participant Demos & Reflections** | Participants present Day 1 work to the room. This mirrors the I&A Cycle's gap verification step — they check whether what they *think* they built actually matches the spec. First exposure to "trust code, not status." |
| 10:00 | 15 min | *Break* | |
| 10:15 | 90 min | **Challenge Set 3 — Legacy Stewardship (Deeper)** | **Chapter: Legacy Stewardship.** Low scaffolding (protocol only). Core skill: *catch and correct agent errors*. Participants handle refactoring, test coverage recovery, and documentation. They must run the Reflect step themselves: verify gaps against scope, update the Decision Log, prune the Agent Backlog. This is where the 12-step I&A Cycle becomes muscle memory. |
| 11:45 | 15 min | *Break* | |
| 12:00 | 30 min | **Instructor Demo: Why Things Fail** | Live demonstration of the anti-patterns: scope drift without verification, context loss without persistence, test-skipping without the iron rule. Each failure maps to a missing ADAPT pillar (E, P, or T). Makes the case that the methodology isn't ceremony — it's structural necessity. |
| 12:30 | 30 min | *Lunch* | |
| 13:00 | 75 min | **Challenge Set 4 — Participant's Choice** | **All three chapters.** Zero scaffolding. Core skill: *autonomous decision-making*. Participants choose their own challenge, run the full ADAPT cycle unassisted: define scope → plan Iteration → execute Features in parallel → run I&A Cycle → deliver. This is the proof-of-competency moment. |
| 14:15 | 15 min | *Break* | |
| 14:30 | 45 min | **The Org Diagnostic & Personal Commitment** | **Part 1 — The CTO's Chair:** Forced ranking of 3–5 systems where ADAPT would have highest impact. Score by chapter (Greenfield / Legacy Extension / Legacy Stewardship) and by potential impact. **Part 2 — In the Wild Project:** Each participant defines their personal first agentic coding project: problem, chapter, success criteria, demo date. **Part 3 — Commitment:** 30 seconds each — share project with room. Verbal commitment. Opt into Shooting Star community. |
| 15:15 | 20 min | **The Bleeding Edge** | Where agentic engineering is going: multi-agent orchestration, continuous delivery engines, self-healing codebases. Position ADAPT as the foundation — the methodology evolves as the frontier advances. |
| 15:35 | 25 min | **Close: Q&A & The Road Ahead** | Product ladder: The Spark (you are here) → The Catalyst (12-week embedded transformation) → The Scale Engine (org-wide rollout). Post-course: instructor synthesizes Org Diagnostic responses into a one-page "Agentic Opportunity Map" presented to CTO/sponsor within 1 week. |

**Day 2 Learning Arc:** Participants go from "I can follow the ADAPT protocol with guidance" to "I can run the full cycle autonomously and identify where it applies in my organization."

---

### Scaffolding Progression

| Challenge Set | Chapter | Scaffolding | Core Skill | ADAPT Depth |
|---|---|---|---|---|
| Set 1 — Frontend (Day 1) | Greenfield | High (templates) | Follow the protocol | First Iteration cycle |
| Set 2 — Backend (Day 1) | Legacy Extension | Medium (steps only) | Write your own specs | Shared Context Log, Feature isolation |
| Set 3 — Deeper (Day 2) | Legacy Stewardship | Low (protocol only) | Catch and correct errors | Full I&A Cycle, Agent Backlog management |
| Set 4 — Choice (Day 2) | All three | None | Autonomous decision-making | Complete ADAPT cycle unassisted |

The progression mirrors ADAPT's own design philosophy: start with structure (high scaffolding = detailed spec), remove scaffolding as competence accumulates (like how I&A Cycle outputs become the institutional knowledge that enables faster future iterations).

---

### Post-Course Deliverables

1. **Agentic Opportunity Map** — Instructor synthesis of all Org Diagnostic responses, presented to CTO/sponsor within 1 week. Reframes from "should we do more AI?" to "your team already told us where to start."

2. **Personal "In the Wild" Project** — Each participant has a defined project with success criteria and a demo date, creating accountability and immediate application.

3. **Shooting Star Community** — Ongoing peer learning, progress sharing, and a 6-week reunion with demos.

---

### How The Spark Feeds The Catalyst

The Spark creates demand for The Catalyst by demonstrating capability while revealing organizational gaps. Participants leave knowing *how* to do agentic engineering but recognizing they need embedded support to transform their team's workflow. The Org Diagnostic provides the specific entry point: "Here are the 3 systems your team identified. Let's transform one of them over 12 weeks."
