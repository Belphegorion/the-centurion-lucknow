"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/motion/Reveal";
import { ArchReveal } from "@/motion/ArchReveal";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/motion/tokens";

export function KidsCorner() {
  return (
    <section className="relative py-20 bg-charcoal text-ivory border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-card bg-obsidian border border-gold/30 p-8 sm:p-12 overflow-hidden shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                {/* Line art icon that bounces once on reveal */}
                <motion.div
                  initial={{ scale: 0.8, y: 10 }}
                  whileInView={{ scale: [0.8, 1.15, 1], y: [10, -4, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: t.ease }}
                  className="w-12 h-12 rounded-full border border-gold/40 bg-charcoal flex items-center justify-center text-gold shadow-glow-sm shrink-0"
                >
                  <Icon name="Baby" size={22} />
                </motion.div>

                <div>
                  <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block">
                    Family-First Hospitality
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-semibold text-ivory">
                    A Play Area with a Dedicated Caretaker
                  </h3>
                </div>
              </div>

              <p className="text-smoke text-sm sm:text-base leading-relaxed">
                We believe exceptional fine dining should never exclude family harmony. The Centurion features a safe, supervised children’s enclave with an attentive caretaker present during operating hours—giving young guests joyful entertainment while parents relax and converse over a multi-course meal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-charcoal border border-white/5">
                  <span className="font-medium text-ivory block mb-0.5">Staff Supervised</span>
                  <span className="text-smoke">Trained in-house caretaker</span>
                </div>
                <div className="p-3 rounded-lg bg-charcoal border border-white/5">
                  <span className="font-medium text-ivory block mb-0.5">Safe Enclosure</span>
                  <span className="text-smoke">Child-safe games & seating</span>
                </div>
                <div className="p-3 rounded-lg bg-charcoal border border-white/5">
                  <span className="font-medium text-ivory block mb-0.5">Visible from Dining</span>
                  <span className="text-smoke">Peace of mind for families</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Arch Visual */}
            <div className="lg:col-span-5 relative aspect-[4/3] w-full">
              <ArchReveal>
                <div className="relative w-full h-full bg-black">
                  <Image
                    src="/placeholders/kids-corner.svg"
                    alt="Children's play area with caretaker at The Centurion Lucknow"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-cinzel tracking-wider px-2.5 py-1 rounded-full bg-obsidian/90 border border-gold/40 text-gold uppercase">
                      Supervised Play Sanctuary
                    </span>
                  </div>
                </div>
              </ArchReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
