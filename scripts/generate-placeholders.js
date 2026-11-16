const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'placeholders');

const items = [
  { name: 'hero-centurion.jpg', title: 'THE CENTURION', subtitle: 'Restaurant & Rooftop Lounge • Wave Mall, Lucknow', accent: '#C9A24B' },
  { name: 'dish-murg-tikka.jpg', title: 'MURG TIKKA MASALA', subtitle: 'Rich Awadhi Clay Oven Chicken In Velvety Gravy', accent: '#5B1A1F' },
  { name: 'dish-biryani.jpg', title: 'AWADHI DUM BIRYANI', subtitle: 'Slow-Cooked Sealed Handi Basmati Rice', accent: '#C9A24B' },
  { name: 'dish-starters.jpg', title: 'SIGNATURE STARTERS', subtitle: 'Malai Tikka & Live Chaat Delicacies', accent: '#C9A24B' },
  { name: 'dish-dessert.jpg', title: 'SHAHI GULAB JAMUN', subtitle: 'Warm Khoya Dumplings With Slow-Simmered Rabri', accent: '#5B1A1F' },
  { name: 'dish-mocktail.jpg', title: 'NAWABI MOCKTAIL', subtitle: 'Handcrafted Zero-Proof Botanical Elixirs', accent: '#C9A24B' },
  { name: 'buffet-counter.jpg', title: 'LIVE BUFFET COUNTERS', subtitle: 'Pasta • Grills • Chaat • Tandoor Stations', accent: '#C9A24B' },
  { name: 'space-dining-1.jpg', title: 'GRAND DINING HALL', subtitle: 'Spacious Interiors & Luxury Waiting Lounge', accent: '#C9A24B' },
  { name: 'space-dining-2.jpg', title: 'WAITING LOUNGE', subtitle: 'Hotel-Lobby Scale Plush Seating Enclave', accent: '#5B1A1F' },
  { name: 'space-rooftop-1.jpg', title: 'SKYLINE ROOFTOP', subtitle: 'Open-Air Seating Overlooking Gomti Nagar', accent: '#C9A24B' },
  { name: 'space-rooftop-2.jpg', title: 'ROOFTOP EVENING', subtitle: 'Ambient Starry Terraces & Evening Breezes', accent: '#5B1A1F' },
  { name: 'space-lounge-1.jpg', title: 'EVENING LOUNGE', subtitle: 'Big Screens & Live Acoustic Performances', accent: '#C9A24B' },
  { name: 'space-lounge-2.jpg', title: 'MOCKTAIL BAR & SCREENS', subtitle: 'Intimate Atmosphere & Screenings', accent: '#5B1A1F' },
  { name: 'kids-corner.jpg', title: 'KIDS PLAY AREA', subtitle: 'Dedicated Play Zone With Supervised Caretaker', accent: '#C9A24B' },
  { name: 'mall-entrance-swap-me.jpg', title: 'WAVE MALL ENTRANCE', subtitle: 'SWAP-ME: Step 1 Landmark Near Polytechnic', accent: '#9A918A' },
  { name: 'lift-photo-swap-me.jpg', title: '3RD FLOOR LIFT LOBBY', subtitle: 'SWAP-ME: Step 2 Direct Elevator To Top Floor', accent: '#9A918A' },
];

items.forEach(item => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1F1A16"/>
      <stop offset="60%" stop-color="#14100E"/>
      <stop offset="100%" stop-color="#0C0A09"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E7D3A1"/>
      <stop offset="50%" stop-color="#C9A24B"/>
      <stop offset="100%" stop-color="#8E6D24"/>
    </linearGradient>
    <pattern id="chikankari" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1" fill="#C9A24B" opacity="0.12"/>
      <path d="M 0 15 L 15 0 L 30 15 L 15 30 Z" fill="none" stroke="#C9A24B" stroke-width="0.5" opacity="0.08"/>
    </pattern>
  </defs>
  
  <!-- Canvas Void -->
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#chikankari)"/>
  
  <!-- Architectural Arch Frame -->
  <path d="M 120 700 L 120 400 C 120 180, 1080 180, 1080 400 L 1080 700 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.35"/>
  <path d="M 150 700 L 150 410 C 150 220, 1050 220, 1050 410 L 1050 700 Z" fill="none" stroke="#C9A24B" stroke-width="0.8" opacity="0.2"/>

  <!-- Laurel Motif Center Top -->
  <g transform="translate(600, 240) scale(1.2)">
    <circle cx="0" cy="0" r="28" fill="#171311" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <path d="M -12 -6 C -18 6, -12 14, 0 16 C 12 14, 18 6, 12 -6" fill="none" stroke="#C9A24B" stroke-width="1.5"/>
    <circle cx="0" cy="-2" r="3" fill="#E7D3A1"/>
  </g>
  
  <!-- Typography -->
  <text x="600" y="440" font-family="'Cinzel', Georgia, serif" font-size="40" font-weight="600" fill="#F5EFE3" text-anchor="middle" letter-spacing="8">${item.title}</text>
  <text x="600" y="490" font-family="'Manrope', -apple-system, sans-serif" font-size="20" font-weight="400" fill="#9A918A" text-anchor="middle" letter-spacing="2">${item.subtitle}</text>
  
  <!-- Badge Label: Sample / Swap-Me -->
  <g transform="translate(600, 560)">
    <rect x="-110" y="-18" width="220" height="36" rx="18" fill="#171311" stroke="#C9A24B" stroke-width="1" opacity="0.85"/>
    <text x="0" y="6" font-family="'Manrope', sans-serif" font-size="12" font-weight="600" fill="#C9A24B" text-anchor="middle" letter-spacing="3">SAMPLE PLACEHOLDER</text>
  </g>
  
  <!-- Subtle Corner Embellishments -->
  <line x1="40" y1="40" x2="100" y2="40" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="40" y1="40" x2="40" y2="100" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="1160" y1="40" x2="1100" y2="40" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="1160" y1="40" x2="1160" y2="100" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="40" y1="760" x2="100" y2="760" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="40" y1="760" x2="40" y2="700" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="1160" y1="760" x2="1100" y2="760" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
  <line x1="1160" y1="760" x2="1160" y2="700" stroke="#C9A24B" stroke-width="1" opacity="0.4"/>
</svg>`;

  fs.writeFileSync(path.join(dir, item.name), svg);
  fs.writeFileSync(path.join(dir, item.name.replace('.jpg', '.svg')), svg);
});

console.log('Placeholders created successfully in public/placeholders/');
