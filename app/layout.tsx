import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Cinzel } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/data/site.config";
import { getRestaurantJsonLd } from "@/lib/schema";
import { DemoStrip } from "@/components/layout/DemoStrip";
import { Header } from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://thecenturionlucknow.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Restaurant & Rooftop Lounge, Wave Mall Lucknow`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Luxury dining, live counters, and rooftop open-air lounge at Wave Mall, 3rd Floor, Gomti Nagar, Lucknow. North Indian, Awadhi, Italian, Indo-Chinese and grand buffet.",
  keywords: [
    "The Centurion Lucknow",
    "buffet restaurant Gomti Nagar Lucknow",
    "rooftop restaurant Wave Mall Lucknow",
    "family restaurant with kids play area Lucknow",
    "live counter buffet Lucknow",
    "party venue Gomti Nagar",
  ],
  authors: [{ name: "The Centurion" }],
  creator: "The Centurion",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${siteConfig.name} | Restaurant & Rooftop Lounge Lucknow`,
    description:
      "Spacious dining, live counters, children's play area with caretaker, and rooftop seating on the 3rd floor of Wave Mall, Gomti Nagar.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Wave Mall, Gomti Nagar`,
    description: "Grand dining, live counters, and rooftop lounge in Lucknow.",
  },
  robots: {
    index: process.env.VERCEL_ENV === "production" && process.env.DEMO_MODE === "false",
    follow: process.env.VERCEL_ENV === "production" && process.env.DEMO_MODE === "false",
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Lucknow, Gomti Nagar",
    "geo.position": `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0A09",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getRestaurantJsonLd();

  return (
    <html lang="en-IN" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} ${cinzel.variable} font-body bg-obsidian text-ivory antialiased selection:bg-gold selection:text-obsidian flex flex-col min-h-svh`}
      >
        <DemoStrip />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
