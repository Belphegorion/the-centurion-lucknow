"use client";

import { motion } from "framer-motion";
import { reviewsData } from "@/data/reviews";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/motion/tokens";

export function Reviews() {
  return (
    <section className="relative py-20 md:py-36 bg-charcoal text-ivory border-t border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-gold" />
                <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase">
                  Guest Impressions
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory">
                Paraphrased Guest Themes
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-cinzel tracking-wider px-3 py-1 rounded-full bg-obsidian border border-gold/40 text-gold uppercase">
                Sample Testimonials
              </span>
            </div>
          </Reveal>
        </div>

        <DrawLine className="mt-8" />
      </div>

      {/* CSS Scroll-Snap Cards (88% wide on mobile, snap center) */}
      <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 px-5 sm:px-8 pb-6">
        {reviewsData.map((rev, idx) => (
          <div
            key={rev.id}
            className="snap-center shrink-0 w-[88%] sm:w-[400px] md:w-[440px] flex flex-col justify-between p-6 sm:p-8 rounded-card bg-obsidian border border-gold/25 shadow-card"
          >
            <div>
              {/* Animated 5 Stars filling left-to-right once (0.5s) */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <motion.div
                    key={starIndex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.25,
                      delay: idx * 0.1 + starIndex * 0.06,
                      ease: t.ease,
                    }}
                    className="text-gold"
                  >
                    <Icon name="Star" size={16} className="fill-gold" />
                  </motion.div>
                ))}
              </div>

              <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
                {rev.theme}
              </span>

              <p className="font-display text-lg sm:text-xl text-ivory/95 italic leading-relaxed mb-6">
                “{rev.quote}”
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-smoke">
              <span className="font-medium text-gold/90">{rev.category}</span>
              <span className="italic">{rev.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
