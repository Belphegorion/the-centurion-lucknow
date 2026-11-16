export interface ReviewTheme {
  id: string;
  theme: string;
  quote: string;
  category: "Starters & Live Counters" | "Family & Kids" | "Rooftop & Evenings" | "Celebrations";
  rating: number;
  highlight: string;
}

export const reviewsData: ReviewTheme[] = [
  {
    id: "rev-1",
    theme: "Starters & Live Station Variety",
    quote:
      "The live counter setup is easily one of the most generous in Lucknow. Starters kept coming to the table piping hot, particularly the grilled tikka and live jalebis. Exceptional variety for both vegetarians and non-vegetarians.",
    category: "Starters & Live Counters",
    rating: 5,
    highlight: "Standout starters & steaming jalebi counter",
  },
  {
    id: "rev-2",
    theme: "Family Comfort & Kids Play Area",
    quote:
      "Dining out with toddlers is usually chaotic, but the dedicated kids play area with a responsible caretaker meant we could actually savor our meal. Spacious tables, grand lobby feel, and warm hospitality.",
    category: "Family & Kids",
    rating: 5,
    highlight: "Attentive caretaker in the play zone",
  },
  {
    id: "rev-3",
    theme: "Scenic Rooftop & Evening Breeze",
    quote:
      "The top-floor rooftop at Wave Mall is a hidden gem in Gomti Nagar. Once the sun dips and the evening lighting comes on, the atmosphere transforms completely. Great acoustic music in the lounge.",
    category: "Rooftop & Evenings",
    rating: 5,
    highlight: "Top-floor open sky overlooking Vibhuti Khand",
  },
  {
    id: "rev-4",
    theme: "Large Group & Birthday Hospitality",
    quote:
      "Hosted a family gathering of 22 people. The management handled seating effortlessly without feeling crowded. The biryani handi and live pasta station were huge hits across generations.",
    category: "Celebrations",
    rating: 5,
    highlight: "Seamless large-table management",
  },
];
