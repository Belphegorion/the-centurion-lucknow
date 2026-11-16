export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  type: string;
  address: {
    mall: string;
    floor: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    full: string;
  };
  phone: string;
  whatsappNumber: string;
  instagram: string;
  hours: {
    openTime: string; // '12:00'
    closeTime: string; // '23:30'
    display: string;
    timezone: string;
  };
  cuisines: string[];
  features: string[];
  rating: number; // 4.1 unverified, count hidden
  verifiedRatingCount: number | null; // null => hidden
  priceBand: string;
  showPrices: boolean; // false
  buffetAvailable: boolean; // true
  buffetPrice: number | null; // null
  buffetHours: string | null; // null
  eveningNote: string | null; // null
  largeGroupFrom: number; // 10
  mapsUrl: string;
  geo: {
    lat: number;
    lng: number;
  };
  isSampleContent: boolean;
}

export const siteConfig: SiteConfig = {
  name: "The Centurion",
  tagline: "The Gate to Grand Awadhi & International Dining",
  description:
    "Spacious restaurant and rooftop lounge on the 3rd floor of Wave Mall, Gomti Nagar, Lucknow. Known for lavish live counters, signature starters, rooftop views, and a dedicated kids play area.",
  type: "Restaurant and Lounge",
  address: {
    mall: "Wave Mall",
    floor: "3rd Floor (Top Floor)",
    locality: "Vibhuti Khand, Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226010",
    landmark: "near Polytechnic Crossing",
    full: "Wave Mall, 3rd Floor, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010 (near Polytechnic)",
  },
  phone: "+91 91196 03535",
  whatsappNumber: "+919119603535",
  instagram: "@thecenturion.lko",
  hours: {
    openTime: "12:00",
    closeTime: "23:30",
    display: "Daily 12:00 PM to 11:30 PM (IST)",
    timezone: "Asia/Kolkata",
  },
  cuisines: [
    "North Indian",
    "Italian",
    "Indo-Chinese",
    "Awadhi",
    "Indian & International Buffet",
  ],
  features: [
    "Spacious Interiors & Luxury Waiting Lounge",
    "Scenic Rooftop Seating",
    "Children's Play Area with Dedicated Caretaker",
    "Live Cooking Counters & Starters",
    "Big Screens & Evening Music",
    "Family-Friendly & Large Group Gatherings",
  ],
  // Unconfirmed config variables (Section 1)
  rating: 4.1,
  verifiedRatingCount: null, // Hidden until verified by owner
  priceBand: "Rs 800 to 1,000 per person",
  showPrices: false, // Hidden until owner inputs real prices
  buffetAvailable: true,
  buffetPrice: null, // Ask on WhatsApp
  buffetHours: null,
  eveningNote: null,
  largeGroupFrom: 10,
  mapsUrl: "https://maps.google.com/?q=The+Centurion+Wave+Mall+Gomti+Nagar+Lucknow",
  geo: {
    lat: 26.8587,
    lng: 80.9995,
  },
  isSampleContent: true,
};
