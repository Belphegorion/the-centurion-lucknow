# TODO: The Centurion Owner Go-Live Checklist

This audit tracks all items that require the restaurant owner's confirmation, asset uploads, or business adjustments before switching `DEMO_MODE=false` and removing the top demo strip.

---

## 1. Brand Identity & Visual Assets
- [ ] **Official Logo & Wordmark**: Replace vector font wordmark with SVG vector logo file if custom brand lettering exists.
- [ ] **Real Hero Photography** (`public/placeholders/hero-centurion.jpg`): Upload real high-resolution photograph of The Centurion's illuminated main dining hall or evening lounge.
- [ ] **Real Signature Dish Photos**:
  - [ ] Murg Tikka Masala (`public/placeholders/dish-murg-tikka.jpg`)
  - [ ] Awadhi Dum Biryani (`public/placeholders/dish-biryani.jpg`)
  - [ ] Tandoori Malai Tikka Starters (`public/placeholders/dish-starters.jpg`)
  - [ ] Shahi Gulab Jamun with Rabri (`public/placeholders/dish-dessert.jpg`)
  - [ ] Mocktails (`public/placeholders/dish-mocktail.jpg`)
- [ ] **Real Space & Atmosphere Photos**:
  - [ ] Grand Dining Hall (`public/placeholders/space-dining-1.jpg`)
  - [ ] Waiting Lounge (`public/placeholders/space-dining-2.jpg`)
  - [ ] Rooftop Skyline Seating (`public/placeholders/space-rooftop-1.jpg`, `space-rooftop-2.jpg`)
  - [ ] Evening Acoustic Lounge & Big Screens (`public/placeholders/space-lounge-1.jpg`, `space-lounge-2.jpg`)
  - [ ] Children's Play Area & Caretaker (`public/placeholders/kids-corner.jpg`)
- [ ] **Wayfinding & Mall Photos (L11 Find Us)**:
  - [ ] Wave Mall Entrance from Polytechnic crossing (`public/placeholders/mall-entrance-swap-me.jpg`)
  - [ ] 3rd Floor Elevator / Lift Lobby (`public/placeholders/lift-photo-swap-me.jpg`)

---

## 2. Menu, Pricing & Buffet Structure
- [ ] **Full Menu Verification** (`data/menu.ts`):
  - [ ] Review all 9 categories: Starters, Live Counters, Main Course, Biryani & Rice, Breads, Indo-Chinese, Italian, Desserts, Mocktails.
  - [ ] Update exact dish names and chef specialties.
- [ ] **Price Unmasking**:
  - [ ] Set `showPrices: true` in `data/site.config.ts` once prices are finalized.
  - [ ] Update numeric prices in `data/menu.ts` for each item.
- [ ] **Buffet Pricing & Timings**:
  - [ ] Set exact buffet pricing (e.g. `buffetPrice: 899`) or keep null for custom WhatsApp enquiry.
  - [ ] Confirm lunch buffet hours (e.g., 12:30 PM – 4:00 PM) and dinner buffet hours (7:30 PM – 11:00 PM).

---

## 3. Contact & Reservation Verification
- [ ] **WhatsApp Number**: Confirm `+91 91196 03535` is actively monitored for table booking inquiries.
- [ ] **Phone Number**: Confirm landline or mobile for direct calls.
- [ ] **Email Alerts**: Add `RESEND_API_KEY` and `RESERVATION_TO_EMAIL` in Vercel Environment Variables to receive instant email alerts alongside WhatsApp messages.
- [ ] **Google Maps Pin**: Confirm exact Google Maps coordinate pin (`lat: 26.8587, lng: 80.9995`) and share URL.

---

## 4. Customer Reviews & Social Media
- [ ] **Review Count & Score**: Confirm Google Review count to enable conditional `AggregateRating` in Google Search (`data/site.config.ts: verifiedRatingCount`).
- [ ] **Instagram Handle**: Confirm `@thecenturion.lko` link.
- [ ] **Live Music Policy**: Update `eveningNote` in `data/site.config.ts` regarding which days live acoustic music plays.

---

## 5. Go-Live Switch
- [ ] Connect custom domain in Vercel (e.g. `thecenturionlucknow.com`).
- [ ] In Vercel Environment Variables, set `DEMO_MODE=false`.
- [ ] In `app/layout.tsx`, comment out `<DemoStrip />`.
- [ ] Verify `app/robots.ts` allows indexation (`allow: /`).
