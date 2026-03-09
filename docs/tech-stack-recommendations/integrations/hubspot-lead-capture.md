# HubSpot Lead Capture Integration

**Date:** 2026-03-09
**Status:** Recommended
**Use Case:** Waitlist form / lead capture with CRM integration

---

## Summary

Capture leads via custom on-brand forms on agenticagency.dev and send them directly to HubSpot CRM without using HubSpot's embedded forms (which break brand experience).

---

## HubSpot Tier Limits (Current)

| Feature | Free | Starter | Professional | Enterprise |
|---------|------|---------|--------------|------------|
| **API: Requests/10 sec** | 100 | 100 | 190 | 190 |
| **API: Requests/day** | 250,000 | 250,000 | 625,000 | 1,000,000 |
| **Marketing contacts** | 1,000 | 1,000+ | 2,000+ | 10,000+ |
| **Forms API** | ✓ | ✓ | ✓ | ✓ |
| **Contacts API** | ✓ | ✓ | ✓ | ✓ |
| **Custom properties** | ✗ | Limited | ✓ | ✓ |
| **Remove HubSpot branding** | ✗ | ✗ | ✓ | ✓ |

---

## Architecture Options Evaluated

### Option 1: HubSpot Forms API (Recommended)

**How it works:**
```
Custom React form → POST to api.hsforms.com → HubSpot CRM
```

**Endpoint:**
```
https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

**Key facts:**
- **No authentication required** — just portal ID + form GUID
- Works on **Free tier**
- Full styling control (your form, your brand)
- Include `hutk` cookie for visitor tracking
- 250k requests/day is plenty for waitlist use case

**Cons:**
- Must create a "form" object in HubSpot first (takes 2 min)

---

### Option 2: Non-HubSpot Form Auto-Collection

**How it works:**
```
HTML form + HubSpot tracking code → HubSpot auto-captures submissions
```

**Key facts:**
- Works on **all tiers including Free**
- Zero API code needed
- Just add tracking script to site

**Cons:**
- Only captures single-line text fields
- Can be blocked by ad blockers
- Form must be static HTML (not dynamic React)
- Less reliable

**Verdict:** Not recommended for React SPA.

---

### Option 3: Contacts API via Serverless

**How it works:**
```
Custom form → Vercel function → HubSpot Contacts API (authenticated)
```

**Key facts:**
- Requires private app + API key
- More control over contact creation
- Can update existing contacts, add to lists, etc.

**Cons:**
- More complex setup
- API key management required
- Overkill for simple waitlist

**Verdict:** Consider if advanced automation needed later.

---

## Recommendation

**Use Option 1: HubSpot Forms API**

**Why:**
- No auth = simple, secure (no API keys exposed in frontend)
- Free tier works fine (250k/day, 100/10sec)
- Full brand control — custom React form, custom CSS
- CSO gets leads in HubSpot exactly where they want them
- Tracking works if you pass the `hutk` cookie

---

## Implementation Steps

1. **In HubSpot:** Create a form (Marketing → Forms → Create form)
   - Add fields: email, name, company (optional)
   - Note the Form GUID from the URL
   - Note your Portal ID (Settings → Account Management)

2. **In codebase:** Create React form component
   ```jsx
   // POST to this endpoint
   const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

   // Payload structure
   const payload = {
     fields: [
       { name: 'email', value: email },
       { name: 'firstname', value: name }
     ],
     context: {
       hutk: getCookie('hubspotutk'), // HubSpot tracking cookie
       pageUri: window.location.href,
       pageName: document.title
     }
   };
   ```

3. **Optional:** Add HubSpot tracking script to capture `hutk` cookie
   ```html
   <script src="//js.hs-scripts.com/{portalId}.js" async defer></script>
   ```

---

## Upgrade Path

If CSO needs **lists, sequences, automation, or custom properties**:
- **Starter:** $20/mo — basic automation
- **Professional:** $890/mo — full marketing automation

Free tier stores contacts but limits what you can do with them.

---

## Sources

- [HubSpot APIs by Tier](https://developers.hubspot.com/apisbytier)
- [API Usage Guidelines](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines)
- [Forms API Submission Example](https://gist.github.com/robertainslie/b110b8275beee1b27255c4d6e2ba2e8c)
- [Non-HubSpot Forms](https://knowledge.hubspot.com/forms/use-non-hubspot-forms)
- [HubSpot Free Limitations](https://www.engagebay.com/blog/is-hubspot-free/)
