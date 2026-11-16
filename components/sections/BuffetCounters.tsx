"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { buildWhatsAppBuffetEnquiryUrl } from "@/lib/whatsapp";
import { Reveal } from "@/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const stations = [
  "Awadhi Tandoor & Kebabs",
  "Artisan Handcrafted Pasta",
  "Fresh Chaat & Golgappa Hearth",
  "Mongolian Wok Stir-Fry",
  "Teppanyaki Grills",
  "Steaming Handi Dum Biryani",
  "Live Hot Jalebi & Rabri Station",
  "Zero-Proof Botanical Mocktails",
];

export function BuffetCounters() {
  if (!siteConfig.buffetAvailable) return null;

  const whatsappUrl = buildWhatsAppBuffetEnquiryUrl();

  return (
    <section className="relative py-20 bg-oxblood text-ivory overflow-hidden chikankari-pattern border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-champagne" />
                <span className="font-cinzel text-xs tracking-eyebrow text-champagne uppercase">
                  Interactive Dining
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory">
                The Live Buffet Promenade
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="text-ivory/80 text-sm sm:text-base max-w-md">
              Freshly prepared by culinary artisans right at your table. Daily rotating spreads for lunch and dinner.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Animated Counter Marquee of Station Names */}
      <div className="relative w-full overflow-hidden py-4 bg-black/40 border-y border-gold/20 mb-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 text-sm sm:text-base font-cinzel tracking-wider text-champagne font-medium"
        >
          {stations.concat(stations).map((station, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span>{station}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Card: Ask us for today's rate on WhatsApp */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-card bg-obsidian/90 border border-gold/40 shadow-card">
          <div>
            <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase mb-1">
              Daily Pricing & Special Packages
            </p>
            <h3 className="font-display text-2xl font-semibold text-ivory mb-2">
              Inquire About Today’s Buffet Spread
            </h3>
            <p className="text-smoke text-sm">
              {siteConfig.buffetPrice
                ? `Special rate: ₹${siteConfig.buffetPrice} per person`
                : "Ask us directly on WhatsApp for today’s lunch or dinner rates and group deals."}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0"
          >
            <Button
              variant="primary"
              size="md"
              icon={<Icon name="MessageSquare" size={18} />}
            >
              Ask Us for Today’s Rate
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
