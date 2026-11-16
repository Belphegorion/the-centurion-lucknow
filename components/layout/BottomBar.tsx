"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Icon } from "@/components/ui/Icon";

export function BottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // 1. Reveal after 60% of hero has passed (~450px)
    // 2. Hide near footer
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearFooter = docHeight - (scrollY + winHeight) < 200;

      if (scrollY > 380 && !nearFooter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 3. Phone Keyboard detector: when input is focused, hide the bottom bar
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const shouldShow = isVisible && !isKeyboardOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-obsidian/95 border-t border-gold/30 shadow-card backdrop-blur-md safe-bottom"
        >
          <div className="grid grid-cols-4 items-center gap-1.5 p-2 px-3">
            {/* Call */}
            <motion.a
              whileTap={{ scale: 0.96 }}
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call The Centurion restaurant"
              className="flex flex-col items-center justify-center min-h-[46px] rounded-[10px] text-ivory/80 hover:text-gold border border-white/5 active:bg-charcoal text-[11px] font-body"
            >
              <Icon name="Phone" size={17} className="mb-0.5 text-gold" />
              <span>Call</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              whileTap={{ scale: 0.96 }}
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex flex-col items-center justify-center min-h-[46px] rounded-[10px] text-ivory/80 hover:text-gold border border-white/5 active:bg-charcoal text-[11px] font-body"
            >
              <Icon name="MessageSquare" size={17} className="mb-0.5 text-gold" />
              <span>WhatsApp</span>
            </motion.a>

            {/* Directions */}
            <motion.a
              whileTap={{ scale: 0.96 }}
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directions to Wave Mall 3rd floor"
              className="flex flex-col items-center justify-center min-h-[46px] rounded-[10px] text-ivory/80 hover:text-gold border border-white/5 active:bg-charcoal text-[11px] font-body"
            >
              <Icon name="MapPin" size={17} className="mb-0.5 text-gold" />
              <span>Directions</span>
            </motion.a>

            {/* Reserve (Gold, widest CTA) */}
            <motion.div whileTap={{ scale: 0.96 }}>
              <Link
                href="/reserve"
                className="flex flex-col items-center justify-center min-h-[46px] rounded-[10px] bg-gold text-obsidian font-semibold shadow-glow-sm text-[11px] font-body tracking-wide"
              >
                <Icon name="Calendar" size={17} className="mb-0.5" />
                <span>Reserve</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
