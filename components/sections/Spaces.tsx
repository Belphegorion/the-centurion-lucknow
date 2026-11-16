"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { spacesData, SpaceDetail } from "@/data/spaces";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";
import { Icon } from "@/components/ui/Icon";
import { tapScale } from "@/motion/tokens";

export function Spaces() {
  const [activeTab, setActiveTab] = useState<"dining" | "rooftop" | "lounge">("dining");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentSpace = spacesData.find((s) => s.id === activeTab) || spacesData[0];

  return (
    <section id="spaces" className="relative py-20 md:py-36 bg-obsidian text-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
              Architectural Enclaves
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory mb-4">
              Explore Our Spaces
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              Three distinct atmospheres across the top floor of Wave Mall, Lucknow.
            </p>
          </Reveal>
          <div className="w-24 mx-auto mt-6">
            <DrawLine />
          </div>
        </div>

        {/* Segmented Control with Sliding Gold Pill via layoutId */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-charcoal border border-gold/30">
            {spacesData.map((space) => {
              const isActive = space.id === activeTab;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveTab(space.id)}
                  className={`relative min-h-[44px] px-5 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive ? "text-obsidian font-semibold" : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-space-pill"
                      className="absolute inset-0 bg-gold rounded-full shadow-glow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{space.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Space Narrative & Gallery Content Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpace.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Narrative Card */}
            <div className="lg:col-span-5 space-y-6 p-6 sm:p-8 rounded-card bg-charcoal border border-gold/25">
              <div>
                <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-1">
                  {currentSpace.eyebrow}
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-semibold text-ivory">
                  {currentSpace.title}
                </h3>
              </div>

              <p className="text-smoke text-sm leading-relaxed">
                {currentSpace.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-smoke block">Capacity</span>
                  <span className="text-ivory font-medium">{currentSpace.capacity}</span>
                </div>
                <div>
                  <span className="text-smoke block">Atmosphere</span>
                  <span className="text-gold font-medium">{currentSpace.atmosphere}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-obsidian/70 border border-white/5 text-xs text-smoke">
                <span className="text-gold font-medium">Highlight: </span>
                {currentSpace.highlight}
              </div>
            </div>

            {/* Right Gallery: CSS Scroll-Snap Rail */}
            <div className="lg:col-span-7 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
              {currentSpace.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxImage(img.src)}
                  className="snap-center shrink-0 w-[85%] sm:w-[380px] group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden bg-black border border-gold/25 group-hover:border-gold/60 transition-colors shadow-card">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-xs text-ivory font-body">{img.caption}</p>
                    </div>
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-gold border border-gold/30 opacity-70 group-hover:opacity-100">
                      <Icon name="Maximize2" size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image preview"
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] p-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Icon name="X" size={24} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full aspect-[4/3] rounded-card overflow-hidden border border-gold/30 shadow-card"
            >
              <Image
                src={lightboxImage}
                alt="Enlarged space preview"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
