"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signatureDishes, MenuItem } from "@/data/menu";
import { ArchReveal } from "@/motion/ArchReveal";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/data/site.config";

export function Signature() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-obsidian text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Reveal>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-gold" />
                <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase">
                  Culinary Centerpieces
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory">
                Signature Specialties
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="text-smoke text-sm sm:text-base max-w-md">
              Starters and live specialties that defined Lucknow’s fondness for The Centurion.
              Swipe to explore.
            </p>
          </Reveal>
        </div>

        <DrawLine className="mt-8" />
      </div>

      {/* CSS Scroll-Snap Rail (78% width on mobile, snap center, next card peeks) */}
      <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-5 px-5 sm:px-8 pb-6">
        {signatureDishes.map((dish, idx) => (
          <div
            key={dish.id}
            onClick={() => setSelectedDish(dish)}
            className="snap-center shrink-0 w-[78%] sm:w-[360px] md:w-[380px] group cursor-pointer"
          >
            <div className="relative bg-charcoal border border-gold/25 rounded-card p-4 transition-all duration-300 hover:border-gold/60 shadow-card">
              {/* Arch Masked Photo Container */}
              <div className="relative aspect-[4/5] w-full mb-4 overflow-hidden rounded-t-[140px] rounded-b-[10px] bg-black">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dietary Veg / Non-Veg Indicator Dot */}
                <div className="absolute top-4 right-4 z-10 w-6 h-6 rounded-sm bg-obsidian/90 border border-white/20 flex items-center justify-center p-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      dish.isVeg ? "bg-[#6F9A6B]" : "bg-[#D2543C]"
                    }`}
                  />
                </div>

                {/* Sample Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="text-[10px] font-cinzel tracking-wider px-2.5 py-1 rounded-full bg-obsidian/90 border border-gold/40 text-gold uppercase">
                    Sample Photo
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="font-cinzel text-xs tracking-eyebrow text-gold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory group-hover:text-gold transition-colors">
                    {dish.name}
                  </h3>
                </div>

                {dish.isChefPick && (
                  <span className="text-gold shrink-0 p-1" title="Chef's Pick">
                    <Icon name="Sparkles" size={16} />
                  </span>
                )}
              </div>

              <p className="text-smoke text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                {dish.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gold/80 pt-2 border-t border-white/5">
                <span className="font-cinzel tracking-wider uppercase">
                  {dish.category}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <Icon name="ArrowRight" size={13} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dish Detail Bottom Sheet */}
      <Sheet
        isOpen={selectedDish !== null}
        onClose={() => setSelectedDish(null)}
        title={selectedDish?.name}
        eyebrow={`Signature • ${selectedDish?.category}`}
      >
        {selectedDish && (
          <div className="space-y-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-black border border-gold/30">
              <Image
                src={selectedDish.image}
                alt={selectedDish.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian/90 border border-gold/40 text-xs font-medium flex items-center gap-2 text-ivory">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedDish.isVeg ? "bg-[#6F9A6B]" : "bg-[#D2543C]"
                  }`}
                />
                <span>{selectedDish.isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
              </div>
            </div>

            <p className="text-ivory/90 text-base leading-relaxed">
              {selectedDish.description}
            </p>

            <div className="p-4 rounded-[10px] bg-charcoal/90 border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase">
                  Price
                </p>
                <p className="text-sm text-smoke">
                  {siteConfig.showPrices
                    ? selectedDish.price
                      ? `₹${selectedDish.price}`
                      : "Available on buffet"
                    : "Included in grand buffet & à la carte"}
                </p>
              </div>
              <span className="text-xs text-smoke font-body italic">
                Sample dish description
              </span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello The Centurion, I'd like to ask about the ${selectedDish.name} on today's menu.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button isFullWidth variant="primary" icon={<Icon name="MessageSquare" size={18} />}>
                  Ask on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  );
}
