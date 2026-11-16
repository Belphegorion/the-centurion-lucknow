# The Centurion: Complete Motion & Animation Architecture

This document catalogs every motion effect, component file, easing parameter, and mobile-vs-desktop behavior in accordance with the project's Animation Contract.

---

## 1. Global Animation Tokens (`motion/tokens.ts`)
- **Default Easing**: `[0.22, 1, 0.36, 1]` (Cubic Bezier curve with natural deceleration)
- **Durations**:
  - `micro`: `0.2s` (icon toggles, cross-fades)
  - `base`: `0.45s` (section entries, standard reveals)
  - `slow`: `0.70s` (gold hairline draws, modal expansions)
  - `image`: `0.95s` (architectural arch image clip-path reveals)
- **Spring Physics**: `{ type: "spring", stiffness: 260, damping: 28 }` (Emil Kowalski high-precision spring)
- **Stagger Cadence**: `0.07s`
- **Mobile Tap Feedback**: `whileTap={{ scale: 0.97 }}` (120ms duration)
- **Viewport Trigger Config**: `whileInView` with `viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}`

---

## 2. Low-Power & Reduced-Motion Gating (`usePerformanceTier`)
- **Conditions Triggered**:
  - `hardwareConcurrency <= 4`
  - `deviceMemory <= 4`
  - `connection.saveData === true`
  - `prefers-reduced-motion: reduce`
- **Overrides Applied**:
  - Disables light sweep gradient animations.
  - Pauses 20s Ken Burns slow zooms.
  - Eliminates scroll parallax transforms (`yParallax = 0`).
  - Replaces kinetic reveals with instant 200ms opacity fades.

---

## 3. Section-by-Section Animation Inventory

### L1: The Gate Preloader (`motion/GatePreloader.tsx`)
- **Trigger**: First visit of the browser session (`sessionStorage` check). Max 1.4s total.
- **Door Panels**: Two Obsidian split doors (`x: 0%` to `x: -101%` and `x: 101%`).
- **Seam Draw**: Gold center hairline draws downwards (`scaleY: 0` to `1`, `0.45s`, `ease: [0.22, 1, 0.36, 1]`).
- **Skip Interruption**: Diner can tap anywhere to instantly trigger rapid panel exit (300ms).
- **Mobile vs Desktop**: Unconditional bypass on low tier; identical visual choreography on both viewports.

### L2: Cinematic Hero (`components/sections/Hero.tsx`)
- **Ken Burns Scale**: Subtle scale from `1.0` to `1.06` over 22s alternate loop (`easeInOut`).
- **Scroll Parallax**: Framer Motion `useScroll` + `useTransform`.
  - **Mobile**: Max `8%` translateY offset to preserve performance and prevent layout thrashing.
  - **Desktop**: Max `12%` translateY offset.
- **Masked Headline Unveil**: Cormorant Garamond lines masked in overflow-hidden containers, sliding `y: 100%` to `y: 0%` with a `0.10s` stagger.
- **CSS Light Sweep**: Skewed soft gold gradient bar (`skewX(-20deg)`) executing CSS translateX loop every 14s.
- **Day/Evening Ambient Glow**: Automatic opacity shift based on Asia/Kolkata 5:30 PM threshold (`useDayPhase`).
- **Desktop Cursor Spotlight**: Hardware-gated pointer tracker using `requestAnimationFrame`, active strictly when `(hover: hover) and (pointer: fine)` is true.

### L3: Real-Time Status Pill (`components/ui/StatusPill.tsx`)
- **Indicator**: Continuous CSS ping animation (`animate-ping`) on gold dot when open; static smoke dot when closed.
- **Text Transition**: Framer Motion `AnimatePresence mode="wait"` executing 0.2s cross-fade upon minute-tick updates.

### L4: Architectural Arch Reveal (`motion/ArchReveal.tsx`)
- **Mask Geometry**: `clip-path: inset(12% 0% 0% 0% round 140px 140px 14px 14px)` expanding to `inset(0% 0% 0% 0% round 140px 140px 14px 14px)` with scale relaxing from `1.08` to `1.0`.
- **Duration**: `0.95s` once per element.

### L4: Gold Hairline Draw (`motion/DrawLine.tsx`)
- **Horizontal**: `scaleX: 0` to `1` from left-to-right (`originX: 0`).
- **Duration**: `0.70s`.

### L5: Signature Rail (`components/sections/Signature.tsx`)
- **Choreography**: Pure CSS scroll-snap (`snap-x snap-mandatory`). 78% card width on mobile so next card peeks; 380px on desktop.
- **Card Tap**: Opens `components/ui/Sheet.tsx` with Framer Motion spring physics.

### L6: The Experience Moments (`components/sections/Experience.tsx`)
- **Mobile**: Stacked cards with individual ArchReveals and animated gold numerals (`01`, `02`, `03`).
- **Desktop**: Left column utilizes CSS `position: sticky; top: 8rem;` while right-column moment cards scroll past smoothly without JS scroll-jacking.

### L7: Interactive Menu Filtering (`app/menu/page.tsx`)
- **Category Chips**: Horizontal snap rail with gold underline sliding dynamically between active categories via `layoutId="active-chip-indicator"`.
- **Search Filtering**: Debounced at 150ms with `AnimatePresence mode="popLayout"` for smooth re-ordering.

### L8: Live Counters Marquee (`components/sections/BuffetCounters.tsx`)
- **Ticker Loop**: Infinite linear translateX loop (`x: ["0%", "-50%"]`, 25s duration) with duplicate elements for seamless continuous translation.

### L9: Spaces Segmented Control & Lightbox (`components/sections/Spaces.tsx`)
- **Segmented Control**: Pill indicator slides via `layoutId="active-space-pill"`.
- **Content Cross-Fade**: Direction-aware entry `y: 12` to `0` with `0.35s` duration.
- **Lightbox**: Fullscreen backdrop fade (`opacity: 0` to `1`) and image scale expansion.

### L10: Kids Corner Caretaker Card (`components/sections/KidsCorner.tsx`)
- **Line Art Icon**: Subtle single bounce on reveal: `scale: [0.8, 1.15, 1], y: [10, -4, 0]` (0.6s).

### L11: Find Us Pathline (`components/sections/FindUs.tsx`)
- **Connecting Line**: SVG dashed line animated using `pathLength: 0` to `1` over `0.9s`.

### L12: Review Star Fills (`components/sections/Reviews.tsx`)
- **Star Animation**: 5 gold stars fill sequentially from left-to-right with `0.06s` stagger delay.

### L13: Header & Bottom Bar
- **Header**: Transitions from transparent to solid Obsidian backdrop with gold border when `window.scrollY > 24px`.
- **Mobile Menu**: Fullscreen bottom-up sheet (`y: "100%"` to `0%`, spring physics) locking body scroll.
- **Sticky Bottom Bar**: Slides in (`y: "100%"` to `0%`) after 60% of hero scroll; automatically slides away when input elements receive focus or near the footer.

### L14: Reservation Engine (`app/reserve/page.tsx`)
- **Step Transitions**: Directional slide `x: ±24px`.
- **Success Ring**: SVG circle circumference drawing via `strokeDashoffset` from `283` to `0` over `0.8s`.
- **Haptic Pulse**: Calls `navigator.vibrate(10)` on supported devices.

### L15: Theme Switcher & 404
- **Theme Button**: Sun and Moon swap with `rotate: -90deg` to `0deg` and `scale: 0` to `1` in 0.3s.
- **404 Enclave**: Gold arch outline draws itself and a floating lantern fades in with an amber glow.
