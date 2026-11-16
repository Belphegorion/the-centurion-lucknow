"use client";

import Link from "next/link";
import { fullMenu } from "@/data/menu";
import { siteConfig } from "@/data/site.config";
import { Reveal } from "@/motion/Reveal";
import { DrawLine } from "@/motion/DrawLine";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function MenuPreview() {
  // Select top 6 highlighted items across categories
  const previewItems = fullMenu.slice(0, 6);

  return (
    <section className="relative py-20 md:py-32 bg-obsidian text-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
              Flavors of Lucknow & Beyond
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory mb-4">
              A Glimpse of the Feast
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-smoke text-sm sm:text-base leading-relaxed">
              From Awadhi dum specialties to wood-fired style pizzas and live dessert hearths.
            </p>
          </Reveal>
          <div className="w-24 mx-auto mt-6">
            <DrawLine />
          </div>
        </div>

        {/* Menu Row Grid with Dotted Leader Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto mb-14">
          {previewItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05}>
              <div className="group flex flex-col p-4 rounded-[10px] bg-charcoal/50 border border-white/5 hover:border-gold/30 transition-colors">
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.isVeg ? "bg-[#6F9A6B]" : "bg-[#D2543C]"
                      }`}
                      title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    />
                    <h3 className="font-display text-xl font-semibold text-ivory group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    {item.isChefPick && (
                      <span className="text-gold" title="Chef's Pick">
                        <Icon name="Sparkles" size={14} />
                      </span>
                    )}
                  </div>

                  {/* Dotted Leader Line */}
                  <div className="flex-1 border-b border-dotted border-white/20 mx-2" />

                  {/* Price (or buffet indication) */}
                  <span className="font-body text-xs text-smoke shrink-0 font-medium">
                    {siteConfig.showPrices
                      ? item.price
                        ? `₹${item.price}`
                        : "Buffet"
                      : "Buffet Spread"}
                  </span>
                </div>

                <p className="text-smoke text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href="/menu">
            <Button
              size="lg"
              variant="goldOutline"
              icon={<Icon name="BookOpen" size={18} />}
              iconPosition="right"
            >
              Explore Full 9-Category Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
