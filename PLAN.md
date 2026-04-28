# Cassa Interior — Build Plan

## Core Rules
- **Rule #1**: Elegance and luxury above all. Every decision must feel expensive.
- **Easing**: Always use `[0.22, 1, 0.36, 1]` (easeOutExpo) for all animations.
- **Parallax**: Use `useScroll` + `useTransform` on every section where it adds depth.
- **Entrance**: Every section fades + slides up via `useInView` with `once: true`.
- **Photos**: Build `<Image>` slots with `fill` + `object-cover` — user will drop files in.
- **"use client"** on any component that uses hooks or motion.

## Color Flow (dark → light alternation)
| Section   | Background        | Text        |
|-----------|-------------------|-------------|
| Hero      | `bg-hero-bg` dark | white       |
| About     | `bg-background`   | foreground  |
| Services  | `bg-hero-bg` dark | white       |
| Portfolio | `bg-background`   | foreground  |
| Warranty  | `bg-hero-bg` dark | white       |
| FAQ       | `bg-accent-light` | foreground  |
| Contact   | `bg-hero-bg` dark | white       |

---

## 1. Navbar — Refine

**File**: `app/components/Navbar.tsx`

### Changes
- **Logo**: Replace bare `CASS` with `Cassa` in `font-display` with a small gold dot separator or tight letter spacing. Keep it refined, not decorative.
- **Active section highlight**: Use `IntersectionObserver` to track which section is in view. The matching nav link gets `text-accent` gold color. Others stay `text-white/70` or `text-foreground/60` depending on scroll state.
- **Mobile menu**: Animate with Framer Motion `AnimatePresence` — slide down from top + fade in. Each link staggers in (`delay: i * 0.05`). Overlay backdrop fades in behind it.
- **Color audit**: 
  - Unscrolled (over dark hero): links `text-white/70`, logo `text-white`.
  - Scrolled (over light sections): `bg-background/95 backdrop-blur-sm`, links `text-foreground/70`, logo `text-foreground`.
  - Active link always `text-accent` regardless of scroll state.

---

## 2. Portfolio — Full Revamp

**File**: `app/components/Portfolio.tsx`

### Layout: Mix — Featured Project (full width) + Horizontal scroll gallery below

### Data structure
```ts
// Featured project (1 item)
const featured = {
  title: "Residential Interior Design",
  tag: "Full Service",
  timeline: "4 weeks",
  description: "Full interior design and execution for residential spaces — from mood board to move-in ready.",
  image: "/images/portfolio/featured.jpg", // slot
}

// Project type cards (3 items — horizontal scroll)
const projects = [
  { id: "01", type: "Residential Interior Design", timeline: "4 weeks", description: "..." },
  { id: "02", type: "Custom Furniture & Built-Ins", timeline: "6 weeks", description: "..." },
  { id: "03", type: "Design & Build", timeline: "4 weeks", description: "..." },
]
```

### Structure
```
Section header (fade up entrance)
  ↳ "Our Work" label + heading + subtext

Featured project (full width, tall — ~500px)
  ↳ <Image fill object-cover> placeholder
  ↳ gradient scrim bottom 40%
  ↳ tag + title + description overlaid bottom-left
  ↳ parallax: image moves slightly slower than scroll

Horizontal scroll gallery (3 project type cards)
  ↳ overflow-x-auto, hidden scrollbar
  ↳ drag to scroll (use mouse events or pointer events)
  ↳ Each card: portrait aspect [3/4], image placeholder, number, type name, timeline badge
  ↳ Card hover: subtle scale(1.02) + shadow lift
  ↳ Cards fade + slide up with stagger on entrance
```

### Animations
- Section header: fade up, `delay: 0`
- Featured image: fade in on enter, parallax offset `y: [30, -30]`
- Featured text: fade up, `delay: 0.1`
- Scroll cards: stagger fade up `delay: i * 0.1`
- Card hover: `whileHover={{ scale: 1.02 }}` with `transition duration: 0.4`

---

## 3. Warranty — Full Revamp

**File**: `app/components/Warranty.tsx`

### Layout: Dramatic dark full-bleed banner

### Structure
```
bg-hero-bg, py-24

Two-column grid (md:grid-cols-2) or centered — TBD on feel:
  Left:
    "Our Promise" label (accent, uppercase, tracking)
    Large heading: "Lifetime Warranty & Aftercare"
    Short paragraph about the promise

  Right (or below on centered):
    3 warranty points, each with:
      - Gold checkmark icon (SVG or unicode ✓)
      - Bold short title (e.g. "Hardware Coverage")
      - One-line description

Warranty points:
  ✓ Lifetime Hardware Coverage
    All hinges, drawer rails, and mechanical hardware are covered for life.
  ✓ Post-Handover Support
    Our team is available after the project is done — no abandoned clients.
  ✓ Jepara Craftsmanship Guarantee
    Every piece of furniture is built by skilled Jepara artisans to last decades.
```

### Animations
- Heading: fade up, `delay: 0`, parallax offset
- Each warranty item: stagger fade up `delay: i * 0.12`
- Gold checkmark: scale from 0 to 1 on enter, `delay: i * 0.12 + 0.1`

---

## 4. FAQ — Revamp

**File**: `app/components/FAQ.tsx`

### Layout: Animated accordion, warm cream background

### Changes from current
- Add Framer Motion `AnimatePresence` + `motion.div` for smooth height expand/collapse
- Use `layout` prop on the container div to animate height
- The `+` icon rotates 45° → becomes `×` when open (via `animate={{ rotate: open ? 45 : 0 }}`)
- Add staggered fade-up entrance for each FAQ row on scroll into view
- Section background: `bg-accent-light` (keep current warm cream)
- Add a subtle left border `border-l-2 border-accent` that appears on the open answer

### Structure
```
Section header (fade up)
  "FAQs" label
  "Common questions." heading

FAQ list (max-w-3xl centered)
  Each item:
    Question row: question text left, rotating +/× icon right
    Answer: AnimatePresence motion.div with overflow-hidden
      - initial: { height: 0, opacity: 0 }
      - animate: { height: "auto", opacity: 1 }
      - exit: { height: 0, opacity: 0 }
      - transition: { duration: 0.5, ease: EASE }
    Thin divider between items
```

---

## 5. Contact + Footer — Full Revamp

**File**: `app/components/Contact.tsx`

### Layout: Dramatic dark closing section, footer integrated

### Structure
```
bg-hero-bg, py-32 (extra tall for drama)

Centered layout, max-w-4xl:

  Top area:
    "Contact" label (accent, uppercase, tracking)
    Large heading (font-display, text-5xl/6xl):
      "Let's build something beautiful together."
    Subtext (white/50):
      "Start with a free consultation. No commitment."
    CTA Button: use existing <Button variant="light"> → "Free Consult Now"
      href: https://wa.me/628121286666

  Divider line (border-white/10, my-16)

  Bottom row (3 contact items, horizontal, centered or space-between):
    Email:
      label: "Email" (accent, tiny, uppercase)
      value: "contact@cassainterior.com"
      href: mailto:...
    
    WhatsApp:
      label: "WhatsApp"
      value: "+62 812-1286-666"  ← confirm number with user
      href: https://wa.me/628121286666
    
    Location:
      label: "Location"
      value: "Gading Serpong, Tangerang"

Footer strip (border-t border-white/10, mt-20, pt-8):
  Left: "Cassa Interior" in font-display
  Right: "© 2025 Cassa Interior. All rights reserved."
```

### Animations
- Heading: large fade up, `delay: 0`, slow duration `1.2s`
- Subtext: fade up, `delay: 0.15`
- CTA button: fade up, `delay: 0.25`
- Divider: width animates from 0 to full, `delay: 0.4`
- Contact items: stagger fade up, `delay: 0.5 + i * 0.1`
- Parallax: heading moves slightly on scroll for depth

---

## Implementation Order

1. `Navbar.tsx` — active states + mobile animation + color fix + logo
2. `Portfolio.tsx` — featured hero + horizontal scroll gallery
3. `Warranty.tsx` — dark banner + 3 warranty points
4. `FAQ.tsx` — animated accordion
5. `Contact.tsx` — dramatic dark closing + footer

---

## Shared Patterns (copy-paste across components)

```ts
const EASE = [0.22, 1, 0.36, 1] as const;

// Standard fade-up entrance
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.0, delay, ease: EASE },
});

// Parallax setup
// const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
// const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
```

## Confirmed Details
- [x] WhatsApp: `+62 812-1286-666` → href `https://wa.me/628121286666` ✓
- [x] Email: `contact@cassa.com` ✓
- [x] Logo: user will provide a real logo file later — use text "Cassa" as placeholder in navbar for now
- [ ] Portfolio featured project: title/description TBD when photos are ready
- [ ] Warranty: points confirmed as hardware + aftercare + craftsmanship
