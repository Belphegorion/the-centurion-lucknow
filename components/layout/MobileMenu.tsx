"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { spring, t } from "@/motion/tokens";
import { siteConfig } from "@/data/site.config";
import { StatusPill } from "@/components/ui/StatusPill";
import { Icon } from "@/components/ui/Icon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home", eyebrow: "01" },
  { href: "/menu", label: "The Menu", eyebrow: "02" },
  { href: "/reserve", label: "Reserve a Table", eyebrow: "03" },
  { href: "/events", label: "Events & Groups", eyebrow: "04" },
  { href: "/#spaces", label: "Our Spaces", eyebrow: "05" },
  { href: "/#find-us", label: "Find Us", eyebrow: "06" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
    } else {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={spring}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-obsidian text-ivory p-6 safe-bottom safe-top overflow-y-auto"
        >
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between pb-6 border-b border-gold/20">
            <div>
              <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase">
                Restaurant & Lounge
              </p>
              <h2 className="font-display text-2xl font-semibold text-ivory">
                {siteConfig.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Icon name="X" size={22} />
            </button>
          </div>

          {/* Staggered Navigation Links */}
          <nav className="flex flex-col py-8 gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + idx * t.stagger,
                  duration: t.dur.base,
                  ease: t.ease,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between py-2 border-b border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  <span className="font-display text-3xl sm:text-4xl font-semibold text-ivory group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                  <span className="font-cinzel text-xs tracking-eyebrow text-smoke group-hover:text-gold transition-colors">
                    {link.eyebrow}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer Card in Mobile Menu */}
          <div className="pt-6 border-t border-gold/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <StatusPill />
              <span className="text-xs text-smoke font-body">Wave Mall, 3rd Floor</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[10px] border border-white/10 hover:border-gold/50 text-ivory text-sm font-body font-medium"
              >
                <Icon name="Phone" size={16} className="text-gold" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[10px] bg-gold text-obsidian text-sm font-body font-semibold"
              >
                <Icon name="MessageSquare" size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
