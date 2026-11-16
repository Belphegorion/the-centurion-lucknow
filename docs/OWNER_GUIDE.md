# The Centurion: Restaurant Owner’s Operation Guide

Welcome to the digital management guide for **The Centurion** website. This handbook explains how to update menu items, show or hide prices, replace photography, modify operating hours, and adjust reservation settings without coding experience.

---

## 1. Quick Settings File: `data/site.config.ts`

Almost all high-level business settings are controlled inside `data/site.config.ts`. You can open this file in any text editor.

### A. Updating Operating Hours
```typescript
hours: {
  openTime: "12:00",   // 24-hour format
  closeTime: "23:30",  // 24-hour format
  display: "Daily 12:00 PM to 11:30 PM (IST)",
  timezone: "Asia/Kolkata",
}
```

### B. Displaying Menu Prices
When you are ready to reveal prices to diners:
1. Open `data/site.config.ts`.
2. Find `showPrices: false,` and change it to `showPrices: true,`.
3. Save the file. All prices entered in `data/menu.ts` will immediately appear on the site.

### C. Updating WhatsApp & Phone Numbers
```typescript
phone: "+91 91196 03535",
whatsappNumber: "+919119603535", // International format without spaces or hyphens
```

### D. Setting Buffet Rates
```typescript
buffetPrice: 899, // Change from null to your actual per-person price
```

---

## 2. Managing the Menu: `data/menu.ts`

The menu is organized into 9 categories:
- `Starters`
- `Live Counters`
- `Main Course`
- `Biryani and Rice`
- `Breads`
- `Indo-Chinese`
- `Italian`
- `Desserts`
- `Mocktails`

### Adding or Editing a Dish
Each dish looks like this:
```typescript
{
  id: "st-5",
  name: "Paneer Tikka Angara",
  category: "Starters",
  description: "Cottage cheese marinated in smoky red chili curd with roasted peppers.",
  isVeg: true,             // true for green veg dot, false for red non-veg dot
  isChefPick: true,        // gives the dish a gold star badge
  price: 450,              // price in INR (appears when showPrices is true)
  isSample: false,         // set false once photo and description are verified
  image: "/placeholders/dish-starters.jpg", // path to your image
}
```

---

## 3. Replacing Placeholder Photos

All images are stored in `public/placeholders/`. To replace any image:
1. Save your photograph using the exact filename specified below (JPG or PNG format, recommended dimensions 1200x800).
2. Copy it into the `public/placeholders/` folder to replace the placeholder.

### File Reference:
- **Hero Background**: `hero-centurion.jpg`
- **Signature Dishes**:
  - `dish-murg-tikka.jpg`
  - `dish-biryani.jpg`
  - `dish-starters.jpg`
  - `dish-dessert.jpg`
  - `dish-mocktail.jpg`
  - `buffet-counter.jpg`
- **Spaces & Rooms**:
  - `space-dining-1.jpg` & `space-dining-2.jpg` (Main Hall & Lounge)
  - `space-rooftop-1.jpg` & `space-rooftop-2.jpg` (Rooftop Deck)
  - `space-lounge-1.jpg` & `space-lounge-2.jpg` (Evening Music Lounge)
  - `kids-corner.jpg` (Children’s Play Area)
- **Wayfinding & Directions**:
  - `mall-entrance-swap-me.jpg` (Wave Mall exterior)
  - `lift-photo-swap-me.jpg` (3rd floor elevator foyer)

---

## 4. How Reservations Function (No Database Needed)

1. The customer selects Date, Time Slot, Party Size, Seating (Indoor/Rooftop), and provides their Name & Phone.
2. Upon submitting, the site generates a structured, polite WhatsApp message and opens a chat directly with `whatsappNumber`.
3. The customer also receives an instant `.ics` Calendar invite they can add to Apple Calendar or Google Calendar.
4. Your staff simply reviews the message on WhatsApp and sends back a quick confirmation message.

---

## 5. Taking the Site Live on Vercel

1. Push your repository to GitHub.
2. In your Vercel Dashboard, import the repository.
3. In Project Settings > Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`
   - `DEMO_MODE`: `false`
4. Deploy!
