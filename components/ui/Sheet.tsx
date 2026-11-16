"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ReactNode, useEffect, useCallback } from "react";
import { spring } from "@/motion/tokens";
import { Icon } from "./Icon";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  eyebrow,
  children,
}: SheetProps) {
  // Lock body scroll
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

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={spring}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.8 }}
            onDragEnd={handleDragEnd}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90svh] overflow-y-auto bg-charcoal border-t border-gold/30 rounded-t-[24px] shadow-card safe-bottom touch-pan-y"
          >
            {/* Grab Handle */}
            <div className="sticky top-0 z-10 flex flex-col items-center pt-3 pb-2 bg-charcoal cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-2 pb-4 border-b border-white/5">
              <div>
                {eyebrow && (
                  <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase mb-1">
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h3 className="font-display text-2xl font-semibold text-ivory">
                    {title}
                  </h3>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="p-2 -mr-2 text-smoke hover:text-ivory rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
