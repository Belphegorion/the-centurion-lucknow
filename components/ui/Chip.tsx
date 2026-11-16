"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { tapScale } from "@/motion/tokens";

interface ChipProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  badge?: string | number;
  layoutId?: string;
  className?: string;
}

export function Chip({
  label,
  isActive = false,
  onClick,
  icon,
  badge,
  layoutId = "active-chip-indicator",
  className = "",
}: ChipProps) {
  return (
    <motion.button
      type="button"
      whileTap={tapScale}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        isActive
          ? "text-obsidian font-semibold"
          : "text-ivory/80 hover:text-ivory border border-white/10 hover:border-gold/40 bg-charcoal/60"
      } ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-gold rounded-full shadow-glow-sm"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        {badge !== undefined && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isActive
                ? "bg-obsidian/20 text-obsidian"
                : "bg-white/10 text-smoke"
            }`}
          >
            {badge}
          </span>
        )}
      </span>
    </motion.button>
  );
}
