# The Centurion: Restaurant & Rooftop Lounge (Lucknow)

A luxury, mobile-first, animation-rich website for **The Centurion**, located on the 3rd floor (top floor) of Wave Mall, Gomti Nagar, Lucknow. Deployable to Vercel with zero extra infrastructure.

---

## 🏛️ Brand Concept: 'The Gate'

Inspired by Lucknow’s architectural gateways (Rumi Darwaza) and delicate chikankari craft, transposed into an opulent modern dining space:
- **Obsidian Dark Void Canvas** (#0C0A09) with warm **Antique Gold** (#C9A24B) hairlines and **Oxblood** (#5B1A1F) accent surfaces.
- **Ivory Light Theme Toggle** (#F5EFE3) with automated WCAG AA color recalibration.
- **Typographic System**: Display in *Cormorant Garamond 600*, wordmarks and eyebrows in *Cinzel* (0.28em letter-spacing), and body in *Manrope* (tabular numerals).
- **The Gate Preloader**: Twin Obsidian door panels parting down a gold central seam on initial visit.
- **Micro-Interactions**: Emil Kowalski spring physics (`stiffness: 260, damping: 28`), mobile haptic tap feedback, and evening twilight ambient lighting shift (`useDayPhase`).

---

## 🚀 Key Features

1. **Zero-Database Reservation Engine (`/reserve`)**:
   - 3-step interactive booking flow (When, Who & Where, Contact Details).
   - Generates formatted, polite WhatsApp links (`wa.me`) directly to the front desk (+91 91196 03535).
   - Instant client-side `.ics` calendar invitation download.
   - Local browser caching (`localStorage`) for returning guest convenience.
2. **Interactive 9-Category Menu (`/menu`)**:
   - Sticky category chips with spring underline indicator (`layoutId`).
   - 150ms debounced search with match highlights.
   - Dietary filter toggles (All, Vegetarian, Non-Vegetarian).
   - Touch-dismissible bottom sheets with dish descriptions and dietary badges.
3. **Arrival Navigation (`#find-us`)**:
   - Addresses the common "hard-to-find" mall issue with a 3-step illustrated path (Wave Mall near Polytechnic -> 3rd Floor Elevator -> The Centurion Arch).
   - Animated SVG pathline and tap-to-load Google Maps facade.
4. **Real-Time IST Status Pill**:
   - Computes open/closed status in `Asia/Kolkata` time zone (Daily 12:00 PM – 11:30 PM) with pulsing gold indicator.
5. **SEO & Structured Data**:
   - Full Schema.org `Restaurant` & `LocalBusiness` JSON-LD with geo coordinates, opening hours, and amenities.
   - Dynamic OpenGraph preview generation (`app/opengraph-image.tsx`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components + dynamic client hydration)
- **Styling**: Tailwind CSS + Custom CSS Variables (`tokens.css`)
- **Motion**: Framer Motion (`motion`) with hardware throttling (`usePerformanceTier`)
- **Icons**: Lucide Icons (standardized 1.5px stroke)
- **Validation**: Zod + React Hook Form
- **Fonts**: Next/Font (Cormorant Garamond, Manrope, Cinzel)

---

## 💻 Local Development

```bash
# Clone and enter directory
cd centurion-site

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), click **Import Project**.
3. Configure Environment Variables (or copy from `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
   - `DEMO_MODE`: `false` (when ready for search indexing)
   - `NEXT_PUBLIC_WHATSAPP`: `+919119603535`
4. The deployment will automatically deploy serverless functions to the Mumbai (`bom1`) edge region specified in `vercel.json`.

---

## 📖 Documentation
- [TODO_OWNER.md](./TODO_OWNER.md): Owner punch-list of real photos, menus, and business checks before go-live.
- [docs/OWNER_GUIDE.md](./docs/OWNER_GUIDE.md): Non-technical guide for updating menu items, prices, and hours.
- [docs/ANIMATIONS.md](./docs/ANIMATIONS.md): Comprehensive inventory of all motion effects and parameters.
