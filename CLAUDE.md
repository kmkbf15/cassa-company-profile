# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`, imported with `@import "tailwindcss"` in `globals.css` (no `tailwind.config.ts`)
- **Framer Motion** — used for all animations

## Architecture

Single-page company profile. `app/page.tsx` renders all sections in order: `Navbar → Hero → About → Services → Portfolio → Warranty → FAQ → Contact`. Each section is a self-contained component in `app/components/`.

### Design tokens

Defined as CSS variables in `globals.css` and exposed to Tailwind via `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `background` | `#FAFAF8` | page background |
| `foreground` | `#1C1917` | body text |
| `accent` | `#9B7E5A` | brand gold |
| `accent-light` | `#F5F0E8` | soft accent bg |
| `muted` | `#6B5E52` | secondary text |
| `hero-bg` | `#1E1510` | dark hero section |

Use these as `bg-background`, `text-foreground`, `text-accent`, etc. in Tailwind classes.

### Fonts

Loaded via `next/font/google` in `app/layout.tsx`:
- `--font-display` → Playfair Display (headings)
- `--font-sans` → Inter (body)

Use `font-display` and `font-sans` Tailwind classes.

### Shared UI

`app/components/ui/Button.tsx` — animated `<motion.a>` with an expanding circle hover effect. Accepts `variant="light"` (white border, for dark backgrounds) or `variant="dark"` (foreground border, for light backgrounds). Renders as an anchor; pass `href` directly.
