# ADAPT Methodology: Critical Evaluation of Key Claims

## Research conducted March 2026

---

## 1. Claim: 100–1000x Timescale Compression

### What ADAPT asserts
When coordination cost approaches zero (artifacts replace ceremonies), delivery timescales compress by 100–1000x compared to traditional SAFe cadences. An Increment that takes a human team 2–6 weeks completes in 30 minutes to 15 hours.

### What the evidence says

**Supportive signals (narrow scope, controlled tasks):**

- Devin (Cognition Labs) documented **10–20x speed gains** on well-scoped tasks: security vulnerability fixes in 1.5 min vs 30 min human average (20x); Java file migrations in 3–4 hrs vs 30–40 hrs (10–14x). These are the strongest published numbers from production deployments. ([Source](https://cognition.ai/blog/devin-annual-performance-review-2025))
- METR transcript analysis of Claude Code sessions measured time-savings factors of **1.5x–13x**, with one power user achieving ~11.6x through concurrent agent execution. Critically, researchers flag this as a "soft upper bound" — actual gains are likely lower due to task selection bias and task substitution effects. ([Source](https://metr.org/notes/2026-02-17-exploratory-transcript-analysis-for-estimating-time-savings-from-coding-agents/))
- SWE-bench performance has risen from 2% (2024) to 77% (Sonnet 4.5) and 88% (GPT-5 on Aider), showing rapid capability gains on isolated issue resolution.

**Contradictory evidence (broader scope, real-world conditions):**

- The METR randomized controlled trial — the most rigorous study to date — found AI tools made experienced open-source developers **19% slower**, not faster. Developers predicted a 24% speedup and self-reported believing they were 20% faster, yet the measured reality was the opposite. n=16 developers, 246 issues. ([Source](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/))
- Google's internal RCT measured a more modest **21% speedup** on average.
- Industry-wide: despite 85% developer adoption of AI tools, productivity gains plateau at approximately **10%** at the organizational level. Code volume increases, but review bottlenecks and bug rates rise proportionally. ([Source](https://www.faros.ai/blog/ai-software-engineering))
- FeatureBench (complex feature development) shows even frontier models succeed on only **11% of tasks**, down from 74% on simpler SWE-bench issues.

### Assessment

| Multiplier | Evidence level | Conditions |
|-----------|---------------|-----------|
| 1–2x | Strong (RCTs) | General development, experienced developers |
| 5–20x | Moderate (case studies) | Well-scoped, repetitive tasks with clear specs (migrations, security patches, test coverage) |
| 100x+ | Weak (theoretical) | Only plausible if counting parallelization across many concurrent agents AND comparing against ceremony-laden SAFe cadences (which include wait time, not just work time) |
| 1000x | Speculative | No empirical support at any scope |

**The key nuance ADAPT gets right:** The 100–1000x claim is most defensible when framed as *elapsed time compression*, not *effort reduction*. A SAFe PI cycle includes 2 days of planning, 2 weeks of wait states, daily standups, reviews, and retros — most of which is coordination latency, not productive work. If ADAPT eliminates that latency via machine-readable artifacts, the wall-clock compression could be dramatic even if total compute effort is comparable. This framing should be made explicit in the deck.

**Recommendation:** Reframe as "100–1000x wall-clock compression vs ceremony-driven cadences" and distinguish clearly from effort multipliers. Cite Devin's 10–20x on scoped tasks as the empirical anchor, and position the higher multiplier as a *theoretical ceiling* enabled by parallelization + latency elimination.

---

## 2. Claim: Zero Human Involvement in the Build

### What ADAPT asserts
The Delivery Engine (go → plan-iteration → run → reflect) executes autonomously. Human involvement is limited to scope definition (start-epoch-spec) and acceptance. The build itself requires zero ceremonies and zero human coordination.

### What the evidence says

**Supportive signals:**

- Devin's PR merge rate reached **67%** (up from 34%), indicating that a majority of autonomous agent work is production-ready. However, 33% still fails review — a significant residual. ([Source](https://cognition.ai/blog/devin-annual-performance-review-2025))
- Claude Code maintains coherence through **30+ hour** multi-step workflows, demonstrating sustained autonomous execution capability.
- Multi-agent DevOps trials achieved **100% actionable recommendation rate** vs 1.7% for single agents, suggesting orchestrated multi-agent systems dramatically outperform solo agents.

**Contradictory evidence:**

- **85% accuracy per step × 10 steps = 20% end-to-end success.** This compounding failure rate is the fundamental constraint on autonomous multi-step execution. ADAPT's Increment involves dozens of steps (plan → partition → execute N features → reflect × multiple iterations). ([Source](https://galileo.ai/blog/hidden-cost-of-agentic-ai))
- Devin works best on "tasks with clear, upfront requirements and verifiable outcomes that would take a junior engineer 4–8 hrs." It struggles with ambiguous requirements, mid-task changes, and subjective quality judgments.
- Only **8% of companies** have implemented fully autonomous coding pipelines. The remaining 92% require human-in-the-loop at multiple stages.
- **40% of agentic AI projects fail before production** — primarily due to coordination complexity, state management, and error cascading.
- Multi-agent coordination can consume **5–20x more tokens** than simple chains due to loops and retries, creating cost scaling challenges.

### Assessment

ADAPT's architecture actually addresses several of these failure modes intelligently:

- **Graph-partitioned Features with zero file overlap** mitigates the coordination explosion problem — agents work on genuinely independent units.
- **Git worktree isolation** prevents state corruption between parallel agents.
- **7 knowledge stores + I&A cycle** creates structured error recovery that conventional multi-agent systems lack.
- **`tk next` algorithmic planning in 35ms** eliminates the planning latency that plagues human Sprint Planning.

However, "zero human involvement in the build" remains aspirational. The evidence suggests:

1. **Scope definition requires human judgment** — ADAPT acknowledges this (start-epoch-spec is interactive).
2. **Acceptance requires human judgment** — ADAPT acknowledges this too.
3. **The middle (the build itself) will require human intervention** when: requirements are ambiguous, novel architectural decisions arise, cross-system integration fails, or quality judgment is subjective. The I&A cycle catches many issues, but the *fix* for caught issues sometimes requires human insight.

**Recommendation:** Reframe from "zero human involvement" to "zero human *coordination ceremonies*." The distinction matters. ADAPT eliminates standups, planning meetings, retros, and status syncs — the coordination overhead. It does not (and should not claim to) eliminate human judgment at decision points. Position this as "human-on-the-loop" (monitoring + exception handling) rather than "human-out-of-the-loop."

---

## 3. Broader Market Context

### The coordination cost argument is strong

ADAPT's fundamental thesis — that coordination cost, not coding speed, is the primary bottleneck — is well-supported:

- SAFe PI Planning consumes 2 full days every 8–12 weeks for 50–125 people. At $150/hr average loaded cost, that's $120K–$300K per PI cycle in direct meeting cost alone, excluding preparation time.
- Studies show organizations using PI Planning see 30% faster delivery — but this improvement comes from *alignment*, not from faster coding. ADAPT replaces alignment-via-ceremony with alignment-via-artifact, which is a legitimate architectural shift.
- Google research confirms multi-agent systems dramatically outperform when tasks are parallelizable, and degrade on sequential tasks — precisely the insight behind ADAPT's graph-partitioned Feature design.

### The "zero coordination cost" framing is novel but defensible

No other framework in the market explicitly targets coordination cost as the variable to zero out:

- SAFe optimizes coordination through structured ceremonies (reduces chaos, doesn't eliminate overhead).
- Spotify Model reduces coordination through autonomous squads (reduces handoffs, doesn't eliminate sync).
- ADAPT replaces coordination with machine-readable artifacts (structurally different approach).

This positioning is genuinely differentiated. The risk is overpromising on the "zero" — in practice, coordination cost approaches zero asymptotically but never reaches it (agents still read shared artifacts, resolve merge conflicts, and occasionally deadlock).

---

## 4. Summary Verdict

| Claim | Verdict | Suggested reframe |
|-------|---------|------------------|
| 100–1000x timescale compression | **Partially supported.** 10–20x on scoped tasks is proven. 100x+ is plausible for elapsed time (not effort) when comparing against ceremony-laden processes. 1000x has no empirical basis. | "10–20x proven on scoped tasks; 100x+ wall-clock compression when ceremony latency is eliminated" |
| Zero human involvement in build | **Architecturally sound, empirically premature.** ADAPT's design (graph partitioning, worktree isolation, I&A cycle) is state-of-the-art for autonomous execution. But 33% of even Devin's PRs fail review, and compounding error rates remain unsolved at scale. | "Zero coordination ceremonies; human-on-the-loop for exception handling" |
| Coordination cost → zero | **Strongest claim.** Genuinely novel, well-differentiated, and the artifact-over-ceremony architecture is defensible. | Keep as-is, but acknowledge asymptotic approach rather than literal zero |

---

## Sources

- [METR: Impact of Early-2025 AI on Developer Productivity (RCT)](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [METR: Coding Agent Transcript Analysis for Time Savings (Feb 2026)](https://metr.org/notes/2026-02-17-exploratory-transcript-analysis-for-estimating-time-savings-from-coding-agents/)
- [METR: Updated Developer Productivity Experiment Design (Feb 2026)](https://metr.org/blog/2026-02-24-uplift-update/)
- [Cognition: Devin's 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025)
- [Faros AI: The AI Productivity Paradox](https://www.faros.ai/blog/ai-software-engineering)
- [Galileo AI: Hidden Costs of Agentic AI — 40% Project Failure](https://galileo.ai/blog/hidden-cost-of-agentic-ai)
- [Google Research: Scaling Agent Systems — When and Why They Work](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/)
- [FeatureBench: Benchmarking Complex Feature Development](https://arxiv.org/html/2602.10975v1)
- [Anthropic: 2026 Agentic Coding Trends Report](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf)
- [Stack Overflow: 2025 Developer Survey — AI Section](https://survey.stackoverflow.co/2025/ai/)
- [Deloitte: Future of Software Engineering](https://www.deloitte.com/us/en/services/consulting/articles/future-of-software-engineering.html)
