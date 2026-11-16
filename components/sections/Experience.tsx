"use client";

import Image from "next/image";
import { ArchReveal } from "@/motion/ArchReveal";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";

const moments = [
  {
    num: "01",
    title: "Lunch Buffet & Live Counters",
    tagline: "The Grand Afternoon Spread",
    description:
      "A culinary promenade of live interactive counters: fiery teppanyaki grills, made-to-order artisan pasta, steaming tandoor kebabs, and live chaat assembled before your eyes. Perfect for leisurely corporate luncheons and family feasts.",
    image: "/placeholders/buffet-counter.svg",
    alt: "Live buffet counters and cooking stations at The Centurion",
  },
  {
    num: "02",
    title: "The Evening Lounge & Terrace",
    tagline: "Twilight Over Gomti Nagar",
    description:
      "As dusk descends over Wave Mall, ambient spotlights dim to warm amber. Acoustic evening music begins in the lounge, screens showcase live action, and the rooftop deck welcomes the cool Gomti Nagar breeze.",
    image: "/placeholders/space-rooftop-1.svg",
    alt: "Rooftop lounge and open sky terrace seating at The Centurion",
  },
  {
    num: "03",
    title: "Family Care & Kids Play Area",
    tagline: "Joy For Children, Serenity For Parents",
    description:
      "Hospitality crafted for families. While you savor slow-cooked Awadhi biryani and conversation, our safe, enclosed play area with a dedicated caretaker keeps little ones thoroughly engaged with games and activities.",
    image: "/placeholders/kids-corner.svg",
    alt: "Dedicated children's play area with caretaker at The Centurion",
  },
];

export function Experience() {
  return (
    <section className="relative py-20 md:py-36 bg-charcoal text-ivory border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <Reveal>
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
              Three Distinct Moments
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory mb-4">
              The Centurion Experience
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              Designed to transition seamlessly from sunlit buffet lunches to atmospheric evening gatherings.
            </p>
          </Reveal>
          <div className="w-24 mx-auto mt-6">
            <DrawLine />
          </div>
        </div>

        {/* Desktop Two-Column Layout with CSS Sticky Text Column / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Narrative on Desktop (CSS-only, no JS pinning) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32 space-y-6">
            <div className="p-8 rounded-card bg-obsidian border border-gold/25 chikankari-pattern">
              <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-3">
                Architectural Generosity
              </span>
              <h3 className="font-display text-3xl font-semibold text-ivory mb-4">
                Space to Breathe, Celebrate, & Gather
              </h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                From the grand waiting lounge that welcomes you at the top floor of Wave Mall to the open rooftop canopy, every corner is shaped for effortless hospitality.
              </p>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gold font-cinzel tracking-wider uppercase">
                <span>Wave Mall 3rd Floor</span>
                <span>•</span>
                <span>Top Floor Dining</span>
              </div>
            </div>
          </div>

          {/* Right Column (Mobile Full Stack): Three Moments with Arch Reveals */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24">
            {moments.map((m, idx) => (
              <div
                key={m.num}
                className="group relative flex flex-col gap-6 p-6 sm:p-8 rounded-card bg-obsidian/70 border border-white/10 hover:border-gold/40 transition-colors"
              >
                {/* Arch Mask Image Reveal */}
                <div className="relative aspect-[16/10] w-full">
                  <ArchReveal delay={0.1}>
                    <div className="relative w-full h-full">
                      <Image
                        src={m.image}
                        alt={m.alt}
                        fill
                        sizes="(max-width: 1024px) 90vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </ArchReveal>

                  {/* Numeral Badge */}
                  <div className="absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-obsidian/95 border border-gold/50 flex items-center justify-center">
                    <span className="font-cinzel text-sm font-semibold text-gold">
                      {m.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-1">
                    {m.tagline}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory mb-3">
                    {m.title}
                  </h3>
                  <p className="text-smoke text-sm leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
