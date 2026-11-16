"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { usePerformanceTier } from "./hooks/usePerformanceTier";

export function GatePreloader() {
  const [showGate, setShowGate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tier = usePerformanceTier();

  useEffect(() => {
    // Check if user has already visited in this session or prefers reduced motion
    const hasVisited = sessionStorage.getItem("centurion-gate-opened");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasVisited || prefersReduced || tier === "low") {
      setShowGate(false);
      return;
    }

    setShowGate(true);

    // Timeline: 0.45s seam draws, then at 0.5s panels slide apart, complete by 1.35s
    const timerOpen = setTimeout(() => {
      setIsOpen(true);
    }, 550);

    const timerDismiss = setTimeout(() => {
      setShowGate(false);
      sessionStorage.setItem("centurion-gate-opened", "true");
    }, 1400);

    return () => {
      clearTimeout(timerOpen);
      clearTimeout(timerDismiss);
    };
  }, [tier]);

  const handleSkip = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowGate(false);
      sessionStorage.setItem("centurion-gate-opened", "true");
    }, 300);
  };

  if (!showGate) return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none"
    >
      {/* Left Obsidian Door Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "-101%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-obsidian border-r border-gold/30 flex items-center justify-end pr-6"
      >
        <div className="text-right">
          <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase opacity-80">
            The
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ivory">
            Centurion
          </h1>
        </div>
      </motion.div>

      {/* Right Obsidian Door Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "101%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-obsidian border-l border-gold/30 flex items-center justify-start pl-6"
      >
        <div className="text-left">
          <p className="font-cinzel text-xs tracking-eyebrow text-gold uppercase opacity-80">
            Wave Mall
          </p>
          <span className="font-display text-4xl sm:text-5xl font-semibold text-ivory">
            Lounge
          </span>
        </div>
      </motion.div>

      {/* Center Gold Hairline Seam */}
      {!isOpen && (
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none">
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-gold shadow-glow"
          />
        </div>
      )}

      {/* Skip Hint */}
      {!isOpen && (
        <div className="absolute bottom-10 inset-x-0 text-center pointer-events-none">
          <span className="font-cinzel text-[10px] tracking-eyebrow text-smoke uppercase">
            Tap to open
          </span>
        </div>
      )}
    </div>
  );
}
