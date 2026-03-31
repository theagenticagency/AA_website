# Devmeta → SAFe Terminology Mapping

## Critical Framing: The Timescale Shift

SAFe coordinates **humans across teams** using **ceremonies** as synchronization points (PI Planning, Sprint Review, I&A). Coordination cost is high, so cadences are long: 8-12 week PIs, 2-week Sprints.

Devmeta coordinates **agents across sessions** using **artifacts** as synchronization points (tick structures, implementation notes, lessons-learned). Coordination cost is near-zero, so cadences compress 100-1000x: Epochs in hours, Iterations in minutes-to-hours.

This is not just "faster SAFe." The coordination mechanism is fundamentally different: ceremonies (synchronous, human-facilitated) are replaced by persistent artifacts (asynchronous, machine-readable). Every naming recommendation below must account for this shift.

---

## Mapping Table

### Epoch

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | Interactive scope definition between one human and one orchestrating agent (`start-epoch-spec.md`). Produces a frozen `_overview.md` with: on-screen deliverables, under-the-hood work, explicit deferral table, iteration map (2-5 iterations), and testable exit criteria. Scope is immutable once execution starts. Duration: 30min–15hr. |
| **Nearest SAFe analog** | **Program Increment (PI)** — a time-boxed planning and execution cycle containing multiple Sprints |
| **Why the mapping breaks** | PI implies Big Room Planning: 50-125 people, 2 days, quarterly cadence. An Epoch is a structured dialogue between one human and one agent, lasting minutes, triggered on-demand (not on cadence). PIs are time-boxed (8-12 weeks); Epochs are scope-boxed (done when exit criteria pass). PIs coordinate multiple Agile Teams; an Epoch coordinates one agent swarm through one orchestrator. |
| **Original suggestion** | "Increment" |
| **Revised suggestion** | **Increment** still works, but explicitly framed as a "Capability Increment" — NOT a Program Increment. The key distinction: scope-driven (not time-boxed), single-owner (not multi-team), and on-demand (not cadenced). Alternative: **Release Cycle** — enterprise audiences understand this as "a coherent set of capabilities shipped together" without the PI ceremony baggage. |

---

### Iteration

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | A coherent execution chunk producing a merged PR (`go.md`). Contains 2-4 Epics. Follows a strict Execute → Reflect rhythm where every execution iteration is structurally paired with a reflection iteration. Planning (`plan-iteration.md`) involves graph partitioning of deliverables into file-independent Epics, computing parallel waves. Duration: 30min–4hr. |
| **Nearest SAFe analog** | **Sprint / Iteration** — a time-boxed execution period producing a potentially shippable increment |
| **Why the mapping holds (mostly)** | The name is already SAFe-native. The behavior matches: plan → execute → review → adapt. Both produce a deliverable increment. Both have defined scope that shouldn't change mid-execution. |
| **Why the mapping breaks** | SAFe Sprints are time-boxed (2 weeks typically). Devmeta Iterations are scope-boxed and complete in minutes-to-hours. SAFe Sprint Planning is a human ceremony; Devmeta iteration planning is an automated graph-partitioning algorithm. The mandatory Execute→Reflect pairing has no SAFe equivalent — SAFe retrospectives are optional in practice. |
| **Original suggestion** | Keep "Iteration" |
| **Revised suggestion** | **Keep "Iteration"** — but in training materials, explicitly note: "An Iteration in the agentic context is scope-boxed, not time-boxed. Where a human Sprint is 2 weeks, an agent Iteration is 30 minutes to a few hours. The planning ceremony is replaced by an automated graph-partitioning algorithm." |

---

### Epic

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | The unit of agent context isolation (`run.md`, `plan-iteration.md`). One subagent gets one Epic, works it on an isolated git branch, completes all tasks sequentially in a single session. The `plan-iteration` command solves a graph-partitioning problem to ensure **zero cross-Epic file overlap** — this is the hard constraint. Epics run in parallel waves. Each targets 60-70% of context window. Contains 3-6 sequential tasks. Always ends with a "Re-ground" task that writes to implementation notes and logs. Duration: 15min–2hr. |
| **Nearest SAFe analog** | **Feature** (Agile Team level) — a service or capability that fulfills a stakeholder need, sized to be delivered within a PI by one team. Or more precisely: **the Team Sprint Backlog** — the bounded set of work one team commits to in one Sprint. |
| **Why the mapping breaks catastrophically** | In SAFe, an **Epic** is the LARGEST decomposition unit — portfolio-level, requiring a Lean Business Case, spanning multiple ARTs and PIs. The Devmeta "Epic" is the SMALLEST container — a worker assignment with isolation guarantees. Using the same word for opposite ends of the hierarchy will actively confuse every enterprise practitioner. Additionally, the graph-partitioning constraint (zero file overlap) has no SAFe equivalent; SAFe teams coordinate through shared backlogs and ceremonies, not through file-system isolation. |
| **Original suggestion** | "Story" |
| **Revised suggestion** | **Feature** is the best fit. Rationale: In SAFe, a Feature is owned by one Agile Team, contains multiple Stories/Tasks, and is deliverable within one PI. A Devmeta "Epic" is owned by one agent, contains multiple Tasks, and is deliverable within one Iteration. The ownership model matches. Alternative: **Work Package** (from PMI/PRINCE2) — enterprise PMOs know this term and it correctly implies "bounded scope assigned to one worker with clear deliverables." I'd avoid "Story" because in SAFe, Stories are too small (one Sprint, one acceptance test) — a Devmeta Epic contains 3-6 tasks with a re-grounding step, which is more substantial. |

---

### Task

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | Atomic work unit with objective, spec reference, file scope, implementation steps, and surgical test commands (`plan-iteration.md`). Sequential within an Epic — later tasks reference earlier tasks' work. Iron rule: cannot close with failing tests. The agent loops (implement → test → fail → debug → fix) until green. Duration: 5-30min. |
| **Nearest SAFe analog** | **Task** — the sub-story work item that team members claim during Sprint execution |
| **Why the mapping holds** | Direct 1:1 mapping. Both are atomic, both are sequential within their parent, both have acceptance criteria. |
| **Why the mapping has a subtle difference** | SAFe Tasks are often informal ("write the API endpoint," no test mandate). Devmeta Tasks have a rigid format and an iron rule about test passage. The Devmeta Task is closer to a **TDD task** with enforced Definition of Done than a typical SAFe Task. |
| **Original suggestion** | Keep "Task" |
| **Revised suggestion** | **Keep "Task"** — universal, no confusion. In training materials, emphasize the enforced test-gate: "Unlike human Tasks which rely on team discipline for DoD compliance, agent Tasks structurally cannot close with failing tests. The test loop is automated, not aspirational." |

---

### Reflection

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | A 12-step operational process (`reflect.md`) that: (1) gathers learnings from all sources, (2) categorizes them by destination document, (3) performs code quality review reading actual code for drift patterns, (4) does outside-in gap verification against scope (trusting code, not tick status), (5) checks for cross-epic pattern problems, (6) audits all living documentation, (7) applies updates to permanent knowledge stores, (8) updates iteration status, (9) tags and prunes ticks, (10) writes narrative diary entry, (11) reassesses remaining iteration plan, (12) produces structured report. Critically: the last task IS real work for the next iteration — it eliminates the stop-and-ask boundary. Duration: 10-30min. |
| **Nearest SAFe analog** | **Inspect & Adapt (I&A)** — the PI-level event combining System Demo + quantitative measurement + problem-solving workshop |
| **Why the mapping breaks** | SAFe I&A is a ceremony: people in a room, facilitated, 3-4 hours, once per PI. Devmeta Reflection is an automated operational process that: reads code, verifies gaps, updates documentation, creates cleanup tasks, prunes tracking artifacts, AND bootstraps the next iteration. It produces permanent artifacts, not action items on a whiteboard. Most critically: SAFe I&A does not include code review, gap verification against actual code, or documentation updates — those happen in separate practices (code review, Sprint Review). Devmeta Reflection collapses all of these into one automated sequence. |
| **Original suggestion** | "Inspect & Adapt" |
| **Revised suggestion** | **Inspect & Adapt Cycle** is still defensible as the umbrella term, but it undersells the operational depth. Consider **Consolidation Cycle** or **Learn & Consolidate** — which better captures that this is not just "what did we learn?" but "verify the work, fix what's wrong, update all knowledge stores, and set up the next iteration." For enterprise audiences: "Think of it as Sprint Review + Retrospective + Code Review + Documentation Update + Sprint Planning — collapsed into a single automated 20-minute agent process." |

---

### Ticks (tk)

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | Git-tracked JSON issue files in `.tick/issues/`. Two types: epic (container) and task (work item). Parent-child hierarchy. Blocking relationships for dependency graphs. Key innovation: `tk next` algorithmically determines what to do next — eliminates all decision points. `tk run` provides worktree isolation for parallel execution. `tk graph` visualizes dependency waves. ~35ms query speed, offline-first. |
| **Nearest SAFe analog** | **Team Backlog + Kanban Board** — the ordered list of work items + visualization of work state |
| **Why the mapping breaks** | SAFe backlogs require human prioritization (Product Owner). `tk next` makes prioritization algorithmic — it reads the dependency graph and returns the next unblocked item. SAFe Kanban boards are visualization tools for humans; Ticks is a command interface for agents. The git-tracking (issues travel with code) has no SAFe equivalent — SAFe backlogs live in tools like Jira, decoupled from the codebase. |
| **Original suggestion** | "Agent Backlog" |
| **Revised suggestion** | **Agent Backlog** still works for the concept. But emphasize `tk next` as **"algorithmic Sprint Planning"** — the decision about what to work on next, which in SAFe requires a ceremony, is here reduced to a 35ms command. The tool name "Ticks" can stay as a brand. |

---

### Waves (parallel execution model)

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | Dependency-ordered groups of Epics that can execute in parallel (`run.md`). The orchestrator computes waves from the blocking graph, spawns one subagent per Epic in a wave (all in a single message), waits for completion, then proceeds to the next wave. Git worktree isolation ensures no merge conflicts. |
| **Nearest SAFe analog** | **ART Sync / Scrum of Scrums** — the cross-team coordination mechanism within an Agile Release Train |
| **Why the mapping breaks** | ART Sync is a human meeting (15-30 min, weekly) where team representatives report status and surface dependencies. Devmeta Waves are computed automatically from the dependency graph and executed without human coordination. The isolation mechanism (worktrees, zero file overlap) eliminates the coordination problem that ART Sync exists to manage. |
| **Revised suggestion** | **Execution Wave** or **Parallel Sprint** — enterprise audiences understand "wave" from rolling deployments and phased rollouts. The term correctly implies ordered groups executing in sequence, with parallelism within each group. |

---

### Implementation Notes

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | Per-epic markdown files that serve as the inter-agent communication channel (`plan-iteration.md`, `run.md`). Since Epic workers run in separate sessions and cannot communicate directly, implementation notes are how Epic B learns what Epic A discovered. Created during planning, written to by each worker, read by subsequent workers. |
| **Nearest SAFe analog** | **Enabler** or **Architectural Runway documentation** — technical knowledge shared across teams to enable future work |
| **Why the mapping breaks** | SAFe Enablers are backlog items (work to be done). Implementation Notes are communication artifacts (knowledge to be shared). The closest human analog is actually a **shared Slack channel** or **war room whiteboard** — a real-time knowledge-sharing surface between parallel workers. But it's asynchronous and persistent. |
| **Revised suggestion** | **Shared Context Log** or **Cross-Team Knowledge Brief** — "Shared Context" captures the purpose (bridge between isolated agents); "Log" captures the append-only, chronological nature. |

---

### The `/devmeta:go` Autonomous Loop

| Dimension | Detail |
|-----------|--------|
| **Actual behavior (from files)** | The single entry point that drives the entire framework (`go.md`). Assesses state via `tk next`, then acts: if a task exists → do it; if an iteration has no children → plan it; if reflection needed → run it; if nothing to do → check epoch completion. Never stops to ask permission. Never presents summaries. The only pause conditions: missing credentials, missing infrastructure, genuinely ambiguous spec. |
| **Nearest SAFe analog** | **No equivalent.** SAFe is fundamentally ceremony-driven with human decision points at every transition (Sprint Planning → Daily Standup → Sprint Review → Retro → PI Planning). The autonomous loop eliminates ALL of these decision points. |
| **Revised suggestion** | **Continuous Delivery Engine** or **Autonomous Flow** — positions it as the agent-native replacement for the SAFe ceremony calendar. In training: "Where SAFe uses 7+ recurring ceremonies to maintain flow, the Continuous Delivery Engine maintains flow algorithmically through the tick structure. The ceremony cost drops to zero." |

---

## Revised Hierarchy Summary

```
SAFe (pre-agentic, human-scale)          Devmeta (agentic, compressed)
─────────────────────────────────         ──────────────────────────────
Program Increment (8-12 weeks)     →      Increment (30min - 15hr)
  Sprint (2 weeks)                 →        Iteration (30min - 4hr)
    Feature (one team, one PI)     →          Feature (one agent, one session)
      Task (hours-days)            →            Task (5-30 min)

  Inspect & Adapt (once/PI)        →        Inspect & Adapt Cycle (every Iteration)

  ART Sync (weekly meeting)        →        Execution Waves (computed, automated)
  Team Backlog (human-prioritized) →        Agent Backlog (algorithmically driven)
  Shared Slack / War Room          →        Shared Context Log (persistent, async)
  7+ recurring ceremonies          →        Continuous Delivery Engine (zero ceremonies)
```

---

## The Fundamental Insight for Course Participants

SAFe exists because **humans are expensive to coordinate**: they forget, they miscommunicate, they need alignment, they need motivation. Ceremonies are the solution — regular synchronization points that keep humans on the same page.

Devmeta exists because **agents are expensive to re-contextualize**: they lose memory between sessions, they can't talk to each other directly, they drift without verification. Persistent artifacts are the solution — structured knowledge stores that keep agents on the same page across context window boundaries.

The framework is not "SAFe but faster." It is the answer to the question: **"What does delivery management look like when the coordination mechanism shifts from synchronous human ceremonies to asynchronous machine-readable artifacts?"**

The timescale compression (100-1000x) is a consequence of this shift, not the cause.

---

## Open Question for the Pioneer

The term **"Epic"** is the most urgent rename. Every other term either maps well or is distinct enough to not cause confusion. But "Epic" actively collides with the SAFe meaning in a way that inverts the hierarchy. Enterprise practitioners who hear "Epic" will think portfolio-level, multi-quarter, requires Lean Business Case — the opposite of what Devmeta means. **Feature** or **Work Package** should replace it before any enterprise-facing materials are produced.
