# The Agentic Agency Website

Multi-page website for The Agentic Agency - agentic engineering workshops and transformation programs.

## Live URLs

- **Production:** https://nexus-ai-lake-ten.vercel.app
- **Preview:** https://nexus-d1lyepkux-daniel-holm-kristensens-projects-284786d2.vercel.app

## Tech Stack

- **React 18** with Vite
- **React Router v6** for multi-page routing
- **Tailwind CSS** for styling
- **GSAP** for animations (ScrollTrigger, magnetic effects)
- **react-helmet-async** for per-page SEO
- **Vercel** for deployment

## Project Structure

```
src/
├── main.jsx                    # RouterProvider + HelmetProvider
├── index.css                   # Global styles, animations, noise overlay
│
├── router/
│   └── index.jsx               # Route configuration with lazy loading
│
├── layouts/
│   └── MainLayout.jsx          # Shared nav + footer wrapper
│
├── pages/
│   ├── LandingPage.jsx         # Company intro + product ladder
│   ├── SparkPage.jsx           # 2-day workshop
│   ├── CatalystPage.jsx        # 12-week transformation
│   ├── ScaleEnginePage.jsx     # Advisory retainer
│   └── AboutPage.jsx           # Company + founders
│
├── components/
│   ├── common/
│   │   ├── MagneticButton.jsx  # GSAP magnetic hover effect
│   │   ├── NoiseOverlay.jsx    # Texture overlay
│   │   └── SectionContainer.jsx
│   │
│   ├── navigation/
│   │   ├── FloatingNav.jsx     # Fixed nav with mobile menu
│   │   └── Footer.jsx          # Site footer
│   │
│   ├── sections/
│   │   ├── ProductLadderSection.jsx  # Product progression visual
│   │   ├── TargetAudienceSection.jsx # Who it's for/not for
│   │   └── FAQSection.jsx            # FAQ grid
│   │
│   └── seo/
│       ├── PageMeta.jsx        # Per-page meta tags
│       └── StructuredData.jsx  # JSON-LD schemas
```

## Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Landing Page | Company intro + product ladder overview |
| `/the-spark` | The Spark | 2-day workshop details + pricing |
| `/the-catalyst` | The Catalyst | 12-week transformation program |
| `/the-scale-engine` | The Scale Engine | Advisory retainer |
| `/about` | About | Company mission, founders, philosophy |

## Pricing (The Spark)

| Format | Price | Participants |
|--------|-------|--------------|
| **Open Workshop** | DKK 49,999 | 3 from your org, learn with up to 3 other companies |
| **Closed Workshop** | DKK 199,996 | Exclusive session, up to 12 from your org |

## Design System

### Color Palette
- `--cement: #E6E6E1` (Primary background)
- `--black: #000000` (Primary text, CTAs)

### Typography
- Font: Space Grotesk
- Headlines: `font-black uppercase tracking-tighter`
- Body: `font-medium text-black/70`

### Signature Visual Elements
- Noise overlay with `mix-blend-mode: overlay`
- Magnetic buttons with GSAP hover effects
- Brutalist shadows: `shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]`
- Word-by-word scroll reveals
- Protocol card stacking animations
- Industrial texture backdrops (grayscale, `mix-blend-multiply`)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site auto-deploys to Vercel on push to `main`. Manual deploy:

```bash
npx vercel --prod
```

## SEO

Each page includes:
- Custom meta tags via `PageMeta` component
- Open Graph and Twitter Card meta
- Structured data (JSON-LD) for:
  - Organization schema
  - Course schema (Spark, Catalyst)
  - Service schema (Scale Engine)
  - FAQ schema
  - Person schema (founders)
  - Breadcrumb schema

## Components

### MagneticButton
Supports three modes:
- `to="/path"` - React Router link
- `href="url"` - External link
- `onClick={fn}` - Button

### ProductLadderSection
Two variants:
- `variant="full"` - Full product cards for landing page
- `variant="journey"` - Compact "your journey" indicator for product pages

### TargetAudienceSection
Props: `forItems`, `notForItems`, `requirement`

### FAQSection
Props: `faqs` (array of `{q, a}` objects), `title`
