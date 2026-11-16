import { GatePreloader } from "@/motion/GatePreloader";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { Experience } from "@/components/sections/Experience";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { BuffetCounters } from "@/components/sections/BuffetCounters";
import { Spaces } from "@/components/sections/Spaces";
import { KidsCorner } from "@/components/sections/KidsCorner";
import { Reviews } from "@/components/sections/Reviews";
import { FindUs } from "@/components/sections/FindUs";
import { Visit } from "@/components/sections/Visit";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      {/* L1 The Gate Preloader (First-visit only, tap to skip) */}
      <GatePreloader />

      {/* L2 Hero Section with Ken Burns, masked title, and status pill */}
      <Hero />

      {/* L5 Signature Dish Scroll-Snap Rail */}
      <Signature />

      {/* L6 The Experience (Three Moments with Desktop Sticky Text) */}
      <Experience />

      {/* L7 Menu Preview */}
      <MenuPreview />

      {/* L8 Buffet & Live Counters Ticker & WhatsApp Rate Enquiry */}
      <BuffetCounters />

      {/* L9 Spaces Gallery (Dining Hall, Rooftop, Lounge) + Lightbox */}
      <Spaces />

      {/* L10 Kids Corner Luxury Card with Caretaker */}
      <KidsCorner />

      {/* L12 Reviews Themes with Progressive Stars */}
      <Reviews />

      {/* L11 Find Us (3-Step Animated Pathline & Map Facade) */}
      <FindUs />

      {/* Practical Visit Information */}
      <Visit />

      {/* Bottom CTA Band */}
      <CtaBand />
    </>
  );
}
