# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/portfolio site for jerelle.co, a commercial video and photography business. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint validation
```

## Architecture

### Routing
- `/app/page.tsx` → Main marketing site (renders `ClientPage.tsx`)
- `/app/discovery/page.tsx` → Discovery call landing page with separate component set

### Content System
JSON-based content in `/content/` directory, loaded via `lib/content.ts`:
- `services/*.json` - Service offerings (commercial-photography, video-production, etc.)
- `clients/clients.json` - Client logos for social proof
- `process/process.json` - Process timeline steps
- `process-gallery.json` - Gallery images for process section

Content is loaded server-side and passed to client components via props.

### Goal-Based Personalization
`ClientPage.tsx` manages user goal selection which dynamically:
- Reorders page sections (action-first vs trust-first journeys)
- Prioritizes relevant services in the carousel
- Tracks user journey state for analytics

Goal types: `customers` | `brand` | `event` | `content` | `explore`

### Component Organization
- **Section components**: `CinematicHero`, `ServicesReveal`, `ProcessSection`, `AboutCinematic`, `ContactDark`
- **Landing-specific**: Components in `components/landing/` for discovery page
- **Shared**: `CinematicNav`, `FooterMinimal`, `MagneticButton`, `CustomCursor`

### Animation Patterns
Framer Motion is used extensively:
- Scroll-based reveals and parallax effects
- Spring animations for interactive elements
- `AnimatePresence` for enter/exit transitions
- Custom `MagneticButton` component for hover interactions

### Styling
- Tailwind CSS with custom accent color `#12deba`
- Dark theme throughout (black backgrounds, white/gray text)
- Custom fonts: Sofia Pro (primary), OoohBaby (accent)
- CSS variables in `globals.css` for theme colors

### Integrations
- Calendly: Booking integration via `CalendlyButton`, `CalendlyInline`, `CalendlyTracker`
- Meta Pixel: Conversion tracking via `MetaPixel` component
