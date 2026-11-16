export interface SpaceDetail {
  id: "dining" | "rooftop" | "lounge";
  title: string;
  eyebrow: string;
  description: string;
  capacity: string;
  atmosphere: string;
  highlight: string;
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export const spacesData: SpaceDetail[] = [
  {
    id: "dining",
    title: "Grand Dining Hall",
    eyebrow: "The Main Hall",
    description:
      "A grand, high-ceilinged room featuring expansive banquet seating, an opulent waiting lounge, and direct access to live cooking counters. Designed for lavish family lunches and group celebrations.",
    capacity: "Up to 180 Guests",
    atmosphere: "Warm, bustling, and luminous",
    highlight: "Adjacent to kids play area and live interactive stations",
    images: [
      {
        src: "/placeholders/space-dining-1.svg",
        alt: "The Centurion Grand Dining Hall main dining area",
        caption: "Expansive dining floor with bespoke chandeliers",
      },
      {
        src: "/placeholders/space-dining-2.svg",
        alt: "Waiting lounge at The Centurion",
        caption: "Plush waiting lounge with hotel-lobby scale comfort",
      },
    ],
  },
  {
    id: "rooftop",
    title: "Skyline Rooftop Seating",
    eyebrow: "Open Sky",
    description:
      "Perched on the 3rd floor (top floor) of Wave Mall, our rooftop deck opens up views across Gomti Nagar. Gentle evening breezes and ambient starlight make it Lucknow's favorite open-air dining enclave.",
    capacity: "Up to 80 Guests",
    atmosphere: "Breezy, romantic, and scenic",
    highlight: "Unobstructed evening views over Vibhuti Khand",
    images: [
      {
        src: "/placeholders/space-rooftop-1.svg",
        alt: "Rooftop deck seating at The Centurion Lucknow",
        caption: "Open-air dining deck under the Lucknow evening sky",
      },
      {
        src: "/placeholders/space-rooftop-2.svg",
        alt: "Rooftop evening ambience with ambient lantern lighting",
        caption: "Evening mood on the terrace with warm lighting",
      },
    ],
  },
  {
    id: "lounge",
    title: "The Evening Lounge",
    eyebrow: "Music & Screen",
    description:
      "An intimate transition zone with low-slung obsidian couches, big screens for live screenings, and a dedicated acoustic stage for evening performances and social cocktails.",
    capacity: "Up to 60 Guests",
    atmosphere: "Cinematic, acoustic, and relaxed",
    highlight: "Live musical performances on select evenings & mocktail bar",
    images: [
      {
        src: "/placeholders/space-lounge-1.svg",
        alt: "Lounge area with acoustic performance corner",
        caption: "Deep oxblood upholstery and evening acoustic stage",
      },
      {
        src: "/placeholders/space-lounge-2.svg",
        alt: "Mocktail counter and big screens",
        caption: "Curated zero-proof bar and live entertainment zone",
      },
    ],
  },
];
