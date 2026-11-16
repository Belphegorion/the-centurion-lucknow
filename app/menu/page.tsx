"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fullMenu, menuCategories, MenuItem, MenuCategory } from "@/data/menu";
import { siteConfig } from "@/data/site.config";
import { Chip } from "@/components/ui/Chip";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DrawLine } from "@/motion/DrawLine";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "All">("All");
  const [dietaryFilter, setDietaryFilter] = useState<"All" | "Veg" | "Non-Veg">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const chipsNavRef = useRef<HTMLDivElement>(null);

  // 150ms debounce for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 150);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return fullMenu.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === "Veg" && !item.isVeg) return false;
      if (dietaryFilter === "Non-Veg" && item.isVeg) return false;
      // Search keyword filter
      if (debouncedQuery) {
        const matchesName = item.name.toLowerCase().includes(debouncedQuery);
        const matchesDesc = item.description.toLowerCase().includes(debouncedQuery);
        const matchesCat = item.category.toLowerCase().includes(debouncedQuery);
        return matchesName || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, debouncedQuery]);

  return (
    <div className="min-h-svh bg-obsidian text-ivory py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
            The Centurion Lucknow
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-ivory mb-4">
            The Grand Menu
          </h1>
          <p className="text-smoke text-sm sm:text-base leading-relaxed">
            From clay oven tandoori starters and Awadhi dum handis to live teppanyaki wok stations and artisanal desserts.
          </p>
          <div className="w-24 mx-auto mt-6">
            <DrawLine />
          </div>
        </div>

        {/* Search Bar & Dietary Filter Pills */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          {/* Search Box */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gold">
              <Icon name="Search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Murg Tikka, Biryani, Pasta, Jalebi)..."
              className="w-full min-h-[48px] pl-11 pr-10 py-3 rounded-full bg-charcoal border border-gold/30 text-ivory placeholder-smoke text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-4 flex items-center text-smoke hover:text-ivory"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Dietary Segmented Filters: All, Veg, Non-Veg */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex p-1 rounded-full bg-charcoal border border-white/10 shrink-0">
              {(["All", "Veg", "Non-Veg"] as const).map((diet) => {
                const isActive = dietaryFilter === diet;
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setDietaryFilter(diet)}
                    className={`relative min-h-[38px] px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                      isActive ? "text-obsidian font-semibold" : "text-ivory/70 hover:text-ivory"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-diet-pill"
                        className="absolute inset-0 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {diet === "Veg" && (
                        <span className="w-2 h-2 rounded-full bg-[#6F9A6B]" />
                      )}
                      {diet === "Non-Veg" && (
                        <span className="w-2 h-2 rounded-full bg-[#D2543C]" />
                      )}
                      <span>{diet === "All" ? "All Dishes" : diet}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-smoke hidden sm:inline font-cinzel">
              Showing {filteredItems.length} items
            </span>
          </div>
        </div>

        {/* Sticky Category Chips Rail with sliding gold underline via layoutId */}
        <div
          ref={chipsNavRef}
          className="sticky top-[60px] z-30 py-3 bg-obsidian/95 backdrop-blur-md border-y border-gold/20 mb-8 -mx-5 px-5 sm:-mx-8 sm:px-8 overflow-x-auto no-scrollbar flex items-center gap-2.5"
        >
          <Chip
            label="All Categories"
            isActive={selectedCategory === "All"}
            onClick={() => setSelectedCategory("All")}
            badge={fullMenu.length}
          />
          {menuCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Notice on Prices */}
        <div className="mb-6 p-4 rounded-[10px] bg-charcoal/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-smoke">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={15} className="text-gold shrink-0" />
            <span>
              Prices are unlisted (sample mode). The Centurion serves both extensive all-inclusive buffets and à la carte dining.
            </span>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-semibold hover:underline shrink-0"
          >
            Inquire Rates on WhatsApp
          </a>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="group flex flex-col justify-between p-4 rounded-card bg-charcoal/80 border border-white/10 hover:border-gold/50 cursor-pointer transition-all shadow-card"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Veg / Non-Veg dot */}
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            item.isVeg ? "bg-[#6F9A6B]" : "bg-[#D2543C]"
                          }`}
                          title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        />

                        <h3 className="font-display text-xl font-semibold text-ivory group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>

                        {item.isChefPick && (
                          <span
                            className="inline-flex items-center gap-1 text-[11px] font-cinzel text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30"
                            title="Chef's Pick"
                          >
                            <Icon name="Sparkles" size={11} />
                            <span>Chef&apos;s Pick</span>
                          </span>
                        )}

                        {item.isSample && (
                          <span className="text-[10px] font-cinzel tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-smoke border border-white/10">
                            Sample
                          </span>
                        )}
                      </div>

                      {/* Dotted Leader */}
                      <div className="hidden sm:block flex-1 border-b border-dotted border-white/20 mx-2" />

                      {/* Price indicator */}
                      <span className="font-body text-xs text-smoke shrink-0 font-medium">
                        {siteConfig.showPrices
                          ? item.price
                            ? `₹${item.price}`
                            : "Buffet"
                          : "Buffet"}
                      </span>
                    </div>

                    <p className="text-smoke text-xs leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-smoke">
                    <span className="font-cinzel tracking-wider uppercase text-gold/80">
                      {item.category}
                    </span>
                    <span className="text-gold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View details</span>
                      <Icon name="ChevronRight" size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 p-8 rounded-card bg-charcoal border border-white/5">
              <Icon name="SearchX" size={36} className="mx-auto text-smoke mb-3" />
              <h3 className="font-display text-2xl font-semibold text-ivory mb-2">
                No Dishes Match Your Query
              </h3>
              <p className="text-smoke text-sm mb-6">
                Try searching another ingredient, or reset your filters.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setDietaryFilter("All");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Item Detail Bottom Sheet */}
      <Sheet
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
        eyebrow={`Menu • ${selectedItem?.category}`}
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-black border border-gold/30">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian/90 border border-gold/40 text-xs font-medium flex items-center gap-2 text-ivory">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedItem.isVeg ? "bg-[#6F9A6B]" : "bg-[#D2543C]"
                  }`}
                />
                <span>{selectedItem.isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
              </div>
            </div>

            <p className="text-ivory/90 text-base leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="p-4 rounded-[10px] bg-charcoal border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase">
                  Service Availability
                </p>
                <p className="text-sm text-smoke">
                  Available in Daily Buffet & Special Table Service
                </p>
              </div>
              <span className="text-xs text-smoke font-body italic">
                Sample dish entry
              </span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello The Centurion, I'd like to ask if ${selectedItem.name} is available on today's buffet.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button isFullWidth variant="primary" icon={<Icon name="MessageSquare" size={18} />}>
                  Inquire About This Dish on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
