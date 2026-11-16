"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/motion/tokens";

const steps = [
  {
    num: "1",
    title: "Arrive at Wave Mall",
    detail: "Located at Vibhuti Khand, Gomti Nagar (directly adjacent to Polytechnic Crossing). Ample basement & valet parking available.",
    placeholder: "/placeholders/mall-entrance-swap-me.svg",
    placeholderLabel: "Owner Placeholder: Mall Entrance Photo",
  },
  {
    num: "2",
    title: "Ascend to the 3rd Floor (Top Floor)",
    detail: "Take the central glass elevator or main escalators directly up to the 3rd floor (the topmost dining and entertainment level).",
    placeholder: "/placeholders/lift-photo-swap-me.svg",
    placeholderLabel: "Owner Placeholder: Elevator / Lift Lobby Photo",
  },
  {
    num: "3",
    title: "Pass Through The Centurion Arch",
    detail: "Look for our grand illuminated archway and welcoming lobby lounge right as you exit the central atrium.",
    placeholder: "/placeholders/space-dining-2.svg",
    placeholderLabel: "The Centurion Grand Entrance",
  },
];

export function FindUs() {
  const [loadMap, setLoadMap] = useState(false);

  return (
    <section id="find-us" className="relative py-20 md:py-36 bg-obsidian text-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
              Arrival Navigation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory mb-4">
              Finding The Centurion
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              We are situated on the top floor of Wave Mall. Follow this simple 3-step path for an effortless arrival.
            </p>
          </Reveal>
          <div className="w-24 mx-auto mt-6">
            <DrawLine />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3 Steps with Animated Path Line */}
          <div className="lg:col-span-7 space-y-8 relative">
            {/* SVG Connecting Path Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] hidden sm:block pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="#C9A24B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: t.ease }}
                />
              </svg>
            </div>

            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: t.dur.base, delay: idx * 0.15, ease: t.ease }}
                className="relative flex flex-col sm:flex-row items-start gap-5 p-6 rounded-card bg-charcoal border border-gold/25 shadow-card"
              >
                {/* Step Marker */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-obsidian border-2 border-gold flex items-center justify-center shrink-0 shadow-glow-sm">
                  <span className="font-cinzel text-base font-semibold text-gold">
                    {step.num}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {step.title}
                  </h3>
                  <p className="text-smoke text-xs sm:text-sm leading-relaxed">
                    {step.detail}
                  </p>

                  {/* Owner Swap-Me Placeholder Visual */}
                  <div className="pt-2">
                    <div className="relative aspect-[21/9] w-full rounded-lg overflow-hidden bg-black/60 border border-white/10">
                      <Image
                        src={step.placeholder}
                        alt={step.placeholderLabel}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                        <span className="text-[10px] font-cinzel tracking-wider px-2 py-0.5 rounded-full bg-obsidian/85 text-smoke border border-white/10">
                          {step.placeholderLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Map Facade & Navigation Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-card bg-charcoal border border-gold/30 shadow-card space-y-5">
              <div>
                <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-1">
                  Direct Location
                </span>
                <h3 className="font-display text-2xl font-semibold text-ivory mb-2">
                  Wave Mall, Gomti Nagar
                </h3>
                <p className="text-smoke text-xs sm:text-sm leading-relaxed">
                  {siteConfig.address.full}
                </p>
              </div>

              {/* Map Facade Container */}
              <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden bg-black border border-gold/25">
                {!loadMap ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-obsidian/90">
                    <div className="w-14 h-14 rounded-full bg-charcoal border border-gold/50 flex items-center justify-center text-gold mb-3 shadow-glow-sm">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <p className="font-display text-lg font-semibold text-ivory mb-1">
                      Interactive Google Map
                    </p>
                    <p className="text-smoke text-xs mb-4">
                      Tap below to load high-resolution map without slowing down page speed.
                    </p>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setLoadMap(true)}
                      icon={<Icon name="Map" size={16} />}
                    >
                      Tap to Load Map
                    </Button>
                  </div>
                ) : (
                  <iframe
                    title="The Centurion Wave Mall Lucknow Map"
                    src="https://maps.google.com/maps?q=The+Centurion+Wave+Mall+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    isFullWidth
                    variant="primary"
                    size="md"
                    icon={<Icon name="Navigation" size={16} />}
                  >
                    Directions
                  </Button>
                </a>

                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="w-full"
                >
                  <Button
                    isFullWidth
                    variant="outline"
                    size="md"
                    icon={<Icon name="Phone" size={16} />}
                  >
                    Call Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
