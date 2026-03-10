# Email Hosting

**Date:** 2026-03-10
**Status:** Recommended
**Decision:** Google Workspace

---

## Requirements

1. **Corporate compatibility** — Clients (CTOs/CEOs at enterprises) expect professional email
2. **Agentic freedom** — API access for autonomous agents, MCP integration with Claude
3. **CRM integration** — HubSpot connectivity
4. **Cost-effective** — Small team (2-3 founders)

---

## Decision: Google Workspace

**Cost:** $6/user/month (Business Starter)

**Why Google Workspace:**

| Need | How Google Workspace Delivers |
|------|------------------------------|
| Corporate credibility | Gmail is universally recognized |
| Agentic workflows | Gmail API is best-in-class |
| Claude integration | MCP tools for Gmail already exist |
| HubSpot | Native integration |
| Calendar/Video | Google Calendar + Meet |

---

## Agentic Capabilities via Gmail API

```
Agents can:
✓ Read incoming emails
✓ Send replies
✓ Search by sender/subject/date
✓ Apply labels for categorization
✓ Create drafts for human review
✓ Track conversation threads
✓ Trigger workflows on new mail
```

---

## Alternatives Considered

| Option | Verdict |
|--------|---------|
| Microsoft 365 | Good API (Graph), but heavier setup, fewer MCP tools |
| Zoho Mail | Budget option, limited API/integrations |
| Fastmail | Great API (JMAP), but less corporate recognition |
| Resend | Transactional only — use alongside Google if needed |

---

## Hybrid Option (If Needed Later)

- **Google Workspace** — Human inbox, client communication
- **Resend** — High-volume automated/agent sends

Keeps agent traffic separate from primary inbox.

---

## DNS Records (Porkbun)

| Type | Host | Value | Priority |
|------|------|-------|----------|
| MX | @ | ASPMX.L.GOOGLE.COM | 1 |
| MX | @ | ALT1.ASPMX.L.GOOGLE.COM | 5 |
| MX | @ | ALT2.ASPMX.L.GOOGLE.COM | 5 |
| TXT | @ | v=spf1 include:_spf.google.com ~all | - |

---

## References

- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [Google Workspace Setup](https://workspace.google.com)
- [Claude Gmail MCP Tools](https://docs.anthropic.com/claude/docs/mcp)
