import { siteConfig } from "@/data/site.config";

export function getRestaurantJsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://thecenturionlucknow.com/#restaurant",
    name: siteConfig.name,
    alternateName: "The Centurion Restaurant and Lounge",
    description: siteConfig.description,
    url: "https://thecenturionlucknow.com",
    telephone: siteConfig.phone,
    servesCuisine: siteConfig.cuisines,
    priceRange: "₹₹",
    acceptsReservations: "true",
    paymentAccepted: "Cash, Credit Card, UPI",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.mall}, ${siteConfig.address.floor}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.hours.openTime,
        closes: siteConfig.hours.closeTime,
      },
    ],
    sameAs: [`https://instagram.com/${siteConfig.instagram.replace("@", "")}`],
    hasMenu: "https://thecenturionlucknow.com/menu",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Rooftop Seating",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Children's Play Area with Caretaker",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Live Cooking Stations & Counters",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Big Screens & Live Evening Music",
        value: true,
      },
    ],
  };

  // Only include aggregateRating when config has both rating and a verified count (Section 9)
  if (siteConfig.rating && siteConfig.verifiedRatingCount !== null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating,
      reviewCount: siteConfig.verifiedRatingCount,
    };
  }

  return schema;
}
